import * as React from "react";
import { createRoot } from "react-dom/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { buildThemeVariables, defaultThemeSettings, getThemePreset, type ThemePresetId } from "../../src/registry/theme";
import "./styles.css";

function Specimen() {
  const [preset, setPreset] = React.useState<ThemePresetId>("air");
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const [name, setName] = React.useState("Studio workspace");
  const [invalid, setInvalid] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const [saved, setSaved] = React.useState(false);
  React.useLayoutEffect(() => {
    for (const [key, value] of Object.entries(buildThemeVariables({ ...defaultThemeSettings, ...getThemePreset(preset).defaults, presetId: preset }, mode))) document.documentElement.style.setProperty(key, value);
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.style.colorScheme = mode;
    document.documentElement.dataset.material = `${preset}-${mode}`;
  }, [preset, mode]);
  return <main className="mx-auto max-w-5xl px-5 py-10 sm:px-10">
    <header className="mb-9 flex flex-wrap items-end justify-between gap-5">
      <div><p className="mb-2 font-mono text-xs text-[var(--muted-foreground)]">NEUMORPHISM UI / SOURCE COMPONENTS</p><h1 className="text-3xl font-semibold tracking-tight">A quieter surface. A clearer state.</h1><p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--muted-foreground)]">One light direction. Tactile actions. Recessed inputs. No documentation CSS.</p></div>
      <div className="flex gap-3"><select aria-label="Preset" className="rounded-md border border-[var(--border)] bg-[var(--neu-surface)] p-2 text-sm" value={preset} onChange={e => setPreset(e.target.value as ThemePresetId)}>{["air", "lavender", "sage", "clay", "graphite"].map(p => <option key={p}>{p}</option>)}</select><Button variant="soft" onClick={() => setMode(m => m === "light" ? "dark" : "light")}>Change mode</Button></div>
    </header>
    <div className="grid min-w-0 gap-7 md:grid-cols-2">
      <Card className="min-w-0 md:col-span-2" id="actions"><CardHeader><CardTitle>Actions</CardTitle><CardDescription>Material remains visible through hover and keyboard focus.</CardDescription></CardHeader><CardContent className="flex flex-wrap items-center gap-4"><Button data-testid="default">Secondary action</Button><Button data-testid="primary" variant="primary">Save changes</Button><Button variant="soft">Soft</Button><Button variant="ghost">Ghost</Button><Button variant="destructive">Delete</Button><Button disabled>Unavailable</Button></CardContent></Card>
      <Card className="min-w-0"><CardHeader><CardTitle>Workspace</CardTitle><CardDescription>A recessed field with an explicit error state.</CardDescription></CardHeader><CardContent><form id="workspace" className="grid gap-4" onSubmit={e => { e.preventDefault(); setInvalid(!name.trim()); setSaved(Boolean(name.trim())); }}>
        <label className="grid gap-2 text-sm font-medium">Workspace name<Input aria-label="Workspace name" name="workspace" value={name} onChange={e => { setName(e.target.value); setInvalid(false); setSaved(false); }} aria-invalid={invalid || undefined} aria-describedby={invalid ? "name-error" : undefined} /></label>
        {invalid && <p id="name-error" role="alert" className="text-sm text-[var(--neu-error-text)]">Enter a workspace name.</p>}
        <label className="grid gap-2 text-sm font-medium">Read only<Input value="Pro plan" readOnly /></label>
        <label className="grid gap-2 text-sm font-medium">Unavailable<Input value="Team managed" disabled /></label>
        <div className="flex items-center justify-between gap-4 py-2"><label htmlFor="notifications" className="text-sm font-medium">Notifications</label><Switch id="notifications" name="notifications" checked={checked} onCheckedChange={setChecked} /></div>
        <Button type="submit" variant="primary">Apply workspace</Button><output className="text-xs text-[var(--muted-foreground)]">{saved ? "Saved locally" : "Changes are local to this example"}</output>
      </form></CardContent></Card>
      <div className="grid min-w-0 content-start gap-7"><Card className="min-w-0"><CardHeader><CardTitle>Navigation</CardTitle><CardDescription>Selected, hovered and focused are different states.</CardDescription></CardHeader><CardContent><Tabs defaultValue="profile"><TabsList aria-label="Workspace sections"><TabsTrigger value="profile">Profile</TabsTrigger><TabsTrigger value="access" disabled>Access</TabsTrigger><TabsTrigger value="activity">Activity</TabsTrigger></TabsList><TabsContent value="profile"><p className="py-4 text-sm leading-relaxed text-[var(--muted-foreground)]">Profile settings for your workspace.</p></TabsContent><TabsContent value="activity"><p className="py-4 text-sm leading-relaxed text-[var(--muted-foreground)]">Your recent workspace activity.</p></TabsContent></Tabs></CardContent></Card>
      <Card variant="flat" className="min-w-0"><CardHeader><CardTitle>Task surface</CardTitle><CardDescription>Only an overlay needs a floating shadow.</CardDescription></CardHeader><CardFooter><Dialog><DialogTrigger render={<Button />}>Open preferences</DialogTrigger><DialogContent><DialogHeader><DialogTitle>A longer preferences title stays clear of the close control</DialogTitle><DialogDescription>All settings remain reachable on a short mobile screen.</DialogDescription></DialogHeader><label className="grid gap-2 text-sm">Project name<Input defaultValue="Side project" /></label>{Array.from({ length: 10 }, (_, i) => <p key={i} className="text-sm leading-relaxed text-[var(--muted-foreground)]">Setting {i + 1}. Keep a clear hierarchy without stacking raised panels inside this task.</p>)}<DialogFooter><DialogClose render={<Button variant="primary" />}>Done</DialogClose></DialogFooter></DialogContent></Dialog></CardFooter></Card></div>
    </div>
  </main>;
}
createRoot(document.getElementById("root")!).render(<Specimen />);
