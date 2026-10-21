import * as React from "react";
import { createRoot } from "react-dom/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { buildThemeVariables, defaultThemeSettings, getThemePreset } from "../../src/registry/theme";
import "./styles.css";

function Specimen() {
  const mode = new URLSearchParams(location.search).get("mode") === "dark" ? "dark" : "light";
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

  return <main className="mx-auto grid max-w-md gap-4 p-6">
    <form data-testid="radio-form" className="grid gap-4" onReset={event => { if (cancelReset) event.preventDefault(); }}>
      <RadioGroup aria-label="Density" name="density" defaultValue="compact">
        <label className="flex items-center gap-2"><RadioGroupItem value="compact" />Compact</label>
        <label className="flex items-center gap-2"><RadioGroupItem value="roomy" />Roomy</label>
      </RadioGroup>
      <RadioGroup aria-label="Delivery" name="delivery">
        <label className="flex items-center gap-2"><RadioGroupItem value="email" />Email</label>
        <label className="flex items-center gap-2"><RadioGroupItem value="sms" />SMS</label>
      </RadioGroup>
      <button type="reset" className="h-10 rounded-[var(--neu-radius-control)]">Reset form</button>
    </form>
    <label className="flex items-center gap-2"><input type="checkbox" checked={cancelReset} onChange={event => setCancelReset(event.target.checked)} />Cancel reset</label>
    <button type="button" className="h-10" onClick={() => setRevision(value => value + 1)}>Rerender specimen</button>
    <output>Revision {revision}</output>
  </main>;
}

createRoot(document.getElementById("root")!).render(<Specimen />);
