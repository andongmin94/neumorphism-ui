import * as React from "react";

import { cn } from "@/registry/src/lib/utils";

function ScrollArea({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="scroll-area"
      className={cn(
        "relative overflow-auto rounded-[var(--neu-radius-surface)] [scrollbar-color:var(--muted-foreground)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--muted-foreground)]/45 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:size-2",
        className,
      )}
      {...props}
    />
  );
}

function ScrollBar({
  orientation = "vertical",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      aria-hidden="true"
      data-slot="scroll-bar"
      data-orientation={orientation}
      className={cn("hidden", className)}
      {...props}
    />
  );
}

export { ScrollArea, ScrollBar };
