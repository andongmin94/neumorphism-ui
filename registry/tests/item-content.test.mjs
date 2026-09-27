import assert from "node:assert/strict";
import test from "node:test";
import { assertItemContent } from "../scripts/item-content.mjs";
const expected = { name: "sample", title: "Sample", type: "registry:ui", registryDependencies: ["@neumorphism-ui/utils"], files: [{ path: "src/components/ui/sample.tsx", type: "registry:ui" }] };
const built = { $schema: "https://ui.shadcn.com/schema/registry-item.json", ...expected, files: [{ ...expected.files[0], content: "export const sample = true;\n" }] };
const read = () => "export const sample = true;\n";
test("built endpoint preserves the whole manifest and exact source", () => assertItemContent(built, expected, read));
for (const [name, mutate] of [
  ["omitted file", item => { item.files = []; }],
  ["missing files property", item => { delete item.files; }],
  ["duplicate file", item => { item.files.push({ ...item.files[0] }); }],
  ["unexpected file", item => { item.files.push({ ...item.files[0], path: "src/extra.ts" }); }],
  ["changed install target", item => { item.files[0].target = "app/page.tsx"; }],
  ["changed file type", item => { item.files[0].type = "registry:page"; }],
  ["missing content", item => { delete item.files[0].content; }],
  ["stale source", item => { item.files[0].content = "old source"; }],
  ["lost dependency", item => { item.registryDependencies = []; }],
  ["stale title", item => { item.title = "Old title"; }],
]) test(`rejects ${name}`, () => { const item = structuredClone(built); mutate(item); assert.throws(() => assertItemContent(item, expected, read)); });
test("fileless styles stay valid without a fabricated source file", () => assertItemContent({ $schema: built.$schema, name: "style-air", type: "registry:style" }, { name: "style-air", type: "registry:style" }, () => assert.fail("No source read for fileless items")));
