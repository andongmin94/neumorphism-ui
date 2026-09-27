import * as React from "react";
import { createRoot } from "react-dom/client";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarBadge } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination";
import { buildThemeVariables, defaultThemeSettings, getThemePreset, type ThemePresetId } from "../../src/registry/theme";
import "./styles.css";

function Symbol({ className }: { className?: string }) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>;
}
function Controls() {
  const query = new URLSearchParams(location.search);
  const mode = query.get("mode") === "dark" ? "dark" : "light";
  const preset = getThemePreset((query.get("preset") ?? "air") as ThemePresetId);
  const [selected, setSelected] = React.useState(["left"]);
  const [page, setPage] = React.useState(2);
  React.useLayoutEffect(() => {
    for (const [name, value] of Object.entries(buildThemeVariables({ ...defaultThemeSettings, ...preset.defaults, presetId: preset.id }, mode))) document.documentElement.style.setProperty(name, value);
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode, preset]);
  return <main className="mx-auto max-w-4xl px-5 py-10">
    <header className="mb-8"><p className="mb-2 text-xs text-[var(--muted-foreground)]">SOURCE COMPONENTS / DETAIL REVIEW</p><h1 className="text-3xl font-semibold tracking-tight">Small controls. Consistent anatomy.</h1></header>
    <div className="grid min-w-0 gap-8 sm:grid-cols-2">
      <section data-testid="icons" className="grid content-start gap-5"><h2 className="text-base font-semibold">Icon and type scale</h2>
        <div className="flex flex-wrap items-center gap-3">{(["sm", "default", "lg"] as const).map(size => <Button key={size} size={size} data-testid={`button-${size}`}><Symbol />Add item</Button>)}</div>
        <div className="flex flex-wrap items-center gap-3">{(["sm", "default", "lg"] as const).map(size => <Toggle key={size} size={size} data-testid={`toggle-${size}`}><Symbol />Pin item</Toggle>)}</div>
        <div className="flex items-center gap-3"><Button data-testid="explicit-icon"><Symbol className="size-6" />Custom icon</Button><Button size="icon" aria-label="Add"><Symbol /></Button></div>
      </section>
      <section data-testid="avatars" className="grid content-start gap-5"><h2 className="text-base font-semibold">People, not floating initials</h2>
        {(["sm", "default", "lg"] as const).map(size => <div key={size} className="flex items-center justify-between gap-3"><span className="text-sm">{size}</span><AvatarGroup data-testid={`avatars-${size}`}>{["AN", "DE", "SO"].map((initials, index) => <Avatar key={initials} size={size}><AvatarFallback>{initials}</AvatarFallback>{index === 0 && <AvatarBadge aria-label="Online" />}</Avatar>)}<AvatarGroupCount>+9</AvatarGroupCount></AvatarGroup></div>)}
      </section>
      <section data-testid="segments" className="grid content-start gap-5"><h2 className="text-base font-semibold">A selected plate in one tray</h2>
        <ToggleGroup value={selected} onValueChange={setSelected} aria-label="Alignment"><ToggleGroupItem value="left">Left</ToggleGroupItem><ToggleGroupItem value="center">Center</ToggleGroupItem><ToggleGroupItem value="right">Right</ToggleGroupItem><ToggleGroupItem value="locked" disabled>Locked</ToggleGroupItem></ToggleGroup>
        <output className="text-sm text-[var(--muted-foreground)]">{selected.join(", ") || "No selection"}</output>
        <label className="grid gap-3 text-sm font-medium">Volume<Slider defaultValue={[64]} thumbLabels={["Volume"]} /></label>
      </section>
      <section data-testid="badges" className="grid content-start gap-5"><h2 className="text-base font-semibold">Labels stay inside the surface</h2>
        <div className="flex flex-wrap items-center gap-2"><Badge>Default</Badge><Badge variant="primary">Selected</Badge><Badge variant="destructive">Action needed</Badge></div>
        <div className="w-44 max-w-full border-l border-[var(--border)] pl-3"><Badge data-testid="long-badge"><Symbol />WaitingForWorkspaceAdministratorApproval</Badge></div>
        <Badge className="max-w-52" variant="soft">관리자의 검토와 승인을 기다리고 있습니다</Badge>
      </section>
    </div>
    <section data-testid="pagination" className="mt-8 border-t border-[var(--border)] pt-7"><h2 className="mb-5 text-base font-semibold">Aligned page controls</h2>
      <Pagination><PaginationContent><PaginationItem><PaginationPrevious href="#pages" onClick={() => setPage(n => Math.max(1, n - 1))} /></PaginationItem>{[1, 2, 3].map(n => <PaginationItem key={n}><PaginationLink href="#pages" isActive={page === n} onClick={() => setPage(n)}>{n}</PaginationLink></PaginationItem>)}<PaginationItem><PaginationEllipsis /></PaginationItem><PaginationItem><PaginationNext href="#pages" onClick={() => setPage(n => Math.min(3, n + 1))} /></PaginationItem></PaginationContent></Pagination>
      <p className="mt-4 text-center text-sm text-[var(--muted-foreground)]" id="pages">Page {page} of 3</p>
    </section>
  </main>;
}
createRoot(document.getElementById("root")!).render(<Controls />);
