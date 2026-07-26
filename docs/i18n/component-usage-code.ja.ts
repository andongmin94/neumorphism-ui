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
});

export default componentUsageCodeJa;
