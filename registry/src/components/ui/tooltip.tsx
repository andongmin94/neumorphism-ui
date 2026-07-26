"use client";

import * as React from "react";

import { cn } from "../../lib/utils";

interface TooltipProps extends Omit<React.ComponentProps<"span">, "content"> {
  content: React.ReactNode;
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}

function Tooltip({ content, children, className, ...props }: TooltipProps) {
  const tooltipId = React.useId();
  const describedBy = [children.props["aria-describedby"], tooltipId].filter(Boolean).join(" ");
  const trigger = React.cloneElement(children, {
    "aria-describedby": describedBy,
  });

  return (
    <span
      data-slot="tooltip"
      className={cn("group/tooltip relative inline-flex", className)}
      {...props}
    >
      {trigger}
      <span
        id={tooltipId}
        role="tooltip"
        data-slot="tooltip-content"
        className="pointer-events-none absolute bottom-[calc(100%+0.625rem)] left-1/2 z-50 w-max max-w-64 -translate-x-1/2 translate-y-1 rounded-[calc(var(--neu-radius-surface)*0.55)] border border-[color:var(--neu-edge)] bg-[var(--popover)] px-3 py-2 text-xs font-medium text-[var(--popover-foreground)] opacity-0 [box-shadow:var(--neu-shadow-raised-sm)] transition-[opacity,transform] duration-[var(--neu-duration)] group-focus-within/tooltip:translate-y-0 group-focus-within/tooltip:opacity-100 group-hover/tooltip:translate-y-0 group-hover/tooltip:opacity-100"
      >
        {content}
      </span>
    </span>
  );
}

export { Tooltip };
