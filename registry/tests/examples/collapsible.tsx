"use client";

import * as React from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
export default function Example() {
  const [expanded, setExpanded] = React.useState(false);
  return (<Collapsible open={expanded} onOpenChange={setExpanded}><CollapsibleTrigger>{"Advanced settings"}<span aria-hidden="true">{expanded ? "−" : "+"}</span></CollapsibleTrigger><CollapsibleContent><div>{"Reveal optional settings without changing the defaults."}</div></CollapsibleContent></Collapsible>);
}
