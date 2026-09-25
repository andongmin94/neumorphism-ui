import { defineComponentUsageCode } from "@/i18n/component-usage-code";

export const componentUsageCodeJa = defineComponentUsageCode({
"input-otp": "export default function Example() {\n  return <InputOTP maxLength={6} defaultValue=\"123456\" aria-label=\"認証コード\">\n    <InputOTPGroup>\n      <InputOTPSlot index={0} />\n      <InputOTPSlot index={1} />\n      <InputOTPSlot index={2} />\n    </InputOTPGroup>\n    <InputOTPSeparator />\n    <InputOTPGroup>\n      <InputOTPSlot index={3} />\n      <InputOTPSlot index={4} />\n      <InputOTPSlot index={5} />\n    </InputOTPGroup>\n  </InputOTP>;\n}",
"drawer": "export default function Example() {\n  return <Drawer swipeDirection=\"down\">\n    <DrawerTrigger render={<Button />}>クイック設定</DrawerTrigger>\n    <DrawerContent>\n      <DrawerHeader>\n        <DrawerTitle>クイック設定</DrawerTitle>\n        <DrawerDescription>現在の画面を離れずによく使う設定を調整します。</DrawerDescription>\n      </DrawerHeader>\n      <div className=\"grid gap-3 px-5 py-4\"><p>通知や表示の設定をこの領域に配置できます。</p></div>\n      <DrawerFooter><DrawerClose render={<Button variant=\"primary\" />}>完了</DrawerClose></DrawerFooter>\n    </DrawerContent>\n  </Drawer>;\n}",
"context-menu": "export default function Example() {\n  const [details, setDetails] = React.useState(true);\n  const [message, setMessage] = React.useState(\"準備完了\");\n  return <div className=\"grid gap-3\">\n    <ContextMenu>\n      <ContextMenuTrigger className=\"grid min-h-32 place-items-center rounded-[var(--neu-radius-surface)] border border-[var(--neu-edge)] bg-[var(--neu-surface)] p-6 [box-shadow:var(--neu-shadow-inset)]\">\n        右クリックしてメニューを開く\n      </ContextMenuTrigger>\n      <ContextMenuContent>\n        <ContextMenuLabel>文書</ContextMenuLabel>\n        <ContextMenuItem onClick={() => setMessage(\"コピーしました\")}>コピー<ContextMenuShortcut>⌘C</ContextMenuShortcut></ContextMenuItem>\n        <ContextMenuCheckboxItem checked={details} onCheckedChange={setDetails}>詳細を表示</ContextMenuCheckboxItem>\n      </ContextMenuContent>\n    </ContextMenu>\n    <p role=\"status\" className=\"text-sm text-[var(--muted-foreground)]\">{message}</p>\n  </div>;\n}",
"command": "export default function Example() {\n  const [selected, setSelected] = React.useState(\"コマンド未選択\");\n  return <div className=\"grid w-full max-w-md gap-3\">\n    <Command>\n      <CommandInput placeholder=\"コマンドを検索\" />\n      <CommandList>\n        <CommandEmpty>一致するコマンドはありません。</CommandEmpty>\n        <CommandGroup heading=\"ナビゲーション\">\n          <CommandItem value=\"dashboard\" onSelect={() => setSelected(\"ダッシュボード\")}>ダッシュボード<CommandShortcut>⌘D</CommandShortcut></CommandItem>\n          <CommandItem value=\"settings\" onSelect={() => setSelected(\"設定\")}>設定<CommandShortcut>⌘,</CommandShortcut></CommandItem>\n        </CommandGroup>\n      </CommandList>\n    </Command>\n    <p role=\"status\" className=\"text-sm text-[var(--muted-foreground)]\">{selected}</p>\n  </div>;\n}",
"chart": "export default function Example() {\n  const data = [{ date: \"09-01\", visits: 140 }, { date: \"09-02\", visits: 220 }, { date: \"09-03\", visits: 175 }];\n  return <ChartContainer title=\"日別訪問\" description=\"サンプルデータ。正確な値は表にあります。\" tableLabel=\"データを見る\" table={<table><caption>日別訪問</caption><thead><tr><th scope=\"col\">日付</th><th scope=\"col\">訪問</th></tr></thead><tbody>{data.map(row => <tr key={row.date}><th scope=\"row\">{row.date}</th><td>{row.visits}</td></tr>)}</tbody></table>}>\n    <BarChart data={data} accessibilityLayer><XAxis dataKey=\"date\" /><ChartTooltip /><Bar dataKey=\"visits\" name=\"訪問\" fill=\"var(--primary)\" isAnimationActive={false} /></BarChart>\n  </ChartContainer>;\n}",
"navigation-menu": "export default function Example() {\n  return <div><NavigationMenu aria-label=\"製品\"><NavigationMenuList><NavigationMenuItem><NavigationMenuTrigger>製品</NavigationMenuTrigger><NavigationMenuContent><NavigationMenuLink href=\"#navigation-guide\">ガイド</NavigationMenuLink></NavigationMenuContent></NavigationMenuItem></NavigationMenuList><NavigationMenuViewport /></NavigationMenu><p id=\"navigation-guide\">ガイド</p></div>;\n}",
"menubar": "export default function Example() {\n  const [visible, setVisible] = React.useState(true);\n  const [message, setMessage] = React.useState(\"準備完了\");\n  return <div><Menubar aria-label=\"ファイル\"><MenubarMenu><MenubarTrigger>ファイル</MenubarTrigger><MenubarContent><MenubarItem onClick={() => setMessage(\"文書を作成しました\")}>新規文書</MenubarItem></MenubarContent></MenubarMenu><MenubarMenu><MenubarTrigger>表示</MenubarTrigger><MenubarContent><MenubarCheckboxItem checked={visible} onCheckedChange={setVisible}>状態を表示</MenubarCheckboxItem></MenubarContent></MenubarMenu></Menubar>{visible && <p role=\"status\">{message}</p>}</div>;\n}",
  accordion: `<Accordion defaultValue={["shipping"]}>
  <AccordionItem value="shipping">
    <AccordionTrigger>配送にはどのくらいかかりますか？</AccordionTrigger>
    <AccordionContent>
      ご注文の商品は2〜3営業日以内に発送されます。
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="returns">
    <AccordionTrigger>注文を返品できますか？</AccordionTrigger>
    <AccordionContent>
      商品の到着後14日以内であれば返品を申請できます。
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
  alert: `<Alert variant="success">
  <span aria-hidden="true">✓</span>
  <AlertTitle>変更を保存しました</AlertTitle>
  <AlertDescription>
    変更内容がすべてのチームメンバーに反映されました。
  </AlertDescription>
</Alert>`,
  avatar: `<AvatarGroup>
  <Avatar size="lg">
    <AvatarImage src="/members/ana.jpg" alt="Ana Martins" />
    <AvatarFallback>AM</AvatarFallback>
    <AvatarBadge aria-label="オンライン" />
  </Avatar>
  <Avatar size="lg">
    <AvatarFallback>UI</AvatarFallback>
  </Avatar>
  <AvatarGroupCount aria-label="ほか8人のメンバー">+8</AvatarGroupCount>
</AvatarGroup>`,
  badge: `<div className="flex gap-2">
  <Badge>デフォルト</Badge>
  <Badge variant="primary">準備完了</Badge>
  <Badge variant="soft">下書き</Badge>
  <Badge variant="destructive">失敗</Badge>
</div>`,
  breadcrumb: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">コンポーネント</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  button: `<div className="flex gap-3">
  <Button variant="primary">変更を保存</Button>
  <Button variant="soft">キャンセル</Button>
  <Button variant="ghost">あとで</Button>
  <Button size="icon" aria-label="項目を追加">+</Button>
</div>`,
  card: `<Card variant="raised">
  <CardHeader>
    <CardTitle>チームワークスペース</CardTitle>
    <CardDescription>共有 token を使って共同作業できます。</CardDescription>
    <CardAction>
      <Button size="sm">開く</Button>
    </CardAction>
  </CardHeader>
  <CardContent>8人のメンバーが参加しています。</CardContent>
  <CardFooter>たった今更新されました</CardFooter>
</Card>`,
  checkbox: `<div className="flex items-center gap-2">
  <Checkbox id="updates" defaultChecked />
  <Label htmlFor="updates">製品アップデートを受け取る</Label>
</div>`,
  dialog: `<Dialog>
  <DialogTrigger render={<Button variant="primary" />}>
    プロジェクトを作成
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>新しいプロジェクト</DialogTitle>
      <DialogDescription>
        名前と説明はあとから変更できます。
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="soft" />}>キャンセル</DialogClose>
      <Button variant="primary">作成</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  "dropdown-menu": `export function WorkspaceMenu() {
  const [showDepthGrid, setShowDepthGrid] = React.useState(true)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="soft" />}>
        メニューを開く
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>ワークスペース</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          複製
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuCheckboxItem
          checked={showDepthGrid}
          onCheckedChange={setShowDepthGrid}
        >
          深度グリッドを表示
        </DropdownMenuCheckboxItem>
        <DropdownMenuItem variant="destructive">削除</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
  input: `<div className="grid gap-2">
  <Label htmlFor="email">メールアドレス</Label>
  <Input
    id="email"
    name="email"
    type="email"
    placeholder="you@example.com"
    autoComplete="email"
  />
</div>`,
  "input-group": `<div className="grid gap-2">
  <Label htmlFor="workspace">ワークスペース</Label>
  <InputGroup>
    <InputGroupAddon aria-hidden="true">⌕</InputGroupAddon>
    <InputGroupInput id="workspace" defaultValue="soft-interface" />
    <InputGroupButton type="button">検索</InputGroupButton>
  </InputGroup>
</div>`,
  label: `<div className="grid gap-2">
  <Label htmlFor="project-name">プロジェクト名</Label>
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
    <span>ファイルのアップロード</span>
    <span>72%</span>
  </div>
  <Progress value={72} max={100} aria-labelledby="upload-label" />
</div>`,
  "radio-group": `<RadioGroup
  defaultValue="comfortable"
  orientation="horizontal"
  aria-label="表示密度"
>
  <Label className="flex gap-2" htmlFor="density-compact">
    <RadioGroupItem id="density-compact" value="compact" />
    コンパクト
  </Label>
  <Label className="flex gap-2" htmlFor="density-comfortable">
    <RadioGroupItem id="density-comfortable" value="comfortable" />
    ゆったり
  </Label>
</RadioGroup>`,
  "scroll-area": `<ScrollArea
  className="h-64 p-4"
  tabIndex={0}
  aria-label="最近のアクティビティ"
>
  {activities.map((activity) => (
    <article key={activity.id}>{activity.title}</article>
  ))}
  <ScrollBar orientation="vertical" />
</ScrollArea>`,
  select: `<div className="grid gap-2">
  <Label htmlFor="role">役割</Label>
  <Select id="role" name="role" defaultValue="designer">
    <SelectItem value="designer">デザイナー</SelectItem>
    <SelectItem value="developer">開発者</SelectItem>
    <SelectItem value="founder">創業者</SelectItem>
  </Select>
</div>`,
  separator: `<div>
  <section>プロフィール設定</section>
  <Separator className="my-6" />
  <section>通知設定</section>
</div>`,
  skeleton: `<div className="flex items-center gap-3" aria-busy="true">
  <span className="sr-only">プロフィールを読み込み中</span>
  <Skeleton className="size-12 rounded-full" />
  <div className="grid flex-1 gap-2">
    <Skeleton className="h-4 w-1/3" />
    <Skeleton className="h-3 w-2/3" />
  </div>
</div>`,
  slider: `<div className="grid gap-3">
  <div className="flex justify-between">
    <Label id="depth-label">深度の強さ</Label>
    <output>64%</output>
  </div>
  <Slider
    defaultValue={[64]}
    min={0}
    max={100}
    step={1}
    aria-labelledby="depth-label"
    thumbLabels={["深度の強さ"]}
  />
</div>`,
  switch: `<div className="flex items-center justify-between gap-4">
  <Label htmlFor="system-theme">システムテーマを使用</Label>
  <Switch id="system-theme" name="systemTheme" defaultChecked />
</div>`,
  table: `<Table>
  <TableCaption>最近インストールしたコンポーネント</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">コンポーネント</TableHead>
      <TableHead scope="col">カテゴリー</TableHead>
      <TableHead scope="col">状態</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Dialog</TableCell>
      <TableCell>オーバーレイ</TableCell>
      <TableCell>準備完了</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  tabs: `<Tabs defaultValue="surface">
  <TabsList aria-label="デザイン token">
    <TabsTrigger value="surface">サーフェス</TabsTrigger>
    <TabsTrigger value="motion">モーション</TabsTrigger>
    <TabsTrigger value="access">アクセシビリティ</TabsTrigger>
  </TabsList>
  <TabsContent value="surface">raised と inset のサーフェス token です。</TabsContent>
  <TabsContent value="motion">短く一貫した transition token です。</TabsContent>
  <TabsContent value="access">focus と contrast の token です。</TabsContent>
</Tabs>`,
  textarea: `<div className="grid gap-2">
  <Label htmlFor="note">メモ</Label>
  <Textarea
    id="note"
    name="note"
    placeholder="チームへのメモを入力してください。"
    rows={5}
  />
</div>`,
  tooltip: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger
      render={<Button size="icon" aria-label="設定を開く" />}
    >
      ⚙
    </TooltipTrigger>
    <TooltipContent side="top">
      設定
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
"alert-dialog": "export default function Example() {\n  const [message, setMessage] = React.useState(\"\");\n  return (<div className=\"grid gap-3\"><AlertDialog><AlertDialogTrigger render={<Button variant=\"destructive\" />}>{\"下書きを削除\"}</AlertDialogTrigger><AlertDialogContent><AlertDialogTitle>{\"下書きを削除しますか？\"}</AlertDialogTitle><AlertDialogDescription>{\"この操作は取り消せません。確認してから続行してください。\"}</AlertDialogDescription><AlertDialogFooter><AlertDialogCancel>{\"戻る\"}</AlertDialogCancel><AlertDialogAction onClick={() => setMessage(\"下書きを削除しました。\")}>{\"下書きを削除\"}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog><p role=\"status\" className=\"text-sm text-[var(--muted-foreground)]\">{message}</p></div>);\n}",
"popover": "export default function Example() {\n\n  return (<Popover><PopoverTrigger render={<Button />}>{\"通知設定\"}</PopoverTrigger><PopoverContent><PopoverTitle>{\"通知を調整\"}</PopoverTitle><PopoverDescription>{\"重要な更新だけを受け取り、集中を保ちます。\"}</PopoverDescription><PopoverClose render={<Button variant=\"primary\" />}>{\"閉じる\"}</PopoverClose></PopoverContent></Popover>);\n}",
"hover-card": "export default function Example() {\n  const id = React.useId();\n  return (<HoverCard><HoverCardTrigger href=\"#profile-preview\" className=\"inline-flex items-center gap-3 rounded-[var(--neu-radius-control)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] px-4 py-3 font-semibold text-[var(--foreground)] [box-shadow:var(--neu-shadow-raised-sm)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]\">{\"プロフィールを確認\"} <span aria-hidden=\"true\">↗</span></HoverCardTrigger><HoverCardContent><strong id=\"profile-preview\">Alex Kim</strong><p>{\"プロダクトデザイナー · ソウル\"}</p></HoverCardContent></HoverCard>);\n}",
"sheet": "export default function Example() {\n  const [name, setName] = React.useState(\"Alex\");\n  const nameField = <Field name=\"displayName\"><FieldLabel>{\"表示名\"}</FieldLabel><FieldControl required value={name} onValueChange={setName} /><FieldDescription>{\"プロフィールに表示する名前を入力してください。\"}</FieldDescription><FieldError match=\"valueMissing\">{\"名前を入力してください。\"}</FieldError></Field>;\n  return (<Sheet><SheetTrigger render={<Button />}>{\"プロフィール設定\"}</SheetTrigger><SheetContent closeLabel={\"閉じる\"}><SheetTitle>{\"プロフィール設定\"}</SheetTitle><SheetDescription>{\"プロフィールに表示する名前を入力してください。\"}</SheetDescription>{nameField}<SheetClose render={<Button variant=\"primary\" />}>{\"閉じる\"}</SheetClose></SheetContent></Sheet>);\n}",
"collapsible": "export default function Example() {\n  const [expanded, setExpanded] = React.useState(false);\n  return (<Collapsible open={expanded} onOpenChange={setExpanded}><CollapsibleTrigger>{\"詳細設定\"}<span aria-hidden=\"true\">{expanded ? \"−\" : \"+\"}</span></CollapsibleTrigger><CollapsibleContent><div>{\"初期設定を変更せずに追加の設定を表示します。\"}</div></CollapsibleContent></Collapsible>);\n}",
"toggle": "export default function Example() {\n\n  return (<div className=\"flex flex-wrap gap-3\"><Toggle aria-label={\"固定\"}><span aria-hidden=\"true\">◆</span>{\"固定\"}</Toggle><Toggle defaultPressed>{\"固定\"}</Toggle><Toggle disabled>{\"無効\"}</Toggle></div>);\n}",
"toggle-group": "export default function Example() {\n  const text = {\"open\":\"通知設定\",\"title\":\"通知を調整\",\"body\":\"重要な更新だけを受け取り、集中を保ちます。\",\"close\":\"閉じる\",\"discard\":\"下書きを削除\",\"confirm\":\"下書きを削除しますか？\",\"warning\":\"この操作は取り消せません。確認してから続行してください。\",\"cancel\":\"戻る\",\"done\":\"下書きを削除しました。\",\"profile\":\"プロフィールを確認\",\"person\":\"プロダクトデザイナー · ソウル\",\"details\":\"詳細設定\",\"detailBody\":\"初期設定を変更せずに追加の設定を表示します。\",\"pin\":\"固定\",\"locked\":\"無効\",\"align\":\"配置\",\"left\":\"左\",\"center\":\"中央\",\"right\":\"右\",\"tools\":\"文書ツール\",\"undo\":\"元に戻す\",\"redo\":\"やり直す\",\"save\":\"変更を保存\",\"saved\":\"ローカル例を保存しました。\",\"name\":\"表示名\",\"hint\":\"プロフィールに表示する名前を入力してください。\",\"required\":\"名前を入力してください。\",\"settings\":\"プロフィール設定\",\"quantity\":\"座席数\",\"increase\":\"座席を増やす\",\"decrease\":\"座席を減らす\",\"storage\":\"ストレージ使用量\",\"city\":\"都市を検索\",\"empty\":\"一致する都市はありません。\",\"reset\":\"リセット\",\"editing\":\"未保存の変更\",\"quiet\":\"保存済み\"};\n  const [alignment, setAlignment] = React.useState<string[]>([\"left\"]);\n  return (<div className=\"grid gap-3\"><ToggleGroup aria-label={\"配置\"} value={alignment} onValueChange={setAlignment}><ToggleGroupItem value=\"left\">{\"左\"}</ToggleGroupItem><ToggleGroupItem value=\"center\">{\"中央\"}</ToggleGroupItem><ToggleGroupItem value=\"right\">{\"右\"}</ToggleGroupItem></ToggleGroup><output className=\"text-sm text-[var(--muted-foreground)]\">{alignment.map(value => text[value as \"left\" | \"center\" | \"right\"]).join(\", \")}</output></div>);\n}",
"toolbar": "export default function Example() {\n  const [message, setMessage] = React.useState(\"\");\n  return (<div className=\"grid gap-3\"><Toolbar aria-label={\"文書ツール\"}><ToolbarGroup><ToolbarButton onClick={() => setMessage(\"元に戻す\")}>{\"元に戻す\"}</ToolbarButton><ToolbarButton disabled>{\"やり直す\"}</ToolbarButton></ToolbarGroup><ToolbarSeparator /><ToolbarButton onClick={() => setMessage(\"ローカル例を保存しました。\")}>{\"変更を保存\"}</ToolbarButton></Toolbar><p role=\"status\" className=\"text-sm text-[var(--muted-foreground)]\">{message}</p></div>);\n}",
"field": "export default function Example() {\n  const [name, setName] = React.useState(\"Alex\");\n  const nameField = <Field name=\"displayName\"><FieldLabel>{\"表示名\"}</FieldLabel><FieldControl required value={name} onValueChange={setName} /><FieldDescription>{\"プロフィールに表示する名前を入力してください。\"}</FieldDescription><FieldError match=\"valueMissing\">{\"名前を入力してください。\"}</FieldError></Field>;\n  return (<div className=\"grid w-full max-w-sm gap-5\">{nameField}<Field invalid><FieldLabel>{\"表示名\"}</FieldLabel><FieldControl defaultValue=\"\" /><FieldError match>{\"名前を入力してください。\"}</FieldError></Field></div>);\n}",
"fieldset": "export default function Example() {\n  const [name, setName] = React.useState(\"Alex\");\n  const nameField = <Field name=\"displayName\"><FieldLabel>{\"表示名\"}</FieldLabel><FieldControl required value={name} onValueChange={setName} /><FieldDescription>{\"プロフィールに表示する名前を入力してください。\"}</FieldDescription><FieldError match=\"valueMissing\">{\"名前を入力してください。\"}</FieldError></Field>;\n  return (<Fieldset className=\"w-full max-w-sm\"><FieldsetLegend>{\"プロフィール設定\"}</FieldsetLegend>{nameField}</Fieldset>);\n}",
"form": "export default function Example() {\n  const [message, setMessage] = React.useState(\"\");\n  const [name, setName] = React.useState(\"Alex\");\n  const [savedName, setSavedName] = React.useState(\"Alex\");\n  const nameField = <Field name=\"displayName\"><FieldLabel>{\"表示名\"}</FieldLabel><FieldControl required value={name} onValueChange={setName} /><FieldDescription>{\"プロフィールに表示する名前を入力してください。\"}</FieldDescription><FieldError match=\"valueMissing\">{\"名前を入力してください。\"}</FieldError></Field>;\n  return (<Form className=\"w-full max-w-sm\" onFormSubmit={() => { setSavedName(name); setMessage(\"ローカル例を保存しました。\"); }} onReset={() => { setName(savedName); setMessage(\"\"); }}>\n      {nameField}<div className=\"flex flex-wrap gap-3\"><Button type=\"submit\" variant=\"primary\">{\"変更を保存\"}</Button><Button type=\"reset\">{\"リセット\"}</Button></div><p role=\"status\" className=\"text-sm text-[var(--muted-foreground)]\">{name !== savedName ? \"未保存の変更\" : message || \"保存済み\"}</p>\n    </Form>);\n}",
"number-field": "export default function Example() {\n  const id = React.useId();\n  return (<NumberField id={id} defaultValue={3} min={1} max={8}><label htmlFor={id} className=\"text-sm font-semibold\">{\"座席数\"}</label><NumberFieldGroup><NumberFieldDecrement aria-label={\"座席を減らす\"} /><NumberFieldInput /><NumberFieldIncrement aria-label={\"座席を増やす\"} /></NumberFieldGroup></NumberField>);\n}",
"meter": "export default function Example() {\n\n  return (<Meter value={64} className=\"w-full max-w-sm\"><div className=\"flex justify-between gap-4\"><MeterLabel>{\"ストレージ使用量\"}</MeterLabel><MeterValue /></div><MeterTrack><MeterIndicator /></MeterTrack><p className=\"text-xs text-[var(--muted-foreground)]\">64 GB / 100 GB</p></Meter>);\n}",
"combobox": "export default function Example() {\n  const cities = [\"Busan\", \"London\", \"Seoul\", \"Tokyo\"];\n  return (<div className=\"w-full max-w-sm\"><Combobox items={cities}><ComboboxLabel>{\"都市を検索\"}</ComboboxLabel><ComboboxInput placeholder={\"都市を検索\"} /><ComboboxContent><ComboboxEmpty>{\"一致する都市はありません。\"}</ComboboxEmpty><ComboboxList>{(city: string) => <ComboboxItem key={city} value={city}>{city}</ComboboxItem>}</ComboboxList></ComboboxContent></Combobox></div>);\n}","calendar": "const locales = { en: enUS, ko, ja, zh: zhCN };\nconst copy = {\n  en: { single: \"Single date\", range: \"Date range\", clear: \"Clear range\", empty: \"No date selected\" },\n  ko: { single: \"날짜 선택\", range: \"기간 선택\", clear: \"기간 초기화\", empty: \"선택한 날짜 없음\" },\n  ja: { single: \"日付選択\", range: \"期間選択\", clear: \"期間をクリア\", empty: \"日付未選択\" },\n  zh: { single: \"选择日期\", range: \"选择范围\", clear: \"清除范围\", empty: \"未选择日期\" },\n};\nfunction stamp(date: Date) {\n  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, \"0\")}-${String(date.getDate()).padStart(2, \"0\")}`;\n}\n\nexport default function CalendarExample({ locale = \"ja\" }: { locale?: keyof typeof copy }) {\n  const text = copy[locale];\n  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 15));\n  const [range, setRange] = React.useState<DateRange | undefined>({ from: new Date(2026, 8, 12), to: new Date(2026, 8, 17) });\n  return <div className=\"flex max-w-full flex-wrap items-start gap-6\">\n    <section data-calendar=\"single\" aria-label={text.single} className=\"grid max-w-full gap-3\"><h3 className=\"text-sm font-semibold\">{text.single}</h3><Calendar mode=\"single\" selected={date} onSelect={setDate} defaultMonth={new Date(2026, 8)} today={new Date(2026, 8, 15)} disabled={new Date(2026, 8, 20)} locale={locales[locale]} /><output aria-live=\"polite\" data-testid=\"calendar-value\" className=\"text-sm text-[var(--muted-foreground)]\">{date ? stamp(date) : text.empty}</output></section>\n    <section data-calendar=\"range\" aria-label={text.range} className=\"grid max-w-full gap-3\"><h3 className=\"text-sm font-semibold\">{text.range}</h3><Calendar mode=\"range\" selected={range} onSelect={setRange} defaultMonth={new Date(2026, 8)} today={new Date(2026, 8, 15)} locale={locales[locale]} /><output aria-live=\"polite\" data-testid=\"calendar-range\" className=\"text-sm text-[var(--muted-foreground)]\">{range?.from ? `${stamp(range.from)} / ${range.to ? stamp(range.to) : \"…\"}` : text.empty}</output><Button size=\"sm\" onClick={() => setRange(undefined)}>{text.clear}</Button></section>\n  </div>;\n}",
"date-picker": "const locales = { en: enUS, ko, ja, zh: zhCN };\nconst copy = {\n  en: { label: \"Due date\", choose: \"Select date\", clear: \"Clear date\", locked: \"Locked date\", reset: \"Reset date\", hint: \"Dates are stored as local calendar dates, not UTC timestamps.\" },\n  ko: { label: \"마감일\", choose: \"날짜 선택\", clear: \"날짜 지우기\", locked: \"변경 불가 날짜\", reset: \"날짜 초기화\", hint: \"날짜는 UTC 시각이 아닌 현지 달력의 날짜로 저장됩니다.\" },\n  ja: { label: \"期限\", choose: \"日付を選択\", clear: \"日付をクリア\", locked: \"変更不可の日付\", reset: \"日付をリセット\", hint: \"UTC時刻ではなく、現地のカレンダー日付として保存します。\" },\n  zh: { label: \"截止日期\", choose: \"选择日期\", clear: \"清除日期\", locked: \"锁定日期\", reset: \"重置日期\", hint: \"日期按本地日历保存，而非 UTC 时间戳。\" },\n};\n\nexport default function DatePickerExample({ locale = \"ja\" }: { locale?: keyof typeof copy }) {\n  const text = copy[locale];\n  const id = React.useId();\n  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 8, 15));\n  return <form className=\"grid w-full max-w-sm gap-4\" onSubmit={event => event.preventDefault()} onReset={() => setDate(new Date(2026, 8, 15))}>\n    <label htmlFor={id} className=\"text-sm font-semibold\">{text.label}</label>\n    <DatePicker id={id} name=\"dueDate\" label={text.label} value={date} onValueChange={setDate} locale={locales[locale]} placeholder={text.choose} clearLabel={text.clear} describedBy={`${id}-hint`} disabledDates={{ before: new Date(2026, 8, 10) }} startMonth={new Date(2026, 8)} endMonth={new Date(2027, 11)} />\n    <p id={`${id}-hint`} className=\"text-sm leading-relaxed text-[var(--muted-foreground)]\">{text.hint}</p>\n    <Button type=\"reset\" size=\"sm\" className=\"w-fit\">{text.reset}</Button>\n    <DatePicker label={text.locked} value={new Date(2026, 8, 15)} onValueChange={() => {}} disabled locale={locales[locale]} clearLabel={text.clear} />\n  </form>;\n}",
"data-table": "type Project = { id: string; name: string; status: \"active\" | \"paused\"; seats: number };\nconst data: Project[] = [\n  { id: \"p1\", name: \"Atlas\", status: \"active\", seats: 12 },\n  { id: \"p2\", name: \"Beacon\", status: \"paused\", seats: 4 },\n  { id: \"p3\", name: \"Cedar\", status: \"active\", seats: 8 },\n  { id: \"p4\", name: \"Delta\", status: \"active\", seats: 20 },\n  { id: \"p5\", name: \"Echo\", status: \"paused\", seats: 6 },\n  { id: \"p6\", name: \"Foxtrot\", status: \"active\", seats: 16 },\n  { id: \"p7\", name: \"Grove\", status: \"active\", seats: 3 },\n  { id: \"p8\", name: \"Harbor\", status: \"paused\", seats: 10 },\n];\nconst copy = {\n  en: { name: \"Project\", status: \"Status\", seats: \"Seats\", search: \"Search projects\", all: \"All statuses\", active: \"Active\", paused: \"Paused\", selectPage: \"Select current page\", select: \"Select\", selected: \"Selected across all pages\", clear: \"Clear selection\", empty: \"No matching projects.\", caption: \"Workspace projects — illustrative data\", previous: \"Previous\", next: \"Next\", rows: \"Rows per page\", page: \"Page\" },\n  ko: { name: \"프로젝트\", status: \"상태\", seats: \"좌석\", search: \"프로젝트 검색\", all: \"전체 상태\", active: \"활성\", paused: \"일시 중지\", selectPage: \"현재 페이지 전체 선택\", select: \"선택\", selected: \"전체 페이지에서 선택됨\", clear: \"선택 해제\", empty: \"일치하는 프로젝트가 없습니다.\", caption: \"워크스페이스 프로젝트 — 예시 데이터\", previous: \"이전\", next: \"다음\", rows: \"페이지당 행\", page: \"페이지\" },\n  ja: { name: \"プロジェクト\", status: \"状態\", seats: \"座席\", search: \"プロジェクトを検索\", all: \"すべての状態\", active: \"有効\", paused: \"一時停止\", selectPage: \"現在のページを選択\", select: \"選択\", selected: \"全ページの選択数\", clear: \"選択解除\", empty: \"一致するプロジェクトはありません。\", caption: \"ワークスペース — サンプルデータ\", previous: \"前へ\", next: \"次へ\", rows: \"ページあたりの行\", page: \"ページ\" },\n  zh: { name: \"项目\", status: \"状态\", seats: \"座位\", search: \"搜索项目\", all: \"全部状态\", active: \"活跃\", paused: \"暂停\", selectPage: \"选择当前页\", select: \"选择\", selected: \"所有页面已选\", clear: \"清除选择\", empty: \"没有匹配的项目。\", caption: \"工作区项目 — 示例数据\", previous: \"上一页\", next: \"下一页\", rows: \"每页行数\", page: \"页\" },\n};\n\nexport default function DataTableExample({ locale = \"ja\" }: { locale?: keyof typeof copy }) {\n  const text = copy[locale];\n  const columns = React.useMemo<ColumnDef<Project>[]>(() => [\n    { id: \"selection\", enableSorting: false, enableGlobalFilter: false,\n      header: ({ table }) => <Checkbox aria-label={text.selectPage} checked={table.getIsAllPageRowsSelected() ? true : table.getIsSomePageRowsSelected() ? \"indeterminate\" : false} onCheckedChange={checked => table.toggleAllPageRowsSelected(checked === true)} />,\n      cell: ({ row }) => <Checkbox aria-label={`${text.select} ${row.original.name}`} checked={row.getIsSelected()} onCheckedChange={checked => row.toggleSelected(checked === true)} /> },\n    { accessorKey: \"name\", header: ({ column }) => <DataTableColumnHeader column={column} title={text.name} /> },\n    { accessorKey: \"status\", header: text.status, enableSorting: false, filterFn: \"equalsString\", cell: ({ row }) => <span className=\"inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[var(--border)] px-2.5 py-1 text-xs font-medium\"><span aria-hidden=\"true\">{row.original.status === \"active\" ? \"●\" : \"Ⅱ\"}</span>{text[row.original.status]}</span> },\n    { accessorKey: \"seats\", header: ({ column }) => <DataTableColumnHeader column={column} title={text.seats} />, cell: ({ row }) => <span className=\"tabular-nums\">{row.original.seats}</span> },\n  ], [text]);\n  const table = useReactTable({ data, columns, getRowId: row => row.id, getCoreRowModel: getCoreRowModel(), getFilteredRowModel: getFilteredRowModel(), getSortedRowModel: getSortedRowModel(), getPaginationRowModel: getPaginationRowModel(), initialState: { pagination: { pageIndex: 0, pageSize: 5 } } });\n  return <div className=\"grid w-full min-w-0 gap-4\">\n    <DataTable table={table} caption={text.caption} emptyMessage={text.empty}>\n      <div className=\"flex flex-wrap items-center gap-3\"><Input aria-label={text.search} placeholder={text.search} className=\"min-w-0 flex-1 basis-44\" value={(table.getState().globalFilter as string) ?? \"\"} onChange={event => { table.setGlobalFilter(event.target.value); table.setPageIndex(0); }} /><div className=\"w-40 max-w-full\"><Select aria-label={text.status} value={(table.getColumn(\"status\")?.getFilterValue() as string) ?? \"\"} onChange={event => { table.getColumn(\"status\")?.setFilterValue(event.target.value || undefined); table.setPageIndex(0); }}><SelectItem value=\"\">{text.all}</SelectItem><SelectItem value=\"active\">{text.active}</SelectItem><SelectItem value=\"paused\">{text.paused}</SelectItem></Select></div></div>\n    </DataTable>\n    <div className=\"flex flex-wrap items-center justify-between gap-2\"><output data-testid=\"selected-rows\" className=\"text-sm text-[var(--muted-foreground)]\">{text.selected}: {table.getSelectedRowModel().rows.length}</output><Button variant=\"ghost\" size=\"sm\" disabled={!table.getSelectedRowModel().rows.length} onClick={() => table.resetRowSelection()}>{text.clear}</Button></div>\n    <DataTablePagination table={table} labels={{ previous: text.previous, next: text.next, rowsPerPage: text.rows, page: (current, total) => `${text.page} ${current} / ${total}` }} />\n  </div>;\n}",
"toast": "const copy = {\n  en: { save: \"Show success\", success: \"Changes saved\", body: \"This is a local demonstration. No server request was made.\", fail: \"Show error\", error: \"Could not save\", retry: \"Your changes are retained. Try again.\", archive: \"Archive draft\", archived: \"Draft archived\", undo: \"Undo\", undone: \"Archive undone\", idle: \"Draft available\", timed: \"Show timed toast\", quick: \"Quick update\", region: \"Notifications\", close: \"Dismiss notification\" },\n  ko: { save: \"성공 알림\", success: \"변경 사항 저장됨\", body: \"로컬 예제이며 서버 요청은 전송하지 않습니다.\", fail: \"오류 알림\", error: \"저장하지 못했습니다\", retry: \"변경 사항은 유지됩니다. 다시 시도하세요.\", archive: \"초안 보관\", archived: \"초안이 보관되었습니다\", undo: \"실행 취소\", undone: \"보관을 취소했습니다\", idle: \"초안 사용 가능\", timed: \"자동 닫힘 알림\", quick: \"업데이트 알림\", region: \"알림\", close: \"알림 닫기\" },\n  ja: { save: \"成功通知\", success: \"変更を保存しました\", body: \"ローカル例です。サーバーへの送信は行いません。\", fail: \"エラー通知\", error: \"保存できませんでした\", retry: \"変更は保持されています。再試行してください。\", archive: \"下書きを保管\", archived: \"下書きを保管しました\", undo: \"元に戻す\", undone: \"保管を取り消しました\", idle: \"下書き利用可能\", timed: \"自動で閉じる通知\", quick: \"更新通知\", region: \"通知\", close: \"通知を閉じる\" },\n  zh: { save: \"成功通知\", success: \"更改已保存\", body: \"这是本地示例，未发送服务器请求。\", fail: \"错误通知\", error: \"保存失败\", retry: \"更改仍然保留，请重试。\", archive: \"归档草稿\", archived: \"草稿已归档\", undo: \"撤销\", undone: \"已撤销归档\", idle: \"草稿可用\", timed: \"自动关闭通知\", quick: \"更新通知\", region: \"通知\", close: \"关闭通知\" },\n};\n\nfunction ToastActions({ locale }: { locale: keyof typeof copy }) {\n  const text = copy[locale];\n  const manager = useToast();\n  const [status, setStatus] = React.useState<string>(text.idle);\n  return <div className=\"grid gap-4\"><div className=\"flex flex-wrap gap-3\">\n    <Button onClick={() => manager.add({ title: text.success, description: text.body, type: \"success\" })}>{text.save}</Button>\n    <Button onClick={() => manager.add({ title: text.error, description: text.retry, type: \"error\" })}>{text.fail}</Button>\n    <Button onClick={() => { setStatus(text.archived); const id = manager.add({ title: text.archived, description: text.body, actionProps: { children: text.undo, onClick: () => { setStatus(text.undone); manager.close(id); } } }); }}>{text.archive}</Button>\n    <Button onClick={() => manager.add({ title: text.quick, timeout: 1200 })}>{text.timed}</Button>\n  </div><p role=\"status\" className=\"text-sm text-[var(--muted-foreground)]\">{status}</p></div>;\n}\n\nexport default function ToastExample({ locale = \"ja\" }: { locale?: keyof typeof copy }) {\n  // Keep examples available for inspection; the timed example overrides this.\n  return <ToastProvider timeout={0}><ToastActions locale={locale} /><Toaster label={copy[locale].region} closeLabel={copy[locale].close} /></ToastProvider>;\n}",

});

export default componentUsageCodeJa;
