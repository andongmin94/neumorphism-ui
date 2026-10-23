import { notFound } from "fumapress/router";
import { CopyableCode } from "@/components/docs/copyable-code";
import { DocsToc } from "@/components/docs/docs-toc";
import { PageMetadata } from "@/components/docs/page-metadata";
import { isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { referenceDocCopy, sourceVerificationCommands } from "@/i18n/reference-doc-copy";

export default function VerificationPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const t = referenceDocCopy[lang].verification;
  const toc = Object.entries(t.sections).map(([id, label]) => ({ href: `#${id}`, label }));

  return (
    <div className="docs-content-layout docs-reference-layout">
      <article className="docs-content docs-article docs-reference-article">
        <PageMetadata locale={lang} pathname="/docs/verification" title={t.title} description={t.intro} />
        <header className="docs-page-header">
          <h1>{t.title}</h1><p>{t.intro}</p>
          <nav className="component-doc-quicknav" aria-label={getMessages(lang).common.pageToc}>
            {toc.map(({ href, label }) => <a key={href} href={href}>{label}</a>)}
          </nav>
        </header>
        <section className="docs-content-section" id="source">
          <h2>{t.sections.source}</h2>
          <CopyableCode lang="bash" code={sourceVerificationCommands} label={t.commands} multiline />
          <p>{t.sourceBody}</p>
        </section>
        {(["generation", "default", "comprehensive", "deployed", "release"] as const).map((id) => (
          <section className="docs-content-section" id={id} key={id}>
            <h2>{t.sections[id]}</h2>
            <ul>{t[id].map((text) => <li key={text}>{text}</li>)}</ul>
          </section>
        ))}
      </article>
      <DocsToc items={toc} />
    </div>
  );
}
