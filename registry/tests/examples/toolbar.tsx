"use client";

import * as React from "react";
import { Toolbar, ToolbarGroup, ToolbarButton, ToolbarSeparator } from "@/components/ui/toolbar";
export default function Example() {
  const [message, setMessage] = React.useState("");
  return (<div className="grid gap-3"><Toolbar aria-label={"Document tools"}><ToolbarGroup><ToolbarButton onClick={() => setMessage("Undo")}>{"Undo"}</ToolbarButton><ToolbarButton disabled>{"Redo"}</ToolbarButton></ToolbarGroup><ToolbarSeparator /><ToolbarButton onClick={() => setMessage("Local example saved.")}>{"Save changes"}</ToolbarButton></Toolbar><p role="status" className="text-sm text-[var(--muted-foreground)]">{message}</p></div>);
}
