"use client";

import * as React from "react";
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuLabel, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuShortcut } from "@/components/ui/context-menu";
export default function Example() {
    const text = {
        "tools": "Document tools",
        "undo": "Undo",
        "details": "Advanced settings",
        "quiet": "Saved state"
    };
    const [message, setMessage] = React.useState("");
    const [expanded, setExpanded] = React.useState(false);
    return <div className="grid w-full max-w-sm gap-3"><ContextMenu><ContextMenuTrigger className="grid min-h-32 place-items-center rounded-[var(--neu-radius-surface)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] p-5 text-center text-sm font-medium [box-shadow:var(--neu-shadow-inset)]">{text.tools}</ContextMenuTrigger><ContextMenuContent><ContextMenuLabel>{text.tools}</ContextMenuLabel><ContextMenuItem onClick={() => setMessage(text.undo)}>{text.undo}<ContextMenuShortcut>⌘Z</ContextMenuShortcut></ContextMenuItem><ContextMenuCheckboxItem checked={expanded} onCheckedChange={setExpanded}>{text.details}</ContextMenuCheckboxItem></ContextMenuContent></ContextMenu><p role="status" className="text-sm text-[var(--muted-foreground)]">{message || text.quiet}</p></div>;
}
