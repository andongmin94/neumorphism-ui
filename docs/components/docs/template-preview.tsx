"use client";

import { SettingsExample } from "@neumorphism-ui/registry/blocks/settings-panel";
import { DataManagerExample } from "@neumorphism-ui/registry/blocks/data-manager";
import type { Locale } from "@/i18n/config";

export function TemplatePreview({ slug, locale }: { slug: "settings" | "data-manager"; locale: Locale }) {
  return <div className="min-w-0 py-4" data-template={slug}>{slug === "settings" ? <SettingsExample locale={locale} /> : <DataManagerExample locale={locale} />}</div>;
}
