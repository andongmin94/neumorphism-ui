"use client";

import { NumberField as Primitive } from "@base-ui/react/number-field";
import { mergeClassName } from "@/lib/utils";

function NumberField({ className, ...props }: Primitive.Root.Props) {
  return <Primitive.Root data-slot="number-field" className={mergeClassName<Primitive.Root.State>("grid min-w-0 gap-2", className)} {...props} />;
}
function NumberFieldGroup({ className, ...props }: Primitive.Group.Props) {
  return <Primitive.Group data-slot="number-field-group" className={mergeClassName<Primitive.Group.State>("inline-flex w-fit max-w-full items-center gap-1 rounded-[var(--neu-radius-control)] border border-[color:var(--input)] bg-[var(--neu-surface)] p-1 [box-shadow:var(--neu-shadow-inset)] focus-within:ring-2 focus-within:ring-[var(--ring)]", className)} {...props} />;
}
function NumberFieldInput({ className, ...props }: Primitive.Input.Props) {
  return <Primitive.Input data-slot="number-field-input" className={mergeClassName<Primitive.Input.State>("h-9 w-20 min-w-0 bg-transparent text-center text-sm tabular-nums text-[var(--foreground)] outline-none disabled:opacity-50", className)} {...props} />;
}
const stepClass = "inline-flex size-9 shrink-0 items-center justify-center rounded-[calc(var(--neu-radius-control)-4px)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] text-lg font-medium text-[var(--foreground)] [box-shadow:var(--neu-shadow-raised-sm)] outline-none transition-shadow duration-[var(--neu-duration)] motion-reduce:transition-none hover:[box-shadow:var(--neu-shadow-hover)] active:[box-shadow:var(--neu-shadow-inset)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] data-disabled:pointer-events-none data-disabled:opacity-40";
function NumberFieldDecrement({ className, children = <span aria-hidden="true">−</span>, ...props }: Primitive.Decrement.Props) {
  return <Primitive.Decrement data-slot="number-field-decrement" className={mergeClassName<Primitive.Decrement.State>(stepClass, className)} {...props}>{children}</Primitive.Decrement>;
}
function NumberFieldIncrement({ className, children = <span aria-hidden="true">+</span>, ...props }: Primitive.Increment.Props) {
  return <Primitive.Increment data-slot="number-field-increment" className={mergeClassName<Primitive.Increment.State>(stepClass, className)} {...props}>{children}</Primitive.Increment>;
}
const NumberFieldScrubArea = Primitive.ScrubArea;
export { NumberField, NumberFieldGroup, NumberFieldInput, NumberFieldIncrement, NumberFieldDecrement, NumberFieldScrubArea };
