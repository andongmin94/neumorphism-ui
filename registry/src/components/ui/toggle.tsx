"use client";

import { Toggle as Primitive } from "@base-ui/react/toggle";
import { cn, mergeClassName } from "@/lib/utils";

const sizes = { sm: "h-8 min-w-8 px-2.5 text-xs", default: "h-10 min-w-10 px-3 text-sm", lg: "h-12 min-w-12 px-4 text-base" } as const;
type ToggleProps<Value extends string = string> = Primitive.Props<Value> & { size?: keyof typeof sizes };
function Toggle<Value extends string = string>({ className, size = "default", ...props }: ToggleProps<Value>) {
  return <Primitive data-slot="toggle" data-size={size} className={mergeClassName<Primitive.State>(cn(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-[var(--neu-radius-control)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] font-semibold text-[var(--foreground)] [box-shadow:var(--neu-shadow-raised-sm)] outline-none transition-[box-shadow,background-color,border-color] duration-[var(--neu-duration)] motion-reduce:transition-none hover:[box-shadow:var(--neu-shadow-hover)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] data-pressed:border-[color:var(--neu-selected-border)] data-pressed:bg-[var(--neu-selected)] data-pressed:[box-shadow:var(--neu-shadow-inset)] data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:size-4", sizes[size],
  ), className)} {...props} />;
}
export { Toggle };
export type { ToggleProps };
