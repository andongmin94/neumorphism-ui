import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = {
  default:
    "border-[color:var(--neu-edge)] bg-[var(--neu-surface)] text-[var(--foreground)] shadow-none",
  primary:
    "border-transparent bg-[var(--primary)] text-[var(--primary-foreground)] shadow-none",
  soft: "border-transparent bg-[var(--neu-surface-low)] text-[var(--muted-foreground)]",
  outline: "border-[color:var(--border)] bg-transparent text-[var(--foreground)]",
  destructive:
    "border-transparent bg-[color:var(--destructive)]/12 text-[var(--destructive)]",
} as const;

type BadgeVariant = keyof typeof badgeVariants;

interface BadgeProps extends React.ComponentProps<"span"> {
  variant?: BadgeVariant;
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      className={cn(
        "inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-[var(--neu-radius-control)] border px-2.5 py-1 text-xs font-semibold leading-none [&_svg]:pointer-events-none [&_svg]:size-3",
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
