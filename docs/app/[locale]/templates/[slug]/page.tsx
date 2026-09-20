import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, localeHref } from "@/i18n/config";
import { createLocalizedMetadata } from "@/i18n/metadata";
import { TemplatePreview } from "@/components/docs/template-preview";
import { templateCopy } from "@/components/docs/template-copy";
import { InstallCommand } from "@/components/docs/install-command";
import { CopyableCode } from "@/components/docs/copyable-code";
import settingsSource from "@/public/r/template-settings.json";
import recordsSource from "@/public/r/template-data-manager.json";

type Props = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() { return locales.flatMap(locale => ["settings", "data-manager"].map(slug => ({ locale, slug }))); }
export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params; if (!isLocale(locale) || !["settings", "data-manager"].includes(slug)) return {};
  const t = templateCopy[locale];
  return createLocalizedMetadata({ locale, pathname: `/templates/${slug}`, title: slug === "settings" ? t.settings : t.records, description: slug === "settings" ? t.settingsBody : t.recordsBody });
}
export default async function TemplatePage({ params }: Props) {
  const { locale, slug } = await params; if (!isLocale(locale) || (slug !== "settings" && slug !== "data-manager")) notFound();
  const t = templateCopy[locale]; const settings = slug === "settings"; const source = settings ? settingsSource : recordsSource;
  const usage = settings ? `"use client";\nimport { SettingsPanel, type ProfileSettings } from "@/components/blocks/settings-panel";\n\nexport function Example({ profile, saveProfile }: {\n  profile: ProfileSettings;\n  saveProfile: (values: ProfileSettings) => Promise<void>;\n}) {\n  return <SettingsPanel initialValues={profile} onSave={saveProfile} locale="${locale}" />;\n}` : `"use client";\nimport { DataManager, type ManagedRecord } from "@/components/blocks/data-manager";\n\nexport function Example({ records, saveRecord, deleteRecords }: {\n  records: ManagedRecord[];\n  saveRecord: (record: ManagedRecord) => Promise<void>;\n  deleteRecords: (ids: string[]) => Promise<void>;\n}) {\n  return <DataManager initialRecords={records} onSave={saveRecord} onDelete={deleteRecords} locale="${locale}" />;\n}`;
  return <div className="mx-auto w-full max-w-7xl px-5 pt-8 pb-16 sm:px-8 sm:pt-12"><article className="docs-content docs-article"><header className="docs-page-header"><Link href={localeHref(locale, "/templates")} className="text-sm">← {t.back}</Link><h1>{settings ? t.settings : t.records}</h1><p>{settings ? t.settingsBody : t.recordsBody}</p></header><TemplatePreview slug={slug} locale={locale} /><section className="docs-content-section mt-10" id="installation"><h2>{t.install}</h2><p>{t.base}</p><InstallCommand name={source.name} /><h3>{t.use}</h3><CopyableCode code={usage} label={t.use} multiline /><h3>{t.integration}</h3><p>{t.note}</p><p>{t.imports}</p></section><section className="docs-content-section" id="installed-source"><h2>{t.source}</h2>{source.files.map(file => <details key={file.path} className="docs-disclosure"><summary><code>{file.target}</code></summary><CopyableCode code={file.content} label={file.target} multiline /></details>)}</section></article></div>;
}
