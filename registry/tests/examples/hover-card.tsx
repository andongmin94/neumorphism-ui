"use client";

import * as React from "react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
export default function Example() {
  const id = React.useId();
  return (<HoverCard><HoverCardTrigger href="#profile-preview" className="inline-flex items-center gap-3 rounded-[var(--neu-radius-control)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] px-4 py-3 font-semibold text-[var(--foreground)] [box-shadow:var(--neu-shadow-raised-sm)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]">{"Preview profile"} <span aria-hidden="true">↗</span></HoverCardTrigger><HoverCardContent><strong id="profile-preview">Alex Kim</strong><p>{"Product designer · Seoul"}</p></HoverCardContent></HoverCard>);
}
