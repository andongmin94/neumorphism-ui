"use client";

import { Toggle } from "@/components/ui/toggle";
export default function Example() {

  return (<div className="flex flex-wrap gap-3"><Toggle aria-label={"Pin"}><span aria-hidden="true">◆</span>{"Pin"}</Toggle><Toggle defaultPressed>{"Pin"}</Toggle><Toggle disabled>{"Locked"}</Toggle></div>);
}
