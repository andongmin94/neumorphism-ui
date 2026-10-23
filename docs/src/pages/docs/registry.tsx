import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";
import { CopyableCode } from "@/components/docs/copyable-code";
import { DocsToc } from "@/components/docs/docs-toc";
import { InstallCommand } from "@/components/docs/install-command";
import { PageMetadata } from "@/components/docs/page-metadata";
import { REGISTRY_NAMESPACE, getRegistryUrlTemplate } from "@/components/docs/registry-config";
import { getRequestOrigin } from "@/components/docs/request-origin";
import { isLocale, localeHref } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { referenceDocCopy } from "@/i18n/reference-doc-copy";

const sourcePaths = ["registry/src/components/ui", "registry/src/components/blocks", "registry/src/lib", "registry/src/theme.ts", "registry/catalog.json"];
const generatedPaths = ["registry/registry.json · registry/public/r", "docs/public/r", "docs/src/registry"];

export default async function RegistryArchitecturePage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const locale = lang;
  const t = referenceDocCopy[locale].registry;
  const urlTemplate = getRegistryUrlTemplate(await getRequestOrigin());
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
        <section className="docs-content-section" id="ownership">
          <h2>{t.sections.ownership}</h2>
          <table>
            <thead><tr><th>{t.path}</th><th>{t.responsibility}</th></tr></thead>
            <tbody>{sourcePaths.map((path, index) => <tr key={path}><td><code>{path}</code></td><td>{t.ownership[index]}</td></tr>)}</tbody>
          </table>
        </section>
        <section className="docs-content-section" id="generated">
          <h2>{t.sections.generated}</h2>
          <ul>
            {generatedPaths.map((path, index) => <li key={path}><code>{path}</code> — {t.generated[index]}</li>)}
            <li>{t.generated[3]}</li>
          </ul>
        </section>
        <section className="docs-content-section" id="install">
          <h2>{t.sections.install}</h2>
          <p><code>{REGISTRY_NAMESPACE}</code> — {t.installBody}</p>
          <CopyableCode lang="text" code={urlTemplate} label={t.urlLabel} />
          <InstallCommand locale={locale} name="button" />
          <p>{t.installVerification}</p>
        </section>
        <section className="docs-content-section" id="directory">
          <h2>{t.sections.directory}</h2>
          <p><code>registry/directory-entry.json</code> — {t.directoryBody}</p>
        </section>
        <section className="docs-content-section" id="boundaries">
          <h2>{t.sections.boundaries}</h2>
          <ul>{t.boundaries.map((text) => <li key={text}>{text}</li>)}</ul>
          <p><Link href={localeHref(locale, "/components")}>{t.next} →</Link></p>
        </section>
      </article>
      <DocsToc items={toc} />
    </div>
  );
}
