import { notFound } from "fumapress/router";
import { DocsToc } from "@/components/docs/docs-toc";
import { PageMetadata } from "@/components/docs/page-metadata";
import { isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { referenceDocCopy } from "@/i18n/reference-doc-copy";

export default function AccessibilityPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const t = referenceDocCopy[lang].accessibility;
  const toc = Object.entries(t.sections).map(([id, label]) => ({ href: `#${id}`, label }));

  return (
    <div className="docs-content-layout docs-reference-layout">
      <article className="docs-content docs-article docs-reference-article">
        <PageMetadata locale={lang} title={t.title} description={t.intro} />
        <header className="docs-page-header">
          <h1>{t.title}</h1><p>{t.intro}</p>
          <nav className="component-doc-quicknav" aria-label={getMessages(lang).common.pageToc}>
            {toc.map(({ href, label }) => <a key={href} href={href}>{label}</a>)}
          </nav>
        </header>
        {(["keyboard", "semantics", "motion", "evidence"] as const).map((id) => (
          <section className="docs-content-section" id={id} key={id}>
            <h2>{t.sections[id]}</h2>
            <ul>{t[id].map((text) => <li key={text}>{text}</li>)}</ul>
          </section>
        ))}
        <section className="docs-content-section" id="limits">
          <h2>{t.sections.limits}</h2><p>{t.limits}</p>
        </section>
      </article>
      <DocsToc items={toc} />
    </div>
  );
}
