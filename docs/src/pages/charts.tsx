import { notFound } from "fumapress/router";

import { ChartWorkbench } from "@/components/docs/chart-workbench";
import { CopyableCode } from "@/components/docs/copyable-code";
import { InstallCommand } from "@/components/docs/install-command";
import { OperationalChartGallery } from "@/components/docs/operational-chart-gallery";
import { isLocale } from "@/i18n/config";
import buildDuration from "@/public/r/chart-build-duration.json";
import channels from "@/public/r/chart-channel.json";
import conversion from "@/public/r/chart-conversion.json";
import deliveryCapacity from "@/public/r/chart-delivery-capacity.json";
import installDiagnostics from "@/public/r/chart-install-diagnostics.json";
import releaseActivity from "@/public/r/chart-release-activity.json";
import revenue from "@/public/r/chart-revenue.json";
import serviceLatency from "@/public/r/chart-service-latency.json";
import { analyticsCopy } from "@neumorphism-ui/registry/analytics-copy";

const pageCopy = {
  ko: {
    kicker: "EXACT DATA · VISUAL ENCODING",
    title: "데이터를 숨기지 않는 차트.",
    body: "제품 분석과 운영 신호를 시각화하되, 모든 recipe는 정확한 원본 표를 함께 제공합니다.",
    recipes: "Recipes",
    families: "Families",
    table: "Exact-data table",
    dashboard: "대시보드 템플릿",
    product: "제품 분석",
    productBody: "revenue, channel, conversion을 같은 분석 모델 위에서 확인합니다.",
    operational: "운영·개발",
    reference: "설치 레퍼런스",
    referenceBody: "필요한 recipe만 source로 설치하세요. 구현 코드와 Registry 원본은 필요할 때 펼쳐볼 수 있습니다.",
    usage: "Usage",
    source: "Source",
  },
  en: {
    kicker: "EXACT DATA · VISUAL ENCODING",
    title: "Charts that do not hide the data.",
    body: "Visualize product analytics and operational signals while every recipe keeps an exact-data table beside the marks.",
    recipes: "Recipes",
    families: "Families",
    table: "Exact-data table",
    dashboard: "Dashboard template",
    product: "Product analytics",
    productBody: "Revenue, channel and conversion share one analytics model and range control.",
    operational: "Operations & development",
    reference: "Installation reference",
    referenceBody: "Install only the recipes you need as source. Expand implementation and Registry source when you need them.",
    usage: "Usage",
    source: "Source",
  },
  ja: {
    kicker: "EXACT DATA · VISUAL ENCODING",
    title: "データを隠さないチャート。",
    body: "プロダクト分析と運用シグナルを可視化しながら、すべての recipe が正確なデータ表を併記します。",
    recipes: "Recipes",
    families: "Families",
    table: "Exact-data table",
    dashboard: "ダッシュボードテンプレート",
    product: "プロダクト分析",
    productBody: "revenue、channel、conversion を同じ analytics model と期間制御で確認します。",
    operational: "運用・開発",
    reference: "インストールリファレンス",
    referenceBody: "必要な recipe だけを source として導入し、実装と Registry source は必要なときだけ展開できます。",
    usage: "Usage",
    source: "Source",
  },
  zh: {
    kicker: "EXACT DATA · VISUAL ENCODING",
    title: "不隐藏数据的图表。",
    body: "展示产品分析与运维信号，同时每个 recipe 都保留精确数据表。",
    recipes: "Recipes",
    families: "Families",
    table: "Exact-data table",
    dashboard: "仪表盘模板",
    product: "产品分析",
    productBody: "revenue、channel、conversion 共用同一分析模型和时间范围控制。",
    operational: "运维与开发",
    reference: "安装参考",
    referenceBody: "只安装需要的 recipe 源码，实施代码与 Registry 源码可按需展开。",
    usage: "Usage",
    source: "Source",
  },
} as const;

