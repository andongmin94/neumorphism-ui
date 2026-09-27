import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@/components/ui/input-group";
import { Select, SelectItem } from "@/components/ui/select";
import { Form } from "@/components/ui/form";
import { Field, FieldLabel, FieldControl, FieldError } from "@/components/ui/field";
import { NumberField, NumberFieldGroup, NumberFieldInput, NumberFieldIncrement, NumberFieldDecrement } from "@/components/ui/number-field";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { DatePicker } from "@/components/ui/date-picker";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Popover, PopoverTrigger, PopoverContent, PopoverTitle } from "@/components/ui/popover";
import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxEmpty } from "@/components/ui/combobox";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@/components/ui/context-menu";
import { buildThemeVariables, defaultThemeSettings, getThemePreset, type ThemePresetId } from "../../src/registry/theme";
import "./styles.css";

const identifier = "WorkspaceDeploymentIdentifierWithoutAnyWordBreaks0123456789";
const regions = ["Seoul", "Tokyo", "Singapore", ...Array.from({ length: 28 }, (_, i) => `Region ${i + 1}`)];
function RegionPicker() {
  return <Combobox items={regions} name="deploymentRegion"><ComboboxInput aria-label="Deployment region" placeholder="Choose a deployment region" /><ComboboxContent><ComboboxEmpty>No matching regions</ComboboxEmpty><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxContent></Combobox>;
}
function WorkspaceForm() {
  const [saved, setSaved] = React.useState(false);
  return <Card data-testid="form-card"><CardHeader><CardTitle>Workspace settings</CardTitle><CardDescription>Equal control geometry, independent validation, one recessed face.</CardDescription></CardHeader><CardContent>
    <Form onSubmit={e => { e.preventDefault(); setSaved(true); }}>
      <div className="grid items-start gap-5 sm:grid-cols-2">
        <Field name="workspace"><FieldLabel>Workspace name</FieldLabel><FieldControl aria-label="Workspace name" required /><FieldError match="valueMissing">Enter the workspace name before saving. Other controls keep their alignment.</FieldError></Field>
        <label className="grid min-w-0 gap-2 text-sm font-semibold">Plan<Select aria-label="Workspace plan" defaultValue="team"><SelectItem value="team">Team workspace</SelectItem><SelectItem value="personal">Personal workspace</SelectItem></Select></label>
        <label className="grid min-w-0 gap-2 text-sm font-semibold">Plain field<Input aria-label="Plain field" defaultValue="Same left gutter" /></label>
        <label className="grid min-w-0 gap-2 text-sm font-semibold">Compound field<InputGroup data-testid="compound"><InputGroupInput aria-label="Compound field" defaultValue="Same left gutter" /><InputGroupButton aria-label="Copy field">Copy</InputGroupButton></InputGroup></label>
        <label className="grid min-w-0 gap-2 text-sm font-semibold">Search<InputGroup data-testid="icon-compound"><InputGroupAddon><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5" /></svg></InputGroupAddon><InputGroupInput aria-label="Compound search" placeholder="Search your workspace" /></InputGroup></label>
        <label className="grid min-w-0 gap-2 text-sm font-semibold">Review channels<Select aria-label="Review channels" name="channels" multiple size={3} defaultValue={["release"]}><SelectItem value="release">Release reviews</SelectItem><SelectItem value="security">Security reviews</SelectItem><SelectItem value="access">Access reviews</SelectItem></Select></label>
                  <NumberField defaultValue={12} min={0} max={999999}><label htmlFor="composition-seats" className="text-sm font-semibold">Seats</label><NumberFieldGroup className="w-full"><NumberFieldDecrement aria-label="Remove seat" /><NumberFieldInput id="composition-seats" aria-label="Workspace seats" /><NumberFieldIncrement aria-label="Add seat" /></NumberFieldGroup></NumberField>
        <label className="grid min-w-0 gap-2 text-sm font-semibold">Plain notes<Textarea aria-label="Plain notes" defaultValue="Input content keeps its own weight." /></label>
                  <label className="grid min-w-0 gap-2 text-sm font-semibold">Compound notes<InputGroup><InputGroupTextarea aria-label="Compound notes" defaultValue="Input content keeps its own weight." /></InputGroup></label>
                  <Field><FieldLabel>Read-only identifier</FieldLabel><FieldControl aria-label="Read-only identifier" readOnly defaultValue="team_001" /></Field>
        <label className="grid min-w-0 gap-2 text-sm font-semibold">Region requiring attention<Combobox items={regions}><ComboboxInput aria-label="Invalid region" aria-invalid="true" aria-describedby="region-error" /><ComboboxContent><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxContent></Combobox><span id="region-error" className="text-xs font-normal text-[var(--neu-error-text)]">Choose a supported deployment region.</span></label>
      </div>
      <div className="flex flex-wrap items-center gap-4"><Button type="submit" variant="primary">Save workspace</Button><output>{saved ? "Workspace saved" : "Unsaved workspace"}</output></div>
    </Form>
  </CardContent></Card>;
}
function NarrowComposition() {
  const [date, setDate] = React.useState<Date>();
  return <section className="grid content-start gap-7" aria-label="Narrow compositions">
    <Card className="w-full max-w-[320px]" data-testid="narrow-card"><CardHeader><CardTitle>Account verification</CardTitle><CardDescription>Six cells inside a real card, not a full-width preview.</CardDescription></CardHeader><CardContent className="grid gap-5">
      <InputOTP aria-label="Verification code" maxLength={6}><InputOTPGroup><InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} /></InputOTPGroup><InputOTPSeparator /><InputOTPGroup><InputOTPSlot index={3} /><InputOTPSlot index={4} /><InputOTPSlot index={5} /></InputOTPGroup></InputOTP>
      <DatePicker label="Review date" placeholder="Choose the first available review date for this workspace" value={date} onValueChange={setDate} startMonth={new Date(2026, 8, 1)} endMonth={new Date(2026, 11, 1)} />
    </CardContent></Card>
    <Card className="w-full max-w-[400px]" data-testid="vertical-card"><CardHeader><CardTitle>Workspace sections</CardTitle></CardHeader><CardContent><Tabs orientation="vertical" defaultValue="profile"><TabsList aria-label="Vertical sections"><TabsTrigger value="profile">Profile</TabsTrigger><TabsTrigger value="locked" disabled>Access</TabsTrigger><TabsTrigger value="activity">Activity</TabsTrigger></TabsList><TabsContent value="profile"><Input aria-label="Nested tab field" defaultValue="Editable" /><p className="mt-3 text-sm leading-6 [overflow-wrap:anywhere]">{identifier}</p></TabsContent><TabsContent value="activity"><p className="text-sm">Latest workspace activity.</p></TabsContent></Tabs></CardContent></Card>
  </section>;
}
function OverlayComposition() {
  const sizeQuery = new URLSearchParams(location.search).get("actionSize");
  const actionSize = sizeQuery === "sm" || sizeQuery === "lg" ? sizeQuery : "default";
  const shortActions = sizeQuery !== null;
  const [action, setAction] = React.useState("No action selected");
  return <section className="grid content-start gap-5" aria-label="Overlay compositions">
    <h2 className="text-xl font-semibold">Nested task surfaces</h2>
    <div className="flex flex-wrap gap-4">
      <Dialog><DialogTrigger render={<Button />}>Open composition</DialogTrigger><DialogContent><DialogHeader><DialogTitle>{identifier}</DialogTitle><DialogDescription>A long project identifier and translated actions must stay within the plate.</DialogDescription></DialogHeader>
        <Input aria-label="Dialog name" defaultValue="Studio" />
        <Popover><PopoverTrigger render={<Button />}>Schedule options</PopoverTrigger><PopoverContent><PopoverTitle>Deployment schedule</PopoverTitle><RegionPicker /><p className="text-xs text-[var(--muted-foreground)]">Select a region, then return to the parent dialog.</p></PopoverContent></Popover>
        <Dialog><DialogTrigger render={<Button variant="soft" />}>Advanced preferences</DialogTrigger><DialogContent aria-label="Advanced preferences"><DialogHeader><DialogTitle>Advanced preferences</DialogTitle><DialogDescription>The parent remains underneath, not beside the child.</DialogDescription></DialogHeader><Input aria-label="Advanced name" defaultValue="Preview" /><DialogFooter><DialogClose render={<Button />}>Back to preferences</DialogClose></DialogFooter></DialogContent></Dialog>
        <DialogFooter><Button size={actionSize} variant="soft">{shortActions ? "Cancel" : "Continue editing the existing workspace settings"}</Button><DialogClose render={<Button size={actionSize} variant="primary" />}>{shortActions ? "Save" : "Save and return to workspace overview"}</DialogClose></DialogFooter></DialogContent>
      </Dialog>
      <AlertDialog><AlertDialogTrigger render={<Button variant="destructive" />}>Confirm removal</AlertDialogTrigger><AlertDialogContent><AlertDialogTitle>Remove {identifier}</AlertDialogTitle><AlertDialogDescription>This local example does not delete server data.</AlertDialogDescription><AlertDialogFooter><AlertDialogCancel render={<Button size={actionSize} />}>{shortActions ? "Keep" : "Keep this workspace and continue editing"}</AlertDialogCancel><AlertDialogAction render={<Button size={actionSize} variant="destructive" />}>{shortActions ? "Remove" : "Remove the workspace from this local example"}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
      <DropdownMenu><DropdownMenuTrigger render={<Button />}>Open actions</DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem onClick={() => setAction("Exported")}>{identifier}<DropdownMenuShortcut>Ctrl E</DropdownMenuShortcut></DropdownMenuItem><DropdownMenuSub><DropdownMenuSubTrigger>More actions</DropdownMenuSubTrigger><DropdownMenuSubContent>{Array.from({ length: 24 }, (_, i) => <DropdownMenuItem key={i} onClick={() => setAction(`Action ${i + 1}`)}>Action {i + 1}</DropdownMenuItem>)}</DropdownMenuSubContent></DropdownMenuSub></DropdownMenuContent></DropdownMenu>
    </div>
    <ContextMenu><ContextMenuTrigger className="grid min-h-24 place-items-center rounded-[var(--neu-radius-surface)] border border-dashed border-[var(--border)] px-4 text-sm">Context actions</ContextMenuTrigger><ContextMenuContent>{Array.from({ length: 24 }, (_, i) => <ContextMenuItem key={i} onClick={() => setAction(`Context ${i + 1}`)}>Context {i + 1}{i === 0 ? ` ${identifier}` : ""}</ContextMenuItem>)}</ContextMenuContent></ContextMenu>
    <output aria-live="polite">{action}</output>
  </section>;
}
export function CompositionSpecimen() {
  const params = new URLSearchParams(location.search);
  const mode = params.get("mode") === "dark" ? "dark" : "light";
  const [preset, setPreset] = React.useState<ThemePresetId>("air");
  React.useLayoutEffect(() => {
    for (const [key, value] of Object.entries(buildThemeVariables({ ...defaultThemeSettings, ...getThemePreset(preset).defaults, presetId: preset }, mode))) document.documentElement.style.setProperty(key, value);
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.style.colorScheme = mode;
  }, [mode, preset]);
  return <main className="mx-auto max-w-6xl px-5 py-8"><header className="mb-8 flex flex-wrap items-end justify-between gap-5"><div><p className="mb-2 font-mono text-xs text-[var(--muted-foreground)]">SOURCE COMPONENTS / COMPOSITION REVIEW</p><h1 className="text-3xl font-semibold tracking-tight">Details that survive composition.</h1></div><Select aria-label="Composition preset" value={preset} onChange={e => setPreset(e.target.value as ThemePresetId)} className="max-w-40">{["air", "lavender", "sage", "clay", "graphite"].map(id => <SelectItem key={id} value={id}>{id}</SelectItem>)}</Select></header><div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]"><WorkspaceForm /><NarrowComposition /><div className="lg:col-span-2"><OverlayComposition /></div></div></main>;
}
