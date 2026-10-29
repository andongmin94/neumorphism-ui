import * as React from "react";
import { createRoot } from "react-dom/client";
import { CmsWorkspace, type CmsPost } from "../../src/registry/components/blocks/cms";
import { Checkbox, type CheckedState } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { buildThemeVariables, defaultThemeSettings } from "../../src/registry/theme";
import "./styles.css";

const existingPost: CmsPost = {
  id: "local-post-1", title: "Previously persisted post", summary: "Original summary",
  body: "Original body", status: "draft",
};

function PersistedCms() {
  const [persisted, setPersisted] = React.useState<CmsPost[]>([existingPost]);
  const [mount, setMount] = React.useState(0);
  return <section data-testid="persisted-cms" className="grid gap-4">
    <CmsWorkspace key={mount} initialPosts={persisted} onSave={async post => {
      setPersisted(current => [...current.filter(item => item.id !== post.id), { ...post }]);
    }} />
    <Button onClick={() => setMount(current => current + 1)}>Reload persisted posts</Button>
    <pre data-testid="persisted-posts">{JSON.stringify(persisted)}</pre>
  </section>;
}

function RefControls() {
  const [mounted, setMounted] = React.useState(true);
  const [revision, setRevision] = React.useState(1);
  const [events, setEvents] = React.useState<string[]>([]);
  const [objectState, setObjectState] = React.useState("unread");
  const [mixed, setMixed] = React.useState<CheckedState>("indeterminate");
  const checkboxObject = React.useRef<HTMLInputElement>(null);
  const radioObject = React.useRef<HTMLDivElement>(null);
  const record = React.useCallback((event: string) => {
    setEvents(current => [...current, event]);
  }, []);
  const checkboxCallback = React.useMemo<React.RefCallback<HTMLInputElement>>(() => node => {
    record("checkbox:" + revision + (node ? ":setup" : ":null"));
    if (node) return () => { record("checkbox:" + revision + ":cleanup"); };
  }, [record, revision]);
  const radioCallback = React.useMemo<React.RefCallback<HTMLDivElement>>(() => node => {
    record("radio:" + revision + (node ? ":setup" : ":null"));
    if (node) return () => { record("radio:" + revision + ":cleanup"); };
  }, [record, revision]);
  const legacyCheckbox = React.useCallback((node: HTMLInputElement | null) => {
    record("legacy-checkbox:" + (node ? "setup" : "null"));
  }, [record]);
  const legacyRadio = React.useCallback((node: HTMLDivElement | null) => {
    record("legacy-radio:" + (node ? "setup" : "null"));
  }, [record]);
  return <section data-testid="ref-controls" className="grid gap-4">
    <h2>Ref lifecycle and native form controls</h2>
    <Button onClick={() => setRevision(current => current + 1)}>Replace callback refs</Button>
    <Button onClick={() => setMounted(current => !current)}>{mounted ? "Unmount controls" : "Mount controls"}</Button>
    <Button onClick={() => setObjectState(JSON.stringify({
      checkbox: checkboxObject.current !== null, radio: radioObject.current !== null,
    }))}>Read object refs</Button>
    <output data-testid="object-refs">{objectState}</output>
    <output data-testid="ref-events">{JSON.stringify(events)}</output>
    <form className="grid gap-4">
      {mounted ? <>
        <label><Checkbox ref={checkboxCallback} checked={mixed} onCheckedChange={setMixed} />Callback checkbox</label>
        <RadioGroup ref={radioCallback} defaultValue="a" aria-label="Callback choices">
          <label><RadioGroupItem value="a" />Callback option A</label>
          <label><RadioGroupItem value="b" />Callback option B</label>
        </RadioGroup>
        <label><Checkbox ref={checkboxObject} defaultChecked />Object checkbox</label>
        <RadioGroup ref={radioObject} defaultValue="object-a" aria-label="Object choices">
          <label><RadioGroupItem value="object-a" />Object option A</label>
          <label><RadioGroupItem value="object-b" />Object option B</label>
        </RadioGroup>
        <label><Checkbox ref={legacyCheckbox} />Legacy checkbox</label>
        <RadioGroup ref={legacyRadio} defaultValue="legacy-a" aria-label="Legacy choices">
          <label><RadioGroupItem value="legacy-a" />Legacy option A</label>
          <label><RadioGroupItem value="legacy-b" />Legacy option B</label>
        </RadioGroup>
      </> : null}
      <Button type="reset">Reset form controls</Button>
    </form>
  </section>;
}

function CmsRefControls() {
  React.useLayoutEffect(() => {
    const mode = new URLSearchParams(location.search).get("mode") === "dark" ? "dark" : "light";
    for (const [name, value] of Object.entries(buildThemeVariables(defaultThemeSettings, mode))) document.documentElement.style.setProperty(name, value);
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, []);
  return <main className="mx-auto grid max-w-5xl gap-12 p-5">
    <h1>CMS persistence and ref regressions</h1>
    <PersistedCms />
    <RefControls />
  </main>;
}

createRoot(document.getElementById("root")!).render(
  new URLSearchParams(location.search).has("strict")
    ? <React.StrictMode><CmsRefControls /></React.StrictMode>
    : <CmsRefControls />,
);
