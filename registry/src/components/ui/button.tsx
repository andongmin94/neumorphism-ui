import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = {
  default:
    "border-[color:var(--neu-edge)] bg-[var(--neu-surface)] [background-image:var(--neu-fill-raised)] active:[background-image:none] text-[var(--foreground)] [box-shadow:var(--neu-shadow-raised-sm)] hover:[box-shadow:var(--neu-shadow-hover)] active:[box-shadow:var(--neu-shadow-inset)]",
  primary:
    "border-transparent bg-[var(--primary)] [background-image:var(--neu-fill-primary)] active:[background-image:none] text-[var(--primary-foreground)] [box-shadow:var(--neu-shadow-primary)] hover:[box-shadow:var(--neu-shadow-hover)] active:[box-shadow:var(--neu-shadow-primary-inset)]",
  soft:
    "border-[color:var(--neu-edge)] bg-[var(--neu-surface-soft)] text-[var(--foreground)] [box-shadow:var(--neu-shadow-raised-sm)] active:[box-shadow:var(--neu-shadow-inset)]",
  ghost:
    "border-transparent bg-transparent text-[var(--foreground)] shadow-none hover:bg-[var(--neu-surface-soft)] active:bg-[var(--neu-surface-low)] active:[box-shadow:var(--neu-shadow-inset)]",
  destructive:
    "border-transparent bg-[var(--destructive)] text-[var(--destructive-foreground)] [box-shadow:var(--neu-shadow-raised-sm)] hover:[box-shadow:var(--neu-shadow-hover)] active:[box-shadow:var(--neu-shadow-destructive-inset)]",
} as const;

const buttonSizes = {
  sm: "h-8 px-3 text-xs",
  default: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-base",
  icon: "size-10 p-0",
} as const;

type ButtonVariant = keyof typeof buttonVariants;
type ButtonSize = keyof typeof buttonSizes;

export interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

function Button({
  className,
  variant = "default",
  size = "default",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--neu-radius-control)] border font-semibold outline-none transition-[box-shadow,filter,background-color,color] duration-[var(--neu-duration)] motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      {...props}
    />
  );
}

export { Button, buttonSizes, buttonVariants };
