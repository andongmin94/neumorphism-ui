import * as React from "react";
import { cn } from "@/lib/utils";
function Select({ className, children, multiple, size, ...props }: React.ComponentProps<"select">) {
  const listbox = Boolean(multiple || (size !== undefined && size > 1));
  return (
    <span data-slot="select-root" className="relative inline-flex w-full min-w-0">
      <select
        data-slot="select" multiple={multiple} size={size}
        className={cn(
          "peer w-full min-w-0 appearance-none rounded-[var(--neu-radius-control)] border border-transparent bg-[var(--neu-surface)] [background-image:var(--neu-fill-inset)] text-sm text-[var(--foreground)] shadow-[var(--neu-shadow-inset)] outline-hidden transition-[box-shadow,border-color] duration-[var(--neu-duration)] motion-reduce:transition-none focus-visible:border-[var(--ring)] focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ring)] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none disabled:[background-image:none] disabled:border-[color:var(--input)] aria-invalid:border-[var(--destructive)] aria-invalid:focus-visible:outline-[color:var(--neu-error-text)]",
          listbox ? "min-h-24 px-4 py-2" : "h-10 py-2 ps-4 pe-10",
          className,
        )}
        {...props}
      >{children}</select>
      {!listbox && <svg data-slot="select-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-[var(--muted-foreground)] peer-disabled:opacity-60"><path d="m6 9 6 6 6-6" /></svg>}
    </span>
  );
}
function SelectGroup(props: React.ComponentProps<"optgroup">) { return <optgroup data-slot="select-group" {...props} />; }
function SelectItem(props: React.ComponentProps<"option">) { return <option data-slot="select-item" {...props} />; }
const SelectOption = SelectItem;
export { Select, SelectGroup, SelectItem, SelectOption };
