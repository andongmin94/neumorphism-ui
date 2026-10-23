import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";
import { CopyableCode } from "@/components/docs/copyable-code";
import { DocsToc } from "@/components/docs/docs-toc";
import { PageMetadata } from "@/components/docs/page-metadata";
import { isLocale, localeHref } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { referenceDocCopy, sourceVerificationCommands } from "@/i18n/reference-doc-copy";

export default function ResourcesPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const locale = lang;
  const t = referenceDocCopy[locale].resources;
  const reference = referenceDocCopy[locale];
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
        <section className="docs-content-section" id="product">
          <h2>{t.sections.product}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(t.products).map(([path, [title, body]]) => (
              <Link key={path} href={localeHref(locale, `/${path}`)} className="rounded-[var(--neu-radius-surface)] border border-[var(--neu-edge)] bg-[var(--neu-surface)] p-5 text-[var(--foreground)] no-underline [box-shadow:var(--neu-shadow-raised-sm)] outline-none hover:[box-shadow:var(--neu-shadow-hover)] focus-visible:ring-2 focus-visible:ring-[var(--ring)]">
                <strong>{title}</strong><span className="mt-2 block text-sm text-[var(--muted-foreground)]">{body}</span>
              </Link>
            ))}
          </div>
        </section>
        <section className="docs-content-section" id="engineering">
          <h2>{t.sections.engineering}</h2>
          <CopyableCode lang="bash" code={sourceVerificationCommands} label={t.commands} multiline />
          <p>{t.verificationBody}</p>
          <p><Link href={localeHref(locale, "/docs/verification")}>{t.verification} →</Link></p>
        </section>
        <section className="docs-content-section" id="source">
          <h2>{t.sections.source}</h2>
          <ul>
            <li><a href="/r/registry.json">/r/registry.json</a> — {t.catalogBody}</li>
            <li><Link href={localeHref(locale, "/docs/registry")}>{reference.registry.title}</Link> — {t.registryBody}</li>
            <li><Link href={localeHref(locale, "/docs/design-tokens")}>{reference["design-tokens"].title}</Link> — {t.tokensBody}</li>
          </ul>
        </section>
      </article>
      <DocsToc items={toc} />
    </div>
  );
}
