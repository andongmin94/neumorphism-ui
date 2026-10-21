import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const read = name => readFileSync(new URL(`../src/components/ui/${name}.tsx`, import.meta.url), "utf8");

test("soft secondary actions are raised and pressed while ghost remains flat", () => {
  const button = read("button");
  const soft = button.match(/soft:\s*\n\s*"([^"]+)"/)?.[1];
  const ghost = button.match(/ghost:\s*\n\s*"([^"]+)"/)?.[1];
  assert.ok(soft && ghost);
  assert.match(soft, /border-transparent/);
  assert.match(soft, /shadow-\[var\(--neu-shadow-raised-sm\)\]/);
  assert.match(soft, /hover:shadow-\[var\(--neu-shadow-hover\)\]/);
  assert.match(soft, /active:shadow-\[var\(--neu-shadow-inset\)\]/);
  assert.match(soft, /active:\[background-image:var\(--neu-fill-inset\)\]/);
  assert.match(ghost, /shadow-none/);
  assert.doesNotMatch(soft, /shadow-none/);
});

test("raised compact controls do not mix an outlined perimeter with their shadows", () => {
  const cases = [
    ["number-field", "const stepClass"],
    ["input-group", "function InputGroupButton"],
    ["calendar", "button_previous:"],
    ["calendar", "button_next:"],
    ["pagination", 'isActive\n          ? "border-transparent'],
    ["toast", "<Primitive.Action"],
    ["marquee", 'data-slot="marquee-toggle"'],
    ["avatar", "group/avatar relative"],
    ["chart", 'data-slot="chart"'],
  ];
  for (const [name, marker] of cases) {
    const source = read(name);
    const start = source.indexOf(marker);
    assert.ok(start >= 0, `${name}: missing ${marker}`);
    const near = source.slice(start, start + 1150);
    assert.match(near, /border-transparent/, `${name}: the raised control regained a perimeter stroke`);
    assert.doesNotMatch(near.slice(0, near.indexOf("border-transparent")), /border-\[color:var\(--neu-edge\)\]/);
  }
});
