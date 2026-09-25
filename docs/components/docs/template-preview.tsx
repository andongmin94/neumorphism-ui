"use client";

import { AnalyticsExample } from "@neumorphism-ui/registry/blocks/analytics-dashboard";
import { SettingsExample } from "@neumorphism-ui/registry/blocks/settings-panel";
import { DataManagerExample } from "@neumorphism-ui/registry/blocks/data-manager";
import { LinkHubExample } from "@neumorphism-ui/registry/blocks/link-hub";
import type { Locale } from "@/i18n/config";

export function TemplatePreview({ slug, locale }: { slug: "settings" | "data-manager" | "dashboard" | "link-hub"; locale: Locale }) {
  return <div className="min-w-0 py-4" data-template={slug}>{slug === "dashboard" ? <AnalyticsExample locale={locale} /> : slug === "settings" ? <SettingsExample locale={locale} /> : slug === "data-manager" ? <DataManagerExample locale={locale} /> : <LinkHubExample locale={locale} />}</div>;
}
