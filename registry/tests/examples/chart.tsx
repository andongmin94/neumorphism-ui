"use client";
import { Bar, BarChart, XAxis } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
export default function Example() {
  const data = [{ date: "09-01", visits: 140 }, { date: "09-02", visits: 220 }, { date: "09-03", visits: 175 }];
  return <ChartContainer title="Daily visits" description="Illustrative data. Exact values are available in the table." tableLabel="View data" table={<table><caption>Daily visits</caption><thead><tr><th scope="col">Date</th><th scope="col">Visits</th></tr></thead><tbody>{data.map(row => <tr key={row.date}><th scope="row">{row.date}</th><td>{row.visits}</td></tr>)}</tbody></table>}>
    <BarChart data={data} accessibilityLayer><XAxis dataKey="date" /><ChartTooltip /><Bar dataKey="visits" name="Visits" fill="var(--primary)" isAnimationActive={false} /></BarChart>
  </ChartContainer>;
}
