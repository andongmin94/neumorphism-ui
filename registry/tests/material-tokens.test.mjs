import assert from "node:assert/strict";
import { test } from "node:test";
import { buildThemeVariables, defaultThemeSettings, getThemePreset, themePresetIds } from "../src/theme.ts";
test("all material presets retain distinct tinted hover and recessed fill", () => {
  for (const preset of themePresetIds) for (const mode of ["light", "dark"]) {
    const tokens = buildThemeVariables({ ...defaultThemeSettings, ...getThemePreset(preset).defaults, presetId: preset }, mode);
    assert.notEqual(tokens["--neu-shadow-primary-hover"], tokens["--neu-shadow-hover"]);
    assert.match(tokens["--neu-fill-inset"], /^linear-gradient/);
    if (mode === "light") assert.equal(tokens["--neu-edge"], "transparent");
    else assert.match(tokens["--neu-edge"], /color-mix/);
  }
});
