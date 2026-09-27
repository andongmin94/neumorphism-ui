import assert from "node:assert/strict";

/** Compare a built endpoint with its complete source-owned manifest. */
export function assertItemContent(built, expected, readSource) {
  assert.equal(built.$schema, "https://ui.shadcn.com/schema/registry-item.json", `${expected.name}: item schema`);
  for (const [key, value] of Object.entries(expected)) {
    if (key !== "files") assert.deepEqual(built[key], value, `${expected.name}: ${key} differs from source`);
  }
  const files = built.files ?? [];
  assert.ok(Array.isArray(files), `${expected.name}: files must be an array`);
  const paths = files.map(file => file.path);
  assert.equal(new Set(paths).size, paths.length, `${expected.name}: duplicate file paths`);
  assert.deepEqual(files.map(({ content, ...metadata }) => metadata), expected.files ?? [], `${expected.name}: file set or install targets differ from source`);
  for (const file of files) {
    assert.equal(typeof file.content, "string", `${expected.name}: missing file content`);
    assert.equal(file.content, readSource(file.path), `${expected.name}: installable source differs: ${file.path}`);
  }
}
