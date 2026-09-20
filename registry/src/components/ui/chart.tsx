"use client";

import * as React from "react";
import { ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

export interface ChartContainerProps extends Omit<React.ComponentProps<"section">, "title" | "children"> {
  title: string;
  description: string;
  summary?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactElement;
  table: React.ReactNode;
  tableLabel: string;
  empty?: boolean;
  emptyLabel?: string;
}

/** Owns the surface, responsive dimensions and exact-data disclosure only.
 * Compose ordinary Recharts series and axes; no private chart configuration DSL.
 */
export function ChartContainer({
  title, description, summary, actions, children, table, tableLabel,
  empty = false, emptyLabel = "No observations.", className, ...props
}: ChartContainerProps) {
  const id = React.useId();
  return (
    <section
      data-slot="chart"
      aria-labelledby={`${id}-title`}
      className={cn("grid min-w-0 gap-5 rounded-[var(--neu-radius-surface)] border border-[var(--neu-edge)] bg-[var(--neu-surface)] p-5 text-[var(--foreground)] [box-shadow:var(--neu-shadow-raised-sm)] sm:p-6", className)}
      {...props}
    >
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="grid min-w-0 gap-1.5">
          <h3 id={`${id}-title`} className="text-base font-semibold tracking-tight">{title}</h3>
          <p id={`${id}-description`} className="max-w-prose text-sm leading-relaxed text-[var(--muted-foreground)]">{description}</p>
        </div>
        {actions}
      </header>
      {summary != null && <p className="text-sm font-medium tabular-nums">{summary}</p>}
      {empty ? (
        <div role="status" className="grid h-64 place-items-center rounded-xl border border-dashed border-[var(--border)] p-6 text-center text-sm text-[var(--muted-foreground)]">{emptyLabel}</div>
      ) : (
        <div
          role="group" aria-label={title} aria-describedby={`${id}-description`}
          data-slot="chart-plot"
          className="h-64 min-w-0 text-xs [&_.recharts-surface:focus-visible]:outline-2 [&_.recharts-surface:focus-visible]:outline-offset-2 [&_.recharts-surface:focus-visible]:outline-[var(--ring)]"
        >
          <ResponsiveContainer width="100%" height="100%" minWidth={0} initialDimension={{ width: 480, height: 256 }}>
            {children}
          </ResponsiveContainer>
        </div>
      )}
      <details className="min-w-0 border-t border-[var(--border)] pt-4">
        <summary className="cursor-pointer rounded text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]">{tableLabel}</summary>
        <div
          role="region" aria-label={tableLabel} tabIndex={0}
          className="mt-4 max-h-80 overflow-auto rounded outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] [&_table]:w-full [&_table]:border-collapse [&_table]:text-left [&_table]:text-xs [&_td]:border-b [&_td]:border-[var(--border)] [&_td]:px-3 [&_td]:py-2.5 [&_td]:tabular-nums [&_th]:whitespace-nowrap [&_th]:border-b [&_th]:border-[var(--border)] [&_th]:px-3 [&_th]:py-2.5 [&_th]:font-semibold"
        >{table}</div>
      </details>
    </section>
  );
}

export function ChartTooltip(props: React.ComponentProps<typeof Tooltip>) {
  return <Tooltip
    isAnimationActive={false}
    contentStyle={{ background: "var(--popover)", color: "var(--popover-foreground)", border: "1px solid var(--border)", borderRadius: "var(--neu-radius-control)", boxShadow: "var(--neu-shadow-floating)", fontSize: 12 }}
    labelStyle={{ color: "var(--popover-foreground)", fontWeight: 600 }}
    itemStyle={{ color: "var(--popover-foreground)" }}
    {...props}
  />;
}
