import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  Sidebar, SidebarContent, SidebarHeader, SidebarInset,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuLink,
  SidebarProvider, SidebarTrigger,
} from "../../src/registry/components/ui/sidebar";
import { buildThemeVariables, defaultThemeSettings } from "../../src/registry/theme";
import "./styles.css";

const parameters = new URLSearchParams(location.search);
const mode = parameters.get("mode") === "dark" ? "dark" : "light";
document.documentElement.classList.toggle("dark", mode === "dark");
for (const [name, value] of Object.entries(buildThemeVariables(defaultThemeSettings, mode))) {
  document.documentElement.style.setProperty(name, value);
}
const collapsible = parameters.get("collapsible") === "icon" ? "icon"
  : parameters.get("collapsible") === "none" ? "none" : "offcanvas";

function Workspace({ name }: { name: string }) {
  const [open, setOpen] = React.useState(!parameters.has("closed"));
  const [activations, setActivations] = React.useState(0);
  const [refTag, setRefTag] = React.useState("");
  const panelRef = React.useCallback((node: HTMLElement | null) => {
    if (node) setRefTag(node.tagName);
  }, []);
  return <section aria-label={`${name} workspace`}>
    <button type="button" onClick={() => setOpen(false)}>Close {name} externally</button>
    <SidebarProvider defaultOpen={!parameters.has("closed")}
      open={parameters.has("controlled") ? open : undefined}
      onOpenChange={setOpen} className="min-h-64">
      <SidebarTrigger label={`${name} toggle`} />
      <Sidebar collapsible={collapsible} data-testid={`${name}-sidebar`}
        ref={panelRef} inert={parameters.has("callerInert")}
        mobileTitle={`${name} navigation`}>
        <SidebarHeader>{name} workspace</SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem><SidebarMenuButton onClick={() => setActivations(value => value + 1)}>{name} action</SidebarMenuButton></SidebarMenuItem>
            <SidebarMenuItem><SidebarMenuLink href={`#${name.toLowerCase()}`}>{name} destination</SidebarMenuLink></SidebarMenuItem>
          </SidebarMenu>
          <input aria-label={`${name} draft`} />
          <SidebarTrigger label={`${name} inside toggle`} />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <button type="button">{name} after</button>
        <input aria-label={`${name} outside input`} />
      </SidebarInset>
    </SidebarProvider>
    <output data-testid={`${name}-activations`}>{activations}</output>
    <output data-testid={`${name}-ref`}>{refTag}</output>
  </section>;
}
createRoot(document.getElementById("root")!).render(<React.StrictMode>
  <Workspace name="Primary" />
  {parameters.has("two") && <Workspace name="Secondary" />}
</React.StrictMode>);
