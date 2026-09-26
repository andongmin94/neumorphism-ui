import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import ts from "@typescript/typescript6";
import { componentDocs } from "../../docs/components/docs/component-docs-data.ts";
import { makeRegistry } from "../scripts/theme-output.mjs";
const root = fileURLToPath(new URL("../", import.meta.url));

test("the public component directory exactly matches the installable UI catalog", () => {
  const ui = makeRegistry().items.filter(item => item.type === "registry:ui").map(item => item.name).sort();
  assert.deepEqual(componentDocs.map(item => item.slug).sort(), ui);
});

test("compiled expanded examples are exactly the code displayed in English documentation", () => {
  const file = path.join(root, "../docs/i18n/component-usage-code.en.ts");
  const ast = ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
  const declaration = ast.statements.filter(ts.isVariableStatement).flatMap(statement => [...statement.declarationList.declarations]).find(declaration => declaration.name.getText(ast) === "componentUsageCodeEn");
  assert.ok(declaration && ts.isCallExpression(declaration.initializer));
  const usage = new Map(declaration.initializer.arguments[0].properties.map(property => [property.name.text, property.initializer.text]));
  for (const name of fs.readdirSync(path.join(root, "tests/examples"))) {
    const slug = name.replace(/\.tsx$/, "");
    const doc = componentDocs.find(item => item.slug === slug);
    assert.ok(doc && usage.get(slug), slug);
    assert.equal(fs.readFileSync(path.join(root, "tests/examples", name), "utf8"), `${doc.importCode}\n${usage.get(slug)}\n`, `${slug}: displayed and type-checked code diverged`);
  }
});

test("button hover changes elevation instead of reducing text contrast with brightness filters", () => {
  const source = fs.readFileSync(path.join(root, "src/components/ui/button.tsx"), "utf8");
  assert.doesNotMatch(source, /(?:hover|active):brightness-/);
  assert.match(source, /hover:shadow-\[var\(--neu-shadow-hover\)\]/);
});
