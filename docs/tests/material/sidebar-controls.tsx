import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader,
  SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuLink,
  SidebarProvider, SidebarTrigger, useSidebar,
} from "../../src/registry/components/ui/sidebar";
import { buildThemeVariables, defaultThemeSettings } from "../../src/registry/theme";
import "./styles.css";

const parameters = new URLSearchParams(location.search);
const mode = parameters.get("mode") === "dark" ? "dark" : "light";
document.documentElement.classList.toggle("dark", mode === "dark");
for (const [name, value] of Object.entries(buildThemeVariables(defaultThemeSettings, mode))) {
  document.documentElement.style.setProperty(name, value);
}
const collapseMode = parameters.get("collapsible") === "none" ? "none" : "icon";

function Controls() {
  const { open, openMobile, isMobile } = useSidebar();
  return <SidebarInset className="grid content-start gap-4 p-5">
    <SidebarTrigger />
    <output aria-label="Desktop open">{String(open)}</output>
    <output aria-label="Current sidebar open">{String(isMobile ? openMobile : open)}</output>
    <button type="button">Shortcut target</button>
    <button type="button" onKeyDown={event => event.preventDefault()}>Owned shortcut</button>
    <input aria-label="Editor input" />
    <textarea aria-label="Editor notes" />
    <select aria-label="Editor choice"><option>One</option><option>Two</option></select>
    <div contentEditable suppressContentEditableWarning role="textbox" aria-label="Rich editor"><span>Editable text</span></div>
  </SidebarInset>;
}

function Fixture() {
  const [tagName, setTagName] = React.useState("");
  return <main className="p-4">
    <h1>Sidebar regressions</h1>
    <SidebarProvider defaultOpen={!parameters.has("closed")} className="min-h-96"
      style={parameters.has("providerWidth") ? { "--sidebar-width-mobile": "22rem" } as React.CSSProperties : undefined}>
      <Sidebar collapsible={collapseMode}
        side={parameters.get("side") === "right" ? "right" : "left"}
        id="consumer-sidebar" data-testid="consumer-sidebar"
        mobileTitle="Workspace navigation"
        mobileDescription="Choose a workspace destination"
        ref={node => { if (node) setTagName(node.tagName); }}
        style={{ fontWeight: 600, ...(parameters.has("customWidth") ? { "--sidebar-width-mobile": "20rem" } : {}) } as React.CSSProperties}>
        <SidebarHeader>Workspace</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem><SidebarMenuButton tooltip="Overview"><svg aria-hidden="true" viewBox="0 0 24 24" className="size-4"><path d="M4 4h16v16H4z" /></svg><span>Overview</span></SidebarMenuButton></SidebarMenuItem>
              <SidebarMenuItem><SidebarMenuLink href="#settings" tooltip="Settings"><svg aria-hidden="true" viewBox="0 0 24 24" className="size-4"><path d="M4 4h16v16H4z" /></svg><span>Settings</span></SidebarMenuLink></SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <Controls />
    </SidebarProvider>
    <output aria-label="Sidebar ref tag">{tagName}</output>
  </main>;
}
createRoot(document.getElementById("root")!).render(<Fixture />);
