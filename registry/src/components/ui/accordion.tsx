"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

import { mergeClassName } from "@/lib/utils";

function Accordion({
  className,
  ...props
}: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={mergeClassName<AccordionPrimitive.Root.State>(
        "flex w-full flex-col",
        className,
      )}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={mergeClassName<AccordionPrimitive.Item.State>(
        "mb-3 overflow-hidden rounded-[var(--neu-radius-surface)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] [box-shadow:var(--neu-shadow-raised-sm)] last:mb-0",
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={mergeClassName<AccordionPrimitive.Trigger.State>(
          "group/accordion-trigger flex flex-1 items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-[var(--foreground)] outline-none transition-colors duration-[var(--neu-duration)] motion-reduce:transition-none hover:text-[var(--primary)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
        <span
          className="accordion-indicator pointer-events-none grid size-6 shrink-0 place-items-center rounded-full border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] text-base leading-none text-[var(--primary)] [box-shadow:var(--neu-shadow-raised-sm)] transition-[box-shadow,transform] duration-[var(--neu-duration)] motion-reduce:transition-none group-aria-expanded/accordion-trigger:rotate-45 group-aria-expanded/accordion-trigger:[box-shadow:var(--neu-shadow-inset)]"
          aria-hidden="true"
        >
          +
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={mergeClassName<AccordionPrimitive.Panel.State>(
        "h-[var(--accordion-panel-height)] overflow-hidden text-sm text-[var(--muted-foreground)] transition-[height] duration-[var(--neu-duration)] motion-reduce:transition-none ease-out data-[ending-style]:h-0 data-[starting-style]:h-0",
        className,
      )}
      {...props}
    >
      <div className="px-5 pt-0 pb-5 leading-relaxed">{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
