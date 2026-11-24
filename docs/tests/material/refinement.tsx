import * as React from "react";
import { createRoot } from "react-dom/client";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent, PopoverTitle, PopoverDescription, PopoverClose } from "@/components/ui/popover";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuViewport } from "@/components/ui/navigation-menu";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { ToastProvider, Toaster, useToast } from "@/components/ui/toast";
import { Calendar } from "@/components/ui/calendar";
import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem } from "@/components/ui/combobox";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuCheckboxItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuGroup, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent, ContextMenuItem } from "@/components/ui/context-menu";
import { buildThemeVariables, defaultThemeSettings, getThemePreset, type ThemePresetId } from "../../src/registry/theme";
import "./styles.css";

function ScopedToast() {
  const manager = useToast();
  return <><Button data-testid="overlay-trigger" onClick={() => manager.add({ title: "Scoped notification", description: "Notification content follows its region." })}>Show notification</Button><Toaster label="Scoped notifications" /></>;
}

function OverlayDirections({ dir, kind }: { dir: "ltr" | "rtl"; kind: string }) {
  const [action, setAction] = React.useState("none");
  return <DirectionProvider direction={dir}><main dir={dir} className="mx-auto grid max-w-3xl justify-items-center gap-10 px-8 py-40">
    <h1>Portaled direction</h1>
    {kind === "popover" && <Popover><PopoverTrigger data-testid="overlay-trigger" render={<Button className="w-40" />}>Open popover</PopoverTrigger><PopoverContent data-testid="overlay-popup" align="start" sideOffset={({ anchor }) => anchor.width / 10} alignOffset={({ anchor }) => anchor.width / 20}><PopoverTitle>Popover direction</PopoverTitle><PopoverDescription>Content follows its local region.</PopoverDescription><PopoverClose render={<Button />}>Dismiss popover</PopoverClose></PopoverContent></Popover>}
    {kind === "hover-card" && <HoverCard><HoverCardTrigger data-testid="overlay-trigger" href="#overlay-destination" delay={0} className="inline-flex w-40 justify-center p-3">Preview region</HoverCardTrigger><HoverCardContent data-testid="overlay-popup" align="start" sideOffset={({ anchor }) => anchor.width / 10} alignOffset={({ anchor }) => anchor.width / 20}><strong>Hover card direction</strong><p>Content follows its local region.</p></HoverCardContent></HoverCard>}
    {kind === "tooltip" && <TooltipProvider delay={0}><Tooltip><TooltipTrigger data-testid="overlay-trigger" render={<Button className="w-40" />}>Show tooltip</TooltipTrigger><TooltipContent data-testid="overlay-popup" align="start" side="bottom">Content follows its local region.</TooltipContent></Tooltip></TooltipProvider>}
    {kind === "navigation-menu" && <NavigationMenu aria-label="Scoped navigation"><NavigationMenuList><NavigationMenuItem><NavigationMenuTrigger data-testid="overlay-trigger" className="w-40">Open destinations</NavigationMenuTrigger><NavigationMenuContent><NavigationMenuLink href="#overlay-destination" onClick={() => setAction("navigated")}>Visit destination</NavigationMenuLink></NavigationMenuContent></NavigationMenuItem></NavigationMenuList><NavigationMenuViewport data-testid="overlay-popup" /></NavigationMenu>}
    {kind === "dialog" && <Dialog><DialogTrigger data-testid="overlay-trigger" render={<Button />}>Open dialog</DialogTrigger><DialogContent data-testid="overlay-popup" closeLabel="Dismiss dialog"><DialogHeader><DialogTitle>Dialog direction</DialogTitle><DialogDescription>Content follows its local region.</DialogDescription></DialogHeader></DialogContent></Dialog>}
    {kind === "sheet" && <Sheet><SheetTrigger data-testid="overlay-trigger" render={<Button />}>Open sheet</SheetTrigger><SheetContent data-testid="overlay-popup" closeLabel="Dismiss sheet"><SheetHeader><SheetTitle>Sheet direction</SheetTitle><SheetDescription>Content follows its local region.</SheetDescription></SheetHeader></SheetContent></Sheet>}
    {kind === "alert-dialog" && <AlertDialog><AlertDialogTrigger data-testid="overlay-trigger" render={<Button />}>Open alert</AlertDialogTrigger><AlertDialogContent data-testid="overlay-popup"><AlertDialogTitle>Alert direction</AlertDialogTitle><AlertDialogDescription>Content follows its local region.</AlertDialogDescription><AlertDialogFooter><AlertDialogCancel>Cancel alert</AlertDialogCancel><AlertDialogAction onClick={() => setAction("confirmed")}>Confirm alert</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>}
    {kind === "drawer" && <Drawer><DrawerTrigger data-testid="overlay-trigger" render={<Button />}>Open drawer</DrawerTrigger><DrawerContent data-testid="overlay-popup"><DrawerHeader><DrawerTitle>Drawer direction</DrawerTitle><DrawerDescription>Content follows its local region.</DrawerDescription></DrawerHeader><DrawerFooter><DrawerClose render={<Button />}>Dismiss drawer</DrawerClose></DrawerFooter></DrawerContent></Drawer>}
    {kind === "toast" && <ToastProvider timeout={0}><ScopedToast /></ToastProvider>}
    <output data-testid="overlay-action">{action}</output>
    <p id="overlay-destination">Destination content</p>
  </main></DirectionProvider>;
}

