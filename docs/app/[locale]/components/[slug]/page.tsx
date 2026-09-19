import Link from "next/link";
import { notFound } from "next/navigation";

import { ComponentExample } from "@/components/docs/component-example";
import { ComponentInstallation } from "@/components/docs/component-installation";
import { componentDocs } from "@/components/docs/component-docs-data";
import { CopyableCode } from "@/components/docs/copyable-code";
import { DocsToc } from "@/components/docs/docs-toc";
import { componentPreviewMessages } from "@/i18n/component-preview-messages";
import { isLocale, localeHref, locales } from "@/i18n/config";
import {
  getLocalizedComponentDoc,
  getLocalizedComponentDocGroups,
} from "@/i18n/localized-component-docs";
import { createLocalizedMetadata } from "@/i18n/metadata";
import { formatMessage, getMessages } from "@/i18n/messages";

type ComponentDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    componentDocs.map(({ slug }) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: ComponentDetailPageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const component = getLocalizedComponentDoc(locale, slug);

  if (!component) {
    return { title: getMessages(locale).componentDetail.notFound };
  }

  return createLocalizedMetadata({
    locale,
    pathname: `/components/${slug}`,
    title: component.title,
    description: component.description,
  });
}

export default async function ComponentDetailPage({
  params,
}: ComponentDetailPageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const component = getLocalizedComponentDoc(locale, slug);

  if (!component) {
    notFound();
  }

  const exampleItems = Array.from(new Set([...component.importCode.matchAll(/from\s+["']@\/components\/ui\/([a-z0-9-]+)["']/g)].map((match) => match[1])));
  const exampleInstall = `npx shadcn@latest add ${exampleItems.map((name) => `@neumorphism-ui/${name}`).join(" ")}`;
  const messages = getMessages(locale);
  const groups = getLocalizedComponentDocGroups(locale);
  const category = groups.find(
    ({ category: group }) => group.id === component.category,
  )?.category;
  const navigationComponents = groups.flatMap(({ items }) => items);
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
      <article className="component-doc-article">
        <header className="component-doc-intro">
          <nav
            aria-label={messages.componentDetail.breadcrumb}
            className="component-doc-breadcrumb"
          >
            <Link href={localeHref(locale, "/components")}>Components</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{component.title}</span>
          </nav>
          <div className="component-doc-kicker">
            <span>{category?.label}</span>
            <a href={`/r/${component.slug}.json`} target="_blank">
              {messages.common.registryJson}
            </a>
          </div>
          <h1>{component.title}</h1>
          <p className="component-doc-description">{component.description}</p>
        </header>

        <section className="component-doc-section" id="preview">
          <div className="component-doc-section-heading">
            <h2>{messages.common.preview}</h2>
          </div>
          <ComponentExample
            code={component.usageCode}
            copy={componentPreviewMessages[locale]}
            slug={component.slug}
          />
        </section>

        <section className="component-doc-section" id="installation">
          <div className="component-doc-section-heading">
            <h2>{messages.common.installation}</h2>
          </div>
          <ComponentInstallation slug={component.slug} />
          <p className="docs-section-note">
            {messages.componentDetail.firstUsePrefix}{" "}
            <Link href={localeHref(locale, "/docs/installation")}>
              {messages.componentDetail.namespaceSetup}
            </Link>{" "}
            {messages.componentDetail.firstUseSuffix}
          </p>
        </section>

        <section className="component-doc-section" id="usage">
          <div className="component-doc-section-heading">
            <h2>{messages.common.usage}</h2>
          </div>
          {exampleItems.length > 1 && <CopyableCode code={exampleInstall} label={`${messages.common.usage}: ${messages.common.installation}`} />}
          <div className="component-doc-code-block">
            <h3>Import</h3>
            <CopyableCode
              code={component.importCode}
              label={formatMessage(messages.componentDetail.importCode, {
                title: component.title,
              })}
              multiline
            />
          </div>
          <div className="component-doc-code-block">
            <h3>Example</h3>
            <CopyableCode
              code={component.usageCode}
              label={formatMessage(messages.componentDetail.usageCode, {
                title: component.title,
              })}
              multiline
            />
          </div>
        </section>

        <section className="component-doc-section" id="api-reference">
          <div className="component-doc-section-heading">
            <h2>{messages.common.apiReference}</h2>
          </div>
          <div className="component-api-table-wrap">
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
