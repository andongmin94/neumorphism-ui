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
        "mb-2 overflow-hidden rounded-[var(--neu-radius-control)] border border-transparent border-b-[color:var(--border)] bg-transparent has-[[aria-expanded=true]]:border-transparent has-[[aria-expanded=true]]:bg-[var(--neu-surface)] has-[[aria-expanded=true]]:[box-shadow:var(--neu-shadow-inset-sm)] last:mb-0",
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
          "group/accordion-trigger flex flex-1 items-center justify-between gap-4 px-4 py-3.5 text-left text-sm font-semibold text-[var(--foreground)] outline-none transition-colors duration-[var(--neu-duration)] motion-reduce:transition-none hover:text-[var(--primary)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="accordion-indicator pointer-events-none size-4 shrink-0 text-[var(--neu-accent-ink)] transition-transform duration-[var(--neu-duration)] motion-reduce:transition-none group-aria-expanded/accordion-trigger:rotate-45"><path d="M5 12h14M12 5v14" /></svg>
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
      <div className="px-4 pt-0 pb-4 leading-relaxed">{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
