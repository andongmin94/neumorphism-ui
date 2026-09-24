import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";

import { ComponentDirectory } from "@/components/docs/component-directory";
import { DocsToc } from "@/components/docs/docs-toc";
import { RegistryShowcase } from "@/components/docs/registry-showcase";
import { themePresets } from "@/components/docs/theme-config";
import { isLocale, localeHref } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { showcaseMessages } from "@/i18n/showcase-messages";

export default function ComponentsPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const locale = lang;
  const messages = getMessages(locale);
  const tocItems = [
    { href: "#components", label: messages.componentsPage.title },
    { href: "#themes", label: messages.componentsPage.themes },
    { href: "#examples", label: messages.componentsPage.examples },
  ] as const;

  return (
    <div className="docs-content-layout docs-content-layout-wide">
      <article className="docs-content docs-components-index">
        <header className="docs-page-header">
          <h1>Components</h1>
          <p>{messages.componentsPage.intro}</p>
        </header>

        <ComponentDirectory />

        <section className="docs-content-section" id="themes">
          <h2>{messages.componentsPage.themes}</h2>
          <p>{messages.componentsPage.themesBody}</p>
          <div className="docs-theme-list">
            {themePresets.map((preset) => (
              <Link href={localeHref(locale, "/customize")} key={preset.id}>
                <span
                  className="docs-theme-swatch"
                  style={{ background: preset.light.surface }}
                >
                  <span style={{ background: preset.light.primary }} />
                </span>
                <span>
                  <strong>{preset.name}</strong>
                  <small>
                    {preset.defaults.depth} · {preset.defaults.controlShape}
                  </small>
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="docs-content-section" id="examples">
          <h2>{messages.componentsPage.examples}</h2>
          <p>{messages.componentsPage.examplesBody}</p>
          <RegistryShowcase copy={showcaseMessages[locale]} />
        </section>
      </article>

      <DocsToc items={tocItems} />
    </div>
  );
}
