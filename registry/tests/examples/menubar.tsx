"use client";

import * as React from "react";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarCheckboxItem } from "@/components/ui/menubar";
export default function Example() {
    const t = {
        "file": "File",
        "create": "New document",
        "archived": "Archive",
        "view": "View",
        "status": "Show status",
        "created": "New document created",
        "ready": "Ready"
    };
    const [showStatus, setShowStatus] = React.useState(true);
    const [created, setCreated] = React.useState(false);
    return <div className="grid w-full gap-4"><Menubar aria-label={t.file}><MenubarMenu><MenubarTrigger>{t.file}</MenubarTrigger><MenubarContent><MenubarItem onClick={() => setCreated(true)}>{t.create}</MenubarItem><MenubarItem disabled>{t.archived}</MenubarItem></MenubarContent></MenubarMenu><MenubarMenu><MenubarTrigger>{t.view}</MenubarTrigger><MenubarContent><MenubarCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>{t.status}</MenubarCheckboxItem></MenubarContent></MenubarMenu></Menubar>{showStatus && <p role="status" className="text-sm text-[var(--muted-foreground)]">{created ? t.created : t.ready}</p>}</div>;
}
