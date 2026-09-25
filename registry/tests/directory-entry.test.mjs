import assert from "node:assert/strict";
import fs from "node:fs";

const entry = JSON.parse(
  fs.readFileSync(new URL("../directory-entry.json", import.meta.url), "utf8"),
);

assert.equal(entry.name, "@neumorphism-ui");
assert.equal(entry.homepage, "https://neumorphism-ui.dev");
assert.equal(entry.url, "https://neumorphism-ui.dev/r/{name}.json");
assert.match(entry.description, /Base UI/);
assert.match(entry.logo, /^<svg\b/);
assert.match(entry.logo, /viewBox=['"]0 0 200 200['"]/);
