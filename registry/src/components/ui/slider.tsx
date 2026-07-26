"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { mergeClassName } from "@/lib/utils";

type SliderProps = SliderPrimitive.Root.Props & {
  /**
   * Accessible names applied to the thumb inputs in value order.
   * Provide one label for a single-value slider and one per thumb for a range.
   */
  thumbLabels?: readonly string[];
};

function Slider({
  className,
  defaultValue,
  min = 0,
  max = 100,
  orientation = "horizontal",
  thumbLabels,
  value,
  ...props
}: SliderProps) {
  const values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : typeof value === "number"
          ? [value]
          : Array.isArray(defaultValue)
            ? defaultValue
            : typeof defaultValue === "number"
              ? [defaultValue]
              : [min],
    [defaultValue, min, value],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      orientation={orientation}
      thumbAlignment="edge"
      className={mergeClassName<SliderPrimitive.Root.State>(
        "relative flex w-full touch-none items-center select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Control
        data-slot="slider-control"
        className="relative flex grow touch-none items-center select-none data-[orientation=horizontal]:h-5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-5 data-[orientation=vertical]:justify-center"
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative grow overflow-hidden rounded-[var(--neu-radius-control)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface-low)] [box-shadow:var(--neu-shadow-inset)] data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2 data-[orientation=vertical]:grow-0"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="bg-[var(--primary)] [box-shadow:inset_0_1px_rgb(255_255_255_/_0.24)] data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          />
        </SliderPrimitive.Track>
        {values.map((_, index) => (
          <SliderPrimitive.Thumb
            aria-label={thumbLabels?.[index]}
            data-slot="slider-thumb"
            key={index}
            index={index}
            className="block size-5 shrink-0 rounded-full border border-[color:var(--neu-edge)] bg-[var(--neu-surface-soft)] [box-shadow:var(--neu-shadow-raised-sm)] outline-none transition-[box-shadow] duration-[var(--neu-duration)] active:[box-shadow:var(--neu-shadow-inset)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-3 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
