"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, ReferenceLine, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Select, SelectItem } from "@/components/ui/select";

export type BuildDurationPoint = {
  label: string;
  coldSeconds: number;
  cachedSeconds: number;
};

export function BuildDurationChart({
  data,
  budgetSeconds = 220,
}: {
  data: readonly BuildDurationPoint[];
  budgetSeconds?: number;
}) {
  const [series, setSeries] = React.useState<"both" | "cold" | "cached">("both");
  const coldMean = data.length ? data.reduce((sum, row) => sum + row.coldSeconds, 0) / data.length : 0;
  const cachedMean = data.length ? data.reduce((sum, row) => sum + row.cachedSeconds, 0) / data.length : 0;
  const breaches = data.filter((row) => row.coldSeconds > budgetSeconds).length;

  return (
    <ChartContainer
      data-chart="build-duration"
      title="Build duration"
      description="Paired cold and cached build runs in seconds."
      summary={data.length ? `Mean cold ${coldMean.toFixed(1)} s · cached ${cachedMean.toFixed(1)} s · ${breaches}/${data.length} cold runs over budget` : "No build runs."}
      actions={
        <label className="grid gap-1.5 text-xs">
          Visible series
          <Select value={series} onChange={(event) => setSeries(event.target.value as typeof series)}>
            <SelectItem value="both">Both</SelectItem>
            <SelectItem value="cold">Cold only</SelectItem>
            <SelectItem value="cached">Cached only</SelectItem>
          </Select>
        </label>
      }
      tableLabel="View build data"
      empty={!data.length}
      table={
        <table>
          <caption className="sr-only">Build duration data</caption>
          <thead><tr><th>Build</th><th>Cold (s)</th><th>Cached (s)</th><th>Saved (s)</th></tr></thead>
          <tbody>{data.map((row) => <tr key={row.label}><th scope="row">{row.label}</th><td>{row.coldSeconds}</td><td>{row.cachedSeconds}</td><td>{row.coldSeconds - row.cachedSeconds}</td></tr>)}</tbody>
        </table>
      }
    >
      <LineChart data={data} accessibilityLayer margin={{ top: 12, right: 12, bottom: 4, left: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 4" />
        <XAxis dataKey="label" tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
        <YAxis domain={[0, "auto"]} width={52} tickFormatter={(value: number) => `${value}s`} tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
        <ReferenceLine y={budgetSeconds} stroke="var(--destructive)" strokeDasharray="4 4" />
        <ChartTooltip formatter={(value) => `${Number(value)} s`} />
        {series !== "cached" && <Line dataKey="coldSeconds" name="Cold build" stroke="var(--foreground)" strokeWidth={2.5} dot={{ r: 3 }} isAnimationActive={false} />}
        {series !== "cold" && <Line dataKey="cachedSeconds" name="Cached build" stroke="var(--primary)" strokeWidth={2.5} strokeDasharray="7 4" dot={{ r: 3 }} isAnimationActive={false} />}
      </LineChart>
    </ChartContainer>
  );
}

const exampleBuilds: BuildDurationPoint[] = [
  { label: "B1", coldSeconds: 210, cachedSeconds: 108 },
  { label: "B2", coldSeconds: 195, cachedSeconds: 102 },
  { label: "B3", coldSeconds: 238, cachedSeconds: 114 },
  { label: "B4", coldSeconds: 226, cachedSeconds: 109 },
  { label: "B5", coldSeconds: 204, cachedSeconds: 96 },
  { label: "B6", coldSeconds: 188, cachedSeconds: 93 },
];

export function BuildDurationExample() {
  return <BuildDurationChart data={exampleBuilds} />;
}
