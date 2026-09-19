import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import test from "node:test";
import { buildThemeCss, buildThemeVariables, defaultThemeSettings, parseThemeSettings, themePresets, themeDepthIds, themeLightDirections, themeControlShapes, themeMotionValues } from "../src/theme.ts";
import { makeRegistry, makeThemeCss, makeBootstrapModule } from "../scripts/theme-output.mjs";
function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => { const value = parseInt(hex.slice(i, i + 2), 16) / 255; return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a, b) { const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x); return (light + 0.05) / (dark + 0.05); }
const tokenNames = Object.keys(buildThemeVariables(defaultThemeSettings, "light")).sort();
test("all presets expose one semantic token contract for documentation, CSS, and registry", () => {
  const registry = makeRegistry();
  for (const preset of themePresets) {
    const settings = { ...defaultThemeSettings, ...preset.defaults, presetId: preset.id };
    const item = registry.items.find((entry) => entry.name === preset.registryName);
    for (const mode of ["light", "dark"]) {
      const tokens = buildThemeVariables(settings, mode);
      assert.deepEqual(Object.keys(tokens).sort(), tokenNames);
      assert.deepEqual(item.cssVars[mode], Object.fromEntries(Object.entries(tokens).map(([key, value]) => [key.slice(2), value])));
      for (const [key, value] of Object.entries(tokens)) { assert.ok(buildThemeCss(settings).includes(`${key}: ${value};`)); assert.ok(!key.startsWith("--docs-")); assert.ok(!/undefined|NaN/.test(value)); }
      for (const [foreground, background] of [["--foreground", "--background"], ["--foreground", "--neu-surface"], ["--muted-foreground", "--neu-surface"], ["--muted-foreground", "--muted"], ["--primary-foreground", "--primary"], ["--destructive-foreground", "--destructive"]]) {
        const ratio = contrast(tokens[foreground], tokens[background]);
        assert.ok(ratio >= 4.5, `${preset.id}/${mode} ${foreground} on ${background}: ${ratio.toFixed(3)}`);
      }
    }
    assert.equal(item.registryDependencies, undefined, "changing a preset must not reinstall the base");
  }
  const base = registry.items.find((item) => item.type === "registry:base");
  const air = registry.items.find((item) => item.name === "style-air");
  assert.deepEqual(base.cssVars.light, air.cssVars.light); assert.deepEqual(base.cssVars.dark, air.cssVars.dark);
  assert.ok(makeThemeCss().includes("--color-destructive-foreground"));
});
test("all supported shape, light, depth, and motion combinations remain finite", () => {
  for (const preset of themePresets) for (const depth of themeDepthIds) for (const lightDirection of themeLightDirections) for (const controlShape of themeControlShapes) for (const motion of themeMotionValues) for (const surfaceRadius of [8, 18, 32]) {
    const settings = { ...defaultThemeSettings, presetId: preset.id, depth, lightDirection, controlShape, motion, surfaceRadius };
    assert.deepEqual(parseThemeSettings(JSON.stringify(settings)), settings);
    for (const mode of ["light", "dark"]) { const tokens = buildThemeVariables(settings, mode); assert.deepEqual(Object.keys(tokens).sort(), tokenNames); assert.ok(!/undefined|NaN|Infinity/.test(JSON.stringify(tokens))); }
  }
});
test("malformed and obsolete saved settings are rejected instead of migrated", () => {
  for (const source of [null, "", "null", "[]", "{}", "{", JSON.stringify({ ...defaultThemeSettings, schemaVersion: 1 })]) assert.equal(parseThemeSettings(source), null);
  for (const [key, value] of Object.entries({ presetId: "missing", accent: "red", depth: "huge", motion: 999, surfaceRadius: 100, lightDirection: "middle" })) assert.equal(parseThemeSettings(JSON.stringify({ ...defaultThemeSettings, [key]: value })), null);
});
test("custom accent colors always receive readable foreground text", () => {
  for (const accent of ["#000000", "#ffffff", "#777777", "#888888", "#12abcf", "#ff7685"]) { const tokens = buildThemeVariables({ ...defaultThemeSettings, accent }, "light"); assert.ok(contrast(tokens["--primary-foreground"], accent) >= 4.5); }
});
function bootstrap(settings, mode, blockedStorage = false) {
  const module = makeBootstrapModule();
  const script = JSON.parse(module.slice(module.indexOf(" = ") + 3).trim().replace(/;$/, ""));
  const properties = {};
  const root = { dataset: {}, classList: { toggle() {} }, style: { setProperty(name, value) { properties[name] = value; } } };
  vm.runInNewContext(script, { document: { documentElement: root }, window: { matchMedia: () => ({ matches: mode === "dark" }) }, localStorage: { getItem(key) { if (blockedStorage) throw new Error("Storage denied"); return key === "neumorphism-ui-theme" ? mode : JSON.stringify(settings); } } }, { timeout: 1000 });
  return { properties, root };
}
test("pre-hydration bootstrap executes the same theme engine in every preset and mode", () => {
  for (const preset of themePresets) for (const mode of ["light", "dark"]) {
    const settings = { ...defaultThemeSettings, ...preset.defaults, presetId: preset.id };
    const { properties, root } = bootstrap(settings, mode);
    assert.deepEqual(properties, buildThemeVariables(settings, mode)); assert.equal(root.dataset.customTheme, preset.id); assert.equal(root.dataset.theme, mode);
  }
  assert.deepEqual(bootstrap(defaultThemeSettings, "dark", true).properties, buildThemeVariables(defaultThemeSettings, "dark"));
});
test("UI additions do not reinstall global theme and actual controls opt out of motion", () => {
  for (const item of makeRegistry().items.filter((entry) => entry.type === "registry:ui")) {
    assert.ok(!item.registryDependencies.includes("@neumorphism-ui/neumorphism-ui"));
    for (const file of item.files) { const source = fs.readFileSync(new URL(`../${file.path}`, import.meta.url), "utf8"); if (source.includes("duration-[var(--neu-duration)]")) assert.ok(source.includes("motion-reduce:transition-none"), item.name); if (source.includes("animate-pulse")) assert.ok(source.includes("motion-reduce:animate-none"), item.name); }
  }
});
