"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface SwitchProps
  extends Omit<React.ComponentProps<"input">, "onChange" | "size" | "type"> {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onCheckedChange?: (checked: boolean) => void;
}

function Switch({
  className,
  disabled,
  onChange,
  onCheckedChange,
  ...props
}: SwitchProps) {
  return (
    <span
      data-slot="switch-root"
      className={cn("relative inline-flex h-6 w-11 shrink-0 align-middle", className)}
    >
      <input
        type="checkbox"
        role="switch"
        data-slot="switch"
        className="peer absolute inset-x-0 -inset-y-2.5 z-10 m-0 h-11 w-full cursor-pointer appearance-none rounded-full opacity-0 disabled:cursor-not-allowed"
        disabled={disabled}
        onChange={(event) => {
          onChange?.(event);
          onCheckedChange?.(event.currentTarget.checked);
        }}
        {...props}
      />
      <span
        aria-hidden="true"
        data-slot="switch-track"
        className="flex size-full items-center rounded-full border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] p-0.5 shadow-[var(--neu-shadow-inset)] transition-[background-color,box-shadow] duration-[var(--neu-duration)] motion-reduce:transition-none peer-checked:bg-[var(--primary)] peer-checked:shadow-[var(--neu-shadow-primary-inset)] peer-disabled:opacity-50 peer-focus-visible:outline-2 peer-focus-visible:outline-solid peer-focus-visible:outline-offset-3 peer-focus-visible:outline-[color:var(--ring)] peer-checked:[&>span]:translate-x-5 rtl:peer-checked:[&>span]:-translate-x-5"
      >
        <span data-slot="switch-thumb" className="size-[18px] shrink-0 rounded-full bg-[var(--neu-surface-soft)] shadow-[var(--neu-shadow-raised-sm)] transition-transform duration-[var(--neu-duration)] motion-reduce:transition-none" />
      </span>
    </span>
  );
}

export { Switch };
