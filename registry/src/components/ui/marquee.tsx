"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps extends Omit<React.ComponentProps<"div">, "children"> {
  items: readonly React.ReactNode[];
  duration?: number;
  defaultPaused?: boolean;
  label?: string;
  pauseLabel?: string;
  resumeLabel?: string;
}

function Marquee({
  items,
  duration = 24,
  defaultPaused = false,
  label = "Scrolling content",
  pauseLabel = "Pause animation",
  resumeLabel = "Resume animation",
  className,
  ...props
}: MarqueeProps) {
  const [paused, setPaused] = React.useState(defaultPaused);
  const itemNodes = items.map((item, index) => (
    <span
      data-slot="marquee-item"
      className="shrink-0 whitespace-nowrap rounded-[var(--neu-radius-control)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] px-4 py-2 text-sm font-semibold [box-shadow:var(--neu-shadow-raised-sm)]"
      key={index}
    >
      {item}
    </span>
  ));

  return (
    <div
      data-slot="marquee"
      aria-label={label}
      className={cn(
        "relative w-full min-w-0 overflow-hidden rounded-[var(--neu-radius-surface)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface-soft)] p-3 pr-24 [box-shadow:var(--neu-shadow-inset)]",
        className,
      )}
      {...props}
    >
      <style>{`
        @keyframes neumorphism-marquee-scroll {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-slot="marquee-track"] { animation: none !important; transform: none !important; }
          [data-slot="marquee-copy"] { display: none !important; }
        }
      `}</style>
      <button
        type="button"
        data-slot="marquee-toggle"
        aria-pressed={paused}
        aria-label={paused ? resumeLabel : pauseLabel}
        onClick={() => setPaused((value) => !value)}
        className="absolute right-2 top-2 z-10 h-8 rounded-[var(--neu-radius-control)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] px-3 text-xs font-semibold text-[var(--foreground)] [box-shadow:var(--neu-shadow-raised-sm)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] active:[box-shadow:var(--neu-shadow-inset)]"
      >
        {paused ? "▶" : "Ⅱ"}
      </button>
      <div
        data-slot="marquee-track"
        className="flex w-max min-w-full items-center gap-3 will-change-transform"
        style={{
          animation: `neumorphism-marquee-scroll ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        <div className="flex shrink-0 items-center gap-3 pr-3">{itemNodes}</div>
        <div
          data-slot="marquee-copy"
          aria-hidden="true"
          className="flex shrink-0 items-center gap-3 pr-3"
        >
          {itemNodes}
        </div>
      </div>
    </div>
  );
}

export { Marquee };
export type { MarqueeProps };
