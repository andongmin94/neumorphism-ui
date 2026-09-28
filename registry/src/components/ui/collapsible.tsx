"use client";

import { Collapsible as Primitive } from "@base-ui/react/collapsible";
import { mergeClassName } from "@/lib/utils";

function Collapsible({ className, ...props }: Primitive.Root.Props) {
  return <Primitive.Root data-slot="collapsible" className={mergeClassName<Primitive.Root.State>("w-full min-w-0 rounded-[var(--neu-radius-surface)] border border-[color:var(--border)] bg-[var(--neu-surface)] p-1", className)} {...props} />;
}
function CollapsibleTrigger({ className, children, ...props }: Primitive.Trigger.Props) {
  return <Primitive.Trigger data-slot="collapsible-trigger" className={mergeClassName<Primitive.Trigger.State>("group/collapsible-trigger flex min-h-10 w-full items-center justify-between gap-3 rounded-[var(--neu-radius-control)] px-3 py-2 text-left text-sm font-semibold text-[var(--foreground)] outline-none transition-colors duration-[var(--neu-duration)] motion-reduce:transition-none hover:bg-[var(--neu-surface-soft)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] data-disabled:cursor-not-allowed data-disabled:opacity-50", className)} {...props}>{children}<svg aria-hidden="true" className="pointer-events-none size-4 shrink-0 text-[var(--neu-accent-ink)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path data-slot="disclosure-stem" d="M12 5v14" className="origin-center transition-transform duration-[var(--neu-duration)] motion-reduce:transition-none group-aria-expanded/collapsible-trigger:scale-y-0" /></svg></Primitive.Trigger>;
}
function CollapsibleContent({ className, ...props }: Primitive.Panel.Props) {
  return <Primitive.Panel data-slot="collapsible-content" className={mergeClassName<Primitive.Panel.State>("overflow-hidden text-sm leading-relaxed text-[var(--muted-foreground)] [&>div]:px-3 [&>div]:pt-2 [&>div]:pb-3", className)} {...props} />;
}
export { Collapsible, CollapsibleTrigger, CollapsibleContent };
