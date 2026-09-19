"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type CheckedState = boolean | "indeterminate";

interface CheckboxProps
  extends Omit<
    React.ComponentProps<"input">,
    "checked" | "defaultChecked" | "onChange" | "size" | "type"
  > {
  checked?: CheckedState;
  defaultChecked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onCheckedChange?: (checked: CheckedState) => void;
}

function Checkbox({
  checked,
  className,
  defaultChecked,
  disabled,
  onChange,
  onCheckedChange,
  ref,
  ...props
}: CheckboxProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isIndeterminate = checked === "indeterminate";

  React.useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  const setRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref],
  );

  return (
    <span
      data-slot="checkbox-root"
      className={cn("relative inline-flex size-5 shrink-0 align-middle", className)}
    >
      <input
        ref={setRef}
        type="checkbox"
        data-slot="checkbox"
        className="peer absolute inset-0 z-10 m-0 size-full cursor-pointer appearance-none rounded-md opacity-0 disabled:cursor-not-allowed"
        checked={checked === "indeterminate" ? false : checked}
        defaultChecked={checked === undefined ? defaultChecked : undefined}
        disabled={disabled}
        aria-checked={isIndeterminate ? "mixed" : undefined}
        onChange={(event) => {
          onChange?.(event);
          onCheckedChange?.(event.currentTarget.checked);

          if (isIndeterminate) {
            event.currentTarget.indeterminate = true;
          }
        }}
        {...props}
      />
      <span
        aria-hidden="true"
        className="relative flex size-5 items-center justify-center rounded-md border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] text-[var(--primary-foreground)] [box-shadow:var(--neu-shadow-inset)] transition-[background-color,box-shadow] duration-[var(--neu-duration)] motion-reduce:transition-none peer-checked:bg-[var(--primary)] peer-checked:[box-shadow:var(--neu-shadow-primary-inset)] peer-disabled:opacity-50 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--ring)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--background)] peer-indeterminate:bg-[var(--primary)] peer-indeterminate:[box-shadow:var(--neu-shadow-primary-inset)] peer-checked:[&_[data-check]]:opacity-100 peer-indeterminate:[&_[data-indeterminate]]:opacity-100"
      >
        <span
          data-check=""
          className="absolute text-xs font-black leading-none opacity-0 transition-opacity"
        >
          ✓
        </span>
        <span
          data-indeterminate=""
          className="absolute text-sm font-black leading-none opacity-0 transition-opacity"
        >
          −
        </span>
      </span>
    </span>
  );
}

export { Checkbox, type CheckedState };
