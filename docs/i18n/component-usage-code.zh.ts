import { defineComponentUsageCode } from "@/i18n/component-usage-code";

export const componentUsageCodeZh = defineComponentUsageCode({
  accordion: `<Accordion defaultValue={["shipping"]}>
  <AccordionItem value="shipping">
    <AccordionTrigger>配送需要多长时间？</AccordionTrigger>
    <AccordionContent>
      订单会在 2–3 个工作日内发出。
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="returns">
    <AccordionTrigger>可以退货吗？</AccordionTrigger>
    <AccordionContent>
      收货后 14 天内可以申请退货。
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
  alert: `<Alert variant="success">
  <span aria-hidden="true">✓</span>
  <AlertTitle>更改已保存</AlertTitle>
  <AlertDescription>
    所有团队成员都可以看到这些更改。
  </AlertDescription>
</Alert>`,
  avatar: `<AvatarGroup>
  <Avatar size="lg">
    <AvatarImage src="/members/ana.jpg" alt="Ana Martins" />
    <AvatarFallback>AM</AvatarFallback>
    <AvatarBadge aria-label="在线" />
  </Avatar>
  <Avatar size="lg">
    <AvatarFallback>UI</AvatarFallback>
  </Avatar>
  <AvatarGroupCount aria-label="另外 8 名成员">+8</AvatarGroupCount>
</AvatarGroup>`,
  badge: `<div className="flex gap-2">
  <Badge>默认</Badge>
  <Badge variant="primary">就绪</Badge>
  <Badge variant="soft">草稿</Badge>
  <Badge variant="destructive">失败</Badge>
</div>`,
  breadcrumb: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">首页</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">组件</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>面包屑导航</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  button: `<div className="flex gap-3">
  <Button variant="primary">保存更改</Button>
  <Button variant="soft">取消</Button>
  <Button variant="ghost">稍后处理</Button>
  <Button size="icon" aria-label="添加项目">+</Button>
</div>`,
  card: `<Card variant="raised">
  <CardHeader>
    <CardTitle>团队工作区</CardTitle>
    <CardDescription>使用共享 token 协作。</CardDescription>
    <CardAction>
      <Button size="sm">打开</Button>
    </CardAction>
  </CardHeader>
  <CardContent>共有 8 名成员参与。</CardContent>
  <CardFooter>刚刚更新</CardFooter>
</Card>`,
  checkbox: `<div className="flex items-center gap-2">
  <Checkbox id="updates" defaultChecked />
  <Label htmlFor="updates">接收产品更新</Label>
</div>`,
  dialog: `<Dialog>
  <DialogTrigger render={<Button variant="primary" />}>
    创建项目
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>新项目</DialogTitle>
      <DialogDescription>
        之后仍可修改名称和说明。
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="soft" />}>取消</DialogClose>
      <Button variant="primary">创建</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  "dropdown-menu": `export function WorkspaceMenu() {
  const [showDepthGrid, setShowDepthGrid] = React.useState(true)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="soft" />}>
        打开菜单
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>工作区</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          创建副本
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuCheckboxItem
          checked={showDepthGrid}
          onCheckedChange={setShowDepthGrid}
        >
          显示深度网格
        </DropdownMenuCheckboxItem>
        <DropdownMenuItem variant="destructive">删除</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
  input: `<div className="grid gap-2">
  <Label htmlFor="email">电子邮箱</Label>
  <Input
    id="email"
    name="email"
    type="email"
    placeholder="you@example.com"
    autoComplete="email"
  />
</div>`,
  "input-group": `<div className="grid gap-2">
  <Label htmlFor="workspace">工作区</Label>
  <InputGroup>
    <InputGroupAddon aria-hidden="true">⌕</InputGroupAddon>
    <InputGroupInput id="workspace" defaultValue="soft-interface" />
    <InputGroupButton type="button">搜索</InputGroupButton>
  </InputGroup>
</div>`,
  label: `<div className="grid gap-2">
  <Label htmlFor="project-name">项目名称</Label>
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
    <span>文件上传</span>
    <span>72%</span>
  </div>
  <Progress value={72} max={100} aria-labelledby="upload-label" />
</div>`,
  "radio-group": `<RadioGroup
  defaultValue="comfortable"
  orientation="horizontal"
  aria-label="显示密度"
>
  <Label className="flex gap-2" htmlFor="density-compact">
    <RadioGroupItem id="density-compact" value="compact" />
    紧凑
  </Label>
  <Label className="flex gap-2" htmlFor="density-comfortable">
    <RadioGroupItem id="density-comfortable" value="comfortable" />
    舒适
  </Label>
</RadioGroup>`,
  "scroll-area": `<ScrollArea
  className="h-64 p-4"
  tabIndex={0}
  aria-label="最近动态"
>
  {activities.map((activity) => (
    <article key={activity.id}>{activity.title}</article>
  ))}
  <ScrollBar orientation="vertical" />
</ScrollArea>`,
  select: `<div className="grid gap-2">
  <Label htmlFor="role">角色</Label>
  <Select id="role" name="role" defaultValue="designer">
    <SelectItem value="designer">设计师</SelectItem>
    <SelectItem value="developer">开发者</SelectItem>
    <SelectItem value="founder">创始人</SelectItem>
  </Select>
</div>`,
  separator: `<div>
  <section>个人资料设置</section>
  <Separator className="my-6" />
  <section>通知设置</section>
</div>`,
  skeleton: `<div className="flex items-center gap-3" aria-busy="true">
  <span className="sr-only">正在加载个人资料</span>
  <Skeleton className="size-12 rounded-full" />
  <div className="grid flex-1 gap-2">
    <Skeleton className="h-4 w-1/3" />
    <Skeleton className="h-3 w-2/3" />
  </div>
</div>`,
  slider: `<div className="grid gap-3">
  <div className="flex justify-between">
    <Label id="depth-label">深度强度</Label>
    <output>64%</output>
  </div>
  <Slider
    defaultValue={[64]}
    min={0}
    max={100}
    step={1}
    aria-labelledby="depth-label"
    thumbLabels={["深度强度"]}
  />
</div>`,
  switch: `<div className="flex items-center justify-between gap-4">
  <Label htmlFor="system-theme">跟随系统主题</Label>
  <Switch id="system-theme" name="systemTheme" defaultChecked />
</div>`,
  table: `<Table>
  <TableCaption>最近安装的组件</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">组件</TableHead>
      <TableHead scope="col">分类</TableHead>
      <TableHead scope="col">状态</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Dialog</TableCell>
      <TableCell>浮层</TableCell>
      <TableCell>就绪</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  tabs: `<Tabs defaultValue="surface">
  <TabsList aria-label="设计 token">
    <TabsTrigger value="surface">表面</TabsTrigger>
    <TabsTrigger value="motion">动效</TabsTrigger>
    <TabsTrigger value="access">无障碍</TabsTrigger>
  </TabsList>
  <TabsContent value="surface">浮起与内嵌表面 token。</TabsContent>
  <TabsContent value="motion">简短且一致的过渡 token。</TabsContent>
  <TabsContent value="access">焦点与对比度 token。</TabsContent>
</Tabs>`,
  textarea: `<div className="grid gap-2">
  <Label htmlFor="note">备注</Label>
  <Textarea
    id="note"
    name="note"
    placeholder="给团队写一条备注。"
    rows={5}
  />
</div>`,
  tooltip: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger
      render={<Button size="icon" aria-label="打开设置" />}
    >
      ⚙
    </TooltipTrigger>
    <TooltipContent side="top">
      设置
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
});

export default componentUsageCodeZh;
