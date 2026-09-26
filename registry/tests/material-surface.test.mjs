import assert from "node:assert/strict";
import test from "node:test";
import { buildThemeVariables, defaultThemeSettings } from "../src/theme.ts";

test("Air is one continuous material with independently visible states", () => {
  for (const mode of ["light", "dark"]) {
    const v = buildThemeVariables(defaultThemeSettings, mode);
    assert.equal(v["--background"], v["--neu-surface"]);
    assert.notEqual(v["--neu-shadow-raised"], v["--neu-shadow-inset"]);
    assert.match(v["--neu-shadow-inset"], /inset/);
    assert.doesNotMatch(v["--neu-shadow-raised-sm"], /inset/);
    assert.notEqual(v["--neu-fill-raised"], v["--neu-fill-inset"]);
    assert.notEqual(v["--neu-shadow-primary"], v["--neu-shadow-primary-hover"]);
  }
  const light = buildThemeVariables(defaultThemeSettings, "light");
  assert.equal(light["--background"], "#ebecf0");
  assert.equal(light["--neu-edge"], "transparent");
});
