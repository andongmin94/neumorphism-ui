"use client";

import { CartesianGrid, Line, LineChart, ReferenceLine, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

export type ServiceLatencyPoint = {
  label: string;
  p50Ms: number;
  p95Ms: number;
};

export function ServiceLatencyChart({
  data,
  budgetMs = 300,
}: {
  data: readonly ServiceLatencyPoint[];
  budgetMs?: number;
}) {
  const worst = data.length ? Math.max(...data.map((row) => row.p95Ms)) : 0;
  const breaches = data.filter((row) => row.p95Ms > budgetMs);

  return (
    <ChartContainer
      data-chart="service-latency"
      title="Service latency"
      description="Daily p50 and p95 response time against a p95 budget."
      summary={data.length ? `Worst p95 ${worst} ms · ${breaches.length}/${data.length} periods over budget` : "No latency samples."}
      tableLabel="View latency data"
      empty={!data.length}
      table={
        <table>
          <caption className="sr-only">Service latency data</caption>
          <thead><tr><th>Period</th><th>p50 (ms)</th><th>p95 (ms)</th><th>Budget</th></tr></thead>
          <tbody>{data.map((row) => <tr key={row.label}><th scope="row">{row.label}</th><td>{row.p50Ms}</td><td>{row.p95Ms}</td><td>{row.p95Ms > budgetMs ? "Over" : "Within"}</td></tr>)}</tbody>
        </table>
      }
    >
      <LineChart data={data} accessibilityLayer margin={{ top: 12, right: 12, bottom: 4, left: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 4" />
        <XAxis dataKey="label" tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
        <YAxis domain={[0, "auto"]} width={52} tickFormatter={(value: number) => `${value}ms`} tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
        <ReferenceLine y={budgetMs} stroke="var(--destructive)" strokeDasharray="4 4" />
        <ChartTooltip formatter={(value) => `${Number(value)} ms`} />
        <Line dataKey="p50Ms" name="p50" stroke="var(--muted-foreground)" strokeWidth={2} strokeDasharray="7 4" dot={false} isAnimationActive={false} />
        <Line dataKey="p95Ms" name="p95" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 3 }} isAnimationActive={false} />
      </LineChart>
    </ChartContainer>
  );
}

const exampleLatency: ServiceLatencyPoint[] = [
  { label: "Mon", p50Ms: 80, p95Ms: 210 },
  { label: "Tue", p50Ms: 76, p95Ms: 195 },
  { label: "Wed", p50Ms: 95, p95Ms: 340 },
  { label: "Thu", p50Ms: 130, p95Ms: 470 },
  { label: "Fri", p50Ms: 100, p95Ms: 330 },
  { label: "Sat", p50Ms: 82, p95Ms: 240 },
  { label: "Sun", p50Ms: 79, p95Ms: 215 },
];

export function ServiceLatencyExample() {
  return <ServiceLatencyChart data={exampleLatency} />;
}
