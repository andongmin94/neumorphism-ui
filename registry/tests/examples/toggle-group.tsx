"use client";

import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
export default function Example() {
  const text = {"open":"Notification settings","title":"Tune your notifications","body":"Keep your focus with only the updates that matter.","close":"Close","discard":"Delete draft","confirm":"Delete this draft?","warning":"This cannot be undone. Confirm explicitly to continue.","cancel":"Go back","done":"Draft deleted.","profile":"Preview profile","person":"Product designer · Seoul","details":"Advanced settings","detailBody":"Reveal optional settings without changing the defaults.","pin":"Pin","locked":"Locked","align":"Alignment","left":"Left","center":"Center","right":"Right","tools":"Document tools","undo":"Undo","redo":"Redo","save":"Save changes","saved":"Local example saved.","name":"Display name","hint":"Enter the name shown on your profile.","required":"Enter a name.","settings":"Profile settings","quantity":"Seats","increase":"Increase seats","decrease":"Decrease seats","storage":"Storage used","city":"Search cities","empty":"No matching cities.","reset":"Reset","editing":"Unsaved changes","quiet":"Saved state"};
  const [alignment, setAlignment] = React.useState<string[]>(["left"]);
  return (<div className="grid gap-3"><ToggleGroup aria-label={"Alignment"} value={alignment} onValueChange={setAlignment}><ToggleGroupItem value="left">{"Left"}</ToggleGroupItem><ToggleGroupItem value="center">{"Center"}</ToggleGroupItem><ToggleGroupItem value="right">{"Right"}</ToggleGroupItem></ToggleGroup><output className="text-sm text-[var(--muted-foreground)]">{alignment.map(value => text[value as "left" | "center" | "right"]).join(", ")}</output></div>);
}
