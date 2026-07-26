import * as React from "react";

import { cn } from "@/lib/utils";

function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <span data-slot="select-root" className="relative inline-flex w-full">
      <select
        data-slot="select"
        className={cn(
          "h-10 w-full appearance-none rounded-[var(--neu-radius-control)] border border-transparent bg-[var(--neu-surface)] py-2 pl-4 pr-10 text-sm text-[var(--foreground)] [box-shadow:var(--neu-shadow-inset)] outline-none transition-[box-shadow,border-color] duration-[var(--neu-duration)] focus-visible:border-[var(--ring)] focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-[var(--destructive)] aria-invalid:ring-2 aria-invalid:ring-[color:var(--destructive)]/20",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[var(--muted-foreground)]"
      >
        ⌄
      </span>
    </span>
  );
}

function SelectGroup(props: React.ComponentProps<"optgroup">) {
  return <optgroup data-slot="select-group" {...props} />;
}

function SelectItem(props: React.ComponentProps<"option">) {
  return <option data-slot="select-item" {...props} />;
}

const SelectOption = SelectItem;

export { Select, SelectGroup, SelectItem, SelectOption };
