import * as React from "react";
import { createRoot } from "react-dom/client";
import { LinkHub, LinkHubExample } from "../../src/registry/components/blocks/link-hub";
import { Blog, type BlogPost } from "../../src/registry/components/blocks/blog";
import { buildThemeVariables, defaultThemeSettings } from "../../src/registry/theme";
import "./styles.css";

const filterPosts: BlogPost[] = [
  { slug: "all-category", title: "All category post", summary: "A caller-owned category.", topic: "All", publishedAt: "2026-10-02" },
  { slug: "engineering", title: "Engineering post", summary: "Another category.", topic: "Engineering", publishedAt: "2026-10-01" },
];

function FilterRegression() {
  const [locale, setLocale] = React.useState<"en" | "ko">("en");
  return <main className="mx-auto grid max-w-4xl gap-8 px-6 py-8">
    <button type="button" onClick={() => setLocale(current => current === "en" ? "ko" : "en")}>Switch locale</button>
    <div data-first-blog><Blog posts={filterPosts} locale={locale} /></div>
    <div data-second-blog><Blog posts={filterPosts} locale={locale} /></div>
    <div data-filter-hub><LinkHub locale={locale} profile={{ name: "Filter regression" }} links={[
      { group: "All", title: "All category link", href: "#all-link" },
      { group: "Guides", title: "Guide link", href: "#guide-link" },
    ]} /></div>
  </main>;
}

function Specimen() {
  const params = new URLSearchParams(location.search);
  const locale = (["en", "ko", "ja", "zh"] as const).find(value => value === params.get("locale")) ?? "en";
  const mode = params.get("mode") === "dark" ? "dark" : "light";
  React.useLayoutEffect(() => {
    for (const [name, value] of Object.entries(buildThemeVariables(defaultThemeSettings, mode))) document.documentElement.style.setProperty(name, value);
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.lang = locale;
  }, [mode, locale]);
  if (params.get("scenario") === "filters") return <FilterRegression />;
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
