import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { buildThemeVariables, defaultThemeSettings, themePresets, themeLightDirections, themeDepthIds } from "../src/theme.ts";

test("plate material follows every preset, mode, depth and light direction", () => {
  for (const preset of themePresets) for (const mode of ["light", "dark"]) for (const lightDirection of themeLightDirections) for (const depth of themeDepthIds) {
    const tokens = buildThemeVariables({ ...defaultThemeSettings, ...preset.defaults, presetId: preset.id, lightDirection, depth }, mode);
    const shadow = tokens["--neu-shadow-plate"];
    assert.ok(shadow && !shadow.includes("undefined") && !shadow.includes("NaN"));
    assert.ok(!shadow.includes("inset"));
    assert.match(shadow, /3px -1px/);
    assert.equal(shadow.startsWith("-1px"), lightDirection.endsWith("right"));
  }
});

test("accent Card owns readable body and description colors in installed source", () => {
  const card = readFileSync(new URL("../src/components/ui/card.tsx", import.meta.url), "utf8");
  assert.match(card, /accent:.*--primary.*--neu-fill-primary.*--neu-shadow-plate/);
  assert.match(card, /--card-foreground:var\(--primary-foreground\)/);
  assert.match(card, /card-description.*--primary-foreground/);
});
