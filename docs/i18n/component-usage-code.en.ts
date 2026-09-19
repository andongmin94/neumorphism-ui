import { defineComponentUsageCode } from "@/i18n/component-usage-code";

export const componentUsageCodeEn = defineComponentUsageCode({
  accordion: `<Accordion defaultValue={["shipping"]}>
  <AccordionItem value="shipping">
    <AccordionTrigger>How long does shipping take?</AccordionTrigger>
    <AccordionContent>
      Orders ship within 2–3 business days.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="returns">
    <AccordionTrigger>Can I return my order?</AccordionTrigger>
    <AccordionContent>
      You can request a return within 14 days of delivery.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
  alert: `<Alert variant="success">
  <span aria-hidden="true">✓</span>
  <AlertTitle>Changes saved</AlertTitle>
  <AlertDescription>
    Your changes are now available to every team member.
  </AlertDescription>
</Alert>`,
  avatar: `<AvatarGroup>
  <Avatar size="lg">
    <AvatarImage src="/members/ana.jpg" alt="Ana Martins" />
    <AvatarFallback>AM</AvatarFallback>
    <AvatarBadge aria-label="Online" />
  </Avatar>
  <Avatar size="lg">
    <AvatarFallback>UI</AvatarFallback>
  </Avatar>
  <AvatarGroupCount aria-label="8 more members">+8</AvatarGroupCount>
</AvatarGroup>`,
  badge: `<div className="flex gap-2">
  <Badge>Default</Badge>
  <Badge variant="primary">Ready</Badge>
  <Badge variant="soft">Draft</Badge>
  <Badge variant="destructive">Failed</Badge>
</div>`,
  breadcrumb: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  button: `<div className="flex gap-3">
  <Button variant="primary">Save changes</Button>
  <Button variant="soft">Cancel</Button>
  <Button variant="ghost">Later</Button>
  <Button size="icon" aria-label="Add item">+</Button>
</div>`,
  card: `<Card variant="raised">
  <CardHeader>
    <CardTitle>Team workspace</CardTitle>
    <CardDescription>Collaborate with shared tokens.</CardDescription>
    <CardAction>
      <Button size="sm">Open</Button>
    </CardAction>
  </CardHeader>
  <CardContent>8 members are participating.</CardContent>
  <CardFooter>Last updated just now</CardFooter>
</Card>`,
  checkbox: `<div className="flex items-center gap-2">
  <Checkbox id="updates" defaultChecked />
  <Label htmlFor="updates">Receive product updates</Label>
</div>`,
  dialog: `<Dialog>
  <DialogTrigger render={<Button variant="primary" />}>
    Create project
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>New project</DialogTitle>
      <DialogDescription>
        You can change the name and description later.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="soft" />}>Cancel</DialogClose>
      <Button variant="primary">Create</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  "dropdown-menu": `export function WorkspaceMenu() {
  const [showDepthGrid, setShowDepthGrid] = React.useState(true)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="soft" />}>
        Open menu
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Workspace</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Duplicate
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuCheckboxItem
          checked={showDepthGrid}
          onCheckedChange={setShowDepthGrid}
        >
          Show depth grid
        </DropdownMenuCheckboxItem>
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
  input: `<div className="grid gap-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    name="email"
    type="email"
    placeholder="you@example.com"
    autoComplete="email"
  />
</div>`,
  "input-group": `<div className="grid gap-2">
  <Label htmlFor="workspace">Workspace</Label>
  <InputGroup>
    <InputGroupAddon aria-hidden="true">⌕</InputGroupAddon>
    <InputGroupInput id="workspace" defaultValue="soft-interface" />
    <InputGroupButton type="button">Search</InputGroupButton>
  </InputGroup>
</div>`,
  label: `<div className="grid gap-2">
  <Label htmlFor="project-name">Project name</Label>
  <Input id="project-name" name="projectName" />
</div>`,
  pagination: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="?page=1" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="?page=1">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="?page=2" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem>
      <PaginationNext href="?page=3" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
  progress: `<div className="grid gap-2">
  <div id="upload-label" className="flex justify-between">
    <span>File upload</span>
    <span>72%</span>
  </div>
  <Progress value={72} max={100} aria-labelledby="upload-label" />
</div>`,
  "radio-group": `<RadioGroup
  defaultValue="comfortable"
  orientation="horizontal"
  aria-label="Display density"
>
  <Label className="flex gap-2" htmlFor="density-compact">
    <RadioGroupItem id="density-compact" value="compact" />
    Compact
  </Label>
  <Label className="flex gap-2" htmlFor="density-comfortable">
    <RadioGroupItem id="density-comfortable" value="comfortable" />
    Comfortable
  </Label>
</RadioGroup>`,
  "scroll-area": `<ScrollArea
  className="h-64 p-4"
  tabIndex={0}
  aria-label="Recent activity"
>
  {activities.map((activity) => (
    <article key={activity.id}>{activity.title}</article>
  ))}
  <ScrollBar orientation="vertical" />
</ScrollArea>`,
  select: `<div className="grid gap-2">
  <Label htmlFor="role">Role</Label>
  <Select id="role" name="role" defaultValue="designer">
    <SelectItem value="designer">Designer</SelectItem>
    <SelectItem value="developer">Developer</SelectItem>
    <SelectItem value="founder">Founder</SelectItem>
  </Select>
</div>`,
  separator: `<div>
  <section>Profile settings</section>
  <Separator className="my-6" />
  <section>Notification settings</section>
</div>`,
  skeleton: `<div className="flex items-center gap-3" aria-busy="true">
  <span className="sr-only">Loading profile</span>
  <Skeleton className="size-12 rounded-full" />
  <div className="grid flex-1 gap-2">
    <Skeleton className="h-4 w-1/3" />
    <Skeleton className="h-3 w-2/3" />
  </div>
</div>`,
  slider: `<div className="grid gap-3">
  <div className="flex justify-between">
    <Label id="depth-label">Depth intensity</Label>
    <output>64%</output>
  </div>
  <Slider
    defaultValue={[64]}
    min={0}
    max={100}
    step={1}
    aria-labelledby="depth-label"
    thumbLabels={["Depth intensity"]}
  />
</div>`,
  switch: `<div className="flex items-center justify-between gap-4">
  <Label htmlFor="system-theme">Use system theme</Label>
  <Switch id="system-theme" name="systemTheme" defaultChecked />
</div>`,
  table: `<Table>
  <TableCaption>Recently installed components</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">Component</TableHead>
      <TableHead scope="col">Category</TableHead>
      <TableHead scope="col">Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Dialog</TableCell>
      <TableCell>Overlay</TableCell>
      <TableCell>Ready</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  tabs: `<Tabs defaultValue="surface">
  <TabsList aria-label="Design tokens">
    <TabsTrigger value="surface">Surface</TabsTrigger>
    <TabsTrigger value="motion">Motion</TabsTrigger>
    <TabsTrigger value="access">Access</TabsTrigger>
  </TabsList>
  <TabsContent value="surface">Raised and inset surface tokens.</TabsContent>
  <TabsContent value="motion">Short, consistent transition tokens.</TabsContent>
  <TabsContent value="access">Focus and contrast tokens.</TabsContent>
</Tabs>`,
  textarea: `<div className="grid gap-2">
  <Label htmlFor="note">Note</Label>
  <Textarea
    id="note"
    name="note"
    placeholder="Write a note for your team."
    rows={5}
  />
</div>`,
  tooltip: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger
      render={<Button size="icon" aria-label="Open settings" />}
    >
      ⚙
    </TooltipTrigger>
    <TooltipContent side="top">
      Settings
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
"alert-dialog": "export default function Example() {\n  const [message, setMessage] = React.useState(\"\");\n  return (<div className=\"grid gap-3\"><AlertDialog><AlertDialogTrigger render={<Button variant=\"destructive\" />}>{\"Delete draft\"}</AlertDialogTrigger><AlertDialogContent><AlertDialogTitle>{\"Delete this draft?\"}</AlertDialogTitle><AlertDialogDescription>{\"This cannot be undone. Confirm explicitly to continue.\"}</AlertDialogDescription><AlertDialogFooter><AlertDialogCancel>{\"Go back\"}</AlertDialogCancel><AlertDialogAction onClick={() => setMessage(\"Draft deleted.\")}>{\"Delete draft\"}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog><p role=\"status\" className=\"text-sm text-[var(--muted-foreground)]\">{message}</p></div>);\n}",
"popover": "export default function Example() {\n\n  return (<Popover><PopoverTrigger render={<Button />}>{\"Notification settings\"}</PopoverTrigger><PopoverContent><PopoverTitle>{\"Tune your notifications\"}</PopoverTitle><PopoverDescription>{\"Keep your focus with only the updates that matter.\"}</PopoverDescription><PopoverClose render={<Button variant=\"primary\" />}>{\"Close\"}</PopoverClose></PopoverContent></Popover>);\n}",
"hover-card": "export default function Example() {\n  const id = React.useId();\n  return (<HoverCard><HoverCardTrigger href=\"#profile-preview\" className=\"inline-flex items-center gap-3 rounded-[var(--neu-radius-control)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] px-4 py-3 font-semibold text-[var(--foreground)] [box-shadow:var(--neu-shadow-raised-sm)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]\">{\"Preview profile\"} <span aria-hidden=\"true\">↗</span></HoverCardTrigger><HoverCardContent><strong id=\"profile-preview\">Alex Kim</strong><p>{\"Product designer · Seoul\"}</p></HoverCardContent></HoverCard>);\n}",
"sheet": "export default function Example() {\n  const [name, setName] = React.useState(\"Alex\");\n  const nameField = <Field name=\"displayName\"><FieldLabel>{\"Display name\"}</FieldLabel><FieldControl required value={name} onValueChange={setName} /><FieldDescription>{\"Enter the name shown on your profile.\"}</FieldDescription><FieldError match=\"valueMissing\">{\"Enter a name.\"}</FieldError></Field>;\n  return (<Sheet><SheetTrigger render={<Button />}>{\"Profile settings\"}</SheetTrigger><SheetContent closeLabel={\"Close\"}><SheetTitle>{\"Profile settings\"}</SheetTitle><SheetDescription>{\"Enter the name shown on your profile.\"}</SheetDescription>{nameField}<SheetClose render={<Button variant=\"primary\" />}>{\"Close\"}</SheetClose></SheetContent></Sheet>);\n}",
"collapsible": "export default function Example() {\n  const [expanded, setExpanded] = React.useState(false);\n  return (<Collapsible open={expanded} onOpenChange={setExpanded}><CollapsibleTrigger>{\"Advanced settings\"}<span aria-hidden=\"true\">{expanded ? \"−\" : \"+\"}</span></CollapsibleTrigger><CollapsibleContent><div>{\"Reveal optional settings without changing the defaults.\"}</div></CollapsibleContent></Collapsible>);\n}",
"toggle": "export default function Example() {\n\n  return (<div className=\"flex flex-wrap gap-3\"><Toggle aria-label={\"Pin\"}><span aria-hidden=\"true\">◆</span>{\"Pin\"}</Toggle><Toggle defaultPressed>{\"Pin\"}</Toggle><Toggle disabled>{\"Locked\"}</Toggle></div>);\n}",
"toggle-group": "export default function Example() {\n  const text = {\"open\":\"Notification settings\",\"title\":\"Tune your notifications\",\"body\":\"Keep your focus with only the updates that matter.\",\"close\":\"Close\",\"discard\":\"Delete draft\",\"confirm\":\"Delete this draft?\",\"warning\":\"This cannot be undone. Confirm explicitly to continue.\",\"cancel\":\"Go back\",\"done\":\"Draft deleted.\",\"profile\":\"Preview profile\",\"person\":\"Product designer · Seoul\",\"details\":\"Advanced settings\",\"detailBody\":\"Reveal optional settings without changing the defaults.\",\"pin\":\"Pin\",\"locked\":\"Locked\",\"align\":\"Alignment\",\"left\":\"Left\",\"center\":\"Center\",\"right\":\"Right\",\"tools\":\"Document tools\",\"undo\":\"Undo\",\"redo\":\"Redo\",\"save\":\"Save changes\",\"saved\":\"Local example saved.\",\"name\":\"Display name\",\"hint\":\"Enter the name shown on your profile.\",\"required\":\"Enter a name.\",\"settings\":\"Profile settings\",\"quantity\":\"Seats\",\"increase\":\"Increase seats\",\"decrease\":\"Decrease seats\",\"storage\":\"Storage used\",\"city\":\"Search cities\",\"empty\":\"No matching cities.\",\"reset\":\"Reset\",\"editing\":\"Unsaved changes\",\"quiet\":\"Saved state\"};\n  const [alignment, setAlignment] = React.useState<string[]>([\"left\"]);\n  return (<div className=\"grid gap-3\"><ToggleGroup aria-label={\"Alignment\"} value={alignment} onValueChange={setAlignment}><ToggleGroupItem value=\"left\">{\"Left\"}</ToggleGroupItem><ToggleGroupItem value=\"center\">{\"Center\"}</ToggleGroupItem><ToggleGroupItem value=\"right\">{\"Right\"}</ToggleGroupItem></ToggleGroup><output className=\"text-sm text-[var(--muted-foreground)]\">{alignment.map(value => text[value as \"left\" | \"center\" | \"right\"]).join(\", \")}</output></div>);\n}",
"toolbar": "export default function Example() {\n  const [message, setMessage] = React.useState(\"\");\n  return (<div className=\"grid gap-3\"><Toolbar aria-label={\"Document tools\"}><ToolbarGroup><ToolbarButton onClick={() => setMessage(\"Undo\")}>{\"Undo\"}</ToolbarButton><ToolbarButton disabled>{\"Redo\"}</ToolbarButton></ToolbarGroup><ToolbarSeparator /><ToolbarButton onClick={() => setMessage(\"Local example saved.\")}>{\"Save changes\"}</ToolbarButton></Toolbar><p role=\"status\" className=\"text-sm text-[var(--muted-foreground)]\">{message}</p></div>);\n}",
"field": "export default function Example() {\n  const [name, setName] = React.useState(\"Alex\");\n  const nameField = <Field name=\"displayName\"><FieldLabel>{\"Display name\"}</FieldLabel><FieldControl required value={name} onValueChange={setName} /><FieldDescription>{\"Enter the name shown on your profile.\"}</FieldDescription><FieldError match=\"valueMissing\">{\"Enter a name.\"}</FieldError></Field>;\n  return (<div className=\"grid w-full max-w-sm gap-5\">{nameField}<Field invalid><FieldLabel>{\"Display name\"}</FieldLabel><FieldControl defaultValue=\"\" /><FieldError match>{\"Enter a name.\"}</FieldError></Field></div>);\n}",
"fieldset": "export default function Example() {\n  const [name, setName] = React.useState(\"Alex\");\n  const nameField = <Field name=\"displayName\"><FieldLabel>{\"Display name\"}</FieldLabel><FieldControl required value={name} onValueChange={setName} /><FieldDescription>{\"Enter the name shown on your profile.\"}</FieldDescription><FieldError match=\"valueMissing\">{\"Enter a name.\"}</FieldError></Field>;\n  return (<Fieldset className=\"w-full max-w-sm\"><FieldsetLegend>{\"Profile settings\"}</FieldsetLegend>{nameField}</Fieldset>);\n}",
"form": "export default function Example() {\n  const [message, setMessage] = React.useState(\"\");\n  const [name, setName] = React.useState(\"Alex\");\n  const [savedName, setSavedName] = React.useState(\"Alex\");\n  const nameField = <Field name=\"displayName\"><FieldLabel>{\"Display name\"}</FieldLabel><FieldControl required value={name} onValueChange={setName} /><FieldDescription>{\"Enter the name shown on your profile.\"}</FieldDescription><FieldError match=\"valueMissing\">{\"Enter a name.\"}</FieldError></Field>;\n  return (<Form className=\"w-full max-w-sm\" onFormSubmit={() => { setSavedName(name); setMessage(\"Local example saved.\"); }} onReset={() => { setName(savedName); setMessage(\"\"); }}>\n      {nameField}<div className=\"flex flex-wrap gap-3\"><Button type=\"submit\" variant=\"primary\">{\"Save changes\"}</Button><Button type=\"reset\">{\"Reset\"}</Button></div><p role=\"status\" className=\"text-sm text-[var(--muted-foreground)]\">{name !== savedName ? \"Unsaved changes\" : message || \"Saved state\"}</p>\n    </Form>);\n}",
"number-field": "export default function Example() {\n  const id = React.useId();\n  return (<NumberField id={id} defaultValue={3} min={1} max={8}><label htmlFor={id} className=\"text-sm font-semibold\">{\"Seats\"}</label><NumberFieldGroup><NumberFieldDecrement aria-label={\"Decrease seats\"} /><NumberFieldInput /><NumberFieldIncrement aria-label={\"Increase seats\"} /></NumberFieldGroup></NumberField>);\n}",
"meter": "export default function Example() {\n\n  return (<Meter value={64} className=\"w-full max-w-sm\"><div className=\"flex justify-between gap-4\"><MeterLabel>{\"Storage used\"}</MeterLabel><MeterValue /></div><MeterTrack><MeterIndicator /></MeterTrack><p className=\"text-xs text-[var(--muted-foreground)]\">64 GB / 100 GB</p></Meter>);\n}",
"combobox": "export default function Example() {\n  const cities = [\"Busan\", \"London\", \"Seoul\", \"Tokyo\"];\n  return (<div className=\"w-full max-w-sm\"><Combobox items={cities}><ComboboxLabel>{\"Search cities\"}</ComboboxLabel><ComboboxInput placeholder={\"Search cities\"} /><ComboboxContent><ComboboxEmpty>{\"No matching cities.\"}</ComboboxEmpty><ComboboxList>{(city: string) => <ComboboxItem key={city} value={city}>{city}</ComboboxItem>}</ComboboxList></ComboboxContent></Combobox></div>);\n}",
});

export default componentUsageCodeEn;
