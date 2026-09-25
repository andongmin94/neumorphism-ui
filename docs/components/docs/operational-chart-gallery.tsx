"use client";

import { BuildDurationExample } from "@neumorphism-ui/registry/blocks/build-duration-chart";
import { DeliveryCapacityExample } from "@neumorphism-ui/registry/blocks/delivery-capacity-chart";
import { InstallDiagnosticsExample } from "@neumorphism-ui/registry/blocks/install-diagnostics-chart";
import { ReleaseActivityExample } from "@neumorphism-ui/registry/blocks/release-activity-chart";
import { ServiceLatencyExample } from "@neumorphism-ui/registry/blocks/service-latency-chart";

import type { Locale } from "@/i18n/config";

const copy = {
  ko: {
    title: "운영·개발 차트",
    body: "제품 분석과 분리해 빌드, 지연 시간, 릴리스, 전달량, 설치 단계 같은 운영 지표를 다룹니다.",
  },
  en: {
    title: "Operational charts",
    body: "Separate operational signals from product analytics: builds, latency, releases, delivery and install traces.",
  },
  ja: {
    title: "運用・開発チャート",
    body: "プロダクト分析と分けて、ビルド、レイテンシ、リリース、デリバリー、インストール工程を扱います。",
  },
  zh: {
    title: "运维与开发图表",
    body: "与产品分析分开，展示构建、延迟、发布、交付和安装阶段等运行指标。",
  },
} as const;

export function OperationalChartGallery({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <section className="grid min-w-0 gap-6" data-slot="operational-chart-gallery">
      <header className="grid gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">{t.title}</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-[var(--muted-foreground)]">
          {t.body}
        </p>
      </header>
      <div className="grid min-w-0 gap-6 xl:grid-cols-2">
        <BuildDurationExample />
        <ServiceLatencyExample />
        <ReleaseActivityExample />
        <DeliveryCapacityExample />
      </div>
      <InstallDiagnosticsExample />
    </section>
  );
}
