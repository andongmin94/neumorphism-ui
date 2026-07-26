import Link from "next/link";
import { notFound } from "next/navigation";

import { DocsToc } from "@/components/docs/docs-toc";
import { InstallCommand } from "@/components/docs/install-command";
import { InteractivePreview } from "@/components/docs/interactive-preview";
import { isLocale, localeHref, locales } from "@/i18n/config";
import { createLocalizedMetadata } from "@/i18n/metadata";
import { getMessages } from "@/i18n/messages";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const messages = getMessages(locale);

  return createLocalizedMetadata({
    locale,
    description: messages.home.metaDescription,
  });
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale);
  const tocItems = [
    { href: "#quick-start", label: messages.home.quickStart },
    { href: "#preview", label: messages.common.preview },
    { href: "#how-it-works", label: messages.home.structure },
  ] as const;

  return (
    <div className="docs-content-layout">
      <article className="docs-content docs-home">
        <header className="docs-page-header">
          <h1>Neumorphism UI</h1>
          <p>{messages.home.intro}</p>
          <div className="docs-page-actions">
            <Link
              className="docs-primary-action"
              href={localeHref(locale, "/docs/installation")}
            >
              {messages.home.install}
            </Link>
            <Link
              className="docs-secondary-action"
              href={localeHref(locale, "/components")}
            >
              {messages.home.viewComponents}
            </Link>
          </div>
        </header>

        <section className="docs-content-section" id="quick-start">
          <h2>{messages.home.quickStart}</h2>
          <p>{messages.home.quickStartBody}</p>
          <InstallCommand
            name="button"
            label={messages.home.buttonInstallLabel}
          />
          <p className="docs-section-note">
            {messages.home.firstConnectionPrefix}{" "}
            <Link href={localeHref(locale, "/docs/installation")}>
              {messages.home.installationDocs}
            </Link>{" "}
            {messages.home.firstConnectionSuffix}
          </p>
        </section>

        <section className="docs-content-section" id="preview">
          <h2>{messages.common.preview}</h2>
          <p>{messages.home.previewBody}</p>
          <div className="docs-preview-frame">
            <InteractivePreview />
          </div>
        </section>

        <section className="docs-content-section" id="how-it-works">
          <h2>{messages.home.structure}</h2>
          <p>{messages.home.structureBody}</p>
          <div className="docs-link-list">
            <Link href={localeHref(locale, "/components")}>
              <span>
                <strong>Components</strong>
                <small>{messages.home.componentsCard}</small>
              </span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link href={localeHref(locale, "/customize")}>
              <span>
                <strong>Theme Studio</strong>
                <small>{messages.home.themesCard}</small>
              </span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/r/registry.json">
              <span>
                <strong>Registry index</strong>
                <small>{messages.home.registryCard}</small>
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </article>

      <DocsToc items={tocItems} />
    </div>
  );
}
