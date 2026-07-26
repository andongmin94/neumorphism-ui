import * as React from "react";

import { cn } from "@/registry/src/lib/utils";

function Pagination({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

function PaginationItem(props: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = React.ComponentProps<"a"> & {
  isActive?: boolean;
};

function PaginationLink({
  className,
  isActive = false,
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive || undefined}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border text-sm font-semibold outline-none transition-[transform,box-shadow,color,background-color] focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
        isActive
          ? "border-transparent bg-[var(--primary)] text-[var(--primary-foreground)] [box-shadow:var(--neu-shadow-primary)]"
          : "border-[color:var(--neu-edge)] bg-[var(--neu-surface)] text-[var(--foreground)] [box-shadow:var(--neu-shadow-raised-sm)] hover:-translate-y-0.5",
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  children,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn("w-auto gap-2 px-4", className)}
      {...props}
    >
      <span aria-hidden="true">←</span>
      {children ?? "Previous"}
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  children,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn("w-auto gap-2 px-4", className)}
      {...props}
    >
      {children ?? "Next"}
      <span aria-hidden="true">→</span>
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      data-slot="pagination-ellipsis"
      className={cn(
        "inline-flex size-10 items-center justify-center text-sm text-[var(--muted-foreground)]",
        className,
      )}
      {...props}
    >
      <span aria-hidden="true">•••</span>
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
