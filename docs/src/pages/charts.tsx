import { notFound } from "fumapress/router";

import { ChartWorkbench } from "@/components/docs/chart-workbench";
import { CopyableCode } from "@/components/docs/copyable-code";
import { InstallCommand } from "@/components/docs/install-command";
import { OperationalChartGallery } from "@/components/docs/operational-chart-gallery";
import { isLocale } from "@/i18n/config";
import { chartGalleryCopy } from "@/i18n/chart-gallery-copy";
import buildDuration from "@/public/r/chart-build-duration.json";
import channels from "@/public/r/chart-channel.json";
import conversion from "@/public/r/chart-conversion.json";
import deliveryCapacity from "@/public/r/chart-delivery-capacity.json";
import installDiagnostics from "@/public/r/chart-install-diagnostics.json";
import releaseActivity from "@/public/r/chart-release-activity.json";
import revenue from "@/public/r/chart-revenue.json";
import serviceLatency from "@/public/r/chart-service-latency.json";

export default function ChartsPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();

  const locale = lang;
  const page = chartGalleryCopy[locale];

  const analyticsRecipes = [
    {
      source: revenue,
      name: "RevenueChart",
      path: "revenue-chart",
      ...page.recipes.revenue,
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
      ...page.recipes.channel,
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
      ...page.recipes.conversion,
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
      ...page.recipes.build,
      sample: '{ label: "B1", coldSeconds: 210, cachedSeconds: 108 }',
    },
    {
      source: serviceLatency,
      name: "ServiceLatencyChart",
      typeName: "ServiceLatencyPoint",
      path: "service-latency-chart",
      ...page.recipes.latency,
      sample: '{ label: "Mon", p50Ms: 80, p95Ms: 210 }',
    },
    {
      source: releaseActivity,
      name: "ReleaseActivityChart",
      typeName: "ReleaseActivityPoint",
      path: "release-activity-chart",
      ...page.recipes.release,
      sample: '{ release: "R1", installs: 148, updates: 62 }',
    },
    {
      source: deliveryCapacity,
      name: "DeliveryCapacityChart",
      typeName: "DeliveryCapacityPoint",
      path: "delivery-capacity-chart",
      ...page.recipes.delivery,
      sample: '{ period: "S1", planned: 32, delivered: 28 }',
    },
    {
      source: installDiagnostics,
      name: "InstallDiagnosticsChart",
      typeName: "InstallDiagnosticPoint",
      path: "install-diagnostics-chart",
      ...page.recipes.install,
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
        <h1>{page.title}</h1>
        <p>{page.body}</p>
        <nav aria-label={page.contents} className="charts-section-nav">
          <a href="#chart-product">{page.product}</a>
          <a href="#chart-operations">{page.operational}</a>
          <a href="#chart-installation">{page.reference}</a>
        </nav>
      </header>

      <section className="charts-product-section" id="chart-product">
        <header className="charts-section-heading">
          <h2>{page.product}</h2>
          <p>{page.productBody}</p>
        </header>
        <div className="charts-workbench-frame">
          <ChartWorkbench locale={locale} />
        </div>
      </section>

      <section className="charts-operational-section" id="chart-operations">
        <OperationalChartGallery locale={locale} />
      </section>

      <section className="charts-reference-section" id="chart-installation">
        <header className="charts-section-heading">
          <h2>{page.reference}</h2>
          <p>{page.referenceBody}</p>
        </header>

        <div className="chart-reference-grid">
          {recipeCards.map((recipe) => (
            <article className="chart-reference-card" key={recipe.source.name}>
              <span className="chart-reference-family">{recipe.family}</span>

              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>

              <InstallCommand locale={locale} compact name={recipe.source.name} />

              <details>
                <summary>{page.usage}</summary>
                <CopyableCode lang="tsx" code={recipe.code} label={page.usage} multiline />
              </details>

              <details>
                <summary>{page.source}</summary>
                {recipe.source.files.map((file) => (
                  <CopyableCode lang="tsx"
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
