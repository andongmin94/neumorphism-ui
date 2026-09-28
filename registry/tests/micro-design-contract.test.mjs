import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
const read = p => fs.readFileSync(new URL(p, import.meta.url), "utf8");

test("micro-design shipping source does not depend on documentation presentation CSS", () => {
  const table = read("../src/components/ui/table.tsx");
  assert.ok(!table.includes('"use client"'), "scroll cues must not force server tables into client components");
  assert.match(table, /backgroundAttachment: "local, local, scroll, scroll"/);
  const marquee = read("../src/components/ui/marquee.tsx");
  assert.match(marquee, /data-slot="marquee-viewport"/);
  assert.match(marquee, /prefers-reduced-motion: reduce/);
  assert.match(marquee, /flex-wrap: wrap/);
  assert.match(marquee, /aria-hidden="true" inert/);
  for (const file of ["marquee", "pagination", "breadcrumb", "resizable", "switch", "input-group", "table", "accordion", "collapsible", "toast"]) {
    assert.doesNotMatch(read(`../src/components/ui/${file}.tsx`), /from ["'].*docs\//);
  }
});
test("all authored breadcrumb examples use an atomic destination item", () => {
  for (const filename of ["component-detail-preview.tsx", "registry-showcase.tsx", "component-docs-data.ts"]) {
    assert.doesNotMatch(read(`../../docs/components/docs/${filename}`), /<BreadcrumbSeparator\s*\/>\s*<BreadcrumbItem/);
  }
  for (const locale of ["en", "ja", "zh"]) {
    assert.doesNotMatch(read(`../../docs/i18n/component-usage-code.${locale}.ts`), /<BreadcrumbSeparator\s*\/>\s*<BreadcrumbItem/);
  }
  const css = read("../../docs/src/app.css");
  assert.doesNotMatch(css, /component-preview-pagination-wide|pagination-desktop-only/);
});
