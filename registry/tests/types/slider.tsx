import * as React from "react";

import { Slider } from "@/components/ui/slider";

export function SliderValueTypes() {
  const [volume, setVolume] = React.useState(40);
  const [range, setRange] = React.useState<readonly number[]>([20, 80]);

  return (
    <>
      <Slider
        value={volume}
        onValueChange={setVolume}
        onValueCommitted={setVolume}
        thumbLabels={["Volume"]}
      />
      <Slider
        value={range}
        onValueChange={setRange}
        onValueCommitted={setRange}
        thumbLabels={["Minimum", "Maximum"]}
      />
      <Slider
        defaultValue={40}
        onValueChange={setVolume}
        onValueCommitted={setVolume}
        thumbLabels={["Default volume"]}
      />
      <Slider
        defaultValue={[20, 80] as const}
        onValueChange={setRange}
        onValueCommitted={setRange}
        thumbLabels={["Default minimum", "Default maximum"]}
      />
    </>
  );
}
