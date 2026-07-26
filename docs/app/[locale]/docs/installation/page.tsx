import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyableCode } from "@/components/docs/copyable-code";
import { DocsToc } from "@/components/docs/docs-toc";
import { InstallCommand } from "@/components/docs/install-command";
import {
  getComponentsJsonRegistry,
  getInstallCommand,
  getRegistryAddCommand,
  getRegistryUrlTemplate,
  REGISTRY_NAMESPACE,
} from "@/components/docs/registry-config";
import { getRequestOrigin } from "@/components/docs/request-origin";
import { isLocale, localeHref, locales } from "@/i18n/config";
import { createLocalizedMetadata } from "@/i18n/metadata";
import { formatMessage, getMessages } from "@/i18n/messages";

type InstallationPageProps = {
  params: Promise<{ locale: string }>;
};

const initCommand = "npx shadcn@latest init";
const styleDryRunCommand = `${getInstallCommand("style-sage")} --dry-run`;
const styleInstallCommand = getInstallCommand("style-sage");

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: InstallationPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const messages = getMessages(locale);

  return createLocalizedMetadata({
    locale,
    pathname: "/docs/installation",
    title: messages.installationPage.title,
    description: messages.installationPage.metaDescription,
  });
}

export default async function InstallationPage({
  params,
}: InstallationPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = getMessages(locale);
  const requestOrigin = await getRequestOrigin();
  const registryUrlTemplate = getRegistryUrlTemplate(requestOrigin);
  const tocItems = [
    { href: "#project", label: messages.installationPage.tocProject },
    { href: "#configure", label: messages.installationPage.tocConfigure },
    { href: "#component", label: messages.installationPage.tocComponent },
    { href: "#theme", label: messages.installationPage.tocTheme },
  ] as const;

  return (
    <div className="docs-content-layout">
      <article className="docs-content docs-article">
        <header className="docs-page-header">
          <h1>Installation</h1>
          <p>{messages.installationPage.intro}</p>
        </header>

        <section className="docs-content-section" id="project">
          <h2>{messages.installationPage.projectTitle}</h2>
          <p>{messages.installationPage.projectBody}</p>
          <CopyableCode
            code={initCommand}
            label={messages.installationPage.initLabel}
          />
        </section>

        <section className="docs-content-section" id="configure">
          <h2>{messages.installationPage.configureTitle}</h2>
          <p>{messages.installationPage.configureBody}</p>
          <CopyableCode
            code={getRegistryAddCommand(requestOrigin)}
            label={messages.installationPage.registryCommandLabel}
          />

          <details className="docs-disclosure">
            <summary>{messages.installationPage.manualSummary}</summary>
            <p>
              {formatMessage(messages.installationPage.manualBody, {
                namespace: REGISTRY_NAMESPACE,
                url: registryUrlTemplate,
              })}
            </p>
            <CopyableCode
              code={getComponentsJsonRegistry(requestOrigin)}
              label={messages.installationPage.configLabel}
              multiline
            />
          </details>
        </section>

        <section className="docs-content-section" id="component">
          <h2>{messages.installationPage.componentTitle}</h2>
          <p>{messages.installationPage.componentBody}</p>
          <InstallCommand name="button" />
          <p className="docs-section-note">
            {messages.installationPage.componentNote}
          </p>
        </section>

        <section className="docs-content-section" id="theme">
          <h2>{messages.installationPage.themeTitle}</h2>
          <p>{messages.installationPage.themeBody}</p>
          <h3>Dry run</h3>
          <CopyableCode
            code={styleDryRunCommand}
            label={messages.installationPage.dryRunLabel}
          />
          <h3>Install</h3>
          <CopyableCode
            code={styleInstallCommand}
            label={messages.installationPage.installLabel}
          />
          <p className="docs-section-note">
            {messages.installationPage.themeNotePrefix}{" "}
            <Link href={localeHref(locale, "/customize")}>Theme Studio</Link>
            {messages.installationPage.themeNoteSuffix}
          </p>
        </section>

        <nav
          className="docs-next"
          aria-label={messages.installationPage.nextDocument}
        >
          <Link href={localeHref(locale, "/components")}>
            <span>{messages.common.next}</span>
            <strong>
              Components <span aria-hidden="true">→</span>
            </strong>
          </Link>
        </nav>
      </article>

      <DocsToc items={tocItems} />
    </div>
  );
}
