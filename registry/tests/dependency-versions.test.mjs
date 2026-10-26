import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import ts from "@typescript/typescript6";
import { consumerVersions } from "../scripts/consumer-versions.mjs";

const readJson = relative => JSON.parse(fs.readFileSync(new URL(relative, import.meta.url), "utf8"));
const docs = readJson("../../docs/package.json");
const registry = readJson("../package.json");
const catalog = readJson("../catalog.json");

function dependencyErrors(docsPackage, registryPackage, sourceCatalog) {
  const errors = [];
  const docsVersions = { ...docsPackage.dependencies, ...docsPackage.devDependencies };
  const registryVersions = { ...registryPackage.dependencies, ...registryPackage.devDependencies };
  for (const [name, expected] of Object.entries(registryVersions)) {
    if (name in docsVersions && docsVersions[name] !== expected) errors.push(`${name}: docs ${docsVersions[name]} differs from registry ${expected}`);
  }
  for (const [name, expected] of Object.entries(registryPackage.dependencies)) {
    if (docsPackage.dependencies[name] !== expected) errors.push(`${name}: docs must exercise the registry runtime requirement ${expected}`);
  }
  for (const item of sourceCatalog.items) {
    for (const specifier of item.dependencies ?? []) {
      const separator = specifier.lastIndexOf("@");
      const name = specifier.slice(0, separator);
      const version = specifier.slice(separator + 1);
      if (separator <= 0 || !version || registryPackage.dependencies[name] !== version) {
        errors.push(`${item.name}: installable ${specifier} differs from registry runtime ${name}@${registryPackage.dependencies[name] ?? "(missing)"}`);
      }
    }
  }
  return errors;
}

test("docs, registry and consumer-facing catalog declare the same package requirements", () => {
  assert.deepEqual(dependencyErrors(docs, registry, catalog), []);
  assert.equal(docs.dependencies.react, docs.dependencies["react-dom"]);
});

test("a stale consumer catalog or a docs-only upgrade cannot pass the version contract", () => {
  const staleCatalog = structuredClone(catalog);
  staleCatalog.items.find(item => item.name === "resizable").dependencies = ["react-resizable-panels@^0.0.0"];
  assert.match(dependencyErrors(docs, registry, staleCatalog).join("\n"), /resizable: installable react-resizable-panels@\^0\.0\.0 differs/);
  const changedDocs = structuredClone(docs);
  changedDocs.dependencies["@base-ui/react"] = "^0.0.0";
  assert.match(dependencyErrors(changedDocs, registry, catalog).join("\n"), /@base-ui\/react: docs/);
});

test("both installation matrices use the shared fixture versions and the current docs toolchain", () => {
  for (const [name, version] of Object.entries({ ...docs.dependencies, ...docs.devDependencies })) {
    assert.equal(consumerVersions[name], version, `${name}: consumer fixture differs from docs`);
  }
  assert.equal(consumerVersions["@tailwindcss/postcss"], docs.devDependencies.tailwindcss);
  for (const name of ["next", "@vitejs/plugin-react"]) assert.match(consumerVersions[name], /^\d+\.\d+\.\d+$/);
  for (const filename of ["verify-consumer.mjs", "verify-independent-items.mjs"]) {
    const file = new URL(`../scripts/${filename}`, import.meta.url);
    const ast = ts.createSourceFile(file.pathname, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
    const bindings = ast.statements.filter(ts.isImportDeclaration)
      .filter(statement => statement.moduleSpecifier.text === "./consumer-versions.mjs")
      .flatMap(statement => [...(statement.importClause?.namedBindings?.elements ?? [])]);
    const binding = bindings.find(item => (item.propertyName ?? item.name).text === "consumerVersions");
    assert.ok(binding, `${filename}: installation matrix must import consumerVersions`);
    let used = false;
    function visit(node) {
      if (ts.isImportDeclaration(node)) return;
      if (ts.isIdentifier(node) && node.text === binding.name.text) used = true;
      ts.forEachChild(node, visit);
    }
    visit(ast);
    assert.ok(used, `${filename}: installation matrix must use its shared version import`);
  }
});
