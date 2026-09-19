"use client";

import * as React from "react";
import { DayPicker } from "@daypicker/react";
import { cn } from "@/lib/utils";

type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return <div data-slot="calendar" className="max-w-full"><DayPicker
    showOutsideDays={showOutsideDays}
    className={cn("w-fit max-w-full rounded-[var(--neu-radius-surface)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] p-3 font-sans text-[var(--foreground)] [box-shadow:var(--neu-shadow-raised-sm)] [--cell-size:clamp(1.75rem,7.5vw,2.25rem)]", className)}
    classNames={{
      months: "relative flex flex-col gap-6 sm:flex-row",
      month: "flex flex-col gap-3",
      month_caption: "flex h-10 items-center justify-center px-10",
      caption_label: "text-sm font-semibold",
      nav: "pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between",
      button_previous: "pointer-events-auto grid size-9 place-items-center rounded-[var(--neu-radius-control)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] [box-shadow:var(--neu-shadow-raised-sm)] outline-none hover:[box-shadow:var(--neu-shadow-hover)] active:[box-shadow:var(--neu-shadow-inset)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:opacity-35 aria-disabled:opacity-35 [&>svg]:size-4",
      button_next: "pointer-events-auto grid size-9 place-items-center rounded-[var(--neu-radius-control)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] [box-shadow:var(--neu-shadow-raised-sm)] outline-none hover:[box-shadow:var(--neu-shadow-hover)] active:[box-shadow:var(--neu-shadow-inset)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:opacity-35 aria-disabled:opacity-35 [&>svg]:size-4",
      chevron: "fill-current",
      dropdowns: "flex items-center justify-center gap-2 text-sm font-semibold",
      dropdown_root: "relative rounded-md focus-within:ring-2 focus-within:ring-[var(--ring)]",
      dropdown: "absolute inset-0 cursor-pointer opacity-0",
      month_grid: "border-collapse",
      weekdays: "border-b border-[var(--border)]",
      weekday: "h-8 w-[var(--cell-size)] text-center text-xs font-medium text-[var(--muted-foreground)]",
      week: "h-[calc(var(--cell-size)+0.25rem)]",
      week_number_header: "w-[var(--cell-size)]",
      week_number: "text-center text-xs text-[var(--muted-foreground)]",
      day: "size-[var(--cell-size)] p-0 text-center text-sm",
      day_button: "grid size-[var(--cell-size)] place-items-center rounded-lg border border-transparent font-medium outline-none transition-[background-color,box-shadow] duration-[var(--neu-duration)] motion-reduce:transition-none hover:bg-[var(--neu-surface-soft)] hover:[box-shadow:var(--neu-shadow-raised-sm)] active:[box-shadow:var(--neu-shadow-inset)] focus-visible:relative focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-35",
      selected: "[&:not(.neu-range-middle)>button]:bg-[var(--primary)] [&:not(.neu-range-middle)>button]:font-semibold [&:not(.neu-range-middle)>button]:text-[var(--primary-foreground)] [&:not(.neu-range-middle)>button]:[box-shadow:var(--neu-shadow-primary-inset)]",
      range_start: "rounded-s-lg bg-[var(--neu-selected)]",
      range_middle: "neu-range-middle bg-[var(--neu-selected)] [&>button]:rounded-none [&>button]:bg-transparent [&>button]:text-[var(--foreground)] [&>button]:shadow-none",
      range_end: "rounded-e-lg bg-[var(--neu-selected)]",
      today: "[&>button]:border-[var(--ring)]",
      outside: "text-[var(--muted-foreground)]",
      disabled: "cursor-not-allowed",
      hidden: "invisible",
      footer: "max-w-64 pt-3 text-sm text-[var(--muted-foreground)]",
      ...classNames,
    }}
    {...props}
  /></div>;
}

export { Calendar };
export type { CalendarProps };
