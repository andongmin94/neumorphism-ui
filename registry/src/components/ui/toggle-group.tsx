"use client";

import { ToggleGroup as Primitive } from "@base-ui/react/toggle-group";
import { Toggle } from "./toggle";
import { mergeClassName } from "@/lib/utils";

function ToggleGroup({ className, ...props }: Primitive.Props) {
  return <Primitive data-slot="toggle-group" className={mergeClassName<Primitive.State>("inline-flex w-fit max-w-full flex-wrap gap-1 rounded-[var(--neu-radius-control)] border border-transparent bg-[var(--neu-surface)] p-1 [box-shadow:var(--neu-shadow-inset)] [&>[data-slot=toggle]]:rounded-[var(--neu-radius-small)] [&>[data-slot=toggle]:not([data-pressed])]:shadow-none [&>[data-slot=toggle][data-pressed]]:[box-shadow:var(--neu-shadow-raised-sm)] data-[orientation=vertical]:flex-col", className)} {...props} />;
}
const ToggleGroupItem = Toggle;
export { ToggleGroup, ToggleGroupItem };
