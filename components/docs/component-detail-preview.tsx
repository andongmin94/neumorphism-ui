"use client";

import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/src/components/ui/accordion";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/src/components/ui/alert";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/registry/src/components/ui/avatar";
import { Badge } from "@/registry/src/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/src/components/ui/breadcrumb";
import { Button } from "@/registry/src/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/src/components/ui/card";
import {
  Checkbox,
  type CheckedState,
} from "@/registry/src/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/src/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/src/components/ui/dropdown-menu";
import { Input } from "@/registry/src/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/registry/src/components/ui/input-group";
import { Label } from "@/registry/src/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/src/components/ui/pagination";
import { Progress } from "@/registry/src/components/ui/progress";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/registry/src/components/ui/radio-group";
import { ScrollArea } from "@/registry/src/components/ui/scroll-area";
import {
  Select,
  SelectGroup,
  SelectItem,
} from "@/registry/src/components/ui/select";
import { Separator } from "@/registry/src/components/ui/separator";
import { Skeleton } from "@/registry/src/components/ui/skeleton";
import { Slider } from "@/registry/src/components/ui/slider";
import { Switch } from "@/registry/src/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/src/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/src/components/ui/tabs";
import { Textarea } from "@/registry/src/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/src/components/ui/tooltip";

function PreviewStack({
  children,
  compact = false,
}: {
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact
          ? "component-preview-stack component-preview-stack-compact"
          : "component-preview-stack"
      }
    >
      {children}
    </div>
  );
}

function PreviewField({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="component-preview-field">
      <span>{label}</span>
      {children}
    </div>
  );
}

