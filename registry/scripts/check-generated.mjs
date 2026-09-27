import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { makeRegistry, makeThemeCss, makeBootstrapModule } from "./theme-output.mjs";
import { assertItemContent } from "./item-content.mjs";
const root = fileURLToPath(new URL("../", import.meta.url));
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const registry = makeRegistry();
assert.deepEqual(JSON.parse(read("registry.json")), registry);
assert.equal(read("../docs/src/theme.css"), makeThemeCss());
assert.equal(read("../docs/components/docs/theme-bootstrap.ts"), makeBootstrapModule());
const expectedFiles = [...registry.items.map((item) => `${item.name}.json`), "registry.json"].sort();
assert.deepEqual(fs.readdirSync(path.join(root, "public/r")).sort(), expectedFiles);
assert.deepEqual(fs.readdirSync(path.join(root, "../docs/public/r")).sort(), expectedFiles);
for (const name of expectedFiles) assert.equal(read(`public/r/${name}`), read(`../docs/public/r/${name}`), `Out-of-sync endpoint: ${name}`);
for (const expected of registry.items) {
  const built = JSON.parse(read(`public/r/${expected.name}.json`));
  assertItemContent(built, expected, read);
}
console.log(`Verified ${registry.items.length} complete item manifests, install targets, shared tokens, bootstrap, and both endpoint copies.`);
