import assert from "node:assert/strict";
import path from "node:path";
import fs from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";
import ts from "@typescript/typescript6";
import { componentDocs } from "../../docs/components/docs/component-docs-data.ts";
import { componentUsageExamples } from "../../docs/components/docs/component-usage-examples.ts";
import { getComponentGuide } from "../../docs/i18n/component-guides.ts";

const docsRoot = fileURLToPath(new URL("../../docs/", import.meta.url));

test("every installable component has a minimal usage example and guidance in all four languages", () => {
  assert.deepEqual(Object.keys(componentUsageExamples).sort(), componentDocs.map(doc => doc.slug).sort());
  for (const doc of componentDocs) {
    assert.notEqual(componentUsageExamples[doc.slug].trim(), doc.usageCode.trim(), `${doc.slug}: minimum usage repeats the showcase`);
    for (const locale of ["en", "ko", "ja", "zh"]) {
      const guide = getComponentGuide(locale, doc.slug);
      for (const field of ["purpose", "usage", "exampleTitle", "exampleDescription"]) {
        assert.ok(guide[field]?.trim(), `${locale}/${doc.slug}: missing ${field}`);
      }
    }
  }
});

function checkExamples(examples) {
  const config = ts.readConfigFile(path.join(docsRoot, "tsconfig.json"), ts.sys.readFile);
  assert.equal(config.error, undefined);
  const { options, errors } = ts.parseJsonConfigFileContent(config.config, ts.sys, docsRoot);
  assert.equal(errors.length, 0);
  // Virtual files keep documentation snippets as the only maintained source.
  const files = new Map(examples.map(([name, source]) => [
    path.join(docsRoot, ".guide-examples", `${name}.tsx`).replaceAll("\\", "/"), source,
  ]));
  const host = ts.createCompilerHost(options);
  host.getCurrentDirectory = () => docsRoot;
  const readFile = host.readFile;
  const fileExists = host.fileExists;
  const getSourceFile = host.getSourceFile;
  host.readFile = file => files.get(file) ?? readFile(file);
  host.fileExists = file => files.has(file) || fileExists(file);
  host.getSourceFile = (file, version, onError, shouldCreateNewSourceFile) => files.has(file)
    ? ts.createSourceFile(file, files.get(file), version, true, ts.ScriptKind.TSX)
    : getSourceFile(file, version, onError, shouldCreateNewSourceFile);
  const program = ts.createProgram([...files.keys()], options, host);
  const diagnostics = ts.getPreEmitDiagnostics(program);
  const messages = diagnostics.map(diagnostic => {
    const location = diagnostic.file && diagnostic.start !== undefined
      ? `${path.relative(docsRoot, diagnostic.file.fileName)}:${diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start).line + 1}: `
      : "";
    return location + ts.flattenDiagnosticMessageText(diagnostic.messageText, " ");
  });
  assert.deepEqual(messages, [], messages.join("\n"));
}

test("all copyable minimal usage examples type-check independently against the installed component APIs", () => {
  checkExamples(Object.entries(componentUsageExamples));
});

function previewExamples() {
  const examples = componentDocs.map(doc => ({ locale: "ko", slug: doc.slug, code: `${doc.importCode}\n${doc.usageCode}` }));
  for (const locale of ["en", "ja", "zh"]) {
    const file = path.join(docsRoot, `i18n/component-usage-code.${locale}.ts`);
    const ast = ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
    const declaration = ast.statements.filter(ts.isVariableStatement)
      .flatMap(statement => [...statement.declarationList.declarations])
      .find(item => item.name.getText(ast) === `componentUsageCode${locale[0].toUpperCase() + locale.slice(1)}`);
    assert.ok(declaration && ts.isCallExpression(declaration.initializer), `${locale}: missing preview code`);
    const usage = new Map(declaration.initializer.arguments[0].properties.map(property => [property.name.text, property.initializer.text]));
    for (const doc of componentDocs) {
      assert.equal(typeof usage.get(doc.slug), "string", `${locale}/${doc.slug}: missing preview code`);
      examples.push({ locale, slug: doc.slug, code: `${doc.importCode}\n${usage.get(doc.slug)}` });
    }
  }
  return examples;
}

test("the full preview source includes its imports and data in every language", () => {
  checkExamples(previewExamples().map(({ locale, slug, code }) => [`${locale}-${slug}`, code]));
});

test("documented showcase controls, variants and interaction props match their rendered previews", () => {
  const actual = new Map();
  function visit(node, callback) {
    callback(node);
    ts.forEachChild(node, child => visit(child, callback));
  }
  const expanded = new Set(["command", "context-menu", "input-otp", "sidebar", "image-card", "marquee"]);
  for (const name of ["component-detail-preview", "expanded-component-preview"]) {
    const file = path.join(docsRoot, `components/docs/${name}.tsx`);
    const ast = ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    visit(ast, node => {
      if (ts.isCaseClause(node) && ts.isStringLiteral(node.expression)
          && (name === "component-detail-preview" || expanded.has(node.expression.text))) {
        actual.set(node.expression.text, { node, ast });
      }
    });
  }
  const navigationFile = path.join(docsRoot, "components/docs/navigation-preview.tsx");
  const navigationAst = ts.createSourceFile(navigationFile, fs.readFileSync(navigationFile, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const navigation = navigationAst.statements.find(node => ts.isFunctionDeclaration(node) && node.name.text === "NavigationPreview");
  actual.set("navigation-menu", { node: navigation.body.statements.find(ts.isIfStatement).thenStatement, ast: navigationAst });
  actual.set("menubar", { node: navigation.body.statements.find(ts.isReturnStatement), ast: navigationAst });
  assert.equal(actual.size, 34);

  const props = new Set(["variant", "size", "disabled", "defaultChecked", "defaultValue", "checked", "value", "multiple", "maxLength", "min", "max", "step", "orientation", "type", "showCloseButton", "collapsible", "swipeDirection", "delay", "duration"]);
  function controls(node, ast) {
    const result = [];
    visit(node, child => {
      if (!ts.isJsxOpeningElement(child) && !ts.isJsxSelfClosingElement(child)) return;
      const tag = child.tagName.getText(ast);
      if (!/^[A-Z]/.test(tag) || ["PreviewStack", "PreviewField"].includes(tag)) return;
      const attributes = child.attributes.properties.filter(ts.isJsxAttribute)
        .filter(attribute => props.has(attribute.name.text) || /^on[A-Z]/.test(attribute.name.text))
        .map(attribute => [attribute.name.text, /^on[A-Z]/.test(attribute.name.text) ? "handler" : attribute.initializer?.getText(ast).replace(/\s+/g, "") ?? true]);
      result.push([tag, attributes.sort((a, b) => a[0].localeCompare(b[0]))]);
    });
    return result;
  }
  for (const { locale, slug, code } of previewExamples()) {
    if (!actual.has(slug)) continue;
    const ast = ts.createSourceFile(`${locale}-${slug}.tsx`, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const example = ast.statements.find(node => ts.isFunctionDeclaration(node) && node.name?.text === "Example");
    assert.ok(example, `${locale}/${slug}: missing complete Example`);
    const expected = actual.get(slug);
    assert.deepEqual(controls(example.body, ast), controls(expected.node, expected.ast), `${locale}/${slug}: showcase differs from rendered controls`);
  }
});
