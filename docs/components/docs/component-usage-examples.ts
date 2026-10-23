import type { componentDocs } from "./component-docs-data";

type ComponentSlug = (typeof componentDocs)[number]["slug"];

// These complete first-use examples complement the richer Preview examples.
// Keep imports in each snippet so it can be copied into an application as-is.
export const componentUsageExamples = {
  accordion: `"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Example() {
  return (
    <Accordion>
      <AccordionItem value="shipping">
        <AccordionTrigger>When will my order arrive?</AccordionTrigger>
        <AccordionContent>Orders ship in 2–3 business days.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
  alert: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Example() {
  return (
    <Alert variant="success">
      <AlertTitle>Changes saved</AlertTitle>
      <AlertDescription>Your workspace is up to date.</AlertDescription>
    </Alert>
  );
}`,
  "alert-dialog": `"use client";

import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function Example() {
  const [deleted, setDeleted] = useState(false);
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="destructive" />}>Delete draft</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Delete this draft?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setDeleted(true)}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p role="status">{deleted ? "Draft deleted." : "Draft available."}</p>
    </div>
  );
}`,
  avatar: `import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Example() {
  return (
    <Avatar>
      <AvatarFallback role="img" aria-label="Alex Kim">AK</AvatarFallback>
    </Avatar>
  );
}`,
  badge: `import { Badge } from "@/components/ui/badge";

export default function Example() {
  return <Badge variant="primary">Ready</Badge>;
}`,
  breadcrumb: `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Settings</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`,
  button: `"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Example() {
  const [saved, setSaved] = useState(false);
  return (
    <div>
      <Button variant="primary" onClick={() => setSaved(true)}>Save changes</Button>
      <p role="status">{saved ? "Changes saved." : "Unsaved changes."}</p>
    </div>
  );
}`,
  calendar: `"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

export default function Example() {
  const [date, setDate] = useState<Date | undefined>();
  return <Calendar mode="single" selected={date} onSelect={setDate} />;
}`,
  card: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Example() {
  return (
    <Card>
      <CardHeader><CardTitle>Team workspace</CardTitle></CardHeader>
      <CardContent>Invite your team and start a project.</CardContent>
    </Card>
  );
}`,
  carousel: `"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function Example() {
  return (
    <Carousel aria-label="Product tour" className="max-w-md px-12">
      <CarouselContent>
        {["Overview", "Projects", "Settings"].map(title => (
          <CarouselItem key={title}><div className="p-6">{title}</div></CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}`,
  chart: `"use client";

import { Bar, BarChart, XAxis } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

const data = [{ day: "Mon", visits: 120 }, { day: "Tue", visits: 180 }];

export default function Example() {
  return (
    <ChartContainer title="Daily visits" description="Visits by day." tableLabel="View data"
      table={<table><caption>Daily visits</caption><thead><tr><th scope="col">Day</th><th scope="col">Visits</th></tr></thead><tbody>{data.map(row => <tr key={row.day}><th scope="row">{row.day}</th><td>{row.visits}</td></tr>)}</tbody></table>}>
      <BarChart data={data} accessibilityLayer>
        <XAxis dataKey="day" />
        <ChartTooltip />
        <Bar dataKey="visits" name="Visits" fill="var(--primary)" />
      </BarChart>
    </ChartContainer>
  );
}`,
  checkbox: `"use client";

import { useId } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function Example() {
  const id = useId();
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} name="updates" />
      <Label htmlFor={id}>Receive product updates</Label>
    </div>
  );
}`,
  collapsible: `"use client";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export default function Example() {
  return (
    <Collapsible>
      <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
      <CollapsibleContent><div>Optional project settings go here.</div></CollapsibleContent>
    </Collapsible>
  );
}`,
  combobox: `"use client";

import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxLabel, ComboboxList } from "@/components/ui/combobox";

const cities = ["London", "Seoul", "Tokyo"];

export default function Example() {
  return (
    <Combobox items={cities}>
      <ComboboxLabel>City</ComboboxLabel>
      <ComboboxInput placeholder="Search cities" />
      <ComboboxContent>
        <ComboboxEmpty>No matching cities.</ComboboxEmpty>
        <ComboboxList>{(city: string) => <ComboboxItem key={city} value={city}>{city}</ComboboxItem>}</ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}`,
  command: `"use client";

import { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

export default function Example() {
  const [selection, setSelection] = useState("No command selected.");
  return (
    <div>
      <Command>
        <CommandInput placeholder="Search commands" />
        <CommandList>
          <CommandEmpty>No commands found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem value="projects" onSelect={() => setSelection("Projects selected.")}>Projects</CommandItem>
            <CommandItem value="settings" onSelect={() => setSelection("Settings selected.")}>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      <p role="status">{selection}</p>
    </div>
  );
}`,
  "context-menu": `"use client";

import { useState } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";

export default function Example() {
  const [message, setMessage] = useState("Right-click the document.");
  return (
    <div>
      <ContextMenu>
        <ContextMenuTrigger className="block p-6">Document</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => setMessage("Document duplicated.")}>Duplicate</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <p role="status">{message}</p>
    </div>
  );
}`,
  "data-table": `"use client";

import { columnVisibilityFeature, rowSelectionFeature, rowSortingFeature, tableFeatures, useTable } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";

const features = tableFeatures({ columnVisibilityFeature, rowSelectionFeature, rowSortingFeature });
const data = [{ name: "Atlas", seats: 12 }, { name: "Beacon", seats: 4 }];
const columns = [
  { accessorKey: "name", header: "Project", enableSorting: false },
  { accessorKey: "seats", header: "Seats", enableSorting: false },
];

export default function Example() {
  const table = useTable({ features, data, columns });
  return <DataTable table={table} caption="Workspace projects" />;
}`,
  "date-picker": `"use client";

import { useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";

export default function Example() {
  const [date, setDate] = useState<Date | undefined>();
  return <DatePicker label="Due date" name="dueDate" value={date} onValueChange={setDate} />;
}`,
  dialog: `"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function Example() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Project details</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Team workspace</DialogTitle>
          <DialogDescription>Manage your projects in one place.</DialogDescription>
        </DialogHeader>
        <DialogFooter><DialogClose render={<Button />}>Close</DialogClose></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`,
  drawer: `"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

export default function Example() {
  return (
    <Drawer swipeDirection="down">
      <DrawerTrigger render={<Button />}>Quick settings</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Quick settings</DrawerTitle>
          <DrawerDescription>Adjust options without leaving this page.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter><DrawerClose render={<Button />}>Done</DrawerClose></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}`,
  "dropdown-menu": `"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Example() {
  const [visible, setVisible] = useState(true);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button />}>View options</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked={visible} onCheckedChange={setVisible}>Show details</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {visible && <p>Project details are visible.</p>}
    </div>
  );
}`,
  field: `"use client";

import { Field, FieldControl, FieldDescription, FieldLabel } from "@/components/ui/field";

export default function Example() {
  return (
    <Field name="displayName">
      <FieldLabel>Display name</FieldLabel>
      <FieldControl defaultValue="Alex" />
      <FieldDescription>This name appears on your profile.</FieldDescription>
    </Field>
  );
}`,
  fieldset: `"use client";

import { Field, FieldControl, FieldLabel } from "@/components/ui/field";
import { Fieldset, FieldsetLegend } from "@/components/ui/fieldset";

export default function Example() {
  return (
    <Fieldset>
      <FieldsetLegend>Profile settings</FieldsetLegend>
      <Field name="displayName">
        <FieldLabel>Display name</FieldLabel>
        <FieldControl defaultValue="Alex" />
      </Field>
    </Fieldset>
  );
}`,
  form: `"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldControl, FieldError, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";

export default function Example() {
  const [saved, setSaved] = useState(false);
  return (
    <Form onFormSubmit={() => setSaved(true)} onChange={() => setSaved(false)}>
      <Field name="displayName">
        <FieldLabel>Display name</FieldLabel>
        <FieldControl required />
        <FieldError match="valueMissing">Enter a name.</FieldError>
      </Field>
      <Button type="submit" variant="primary">Save profile</Button>
      <p role="status">{saved ? "Profile saved locally." : ""}</p>
    </Form>
  );
}`,
  "hover-card": `"use client";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export default function Example() {
  return (
    <HoverCard>
      <HoverCardTrigger href="/team/alex">Alex Kim</HoverCardTrigger>
      <HoverCardContent>Product designer based in Seoul.</HoverCardContent>
    </HoverCard>
  );
}`,
  "image-card": `import { ImageCard } from "@/components/ui/image-card";

export default function Example() {
  return <ImageCard src="/workspace.jpg" alt="A shared workspace" caption="Our design studio" />;
}`,
  input: `"use client";

import { useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Example() {
  const id = useId();
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>Email</Label>
      <Input id={id} name="email" type="email" autoComplete="email" placeholder="you@example.com" />
    </div>
  );
}`,
  "input-group": `"use client";

import { useId } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

export default function Example() {
  const id = useId();
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>Amount in US dollars</Label>
      <InputGroup>
        <InputGroupAddon aria-hidden="true">$</InputGroupAddon>
        <InputGroupInput id={id} name="amount" inputMode="decimal" placeholder="0.00" />
      </InputGroup>
    </div>
  );
}`,
  "input-otp": `"use client";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function Example() {
  return (
    <InputOTP maxLength={4} aria-label="Verification code" autoComplete="one-time-code">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  );
}`,
  label: `"use client";

import { useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Example() {
  const id = useId();
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>Project name</Label>
      <Input id={id} name="projectName" />
    </div>
  );
}`,
  marquee: `"use client";

import { Marquee } from "@/components/ui/marquee";

export default function Example() {
  return <Marquee items={["React", "Base UI", "Tailwind CSS"]} label="Supported technologies" />;
}`,
  menubar: `"use client";

import { useState } from "react";
import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

export default function Example() {
  const [visible, setVisible] = useState(true);
  return (
    <div>
      <Menubar aria-label="Document menu">
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked={visible} onCheckedChange={setVisible}>Show status</MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      {visible && <p>All changes saved.</p>}
    </div>
  );
}`,
  meter: `"use client";

import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "@/components/ui/meter";

export default function Example() {
  return (
    <Meter value={64} max={100}>
      <MeterLabel>Storage used</MeterLabel>
      <MeterValue />
      <MeterTrack><MeterIndicator /></MeterTrack>
    </Meter>
  );
}`,
  "navigation-menu": `"use client";

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport } from "@/components/ui/navigation-menu";

export default function Example() {
  return (
    <NavigationMenu aria-label="Main navigation">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent><NavigationMenuLink href="/guides">Guides</NavigationMenuLink></NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuViewport />
    </NavigationMenu>
  );
}`,
  "number-field": `"use client";

