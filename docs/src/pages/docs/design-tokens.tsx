import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";
import { DocsToc } from "@/components/docs/docs-toc";
import { PageMetadata } from "@/components/docs/page-metadata";
import { isLocale, localeHref } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { referenceDocCopy } from "@/i18n/reference-doc-copy";
import {
  themeControlShapes,
  themeDepthIds,
  themeLightDirections,
  themeMotionValues,
  themePresets,
} from "@neumorphism-ui/registry/theme";

const semanticTokens = [
  "--background", "--foreground", "--primary", "--primary-foreground",
  "--secondary", "--muted", "--muted-foreground", "--destructive",
  "--border", "--input", "--ring",
] as const;

const surfaceTokens = [
  "--neu-surface", "--neu-surface-soft", "--neu-surface-low",
  "--neu-shadow-raised", "--neu-shadow-raised-sm", "--neu-shadow-inset",
  "--neu-shadow-inset-sm", "--neu-shadow-hover", "--neu-shadow-floating",
  "--neu-radius-control", "--neu-radius-surface", "--neu-duration",
] as const;

export default function DesignTokensPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const locale = lang;
  const t = referenceDocCopy[locale]["design-tokens"];
  const toc = Object.entries(t.sections).map(([id, label]) => ({ href: `#${id}`, label }));

  return (
    <div className="docs-content-layout docs-reference-layout">
      <article className="docs-content docs-article docs-reference-article">
        <PageMetadata locale={locale} title={t.title} description={t.intro} />
        <header className="docs-page-header">
          <h1>{t.title}</h1><p>{t.intro}</p>
          <nav className="component-doc-quicknav" aria-label={getMessages(locale).common.pageToc}>
            {toc.map(({ href, label }) => <a key={href} href={href}>{label}</a>)}
          </nav>
        </header>
        <section className="docs-content-section" id="semantic">
          <h2>{t.sections.semantic}</h2><p>{t.semanticBody}</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {semanticTokens.map((token) => <code key={token} className="rounded-lg border border-[var(--border)] bg-[var(--neu-surface)] px-3 py-2">{token}</code>)}
          </div>
        </section>
        <section className="docs-content-section" id="surfaces">
          <h2>{t.sections.surfaces}</h2><p>{t.surfacesBody}</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {surfaceTokens.map((token) => <code key={token} className="rounded-lg border border-[var(--border)] bg-[var(--neu-surface)] px-3 py-2">{token}</code>)}
          </div>
        </section>
        <section className="docs-content-section" id="settings">
          <h2>{t.sections.settings}</h2><p>{t.settingsBody}</p>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div><dt className="font-semibold">{t.axes.depth}</dt><dd className="mt-1 text-sm text-[var(--muted-foreground)]">{themeDepthIds.join(" · ")}</dd></div>
            <div><dt className="font-semibold">{t.axes.light}</dt><dd className="mt-1 text-sm text-[var(--muted-foreground)]">{themeLightDirections.join(" · ")}</dd></div>
            <div><dt className="font-semibold">{t.axes.shape}</dt><dd className="mt-1 text-sm text-[var(--muted-foreground)]">{themeControlShapes.join(" · ")}</dd></div>
            <div><dt className="font-semibold">{t.axes.motion}</dt><dd className="mt-1 text-sm text-[var(--muted-foreground)]">{themeMotionValues.map((value) => value + "ms").join(" · ")}</dd></div>
          </dl>
        </section>
        <section className="docs-content-section" id="presets">
          <h2>{t.sections.presets}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {themePresets.map((preset) => (
              <article key={preset.id} className="rounded-[var(--neu-radius-surface)] border border-[var(--neu-edge)] bg-[var(--neu-surface)] p-5 [box-shadow:var(--neu-shadow-raised-sm)]">
                <h3>{preset.name}</h3><p>{t.presetDescriptions[preset.id]}</p>
                <p><code>{preset.registryName}</code></p>
                <p className="text-sm text-[var(--muted-foreground)]">{preset.defaults.depth} · {preset.defaults.lightDirection} · {preset.defaults.controlShape}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="docs-content-section" id="rules">
          <h2>{t.sections.rules}</h2>
          <ul>{t.rules.map((text) => <li key={text}>{text}</li>)}</ul>
          <p><Link href={localeHref(locale, "/customize")}>{t.themeStudio} →</Link></p>
        </section>
      </article>
      <DocsToc items={toc} />
    </div>
  );
}
