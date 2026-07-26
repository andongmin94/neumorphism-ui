import * as React from "react";

import { cn } from "@/lib/utils";

function Breadcrumb(props: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({
  className,
  ...props
}: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-2 text-sm text-[var(--muted-foreground)]",
        className,
      )}
      {...props}
    />
  );
}

function BreadcrumbItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-2", className)}
      {...props}
    />
  );
}

function BreadcrumbLink({
  className,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <a
      data-slot="breadcrumb-link"
      className={cn(
        "rounded-md outline-none transition-colors hover:text-[var(--foreground)] focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
        className,
      )}
      {...props}
    />
  );
}

function BreadcrumbPage({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-current="page"
      data-slot="breadcrumb-page"
      className={cn("font-semibold text-[var(--foreground)]", className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      aria-hidden="true"
      role="presentation"
      data-slot="breadcrumb-separator"
      className={cn("select-none text-[var(--muted-foreground)]/70", className)}
      {...props}
    >
      {children ?? <span aria-hidden="true">/</span>}
    </li>
  );
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      data-slot="breadcrumb-ellipsis"
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-full bg-[var(--neu-surface)] [box-shadow:var(--neu-shadow-inset)]",
        className,
      )}
      {...props}
    >
      <span aria-hidden="true">•••</span>
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
