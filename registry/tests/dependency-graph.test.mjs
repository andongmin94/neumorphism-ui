import assert from "node:assert/strict";
import test from "node:test";
import { readRegistry, validateRegistry } from "../scripts/registry-utils.mjs";
test("the current registry has an acyclic local dependency graph", () => {
  assert.deepEqual(validateRegistry(readRegistry()), []);
});
test("two valid local references cannot introduce an installation cycle", () => {
  const registry = readRegistry();
  const first = registry.items.find(item => item.name === "button");
  const second = registry.items.find(item => item.name === "card");
  first.registryDependencies = [...new Set([...first.registryDependencies, "@neumorphism-ui/card"])];
  second.registryDependencies = [...new Set([...second.registryDependencies, "@neumorphism-ui/button"])];
  assert.match(validateRegistry(registry).join("\n"), /Registry dependency cycle:/);
});
