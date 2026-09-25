"use client";

import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Drawer(props: DrawerPrimitive.Root.Props) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger(props: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal(props: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose(props: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({ className, ...props }: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      {...props}
      className={(state) =>
        cn(
          "fixed inset-0 z-50 bg-[var(--neu-overlay)] opacity-[calc(1-var(--drawer-swipe-progress,0))] backdrop-blur-sm transition-opacity duration-[var(--neu-duration)] motion-reduce:transition-none data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[swiping]:duration-0",
          typeof className === "function" ? className(state) : className,
        )
      }
    />
  );
}

function DrawerContent({ className, children, ...props }: DrawerPrimitive.Popup.Props) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Viewport
        data-slot="drawer-viewport"
        className="pointer-events-none fixed inset-0 z-50"
      >
        <DrawerPrimitive.Popup
          data-slot="drawer-content"
          {...props}
          className={(state) =>
            cn(
              "group/drawer-popup pointer-events-auto fixed z-50 flex min-h-0 transform-[translate3d(var(--translate-x,0px),var(--translate-y,0px),0)] flex-col border border-[color:var(--neu-edge)] bg-[var(--popover)] text-[var(--popover-foreground)] [box-shadow:var(--neu-shadow-floating)] outline-none transition-[transform,height,opacity] duration-[var(--neu-duration)] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none data-[swiping]:duration-0 data-[starting-style]:transform-(--closed-transform) data-[ending-style]:transform-(--closed-transform)",
              "data-[swipe-direction=down]:inset-x-0 data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:max-h-[85dvh] data-[swipe-direction=down]:rounded-t-[var(--neu-radius-overlay)] data-[swipe-direction=down]:[--closed-transform:translate3d(0,calc(100%+1px),0)] data-[swipe-direction=down]:[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y,0px))]",
              "data-[swipe-direction=up]:inset-x-0 data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:max-h-[85dvh] data-[swipe-direction=up]:rounded-b-[var(--neu-radius-overlay)] data-[swipe-direction=up]:[--closed-transform:translate3d(0,calc(-100%-1px),0)] data-[swipe-direction=up]:[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y,0px))]",
              "data-[swipe-direction=right]:inset-y-0 data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:w-[min(28rem,calc(100vw-1rem))] data-[swipe-direction=right]:rounded-l-[var(--neu-radius-overlay)] data-[swipe-direction=right]:[--closed-transform:translate3d(calc(100%+1px),0,0)] data-[swipe-direction=right]:[--translate-x:var(--drawer-swipe-movement-x,0px)]",
              "data-[swipe-direction=left]:inset-y-0 data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:w-[min(28rem,calc(100vw-1rem))] data-[swipe-direction=left]:rounded-r-[var(--neu-radius-overlay)] data-[swipe-direction=left]:[--closed-transform:translate3d(calc(-100%-1px),0,0)] data-[swipe-direction=left]:[--translate-x:var(--drawer-swipe-movement-x,0px)]",
              typeof className === "function" ? className(state) : className,
            )
          }
        >
          <div
            data-slot="drawer-handle"
            aria-hidden="true"
            className="relative z-10 shrink-0 rounded-full bg-[var(--muted-foreground)] opacity-45 group-data-[swipe-direction=down]/drawer-popup:mx-auto group-data-[swipe-direction=down]/drawer-popup:mt-3 group-data-[swipe-direction=down]/drawer-popup:h-1.5 group-data-[swipe-direction=down]/drawer-popup:w-20 group-data-[swipe-direction=up]/drawer-popup:order-last group-data-[swipe-direction=up]/drawer-popup:mx-auto group-data-[swipe-direction=up]/drawer-popup:mb-3 group-data-[swipe-direction=up]/drawer-popup:h-1.5 group-data-[swipe-direction=up]/drawer-popup:w-20 group-data-[swipe-direction=right]/drawer-popup:my-auto group-data-[swipe-direction=right]/drawer-popup:ml-3 group-data-[swipe-direction=right]/drawer-popup:h-20 group-data-[swipe-direction=right]/drawer-popup:w-1.5 group-data-[swipe-direction=left]/drawer-popup:order-last group-data-[swipe-direction=left]/drawer-popup:my-auto group-data-[swipe-direction=left]/drawer-popup:mr-3 group-data-[swipe-direction=left]/drawer-popup:h-20 group-data-[swipe-direction=left]/drawer-popup:w-1.5"
          />
          <DrawerPrimitive.Content
            data-slot="drawer-body"
            className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain rounded-[inherit] select-text"
          >
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("grid shrink-0 gap-2 p-5 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex shrink-0 flex-col gap-3 p-5 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      {...props}
      className={(state) =>
        cn("text-lg font-semibold leading-none tracking-tight", typeof className === "function" ? className(state) : className)
      }
    />
  );
}

function DrawerDescription({ className, ...props }: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      {...props}
      className={(state) =>
        cn("text-sm leading-relaxed text-[var(--muted-foreground)]", typeof className === "function" ? className(state) : className)
      }
    />
  );
}

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
};
