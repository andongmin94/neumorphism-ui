import * as React from "react";

import { cn } from "@/registry/src/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-24 w-full resize-y rounded-[calc(var(--neu-radius-surface)*0.7)] border border-transparent bg-[var(--neu-surface)] px-4 py-3 text-sm text-[var(--foreground)] [box-shadow:var(--neu-shadow-inset)] outline-none transition-[box-shadow,border-color] duration-[var(--neu-duration)] placeholder:text-[var(--muted-foreground)] focus-visible:border-[var(--ring)] focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-[var(--destructive)] aria-invalid:ring-2 aria-invalid:ring-[color:var(--destructive)]/20",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
