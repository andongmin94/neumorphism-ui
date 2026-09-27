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

// Compile workflow fixtures from the exact preview source, never a second copy.
for (const slug of ["calendar", "date-picker", "data-table", "toast"]) {
  const source = fs.readFileSync(path.join(root, `../docs/components/examples/${slug}.tsx`), "utf8")
    .replaceAll("@neumorphism-ui/registry/ui/", "@/components/ui/");
  const lines = source.split("\n");
  const lastImport = lines.reduce((last, line, index) => line.startsWith("import ") ? index : last, 0);
  const compiled = `${lines.slice(0, lastImport + 1).join("\n")}\n${lines.slice(lastImport + 1).join("\n").trim()}\n`;
  fs.writeFileSync(path.join(root, `tests/examples/${slug}.tsx`), compiled);
}
