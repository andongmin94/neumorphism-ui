"use client";

import { Fieldset as Primitive } from "@base-ui/react/fieldset";
import { mergeClassName } from "@/lib/utils";

function Fieldset({ className, ...props }: Primitive.Root.Props) {
  return <Primitive.Root data-slot="fieldset" className={mergeClassName<Primitive.Root.State>("grid min-w-0 gap-5 rounded-[var(--neu-radius-surface)] border border-[color:var(--border)] bg-[var(--neu-surface)] p-5 [box-shadow:var(--neu-shadow-raised-sm)]", className)} {...props} />;
}
function FieldsetLegend({ className, ...props }: Primitive.Legend.Props) {
  return <Primitive.Legend data-slot="fieldset-legend" className={mergeClassName<Primitive.Legend.State>("px-2 text-sm font-semibold tracking-tight text-[var(--foreground)]", className)} {...props} />;
}
export { Fieldset, FieldsetLegend };
