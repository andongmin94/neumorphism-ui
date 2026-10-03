import * as React from "react";
import { createRoot } from "react-dom/client";
import { PortfolioExample, type PortfolioLocale } from "../../src/registry/components/blocks/portfolio";
import { BlogPostExample } from "../../src/registry/components/blocks/blog-post";
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
  return <div className="mx-auto grid max-w-5xl gap-16 px-6 py-8">
    <PortfolioExample locale={locale as PortfolioLocale} />
    <BlogPostExample locale={locale} />
  </div>;
}
createRoot(document.getElementById("root")!).render(<Specimen />);
