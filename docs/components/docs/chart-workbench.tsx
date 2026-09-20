"use client";

import * as React from "react";
import { Select, SelectItem } from "@neumorphism-ui/registry/ui/select";
import { RevenueChart } from "@neumorphism-ui/registry/blocks/revenue-chart";
import { ChannelChart } from "@neumorphism-ui/registry/blocks/channel-chart";
import { ConversionChart } from "@neumorphism-ui/registry/blocks/conversion-chart";
import { demoAnalytics } from "@neumorphism-ui/registry/blocks/analytics-dashboard";
import { summarizeAnalytics } from "@neumorphism-ui/registry/analytics-model";
import { analyticsCopy, type AnalyticsLocale } from "@neumorphism-ui/registry/analytics-copy";

export function ChartWorkbench({ locale }: { locale: AnalyticsLocale }) {
  const [days, setDays] = React.useState(14);
  const t = analyticsCopy[locale];
  const data = React.useMemo(() => summarizeAnalytics(demoAnalytics, days), [days]);
  return <div className="grid min-w-0 gap-6" data-slot="chart-workbench">
    <div className="flex flex-wrap items-end justify-between gap-4"><p className="max-w-prose text-sm text-[var(--muted-foreground)]">{t.sample}</p><label className="grid gap-2 text-xs font-medium">{t.period}<Select value={days} onChange={event => setDays(Number(event.target.value))}>{[7, 14, 30].map(value => <SelectItem key={value} value={value}>{value} {t.days}</SelectItem>)}</Select></label></div>
    <RevenueChart data={data} locale={locale} />
    <div className="grid min-w-0 gap-6 xl:grid-cols-2"><ChannelChart data={data} locale={locale} /><ConversionChart data={data} locale={locale} /></div>
    <p className="text-xs leading-relaxed text-[var(--muted-foreground)]">{t.missing}</p>
  </div>;
}
