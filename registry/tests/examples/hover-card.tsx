"use client";

import * as React from "react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
export default function Example() {
  const id = React.useId();
  return (<HoverCard><HoverCardTrigger href="#profile-preview" className="inline-flex items-center gap-3 rounded-[var(--neu-radius-control)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] px-4 py-3 font-semibold text-[var(--foreground)] [box-shadow:var(--neu-shadow-raised-sm)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]">{"Preview profile"} <svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg></HoverCardTrigger><HoverCardContent><strong id="profile-preview">Alex Kim</strong><p>{"Product designer · Seoul"}</p></HoverCardContent></HoverCard>);
}
