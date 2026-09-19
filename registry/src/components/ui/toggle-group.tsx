"use client";

import { ToggleGroup as Primitive } from "@base-ui/react/toggle-group";
import { Toggle } from "./toggle";
import { mergeClassName } from "@/lib/utils";

function ToggleGroup({ className, ...props }: Primitive.Props) {
  return <Primitive data-slot="toggle-group" className={mergeClassName<Primitive.State>("inline-flex w-fit max-w-full flex-wrap gap-2 rounded-[var(--neu-radius-surface)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface-low)] p-2 [box-shadow:var(--neu-shadow-inset-sm)] data-[orientation=vertical]:flex-col", className)} {...props} />;
}
const ToggleGroupItem = Toggle;
export { ToggleGroup, ToggleGroupItem };
