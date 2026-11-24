"use client";

import { PreviewCard as Primitive } from "@base-ui/react/preview-card";
import { useDirection } from "@base-ui/react/direction-provider";
import { mergeClassName } from "@/lib/utils";

const HoverCard = Primitive.Root;
const HoverCardTrigger = Primitive.Trigger;

type HoverCardContentProps = Primitive.Popup.Props &
  Pick<Primitive.Positioner.Props, "side" | "align" | "sideOffset" | "alignOffset">;

function HoverCardContent({ className, side = "bottom", align = "center", sideOffset = 10, alignOffset = 0, ...props }: HoverCardContentProps) {
  const direction = useDirection();
  return (
    <Primitive.Portal>
      <Primitive.Positioner dir={direction} side={side} align={align} sideOffset={sideOffset} alignOffset={alignOffset} className="z-50 outline-none">
        <Primitive.Popup dir={direction} data-slot="hover-card-content" className={mergeClassName<Primitive.Popup.State>(
          "grid w-80 min-w-0 max-w-[min(calc(100vw-2rem),var(--available-width))] max-h-[var(--available-height)] gap-3 grid-cols-[minmax(0,1fr)] [overflow-wrap:anywhere] overflow-y-auto rounded-[var(--neu-radius-overlay)] border border-[color:var(--neu-edge)] bg-[var(--popover)] [background-image:var(--neu-fill-raised)] p-5 text-sm leading-relaxed text-[var(--popover-foreground)] [box-shadow:var(--neu-shadow-floating)] outline-none transition-opacity duration-[var(--neu-duration)] motion-reduce:transition-none data-[starting-style]:opacity-0 data-[ending-style]:opacity-0", className,
        )} {...props} />
      </Primitive.Positioner>
    </Primitive.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
export type { HoverCardContentProps };
