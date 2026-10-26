import fs from "node:fs";

const registry = JSON.parse(fs.readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const docs = JSON.parse(fs.readFileSync(new URL("../../docs/package.json", import.meta.url), "utf8"));

// Both consumer matrices exercise the same package versions as the docs.
// Only tools absent from the docs package need their own fixture versions.
export const consumerVersions = {
  ...registry.dependencies,
  ...registry.devDependencies,
  ...docs.dependencies,
  ...docs.devDependencies,
  next: "16.4.3",
  "@vitejs/plugin-react": "6.1.2",
  "@tailwindcss/postcss": docs.devDependencies.tailwindcss,
};
