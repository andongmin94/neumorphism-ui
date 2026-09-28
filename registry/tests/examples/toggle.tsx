"use client";

import { Toggle } from "@/components/ui/toggle";
export default function Example() {

  return (<div className="flex flex-wrap gap-3"><Toggle aria-label={"Pin"}><svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3l5 5-4 1-4 4-1 4-5-5 4-1 4-4Z" /><path d="m7 17-4 4" /></svg>{"Pin"}</Toggle><Toggle defaultPressed>{"Pin"}</Toggle><Toggle disabled>{"Locked"}</Toggle></div>);
}
