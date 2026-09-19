"use client";

import * as React from "react";

import {
  applyThemeSettings,
  defaultThemeSettings,
  parseThemeSettings,
  THEME_STORAGE_KEY,
} from "@/components/docs/theme-config";

export function ThemePreference() {
  React.useEffect(() => {
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
