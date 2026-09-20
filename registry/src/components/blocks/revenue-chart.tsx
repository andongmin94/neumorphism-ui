"use client";

import * as React from "react";
import { Area, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import type { AnalyticsSummary } from "@/lib/analytics-model";
import { analyticsCopy, analyticsFormats, type AnalyticsLocale } from "@/lib/analytics-copy";

export function RevenueChart({ data, locale = "en", currency = "USD" }: {
  data: AnalyticsSummary; locale?: AnalyticsLocale; currency?: string;
}) {
  const [showTarget, setShowTarget] = React.useState(true);
  const t = analyticsCopy[locale];
  const f = analyticsFormats(locale, currency);
  return <ChartContainer
    data-chart="revenue" title={t.revenueTitle} description={t.revenueBody}
    summary={data.observedDays ? <>{t.revenue}: {f.money(data.totals.revenueCents)} · {t.target}: {f.money(data.totals.targetCents)}</> : t.empty}
    actions={<label className="inline-flex items-center gap-2 text-xs"><Checkbox checked={showTarget} onCheckedChange={value => setShowTarget(value === true)} />{t.targetToggle}</label>}
    tableLabel={t.table} empty={data.observedDays === 0} emptyLabel={t.empty}
    table={<table><caption className="sr-only">{t.revenueTitle}</caption><thead><tr><th scope="col">{t.date}</th><th scope="col">{t.revenue}</th><th scope="col">{t.target}</th></tr></thead><tbody>{data.points.map(point => <tr key={point.date}><th scope="row">{point.date}</th><td>{f.money(point.revenueCents)}</td><td>{f.money(point.targetCents)}</td></tr>)}</tbody></table>}
  >
    <ComposedChart data={data.points} accessibilityLayer margin={{ top: 12, right: 12, bottom: 4, left: 0 }}>
      <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 4" />
      <XAxis dataKey="date" tickFormatter={(value: string) => value.slice(5)} minTickGap={28} tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
      <YAxis domain={[0, "auto"]} width={72} tickFormatter={(value: number) => f.compactMoney(value)} tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
      <ChartTooltip formatter={value => f.money(typeof value === "number" ? value : null)} />
      <Area type="linear" dataKey="revenueCents" name={t.revenue} stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.1} strokeWidth={2.5} connectNulls={false} isAnimationActive={false} />
      {showTarget && <Line type="linear" dataKey="targetCents" name={t.target} stroke="var(--muted-foreground)" strokeWidth={2} strokeDasharray="6 4" dot={false} connectNulls={false} isAnimationActive={false} />}
    </ComposedChart>
  </ChartContainer>;
}
