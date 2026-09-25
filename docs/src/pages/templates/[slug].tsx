import type { RouteConfig } from "fumapress";
import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";
import { isLocale, localeHref } from "@/i18n/config";
import { TemplatePreview } from "@/components/docs/template-preview";
import { templateCopy } from "@/components/docs/template-copy";
import { InstallCommand } from "@/components/docs/install-command";
import { CopyableCode } from "@/components/docs/copyable-code";
import analyticsSource from "@/public/r/template-analytics.json";
import settingsSource from "@/public/r/template-settings.json";
import recordsSource from "@/public/r/template-data-manager.json";
import linksSource from "@/public/r/template-link-hub.json";

export async function getConfig() {
  return { staticPaths: ["settings", "data-manager", "dashboard", "link-hub"] } satisfies RouteConfig;
}

export default function TemplatePage({ lang, slug }: { lang: string; slug: string }) {
  if (!isLocale(lang) || (slug !== "settings" && slug !== "data-manager" && slug !== "dashboard" && slug !== "link-hub")) notFound();
  const locale = lang;
  const t = templateCopy[locale]; const settings = slug === "settings"; const links = slug === "link-hub"; const source = slug === "dashboard" ? analyticsSource : settings ? settingsSource : links ? linksSource : recordsSource;
  const usage = slug === "dashboard" ? `"use client";
import { AnalyticsDashboard, type AnalyticsRecord } from "@/components/blocks/analytics-dashboard";

export function Example({ records }: { records: AnalyticsRecord[] }) {
  return <AnalyticsDashboard records={records} locale="${locale}" currency="USD" />;
}` : settings ? `"use client";\nimport { SettingsPanel, type ProfileSettings } from "@/components/blocks/settings-panel";\n\nexport function Example({ profile, saveProfile }: {\n  profile: ProfileSettings;\n  saveProfile: (values: ProfileSettings) => Promise<void>;\n}) {\n  return <SettingsPanel initialValues={profile} onSave={saveProfile} locale="${locale}" />;\n}` : links ? `"use client";\nimport { LinkHub, type LinkHubLink, type LinkHubProfile } from "@/components/blocks/link-hub";\n\nexport function Example({ profile, links, contactEmail }: {\n  profile: LinkHubProfile;\n  links: LinkHubLink[];\n  contactEmail?: string;\n}) {\n  return <LinkHub profile={profile} links={links} contactEmail={contactEmail} locale="${locale}" />;\n}` : `"use client";\nimport { DataManager, type ManagedRecord } from "@/components/blocks/data-manager";\n\nexport function Example({ records, saveRecord, deleteRecords }: {\n  records: ManagedRecord[];\n  saveRecord: (record: ManagedRecord) => Promise<void>;\n  deleteRecords: (ids: string[]) => Promise<void>;\n}) {\n  return <DataManager initialRecords={records} onSave={saveRecord} onDelete={deleteRecords} locale="${locale}" />;\n}`;
  return <div className="mx-auto w-full max-w-7xl px-5 pt-8 pb-16 sm:px-8 sm:pt-12"><article className="docs-content docs-article"><header className="docs-page-header"><Link href={localeHref(locale, "/templates")} className="text-sm">← {t.back}</Link><h1>{slug === "dashboard" ? t.dashboard : settings ? t.settings : links ? t.links : t.records}</h1><p>{slug === "dashboard" ? t.dashboardBody : settings ? t.settingsBody : links ? t.linksBody : t.recordsBody}</p></header><TemplatePreview slug={slug} locale={locale} /><section className="docs-content-section mt-10" id="installation"><h2>{t.install}</h2><p>{t.base}</p><InstallCommand name={source.name} /><h3>{t.use}</h3><CopyableCode code={usage} label={t.use} multiline /><h3>{t.integration}</h3><p>{slug === "dashboard" ? t.analyticsNote : links ? t.linksNote : t.note}</p>{slug !== "dashboard" && slug !== "link-hub" && <p>{t.imports}</p>}</section><section className="docs-content-section" id="installed-source"><h2>{t.source}</h2>{source.files.map(file => <details key={file.path} className="docs-disclosure"><summary><code>{file.target}</code></summary><CopyableCode code={file.content} label={file.target} multiline /></details>)}</section></article></div>;
}
