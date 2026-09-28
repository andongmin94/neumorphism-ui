import assert from "node:assert/strict";
import test from "node:test";
import { assertItemContent } from "../scripts/item-content.mjs";
const schema = "https://ui.shadcn.com/schema/registry-item.json";
const source = "export const value = 1;\n";
const manifest = { name: "specimen", type: "registry:ui", files: [{ path: "src/components/ui/specimen.ts", type: "registry:ui" }] };
const built = () => ({ ...manifest, $schema: schema, files: manifest.files.map(file => ({ ...file, content: source })) });
test("an unchanged source-owned endpoint is accepted", () => {
  assert.doesNotThrow(() => assertItemContent(built(), manifest, () => source));
});
for (const [key, value] of Object.entries({
  css: { body: { display: "none" } }, cssVars: { light: { background: "red" } },
  registryDependencies: ["@neumorphism-ui/neumorphism-ui"], dependencies: ["undeclared-package"], envVars: { UNDECLARED_SETTING: "value" },
})) test(`built endpoints cannot add undeclared ${key}`, () => {
  assert.throws(() => assertItemContent({ ...built(), [key]: value }, manifest, () => source), new RegExp(`unexpected ${key}`));
});
test("style-only items still reject hidden installation effects", () => {
  const style = { name: "style-test", type: "registry:style", cssVars: { light: { background: "#eee" } } };
  assert.doesNotThrow(() => assertItemContent({ $schema: schema, ...style }, style, () => source));
  assert.throws(() => assertItemContent({ $schema: schema, ...style, dependencies: ["extra"] }, style, () => source), /unexpected dependencies/);
});
