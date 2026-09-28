import fs from "node:fs";
import assert from "node:assert/strict";
import ts from "@typescript/typescript6";
import { componentDocs } from "../../docs/components/docs/component-docs-data.ts";
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

// Other compilation fixtures come from the exact English snippets shown to users.
// Keep the four live-source workflow fixtures above as their primary source.
const workflowExamples = new Set(["calendar", "date-picker", "data-table", "toast"]);
const usageFile = path.join(root, "../docs/i18n/component-usage-code.en.ts");
const ast = ts.createSourceFile(usageFile, fs.readFileSync(usageFile, "utf8"), ts.ScriptTarget.Latest, true);
const declaration = ast.statements.filter(ts.isVariableStatement)
  .flatMap(statement => [...statement.declarationList.declarations])
  .find(item => item.name.getText(ast) === "componentUsageCodeEn");
assert.ok(declaration && ts.isCallExpression(declaration.initializer), "English examples must be a static object");
const usage = new Map(declaration.initializer.arguments[0].properties.map(property => [property.name.text, property.initializer.text]));
for (const filename of fs.readdirSync(path.join(root, "tests/examples"))) {
  const slug = filename.replace(/\.tsx$/, "");
  if (workflowExamples.has(slug)) continue;
  const doc = componentDocs.find(item => item.slug === slug);
  assert.ok(doc && typeof usage.get(slug) === "string", `Missing displayed example: ${slug}`);
  fs.writeFileSync(path.join(root, "tests/examples", filename), `${doc.importCode}\n${usage.get(slug)}\n`);
}
