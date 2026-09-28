import * as React from "react";
import { createRoot } from "react-dom/client";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ImageCard } from "@/components/ui/image-card";
import { InputGroup, InputGroupInput, InputGroupTextarea, InputGroupButton } from "@/components/ui/input-group";
import { Marquee } from "@/components/ui/marquee";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Switch } from "@/components/ui/switch";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { ToastProvider, Toaster, useToast } from "@/components/ui/toast";
import { buildThemeVariables, defaultThemeSettings, getThemePreset, type ThemePresetId } from "../../src/registry/theme";
import "./styles.css";

const cover = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 3"><rect width="4" height="3" fill="#b8cdf2"/></svg>');
function ToastExample() {
  const manager = useToast();
  return <><Button onClick={() => manager.add({ title: "Saved", description: "Source-owned notification", type: "success" })}>Show notification</Button><Toaster /></>;
}
function MicroFinish() {
  const query = new URLSearchParams(location.search);
  const mode = query.get("mode") === "dark" ? "dark" : "light";
  const preset = getThemePreset((query.get("preset") ?? "air") as ThemePresetId);
  const [page, setPage] = React.useState(2);
  const [sent, setSent] = React.useState("");
  React.useLayoutEffect(() => {
    for (const [key, value] of Object.entries(buildThemeVariables({ ...defaultThemeSettings, ...preset.defaults, presetId: preset.id }, mode))) document.documentElement.style.setProperty(key, value);
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode, preset]);
  const navigate = (value: number) => (event: React.MouseEvent) => { event.preventDefault(); setPage(value); };
  return <main className="mx-auto max-w-4xl px-5 py-8">
    <h1 className="mb-8 text-2xl font-semibold">Micro design finish</h1>
    <div className="grid min-w-0 gap-8 md:grid-cols-2">
      <section data-testid="pagination-case" className="min-w-0 space-y-3"><h2>Navigation targets</h2>
        <Pagination><PaginationContent>
          <PaginationItem><PaginationPrevious href="#previous" onClick={navigate(page - 1)} /></PaginationItem>
          {[1, 2, 3].map(value => <PaginationItem key={value}><PaginationLink href={`#${value}`} isActive={page === value} onClick={navigate(value)}>{value}</PaginationLink></PaginationItem>)}
          <PaginationItem><PaginationEllipsis /></PaginationItem>
          <PaginationItem><PaginationNext href="#next" onClick={navigate(page + 1)} /></PaginationItem>
        </PaginationContent></Pagination>
      </section>
      <section data-testid="marquee-case" className="min-w-0 space-y-3"><h2>Complete motion alternative</h2><Marquee items={["Accessibility", "Base UI", "React 19", "Tailwind 4"]} /></section>
      <section data-testid="resizable-case" className="min-w-0 space-y-3"><h2>Panel height and orientation</h2>
        <div data-testid="horizontal-host" className="h-40 w-full"><ResizablePanelGroup orientation="horizontal"><ResizablePanel defaultSize="40%" minSize="25%"><div className="grid h-full place-items-center p-4">List</div></ResizablePanel><ResizableHandle withHandle /><ResizablePanel defaultSize="60%" minSize="30%"><div className="grid h-full place-items-center p-4">Details</div></ResizablePanel></ResizablePanelGroup></div>
        <div data-testid="vertical-host" className="h-48 w-full"><ResizablePanelGroup orientation="vertical"><ResizablePanel defaultSize="40%" minSize="25%"><div className="grid h-full place-items-center p-2">Preview</div></ResizablePanel><ResizableHandle withHandle /><ResizablePanel defaultSize="60%" minSize="30%"><div className="grid h-full place-items-center p-2">Editor</div></ResizablePanel></ResizablePanelGroup></div>
      </section>
      <section data-testid="breadcrumb-case" className="min-w-0 space-y-3"><h2>Atomic path wrapping</h2><Breadcrumb><BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="#components">Components</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbLink href="#navigation">Navigation</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbPage>LongCurrentPageNameWithoutAnySpaces</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList></Breadcrumb></section>
      <section data-testid="input-group-case" className="min-w-0 space-y-3"><h2>Multiline input anatomy</h2><InputGroup><InputGroupInput aria-label="Search" placeholder="Search" /><InputGroupButton>Find</InputGroupButton></InputGroup>
        <form onSubmit={event => { event.preventDefault(); const data = new FormData(event.currentTarget); setSent(String(data.get("message"))); }}><InputGroup><InputGroupTextarea aria-label="Message" name="message" placeholder="Write a message…" /><InputGroupButton type="submit">Send</InputGroupButton></InputGroup></form><output aria-label="Sent message">{sent}</output>
      </section>
      <section data-testid="switch-case" className="min-w-0 space-y-5"><h2>Readable states</h2><div className="flex flex-wrap items-center gap-6"><Switch aria-label="Off" /><Switch aria-label="On" defaultChecked /><Switch aria-label="Disabled" disabled /></div></section>
      <section data-testid="image-case" className="min-w-0 space-y-3"><h2>One clipping owner</h2><ImageCard src={cover} alt="Full bleed cover" caption="One continuous image and caption" /><ImageCard src={cover} alt="Square cover" imageClassName="aspect-square" /></section>
      <section data-testid="disclosure-case" className="min-w-0 space-y-3"><h2>Consistent disclosures</h2><Accordion><AccordionItem value="details"><AccordionTrigger>Accordion details</AccordionTrigger><AccordionContent>Visible accordion content</AccordionContent></AccordionItem></Accordion><Collapsible><CollapsibleTrigger>Optional details</CollapsibleTrigger><CollapsibleContent><div>Visible collapsible content</div></CollapsibleContent></Collapsible></section>
      <section data-testid="table-case" className="min-w-0 space-y-3"><h2>Scrollable columns</h2><Table containerProps={{ role: "region", "aria-label": "Wide table", tabIndex: 0 }}><TableHeader><TableRow>{["Name", "Price", "Change", "Status"].map(label => <TableHead key={label}>{label}</TableHead>)}</TableRow></TableHeader><TableBody>{[1, 2, 3].map(n => <TableRow key={n}><TableCell className="min-w-40">Record {n}</TableCell><TableCell className="min-w-24">$123.00</TableCell><TableCell className="min-w-24">+12.0%</TableCell><TableCell className="min-w-28">Published</TableCell></TableRow>)}</TableBody></Table>
        <Table containerProps={{ role: "region", "aria-label": "Fitting table" }}><TableBody><TableRow><TableCell>Fits</TableCell></TableRow></TableBody></Table>
      </section>
      <section data-testid="toast-case" className="space-y-3"><h2>Semantic close icon</h2><ToastProvider><ToastExample /></ToastProvider></section>
    </div>
  </main>;
}
createRoot(document.getElementById("root")!).render(<MicroFinish />);
