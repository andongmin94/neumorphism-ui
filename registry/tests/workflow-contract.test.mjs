import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { makeRegistry } from "../scripts/theme-output.mjs";
import { buildThemeVariables, defaultThemeSettings, themePresets } from "../src/theme.ts";

const slugs = ["calendar", "date-picker", "data-table", "toast"];
test("workflow type-checked code is generated from the actual live preview source", () => {
  for (const slug of slugs) {
    const source = fs.readFileSync(new URL(`../../docs/components/examples/${slug}.tsx`, import.meta.url), "utf8").replaceAll("@neumorphism-ui/registry/ui/", "@/components/ui/");
    const lines = source.split("\n");
    const end = lines.reduce((last, line, index) => line.startsWith("import ") ? index : last, 0);
    const expected = `${lines.slice(0, end + 1).join("\n")}\n${lines.slice(end + 1).join("\n").trim()}\n`;
    assert.equal(fs.readFileSync(new URL(`./examples/${slug}.tsx`, import.meta.url), "utf8"), expected, slug);
  }
});
test("all presets and the installed base use Pretendard and Consolas consistently", () => {
  const base = makeRegistry().items.find(item => item.type === "registry:base");
  assert.deepEqual(base.dependencies, ["pretendard@1.3.9"]);
  assert.equal(base.css["@font-face"], undefined);
  const layout = fs.readFileSync(new URL("../../docs/app/[locale]/layout.tsx", import.meta.url), "utf8");
  assert.ok(layout.includes('import "pretendard/dist/web/variable/pretendardvariable.css"'));
  assert.equal(base.css["@layer base"]["code, pre, kbd, samp"]["font-family"], "var(--neu-font-mono)");
  for (const preset of themePresets) for (const mode of ["light", "dark"]) {
    const tokens = buildThemeVariables({ ...defaultThemeSettings, ...preset.defaults, presetId: preset.id }, mode);
    assert.equal(tokens["--neu-font-sans"], '"Pretendard Variable", Pretendard, sans-serif');
    assert.equal(tokens["--neu-font-mono"], "Consolas, monospace");
  }
  const css = fs.readFileSync(new URL("../../docs/app/globals.css", import.meta.url), "utf8");
  assert.doesNotMatch(css, /SFMono|Roboto Mono|Noto Sans|\/fonts\//);
});
test("date-only values do not serialize through UTC and new components do not reinstall the base", () => {
  const source = fs.readFileSync(new URL("../src/components/ui/date-picker.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(source, /\.toISOString\(/);
  const catalog = makeRegistry();
  for (const slug of slugs) {
    const item = catalog.items.find(item => item.name === slug);
    assert.ok(item);
    assert.ok(!item.registryDependencies.includes("@neumorphism-ui/neumorphism-ui"));
  }
});
