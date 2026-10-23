import type { RouteConfig } from "fumapress";
import { PageMetadata } from "@/components/docs/page-metadata";
import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";

import { ComponentExample } from "@/components/docs/component-example";
import { ComponentInstallation } from "@/components/docs/component-installation";
import { InstallCommand } from "@/components/docs/install-command";
import { componentDocs } from "@/components/docs/component-docs-data";
import { getComponentUsageExample } from "@/components/docs/component-usage-examples";
import { CopyableCode } from "@/components/docs/copyable-code";
import { DocsToc } from "@/components/docs/docs-toc";
import { componentPreviewMessages } from "@/i18n/component-preview-messages";
import { getComponentGuide } from "@/i18n/component-guides";
import { isLocale, localeHref } from "@/i18n/config";
import {
  getLocalizedComponentDoc,
  getLocalizedComponentDocGroups,
} from "@/i18n/localized-component-docs";
import { getMessages } from "@/i18n/messages";

export async function getConfig() {
  return { staticPaths: componentDocs.map(({ slug }) => slug) } satisfies RouteConfig;
}

export default function ComponentDetailPage({ lang, slug }: { lang: string; slug: string }) {
  if (!isLocale(lang)) notFound();
  const locale = lang;
  const component = getLocalizedComponentDoc(locale, slug);

  if (!component) {
    notFound();
  }

  const guide = getComponentGuide(locale, slug);
  const usageCode = getComponentUsageExample(slug);
  const exampleItems = Array.from(new Set([...`${component.importCode}\n${usageCode}`.matchAll(/from\s+["']@\/components\/ui\/([a-z0-9-]+)["']/g)].map((match) => match[1])));
  const exampleInstall = `npx shadcn@latest add ${exampleItems.map((name) => `@neumorphism-ui/${name}`).join(" ")}`;
  const messages = getMessages(locale);
  const groups = getLocalizedComponentDocGroups(locale);
  const navigationComponents = groups.flatMap(({ items }) => items)
    .sort((a, b) => a.title.localeCompare(b.title, "en"));
  const componentIndex = navigationComponents.findIndex(
    (item) => item.slug === slug,
  );
  const previous = navigationComponents[componentIndex - 1];
  const next = navigationComponents[componentIndex + 1];
  const componentTocItems = [
    { href: "#preview", label: messages.common.preview },
    { href: "#installation", label: messages.common.installation },
    { href: "#usage", label: messages.common.usage },
    { href: "#api-reference", label: messages.common.apiReference },
    { href: "#accessibility", label: messages.common.accessibility },
  ] as const;

  return (
    <div className="component-doc-page docs-content-layout">
      <PageMetadata locale={locale} title={component.title} description={guide.purpose} />
      <article className="component-doc-article">
        <header className="component-doc-intro">
          <nav
            aria-label={messages.componentDetail.breadcrumb}
            className="component-doc-breadcrumb"
          >
            <Link href={localeHref(locale, "/components")}>{messages.navigation.components}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{component.title}</span>
          </nav>

          <h1>{component.title}</h1>
          <p className="component-doc-description">{guide.purpose}</p>

          <nav className="component-doc-quicknav" aria-label={messages.common.pageToc}>
            {componentTocItems.map((item) => (
              <a href={item.href} key={item.href}>{item.label}</a>
            ))}
          </nav>
        </header>

        <section className="component-doc-section" id="preview">
          <div className="component-doc-section-heading">
            <h2>{messages.common.preview}</h2>
          </div>
          <div className="component-doc-example-caption">
            <h3>{guide.exampleTitle}</h3>
            <p>{guide.exampleDescription}</p>
          </div>
          <ComponentExample
            code={<CopyableCode lang="tsx" code={`${component.importCode}\n\n${component.usageCode}`} label={`${slug} ${messages.common.code}`} multiline />}
            copy={componentPreviewMessages[locale]}
            slug={component.slug}
          />
        </section>

        <section className="component-doc-section" id="installation">
          <div className="component-doc-section-heading">
            <h2>{messages.common.installation}</h2>
          </div>
          <p className="component-doc-install-note">
            {messages.componentDetail.firstUsePrefix}{" "}
            <Link href={localeHref(locale, "/docs/installation")}>
              {messages.componentDetail.baseSetup}
            </Link>{" "}
            {messages.componentDetail.firstUseSuffix}
          </p>
          <ComponentInstallation slug={component.slug} command={<InstallCommand locale={locale} name={component.slug} />} />
          {exampleItems.length > 1 && (
            <div className="component-doc-example-dependencies">
              <p>{guide.exampleTitle}</p>
              <CopyableCode lang="bash" code={exampleInstall} label={`${messages.common.preview}: ${messages.common.installation}`} />
            </div>
          )}
          <a
            className="component-doc-registry-link"
            href={`/r/${component.slug}.json`}
            target="_blank"
            rel="noreferrer"
          >
            {messages.common.registryJson}<span aria-hidden="true">↗</span>
          </a>
        </section>

        <section className="component-doc-section" id="usage">
          <div className="component-doc-section-heading">
            <h2>{messages.common.usage}</h2>
          </div>
          <p>{guide.usage}</p>
          <div className="component-doc-code-block">
            <CopyableCode lang="tsx"
              code={usageCode}
              label={`${component.title}: ${messages.common.usage}`}
              multiline
            />
          </div>
        </section>

        <section className="component-doc-section" id="api-reference">
          <div className="component-doc-section-heading">
            <h2 id="component-api-heading">{messages.common.apiReference}</h2>
          </div>
          <p>{component.description}</p>
          <div className="component-api-table-wrap" role="region" aria-labelledby="component-api-heading" tabIndex={0}>
            <table className="component-api-table">
              <thead>
                <tr>
                  <th>{messages.common.component}</th>
                  <th>{messages.common.prop}</th>
                  <th>{messages.common.type}</th>
                  <th>{messages.common.default}</th>
                  <th>{messages.common.description}</th>
                </tr>
              </thead>
              <tbody>
                {component.props.map((prop) => (
                  <tr key={`${prop.component}-${prop.name}`}>
                    <td>
                      <code>{prop.component}</code>
                    </td>
                    <td>
                      <code>{prop.name}</code>
                      {prop.required ? (
                        <span className="api-required">
                          {messages.common.required}
                        </span>
                      ) : null}
                    </td>
                    <td>
                      <code>{prop.type}</code>
                    </td>
                    <td>
                      <code>{prop.defaultValue ?? "—"}</code>
                    </td>
                    <td>{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="component-doc-section" id="accessibility">
          <div className="component-doc-section-heading">
            <h2>{messages.common.accessibility}</h2>
          </div>
          <ul className="component-a11y-list">
            {component.accessibility.map((note, index) => (
              <li key={note}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{note}</p>
              </li>
            ))}
          </ul>
        </section>

        <nav
          className="component-doc-pagination"
          aria-label={messages.componentDetail.docsPagination}
        >
          {previous ? (
            <Link href={localeHref(locale, `/components/${previous.slug}`)}>
              <span>{messages.common.previous}</span>
              <strong>
                <span aria-hidden="true">←</span> {previous.title}
              </strong>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={localeHref(locale, `/components/${next.slug}`)}>
              <span>{messages.common.next}</span>
              <strong>
                {next.title} <span aria-hidden="true">→</span>
              </strong>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>

      <DocsToc items={componentTocItems} />
    </div>
  );
}
