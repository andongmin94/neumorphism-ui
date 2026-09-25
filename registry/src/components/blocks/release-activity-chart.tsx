"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Select, SelectItem } from "@/components/ui/select";

export type ReleaseActivityPoint = {
  release: string;
  installs: number;
  updates: number;
};

export function ReleaseActivityChart({
  data,
}: {
  data: readonly ReleaseActivityPoint[];
}) {
  const [view, setView] = React.useState<"count" | "share">("count");
  const installs = data.reduce((sum, row) => sum + row.installs, 0);
  const updates = data.reduce((sum, row) => sum + row.updates, 0);
  const total = installs + updates;

  return (
    <ChartContainer
      data-chart="release-activity"
      title="Release activity"
      description="New installs and updates by release. Counts are events, not unique users."
      summary={data.length ? `Total activity ${total.toLocaleString()} · update share ${total ? ((updates / total) * 100).toFixed(1) : "0.0"}%` : "No release activity."}
      actions={
        <label className="grid gap-1.5 text-xs">
          View
          <Select value={view} onChange={(event) => setView(event.target.value as typeof view)}>
            <SelectItem value="count">Event counts</SelectItem>
            <SelectItem value="share">Share per release</SelectItem>
          </Select>
        </label>
      }
      tableLabel="View release data"
      empty={!data.length}
      table={
        <table>
          <caption className="sr-only">Release activity data</caption>
          <thead><tr><th>Release</th><th>Installs</th><th>Updates</th><th>Update share</th></tr></thead>
          <tbody>{data.map((row) => {
            const rowTotal = row.installs + row.updates;
            return <tr key={row.release}><th scope="row">{row.release}</th><td>{row.installs}</td><td>{row.updates}</td><td>{rowTotal ? ((row.updates / rowTotal) * 100).toFixed(1) + "%" : "—"}</td></tr>;
          })}</tbody>
        </table>
      }
    >
      <AreaChart data={data} stackOffset={view === "share" ? "expand" : "none"} accessibilityLayer margin={{ top: 12, right: 12, bottom: 4, left: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 4" />
        <XAxis dataKey="release" tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
        <YAxis domain={view === "share" ? [0, 1] : [0, "auto"]} width={52} tickFormatter={(value: number) => view === "share" ? `${Math.round(value * 100)}%` : String(value)} tick={{ fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
        <ChartTooltip formatter={(value) => Number(value).toLocaleString()} />
        <Area dataKey="installs" name="New installs" stackId="activity" stroke="var(--foreground)" fill="var(--primary)" fillOpacity={0.22} strokeWidth={2} isAnimationActive={false} />
        <Area dataKey="updates" name="Updates" stackId="activity" stroke="var(--muted-foreground)" fill="var(--muted)" fillOpacity={0.8} strokeWidth={2} strokeDasharray="6 4" isAnimationActive={false} />
      </AreaChart>
    </ChartContainer>
  );
}

const exampleActivity: ReleaseActivityPoint[] = [
  { release: "R1", installs: 148, updates: 62 },
  { release: "R2", installs: 232, updates: 104 },
  { release: "R3", installs: 196, updates: 88 },
  { release: "R4", installs: 284, updates: 132 },
  { release: "R5", installs: 341, updates: 176 },
  { release: "R6", installs: 378, updates: 209 },
];

export function ReleaseActivityExample() {
  return <ReleaseActivityChart data={exampleActivity} />;
}
