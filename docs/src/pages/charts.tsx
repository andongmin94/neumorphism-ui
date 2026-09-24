import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";
import { isLocale, localeHref } from "@/i18n/config";
import { ChartWorkbench } from "@/components/docs/chart-workbench";
import { CopyableCode } from "@/components/docs/copyable-code";
import { InstallCommand } from "@/components/docs/install-command";
import { templateCopy } from "@/components/docs/template-copy";
import { analyticsCopy } from "@neumorphism-ui/registry/analytics-copy";
import revenue from "@/public/r/chart-revenue.json";
import channels from "@/public/r/chart-channel.json";
import conversion from "@/public/r/chart-conversion.json";

const titles = { en: "Charts", ko: "차트", ja: "チャート", zh: "图表" } as const;
export default function ChartsPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const locale = lang;
  const t = templateCopy[locale];
  const a = analyticsCopy[locale];
  const recipes = [{ source: revenue, name: "RevenueChart", path: "revenue-chart", title: a.revenueTitle }, { source: channels, name: "ChannelChart", path: "channel-chart", title: a.channelsTitle }, { source: conversion, name: "ConversionChart", path: "conversion-chart", title: a.conversionTitle }];
  return <div className="mx-auto w-full max-w-7xl px-5 pt-8 pb-16 sm:px-8 sm:pt-12"><article className="docs-content docs-article">
    <header className="docs-page-header"><h1>{titles[locale]}</h1><p>{a.intro}</p><Link href={localeHref(locale, "/templates/dashboard")}>{t.dashboard} →</Link></header>
    <ChartWorkbench locale={locale} />
    <section className="docs-content-section mt-10" id="chart-installation"><h2>{t.install}</h2><p>{t.base}</p><p>{t.analyticsNote}</p>
      {recipes.map(recipe => <section key={recipe.source.name} className="mt-8 grid min-w-0 gap-4"><h3>{recipe.title}</h3><InstallCommand name={recipe.source.name} />
        <CopyableCode label={t.use} multiline code={`"use client";\nimport { ${recipe.name} } from "@/components/blocks/${recipe.path}";\nimport { summarizeAnalytics, type AnalyticsRecord } from "@/lib/analytics-model";\n\nexport function Example({ records }: { records: AnalyticsRecord[] }) {\n  return <${recipe.name} data={summarizeAnalytics(records, 14)} locale="${locale}" />;\n}`} />
        {recipe.source.files.map(file => <details key={file.path} className="docs-disclosure"><summary>{t.source}: <code>{file.target}</code></summary><CopyableCode code={file.content} label={file.target} multiline /></details>)}
      </section>)}
    </section>
  </article></div>;
}
