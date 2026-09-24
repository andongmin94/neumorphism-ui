import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { makeRegistry, makeThemeCss, makeBootstrapModule } from "./theme-output.mjs";
const root = fileURLToPath(new URL("../", import.meta.url));
const outputs = [
  [path.join(root, "registry.json"), JSON.stringify(makeRegistry(), null, 2) + "\n"],
  [path.join(root, "../docs/src/theme.css"), makeThemeCss()],
  [path.join(root, "../docs/components/docs/theme-bootstrap.ts"), makeBootstrapModule()],
];
for (const [file, content] of outputs) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}
console.log("Generated catalog, documentation tokens, and bootstrap from one theme engine.");
