import { defineComponentUsageCode } from "@/i18n/component-usage-code";

export const componentUsageCodeJa = defineComponentUsageCode({
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
"combobox": "export default function Example() {\n  const cities = [\"Busan\", \"London\", \"Seoul\", \"Tokyo\"];\n  return (<div className=\"w-full max-w-sm\"><Combobox items={cities}><ComboboxLabel>{\"都市を検索\"}</ComboboxLabel><ComboboxInput placeholder={\"都市を検索\"} /><ComboboxContent><ComboboxEmpty>{\"一致する都市はありません。\"}</ComboboxEmpty><ComboboxList>{(city: string) => <ComboboxItem key={city} value={city}>{city}</ComboboxItem>}</ComboboxList></ComboboxContent></Combobox></div>);\n}",
});

export default componentUsageCodeJa;
