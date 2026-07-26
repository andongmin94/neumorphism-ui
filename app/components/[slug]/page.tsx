import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ComponentExample } from "@/components/docs/component-example";
import { ComponentInstallation } from "@/components/docs/component-installation";
import {
  componentDocGroups,
  componentDocs,
  getComponentDoc,
} from "@/components/docs/component-docs-data";
import { CopyableCode } from "@/components/docs/copyable-code";

type ComponentDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return componentDocs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ComponentDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const component = getComponentDoc(slug);

  if (!component) {
    return { title: "Component not found" };
  }

  return {
    title: component.title,
    description: component.description,
  };
}

export default async function ComponentDetailPage({
  params,
}: ComponentDetailPageProps) {
  const { slug } = await params;
  const component = getComponentDoc(slug);

  if (!component) {
    notFound();
  }

  const category = componentDocGroups.find(
    ({ category: group }) => group.id === component.category,
  )?.category;
  const navigationComponents = componentDocGroups.flatMap(({ items }) => items);
  const componentIndex = navigationComponents.findIndex(
    (item) => item.slug === slug,
  );
  const previous = navigationComponents[componentIndex - 1];
  const next = navigationComponents[componentIndex + 1];

  return (
    <div className="component-doc-page site-shell">
      <aside className="component-doc-sidebar" aria-label="컴포넌트 문서">
        <div className="component-doc-sidebar-heading">
          <Link href="/components">
            <span aria-hidden="true">←</span>
            All components
          </Link>
          <span>26 COMPONENTS</span>
        </div>

        <nav>
          {componentDocGroups.map(({ category: group, items }) => (
            <div className="component-doc-sidebar-group" key={group.id}>
              <span>{group.label}</span>
              {items.map((item) => (
                  <Link
                    aria-current={item.slug === slug ? "page" : undefined}
                    className={item.slug === slug ? "is-current" : undefined}
                    href={`/components/${item.slug}`}
                    key={item.slug}
                  >
                    {item.title}
                  </Link>
                ))}
            </div>
          ))}
        </nav>
      </aside>

      <article className="component-doc-article">
        <header className="component-doc-intro">
          <nav aria-label="Breadcrumb" className="component-doc-breadcrumb">
            <Link href="/components">Components</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{component.title}</span>
          </nav>
          <div className="component-doc-kicker">
            <span>{category?.label}</span>
            <a href={`/r/${component.slug}.json`} target="_blank">
              Registry JSON <span aria-hidden="true">↗</span>
            </a>
          </div>
          <h1>{component.title}</h1>
          <p className="component-doc-summary">{component.summary}</p>
          <p className="component-doc-description">{component.description}</p>
          <div className="component-doc-quick-links" aria-label="이 페이지에서">
            <a href="#preview">Preview</a>
            <a href="#installation">Installation</a>
            <a href="#usage">Usage</a>
            <a href="#api-reference">API</a>
            <a href="#accessibility">Accessibility</a>
          </div>
        </header>

        <section className="component-doc-section" id="preview">
          <div className="component-doc-section-heading">
            <span>01 / LIVE</span>
            <div>
              <h2>Preview</h2>
              <p>
                실제 Registry 소스를 사용하는 예제입니다. 상태를 바꾸고 키보드로
                조작한 뒤 Code 탭에서 대표 사용 구성을 확인하세요.
              </p>
            </div>
          </div>
          <ComponentExample code={component.usageCode} slug={component.slug} />
        </section>

        <section className="component-doc-section" id="installation">
          <div className="component-doc-section-heading">
            <span>02 / INSTALL</span>
            <div>
              <h2>Installation</h2>
              <p>
                namespace를 한 번 연결한 뒤 필요한 컴포넌트만 프로젝트 소스로
                복사합니다.
              </p>
            </div>
          </div>
          <ComponentInstallation slug={component.slug} />
          <div className="component-doc-callout">
            <span aria-hidden="true">i</span>
            <p>
              아직 Registry를 연결하지 않았다면 먼저{" "}
              <Link href="/docs/installation">설치 가이드</Link>의 namespace
              설정을 완료하세요.
            </p>
          </div>
        </section>

        <section className="component-doc-section" id="usage">
          <div className="component-doc-section-heading">
            <span>03 / USE</span>
            <div>
              <h2>Usage</h2>
              <p>
                설치가 끝나면 일반 shadcn 컴포넌트처럼 로컬 경로에서 import해
                조합합니다.
              </p>
            </div>
          </div>
          <div className="component-doc-code-block">
            <h3>Import</h3>
            <CopyableCode
              code={component.importCode}
              label={`${component.title} import 코드`}
              multiline
            />
          </div>
          <div className="component-doc-code-block">
            <h3>Example</h3>
            <CopyableCode
              code={component.usageCode}
              label={`${component.title} 사용 코드`}
              multiline
            />
          </div>
        </section>

        <section className="component-doc-section" id="api-reference">
          <div className="component-doc-section-heading">
            <span>04 / API</span>
            <div>
              <h2>API Reference</h2>
              <p>
                이 Registry 구현에서 자주 쓰는 props만 정리했습니다. 나머지
                native 또는 Radix props도 그대로 전달됩니다.
              </p>
            </div>
          </div>
          <div className="component-api-table-wrap">
            <table className="component-api-table">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {component.props.map((prop) => (
                  <tr key={`${prop.component}-${prop.name}`}>
                    <td><code>{prop.component}</code></td>
                    <td>
                      <code>{prop.name}</code>
                      {prop.required ? <span className="api-required">required</span> : null}
                    </td>
                    <td><code>{prop.type}</code></td>
                    <td><code>{prop.defaultValue ?? "—"}</code></td>
                    <td>{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="component-doc-section" id="accessibility">
          <div className="component-doc-section-heading">
            <span>05 / A11Y</span>
            <div>
              <h2>Accessibility</h2>
              <p>
                뉴모피즘의 깊이는 보조 신호이며, 의미·focus·keyboard 동작을
                대신하지 않습니다.
              </p>
            </div>
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

        <nav className="component-doc-pagination" aria-label="컴포넌트 문서 이동">
          {previous ? (
            <Link href={`/components/${previous.slug}`}>
              <span>Previous</span>
              <strong><span aria-hidden="true">←</span> {previous.title}</strong>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/components/${next.slug}`}>
              <span>Next</span>
              <strong>{next.title} <span aria-hidden="true">→</span></strong>
            </Link>
          ) : <span />}
        </nav>
      </article>
    </div>
  );
}
