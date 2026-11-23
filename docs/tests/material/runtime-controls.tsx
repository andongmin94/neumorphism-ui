import * as React from "react";
import { createRoot } from "react-dom/client";
import type { Locale } from "@daypicker/react";
import { faIR, th } from "@daypicker/react/locale";
import { CmsWorkspace, type CmsPost } from "../../src/registry/components/blocks/cms";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "../../src/registry/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from "@/components/ui/toolbar";
import { buildThemeVariables, defaultThemeSettings } from "../../src/registry/theme";
import "./styles.css";

const savedPost: CmsPost = { id: "saved-post", title: "Saved post", summary: "Saved summary", body: "Saved body", status: "draft" };

function SaveFixture() {
  const complete = React.useRef<(() => void) | null>(null);
  const [persisted, setPersisted] = React.useState("none");
  const empty = new URLSearchParams(location.search).has("empty");
  return <section data-testid="cms-fixture" className="grid gap-4">
    <CmsWorkspace initialPosts={empty ? [] : [savedPost]} onSave={async post => {
      await new Promise<void>(resolve => { complete.current = resolve; });
      setPersisted(post.title);
    }} />
    <Button onClick={() => complete.current?.()}>Complete pending save</Button>
    <output data-testid="persisted-title">{persisted}</output>
  </section>;
}

