"use client";

import * as React from "react";

import {
  applyThemeSettings,
  defaultThemeSettings,
  LEGACY_THEME_STORAGE_KEY,
  parseThemeSettings,
  THEME_STORAGE_KEY,
} from "@/components/docs/theme-config";

export function ThemePreference() {
  React.useEffect(() => {
    localStorage.removeItem(LEGACY_THEME_STORAGE_KEY);

    function applyStoredSettings() {
      const settings = parseThemeSettings(
        localStorage.getItem(THEME_STORAGE_KEY),
      );
      applyThemeSettings(settings ?? defaultThemeSettings);
    }

    applyStoredSettings();
    const observer = new MutationObserver(() => {
      applyStoredSettings();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
