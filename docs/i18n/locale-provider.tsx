"use client";

import * as React from "react";

import type { ComponentDocCategory } from "@/components/docs/component-docs-data";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/messages";

export type ComponentCatalogGroup = {
  category: {
    id: ComponentDocCategory;
    label: string;
    description: string;
  };
  items: readonly {
    slug: string;
    title: string;
    category: ComponentDocCategory;
    summary: string;
  }[];
};

type LocaleContextValue = {
  locale: Locale;
  messages: Messages;
  componentDocGroups: readonly ComponentCatalogGroup[];
};

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  componentDocGroups,
  locale,
  messages,
}: {
  children: React.ReactNode;
  componentDocGroups: readonly ComponentCatalogGroup[];
  locale: Locale;
  messages: Messages;
}) {
  const value = React.useMemo(
    () => ({
      locale,
      messages,
      componentDocGroups,
    }),
    [componentDocGroups, locale, messages],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = React.useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used inside LocaleProvider");
  }

  return context;
}
