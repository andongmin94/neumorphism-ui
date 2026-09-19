import { buildThemeVariables, defaultThemeSettings, type ThemeSettings } from "@neumorphism-ui/registry/theme";
import { THEME_BOOTSTRAP_SCRIPT } from "./theme-bootstrap";
export * from "@neumorphism-ui/registry/theme";
export function getThemeBootstrapScript() { return THEME_BOOTSTRAP_SCRIPT; }
export function applyThemeSettings(settings: ThemeSettings) {
  const root = document.documentElement;
  const mode = root.classList.contains("dark") ? "dark" : "light";
  for (const [property, value] of Object.entries(buildThemeVariables(settings, mode))) root.style.setProperty(property, value);
  root.dataset.customTheme = settings.presetId;
}
export function clearThemeSettings() {
  const root = document.documentElement;
  for (const property of Object.keys(buildThemeVariables(defaultThemeSettings, "light"))) root.style.removeProperty(property);
  delete root.dataset.customTheme;
}
