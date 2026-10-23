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

test("API table prop names exist on the installed component types", () => {
  const config = ts.readConfigFile(path.join(root, "tsconfig.json"), ts.sys.readFile);
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
  const program = ts.createProgram(parsed.fileNames, parsed.options);
  const checker = program.getTypeChecker();
  function propNames(type) {
    const members = type.isUnion() ? type.types : [type];
    return new Set(members.flatMap(member => checker.getPropertiesOfType(member).map(property => property.name)));
  }

  for (const doc of componentDocs) {
    const file = program.getSourceFile(path.join(root, "src/components/ui", `${doc.slug}.tsx`));
    assert.ok(file, `${doc.slug}: missing source file`);
    const exported = checker.getExportsOfModule(checker.getSymbolAtLocation(file));
    for (const row of doc.props) {
      // Hook return methods and summaries of all forwarded HTML/Recharts props are not individual props.
      if (!/^[A-Z]/.test(row.component) || row.name === "props") continue;
      for (const component of row.component.split(" / ")) {
        const symbol = exported.find(item => item.name === component)
          ?? exported.find(item => item.name === `${doc.title.replaceAll(" ", "")}${component}`);
        assert.ok(symbol, `${doc.slug}: undocumented export ${component}`);
        const signature = checker.getTypeOfSymbolAtLocation(symbol, file).getCallSignatures()[0];
        assert.ok(signature?.parameters[0], `${doc.slug}/${component}: missing props type`);
        const props = propNames(checker.getTypeOfSymbolAtLocation(signature.parameters[0], file));
        for (const name of row.name.split(" / ")) {
          if (!/^[A-Za-z][\w-]*$/.test(name) || /^(?:aria|data)-/.test(name)) continue;
          assert.ok(props.has(name), `${doc.slug}/${component}: API table documents missing prop ${name}`);
        }
      }
    }
  }
});

test("all localized Button snippets show the same variants, sizes and disabled state as the preview", () => {
  function buttons(source) {
    const ast = ts.createSourceFile("button.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const result = [];
    function visit(node) {
      if ((ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) && node.tagName.getText(ast) === "Button") {
        const attributes = new Map(node.attributes.properties.filter(ts.isJsxAttribute).map(attribute => [attribute.name.getText(ast), attribute.initializer]));
        result.push({
          variant: attributes.get("variant")?.text ?? "default",
          size: attributes.get("size")?.text ?? "default",
          disabled: attributes.has("disabled"),
          labelledIcon: attributes.has("aria-label"),
        });
      }
      ts.forEachChild(node, visit);
    }
    visit(ast);
    return result;
  }
  const previewPath = path.join(root, "../docs/components/docs/component-detail-preview.tsx");
  const preview = ts.createSourceFile(previewPath, fs.readFileSync(previewPath, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let buttonCase;
  function findCase(node) {
    if (ts.isCaseClause(node) && ts.isStringLiteral(node.expression) && node.expression.text === "button") buttonCase = node;
    ts.forEachChild(node, findCase);
  }
  findCase(preview);
  assert.ok(buttonCase);
  const expected = buttons(buttonCase.getText(preview));
  assert.equal(expected.length, 10);
  assert.deepEqual(buttons(componentDocs.find(doc => doc.slug === "button").usageCode), expected, "ko");
  for (const locale of ["en", "ja", "zh"]) {
    const source = fs.readFileSync(path.join(root, `../docs/i18n/component-usage-code.${locale}.ts`), "utf8");
    const ast = ts.createSourceFile(locale, source, ts.ScriptTarget.Latest, true);
    let snippet;
    function findButton(node) {
      if (ts.isPropertyAssignment(node) && node.name.getText(ast) === "button" && ts.isStringLiteralLike(node.initializer)) snippet = node.initializer.text;
      ts.forEachChild(node, findButton);
    }
    findButton(ast);
    assert.equal(typeof snippet, "string", `${locale}: missing Button snippet`);
    assert.deepEqual(buttons(snippet), expected, locale);
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
