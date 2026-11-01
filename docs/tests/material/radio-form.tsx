import * as React from "react";
import { createRoot } from "react-dom/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { buildThemeVariables, defaultThemeSettings, getThemePreset } from "../../src/registry/theme";
import "./styles.css";

function Specimen() {
  const parameters = new URLSearchParams(location.search);
  const mode = parameters.get("mode") === "dark" ? "dark" : "light";
  const externalOwner = parameters.get("owner") === "external";
  const formOwner = externalOwner ? "radio-owner" : undefined;
  const [revision, setRevision] = React.useState(0);
  const [cancelReset, setCancelReset] = React.useState(false);

  React.useLayoutEffect(() => {
    const preset = getThemePreset("air");
    const settings = { ...defaultThemeSettings, ...preset.defaults, presetId: preset.id };
    for (const [key, value] of Object.entries(buildThemeVariables(settings, mode))) {
      document.documentElement.style.setProperty(key, value);
    }
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  const groups = <>
    <RadioGroup aria-label="Density" name="density" defaultValue="compact">
      <label className="flex items-center gap-2"><RadioGroupItem form={formOwner} value="compact" />Compact</label>
      <label className="flex items-center gap-2"><RadioGroupItem form={formOwner} value="roomy" />Roomy</label>
    </RadioGroup>
    <RadioGroup aria-label="Delivery" name="delivery">
      <label className="flex items-center gap-2"><RadioGroupItem form={formOwner} value="email" />Email</label>
      <label className="flex items-center gap-2"><RadioGroupItem form={formOwner} value="sms" />SMS</label>
    </RadioGroup>
  </>;

  return <main className="mx-auto grid max-w-md gap-4 p-6">
    <form id="radio-owner" data-testid="radio-form" className="grid gap-4" onReset={event => { if (cancelReset) event.preventDefault(); }}>
      {!externalOwner && groups}
      <button type="reset" className="h-10 rounded-[var(--neu-radius-control)]">Reset form</button>
    </form>
    {externalOwner && groups}
    <label className="flex items-center gap-2"><input type="checkbox" checked={cancelReset} onChange={event => setCancelReset(event.target.checked)} />Cancel reset</label>
    <button type="button" className="h-10" onClick={() => setRevision(value => value + 1)}>Rerender specimen</button>
    <output>Revision {revision}</output>
  </main>;
}

createRoot(document.getElementById("root")!).render(<Specimen />);
