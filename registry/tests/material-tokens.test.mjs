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

test("raised borders resolve to a directional zero-blur rim in every preset and mode", () => {
  const directions = {
    "top-left": [1, 1], "top-right": [-1, 1],
    "bottom-left": [1, -1], "bottom-right": [-1, -1],
  };
  for (const presetId of themePresetIds) {
    const preset = getThemePreset(presetId);
    for (const [lightDirection, [x, y]] of Object.entries(directions)) {
      const settings = { ...defaultThemeSettings, ...preset.defaults, presetId, lightDirection };
      for (const mode of ["light", "dark"]) {
        const tokens = buildThemeVariables(settings, mode);
        const color = mode === "light"
          ? `color-mix(in srgb, ${preset.light.shadowLight} 82%, transparent)`
          : `color-mix(in srgb, ${preset.dark.foreground} 10%, transparent)`;
        const rim = `${-x}px ${-y}px 0px 0px ${color}`;
        for (const key of ["--neu-shadow-raised", "--neu-shadow-raised-sm", "--neu-shadow-hover", "--neu-shadow-plate"]) {
          const shadow = tokens[key];
          // Contact shadow stays first on plates so the material hierarchy remains intact.
          assert.ok(key === "--neu-shadow-plate" ? shadow.includes(`, ${rim}, `) : shadow.startsWith(`${rim}, `),
            `${presetId}/${lightDirection}/${mode}/${key} lacks the directional rim`);
          assert.doesNotMatch(shadow, /inset /);
        }
        assert.doesNotMatch(tokens["--neu-shadow-inset"], /82%, transparent|10%, transparent/);
        assert.match(tokens["--neu-shadow-inset"], /inset/);
        assert.notEqual(tokens["--neu-fill-raised"], tokens["--neu-fill-inset"]);
      }
    }
  }
});
