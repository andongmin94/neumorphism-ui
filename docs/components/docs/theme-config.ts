import { buildThemeVariables, defaultThemeSettings, parseThemeSettings, THEME_STORAGE_KEY, type ThemeSettings } from "@neumorphism-ui/registry/theme";
import { THEME_BOOTSTRAP_SCRIPT } from "./theme-bootstrap";
export * from "@neumorphism-ui/registry/theme";
export function getThemeBootstrapScript() { return THEME_BOOTSTRAP_SCRIPT; }

// Preferences remain usable for this page session when browser storage is blocked
// or full. Once edited, memory also owns the settings used by the mode toggle.
let preferredSettings: ThemeSettings | undefined;

export function getPreferredThemeSettings() {
  if (preferredSettings) return preferredSettings;
  try {
    preferredSettings = parseThemeSettings(localStorage.getItem(THEME_STORAGE_KEY)) ?? defaultThemeSettings;
  } catch {
    preferredSettings = defaultThemeSettings;
  }
  return preferredSettings;
}

export function savePreferredThemeSettings(settings: ThemeSettings | null) {
  preferredSettings = settings ?? defaultThemeSettings;
  try {
    if (settings) localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(settings));
    else localStorage.removeItem(THEME_STORAGE_KEY);
  } catch {
    // Persistence is optional; the current session already has the new settings.
  }
}

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
