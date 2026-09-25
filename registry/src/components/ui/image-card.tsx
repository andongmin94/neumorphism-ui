import * as React from "react";

import { cn } from "@/lib/utils";

interface ImageCardProps extends React.ComponentProps<"figure"> {
  src: string;
  alt: string;
  caption?: React.ReactNode;
  imageClassName?: string;
}

function ImageCard({
  src,
  alt,
  caption,
  imageClassName,
  className,
  ...props
}: ImageCardProps) {
  return (
    <figure
      data-slot="image-card"
      className={cn(
        "w-full max-w-sm overflow-hidden rounded-[var(--neu-radius-surface)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] text-[var(--foreground)] [box-shadow:var(--neu-shadow-raised)]",
        className,
      )}
      {...props}
    >
      <img
        data-slot="image-card-image"
        src={src}
        alt={alt}
        className={cn("aspect-[4/3] w-full object-cover", imageClassName)}
      />
      {caption !== undefined ? (
        <figcaption
          data-slot="image-card-caption"
          className="border-t border-[var(--border)] bg-[var(--neu-surface-soft)] px-4 py-3 text-sm leading-relaxed"
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export { ImageCard };
export type { ImageCardProps };
