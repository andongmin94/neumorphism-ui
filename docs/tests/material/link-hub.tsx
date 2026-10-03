import * as React from "react";
import { createRoot } from "react-dom/client";
import { LinkHub, LinkHubExample } from "../../src/registry/components/blocks/link-hub";
import { buildThemeVariables, defaultThemeSettings } from "../../src/registry/theme";
import "./styles.css";

function Specimen() {
  const params = new URLSearchParams(location.search);
  const locale = (["en", "ko", "ja", "zh"] as const).find(value => value === params.get("locale")) ?? "en";
  const mode = params.get("mode") === "dark" ? "dark" : "light";
  React.useLayoutEffect(() => {
    for (const [name, value] of Object.entries(buildThemeVariables(defaultThemeSettings, mode))) document.documentElement.style.setProperty(name, value);
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.lang = locale;
  }, [mode, locale]);
  return <main className="mx-auto grid max-w-4xl gap-16 px-6 py-8">
    <div data-example><LinkHubExample locale={locale} /></div>
    <div data-long><LinkHub locale={locale}
      profile={{ name: "Resources", handle: "@" + "long-handle-".repeat(12), bio: "Caller-owned text must remain readable." }}
      links={[{ group: "Docs", title: "reference_".repeat(18), detail: "https://example.com/" + "long-path-".repeat(24), href: "#destination" }]}
      contactEmail="reader@example.com" /></div>
    <p id="destination">Destination</p>
  </main>;
}
createRoot(document.getElementById("root")!).render(<Specimen />);
