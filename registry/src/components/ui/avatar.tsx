"use client";

import * as React from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";

import { cn, mergeClassName } from "@/lib/utils";

const avatarSizes = {
  sm: "size-8 text-xs",
  default: "size-10 text-sm",
  lg: "size-12 text-base",
} as const;

type AvatarSize = keyof typeof avatarSizes;

interface AvatarProps extends AvatarPrimitive.Root.Props {
  size?: AvatarSize;
}

function Avatar({ className, size = "default", ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={mergeClassName<AvatarPrimitive.Root.State>(
        cn(
          "group/avatar relative flex shrink-0 overflow-hidden rounded-full border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] [box-shadow:var(--neu-shadow-raised-sm)]",
          avatarSizes[size],
        ),
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={mergeClassName<AvatarPrimitive.Image.State>(
        "aspect-square size-full object-cover",
        className,
      )}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={mergeClassName<AvatarPrimitive.Fallback.State>(
        "flex size-full items-center justify-center rounded-full bg-[var(--neu-surface-low)] font-semibold text-[var(--muted-foreground)] [box-shadow:var(--neu-shadow-inset)]",
        className,
      )}
      {...props}
    />
  );
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 size-2.5 rounded-full border-2 border-[var(--background)] bg-[var(--primary)] group-data-[size=lg]/avatar:size-3 group-data-[size=sm]/avatar:size-2",
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-[var(--background)]",
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroupCount({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] text-sm font-semibold text-[var(--muted-foreground)] ring-2 ring-[var(--background)] [box-shadow:var(--neu-shadow-raised-sm)] group-has-data-[size=lg]/avatar-group:size-12 group-has-data-[size=sm]/avatar-group:size-8",
        className,
      )}
      {...props}
    />
  );
}

export {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  avatarSizes,
};
