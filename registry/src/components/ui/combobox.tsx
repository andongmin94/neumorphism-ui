"use client";

import { Combobox as Primitive } from "@base-ui/react/combobox";
import { mergeClassName } from "@/lib/utils";

const Combobox = Primitive.Root;
const ComboboxTrigger = Primitive.Trigger;
const ComboboxValue = Primitive.Value;
const ComboboxClear = Primitive.Clear;
function ComboboxInput({ className, ...props }: Primitive.Input.Props) {
  return <Primitive.Input data-slot="combobox-input" className={mergeClassName<Primitive.Input.State>("h-10 w-full min-w-0 rounded-[var(--neu-radius-control)] border border-[color:var(--input)] bg-[var(--neu-surface)] px-3.5 text-sm text-[var(--foreground)] [box-shadow:var(--neu-shadow-inset)] outline-none transition-[border-color,box-shadow] duration-[var(--neu-duration)] motion-reduce:transition-none placeholder:text-[var(--muted-foreground)] focus-visible:border-[var(--ring)] focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]/25 disabled:opacity-50", className)} {...props} />;
}
type ComboboxContentProps = Primitive.Popup.Props & { sideOffset?: number; align?: Primitive.Positioner.Props["align"] };
function ComboboxContent({ className, sideOffset = 8, align = "start", ...props }: ComboboxContentProps) {
  return <Primitive.Portal><Primitive.Positioner sideOffset={sideOffset} align={align} className="z-50 outline-none">
    <Primitive.Popup data-slot="combobox-content" className={mergeClassName<Primitive.Popup.State>("w-[var(--anchor-width)] min-w-48 max-w-[calc(100vw-2rem)] rounded-[var(--neu-radius-overlay)] border border-[color:var(--neu-edge)] bg-[var(--popover)] p-1.5 text-sm text-[var(--popover-foreground)] [box-shadow:var(--neu-shadow-floating)] outline-none transition-opacity duration-[var(--neu-duration)] motion-reduce:transition-none data-[starting-style]:opacity-0 data-[ending-style]:opacity-0", className)} {...props} />
  </Primitive.Positioner></Primitive.Portal>;
}
function ComboboxList({ className, ...props }: Primitive.List.Props) {
  return <Primitive.List data-slot="combobox-list" className={mergeClassName<Primitive.List.State>("max-h-[min(18rem,var(--available-height))] overflow-y-auto overscroll-contain scroll-py-1 outline-none empty:p-0", className)} {...props} />;
}
function ComboboxItem({ className, children, ...props }: Primitive.Item.Props) {
  return <Primitive.Item data-slot="combobox-item" className={mergeClassName<Primitive.Item.State>("relative flex min-h-10 cursor-default items-center gap-2 rounded-[calc(var(--neu-radius-control)-3px)] border border-transparent py-2 pr-3 pl-8 outline-none data-highlighted:border-[color:var(--neu-selected-border)] data-highlighted:bg-[var(--neu-selected)] data-selected:font-semibold data-disabled:opacity-40 data-disabled:pointer-events-none", className)} {...props}>
    <Primitive.ItemIndicator className="absolute left-2.5 inline-flex size-3.5 items-center justify-center"><span aria-hidden="true">✓</span></Primitive.ItemIndicator>{children}
  </Primitive.Item>;
}
function ComboboxEmpty({ className, ...props }: Primitive.Empty.Props) {
  return <Primitive.Empty data-slot="combobox-empty" className={mergeClassName<Primitive.Empty.State>("px-3 py-5 text-center text-sm text-[var(--muted-foreground)] empty:hidden", className)} {...props} />;
}
function ComboboxLabel({ className, ...props }: Primitive.Label.Props) {
  return <Primitive.Label data-slot="combobox-label" className={mergeClassName<Primitive.Label.State>("mb-2 block text-sm font-semibold text-[var(--foreground)]", className)} {...props} />;
}
const ComboboxGroup = Primitive.Group;
function ComboboxGroupLabel({ className, ...props }: Primitive.GroupLabel.Props) {
  return <Primitive.GroupLabel data-slot="combobox-group-label" className={mergeClassName<Primitive.GroupLabel.State>("px-3 py-2 text-xs font-semibold text-[var(--muted-foreground)]", className)} {...props} />;
}
export { Combobox, ComboboxInput, ComboboxTrigger, ComboboxContent, ComboboxList, ComboboxItem, ComboboxEmpty, ComboboxLabel, ComboboxValue, ComboboxClear, ComboboxGroup, ComboboxGroupLabel };
export type { ComboboxContentProps };
