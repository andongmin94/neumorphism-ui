"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
export default function Example() {
  return <Carousel aria-label="Feature tour" className="w-full max-w-md px-12">
    <CarouselContent>
      {["Dashboard", "Settings", "Analytics"].map((item) => <CarouselItem key={item}><div className="grid h-40 place-items-center rounded-[var(--neu-radius-surface)] border border-[var(--neu-edge)] bg-[var(--neu-surface)] [box-shadow:var(--neu-shadow-raised-sm)]">{item}</div></CarouselItem>)}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>;
}
