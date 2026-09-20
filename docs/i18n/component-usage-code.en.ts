import { defineComponentUsageCode } from "@/i18n/component-usage-code";

export const componentUsageCodeEn = defineComponentUsageCode({
"chart": "export default function Example() {\n  const data = [{ date: \"09-01\", visits: 140 }, { date: \"09-02\", visits: 220 }, { date: \"09-03\", visits: 175 }];\n  return <ChartContainer title=\"Daily visits\" description=\"Illustrative data. Exact values are available in the table.\" tableLabel=\"View data\" table={<table><caption>Daily visits</caption><thead><tr><th scope=\"col\">Date</th><th scope=\"col\">Visits</th></tr></thead><tbody>{data.map(row => <tr key={row.date}><th scope=\"row\">{row.date}</th><td>{row.visits}</td></tr>)}</tbody></table>}>\n    <BarChart data={data} accessibilityLayer><XAxis dataKey=\"date\" /><ChartTooltip /><Bar dataKey=\"visits\" name=\"Visits\" fill=\"var(--primary)\" isAnimationActive={false} /></BarChart>\n  </ChartContainer>;\n}",
"navigation-menu": "export default function Example() {\n  return <div><NavigationMenu aria-label=\"Product\"><NavigationMenuList><NavigationMenuItem><NavigationMenuTrigger>Product</NavigationMenuTrigger><NavigationMenuContent><NavigationMenuLink href=\"#navigation-guide\">Guide</NavigationMenuLink></NavigationMenuContent></NavigationMenuItem></NavigationMenuList><NavigationMenuViewport /></NavigationMenu><p id=\"navigation-guide\">Guide</p></div>;\n}",
"menubar": "export default function Example() {\n  const [visible, setVisible] = React.useState(true);\n  const [message, setMessage] = React.useState(\"Ready\");\n  return <div><Menubar aria-label=\"File\"><MenubarMenu><MenubarTrigger>File</MenubarTrigger><MenubarContent><MenubarItem onClick={() => setMessage(\"Document created\")}>New document</MenubarItem></MenubarContent></MenubarMenu><MenubarMenu><MenubarTrigger>View</MenubarTrigger><MenubarContent><MenubarCheckboxItem checked={visible} onCheckedChange={setVisible}>Show status</MenubarCheckboxItem></MenubarContent></MenubarMenu></Menubar>{visible && <p role=\"status\">{message}</p>}</div>;\n}",
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
"combobox": "export default function Example() {\n  const cities = [\"Busan\", \"London\", \"Seoul\", \"Tokyo\"];\n  return (<div className=\"w-full max-w-sm\"><Combobox items={cities}><ComboboxLabel>{\"Search cities\"}</ComboboxLabel><ComboboxInput placeholder={\"Search cities\"} /><ComboboxContent><ComboboxEmpty>{\"No matching cities.\"}</ComboboxEmpty><ComboboxList>{(city: string) => <ComboboxItem key={city} value={city}>{city}</ComboboxItem>}</ComboboxList></ComboboxContent></Combobox></div>);\n}","calendar": "const locales = { en: enUS, ko, ja, zh: zhCN };\nconst copy = {\n  en: { single: \"Single date\", range: \"Date range\", clear: \"Clear range\", empty: \"No date selected\" },\n  ko: { single: \"날짜 선택\", range: \"기간 선택\", clear: \"기간 초기화\", empty: \"선택한 날짜 없음\" },\n  ja: { single: \"日付選択\", range: \"期間選択\", clear: \"期間をクリア\", empty: \"日付未選択\" },\n  zh: { single: \"选择日期\", range: \"选择范围\", clear: \"清除范围\", empty: \"未选择日期\" },\n};\nfunction stamp(date: Date) {\n  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, \"0\")}-${String(date.getDate()).padStart(2, \"0\")}`;\n}\n\nexport default function CalendarExample({ locale = \"en\" }: { locale?: keyof typeof copy }) {\n  const text = copy[locale];\n  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 15));\n  const [range, setRange] = React.useState<DateRange | undefined>({ from: new Date(2026, 8, 12), to: new Date(2026, 8, 17) });\n  return <div className=\"flex max-w-full flex-wrap items-start gap-6\">\n    <section data-calendar=\"single\" aria-label={text.single} className=\"grid max-w-full gap-3\"><h3 className=\"text-sm font-semibold\">{text.single}</h3><Calendar mode=\"single\" selected={date} onSelect={setDate} defaultMonth={new Date(2026, 8)} today={new Date(2026, 8, 15)} disabled={new Date(2026, 8, 20)} locale={locales[locale]} /><output aria-live=\"polite\" data-testid=\"calendar-value\" className=\"text-sm text-[var(--muted-foreground)]\">{date ? stamp(date) : text.empty}</output></section>\n    <section data-calendar=\"range\" aria-label={text.range} className=\"grid max-w-full gap-3\"><h3 className=\"text-sm font-semibold\">{text.range}</h3><Calendar mode=\"range\" selected={range} onSelect={setRange} defaultMonth={new Date(2026, 8)} today={new Date(2026, 8, 15)} locale={locales[locale]} /><output aria-live=\"polite\" data-testid=\"calendar-range\" className=\"text-sm text-[var(--muted-foreground)]\">{range?.from ? `${stamp(range.from)} / ${range.to ? stamp(range.to) : \"…\"}` : text.empty}</output><Button size=\"sm\" onClick={() => setRange(undefined)}>{text.clear}</Button></section>\n  </div>;\n}",
"date-picker": "const locales = { en: enUS, ko, ja, zh: zhCN };\nconst copy = {\n  en: { label: \"Due date\", choose: \"Select date\", clear: \"Clear date\", locked: \"Locked date\", reset: \"Reset date\", hint: \"Dates are stored as local calendar dates, not UTC timestamps.\" },\n  ko: { label: \"마감일\", choose: \"날짜 선택\", clear: \"날짜 지우기\", locked: \"변경 불가 날짜\", reset: \"날짜 초기화\", hint: \"날짜는 UTC 시각이 아닌 현지 달력의 날짜로 저장됩니다.\" },\n  ja: { label: \"期限\", choose: \"日付を選択\", clear: \"日付をクリア\", locked: \"変更不可の日付\", reset: \"日付をリセット\", hint: \"UTC時刻ではなく、現地のカレンダー日付として保存します。\" },\n  zh: { label: \"截止日期\", choose: \"选择日期\", clear: \"清除日期\", locked: \"锁定日期\", reset: \"重置日期\", hint: \"日期按本地日历保存，而非 UTC 时间戳。\" },\n};\n\nexport default function DatePickerExample({ locale = \"en\" }: { locale?: keyof typeof copy }) {\n  const text = copy[locale];\n  const id = React.useId();\n  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 15));\n  return <form className=\"grid w-full max-w-sm gap-4\" onSubmit={event => event.preventDefault()} onReset={() => setDate(new Date(2026, 8, 15))}>\n    <label htmlFor={id} className=\"text-sm font-semibold\">{text.label}</label>\n    <DatePicker id={id} name=\"dueDate\" label={text.label} value={date} onValueChange={setDate} locale={locales[locale]} placeholder={text.choose} clearLabel={text.clear} describedBy={`${id}-hint`} disabledDates={{ before: new Date(2026, 8, 10) }} startMonth={new Date(2026, 8)} endMonth={new Date(2027, 11)} />\n    <p id={`${id}-hint`} className=\"text-sm leading-relaxed text-[var(--muted-foreground)]\">{text.hint}</p>\n    <Button type=\"reset\" size=\"sm\" className=\"w-fit\">{text.reset}</Button>\n    <DatePicker label={text.locked} value={new Date(2026, 8, 15)} onValueChange={() => {}} disabled locale={locales[locale]} clearLabel={text.clear} />\n  </form>;\n}",
"data-table": "type Project = { id: string; name: string; status: \"active\" | \"paused\"; seats: number };\nconst data: Project[] = [\n  { id: \"p1\", name: \"Atlas\", status: \"active\", seats: 12 },\n  { id: \"p2\", name: \"Beacon\", status: \"paused\", seats: 4 },\n  { id: \"p3\", name: \"Cedar\", status: \"active\", seats: 8 },\n  { id: \"p4\", name: \"Delta\", status: \"active\", seats: 20 },\n  { id: \"p5\", name: \"Echo\", status: \"paused\", seats: 6 },\n  { id: \"p6\", name: \"Foxtrot\", status: \"active\", seats: 16 },\n  { id: \"p7\", name: \"Grove\", status: \"active\", seats: 3 },\n  { id: \"p8\", name: \"Harbor\", status: \"paused\", seats: 10 },\n];\nconst copy = {\n  en: { name: \"Project\", status: \"Status\", seats: \"Seats\", search: \"Search projects\", all: \"All statuses\", active: \"Active\", paused: \"Paused\", selectPage: \"Select current page\", select: \"Select\", selected: \"Selected across all pages\", clear: \"Clear selection\", empty: \"No matching projects.\", caption: \"Workspace projects — illustrative data\", previous: \"Previous\", next: \"Next\", rows: \"Rows per page\", page: \"Page\" },\n  ko: { name: \"프로젝트\", status: \"상태\", seats: \"좌석\", search: \"프로젝트 검색\", all: \"전체 상태\", active: \"활성\", paused: \"일시 중지\", selectPage: \"현재 페이지 전체 선택\", select: \"선택\", selected: \"전체 페이지에서 선택됨\", clear: \"선택 해제\", empty: \"일치하는 프로젝트가 없습니다.\", caption: \"워크스페이스 프로젝트 — 예시 데이터\", previous: \"이전\", next: \"다음\", rows: \"페이지당 행\", page: \"페이지\" },\n  ja: { name: \"プロジェクト\", status: \"状態\", seats: \"座席\", search: \"プロジェクトを検索\", all: \"すべての状態\", active: \"有効\", paused: \"一時停止\", selectPage: \"現在のページを選択\", select: \"選択\", selected: \"全ページの選択数\", clear: \"選択解除\", empty: \"一致するプロジェクトはありません。\", caption: \"ワークスペース — サンプルデータ\", previous: \"前へ\", next: \"次へ\", rows: \"ページあたりの行\", page: \"ページ\" },\n  zh: { name: \"项目\", status: \"状态\", seats: \"座位\", search: \"搜索项目\", all: \"全部状态\", active: \"活跃\", paused: \"暂停\", selectPage: \"选择当前页\", select: \"选择\", selected: \"所有页面已选\", clear: \"清除选择\", empty: \"没有匹配的项目。\", caption: \"工作区项目 — 示例数据\", previous: \"上一页\", next: \"下一页\", rows: \"每页行数\", page: \"页\" },\n};\n\nexport default function DataTableExample({ locale = \"en\" }: { locale?: keyof typeof copy }) {\n  const text = copy[locale];\n  const columns = React.useMemo<ColumnDef<Project>[]>(() => [\n    { id: \"selection\", enableSorting: false, enableGlobalFilter: false,\n      header: ({ table }) => <Checkbox aria-label={text.selectPage} checked={table.getIsAllPageRowsSelected() ? true : table.getIsSomePageRowsSelected() ? \"indeterminate\" : false} onCheckedChange={checked => table.toggleAllPageRowsSelected(checked === true)} />,\n      cell: ({ row }) => <Checkbox aria-label={`${text.select} ${row.original.name}`} checked={row.getIsSelected()} onCheckedChange={checked => row.toggleSelected(checked === true)} /> },\n    { accessorKey: \"name\", header: ({ column }) => <DataTableColumnHeader column={column} title={text.name} /> },\n    { accessorKey: \"status\", header: text.status, enableSorting: false, filterFn: \"equalsString\", cell: ({ row }) => <span className=\"inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[var(--border)] px-2.5 py-1 text-xs font-medium\"><span aria-hidden=\"true\">{row.original.status === \"active\" ? \"●\" : \"Ⅱ\"}</span>{text[row.original.status]}</span> },\n    { accessorKey: \"seats\", header: ({ column }) => <DataTableColumnHeader column={column} title={text.seats} />, cell: ({ row }) => <span className=\"tabular-nums\">{row.original.seats}</span> },\n  ], [text]);\n  const table = useReactTable({ data, columns, getRowId: row => row.id, getCoreRowModel: getCoreRowModel(), getFilteredRowModel: getFilteredRowModel(), getSortedRowModel: getSortedRowModel(), getPaginationRowModel: getPaginationRowModel(), initialState: { pagination: { pageIndex: 0, pageSize: 5 } } });\n  return <div className=\"grid w-full min-w-0 gap-4\">\n    <DataTable table={table} caption={text.caption} emptyMessage={text.empty}>\n      <div className=\"flex flex-wrap items-center gap-3\"><Input aria-label={text.search} placeholder={text.search} className=\"min-w-0 flex-1 basis-44\" value={(table.getState().globalFilter as string) ?? \"\"} onChange={event => { table.setGlobalFilter(event.target.value); table.setPageIndex(0); }} /><div className=\"w-40 max-w-full\"><Select aria-label={text.status} value={(table.getColumn(\"status\")?.getFilterValue() as string) ?? \"\"} onChange={event => { table.getColumn(\"status\")?.setFilterValue(event.target.value || undefined); table.setPageIndex(0); }}><SelectItem value=\"\">{text.all}</SelectItem><SelectItem value=\"active\">{text.active}</SelectItem><SelectItem value=\"paused\">{text.paused}</SelectItem></Select></div></div>\n    </DataTable>\n    <div className=\"flex flex-wrap items-center justify-between gap-2\"><output data-testid=\"selected-rows\" className=\"text-sm text-[var(--muted-foreground)]\">{text.selected}: {table.getSelectedRowModel().rows.length}</output><Button variant=\"ghost\" size=\"sm\" disabled={!table.getSelectedRowModel().rows.length} onClick={() => table.resetRowSelection()}>{text.clear}</Button></div>\n    <DataTablePagination table={table} labels={{ previous: text.previous, next: text.next, rowsPerPage: text.rows, page: (current, total) => `${text.page} ${current} / ${total}` }} />\n  </div>;\n}",
"toast": "const copy = {\n  en: { save: \"Show success\", success: \"Changes saved\", body: \"This is a local demonstration. No server request was made.\", fail: \"Show error\", error: \"Could not save\", retry: \"Your changes are retained. Try again.\", archive: \"Archive draft\", archived: \"Draft archived\", undo: \"Undo\", undone: \"Archive undone\", idle: \"Draft available\", timed: \"Show timed toast\", quick: \"Quick update\", region: \"Notifications\", close: \"Dismiss notification\" },\n  ko: { save: \"성공 알림\", success: \"변경 사항 저장됨\", body: \"로컬 예제이며 서버 요청은 전송하지 않습니다.\", fail: \"오류 알림\", error: \"저장하지 못했습니다\", retry: \"변경 사항은 유지됩니다. 다시 시도하세요.\", archive: \"초안 보관\", archived: \"초안이 보관되었습니다\", undo: \"실행 취소\", undone: \"보관을 취소했습니다\", idle: \"초안 사용 가능\", timed: \"자동 닫힘 알림\", quick: \"업데이트 알림\", region: \"알림\", close: \"알림 닫기\" },\n  ja: { save: \"成功通知\", success: \"変更を保存しました\", body: \"ローカル例です。サーバーへの送信は行いません。\", fail: \"エラー通知\", error: \"保存できませんでした\", retry: \"変更は保持されています。再試行してください。\", archive: \"下書きを保管\", archived: \"下書きを保管しました\", undo: \"元に戻す\", undone: \"保管を取り消しました\", idle: \"下書き利用可能\", timed: \"自動で閉じる通知\", quick: \"更新通知\", region: \"通知\", close: \"通知を閉じる\" },\n  zh: { save: \"成功通知\", success: \"更改已保存\", body: \"这是本地示例，未发送服务器请求。\", fail: \"错误通知\", error: \"保存失败\", retry: \"更改仍然保留，请重试。\", archive: \"归档草稿\", archived: \"草稿已归档\", undo: \"撤销\", undone: \"已撤销归档\", idle: \"草稿可用\", timed: \"自动关闭通知\", quick: \"更新通知\", region: \"通知\", close: \"关闭通知\" },\n};\n\nfunction ToastActions({ locale }: { locale: keyof typeof copy }) {\n  const text = copy[locale];\n  const manager = useToast();\n  const [status, setStatus] = React.useState<string>(text.idle);\n  return <div className=\"grid gap-4\"><div className=\"flex flex-wrap gap-3\">\n    <Button onClick={() => manager.add({ title: text.success, description: text.body, type: \"success\" })}>{text.save}</Button>\n    <Button onClick={() => manager.add({ title: text.error, description: text.retry, type: \"error\" })}>{text.fail}</Button>\n    <Button onClick={() => { setStatus(text.archived); const id = manager.add({ title: text.archived, description: text.body, actionProps: { children: text.undo, onClick: () => { setStatus(text.undone); manager.close(id); } } }); }}>{text.archive}</Button>\n    <Button onClick={() => manager.add({ title: text.quick, timeout: 1200 })}>{text.timed}</Button>\n  </div><p role=\"status\" className=\"text-sm text-[var(--muted-foreground)]\">{status}</p></div>;\n}\n\nexport default function ToastExample({ locale = \"en\" }: { locale?: keyof typeof copy }) {\n  // Keep examples available for inspection; the timed example overrides this.\n  return <ToastProvider timeout={0}><ToastActions locale={locale} /><Toaster label={copy[locale].region} closeLabel={copy[locale].close} /></ToastProvider>;\n}",

});

export default componentUsageCodeEn;
