"use client";

import * as React from "react";
import { Progress as ProgressPrimitive } from "radix-ui";

import { cn } from "@/registry/src/lib/utils";

function Progress({
  className,
  value,
  max = 100,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const normalizedMax =
    typeof max === "number" && Number.isFinite(max) && max > 0 ? max : 100;
  const normalizedValue =
    typeof value === "number" && Number.isFinite(value)
      ? Math.min(Math.max(value, 0), normalizedMax)
      : null;
  const percentage =
    normalizedValue === null ? 0 : (normalizedValue / normalizedMax) * 100;

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={normalizedValue}
      max={normalizedMax}
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-[var(--neu-radius-control)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] [box-shadow:var(--neu-shadow-inset)]",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full rounded-[inherit] bg-[var(--primary)] [box-shadow:var(--neu-shadow-primary)] transition-transform duration-[var(--neu-duration)] ease-out"
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
