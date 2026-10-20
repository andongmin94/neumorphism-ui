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

test("light raised highlights are softer without changing dark or inset material", () => {
  for (const preset of themePresetIds) {
    const settings = { ...defaultThemeSettings, ...getThemePreset(preset).defaults, presetId: preset };
    for (const mode of ["light", "dark"]) {
      const tokens = buildThemeVariables(settings, mode);
      const expected = mode === "light" ? { small: 64, plate: 68, large: 74 } : { small: 84, plate: 84, large: 94 };
      assert.ok(tokens["--neu-shadow-raised-sm"].includes(`${expected.small}%, transparent`));
      assert.ok(tokens["--neu-shadow-plate"].includes(`${expected.plate}%, transparent`));
      assert.ok(tokens["--neu-shadow-raised"].includes(`${expected.large}%, transparent`));
      assert.ok(tokens["--neu-shadow-hover"].includes(`${expected.small}%, transparent`));
      assert.ok(tokens["--neu-shadow-primary"].includes(`${expected.small}%, transparent`));
      assert.match(tokens["--neu-shadow-inset"], /inset/);
      assert.match(tokens["--neu-shadow-inset-sm"], /inset/);
      assert.doesNotMatch(tokens["--neu-shadow-plate"], /inset/);
    }
  }
});