function Specimen() {
  const query = new URLSearchParams(location.search);
  const mode = query.get("mode") === "dark" ? "dark" : "light";
  const dir = query.get("dir") === "rtl" ? "rtl" : "ltr";
  const localDirection = query.get("scope") === "local";
  const menuSide = query.get("side") === "right" ? "right" : undefined;
  const preset = getThemePreset((query.get("preset") ?? "air") as ThemePresetId);
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 15));
  const [density, setDensity] = React.useState("comfortable");
  const [checked, setChecked] = React.useState(true);
  const [city, setCity] = React.useState<string | null>("Seoul");
  const [action, setAction] = React.useState("No action");
  React.useLayoutEffect(() => {
    for (const [name, value] of Object.entries(buildThemeVariables({ ...defaultThemeSettings, ...preset.defaults, presetId: preset.id }, mode))) document.documentElement.style.setProperty(name, value);
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.dir = localDirection ? "ltr" : dir;
  }, [mode, preset, dir, localDirection]);
  if (query.has("overlay")) return <OverlayDirections dir={dir} kind={query.get("overlay")!} />;
  return <DirectionProvider direction={dir}><main dir={dir} className="mx-auto max-w-5xl px-4 py-8">
    <h1 className="mb-8 text-2xl font-semibold tracking-tight">Calendar and menu anatomy</h1>
    <div className="grid min-w-0 gap-8 md:grid-cols-2">
      <section className="grid min-w-0 content-start gap-4"><h2 className="font-semibold">Calendar in a 228px container</h2>
        <div data-testid="narrow-calendar" className="w-[228px] max-w-full"><Calendar mode="single" defaultMonth={new Date(2026, 8, 1)} today={new Date(2026, 8, 15)} selected={date} onSelect={setDate} /></div>
        <output data-testid="date-value" className="text-sm text-[var(--muted-foreground)]">{date?.getDate() ?? "No date"}</output>
        <div data-testid="intrinsic-calendar" className="flex justify-start"><Calendar mode="single" defaultMonth={new Date(2026, 8, 1)} today={new Date(2026, 8, 15)} /></div>
      </section>
      <section className="grid min-w-0 content-start gap-4"><h2 className="font-semibold">Range and week numbers</h2>
        <div data-testid="range-calendar" className="max-w-full"><Calendar mode="range" numberOfMonths={2} showWeekNumber defaultMonth={new Date(2026, 8, 1)} today={new Date(2026, 8, 15)} selected={{ from: new Date(2026, 8, 14), to: new Date(2026, 8, 18) }} /></div>
      </section>
      <section className="grid content-start gap-4"><h2 className="font-semibold">Menu selection and submenu</h2>
        <DropdownMenu><DropdownMenuTrigger render={<Button />}>Display options</DropdownMenuTrigger><DropdownMenuContent>
          <DropdownMenuRadioGroup value={density} onValueChange={setDensity}><DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem><DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem></DropdownMenuRadioGroup>
          <DropdownMenuCheckboxItem checked={checked} onCheckedChange={setChecked} closeOnClick={false}>Show status</DropdownMenuCheckboxItem>
          <DropdownMenuSub><DropdownMenuSubTrigger>More options</DropdownMenuSubTrigger><DropdownMenuSubContent side={menuSide}><DropdownMenuItem onClick={() => setAction("Copied")}>Copy link</DropdownMenuItem><DropdownMenuItem variant="destructive">Remove</DropdownMenuItem></DropdownMenuSubContent></DropdownMenuSub>
        </DropdownMenuContent></DropdownMenu>
        <output data-testid="menu-value" className="text-sm">{density} / {action}</output>
        <ContextMenu dir={dir}><ContextMenuTrigger className="grid min-h-20 place-items-center rounded-[var(--neu-radius-control)] border border-[var(--border)] text-sm">Context options</ContextMenuTrigger><ContextMenuContent side={menuSide}>
          <ContextMenuRadioGroup value={density} onValueChange={setDensity}><ContextMenuLabel>Density</ContextMenuLabel><ContextMenuRadioItem value="compact">Compact</ContextMenuRadioItem><ContextMenuRadioItem value="comfortable">Comfortable</ContextMenuRadioItem></ContextMenuRadioGroup>
          <ContextMenuGroup><ContextMenuLabel id="context-actions-label" render={<span />} ref={node => { if (node) node.dataset.refLabel = "linked"; }} className={() => "font-bold"}>Document actions</ContextMenuLabel><ContextMenuSub><ContextMenuSubTrigger>More options</ContextMenuSubTrigger><ContextMenuSubContent side={menuSide}><ContextMenuItem onClick={() => setAction("Copied")}>Copy link</ContextMenuItem></ContextMenuSubContent></ContextMenuSub></ContextMenuGroup>
        </ContextMenuContent></ContextMenu>
      </section>
      <section className="grid content-start gap-4"><h2 className="font-semibold">Combobox selected mark</h2>
        <Combobox items={["Busan", "London", "Seoul", "Tokyo"]} value={city} onValueChange={setCity}><ComboboxInput aria-label="Choose city" /><ComboboxContent><ComboboxList>{item => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxContent></Combobox>
        <output data-testid="city-value" className="text-sm">{city}</output>
      </section>
    </div>
  </main></DirectionProvider>;
}
createRoot(document.getElementById("root")!).render(<Specimen />);
