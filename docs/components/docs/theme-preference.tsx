"use client";

import * as React from "react";

import {
  applyThemeSettings,
  getPreferredThemeSettings,
} from "@/components/docs/theme-config";

export function ThemePreference() {
  React.useEffect(() => {
    function applyStoredSettings() {
      applyThemeSettings(getPreferredThemeSettings());
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
