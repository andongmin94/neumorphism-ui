"use client";

import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import type * as React from "react";

import { cn } from "@/lib/utils";

type ContextMenuRootProps = ContextMenuPrimitive.Root.Props & {
  dir?: "ltr" | "rtl";
};

type ContextMenuContentProps = ContextMenuPrimitive.Popup.Props &
  Pick<
    ContextMenuPrimitive.Positioner.Props,
    | "align"
    | "alignOffset"
    | "arrowPadding"
    | "collisionAvoidance"
    | "collisionBoundary"
    | "collisionPadding"
    | "disableAnchorTracking"
    | "positionMethod"
    | "side"
    | "sideOffset"
    | "sticky"
  >;

function ContextMenu({ dir, ...props }: ContextMenuRootProps) {
  const menu = <ContextMenuPrimitive.Root {...props} />;
  return dir ? <DirectionProvider direction={dir}>{menu}</DirectionProvider> : menu;
}

function ContextMenuPortal(props: ContextMenuPrimitive.Portal.Props) {
  return <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />;
}

function ContextMenuTrigger({ className, ...props }: ContextMenuPrimitive.Trigger.Props) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      {...props}
      className={(state) =>
        cn("select-none outline-none", typeof className === "function" ? className(state) : className)
      }
    />
  );
}

function ContextMenuContent({
  align = "start",
  alignOffset = 4,
  arrowPadding = 0,
  children,
  className,
  collisionAvoidance,
  collisionBoundary,
  collisionPadding = 0,
  disableAnchorTracking,
  positionMethod,
  side = "right",
  sideOffset = 4,
  sticky,
  ...props
}: ContextMenuContentProps) {
  return (
    <ContextMenuPortal>
      <ContextMenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        arrowPadding={arrowPadding}
        collisionAvoidance={collisionAvoidance}
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
        disableAnchorTracking={disableAnchorTracking}
        positionMethod={positionMethod}
        side={side}
        sideOffset={sideOffset}
        sticky={sticky}
        className="isolate z-50 outline-none"
      >
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-content"
          {...props}
          className={(state) =>
            cn(
              "min-w-40 origin-[var(--transform-origin)] overflow-hidden rounded-[calc(var(--neu-radius-surface)*0.8)] border border-[color:var(--neu-edge)] bg-[var(--popover)] p-1.5 text-[var(--popover-foreground)] [box-shadow:var(--neu-shadow-floating)] outline-none transition-[opacity,transform] duration-[var(--neu-duration)] motion-reduce:transition-none data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
              typeof className === "function" ? className(state) : className,
            )
          }
        >
          {children}
        </ContextMenuPrimitive.Popup>
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPortal>
  );
}

function ContextMenuGroup(props: ContextMenuPrimitive.Group.Props) {
  return <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />;
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<"div"> & { inset?: boolean }) {
  return (
    <div
      data-slot="context-menu-label"
      data-inset={inset}
      role="presentation"
      className={cn(
        "px-2.5 py-1.5 text-xs font-semibold text-[var(--muted-foreground)] data-[inset=true]:pl-8",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: ContextMenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      {...props}
      className={(state) =>
        cn(
          "relative flex cursor-default items-center gap-2 rounded-[calc(var(--neu-radius-surface)*0.55)] px-2.5 py-2 text-sm outline-none select-none transition-[background-color,color] duration-[var(--neu-duration)] motion-reduce:transition-none data-[highlighted]:bg-[var(--neu-surface-low)] data-[highlighted]:text-[var(--foreground)] data-[inset=true]:pl-8 data-[variant=destructive]:text-[var(--destructive)] data-disabled:pointer-events-none data-disabled:opacity-50",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}

function ContextMenuSub(props: ContextMenuPrimitive.SubmenuRoot.Props) {
  return <ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />;
}

function ContextMenuSubTrigger({
  className,
  children,
  inset,
  ...props
}: ContextMenuPrimitive.SubmenuTrigger.Props & { inset?: boolean }) {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      {...props}
      className={(state) =>
        cn(
          "flex cursor-default items-center gap-2 rounded-[calc(var(--neu-radius-surface)*0.55)] px-2.5 py-2 text-sm outline-none select-none data-[highlighted]:bg-[var(--neu-surface-low)] data-[inset=true]:pl-8 data-[popup-open]:bg-[var(--neu-surface-low)]",
          typeof className === "function" ? className(state) : className,
        )
      }
    >
      {children}
      <span className="ml-auto text-base text-[var(--muted-foreground)]" aria-hidden="true">›</span>
    </ContextMenuPrimitive.SubmenuTrigger>
  );
}

function ContextMenuSubContent({ className, ...props }: ContextMenuContentProps) {
  return (
    <ContextMenuContent
      data-slot="context-menu-sub-content"
      side="right"
      sideOffset={8}
      {...props}
      className={(state) =>
        cn(typeof className === "function" ? className(state) : className)
      }
    />
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  closeOnClick = true,
  ...props
}: ContextMenuPrimitive.CheckboxItem.Props) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      closeOnClick={closeOnClick}
      {...props}
      className={(state) =>
        cn(
          "relative flex cursor-default items-center gap-2 rounded-[calc(var(--neu-radius-surface)*0.55)] py-2 pr-2.5 pl-8 text-sm outline-none select-none data-[highlighted]:bg-[var(--neu-surface-low)] data-disabled:pointer-events-none data-disabled:opacity-50",
          typeof className === "function" ? className(state) : className,
        )
      }
    >
      <span className="pointer-events-none absolute left-2.5 grid size-4 place-items-center text-[var(--primary)]">
        <ContextMenuPrimitive.CheckboxItemIndicator>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4 4L19 6" /></svg>
        </ContextMenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

function ContextMenuRadioGroup(props: ContextMenuPrimitive.RadioGroup.Props) {
  return <ContextMenuPrimitive.RadioGroup data-slot="context-menu-radio-group" {...props} />;
}

function ContextMenuRadioItem({
  className,
  children,
  closeOnClick = true,
  ...props
}: ContextMenuPrimitive.RadioItem.Props) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      closeOnClick={closeOnClick}
      {...props}
      className={(state) =>
        cn(
          "relative flex cursor-default items-center gap-2 rounded-[calc(var(--neu-radius-surface)*0.55)] py-2 pr-2.5 pl-8 text-sm outline-none select-none data-[highlighted]:bg-[var(--neu-surface-low)] data-disabled:pointer-events-none data-disabled:opacity-50",
          typeof className === "function" ? className(state) : className,
        )
      }
    >
      <span className="pointer-events-none absolute left-2.5 grid size-4 place-items-center text-[var(--primary)]">
        <ContextMenuPrimitive.RadioItemIndicator>
          <span aria-hidden="true">•</span>
        </ContextMenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

function ContextMenuSeparator({ className, ...props }: ContextMenuPrimitive.Separator.Props) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      {...props}
      className={(state) =>
        cn(
          "-mx-1 my-1 h-px bg-[var(--border)]",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}

function ContextMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn("ml-auto text-xs tracking-widest text-[var(--muted-foreground)]", className)}
      {...props}
    />
  );
}

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
};
