"use client";

import * as React from "react";

import { localeHref, type Locale } from "@/i18n/config";
import type { ComponentPreviewMessages } from "@/i18n/component-preview-messages";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@neumorphism-ui/registry/ui/accordion";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@neumorphism-ui/registry/ui/alert";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@neumorphism-ui/registry/ui/avatar";
import { Badge } from "@neumorphism-ui/registry/ui/badge";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@neumorphism-ui/registry/ui/breadcrumb";
import { Button } from "@neumorphism-ui/registry/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neumorphism-ui/registry/ui/card";
import {
  Checkbox,
  type CheckedState,
} from "@neumorphism-ui/registry/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@neumorphism-ui/registry/ui/dialog";
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
} from "@neumorphism-ui/registry/ui/dropdown-menu";
import { Input } from "@neumorphism-ui/registry/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@neumorphism-ui/registry/ui/input-group";
import { Label } from "@neumorphism-ui/registry/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@neumorphism-ui/registry/ui/pagination";
import { Progress } from "@neumorphism-ui/registry/ui/progress";
import {
  RadioGroup,
  RadioGroupItem,
} from "@neumorphism-ui/registry/ui/radio-group";
import { ScrollArea } from "@neumorphism-ui/registry/ui/scroll-area";
import {
  Select,
  SelectGroup,
  SelectItem,
} from "@neumorphism-ui/registry/ui/select";
import { Separator } from "@neumorphism-ui/registry/ui/separator";
import { Skeleton } from "@neumorphism-ui/registry/ui/skeleton";
import { Slider } from "@neumorphism-ui/registry/ui/slider";
import { Switch } from "@neumorphism-ui/registry/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@neumorphism-ui/registry/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@neumorphism-ui/registry/ui/tabs";
import { Textarea } from "@neumorphism-ui/registry/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@neumorphism-ui/registry/ui/tooltip";

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
  htmlFor,
  label,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  label: string;
}) {
  return (
    <div className="component-preview-field">
      {htmlFor ? (
        <Label
          className="component-preview-caption"
          htmlFor={htmlFor}
        >
          {label}
        </Label>
      ) : (
        <span>{label}</span>
      )}
      {children}
    </div>
  );
}

type ComponentDetailPreviewProps = {
  copy: ComponentPreviewMessages;
  locale: Locale;
  slug: string;
};

