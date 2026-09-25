import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";

import { ChartWorkbench } from "@/components/docs/chart-workbench";
import { CopyableCode } from "@/components/docs/copyable-code";
import { InstallCommand } from "@/components/docs/install-command";
import { OperationalChartGallery } from "@/components/docs/operational-chart-gallery";
import { templateCopy } from "@/components/docs/template-copy";
import { isLocale, localeHref } from "@/i18n/config";
import buildDuration from "@/public/r/chart-build-duration.json";
import channels from "@/public/r/chart-channel.json";
import conversion from "@/public/r/chart-conversion.json";
import deliveryCapacity from "@/public/r/chart-delivery-capacity.json";
import installDiagnostics from "@/public/r/chart-install-diagnostics.json";
import releaseActivity from "@/public/r/chart-release-activity.json";
import revenue from "@/public/r/chart-revenue.json";
import serviceLatency from "@/public/r/chart-service-latency.json";
import { analyticsCopy } from "@neumorphism-ui/registry/analytics-copy";

const titles = { en: "Charts", ko: "차트", ja: "チャート", zh: "图表" } as const;

const operationalCopy = {
  en: {
    title: "Operational recipes",
    body: "Install these independently and pass your own observations. Every recipe keeps an exact-data table beside the visual encoding.",
  },
  ko: {
    title: "운영형 recipe",
    body: "각 항목을 독립적으로 설치해 실제 관측 데이터를 전달하세요. 모든 recipe는 시각화와 함께 정확한 원본 표를 유지합니다.",
  },
  ja: {
    title: "運用向け recipe",
    body: "必要な項目だけを個別にインストールし、実データを渡せます。すべての recipe が可視化と正確な表を同時に提供します。",
  },
  zh: {
    title: "运维型 recipe",
    body: "可按需单独安装并传入实际观测数据。每个 recipe 都同时保留可视化和精确数据表。",
  },
} as const;

export default function ChartsPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();

  const locale = lang;
  const t = templateCopy[locale];
  const a = analyticsCopy[locale];
  const op = operationalCopy[locale];

  const analyticsRecipes = [
    {
      source: revenue,
      name: "RevenueChart",
      path: "revenue-chart",
      title: a.revenueTitle,
    },
    {
      source: channels,
      name: "ChannelChart",
      path: "channel-chart",
      title: a.channelsTitle,
    },
    {
      source: conversion,
      name: "ConversionChart",
      path: "conversion-chart",
      title: a.conversionTitle,
    },
  ];

  const operationalRecipes = [
    {
      source: buildDuration,
      name: "BuildDurationChart",
      typeName: "BuildDurationPoint",
      path: "build-duration-chart",
      title: "Build duration",
      sample: '{ label: "B1", coldSeconds: 210, cachedSeconds: 108 }',
    },
    {
      source: serviceLatency,
      name: "ServiceLatencyChart",
      typeName: "ServiceLatencyPoint",
      path: "service-latency-chart",
      title: "Service latency",
      sample: '{ label: "Mon", p50Ms: 80, p95Ms: 210 }',
    },
    {
      source: releaseActivity,
      name: "ReleaseActivityChart",
      typeName: "ReleaseActivityPoint",
      path: "release-activity-chart",
      title: "Release activity",
      sample: '{ release: "R1", installs: 148, updates: 62 }',
    },
    {
      source: deliveryCapacity,
      name: "DeliveryCapacityChart",
      typeName: "DeliveryCapacityPoint",
      path: "delivery-capacity-chart",
      title: "Delivery capacity",
      sample: '{ period: "S1", planned: 32, delivered: 28 }',
    },
    {
      source: installDiagnostics,
      name: "InstallDiagnosticsChart",
      typeName: "InstallDiagnosticPoint",
      path: "install-diagnostics-chart",
      title: "Install diagnostics",
      sample: '{ stage: "Download", durationMs: 840 }',
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-5 pt-8 pb-16 sm:px-8 sm:pt-12">
      <article className="docs-content docs-article">
        <header className="docs-page-header">
          <h1>{titles[locale]}</h1>
          <p>{a.intro}</p>
          <Link href={localeHref(locale, "/templates/dashboard")}>{t.dashboard} →</Link>
        </header>

        <ChartWorkbench locale={locale} />

        <div className="my-12 border-t border-[var(--border)]" />
        <OperationalChartGallery locale={locale} />

        <section className="docs-content-section mt-10" id="chart-installation">
          <h2>{t.install}</h2>
          <p>{t.base}</p>
          <p>{t.analyticsNote}</p>

          {analyticsRecipes.map((recipe) => (
            <section key={recipe.source.name} className="mt-8 grid min-w-0 gap-4">
              <h3>{recipe.title}</h3>
              <InstallCommand name={recipe.source.name} />
              <CopyableCode
                label={t.use}
                multiline
                code={`"use client";
import { ${recipe.name} } from "@/components/blocks/${recipe.path}";
import { summarizeAnalytics, type AnalyticsRecord } from "@/lib/analytics-model";

export function Example({ records }: { records: AnalyticsRecord[] }) {
  return <${recipe.name} data={summarizeAnalytics(records, 14)} locale="${locale}" />;
}`}
              />
              {recipe.source.files.map((file) => (
                <details key={file.path} className="docs-disclosure">
                  <summary>{t.source}: <code>{file.target}</code></summary>
                  <CopyableCode code={file.content} label={file.target} multiline />
                </details>
              ))}
            </section>
          ))}

          <section className="mt-12 grid gap-3 border-t border-[var(--border)] pt-8">
            <h2>{op.title}</h2>
            <p>{op.body}</p>
          </section>

          {operationalRecipes.map((recipe) => (
            <section key={recipe.source.name} className="mt-8 grid min-w-0 gap-4">
              <h3>{recipe.title}</h3>
              <InstallCommand name={recipe.source.name} />
              <CopyableCode
                label={t.use}
                multiline
                code={`"use client";
import { ${recipe.name}, type ${recipe.typeName} } from "@/components/blocks/${recipe.path}";

const data: ${recipe.typeName}[] = [
  ${recipe.sample},
];

export function Example() {
  return <${recipe.name} data={data} />;
}`}
              />
              {recipe.source.files.map((file) => (
                <details key={file.path} className="docs-disclosure">
                  <summary>{t.source}: <code>{file.target}</code></summary>
                  <CopyableCode code={file.content} label={file.target} multiline />
                </details>
              ))}
            </section>
          ))}
        </section>
      </article>
    </div>
  );
}
