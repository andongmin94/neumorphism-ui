"use client";

import { ToggleGroup as Primitive } from "@base-ui/react/toggle-group";
import { Toggle } from "./toggle";
import { mergeClassName } from "@/lib/utils";

function ToggleGroup({ className, ...props }: Primitive.Props) {
  return <Primitive data-slot="toggle-group" className={mergeClassName<Primitive.State>(
    "inline-flex w-fit max-w-full flex-wrap items-stretch gap-1 rounded-[var(--neu-radius-control)] border border-[color:var(--border)] bg-[var(--neu-surface-low)] p-1 [box-shadow:inset_0_1px_2px_var(--neu-shadow-dark)] data-[orientation=vertical]:flex-col [&>[data-slot=toggle]]:rounded-[var(--neu-radius-small)] [&>[data-slot=toggle]]:border-transparent [&>[data-slot=toggle]:not([data-pressed])]:bg-transparent [&>[data-slot=toggle]:not([data-pressed])]:[box-shadow:none] [&>[data-slot=toggle]:not([data-pressed]):not([data-disabled]):hover]:[box-shadow:none] [&>[data-slot=toggle]:not([data-pressed]):not([data-disabled]):hover]:bg-[var(--neu-surface-soft)] [&>[data-slot=toggle][data-pressed]]:bg-[var(--primary)] [&>[data-slot=toggle][data-pressed]]:[background-image:var(--neu-fill-primary)] [&>[data-slot=toggle][data-pressed]]:text-[var(--primary-foreground)] [&>[data-slot=toggle][data-pressed]]:[box-shadow:0_1px_2px_var(--neu-shadow-dark)] [&>[data-slot=toggle][data-pressed]:focus-visible]:outline-[color:var(--primary-foreground)] [&>[data-slot=toggle][data-disabled]]:[box-shadow:none]",
    className,
  )} {...props} />;
}
const ToggleGroupItem = Toggle;
export { ToggleGroup, ToggleGroupItem };
