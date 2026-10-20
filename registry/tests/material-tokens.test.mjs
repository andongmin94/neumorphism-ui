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

test("light-mode raised edges retain a crisp directional rim without changing recessed or dark shadows", () => {
  const directions = {
    "top-left": [1, 1],
    "top-right": [-1, 1],
    "bottom-left": [1, -1],
    "bottom-right": [-1, -1],
  };
  for (const presetId of themePresetIds) {
    for (const [lightDirection, [x, y]] of Object.entries(directions)) {
      const settings = { ...defaultThemeSettings, ...getThemePreset(presetId).defaults, presetId, lightDirection };
      const light = buildThemeVariables(settings, "light");
      const dark = buildThemeVariables(settings, "dark");
      const rim = `${-x}px ${-y}px 1px 0px color-mix(in srgb, `;
      for (const key of ["--neu-shadow-raised-sm", "--neu-shadow-plate", "--neu-shadow-hover"]) {
        assert.ok(key === "--neu-shadow-plate" ? light[key].includes(`, ${rim}`) : light[key].startsWith(rim), `${presetId}/${lightDirection}/${key} missing lit edge`);
        assert.match(light[key], /54%, transparent/);
        assert.doesNotMatch(light[key], /inset /);
        assert.ok(!dark[key].startsWith(rim), `${presetId}/${lightDirection}/${key} changed dark material`);
      }
      assert.doesNotMatch(light["--neu-shadow-inset"], /54%, transparent/);
      assert.equal(light["--neu-edge"], "transparent");
    }
  }
});
