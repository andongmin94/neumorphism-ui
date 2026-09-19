"use client";

import { Toolbar as Primitive } from "@base-ui/react/toolbar";
import { mergeClassName } from "@/lib/utils";

function Toolbar({ className, ...props }: Primitive.Root.Props) {
  return <Primitive.Root data-slot="toolbar" className={mergeClassName<Primitive.Root.State>("flex w-fit max-w-full flex-wrap items-center gap-2 rounded-[var(--neu-radius-surface)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] p-2 [box-shadow:var(--neu-shadow-raised-sm)] data-[orientation=vertical]:flex-col", className)} {...props} />;
}
function ToolbarGroup({ className, ...props }: Primitive.Group.Props) {
  return <Primitive.Group data-slot="toolbar-group" className={mergeClassName<Primitive.Group.State>("flex items-center gap-1", className)} {...props} />;
}
function ToolbarButton({ className, ...props }: Primitive.Button.Props) {
  return <Primitive.Button data-slot="toolbar-button" className={mergeClassName<Primitive.Button.State>("inline-flex h-9 min-w-9 items-center justify-center gap-2 rounded-[var(--neu-radius-control)] border border-transparent px-3 text-sm font-medium text-[var(--foreground)] outline-none transition-[box-shadow,background-color] duration-[var(--neu-duration)] motion-reduce:transition-none hover:bg-[var(--neu-surface-soft)] active:[box-shadow:var(--neu-shadow-inset-sm)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] data-disabled:pointer-events-none data-disabled:opacity-40", className)} {...props} />;
}
function ToolbarSeparator({ className, ...props }: Primitive.Separator.Props) {
  return <Primitive.Separator data-slot="toolbar-separator" className={mergeClassName<Primitive.Separator.State>("mx-1 h-5 w-px shrink-0 bg-[var(--border)] data-[orientation=horizontal]:my-1 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full", className)} {...props} />;
}
function ToolbarLink({ className, ...props }: Primitive.Link.Props) {
  return <Primitive.Link data-slot="toolbar-link" className={mergeClassName<Primitive.Link.State>("rounded-[var(--neu-radius-control)] px-3 py-2 text-sm font-medium text-[var(--foreground)] underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-[var(--ring)]", className)} {...props} />;
}
export { Toolbar, ToolbarGroup, ToolbarButton, ToolbarSeparator, ToolbarLink };
