import * as React from "react";
import { createRoot } from "react-dom/client";
import { CmsWorkspace, type CmsPost } from "../../src/registry/components/blocks/cms";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "../../src/registry/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
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

function KeyboardCarousel({ orientation }: { orientation: "horizontal" | "vertical" }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [index, setIndex] = React.useState(0);
  const [preventNavigation, setPreventNavigation] = React.useState(false);
  React.useEffect(() => {
    if (!api) return;
    const update = () => setIndex(api.selectedScrollSnap());
    api.on("select", update);
    return () => { api.off("select", update); };
  }, [api]);
  return <section data-testid={`carousel-${orientation}`} className="grid min-w-0 gap-4">
    <label><input type="checkbox" checked={preventNavigation} onChange={event => setPreventNavigation(event.target.checked)} />Prevent carousel navigation</label>
    <output aria-label="Current slide">{index}</output>
    <Carousel aria-label={`${orientation} workspace`} tabIndex={0} orientation={orientation} setApi={setApi} onKeyDown={event => { if (preventNavigation) event.preventDefault(); }} className={orientation === "vertical" ? "h-[32rem]" : "w-full"}>
      <CarouselContent className={orientation === "vertical" ? "h-[32rem]" : ""}>
        <CarouselItem><div className="grid min-w-0 gap-6 p-12">
          <Input aria-label="Slide input" defaultValue="ABCDE" />
          <Textarea aria-label="Slide notes" defaultValue="ABCDE" />
          <div role="textbox" aria-label="Editable slide text" contentEditable suppressContentEditableWarning>ABCDE</div>
          <Slider defaultValue={[25]} thumbLabels={["Slide amount"]} />
          <Carousel aria-label="Nested slides" tabIndex={0} className="w-full max-w-52">
            <CarouselContent><CarouselItem><p className="p-3">Nested one</p></CarouselItem><CarouselItem><p className="p-3">Nested two</p></CarouselItem></CarouselContent>
            <CarouselPrevious label="Nested previous" /><CarouselNext label="Nested next" />
          </Carousel>
        </div></CarouselItem>
        <CarouselItem><p className="p-12">Second slide</p></CarouselItem>
      </CarouselContent>
      <CarouselPrevious /><CarouselNext />
    </Carousel>
  </section>;
}

function RuntimeControls() {
  React.useLayoutEffect(() => {
    const mode = new URLSearchParams(location.search).get("mode") === "dark" ? "dark" : "light";
    for (const [name, value] of Object.entries(buildThemeVariables(defaultThemeSettings, mode))) document.documentElement.style.setProperty(name, value);
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, []);
  return <main className="mx-auto grid max-w-5xl gap-12 p-5"><h1>Runtime composition regressions</h1><SaveFixture /><KeyboardCarousel orientation="horizontal" /><KeyboardCarousel orientation="vertical" /></main>;
}

createRoot(document.getElementById("root")!).render(<RuntimeControls />);
