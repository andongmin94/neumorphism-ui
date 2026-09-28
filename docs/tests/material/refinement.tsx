import * as React from "react";
import { createRoot } from "react-dom/client";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem } from "@/components/ui/combobox";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuCheckboxItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent, ContextMenuItem } from "@/components/ui/context-menu";
import { buildThemeVariables, defaultThemeSettings, getThemePreset, type ThemePresetId } from "../../src/registry/theme";
import "./styles.css";
function Specimen() {
  const query = new URLSearchParams(location.search);
  const mode = query.get("mode") === "dark" ? "dark" : "light";
  const dir = query.get("dir") === "rtl" ? "rtl" : "ltr";
  const preset = getThemePreset((query.get("preset") ?? "air") as ThemePresetId);
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 15));
  const [density, setDensity] = React.useState("comfortable");
  const [checked, setChecked] = React.useState(true);
  const [city, setCity] = React.useState<string | null>("Seoul");
  const [action, setAction] = React.useState("No action");
  React.useLayoutEffect(() => {
    for (const [name, value] of Object.entries(buildThemeVariables({ ...defaultThemeSettings, ...preset.defaults, presetId: preset.id }, mode))) document.documentElement.style.setProperty(name, value);
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.dir = dir;
  }, [mode, preset, dir]);
  return <DirectionProvider direction={dir}><main className="mx-auto max-w-5xl px-4 py-8">
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
          <DropdownMenuSub><DropdownMenuSubTrigger>More options</DropdownMenuSubTrigger><DropdownMenuSubContent><DropdownMenuItem onClick={() => setAction("Copied")}>Copy link</DropdownMenuItem><DropdownMenuItem variant="destructive">Remove</DropdownMenuItem></DropdownMenuSubContent></DropdownMenuSub>
        </DropdownMenuContent></DropdownMenu>
        <output data-testid="menu-value" className="text-sm">{density} / {action}</output>
        <ContextMenu dir={dir}><ContextMenuTrigger className="grid min-h-20 place-items-center rounded-[var(--neu-radius-control)] border border-[var(--border)] text-sm">Context options</ContextMenuTrigger><ContextMenuContent>
          <ContextMenuRadioGroup value={density} onValueChange={setDensity}><ContextMenuRadioItem value="compact">Compact</ContextMenuRadioItem><ContextMenuRadioItem value="comfortable">Comfortable</ContextMenuRadioItem></ContextMenuRadioGroup>
          <ContextMenuSub><ContextMenuSubTrigger>More options</ContextMenuSubTrigger><ContextMenuSubContent><ContextMenuItem onClick={() => setAction("Copied")}>Copy link</ContextMenuItem></ContextMenuSubContent></ContextMenuSub>
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
