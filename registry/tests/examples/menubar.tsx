"use client";
import * as React from "react";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarCheckboxItem } from "@/components/ui/menubar";
export default function Example() {
  const [visible, setVisible] = React.useState(true);
  const [message, setMessage] = React.useState("Ready");
  return <div><Menubar aria-label="File"><MenubarMenu><MenubarTrigger>File</MenubarTrigger><MenubarContent><MenubarItem onClick={() => setMessage("Document created")}>New document</MenubarItem></MenubarContent></MenubarMenu><MenubarMenu><MenubarTrigger>View</MenubarTrigger><MenubarContent><MenubarCheckboxItem checked={visible} onCheckedChange={setVisible}>Show status</MenubarCheckboxItem></MenubarContent></MenubarMenu></Menubar>{visible && <p role="status">{message}</p>}</div>;
}
