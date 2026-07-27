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
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/registry/src/components/ui/avatar";
import { Badge } from "@/registry/src/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/src/components/ui/breadcrumb";
import { Button } from "@/registry/src/components/ui/button";
import { Checkbox } from "@/registry/src/components/ui/checkbox";
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
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/registry/src/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
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
import { Select, SelectItem } from "@/registry/src/components/ui/select";
import { Slider } from "@/registry/src/components/ui/slider";
import { Switch } from "@/registry/src/components/ui/switch";
import {
  Table,
  TableBody,
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

function ShowcaseHeader({
  category,
  description,
  title,
}: {
  category: string;
  description: string;
  title: string;
}) {
  return (
    <header className="showcase-header">
      <div>
        <span className="catalog-kicker">{category}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <Badge variant="soft">Live</Badge>
    </header>
  );
}

export function RegistryShowcase() {
  const [showDepthGrid, setShowDepthGrid] = React.useState(true);
  const [volume, setVolume] = React.useState(64);

  return (
    <section className="registry-showcase site-shell" aria-label="컴포넌트 실시간 미리보기">
      <article className="showcase-card showcase-card-wide">
        <ShowcaseHeader
          category="FORM / SELECTION"
          title="입력과 선택"
          description="폼 컨트롤도 같은 광원, 같은 눌림 깊이를 공유합니다."
        />
        <div className="showcase-surface form-showcase-grid">
          <div className="showcase-field showcase-field-wide">
            <Label htmlFor="showcase-search">Workspace</Label>
            <InputGroup>
              <InputGroupAddon aria-hidden="true">⌕</InputGroupAddon>
              <InputGroupInput id="showcase-search" defaultValue="soft-interface" />
              <InputGroupButton>Search</InputGroupButton>
            </InputGroup>
          </div>

          <div className="showcase-field">
            <Label htmlFor="showcase-role">Role</Label>
            <Select id="showcase-role" defaultValue="designer">
              <SelectItem value="designer">Designer</SelectItem>
              <SelectItem value="developer">Developer</SelectItem>
              <SelectItem value="founder">Founder</SelectItem>
            </Select>
          </div>

          <div className="showcase-field">
            <Label id="showcase-density-label">Density</Label>
            <RadioGroup
              aria-labelledby="showcase-density-label"
              defaultValue="comfortable"
              orientation="horizontal"
            >
              <Label className="choice-row" htmlFor="density-compact">
                <RadioGroupItem id="density-compact" value="compact" />
                Compact
              </Label>
              <Label className="choice-row" htmlFor="density-comfortable">
                <RadioGroupItem id="density-comfortable" value="comfortable" />
                Comfort
              </Label>
            </RadioGroup>
          </div>

          <div className="showcase-field">
            <div className="field-heading">
              <Label htmlFor="showcase-volume">Depth intensity</Label>
              <output>{volume}%</output>
            </div>
            <Slider
              id="showcase-volume"
              value={[volume]}
              onValueChange={([nextValue]) => setVolume(nextValue)}
            />
          </div>

          <div className="showcase-field choice-stack">
            <Label className="choice-row" htmlFor="showcase-notifications">
              <Checkbox id="showcase-notifications" defaultChecked />
              Product updates
            </Label>
            <Label className="choice-row choice-row-between" htmlFor="showcase-dark-sync">
              Follow system theme
              <Switch id="showcase-dark-sync" defaultChecked />
            </Label>
          </div>

          <div className="showcase-field showcase-field-wide">
            <Label htmlFor="showcase-note">Note</Label>
            <Textarea
              id="showcase-note"
              defaultValue="Soft surfaces should still feel clear, fast, and accessible."
            />
          </div>
        </div>
      </article>

      <article className="showcase-card">
        <ShowcaseHeader
          category="NAVIGATION"
          title="계층과 이동"
          description="현재 위치와 다음 행동을 깊이 차이로 구분합니다."
        />
        <div className="showcase-surface navigation-showcase">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#component-index">Registry</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#component-index">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Tabs</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Tabs defaultValue="surface">
            <TabsList>
              <TabsTrigger value="surface">Surface</TabsTrigger>
              <TabsTrigger value="motion">Motion</TabsTrigger>
              <TabsTrigger value="access">Access</TabsTrigger>
            </TabsList>
            <TabsContent value="surface" className="tab-demo-panel">
              Raised, inset, flat 세 단계로 정보 계층을 만듭니다.
            </TabsContent>
            <TabsContent value="motion" className="tab-demo-panel">
              짧은 전환으로 표면의 물성을 보존합니다.
            </TabsContent>
            <TabsContent value="access" className="tab-demo-panel">
              키보드 포커스와 명시적인 테두리를 유지합니다.
            </TabsContent>
          </Tabs>

          <Pagination>
            <PaginationContent>
              <PaginationItem className="pagination-desktop-only">
                <PaginationPrevious href="#component-index" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#component-index" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#component-index">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem className="pagination-desktop-only">
                <PaginationNext href="#component-index" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </article>

      <article className="showcase-card">
        <ShowcaseHeader
          category="FEEDBACK"
          title="상태와 진행"
          description="색상만이 아니라 테두리와 깊이로 상태를 전달합니다."
        />
        <div className="showcase-surface feedback-showcase">
          <Alert variant="success">
            <span aria-hidden="true">✓</span>
            <AlertTitle>Registry connected</AlertTitle>
            <AlertDescription>26개 컴포넌트를 선택해서 설치할 수 있습니다.</AlertDescription>
          </Alert>

          <div className="progress-demo">
            <div className="field-heading">
              <span>Theme setup</span>
              <strong>72%</strong>
            </div>
            <Progress aria-label="Theme setup progress" value={72} />
          </div>

          <div className="avatar-demo-row">
            <AvatarGroup>
              <Avatar size="lg"><AvatarFallback>AM</AvatarFallback></Avatar>
              <Avatar size="lg"><AvatarFallback>UI</AvatarFallback></Avatar>
              <Avatar size="lg"><AvatarFallback>NE</AvatarFallback></Avatar>
              <AvatarGroupCount>+8</AvatarGroupCount>
            </AvatarGroup>
            <div>
              <strong>Design systems</strong>
              <span>Shared surface tokens</span>
            </div>
          </div>
        </div>
      </article>

      <article className="showcase-card showcase-card-wide">
        <ShowcaseHeader
          category="OVERLAY / DATA"
          title="행동과 데이터"
          description="오버레이는 접근 가능한 포커스 동작을, 표는 선명한 구조를 제공합니다."
        />
        <div className="showcase-surface overlay-showcase">
          <div className="overlay-actions">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="primary">Open dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a soft surface</DialogTitle>
                  <DialogDescription>
                    Registry source를 설치한 뒤 프로젝트 안에서 직접 수정할 수 있습니다.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="soft">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="primary">Create</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="soft">Open menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Workspace</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Duplicate <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
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
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Component</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">Dialog</TableCell>
                <TableCell>Overlay</TableCell>
                <TableCell><Badge variant="primary">Ready</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Table</TableCell>
                <TableCell>Data</TableCell>
                <TableCell><Badge variant="soft">Ready</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Dropdown menu</TableCell>
                <TableCell>Navigation</TableCell>
                <TableCell><Badge variant="soft">Ready</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Accordion type="single" collapsible>
            <AccordionItem value="install">
              <AccordionTrigger>각 컴포넌트는 따로 설치되나요?</AccordionTrigger>
              <AccordionContent>
                네. 필요한 항목만 CLI로 가져오며 소스는 프로젝트 안에 남습니다.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </article>
    </section>
  );
}