function KeyboardCarousel({ orientation, direction = "ltr" }: { orientation: "horizontal" | "vertical"; direction?: "ltr" | "rtl" }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [index, setIndex] = React.useState(0);
  const [preventNavigation, setPreventNavigation] = React.useState(false);
  const [clicks, setClicks] = React.useState({ previous: 0, next: 0 });
  const recordClick = (event: React.MouseEvent<HTMLButtonElement>, direction: "previous" | "next") => {
    setClicks(current => ({ ...current, [direction]: current[direction] + 1 }));
    if (preventNavigation) event.preventDefault();
  };
  React.useEffect(() => {
    if (!api) return;
    const update = () => setIndex(api.selectedScrollSnap());
    api.on("select", update);
    return () => { api.off("select", update); };
  }, [api]);
  return <section data-testid={`carousel-${orientation}${direction === "rtl" ? "-rtl" : ""}`} dir={direction} className="grid min-w-0 gap-4">
    <label><input type="checkbox" checked={preventNavigation} onChange={event => setPreventNavigation(event.target.checked)} />Prevent carousel navigation</label>
    <output aria-label="Current slide">{index}</output>
    <output aria-label="Navigation clicks">{JSON.stringify(clicks)}</output>
    <Carousel aria-label={`${orientation} workspace`} tabIndex={0} orientation={orientation} opts={{ direction }} setApi={setApi} onKeyDown={event => { if (preventNavigation) event.preventDefault(); }} className={orientation === "vertical" ? "h-[32rem]" : "w-full"}>
      <CarouselContent className={orientation === "vertical" ? "h-[32rem]" : ""}>
        <CarouselItem><div className="grid min-w-0 gap-6 p-12">
          <Input aria-label="Slide input" defaultValue="ABCDE" />
          <Textarea aria-label="Slide notes" defaultValue="ABCDE" />
          <div role="textbox" aria-label="Editable slide text" contentEditable suppressContentEditableWarning>ABCDE</div>
          <Slider defaultValue={[25]} thumbLabels={["Slide amount"]} />
          <Carousel aria-label="Nested slides" tabIndex={0} opts={{ direction }} className="w-full max-w-52">
            <CarouselContent><CarouselItem><p className="p-3">Nested one</p></CarouselItem><CarouselItem><p className="p-3">Nested two</p></CarouselItem></CarouselContent>
            <CarouselPrevious label="Nested previous" /><CarouselNext label="Nested next" />
          </Carousel>
        </div></CarouselItem>
        <CarouselItem><p className="p-12">Second slide</p></CarouselItem>
      </CarouselContent>
      <CarouselPrevious onClick={event => recordClick(event, "previous")}>
        {orientation === "horizontal" ? <span data-testid="custom-previous" aria-hidden="true">Back</span> : undefined}
      </CarouselPrevious>
      <CarouselNext onClick={event => recordClick(event, "next")}>
        {orientation === "horizontal" ? <svg data-testid="custom-next" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 12h16m-6-6 6 6-6 6" /></svg> : undefined}
      </CarouselNext>
    </Carousel>
  </section>;
}

function ResizableHandles() {
  return <section className="grid gap-4">
    {[false, true].flatMap(withHandle => [false, true].map(custom => (
      <ResizablePanelGroup key={`${withHandle}-${custom}`} data-testid={`resizable-${withHandle}-${custom}`} className="h-24">
        <ResizablePanel defaultSize="50%">List</ResizablePanel>
        <ResizableHandle aria-label="Resize panels" withHandle={withHandle}>
          {custom ? <span data-testid="custom-handle" aria-hidden="true">↔</span> : undefined}
        </ResizableHandle>
        <ResizablePanel defaultSize="50%">Details</ResizablePanel>
      </ResizablePanelGroup>
    )))}
  </section>;
}

function OrientedToolbars() {
  return <section className="grid gap-4">
    {(["horizontal", "vertical"] as const).map(orientation => (
      <Toolbar key={orientation} orientation={orientation} aria-label={`${orientation} actions`}>
        <ToolbarGroup>
          <ToolbarButton>First action</ToolbarButton>
          <ToolbarButton>Second action</ToolbarButton>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarButton>Third action</ToolbarButton>
      </Toolbar>
    ))}
  </section>;
}

function CodePlaceholder() {
  return <section data-testid="otp-placeholder">
    <InputOTP maxLength={4} placeholder="1234" aria-label="Verification code">
      <InputOTPGroup>
        {[0, 1, 2, 3].map(index => <InputOTPSlot key={index} index={index} />)}
      </InputOTPGroup>
    </InputOTP>
  </section>;
}

function CodePasteFixture({ readOnly }: { readOnly: boolean }) {
  const [value, setValue] = React.useState("1234");
  const [changes, setChanges] = React.useState(0);
  const [captures, setCaptures] = React.useState(0);
  return <section data-testid={readOnly ? "otp-readonly-paste" : "otp-editable-paste"} className="grid gap-3">
    <InputOTP maxLength={4} value={value} readOnly={readOnly} aria-label={readOnly ? "Read-only verification code" : "Editable verification code"}
      pasteTransformer={text => text.replaceAll("-", "")}
      onPasteCapture={() => setCaptures(current => current + 1)}
      onChange={next => { setValue(next); setChanges(current => current + 1); }}>
      <InputOTPGroup>{[0, 1, 2, 3].map(index => <InputOTPSlot key={index} index={index} />)}</InputOTPGroup>
    </InputOTP>
    <output data-testid="paste-captures">{captures}</output>
    <output data-testid="code-changes">{changes}</output>
  </section>;
}

function LocalizedDatePicker({ locale, label }: { locale: Locale; label: string }) {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 10, 23));
  return <form data-testid={`date-picker-${locale.code}`} className="max-w-sm" onSubmit={event => event.preventDefault()}>
    <DatePicker label={label} name="date" value={date} onValueChange={setDate} locale={locale} />
  </form>;
}

function RuntimeControls() {
  React.useLayoutEffect(() => {
    const mode = new URLSearchParams(location.search).get("mode") === "dark" ? "dark" : "light";
    for (const [name, value] of Object.entries(buildThemeVariables(defaultThemeSettings, mode))) document.documentElement.style.setProperty(name, value);
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, []);
  return <main className="mx-auto grid max-w-5xl gap-12 p-5"><h1>Runtime composition regressions</h1><SaveFixture /><KeyboardCarousel orientation="horizontal" /><KeyboardCarousel orientation="vertical" /><KeyboardCarousel orientation="horizontal" direction="rtl" /><KeyboardCarousel orientation="vertical" direction="rtl" /><ResizableHandles /><OrientedToolbars /><CodePlaceholder /><CodePasteFixture readOnly /><CodePasteFixture readOnly={false} /><LocalizedDatePicker locale={faIR} label="Persian date" /><LocalizedDatePicker locale={th} label="Thai date" /></main>;
}

createRoot(document.getElementById("root")!).render(<RuntimeControls />);
