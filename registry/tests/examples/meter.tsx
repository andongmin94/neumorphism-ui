"use client";

import { Meter, MeterLabel, MeterValue, MeterTrack, MeterIndicator } from "@/components/ui/meter";
export default function Example() {

  return (<Meter value={64} className="w-full max-w-sm"><div className="flex justify-between gap-4"><MeterLabel>{"Storage used"}</MeterLabel><MeterValue /></div><MeterTrack><MeterIndicator /></MeterTrack><p className="text-xs text-[var(--muted-foreground)]">64 GB / 100 GB</p></Meter>);
}