export default function ChartsPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();

  const locale = lang;
  const a = analyticsCopy[locale];
  const page = pageCopy[locale];

  const analyticsRecipes = [
    {
      source: revenue,
      name: "RevenueChart",
      path: "revenue-chart",
      title: a.revenueTitle,
      description: "Daily revenue with exact values and shared range controls.",
      code: `"use client";
import { RevenueChart } from "@/components/blocks/revenue-chart";
import { summarizeAnalytics, type AnalyticsRecord } from "@/lib/analytics-model";

export function Example({ records }: { records: AnalyticsRecord[] }) {
  return <RevenueChart data={summarizeAnalytics(records, 14)} locale="${locale}" />;
}`,
    },
    {
      source: channels,
      name: "ChannelChart",
      path: "channel-chart",
      title: a.channelsTitle,
      description: "Channel contribution without hiding the source totals.",
      code: `"use client";
import { ChannelChart } from "@/components/blocks/channel-chart";
import { summarizeAnalytics, type AnalyticsRecord } from "@/lib/analytics-model";

export function Example({ records }: { records: AnalyticsRecord[] }) {
  return <ChannelChart data={summarizeAnalytics(records, 14)} locale="${locale}" />;
}`,
    },
    {
      source: conversion,
      name: "ConversionChart",
      path: "conversion-chart",
      title: a.conversionTitle,
      description: "Daily conversion with missing values distinct from zero.",
      code: `"use client";
import { ConversionChart } from "@/components/blocks/conversion-chart";
import { summarizeAnalytics, type AnalyticsRecord } from "@/lib/analytics-model";

export function Example({ records }: { records: AnalyticsRecord[] }) {
  return <ConversionChart data={summarizeAnalytics(records, 14)} locale="${locale}" />;
}`,
    },
  ];

  const operationalRecipes = [
    {
      source: buildDuration,
      name: "BuildDurationChart",
      typeName: "BuildDurationPoint",
      path: "build-duration-chart",
      title: "Build duration",
      description: "Cold and cached build duration with an explicit budget.",
      sample: '{ label: "B1", coldSeconds: 210, cachedSeconds: 108 }',
    },
    {
      source: serviceLatency,
      name: "ServiceLatencyChart",
      typeName: "ServiceLatencyPoint",
      path: "service-latency-chart",
      title: "Service latency",
      description: "p50 and p95 latency against a visible p95 budget.",
      sample: '{ label: "Mon", p50Ms: 80, p95Ms: 210 }',
    },
    {
      source: releaseActivity,
      name: "ReleaseActivityChart",
      typeName: "ReleaseActivityPoint",
      path: "release-activity-chart",
      title: "Release activity",
      description: "New installs and updates in counts or per-release share.",
      sample: '{ release: "R1", installs: 148, updates: 62 }',
    },
    {
      source: deliveryCapacity,
      name: "DeliveryCapacityChart",
      typeName: "DeliveryCapacityPoint",
      path: "delivery-capacity-chart",
      title: "Delivery capacity",
      description: "Planned versus delivered items and signed variance.",
      sample: '{ period: "S1", planned: 32, delivered: 28 }',
    },
    {
      source: installDiagnostics,
      name: "InstallDiagnosticsChart",
      typeName: "InstallDiagnosticPoint",
      path: "install-diagnostics-chart",
      title: "Install diagnostics",
      description: "Sequential install-stage timings with unit switching.",
      sample: '{ stage: "Download", durationMs: 840 }',
    },
  ];

  const recipeCards = [
    ...analyticsRecipes.map((recipe) => ({
      title: recipe.title,
      description: recipe.description,
      source: recipe.source,
      code: recipe.code,
      family: page.product,
    })),
    ...operationalRecipes.map((recipe) => ({
      title: recipe.title,
      description: recipe.description,
      source: recipe.source,
      family: page.operational,
      code: `"use client";
import { ${recipe.name}, type ${recipe.typeName} } from "@/components/blocks/${recipe.path}";

const data: ${recipe.typeName}[] = [
  ${recipe.sample},
];

export function Example() {
  return <${recipe.name} data={data} />;
}`,
    })),
  ];

  return (
    <div className="charts-gallery-page">
      <header className="charts-gallery-hero">
        <span>{page.kicker}</span>
        <h1>{page.title}</h1>
        <p>{page.body}</p>

      </header>

      <section className="charts-product-section">
        <header className="charts-section-heading">
          <span>PRODUCT ANALYTICS</span>
          <h2>{page.product}</h2>
          <p>{page.productBody}</p>
        </header>
        <div className="charts-workbench-frame">
          <ChartWorkbench locale={locale} />
        </div>
      </section>

      <section className="charts-operational-section">
        <OperationalChartGallery locale={locale} />
      </section>

      <section className="charts-reference-section" id="chart-installation">
        <header className="charts-section-heading">
          <span>REGISTRY SOURCE</span>
          <h2>{page.reference}</h2>
          <p>{page.referenceBody}</p>
        </header>

        <div className="chart-reference-grid">
          {recipeCards.map((recipe, index) => (
            <article className="chart-reference-card" key={recipe.source.name}>
              <div className="chart-reference-meta">
                <span>0{index + 1}</span>
                <small>{recipe.family}</small>
              </div>

              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>

              <InstallCommand compact name={recipe.source.name} />

              <details>
                <summary>{page.usage}</summary>
                <CopyableCode code={recipe.code} label={page.usage} multiline />
              </details>

              <details>
                <summary>{page.source}</summary>
                {recipe.source.files.map((file) => (
                  <CopyableCode
                    code={file.content}
                    key={file.path}
                    label={file.target ?? file.path}
                    multiline
                  />
                ))}
              </details>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
