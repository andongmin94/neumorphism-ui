"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RevenueChart } from "@/components/blocks/revenue-chart";
import { ChannelChart } from "@/components/blocks/channel-chart";
import { ConversionChart } from "@/components/blocks/conversion-chart";
import { summarizeAnalytics, AnalyticsDataError, analyticsCsv, type AnalyticsRecord } from "@/lib/analytics-model";
import { analyticsCopy, analyticsFormats, type AnalyticsLocale } from "@/lib/analytics-copy";
import { demoAnalytics } from "./analytics-demo";

export interface AnalyticsDashboardProps {
  records: readonly AnalyticsRecord[];
  locale?: AnalyticsLocale;
  currency?: string;
}

/** Read-only reporting: callers own authenticated loading and business data.
 * Props are live inputs; replacing records recalculates this view immediately.
 */
export function AnalyticsDashboard({ records, locale = "en", currency = "USD" }: AnalyticsDashboardProps) {
  const [days, setDays] = React.useState(14);
  const [channel, setChannel] = React.useState<string | undefined>();
  const t = analyticsCopy[locale];
  const result = React.useMemo(() => {
    try { return { data: summarizeAnalytics(records, days, channel), error: false as const }; }
    catch (error) {
      if (!(error instanceof AnalyticsDataError)) throw error;
      return { data: null, error: true as const };
    }
  }, [records, days, channel]);
  const channels = React.useMemo(() => [...new Set(records.map(record => record.channel))].sort(), [records]);
  if (result.error) return <Alert variant="destructive" data-slot="analytics-error"><AlertDescription>{t.invalid}</AlertDescription></Alert>;
  const data = result.data;
  const f = analyticsFormats(locale, currency);
  const metrics = [
    { key: "revenue", label: t.revenue, value: data.observedDays ? f.money(data.totals.revenueCents) : "—" },
    { key: "visits", label: t.visits, value: data.observedDays ? f.number(data.totals.visits) : "—" },
    { key: "converted", label: t.conversions, value: data.observedDays ? f.number(data.totals.convertedVisits) : "—" },
    { key: "conversion", label: t.conversion, value: f.percent(data.conversion) },
  ];
  function exportCsv() {
    const url = URL.createObjectURL(new Blob([analyticsCsv(data)], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `analytics-${data.start}-${data.end}.csv`;
    document.body.append(link);
    link.click();
    link.remove();
    // The download needs a task to consume the URL before it is released.
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <section data-slot="analytics-dashboard" className="grid min-w-0 gap-6 text-[var(--foreground)]">
    <header className="flex flex-wrap items-start justify-between gap-4"><div className="grid gap-2"><h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t.title}</h2><p className="text-sm text-[var(--muted-foreground)]">{t.intro}</p></div><Button onClick={exportCsv} disabled={!data.observedDays}>{t.export}</Button></header>
    <div className="flex flex-wrap items-end gap-4 rounded-[var(--neu-radius-surface)] bg-[var(--neu-surface)] p-4 [box-shadow:var(--neu-shadow-inset)]">
      <label className="grid min-w-36 flex-1 gap-2 text-xs font-medium">{t.period}<Select value={days} onChange={event => setDays(Number(event.target.value))}>{[7, 14, 30].map(value => <SelectItem key={value} value={value}>{value} {t.days}</SelectItem>)}</Select></label>
      <label className="grid min-w-44 flex-1 gap-2 text-xs font-medium">{t.channel}<Select value={channel === undefined ? "all" : `channel:${channel}`} onChange={event => setChannel(event.target.value === "all" ? undefined : event.target.value.slice(8))}><SelectItem value="all">{t.all}</SelectItem>{channel !== undefined && !channels.includes(channel) && <SelectItem value={`channel:${channel}`}>{channel}</SelectItem>}{channels.map(value => <SelectItem key={value} value={`channel:${value}`}>{value}</SelectItem>)}</Select></label>
      <Button variant="ghost" onClick={() => { setDays(14); setChannel(undefined); }} disabled={days === 14 && channel === undefined}>{t.reset}</Button>
    </div>
    <p role="status" data-slot="analytics-window" className="text-xs leading-relaxed text-[var(--muted-foreground)]">{data.start && `${data.start} – ${data.end} · `}{t.window}: {data.observedDays} / {days}</p>
    <dl className="grid min-w-0 grid-cols-2 gap-4 xl:grid-cols-4">{metrics.map(metric => <div key={metric.key} className="grid min-w-0 gap-3 rounded-[var(--neu-radius-surface)] border border-[var(--neu-edge)] bg-[var(--neu-surface)] p-4 [box-shadow:var(--neu-shadow-raised-sm)] sm:p-5"><dt className="text-xs text-[var(--muted-foreground)]">{metric.label}</dt><dd data-metric={metric.key} className="break-words text-xl font-semibold tracking-tight tabular-nums sm:text-2xl">{metric.value}</dd></div>)}</dl>
    <RevenueChart data={data} locale={locale} currency={currency} />
    <div className="grid min-w-0 gap-6 xl:grid-cols-2"><ChannelChart data={data} locale={locale} /><ConversionChart data={data} locale={locale} /></div>
    <footer className="grid gap-2 text-xs leading-relaxed text-[var(--muted-foreground)]"><p>{t.missing}</p><p>{t.coverage}</p></footer>
  </section>;
}

export function AnalyticsExample({ locale = "en" }: { locale?: AnalyticsLocale }) {
  const [empty, setEmpty] = React.useState(false);
  const t = analyticsCopy[locale];
  return <div className="grid min-w-0 gap-5"><div className="flex flex-wrap items-center justify-between gap-3"><p className="max-w-prose text-xs leading-relaxed text-[var(--muted-foreground)]">{t.sample}</p><label className="flex items-center gap-2 text-xs"><Checkbox checked={empty} onCheckedChange={value => setEmpty(value === true)} />{t.showEmpty}</label></div><AnalyticsDashboard records={empty ? [] : demoAnalytics} locale={locale} /></div>;
}

export { demoAnalytics } from "./analytics-demo";
export type { AnalyticsRecord } from "@/lib/analytics-model";
