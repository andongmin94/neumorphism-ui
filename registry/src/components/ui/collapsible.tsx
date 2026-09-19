"use client";

import { Collapsible as Primitive } from "@base-ui/react/collapsible";
import { mergeClassName } from "@/lib/utils";

function Collapsible({ className, ...props }: Primitive.Root.Props) {
  return <Primitive.Root data-slot="collapsible" className={mergeClassName<Primitive.Root.State>("w-full min-w-0 rounded-[var(--neu-radius-surface)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] p-3 [box-shadow:var(--neu-shadow-raised-sm)]", className)} {...props} />;
}
function CollapsibleTrigger({ className, ...props }: Primitive.Trigger.Props) {
  return <Primitive.Trigger data-slot="collapsible-trigger" className={mergeClassName<Primitive.Trigger.State>("flex min-h-10 w-full items-center justify-between gap-3 rounded-[var(--neu-radius-control)] px-3 py-2 text-left text-sm font-semibold text-[var(--foreground)] outline-none transition-colors duration-[var(--neu-duration)] motion-reduce:transition-none hover:bg-[var(--neu-surface-soft)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] data-disabled:cursor-not-allowed data-disabled:opacity-50", className)} {...props} />;
}
function CollapsibleContent({ className, ...props }: Primitive.Panel.Props) {
  return <Primitive.Panel data-slot="collapsible-content" className={mergeClassName<Primitive.Panel.State>("overflow-hidden text-sm leading-relaxed text-[var(--muted-foreground)] [&>div]:px-3 [&>div]:pt-2 [&>div]:pb-3", className)} {...props} />;
}
export { Collapsible, CollapsibleTrigger, CollapsibleContent };
