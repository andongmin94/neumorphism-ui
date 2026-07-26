"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import { cn } from "@/registry/src/lib/utils";

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "mb-3 overflow-hidden rounded-[var(--neu-radius-surface)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] [box-shadow:var(--neu-shadow-raised-sm)] last:mb-0 data-[state=open]:[box-shadow:var(--neu-shadow-inset)]",
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
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex flex-1 items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-[var(--foreground)] outline-none transition-colors duration-[var(--neu-duration)] hover:text-[var(--primary)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]_.accordion-indicator]:rotate-45",
          className,
        )}
        {...props}
      >
        {children}
        <span
          className="accordion-indicator pointer-events-none grid size-6 shrink-0 place-items-center rounded-full border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] text-base leading-none text-[var(--primary)] [box-shadow:var(--neu-shadow-raised-sm)] transition-transform duration-[var(--neu-duration)]"
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
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="h-[var(--radix-accordion-content-height)] overflow-hidden text-sm text-[var(--muted-foreground)] transition-[height] duration-[var(--neu-duration)] ease-out data-[state=closed]:h-0"
      {...props}
    >
      <div className={cn("px-5 pt-0 pb-5 leading-relaxed", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