import { useId } from "react";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@/components/ui/number-field";

export default function Example() {
  const id = useId();
  return (
    <NumberField id={id} defaultValue={1} min={1} max={10}>
      <label htmlFor={id}>Seats</label>
      <NumberFieldGroup>
        <NumberFieldDecrement aria-label="Decrease seats" />
        <NumberFieldInput />
        <NumberFieldIncrement aria-label="Increase seats" />
      </NumberFieldGroup>
    </NumberField>
  );
}`,
  pagination: `import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default function Example() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem><PaginationPrevious href="?page=1" /></PaginationItem>
        <PaginationItem><PaginationLink href="?page=1">1</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="?page=2" isActive>2</PaginationLink></PaginationItem>
        <PaginationItem><PaginationNext href="?page=3" /></PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}`,
  popover: `"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";

export default function Example() {
  return (
    <Popover>
      <PopoverTrigger render={<Button />}>Project details</PopoverTrigger>
      <PopoverContent>
        <PopoverTitle>Team workspace</PopoverTitle>
        <PopoverDescription>Eight members are collaborating.</PopoverDescription>
        <PopoverClose render={<Button />}>Close</PopoverClose>
      </PopoverContent>
    </Popover>
  );
}`,
  progress: `"use client";

import { Progress } from "@/components/ui/progress";

export default function Example() {
  return <Progress value={72} aria-label="File upload" />;
}`,
  "radio-group": `"use client";

import { useId } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Example() {
  const id = useId();
  return (
    <RadioGroup defaultValue="standard" aria-label="Delivery method">
      <Label htmlFor={id + "-standard"} className="flex items-center gap-2">
        <RadioGroupItem id={id + "-standard"} value="standard" />Standard
      </Label>
      <Label htmlFor={id + "-express"} className="flex items-center gap-2">
        <RadioGroupItem id={id + "-express"} value="express" />Express
      </Label>
    </RadioGroup>
  );
}`,
  resizable: `"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export default function Example() {
  return (
    <div className="h-48">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize="40%" minSize="20%"><div className="p-4">List</div></ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="60%" minSize="20%"><div className="p-4">Details</div></ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}`,
  "scroll-area": `"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Example() {
  return (
    <ScrollArea className="h-40" tabIndex={0} aria-label="Recent activity">
      <ul className="grid gap-3 p-4">
        {Array.from({ length: 12 }, (_, index) => <li key={index}>Activity {index + 1}</li>)}
      </ul>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}`,
  select: `"use client";

import { useId } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select";

