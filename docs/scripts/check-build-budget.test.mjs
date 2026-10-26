import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { gzipSync } from "node:zlib";
import { enforceBudgets, initialAssets, measureBuild } from "./check-build-budget.mjs";

test("initial assets include entry scripts, modulepreloads and CSS once, excluding inline examples", () => {
  const assets = initialAssets(`
    <!-- <script type="module" src="/assets/old.js"></script> -->
    <script>const example = '<link rel="stylesheet" href="/assets/example.css">';</script>
    <SCRIPT TYPE="module" SRC="/assets/entry.js"></SCRIPT>
    <script src='/assets/classic.js'></script>
    <link rel=modulepreload href="/assets/shared.js?hash=1">
    <link rel="modulepreload" href='/assets/shared.js?hash=2'>
    <link rel="preload" as="style" href="/assets/app.css">
    <link rel="stylesheet" href="/assets/app.css">
    <link rel="alternate" href="https://example.com/not-an-asset.css">
    <link rel="preload" as="font" href="/assets/font.woff2">
  `, "/en");
  assert.deepEqual([...assets.javascript], ["/assets/entry.js", "/assets/classic.js", "/assets/shared.js"]);
  assert.deepEqual([...assets.stylesheet], ["/assets/app.css"]);
});

test("external, missing and escaping initial assets cannot silently bypass the budget", () => {
  const style = '<link rel="stylesheet" href="/assets/app.css">';
  for (const source of ["https://cdn.example.com/entry.js", "/outside.js", "/assets/%2e%2e/outside.js", "/assets/%2f..%2foutside.js"]) {
    assert.throws(() => initialAssets(`<script type="module" src="${source}"></script>${style}`, "/en"));
  }
  assert.throws(() => initialAssets(style, "/en"), /no initial JavaScript/);
  assert.throws(() => initialAssets('<script type="module" src="/assets/main.js"></script>', "/en"), /no initial stylesheets/);
});

test("the compressed per-page sum is measured from emitted bytes and enforced at its boundary", t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "neumorphism-budget-"));
  t.after(() => {
    assert.equal(path.dirname(root), path.resolve(os.tmpdir()));
    assert.match(path.basename(root), /^neumorphism-budget-/);
    fs.rmSync(root, { recursive: true, force: true });
  });
  fs.mkdirSync(path.join(root, "en"));
  fs.mkdirSync(path.join(root, "assets"));
  const entry = 'console.log("entry");';
  const shared = 'export const name = "shared";';
  const style = ":root { color: blue; }";
  fs.writeFileSync(path.join(root, "en/index.html"), '<script type="module" src="/assets/entry.js"></script><link rel="modulepreload" href="/assets/shared.js"><link rel="stylesheet" href="/assets/app.css">');
  fs.writeFileSync(path.join(root, "assets/entry.js"), entry);
  fs.writeFileSync(path.join(root, "assets/shared.js"), shared);
  fs.writeFileSync(path.join(root, "assets/app.css"), style);
  // A large, unrelated lazy chunk must not inflate the initial page budget.
  fs.writeFileSync(path.join(root, "assets/lazy-language.js"), "ignored ".repeat(1000));
  const pages = measureBuild(root, ["/en"]);
  const javascript = gzipSync(entry).length + gzipSync(shared).length;
  const stylesheet = gzipSync(style).length;
  assert.equal(pages[0].javascript.gzipBytes, javascript);
  assert.equal(pages[0].stylesheet.gzipBytes, stylesheet);
  assert.equal(pages[0].javascript.files.length, 2);
  assert.doesNotThrow(() => enforceBudgets(pages, { "/en": { javascript, stylesheet } }));
  assert.throws(() => enforceBudgets(pages, { "/en": { javascript: javascript - 1, stylesheet } }), /Initial asset budget exceeded/);
  assert.throws(() => enforceBudgets(pages, { "/en": { javascript, stylesheet: stylesheet - 1 } }), /Initial asset budget exceeded/);
  fs.unlinkSync(path.join(root, "assets/shared.js"));
  assert.throws(() => measureBuild(root, ["/en"]), /ENOENT/);
});
