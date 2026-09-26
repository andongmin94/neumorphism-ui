"use client";

import * as React from "react";

import type { ShowcaseMessages } from "@/i18n/showcase-messages";
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
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@neumorphism-ui/registry/ui/avatar";
import { Badge } from "@neumorphism-ui/registry/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@neumorphism-ui/registry/ui/breadcrumb";
import { Button } from "@neumorphism-ui/registry/ui/button";
import { Checkbox } from "@neumorphism-ui/registry/ui/checkbox";
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
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@neumorphism-ui/registry/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
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
import { Select, SelectItem } from "@neumorphism-ui/registry/ui/select";
import { Slider } from "@neumorphism-ui/registry/ui/slider";
import { Switch } from "@neumorphism-ui/registry/ui/switch";
import {
  Table,
  TableBody,
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

function ShowcaseHeader({
  description,
  title,
}: {
  description: string;
  title: string;
}) {
  return (
    <header className="showcase-header">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </header>
  );
}

export function RegistryShowcase({ copy }: { copy: ShowcaseMessages }) {
  const [showDepthGrid, setShowDepthGrid] = React.useState(true);
  const [volume, setVolume] = React.useState(64);

  return (
    <section className="registry-showcase" aria-label={copy.ariaLabel}>
      <article className="showcase-card showcase-card-wide">
        <ShowcaseHeader
          title={copy.form.title}
          description={copy.form.description}
        />
        <div className="showcase-surface form-showcase-grid">
          <div className="showcase-field showcase-field-wide">
            <Label htmlFor="showcase-search">{copy.form.workspace}</Label>
            <InputGroup>
              <InputGroupAddon aria-hidden="true"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg></InputGroupAddon>
              <InputGroupInput id="showcase-search" defaultValue="soft-interface" />
              <InputGroupButton>{copy.form.search}</InputGroupButton>
            </InputGroup>
          </div>

          <div className="showcase-field">
            <Label htmlFor="showcase-role">{copy.form.role}</Label>
            <Select id="showcase-role" defaultValue="designer">
              <SelectItem value="designer">{copy.form.designer}</SelectItem>
              <SelectItem value="developer">{copy.form.developer}</SelectItem>
              <SelectItem value="founder">{copy.form.founder}</SelectItem>
            </Select>
          </div>

          <div className="showcase-field">
            <Label id="showcase-density-label">{copy.form.density}</Label>
            <RadioGroup
              aria-labelledby="showcase-density-label"
              defaultValue="comfortable"
              orientation="horizontal"
            >
              <Label className="choice-row" htmlFor="density-compact">
                <RadioGroupItem id="density-compact" value="compact" />
                {copy.form.compact}
              </Label>
              <Label className="choice-row" htmlFor="density-comfortable">
                <RadioGroupItem id="density-comfortable" value="comfortable" />
                {copy.form.comfortable}
              </Label>
            </RadioGroup>
          </div>

          <div className="showcase-field">
            <div className="field-heading">
              <Label id="showcase-volume-label">
                {copy.form.depthIntensity}
              </Label>
              <output>{volume}%</output>
            </div>
            <Slider
              aria-labelledby="showcase-volume-label"
              thumbLabels={[copy.form.depthIntensity]}
              value={[volume]}
              onValueChange={(nextValue) => {
                setVolume(
                  Array.isArray(nextValue)
                    ? (nextValue[0] ?? 0)
                    : nextValue,
                );
              }}
            />
          </div>

          <div className="showcase-field choice-stack">
            <Label className="choice-row" htmlFor="showcase-notifications">
              <Checkbox id="showcase-notifications" defaultChecked />
              {copy.form.productUpdates}
            </Label>
            <Label className="choice-row choice-row-between" htmlFor="showcase-dark-sync">
              {copy.form.followSystemTheme}
              <Switch id="showcase-dark-sync" defaultChecked />
            </Label>
          </div>

          <div className="showcase-field showcase-field-wide">
            <Label htmlFor="showcase-note">{copy.form.note}</Label>
            <Textarea
              id="showcase-note"
              defaultValue={copy.form.noteValue}
            />
          </div>
        </div>
      </article>

      <article className="showcase-card">
        <ShowcaseHeader
          title={copy.navigation.title}
          description={copy.navigation.description}
        />
        <div className="showcase-surface navigation-showcase">
          <Breadcrumb aria-label={copy.navigation.breadcrumb}>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#component-index">
                  {copy.navigation.registry}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#component-index">
                  {copy.navigation.components}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{copy.navigation.tabs}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Tabs defaultValue="surface">
            <TabsList>
              <TabsTrigger value="surface">
                {copy.navigation.surface}
              </TabsTrigger>
              <TabsTrigger value="motion">
                {copy.navigation.motion}
              </TabsTrigger>
              <TabsTrigger value="access">
                {copy.navigation.access}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="surface" className="tab-demo-panel">
              {copy.navigation.surfaceDescription}
            </TabsContent>
            <TabsContent value="motion" className="tab-demo-panel">
              {copy.navigation.motionDescription}
            </TabsContent>
            <TabsContent value="access" className="tab-demo-panel">
              {copy.navigation.accessDescription}
            </TabsContent>
          </Tabs>

          <Pagination aria-label={copy.navigation.pagination}>
            <PaginationContent>
              <PaginationItem className="pagination-desktop-only">
                <PaginationPrevious
                  aria-label={copy.navigation.previousPage}
                  href="#component-index"
                >
                  {copy.navigation.previous}
                </PaginationPrevious>
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
                <PaginationNext
                  aria-label={copy.navigation.nextPage}
                  href="#component-index"
                >
                  {copy.navigation.next}
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </article>

      <article className="showcase-card">
        <ShowcaseHeader
          title={copy.feedback.title}
          description={copy.feedback.description}
        />
        <div className="showcase-surface feedback-showcase">
          <Alert variant="success">
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4 4L19 6" /></svg>
            <AlertTitle>{copy.feedback.registryConnected}</AlertTitle>
            <AlertDescription>
              {copy.feedback.registryDescription}
            </AlertDescription>
          </Alert>

          <div className="progress-demo">
            <div className="field-heading">
              <span>{copy.feedback.themeSetup}</span>
              <strong>72%</strong>
            </div>
            <Progress
              aria-label={copy.feedback.themeSetupProgress}
              value={72}
            />
          </div>

          <div className="avatar-demo-row">
            <AvatarGroup>
              <Avatar size="lg"><AvatarFallback>AM</AvatarFallback></Avatar>
              <Avatar size="lg"><AvatarFallback>UI</AvatarFallback></Avatar>
              <Avatar size="lg"><AvatarFallback>NE</AvatarFallback></Avatar>
              <AvatarGroupCount aria-label={copy.feedback.additionalMembers}>
                +8
              </AvatarGroupCount>
            </AvatarGroup>
            <div>
              <strong>{copy.feedback.designSystems}</strong>
              <span>{copy.feedback.sharedSurfaceTokens}</span>
            </div>
          </div>
        </div>
      </article>

      <article className="showcase-card showcase-card-wide">
        <ShowcaseHeader
          title={copy.actions.title}
          description={copy.actions.description}
        />
        <div className="showcase-surface overlay-showcase">
          <div className="overlay-actions">
            <Dialog>
              <DialogTrigger render={<Button variant="primary" />}>
                {copy.actions.openDialog}
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{copy.actions.dialogTitle}</DialogTitle>
                  <DialogDescription>
                    {copy.actions.dialogDescription}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose render={<Button variant="soft" />}>
                    {copy.actions.cancel}
                  </DialogClose>
                  <DialogClose render={<Button variant="primary" />}>
                    {copy.actions.create}
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="soft" />}>
                {copy.actions.openMenu}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>{copy.actions.workspace}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    {copy.actions.duplicate}{" "}
                    <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuCheckboxItem
                    checked={showDepthGrid}
                    onCheckedChange={setShowDepthGrid}
                  >
                    {copy.actions.showDepthGrid}
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuItem variant="destructive">
                    {copy.actions.delete}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{copy.actions.component}</TableHead>
                <TableHead>{copy.actions.category}</TableHead>
                <TableHead>{copy.actions.status}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">Dialog</TableCell>
                <TableCell>{copy.actions.overlay}</TableCell>
                <TableCell>
                  <Badge variant="primary">{copy.actions.ready}</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Table</TableCell>
                <TableCell>{copy.actions.data}</TableCell>
                <TableCell>
                  <Badge variant="soft">{copy.actions.ready}</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Dropdown menu</TableCell>
                <TableCell>{copy.actions.navigation}</TableCell>
                <TableCell>
                  <Badge variant="soft">{copy.actions.ready}</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Accordion>
            <AccordionItem value="install">
              <AccordionTrigger>
                {copy.actions.accordionQuestion}
              </AccordionTrigger>
              <AccordionContent>
                {copy.actions.accordionAnswer}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </article>
    </section>
  );
}
