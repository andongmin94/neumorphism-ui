"use client";
import { Bar, BarChart, XAxis } from "recharts";
import { ChartContainer, ChartTooltip } from "@neumorphism-ui/registry/ui/chart";
import { analyticsCopy, type AnalyticsLocale } from "@neumorphism-ui/registry/analytics-copy";
export function ChartPreview({ locale }: { locale: AnalyticsLocale }) {
  const t = analyticsCopy[locale];
  const data = [{ date: "09-01", visits: 140 }, { date: "09-02", visits: 220 }, { date: "09-03", visits: 175 }];
  return <ChartContainer title={t.chartTitle} description={t.chartBody} tableLabel={t.table} table={<table><caption>{t.chartTitle}</caption><thead><tr><th scope="col">{t.date}</th><th scope="col">{t.visits}</th></tr></thead><tbody>{data.map(row => <tr key={row.date}><th scope="row">{row.date}</th><td>{row.visits}</td></tr>)}</tbody></table>}><BarChart data={data} accessibilityLayer><XAxis dataKey="date" /><ChartTooltip /><Bar dataKey="visits" name={t.visits} fill="var(--primary)" isAnimationActive={false} /></BarChart></ChartContainer>;
}
