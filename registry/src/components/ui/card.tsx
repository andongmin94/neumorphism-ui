import * as React from "react";

import { cn } from "@/registry/src/lib/utils";

const cardVariants = {
  raised: "bg-[var(--neu-surface)] [box-shadow:var(--neu-shadow-raised)]",
  soft: "bg-[var(--neu-surface-soft)] [box-shadow:var(--neu-shadow-raised-sm)]",
  inset: "bg-[var(--neu-surface)] [box-shadow:var(--neu-shadow-inset)]",
  flat: "border border-[color:var(--border)] bg-[var(--neu-surface)]",
} as const;

type CardVariant = keyof typeof cardVariants;

interface CardProps extends React.ComponentProps<"div"> {
  variant?: CardVariant;
}

function Card({ className, variant = "raised", ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      data-variant={variant}
      className={cn(
        "flex flex-col gap-5 rounded-[var(--neu-radius-surface)] border border-transparent py-6 text-[var(--card-foreground)] transition-[transform,box-shadow] duration-[var(--neu-duration)]",
        cardVariants[variant],
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "grid auto-rows-min gap-1.5 px-6 has-[>[data-slot=card-action]]:grid-cols-[1fr_auto]",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm leading-relaxed text-[var(--muted-foreground)]", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-6", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cardVariants,
};
