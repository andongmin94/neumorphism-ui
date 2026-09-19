import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { themePresets, defaultThemeSettings, buildThemeVariables } from "../src/theme.ts";

function channels(color) {
  return [1, 3, 5].map(offset => parseInt(color.slice(offset, offset + 2), 16) / 255);
}
function luminance(rgb) {
  const values = rgb.map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
}
function contrast(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}

test("status alerts retain full-opacity readable body text on tinted surfaces", () => {
  const source = fs.readFileSync(new URL("../src/components/ui/alert.tsx", import.meta.url), "utf8");
  assert.equal((source.match(/text-\[var\(--foreground\)\]/g) ?? []).length, 3);
  assert.doesNotMatch(source, /text-current\//);
  for (const preset of themePresets) for (const mode of ["light", "dark"]) {
    const tokens = buildThemeVariables({ ...defaultThemeSettings, ...preset.defaults, presetId: preset.id }, mode);
    const text = channels(tokens["--foreground"]);
    for (const status of ["--success", "--destructive"]) {
      const tint = channels(tokens[status]);
      for (const surface of ["--background", "--neu-surface", "--neu-surface-low", "--neu-surface-soft", "--popover"]) {
        const background = channels(tokens[surface]).map((channel, index) => channel * 0.92 + tint[index] * 0.08);
        assert.ok(contrast(text, background) >= 4.5, `${preset.id}/${mode}: ${status} on ${surface}`);
      }
    }
  }
});
