import * as React from "react";

import { cn } from "../../lib/utils";

const buttonVariants = {
  default:
    "border-[color:var(--neu-edge)] bg-[var(--neu-surface)] text-[var(--foreground)] [box-shadow:var(--neu-shadow-raised-sm)] hover:-translate-y-0.5 hover:[box-shadow:var(--neu-shadow-raised)]",
  primary:
    "border-transparent bg-[var(--primary)] text-[var(--primary-foreground)] [box-shadow:var(--neu-shadow-primary)] hover:brightness-105",
  soft: "border-[color:var(--neu-edge)] bg-[var(--neu-surface-soft)] text-[var(--foreground)] [box-shadow:var(--neu-shadow-raised-sm)] hover:-translate-y-0.5",
  ghost:
    "border-transparent bg-transparent text-[var(--foreground)] shadow-none hover:bg-[var(--neu-surface-soft)]",
  destructive:
    "border-transparent bg-[var(--destructive)] text-white [box-shadow:var(--neu-shadow-raised-sm)] hover:brightness-105",
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
        "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--neu-radius-control)] border font-semibold outline-none transition-[transform,box-shadow,filter,background-color,color] duration-[var(--neu-duration)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] active:translate-y-px active:[box-shadow:var(--neu-shadow-inset)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      {...props}
    />
  );
}

export { Button, buttonSizes, buttonVariants };
