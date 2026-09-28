import * as React from "react";
import { createRoot } from "react-dom/client";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupTextarea } from "@/components/ui/input-group";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { buildThemeVariables, defaultThemeSettings } from "../../src/registry/theme";
import "./styles.css";

const longLabel = "변경 사항을 확인한 후 모든 작업 공간에 적용 ApplyToEveryWorkspaceWithoutLosingUnsavedChanges";
function CustomIcon() {
  return <svg aria-hidden="true" className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 6h16M4 12h16M4 18h16" /></svg>;
}
function SidebarActions() {
  const [calls, setCalls] = React.useState(0);
  const { isMobile } = useSidebar();
  return <div className="flex flex-wrap items-center gap-3" data-mobile={isMobile}>
    <SidebarTrigger label="Toggle with callback" onClick={() => setCalls(value => value + 1)} />
    <SidebarTrigger label="Prevent toggle" onClick={event => { event.preventDefault(); setCalls(value => value + 1); }} />
    <SidebarTrigger label="Custom sidebar icon"><CustomIcon /></SidebarTrigger>
    <output aria-label="Sidebar callback count">{calls}</output>
  </div>;
}
function MicroCompletion() {
  const mode = new URLSearchParams(location.search).get("mode") === "dark" ? "dark" : "light";
  const [sent, setSent] = React.useState(false);
  React.useLayoutEffect(() => {
    for (const [key, value] of Object.entries(buildThemeVariables(defaultThemeSettings, mode))) document.documentElement.style.setProperty(key, value);
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);
  return <main className="mx-auto max-w-3xl space-y-8 px-5 py-8">
    <h1 className="text-2xl font-semibold">Micro completion</h1>
    <section data-testid="sidebar-actions" className="space-y-3"><h2>Caller-owned sidebar controls</h2><SidebarProvider><SidebarActions /></SidebarProvider></section>
    <section data-testid="sheet-case" className="space-y-3"><h2>Sheet close geometry</h2><Sheet><SheetTrigger render={<Button />}>Open review sheet</SheetTrigger><SheetContent closeLabel="Close review sheet"><SheetTitle>Review changes</SheetTitle><SheetDescription>Keep the title, content and close action separate.</SheetDescription></SheetContent></Sheet></section>
    <section data-testid="long-action" className="space-y-3"><h2>Localized multiline actions</h2><form onSubmit={event => { event.preventDefault(); setSent(true); }}><InputGroup><InputGroupTextarea aria-label="Review message" defaultValue="긴 설명과 적용 작업은 동일한 입력 면 안에서 겹치지 않습니다." /><InputGroupButton type="submit">{longLabel}</InputGroupButton></InputGroup></form><output aria-label="Applied changes">{sent ? "Applied" : "Pending"}</output></section>
    <section data-testid="normal-input" className="space-y-3"><h2>Unchanged compact action</h2><InputGroup><InputGroupInput aria-label="Search items" /><InputGroupButton>Find</InputGroupButton></InputGroup></section>
    <section data-testid="custom-icons" className="space-y-3"><h2>Caller-owned icon size</h2><InputGroup><InputGroupAddon><CustomIcon /></InputGroupAddon><InputGroupInput aria-label="Icon sizing" /><InputGroupButton aria-label="Custom input action"><CustomIcon /></InputGroupButton></InputGroup></section>
  </main>;
}
createRoot(document.getElementById("root")!).render(<MicroCompletion />);
