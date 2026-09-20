"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import type { AnalyticsSummary } from "@/lib/analytics-model";
import { analyticsCopy, analyticsFormats, type AnalyticsLocale } from "@/lib/analytics-copy";

export function ConversionChart({ data, locale = "en" }: { data: AnalyticsSummary; locale?: AnalyticsLocale }) {
  const t = analyticsCopy[locale];
  const f = analyticsFormats(locale);
  return <ChartContainer
    data-chart="conversion" title={t.conversionTitle} description={t.conversionBody}
    summary={data.observedDays ? <>{f.percent(data.conversion)} · {f.number(data.totals.convertedVisits)} / {f.number(data.totals.visits)}</> : t.empty}
    tableLabel={t.table} empty={!data.observedDays} emptyLabel={t.empty}
    table={<table><caption className="sr-only">{t.conversionTitle}</caption><thead><tr><th scope="col">{t.date}</th><th scope="col">{t.visits}</th><th scope="col">{t.conversions}</th><th scope="col">{t.conversion}</th></tr></thead><tbody>{data.points.map(point => <tr key={point.date}><th scope="row">{point.date}</th><td>{f.number(point.visits)}</td><td>{f.number(point.convertedVisits)}</td><td>{f.percent(point.conversion)}</td></tr>)}</tbody></table>}
  >
    <LineChart data={data.points} accessibilityLayer margin={{ top: 12, right: 12, bottom: 4, left: 0 }}>
      <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 4" />
      <XAxis dataKey="date" tickFormatter={(value: string) => value.slice(5)} minTickGap={28} tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
      <YAxis domain={[0, 1]} ticks={[0, 0.25, 0.5, 0.75, 1]} width={48} tickFormatter={(value: number) => `${value * 100}%`} tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
      <ChartTooltip formatter={value => f.percent(typeof value === "number" ? value : null)} />
      <Line type="linear" dataKey="conversion" name={t.conversion} stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 2 }} activeDot={{ r: 5 }} connectNulls={false} isAnimationActive={false} />
    </LineChart>
  </ChartContainer>;
}