export function ComponentDetailPreview({
  copy,
  locale,
  slug,
}: ComponentDetailPreviewProps) {
  const [mixed, setMixed] = React.useState<CheckedState>("indeterminate");
  const [showDepthGrid, setShowDepthGrid] = React.useState(true);
  const [sliderValue, setSliderValue] = React.useState([32, 72]);
  const [switchValue, setSwitchValue] = React.useState(true);

  switch (slug) {
    case "accordion":
      return (
        <div className="component-preview-narrow">
          <Accordion defaultValue={["tokens"]}>
            <AccordionItem value="tokens">
              <AccordionTrigger>
                {copy.accordion.items[0].question}
              </AccordionTrigger>
              <AccordionContent>
                {copy.accordion.items[0].answer}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="source">
              <AccordionTrigger>
                {copy.accordion.items[1].question}
              </AccordionTrigger>
              <AccordionContent>
                {copy.accordion.items[1].answer}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="keyboard">
              <AccordionTrigger>
                {copy.accordion.items[2].question}
              </AccordionTrigger>
              <AccordionContent>
                {copy.accordion.items[2].answer}
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
            <AlertTitle>{copy.alert.newVersion}</AlertTitle>
            <AlertDescription>{copy.alert.newVersionBody}</AlertDescription>
          </Alert>
          <Alert variant="success">
            <span aria-hidden="true">✓</span>
            <AlertTitle>{copy.alert.synced}</AlertTitle>
            <AlertDescription>{copy.alert.syncedBody}</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <span aria-hidden="true">!</span>
            <AlertTitle>{copy.alert.missingTokens}</AlertTitle>
            <AlertDescription>{copy.alert.missingTokensBody}</AlertDescription>
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
            <span className="component-preview-caption">{copy.avatar.team}</span>
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
        <Breadcrumb aria-label={copy.breadcrumb.label}>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={localeHref(locale, "/components")}>
                Components
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={localeHref(locale, "/components")}>
                Navigation
              </BreadcrumbLink>
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
            <Button variant="destructive">{copy.button.delete}</Button>
          </div>
          <div className="component-preview-row component-preview-row-wrap">
            <Button size="sm">{copy.button.small}</Button>
            <Button>Default</Button>
            <Button size="lg">{copy.button.large}</Button>
            <Button size="icon" aria-label={copy.button.addItem}>+</Button>
            <Button disabled>{copy.button.disabled}</Button>
          </div>
        </PreviewStack>
      );

    case "card":
      return (
        <div className="component-preview-card-grid">
          <Card className="component-preview-card">
            <CardHeader>
              <CardTitle>{copy.card.marketOverview}</CardTitle>
              <CardDescription>{copy.card.marketOverviewBody}</CardDescription>
              <CardAction>
                <Badge variant="primary">{copy.card.live}</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="component-preview-metric">
                <strong>₩72,400</strong>
                <span>+2.41%</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="soft" className="w-full">
                {copy.card.details}
              </Button>
            </CardFooter>
          </Card>
          <Card className="component-preview-card" variant="inset">
            <CardHeader>
              <CardTitle>{copy.card.insetSurface}</CardTitle>
              <CardDescription>{copy.card.insetSurfaceBody}</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress aria-label={copy.card.portfolioTarget} value={68} />
            </CardContent>
          </Card>
        </div>
      );

    case "checkbox":
      return (
        <PreviewStack compact>
          <Label className="component-preview-choice" htmlFor="docs-checkbox-checked">
            <Checkbox id="docs-checkbox-checked" defaultChecked />
            {copy.checkbox.priceAlerts}
          </Label>
          <Label className="component-preview-choice" htmlFor="docs-checkbox-mixed">
            <Checkbox
              id="docs-checkbox-mixed"
              checked={mixed}
              onCheckedChange={setMixed}
            />
            {copy.checkbox.partialWorkspace}
          </Label>
          <Label className="component-preview-choice" htmlFor="docs-checkbox-disabled">
            <Checkbox id="docs-checkbox-disabled" disabled />
            {copy.checkbox.unavailable}
          </Label>
        </PreviewStack>
      );

    case "dialog":
      return (
        <div className="component-preview-row">
          <Dialog>
            <DialogTrigger render={<Button variant="primary" />}>
              {copy.dialog.editProfile}
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
              <DialogHeader>
                <DialogTitle>{copy.dialog.editProfile}</DialogTitle>
                <DialogDescription>{copy.dialog.description}</DialogDescription>
              </DialogHeader>
              <PreviewStack compact>
                <PreviewField htmlFor="docs-dialog-name" label={copy.dialog.name}>
                  <Input defaultValue="Andongmin" id="docs-dialog-name" />
                </PreviewField>
                <PreviewField
                  htmlFor="docs-dialog-username"
                  label={copy.dialog.username}
                >
                  <Input defaultValue="@softsurface" id="docs-dialog-username" />
                </PreviewField>
              </PreviewStack>
              <DialogFooter>
                <DialogClose render={<Button variant="soft" />}>
                  {copy.dialog.cancel}
                </DialogClose>
                <DialogClose render={<Button variant="primary" />}>
                  {copy.dialog.save}
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <span className="component-preview-hint">{copy.dialog.hint}</span>
        </div>
      );

    case "dropdown-menu":
      return (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="soft" />}>
            {copy.dropdown.workspaceMenu} <span aria-hidden="true">⌄</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>{copy.dropdown.workspace}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {copy.dropdown.newPage}{" "}
              <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>{copy.dropdown.duplicate}</DropdownMenuItem>
            <DropdownMenuCheckboxItem
              checked={showDepthGrid}
              onCheckedChange={setShowDepthGrid}
            >
              {copy.dropdown.showDepthGrid}
            </DropdownMenuCheckboxItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>{copy.dropdown.theme}</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup defaultValue="system">
                  <DropdownMenuRadioItem value="light">
                    {copy.dropdown.light}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    {copy.dropdown.dark}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">
                    {copy.dropdown.system}
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              {copy.dropdown.deleteWorkspace}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );

    case "input":
      return (
        <PreviewStack>
          <PreviewField htmlFor="docs-input-email" label={copy.input.email}>
            <Input
              id="docs-input-email"
              type="email"
              placeholder="you@example.com"
            />
          </PreviewField>
          <PreviewField
            htmlFor="docs-input-invalid"
            label={copy.input.invalid}
          >
            <Input
              aria-invalid
              defaultValue="wrong-address"
              id="docs-input-invalid"
            />
          </PreviewField>
          <PreviewField
            htmlFor="docs-input-disabled"
            label={copy.input.disabled}
          >
            <Input
              defaultValue={copy.input.readOnlyWorkspace}
              disabled
              id="docs-input-disabled"
            />
          </PreviewField>
        </PreviewStack>
      );

    case "input-group":
      return (
        <PreviewStack>
          <PreviewField
            htmlFor="docs-input-group-search"
            label={copy.inputGroup.search}
          >
            <InputGroup>
              <InputGroupAddon aria-hidden="true">⌕</InputGroupAddon>
              <InputGroupInput
                id="docs-input-group-search"
                placeholder={copy.inputGroup.searchPlaceholder}
              />
              <InputGroupButton>{copy.inputGroup.search}</InputGroupButton>
            </InputGroup>
          </PreviewField>
          <PreviewField
            htmlFor="docs-input-group-website"
            label={copy.inputGroup.website}
          >
            <InputGroup>
              <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
              <InputGroupInput
                defaultValue="neumorphism.local"
                id="docs-input-group-website"
              />
            </InputGroup>
          </PreviewField>
          <PreviewField
            htmlFor="docs-input-group-message"
            label={copy.inputGroup.message}
          >
            <InputGroup className="items-end rounded-[var(--neu-radius-surface)]">
              <InputGroupTextarea
                id="docs-input-group-message"
                placeholder={copy.inputGroup.messagePlaceholder}
              />
              <InputGroupButton>{copy.inputGroup.send}</InputGroupButton>
            </InputGroup>
          </PreviewField>
        </PreviewStack>
      );

    case "label":
      return (
        <PreviewStack>
          <PreviewField label={copy.label.caption}>
            <Label htmlFor="docs-label-email">{copy.label.email}</Label>
            <Input id="docs-label-email" type="email" placeholder="name@company.com" />
          </PreviewField>
          <Label className="component-preview-choice" htmlFor="docs-label-switch">
            <Switch id="docs-label-switch" defaultChecked />
            {copy.label.weeklyReport}
          </Label>
        </PreviewStack>
      );

    case "pagination":
      return (
        <Pagination aria-label={copy.pagination.label}>
          <PaginationContent>
            <PaginationItem className="component-preview-pagination-wide">
              <PaginationPrevious
                aria-label={copy.pagination.previousLabel}
                href="#pagination-example"
              >
                {copy.pagination.previous}
              </PaginationPrevious>
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
              <PaginationNext
                aria-label={copy.pagination.nextLabel}
                href="#pagination-example"
              >
                {copy.pagination.next}
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );

    case "progress":
      return (
        <PreviewStack>
          <div className="component-preview-progress">
            <div>
              <span>{copy.progress.registryBuild}</span>
              <strong>82%</strong>
            </div>
            <Progress aria-label={copy.progress.registryBuild} value={82} />
          </div>
          <div className="component-preview-progress">
            <div>
              <span>{copy.progress.themeTokens}</span>
              <strong>12 / 16</strong>
            </div>
            <Progress aria-label={copy.progress.themeTokens} max={16} value={12} />
          </div>
          <div className="component-preview-progress">
            <div>
              <span>{copy.progress.waiting}</span>
              <strong>—</strong>
            </div>
            <Progress aria-label={copy.progress.waiting} value={null} />
          </div>
        </PreviewStack>
      );

    case "radio-group":
      return (
        <RadioGroup defaultValue="comfortable" aria-label={copy.radio.label}>
          <Label className="component-preview-choice-card" htmlFor="density-compact-doc">
            <RadioGroupItem id="density-compact-doc" value="compact" />
            <span>
              <strong>{copy.radio.compact}</strong>
              <small>{copy.radio.compactBody}</small>
            </span>
          </Label>
          <Label className="component-preview-choice-card" htmlFor="density-comfortable-doc">
            <RadioGroupItem id="density-comfortable-doc" value="comfortable" />
            <span>
              <strong>{copy.radio.comfortable}</strong>
              <small>{copy.radio.comfortableBody}</small>
            </span>
          </Label>
          <Label className="component-preview-choice-card" htmlFor="density-spacious-doc">
            <RadioGroupItem id="density-spacious-doc" value="spacious" />
            <span>
              <strong>{copy.radio.spacious}</strong>
              <small>{copy.radio.spaciousBody}</small>
            </span>
          </Label>
        </RadioGroup>
      );

    case "scroll-area":
      return (
        <ScrollArea
          aria-label={copy.scrollArea.label}
          className="component-preview-scroll-area"
        >
          {[
            [
              "NVDA",
              copy.scrollArea.categories.accessibility,
              copy.scrollArea.statuses.ready,
              "ready",
            ],
            [
              "Dialog",
              copy.scrollArea.categories.overlay,
              copy.scrollArea.statuses.ready,
              "ready",
            ],
            [
              "Data table",
              copy.scrollArea.categories.data,
              copy.scrollArea.statuses.review,
              "review",
            ],
            [
              "Slider",
              copy.scrollArea.categories.input,
              copy.scrollArea.statuses.ready,
              "ready",
            ],
            [
              "Tooltip",
              copy.scrollArea.categories.overlay,
              copy.scrollArea.statuses.ready,
              "ready",
            ],
            [
              "Calendar",
              copy.scrollArea.categories.composite,
              copy.scrollArea.statuses.planned,
              "planned",
            ],
            [
              "Command",
              copy.scrollArea.categories.composite,
              copy.scrollArea.statuses.planned,
              "planned",
            ],
          ].map(([name, category, state, stateId]) => (
            <div className="component-preview-scroll-row" key={name}>
              <span><strong>{name}</strong><small>{category}</small></span>
              <Badge variant={stateId === "ready" ? "primary" : "soft"}>
                {state}
              </Badge>
            </div>
          ))}
        </ScrollArea>
      );

    case "select":
      return (
        <PreviewStack>
          <PreviewField
            htmlFor="docs-select-region"
            label={copy.select.region}
          >
            <Select defaultValue="kr" id="docs-select-region">
              <SelectGroup label={copy.select.asiaPacific}>
                <SelectItem value="kr">{copy.select.seoul}</SelectItem>
                <SelectItem value="jp">{copy.select.tokyo}</SelectItem>
                <SelectItem value="sg">{copy.select.singapore}</SelectItem>
              </SelectGroup>
              <SelectGroup label={copy.select.northAmerica}>
                <SelectItem value="us-west">
                  {copy.select.sanFrancisco}
                </SelectItem>
              </SelectGroup>
            </Select>
          </PreviewField>
          <PreviewField
            htmlFor="docs-select-disabled"
            label={copy.select.disabled}
          >
            <Select disabled defaultValue="locked" id="docs-select-disabled">
              <SelectItem value="locked">
                {copy.select.selectedByAdmin}
              </SelectItem>
            </Select>
          </PreviewField>
        </PreviewStack>
      );

    case "separator":
      return (
        <PreviewStack>
          <div className="component-preview-separator-copy">
            <strong>Neumorphism UI</strong>
            <span>{copy.separator.tagline}</span>
          </div>
          <Separator />
          <div className="component-preview-row component-preview-separator-nav">
            <a href="#preview">{copy.separator.preview}</a>
            <Separator decorative={false} orientation="vertical" />
            <a href="#installation">{copy.separator.installation}</a>
            <Separator decorative={false} orientation="vertical" />
            <a href="#api-reference">API</a>
          </div>
        </PreviewStack>
      );

    case "skeleton":
      return (
        <div
          className="component-preview-skeleton-card"
          aria-label={copy.skeleton.loading}
        >
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
            <div>
              <span>{copy.slider.priceRange}</span>
              <strong>₩{sliderValue[0]}K – ₩{sliderValue[1]}K</strong>
            </div>
            <Slider
              aria-label={copy.slider.priceRange}
              max={100}
              min={0}
              step={1}
              thumbLabels={[
                copy.slider.minimumPrice,
                copy.slider.maximumPrice,
              ]}
              value={sliderValue}
              onValueChange={(nextValue) => {
                setSliderValue(
                  Array.isArray(nextValue) ? [...nextValue] : [nextValue],
                );
              }}
            />
          </div>
          <div className="component-preview-row component-preview-slider-vertical">
            <Slider
              aria-label={copy.slider.verticalVolume}
              defaultValue={[60]}
              orientation="vertical"
              thumbLabels={[copy.slider.verticalVolume]}
            />
            <span>{copy.slider.verticalOrientation}</span>
          </div>
        </PreviewStack>
      );

    case "switch":
      return (
        <PreviewStack compact>
          <Label className="component-preview-setting" htmlFor="docs-switch-live">
            <span>
              <strong>{copy.switch.livePrices}</strong>
              <small>{copy.switch.livePricesBody}</small>
            </span>
            <Switch
              id="docs-switch-live"
              checked={switchValue}
              onCheckedChange={setSwitchValue}
            />
          </Label>
          <Label className="component-preview-setting" htmlFor="docs-switch-email">
            <span>
              <strong>{copy.switch.emailAlerts}</strong>
              <small>{copy.switch.emailAlertsBody}</small>
            </span>
            <Switch id="docs-switch-email" />
          </Label>
          <Label className="component-preview-setting" htmlFor="docs-switch-locked">
            <span>
              <strong>{copy.switch.adminPolicy}</strong>
              <small>{copy.switch.adminPolicyBody}</small>
            </span>
            <Switch id="docs-switch-locked" disabled />
          </Label>
        </PreviewStack>
      );

    case "table":
      return (
        <Table>
          <TableCaption>{copy.table.caption}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>{copy.table.symbol}</TableHead>
              <TableHead>{copy.table.price}</TableHead>
              <TableHead>{copy.table.change}</TableHead>
              <TableHead>{copy.table.status}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell><strong>NVDA</strong></TableCell>
              <TableCell>$181.92</TableCell>
              <TableCell className="component-preview-positive">+2.41%</TableCell>
              <TableCell>
                <Badge variant="primary">{copy.table.open}</Badge>
              </TableCell>
            </TableRow>
            <TableRow data-state="selected">
              <TableCell><strong>005930</strong></TableCell>
              <TableCell>₩72,400</TableCell>
              <TableCell className="component-preview-positive">+1.08%</TableCell>
              <TableCell>
                <Badge variant="soft">{copy.table.selected}</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>TSLA</strong></TableCell>
              <TableCell>$318.27</TableCell>
              <TableCell className="component-preview-negative">−0.64%</TableCell>
              <TableCell>
                <Badge variant="outline">{copy.table.watch}</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

    case "tabs":
      return (
        <Tabs defaultValue="overview">
          <TabsList aria-label={copy.tabs.label}>
            <TabsTrigger value="overview">{copy.tabs.overview}</TabsTrigger>
            <TabsTrigger value="activity">{copy.tabs.activity}</TabsTrigger>
            <TabsTrigger value="settings">{copy.tabs.settings}</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="component-preview-tab-panel">
            <span className="component-preview-caption">
              {copy.tabs.portfolioValue}
            </span>
            <strong>₩18,420,000</strong>
            <small>{copy.tabs.monthlyChange}</small>
          </TabsContent>
          <TabsContent value="activity" className="component-preview-tab-panel">
            {copy.tabs.activityBody}
          </TabsContent>
          <TabsContent value="settings" className="component-preview-tab-panel">
            {copy.tabs.settingsBody}
          </TabsContent>
        </Tabs>
      );

    case "textarea":
      return (
        <PreviewStack>
          <PreviewField
            htmlFor="docs-textarea-note"
            label={copy.textarea.investmentNote}
          >
            <Textarea
              defaultValue={copy.textarea.investmentNoteValue}
              id="docs-textarea-note"
              maxLength={240}
            />
          </PreviewField>
          <PreviewField
            htmlFor="docs-textarea-invalid"
            label={copy.textarea.validationState}
          >
            <Textarea
              aria-invalid
              defaultValue={copy.textarea.invalidValue}
              id="docs-textarea-invalid"
            />
          </PreviewField>
          <PreviewField
            htmlFor="docs-textarea-disabled"
            label={copy.textarea.disabled}
          >
            <Textarea
              defaultValue={copy.textarea.disabledValue}
              disabled
              id="docs-textarea-disabled"
            />
          </PreviewField>
        </PreviewStack>
      );

    case "tooltip":
      return (
        <TooltipProvider delay={100}>
          <div className="component-preview-row">
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    size="icon"
                    variant="soft"
                    aria-label={copy.tooltip.addToWatchlist}
                  />
                }
              >
                +
              </TooltipTrigger>
              <TooltipContent side="top">
                {copy.tooltip.addToWatchlist}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="ghost" />}>
                {copy.tooltip.keyboardFocus}
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {copy.tooltip.keyboardFocusBody}
              </TooltipContent>
            </Tooltip>
            <span className="component-preview-hint">{copy.tooltip.hint}</span>
          </div>
        </TooltipProvider>
      );

    default:
      return (
        <Alert variant="destructive">
          <AlertTitle>{copy.fallback.title}</AlertTitle>
          <AlertDescription>
            {copy.fallback.description.replace("{slug}", slug)}
          </AlertDescription>
        </Alert>
      );
  }
}
