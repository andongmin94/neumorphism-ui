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

test("documented UI import symbols exist in installable registry sources", () => {
  for (const doc of componentDocs) {
    const imports = ts.createSourceFile(`${doc.slug}-imports.tsx`, doc.importCode, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    assert.equal(imports.parseDiagnostics.length, 0, `${doc.slug}: import example has syntax errors`);
    for (const statement of imports.statements.filter(ts.isImportDeclaration)) {
      const specifier = statement.moduleSpecifier.text;
      if (!specifier.startsWith("@/components/ui/")) continue;
      const name = specifier.slice("@/components/ui/".length);
      const file = path.join(root, "src/components/ui", `${name}.tsx`);
      assert.ok(fs.existsSync(file), `${doc.slug}: imports missing installable module ${name}`);
      const source = ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
      const exported = new Set();
      for (const node of source.statements) {
        if (ts.isExportDeclaration(node) && node.exportClause && ts.isNamedExports(node.exportClause)) {
          for (const element of node.exportClause.elements) exported.add(element.name.text);
        }
        const modifiers = ts.canHaveModifiers(node) ? ts.getModifiers(node) ?? [] : [];
        if (!modifiers.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)) continue;
        if (node.name && ts.isIdentifier(node.name)) exported.add(node.name.text);
        if (ts.isVariableStatement(node)) for (const declaration of node.declarationList.declarations) {
          if (ts.isIdentifier(declaration.name)) exported.add(declaration.name.text);
        }
      }
      const bindings = statement.importClause?.namedBindings;
      if (bindings && ts.isNamedImports(bindings)) for (const element of bindings.elements) {
        const imported = (element.propertyName ?? element.name).text;
        assert.ok(exported.has(imported), `${doc.slug}: ${name} does not export ${imported}`);
      }
    }
  }
});

test("localized source examples are parseable TSX and refer only to catalog component pages", () => {
  const installed = new Set(makeRegistry().items.filter(item => item.type === "registry:ui").map(item => item.name));
  const bySlug = new Map(componentDocs.map(doc => [doc.slug, doc]));
  const localized = [
    ["ko", new Map(componentDocs.map(doc => [doc.slug, doc.usageCode]))],
  ];
  for (const locale of ["en", "ja", "zh"]) {
    const file = path.join(root, `../docs/i18n/component-usage-code.${locale}.ts`);
    const ast = ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
    assert.equal(ast.parseDiagnostics.length, 0, `${locale}: invalid usage-code module`);
    const declaration = ast.statements.filter(ts.isVariableStatement)
      .flatMap(statement => [...statement.declarationList.declarations])
      .find(item => item.name.getText(ast) === `componentUsageCode${locale[0].toUpperCase() + locale.slice(1)}`);
    assert.ok(declaration && ts.isCallExpression(declaration.initializer), `${locale}: missing usage codes`);
    const properties = declaration.initializer.arguments[0].properties;
    const examples = new Map();
    for (const property of properties) {
      assert.ok(ts.isPropertyAssignment(property) && ts.isStringLiteralLike(property.initializer));
      const name = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name) ? property.name.text : null;
      assert.ok(name);
      examples.set(name, property.initializer.text);
    }
    localized.push([locale, examples]);
  }
  for (const [locale, examples] of localized) for (const [slug, usage] of examples) {
    assert.ok(installed.has(slug) && bySlug.has(slug), `${locale}: unknown usage example ${slug}`);
    const source = ts.createSourceFile(`${locale}-${slug}.tsx`, `${bySlug.get(slug).importCode}\n${usage}`,
      ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    assert.equal(source.parseDiagnostics.length, 0,
      `${locale}/${slug}: syntax error in documented example: ${source.parseDiagnostics.map(e => ts.flattenDiagnosticMessageText(e.messageText, " ")).join("; ")}`);
  }
});