export function ComponentDetailPreview({ slug }: { slug: string }) {
  const [mixed, setMixed] = React.useState<CheckedState>("indeterminate");
  const [showDepthGrid, setShowDepthGrid] = React.useState(true);
  const [sliderValue, setSliderValue] = React.useState([32, 72]);
  const [switchValue, setSwitchValue] = React.useState(true);

  switch (slug) {
    case "accordion":
      return (
        <div className="component-preview-narrow">
          <Accordion type="single" defaultValue="tokens" collapsible>
            <AccordionItem value="tokens">
              <AccordionTrigger>스타일 토큰도 함께 설치되나요?</AccordionTrigger>
              <AccordionContent>
                첫 컴포넌트를 추가할 때 뉴모피즘 surface, shadow, radius 토큰이
                프로젝트 CSS에 함께 연결됩니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="source">
              <AccordionTrigger>설치 후 소스를 수정할 수 있나요?</AccordionTrigger>
              <AccordionContent>
                네. 패키지를 감추지 않고 실제 TSX 파일을 프로젝트 안에 복사합니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="keyboard">
              <AccordionTrigger>키보드 조작을 지원하나요?</AccordionTrigger>
              <AccordionContent>
                Tab으로 trigger에 접근하고 Enter 또는 Space로 내용을 열 수 있습니다.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      );

    case "alert":
      return (
        <PreviewStack>
          <Alert>
            <span aria-hidden="true">i</span>
            <AlertTitle>새 Registry 버전</AlertTitle>
            <AlertDescription>로컬 소스를 다시 설치하면 변경점을 확인할 수 있습니다.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <span aria-hidden="true">✓</span>
            <AlertTitle>동기화 완료</AlertTitle>
            <AlertDescription>26개 컴포넌트가 현재 프로젝트와 일치합니다.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <span aria-hidden="true">!</span>
            <AlertTitle>토큰을 찾을 수 없음</AlertTitle>
            <AlertDescription>globals.css에 base 항목을 먼저 설치해 주세요.</AlertDescription>
          </Alert>
        </PreviewStack>
      );

    case "avatar":
      return (
        <PreviewStack compact>
          <div className="component-preview-row">
            <Avatar size="sm">
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AM</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>UI</AvatarFallback>
              <AvatarBadge />
            </Avatar>
          </div>
          <div className="component-preview-subsection">
            <span className="component-preview-caption">TEAM</span>
            <AvatarGroup>
              <Avatar><AvatarFallback>AN</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>DE</AvatarFallback></Avatar>
              <Avatar><AvatarFallback>SO</AvatarFallback></Avatar>
              <AvatarGroupCount>+9</AvatarGroupCount>
            </AvatarGroup>
          </div>
        </PreviewStack>
      );

    case "badge":
      return (
        <div className="component-preview-row component-preview-row-wrap">
          <Badge>Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="soft">Soft</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      );

    case "breadcrumb":
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Navigation</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );

    case "button":
      return (
        <PreviewStack>
          <div className="component-preview-row component-preview-row-wrap">
            <Button>Default</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="soft">Soft</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Delete</Button>
          </div>
          <div className="component-preview-row component-preview-row-wrap">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Add item">+</Button>
            <Button disabled>Disabled</Button>
          </div>
        </PreviewStack>
      );

    case "card":
      return (
        <div className="component-preview-card-grid">
          <Card className="component-preview-card">
            <CardHeader>
              <CardTitle>Market overview</CardTitle>
              <CardDescription>오늘 관심 종목의 흐름을 한눈에 확인하세요.</CardDescription>
              <CardAction><Badge variant="primary">Live</Badge></CardAction>
            </CardHeader>
            <CardContent>
              <div className="component-preview-metric">
                <strong>₩72,400</strong>
                <span>+2.41%</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="soft" className="w-full">상세 보기</Button>
            </CardFooter>
          </Card>
          <Card className="component-preview-card" variant="inset">
            <CardHeader>
              <CardTitle>Inset surface</CardTitle>
              <CardDescription>보조 정보에는 눌린 깊이를 적용할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress aria-label="Portfolio target" value={68} />
            </CardContent>
          </Card>
        </div>
      );

    case "checkbox":
      return (
        <PreviewStack compact>
          <Label className="component-preview-choice" htmlFor="docs-checkbox-checked">
            <Checkbox id="docs-checkbox-checked" defaultChecked />
            가격 알림 받기
          </Label>
          <Label className="component-preview-choice" htmlFor="docs-checkbox-mixed">
            <Checkbox
              id="docs-checkbox-mixed"
              checked={mixed}
              onCheckedChange={setMixed}
            />
            일부 워크스페이스에 적용됨
          </Label>
          <Label className="component-preview-choice" htmlFor="docs-checkbox-disabled">
            <Checkbox id="docs-checkbox-disabled" disabled />
            사용할 수 없는 옵션
          </Label>
        </PreviewStack>
      );

    case "dialog":
      return (
        <div className="component-preview-row">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="primary">프로필 편집</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>프로필 편집</DialogTitle>
                <DialogDescription>
                  공개 프로필에 표시될 이름과 핸들을 변경합니다.
                </DialogDescription>
              </DialogHeader>
              <PreviewStack compact>
                <PreviewField label="Name">
                  <Input defaultValue="Andongmin" />
                </PreviewField>
                <PreviewField label="Username">
                  <Input defaultValue="@softsurface" />
                </PreviewField>
              </PreviewStack>
              <DialogFooter>
                <DialogClose asChild><Button variant="soft">취소</Button></DialogClose>
                <DialogClose asChild><Button variant="primary">저장</Button></DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <span className="component-preview-hint">열어서 focus trap과 Escape 닫기를 확인하세요.</span>
        </div>
      );

    case "dropdown-menu":
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="soft">워크스페이스 메뉴 <span aria-hidden="true">⌄</span></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>My workspace</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              새 페이지 <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>복제</DropdownMenuItem>
            <DropdownMenuCheckboxItem
              checked={showDepthGrid}
              onCheckedChange={setShowDepthGrid}
            >
              깊이 가이드 표시
            </DropdownMenuCheckboxItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>테마</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup defaultValue="system">
                  <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">워크스페이스 삭제</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

    case "input":
      return (
        <PreviewStack>
          <PreviewField label="Email">
            <Input type="email" placeholder="you@example.com" />
          </PreviewField>
          <PreviewField label="Invalid">
            <Input aria-invalid defaultValue="wrong-address" />
          </PreviewField>
          <PreviewField label="Disabled">
            <Input disabled defaultValue="Read only workspace" />
          </PreviewField>
        </PreviewStack>
      );

    case "input-group":
      return (
        <PreviewStack>
          <PreviewField label="Search">
            <InputGroup>
              <InputGroupAddon aria-hidden="true">⌕</InputGroupAddon>
              <InputGroupInput placeholder="Search components..." />
              <InputGroupButton>Search</InputGroupButton>
            </InputGroup>
          </PreviewField>
          <PreviewField label="Website">
            <InputGroup>
              <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
              <InputGroupInput defaultValue="neumorphism.local" />
            </InputGroup>
          </PreviewField>
          <PreviewField label="Message">
            <InputGroup className="items-end rounded-[var(--neu-radius-surface)]">
              <InputGroupTextarea placeholder="Write a short note..." />
              <InputGroupButton>Send</InputGroupButton>
            </InputGroup>
          </PreviewField>
        </PreviewStack>
      );

    case "label":
      return (
        <PreviewStack>
          <PreviewField label="레이블은 클릭 영역을 연결합니다.">
            <Label htmlFor="docs-label-email">이메일 주소</Label>
            <Input id="docs-label-email" type="email" placeholder="name@company.com" />
          </PreviewField>
          <Label className="component-preview-choice" htmlFor="docs-label-switch">
            <Switch id="docs-label-switch" defaultChecked />
            주간 리포트 받기
          </Label>
        </PreviewStack>
      );

    case "pagination":
      return (
        <Pagination>
          <PaginationContent>
            <PaginationItem className="component-preview-pagination-wide">
              <PaginationPrevious href="#pagination-example" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#pagination-example">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#pagination-example" isActive>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#pagination-example">3</PaginationLink>
            </PaginationItem>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
            <PaginationItem className="component-preview-pagination-wide">
              <PaginationNext href="#pagination-example" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );

    case "progress":
      return (
        <PreviewStack>
          <div className="component-preview-progress">
            <div><span>Registry build</span><strong>82%</strong></div>
            <Progress aria-label="Registry build" value={82} />
          </div>
          <div className="component-preview-progress">
            <div><span>Theme tokens</span><strong>12 / 16</strong></div>
            <Progress aria-label="Theme tokens" max={16} value={12} />
          </div>
          <div className="component-preview-progress">
            <div><span>Waiting for data</span><strong>—</strong></div>
            <Progress aria-label="Waiting for data" value={null} />
          </div>
        </PreviewStack>
      );

    case "radio-group":
      return (
        <RadioGroup defaultValue="comfortable" aria-label="Interface density">
          <Label className="component-preview-choice-card" htmlFor="density-compact-doc">
            <RadioGroupItem id="density-compact-doc" value="compact" />
            <span><strong>Compact</strong><small>한 화면에 더 많은 정보를 표시합니다.</small></span>
          </Label>
          <Label className="component-preview-choice-card" htmlFor="density-comfortable-doc">
            <RadioGroupItem id="density-comfortable-doc" value="comfortable" />
            <span><strong>Comfortable</strong><small>기본 간격과 부드러운 깊이를 사용합니다.</small></span>
          </Label>
          <Label className="component-preview-choice-card" htmlFor="density-spacious-doc">
            <RadioGroupItem id="density-spacious-doc" value="spacious" />
            <span><strong>Spacious</strong><small>터치 환경에 넉넉한 간격을 제공합니다.</small></span>
          </Label>
        </RadioGroup>
      );

    case "scroll-area":
      return (
        <ScrollArea className="component-preview-scroll-area">
          {[
            ["NVDA", "Accessibility", "Ready"],
            ["Dialog", "Overlay", "Ready"],
            ["Data table", "Data", "Review"],
            ["Slider", "Input", "Ready"],
            ["Tooltip", "Overlay", "Ready"],
            ["Calendar", "Composite", "Planned"],
            ["Command", "Composite", "Planned"],
          ].map(([name, category, state]) => (
            <div className="component-preview-scroll-row" key={name}>
              <span><strong>{name}</strong><small>{category}</small></span>
              <Badge variant={state === "Ready" ? "primary" : "soft"}>{state}</Badge>
            </div>
          ))}
        </ScrollArea>
      );

    case "select":
      return (
        <PreviewStack>
          <PreviewField label="Region">
            <Select defaultValue="kr">
              <SelectGroup label="Asia Pacific">
                <SelectItem value="kr">Seoul, Korea</SelectItem>
                <SelectItem value="jp">Tokyo, Japan</SelectItem>
                <SelectItem value="sg">Singapore</SelectItem>
              </SelectGroup>
              <SelectGroup label="North America">
                <SelectItem value="us-west">San Francisco, USA</SelectItem>
              </SelectGroup>
            </Select>
          </PreviewField>
          <PreviewField label="Disabled">
            <Select disabled defaultValue="locked">
              <SelectItem value="locked">관리자가 선택함</SelectItem>
            </Select>
          </PreviewField>
        </PreviewStack>
      );

    case "separator":
      return (
        <PreviewStack>
          <div className="component-preview-separator-copy">
            <strong>Neumorphism UI</strong>
            <span>Copy the source. Own the surface.</span>
          </div>
          <Separator />
          <div className="component-preview-row component-preview-separator-nav">
            <a href="#preview">Preview</a>
            <Separator decorative={false} orientation="vertical" />
            <a href="#installation">Installation</a>
            <Separator decorative={false} orientation="vertical" />
            <a href="#api-reference">API</a>
          </div>
        </PreviewStack>
      );

    case "skeleton":
      return (
        <div className="component-preview-skeleton-card" aria-label="콘텐츠 로딩 중">
          <Skeleton className="component-preview-skeleton-cover" />
          <div className="component-preview-skeleton-body">
            <div className="component-preview-row">
              <Skeleton className="component-preview-skeleton-avatar" />
              <div className="component-preview-skeleton-lines">
                <Skeleton className="component-preview-skeleton-title" />
                <Skeleton className="component-preview-skeleton-line" />
              </div>
            </div>
            <Skeleton className="component-preview-skeleton-line" />
            <Skeleton className="component-preview-skeleton-line component-preview-skeleton-short" />
          </div>
        </div>
      );

    case "slider":
      return (
        <PreviewStack>
          <div className="component-preview-progress">
            <div><span>Price range</span><strong>₩{sliderValue[0]}K – ₩{sliderValue[1]}K</strong></div>
            <Slider
              aria-label="Price range"
              max={100}
              min={0}
              step={1}
              value={sliderValue}
              onValueChange={setSliderValue}
            />
          </div>
          <div className="component-preview-row component-preview-slider-vertical">
            <Slider
              aria-label="Vertical volume"
              defaultValue={[60]}
              orientation="vertical"
            />
            <span>Vertical orientation</span>
          </div>
        </PreviewStack>
      );

    case "switch":
      return (
        <PreviewStack compact>
          <Label className="component-preview-setting" htmlFor="docs-switch-live">
            <span><strong>실시간 가격</strong><small>시장 가격을 자동으로 갱신합니다.</small></span>
            <Switch
              id="docs-switch-live"
              checked={switchValue}
              onCheckedChange={setSwitchValue}
            />
          </Label>
          <Label className="component-preview-setting" htmlFor="docs-switch-email">
            <span><strong>이메일 알림</strong><small>중요한 변동만 받아봅니다.</small></span>
            <Switch id="docs-switch-email" />
          </Label>
          <Label className="component-preview-setting" htmlFor="docs-switch-locked">
            <span><strong>관리자 정책</strong><small>현재 워크스페이스에서 잠겨 있습니다.</small></span>
            <Switch id="docs-switch-locked" disabled />
          </Label>
        </PreviewStack>
      );

    case "table":
      return (
        <Table>
          <TableCaption>관심 종목 · 10분 지연 데이터</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Change</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell><strong>NVDA</strong></TableCell>
              <TableCell>$181.92</TableCell>
              <TableCell className="component-preview-positive">+2.41%</TableCell>
              <TableCell><Badge variant="primary">Open</Badge></TableCell>
            </TableRow>
            <TableRow data-state="selected">
              <TableCell><strong>005930</strong></TableCell>
              <TableCell>₩72,400</TableCell>
              <TableCell className="component-preview-positive">+1.08%</TableCell>
              <TableCell><Badge variant="soft">Selected</Badge></TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>TSLA</strong></TableCell>
              <TableCell>$318.27</TableCell>
              <TableCell className="component-preview-negative">−0.64%</TableCell>
              <TableCell><Badge variant="outline">Watch</Badge></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

    case "tabs":
      return (
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="component-preview-tab-panel">
            <span className="component-preview-caption">PORTFOLIO VALUE</span>
            <strong>₩18,420,000</strong>
            <small>이번 달 +6.8%</small>
          </TabsContent>
          <TabsContent value="activity" className="component-preview-tab-panel">
            최근 7일 동안 12개의 거래와 4개의 가격 알림이 있었습니다.
          </TabsContent>
          <TabsContent value="settings" className="component-preview-tab-panel">
            계좌 동기화와 알림 설정을 이 영역에 구성할 수 있습니다.
          </TabsContent>
        </Tabs>
      );

    case "textarea":
      return (
        <PreviewStack>
          <PreviewField label="Investment note">
            <Textarea
              defaultValue="실적 발표 이후 거래량과 지지선을 다시 확인한다."
              maxLength={240}
            />
          </PreviewField>
          <PreviewField label="Validation state">
            <Textarea aria-invalid defaultValue="너무 짧은 메모" />
          </PreviewField>
          <PreviewField label="Disabled">
            <Textarea disabled defaultValue="공유된 메모는 편집할 수 없습니다." />
          </PreviewField>
        </PreviewStack>
      );

    case "tooltip":
      return (
        <TooltipProvider delayDuration={100}>
          <div className="component-preview-row">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="soft" aria-label="관심 종목에 추가">+</Button>
              </TooltipTrigger>
              <TooltipContent side="top">관심 종목에 추가</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">Keyboard focus</Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Tab으로 이동해도 동일한 설명이 표시됩니다.
              </TooltipContent>
            </Tooltip>
            <span className="component-preview-hint">버튼에 hover하거나 focus하세요.</span>
          </div>
        </TooltipProvider>
      );

    default:
      return (
        <Alert variant="destructive">
          <AlertTitle>Preview not found</AlertTitle>
          <AlertDescription>{slug} 예제를 찾을 수 없습니다.</AlertDescription>
        </Alert>
      );
  }
}