export default function Example() {
  const id = useId();
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>Role</Label>
      <Select id={id} name="role" defaultValue="designer">
        <SelectItem value="designer">Designer</SelectItem>
        <SelectItem value="developer">Developer</SelectItem>
      </Select>
    </div>
  );
}`,
  separator: `import { Separator } from "@/components/ui/separator";

export default function Example() {
  return (
    <div>
      <p>Profile settings</p>
      <Separator className="my-4" />
      <p>Notification settings</p>
    </div>
  );
}`,
  sheet: `"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function Example() {
  return (
    <Sheet>
      <SheetTrigger render={<Button />}>Workspace details</SheetTrigger>
      <SheetContent>
        <SheetTitle>Team workspace</SheetTitle>
        <SheetDescription>Review this workspace without leaving the page.</SheetDescription>
      </SheetContent>
    </Sheet>
  );
}`,
  sidebar: `"use client";

import { Sidebar, SidebarContent, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarMenuLink, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Example() {
  return (
    <SidebarProvider className="min-h-80">
      <Sidebar>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem><SidebarMenuLink href="/projects" isActive>Projects</SidebarMenuLink></SidebarMenuItem>
            <SidebarMenuItem><SidebarMenuLink href="/settings">Settings</SidebarMenuLink></SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="p-4"><SidebarTrigger /></header>
        <main className="p-4">Your projects</main>
      </SidebarInset>
    </SidebarProvider>
  );
}`,
  skeleton: `import { Skeleton } from "@/components/ui/skeleton";

export default function Example() {
  return (
    <div aria-busy="true">
      <span className="sr-only">Loading profile</span>
      <Skeleton className="h-4 w-40" />
    </div>
  );
}`,
  slider: `"use client";

import { Slider } from "@/components/ui/slider";

export default function Example() {
  return <Slider defaultValue={[50]} min={0} max={100} aria-label="Volume" thumbLabels={["Volume"]} />;
}`,
  switch: `"use client";

import { useId } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function Example() {
  const id = useId();
  return (
    <div className="flex items-center gap-3">
      <Switch id={id} name="notifications" defaultChecked />
      <Label htmlFor={id}>Email notifications</Label>
    </div>
  );
}`,
  table: `import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Example() {
  return (
    <Table>
      <TableCaption>Workspace projects</TableCaption>
      <TableHeader><TableRow><TableHead scope="col">Project</TableHead><TableHead scope="col">Seats</TableHead></TableRow></TableHeader>
      <TableBody><TableRow><TableCell>Atlas</TableCell><TableCell>12</TableCell></TableRow></TableBody>
    </Table>
  );
}`,
  tabs: `"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Example() {
  return (
    <Tabs defaultValue="profile">
      <TabsList aria-label="Account settings">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">Edit your profile.</TabsContent>
      <TabsContent value="security">Manage your security settings.</TabsContent>
    </Tabs>
  );
}`,
  textarea: `"use client";

import { useId } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Example() {
  const id = useId();
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>Project description</Label>
      <Textarea id={id} name="description" placeholder="Describe your project" rows={4} />
    </div>
  );
}`,
  toast: `"use client";

import { Button } from "@/components/ui/button";
import { Toaster, ToastProvider, useToast } from "@/components/ui/toast";

function NotifyButton() {
  const toast = useToast();
  return <Button onClick={() => toast.add({ title: "Changes saved", type: "success" })}>Show notification</Button>;
}

export default function Example() {
  return <ToastProvider><NotifyButton /><Toaster /></ToastProvider>;
}`,
  toggle: `"use client";

import { Toggle } from "@/components/ui/toggle";

export default function Example() {
  return <Toggle aria-label="Bold">Bold</Toggle>;
}`,
  "toggle-group": `"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Example() {
  return (
    <ToggleGroup defaultValue={["left"]} aria-label="Text alignment">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  );
}`,
  toolbar: `"use client";

import { Toolbar, ToolbarGroup, ToolbarLink, ToolbarSeparator } from "@/components/ui/toolbar";

export default function Example() {
  return (
    <Toolbar aria-label="Document tools">
      <ToolbarGroup><ToolbarLink href="/documents">Documents</ToolbarLink></ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarLink href="/settings">Settings</ToolbarLink>
    </Toolbar>
  );
}`,
  tooltip: `"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Example() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button />}>Formatting</TooltipTrigger>
        <TooltipContent>Choose how text appears.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}`,
} satisfies Record<ComponentSlug, string>;

export function getComponentUsageExample(slug: string): string {
  const example = componentUsageExamples[slug as ComponentSlug];
  if (!example) throw new Error(`Missing first-use example: ${slug}`);
  return example;
}
