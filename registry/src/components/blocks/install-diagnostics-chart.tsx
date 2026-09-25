"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Select, SelectItem } from "@/components/ui/select";

export type InstallDiagnosticPoint = {
  stage: string;
  durationMs: number;
};

export function InstallDiagnosticsChart({
  data,
}: {
  data: readonly InstallDiagnosticPoint[];
}) {
  const [unit, setUnit] = React.useState<"ms" | "s">("ms");
  const total = data.reduce((sum, row) => sum + row.durationMs, 0);
  const largest = data.length ? data.reduce((best, row) => row.durationMs > best.durationMs ? row : best) : null;
  const format = (value: number) => unit === "ms" ? `${value} ms` : `${(value / 1000).toFixed(2)} s`;

  return (
    <ChartContainer
      data-chart="install-diagnostics"
      title="Installation diagnostics"
      description="Sequential stage durations for one installation trace."
      summary={largest ? `Total ${format(total)} · longest stage ${largest.stage} (${format(largest.durationMs)})` : "No installation trace."}
      actions={
        <label className="grid gap-1.5 text-xs">
          Unit
          <Select value={unit} onChange={(event) => setUnit(event.target.value as typeof unit)}>
            <SelectItem value="ms">Milliseconds</SelectItem>
            <SelectItem value="s">Seconds</SelectItem>
          </Select>
        </label>
      }
      tableLabel="View installation data"
      empty={!data.length}
      table={
        <table>
          <caption className="sr-only">Installation diagnostic data</caption>
          <thead><tr><th>Stage</th><th>Duration</th><th>Share</th></tr></thead>
          <tbody>{data.map((row) => <tr key={row.stage}><th scope="row">{row.stage}</th><td>{format(row.durationMs)}</td><td>{total ? ((row.durationMs / total) * 100).toFixed(1) + "%" : "—"}</td></tr>)}</tbody>
        </table>
      }
    >
      <BarChart data={data} layout="vertical" accessibilityLayer margin={{ top: 12, right: 12, bottom: 4, left: 0 }}>
        <CartesianGrid horizontal={false} stroke="var(--border)" strokeDasharray="3 4" />
        <XAxis type="number" tickFormatter={(value: number) => format(value)} tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
        <YAxis type="category" dataKey="stage" width={72} tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
        <ChartTooltip formatter={(value) => format(Number(value))} />
        <Bar dataKey="durationMs" name="Duration" fill="var(--primary)" radius={[0, 4, 4, 0]} maxBarSize={42} isAnimationActive={false} />
      </BarChart>
    </ChartContainer>
  );
}

const exampleTrace: InstallDiagnosticPoint[] = [
  { stage: "Resolve", durationMs: 120 },
  { stage: "Download", durationMs: 840 },
  { stage: "Transform", durationMs: 210 },
  { stage: "Write", durationMs: 90 },
];

export function InstallDiagnosticsExample() {
  return <InstallDiagnosticsChart data={exampleTrace} />;
}
