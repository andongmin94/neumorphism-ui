"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Select, SelectItem } from "@/components/ui/select";

export type DeliveryCapacityPoint = {
  period: string;
  planned: number;
  delivered: number;
};

export function DeliveryCapacityChart({
  data,
}: {
  data: readonly DeliveryCapacityPoint[];
}) {
  const [view, setView] = React.useState<"compare" | "variance">("compare");
  const planned = data.reduce((sum, row) => sum + row.planned, 0);
  const delivered = data.reduce((sum, row) => sum + row.delivered, 0);
  const chartData = data.map((row) => ({ ...row, variance: row.delivered - row.planned }));

  return (
    <ChartContainer
      data-chart="delivery-capacity"
      title="Delivery capacity"
      description="Planned and delivered item counts. This is not a productivity score."
      summary={data.length ? `Planned ${planned} · delivered ${delivered} · net variance ${delivered - planned >= 0 ? "+" : ""}${delivered - planned}` : "No delivery records."}
      actions={
        <label className="grid gap-1.5 text-xs">
          View
          <Select value={view} onChange={(event) => setView(event.target.value as typeof view)}>
            <SelectItem value="compare">Planned vs delivered</SelectItem>
            <SelectItem value="variance">Signed variance</SelectItem>
          </Select>
        </label>
      }
      tableLabel="View delivery data"
      empty={!data.length}
      table={
        <table>
          <caption className="sr-only">Delivery capacity data</caption>
          <thead><tr><th>Period</th><th>Planned</th><th>Delivered</th><th>Variance</th></tr></thead>
          <tbody>{chartData.map((row) => <tr key={row.period}><th scope="row">{row.period}</th><td>{row.planned}</td><td>{row.delivered}</td><td>{row.variance > 0 ? "+" + row.variance : row.variance}</td></tr>)}</tbody>
        </table>
      }
    >
      <BarChart data={chartData} accessibilityLayer margin={{ top: 12, right: 12, bottom: 4, left: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 4" />
        <XAxis dataKey="period" tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
        <YAxis width={44} tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
        <ReferenceLine y={0} stroke="var(--foreground)" />
        <ChartTooltip />
        {view === "variance" ? (
          <Bar dataKey="variance" name="Delivered − planned" fill="var(--primary)" maxBarSize={52} isAnimationActive={false} />
        ) : (
          <>
            <Bar dataKey="planned" name="Planned" fill="var(--muted)" stroke="var(--muted-foreground)" strokeDasharray="4 3" maxBarSize={40} isAnimationActive={false} />
            <Bar dataKey="delivered" name="Delivered" fill="var(--primary)" maxBarSize={40} isAnimationActive={false} />
          </>
        )}
      </BarChart>
    </ChartContainer>
  );
}

const exampleCapacity: DeliveryCapacityPoint[] = [
  { period: "S1", planned: 32, delivered: 28 },
  { period: "S2", planned: 36, delivered: 39 },
  { period: "S3", planned: 34, delivered: 31 },
  { period: "S4", planned: 38, delivered: 42 },
];

export function DeliveryCapacityExample() {
  return <DeliveryCapacityChart data={exampleCapacity} />;
}
