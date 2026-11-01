import * as React from "react";
import { createRoot } from "react-dom/client";
import { Bar, BarChart } from "recharts";
import { ChartContainer, ChartLegend } from "@/components/ui/chart";
import { BuildDurationChart } from "../../src/registry/components/blocks/build-duration-chart";
import { ServiceLatencyChart } from "../../src/registry/components/blocks/service-latency-chart";
import { ReleaseActivityChart } from "../../src/registry/components/blocks/release-activity-chart";
import { DeliveryCapacityChart } from "../../src/registry/components/blocks/delivery-capacity-chart";
import { InstallDiagnosticsChart } from "../../src/registry/components/blocks/install-diagnostics-chart";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { buildThemeVariables, defaultThemeSettings } from "../../src/registry/theme";
import "./styles.css";

function CustomLegend() {
  return <p>Custom legend element</p>;
}

function LegendCustomization() {
  const [renderer, setRenderer] = React.useState("default");
  return <section data-testid="legend-customization" className="grid gap-4">
    <label>Legend renderer<select value={renderer} onChange={event => setRenderer(event.target.value)}>
      <option value="default">Default</option><option value="formatter">Formatter</option><option value="element">Custom element</option><option value="function">Custom function</option>
    </select></label>
    <ChartContainer title="Legend customization" description="Caller-owned labels and rendering." tableLabel="View data" table={<table><caption>Visits</caption><tbody><tr><td>10</td></tr></tbody></table>}>
      <BarChart data={[{ visits: 10 }]}>
        <ChartLegend reference={{ value: "Budget", color: "var(--destructive)" }}
          formatter={renderer === "formatter" ? value => `Localized ${value}` : undefined}
          content={renderer === "element" ? <CustomLegend /> : renderer === "function" ? legend => <p>Custom function: {legend.payload?.map(entry => entry.value).join(", ")}</p> : undefined} />
        <Bar dataKey="visits" name="Visits" fill="var(--primary)" isAnimationActive={false} />
      </BarChart>
    </ChartContainer>
  </section>;
}

function Specimen() {
  const params = new URLSearchParams(location.search);
  const locale = (["en", "ko", "ja", "zh"] as const).find(value => value === params.get("locale")) ?? "en";
  const mode = params.get("mode") === "dark" ? "dark" : "light";
  const [empty, setEmpty] = React.useState(false);
  const [budget, setBudget] = React.useState(300);
  const [code, setCode] = React.useState("");
  React.useLayoutEffect(() => {
    for (const [key, value] of Object.entries(buildThemeVariables(defaultThemeSettings, mode))) document.documentElement.style.setProperty(key, value);
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.lang = locale;
  }, [mode, locale]);
  if (params.has("legend")) return <main className="mx-auto max-w-xl p-5"><LegendCustomization /></main>;
  return <main className="mx-auto grid max-w-5xl gap-8 px-4 py-8">
    <section data-testid="otp" className="grid gap-4">
      <label htmlFor="code">Verification code</label>
      <InputOTP id="code" aria-label="Verification code" maxLength={6} value={code} onChange={setCode}>
        <InputOTPGroup>{Array.from({length: 6}, (_, index) => <InputOTPSlot index={index} key={index} />)}</InputOTPGroup>
      </InputOTP>
      <output>{code}</output>
      <InputOTP aria-label="Disabled code" maxLength={6} disabled>
        <InputOTPGroup>{Array.from({length: 6}, (_, index) => <InputOTPSlot index={index} key={index} />)}</InputOTPGroup>
      </InputOTP>
    </section>
    <label><input type="checkbox" checked={empty} onChange={e => setEmpty(e.target.checked)} />Empty charts</label>
    <button type="button" onClick={() => setBudget(900)}>Set budget 900</button>
    <div className="grid min-w-0 gap-6 lg:grid-cols-2">
      <BuildDurationChart locale={locale} data={empty ? [] : [{label:"B1",coldSeconds:210,cachedSeconds:108},{label:"B2",coldSeconds:250,cachedSeconds:100}]} />
      <ServiceLatencyChart locale={locale} budgetMs={budget} data={empty ? [] : [{label:"caller-owned",p50Ms:80,p95Ms:210},{label:"B",p50Ms:130,p95Ms:470}]} />
      <ReleaseActivityChart locale={locale} data={empty ? [] : [{release:"R1",installs:148,updates:62},{release:"R2",installs:232,updates:104}]} />
      <DeliveryCapacityChart locale={locale} data={empty ? [] : [{period:"S1",planned:32,delivered:28},{period:"S2",planned:36,delivered:39}]} />
    </div>
    <InstallDiagnosticsChart locale={locale} data={empty ? [] : [{stage:"caller-stage",durationMs:120},{stage:"download",durationMs:840}]} />
  </main>;
}
createRoot(document.getElementById("root")!).render(<Specimen />);
