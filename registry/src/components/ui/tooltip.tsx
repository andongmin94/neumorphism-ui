"use client";

import * as React from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";

import { cn } from "@/registry/src/lib/utils";

function TooltipProvider({
  delayDuration = 250,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip(props: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger(
  props: React.ComponentProps<typeof TooltipPrimitive.Trigger>,
) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-max max-w-64 origin-[var(--radix-tooltip-content-transform-origin)] rounded-[calc(var(--neu-radius-surface)*0.55)] border border-[color:var(--neu-edge)] bg-[var(--popover)] px-3 py-2 text-xs font-medium text-[var(--popover-foreground)] [box-shadow:var(--neu-shadow-raised-sm)] data-[state=closed]:scale-95 data-[state=closed]:opacity-0 data-[state=instant-open]:scale-100 data-[state=instant-open]:opacity-100 data-[state=delayed-open]:scale-100 data-[state=delayed-open]:opacity-100",
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
