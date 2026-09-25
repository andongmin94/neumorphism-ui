import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import ts from "@typescript/typescript6";
import { makeRegistry } from "../scripts/theme-output.mjs";
import { defaultThemeSettings, themePresets, buildThemeVariables } from "../src/theme.ts";
const root = fileURLToPath(new URL("../", import.meta.url));
const catalog = makeRegistry();
const items = new Map(catalog.items.map(item => [item.name, item]));
function closure(item, seen = new Set()) {
  if (seen.has(item.name)) return seen;
  seen.add(item.name);
  for (const name of item.registryDependencies ?? []) {
    const dependency = items.get(name.replace("@neumorphism-ui/", ""));
    assert.ok(dependency, `${item.name}: missing dependency ${name}`);
    closure(dependency, seen);
  }
  return seen;
}

test("every installable import is covered by that item's declared dependency closure", () => {
  for (const item of catalog.items) {
    const dependencies = [...closure(item)].map(name => items.get(name));
    const files = new Set(dependencies.flatMap(entry => (entry.files ?? []).map(file => file.path)));
    const packages = new Set(["react", "react-dom", ...dependencies.flatMap(entry => (entry.dependencies ?? []).map(spec => { const index = spec.lastIndexOf("@"); return index > 0 ? spec.slice(0, index) : spec; }))]);
    for (const file of item.files ?? []) {
      const source = fs.readFileSync(path.join(root, file.path), "utf8");
      const parsed = ts.createSourceFile(file.path, source, ts.ScriptTarget.Latest, true);
      for (const node of parsed.statements.filter(ts.isImportDeclaration)) {
        const specifier = node.moduleSpecifier.text;
        if (specifier.startsWith("@/")) {
          const target = specifier.replace("@/", "src/");
          assert.ok(files.has(`${target}.ts`) || files.has(`${target}.tsx`), `${item.name}: undeclared local import ${specifier}`);
        } else if (specifier.startsWith(".")) {
          const target = path.posix.normalize(path.posix.join(path.posix.dirname(file.path), specifier));
          assert.ok(files.has(target) || files.has(`${target}.ts`) || files.has(`${target}.tsx`), `${item.name}: undeclared relative import ${specifier}`);
        } else {
          const packageName = specifier.startsWith("@") ? specifier.split("/").slice(0, 2).join("/") : specifier.split("/")[0];
          assert.ok(packages.has(packageName), `${item.name}: undeclared package ${packageName}`);
        }
      }
    }
  }
});

test("every neumorphic CSS variable used by source is supplied by every preset", () => {
  const references = new Set();
  for (const item of catalog.items) for (const file of item.files ?? []) {
    const source = fs.readFileSync(path.join(root, file.path), "utf8");
    for (const [, name] of source.matchAll(/var\((--neu-[a-z-]+)\)/g)) references.add(name);
  }
  for (const preset of themePresets) for (const mode of ["light", "dark"]) {
    const tokens = buildThemeVariables({ ...defaultThemeSettings, ...preset.defaults, presetId: preset.id }, mode);
    for (const name of references) assert.ok(tokens[name], `${preset.id}/${mode}: missing ${name}`);
  }
});

function channels(color) { return [1, 3, 5].map(offset => parseInt(color.slice(offset, offset + 2), 16) / 255); }
function luminance(rgb) { const [r,g,b] = rgb.map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4); return r * 0.2126 + g * 0.7152 + b * 0.0722; }
function contrast(a, b) { const [light, dark] = [luminance(a), luminance(b)].sort((a,b) => b-a); return (light+0.05)/(dark+0.05); }
function mix(a, weight, b) { return a.map((channel,index) => channel*weight+b[index]*(1-weight)); }
test("primary gradients and error labels retain readable text in all presets", () => {
  for (const preset of themePresets) for (const mode of ["light", "dark"]) {
    const tokens = buildThemeVariables({ ...defaultThemeSettings, ...preset.defaults, presetId: preset.id }, mode);
    const foreground = channels(tokens["--primary-foreground"]);
    const primary = channels(tokens["--primary"]);
    const toward = tokens["--primary-foreground"] === "#ffffff" ? [0,0,0] : [1,1,1];
    for (const background of [primary, mix(primary, 0.94, toward)]) assert.ok(contrast(foreground, background) >= 4.5, `${preset.id}/${mode}: primary gradient contrast`);
    const error = mode === "light" ? mix(channels(tokens["--destructive"]), 0.76, channels(tokens["--foreground"])) : channels(tokens["--destructive"]);
    assert.ok(contrast(error, channels(tokens["--neu-surface"])) >= 4.5, `${preset.id}/${mode}: field error contrast`);
  }
});
