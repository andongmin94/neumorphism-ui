import { readRegistry, validateRegistry } from "./registry-utils.mjs";

const registry = readRegistry();
const errors = validateRegistry(registry);

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log(`Validated ${registry.items.length} registry items.`);
