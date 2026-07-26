"use client";

import * as React from "react";

import { cn } from "@/registry/src/lib/utils";

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
        className="peer absolute inset-0 z-10 m-0 size-full cursor-pointer appearance-none rounded-full opacity-0 disabled:cursor-not-allowed"
        disabled={disabled}
        onChange={(event) => {
          onChange?.(event);
          onCheckedChange?.(event.currentTarget.checked);
        }}
        {...props}
      />
      <span
        aria-hidden="true"
        className="flex size-full items-center rounded-full border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] p-0.5 [box-shadow:var(--neu-shadow-inset)] transition-[background-color,box-shadow] duration-[var(--neu-duration)] peer-checked:bg-[var(--primary)] peer-checked:[box-shadow:var(--neu-shadow-primary)] peer-disabled:opacity-50 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--ring)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--background)] peer-checked:[&>span]:translate-x-5"
      >
        <span className="size-5 rounded-full bg-[var(--neu-surface-soft)] [box-shadow:var(--neu-shadow-raised-sm)] transition-transform duration-[var(--neu-duration)]" />
      </span>
    </span>
  );
}

export { Switch };
