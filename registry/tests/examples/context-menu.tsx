"use client";
import * as React from "react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
export default function Example() {
  const [details, setDetails] = React.useState(true);
  const [message, setMessage] = React.useState("Ready");
  return <div className="grid gap-3">
    <ContextMenu>
      <ContextMenuTrigger className="grid min-h-32 place-items-center rounded-[var(--neu-radius-surface)] border border-[var(--neu-edge)] bg-[var(--neu-surface)] p-6 [box-shadow:var(--neu-shadow-inset)]">
        Right-click to open the menu
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Document</ContextMenuLabel>
        <ContextMenuItem onClick={() => setMessage("Copied")}>Copy<ContextMenuShortcut>⌘C</ContextMenuShortcut></ContextMenuItem>
        <ContextMenuCheckboxItem checked={details} onCheckedChange={setDetails}>Show details</ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
    <p role="status" className="text-sm text-[var(--muted-foreground)]">{message}</p>
  </div>;
}
