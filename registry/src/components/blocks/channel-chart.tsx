"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Select, SelectItem } from "@/components/ui/select";
import type { AnalyticsSummary } from "@/lib/analytics-model";
import { analyticsCopy, analyticsFormats, type AnalyticsLocale } from "@/lib/analytics-copy";

export function ChannelChart({ data, locale = "en" }: { data: AnalyticsSummary; locale?: AnalyticsLocale }) {
  const [metric, setMetric] = React.useState<"visits" | "convertedVisits">("visits");
  const t = analyticsCopy[locale];
  const f = analyticsFormats(locale);
  const label = metric === "visits" ? t.visits : t.conversions;
  return <ChartContainer
    data-chart="channels" title={t.channelsTitle} description={t.channelsBody}
    summary={data.observedDays ? <>{label}: {f.number(data.totals[metric])}</> : t.empty}
    actions={<label className="grid max-w-full gap-1.5 text-xs">{t.metric}<Select value={metric} onChange={event => setMetric(event.target.value === "visits" ? "visits" : "convertedVisits")}><SelectItem value="visits">{t.visits}</SelectItem><SelectItem value="convertedVisits">{t.conversions}</SelectItem></Select></label>}
    tableLabel={t.table} empty={!data.channels.length} emptyLabel={t.empty}
    table={<table><caption className="sr-only">{t.channelsTitle}</caption><thead><tr><th scope="col">{t.channel}</th><th scope="col">{t.visits}</th><th scope="col">{t.conversions}</th><th scope="col">{t.conversion}</th></tr></thead><tbody>{data.channels.map(group => <tr key={group.channel}><th scope="row">{group.channel}</th><td>{f.number(group.visits)}</td><td>{f.number(group.convertedVisits)}</td><td>{f.percent(group.conversion)}</td></tr>)}</tbody></table>}
  >
    <BarChart data={data.channels} accessibilityLayer margin={{ top: 12, right: 12, bottom: 4, left: 0 }}>
      <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 4" />
      <XAxis tickFormatter={(value: string) => value.length > 14 ? `${value.slice(0, 13)}…` : value} dataKey="channel" minTickGap={16} tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
      <YAxis domain={[0, "auto"]} width={52} allowDecimals={false} tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
      <ChartTooltip formatter={value => f.number(typeof value === "number" ? value : null)} />
      <Bar dataKey={metric} name={label} fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={56} isAnimationActive={false} />
    </BarChart>
  </ChartContainer>;
}
