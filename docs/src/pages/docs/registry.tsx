import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";

import { CopyableCode } from "@/components/docs/copyable-code";
import { InstallCommand } from "@/components/docs/install-command";
import { REGISTRY_NAMESPACE, getRegistryUrlTemplate } from "@/components/docs/registry-config";
import { getRequestOrigin } from "@/components/docs/request-origin";
import { isLocale, localeHref } from "@/i18n/config";

const copy = {
  ko: { title: "Registry 구조", intro: "source ownership, generated endpoint, dependency closure와 설치 경계를 설명합니다.", ownership: "Source ownership", generated: "Generated output", install: "설치 흐름", directory: "Directory metadata", boundaries: "경계", next: "컴포넌트 보기" },
  en: { title: "Registry architecture", intro: "How source ownership, generated endpoints, dependency closure and installation boundaries fit together.", ownership: "Source ownership", generated: "Generated output", install: "Installation flow", directory: "Directory metadata", boundaries: "Boundaries", next: "Browse components" },
  ja: { title: "Registry 構造", intro: "source ownership、生成 endpoint、依存関係、インストール境界を説明します。", ownership: "Source ownership", generated: "Generated output", install: "インストールの流れ", directory: "Directory metadata", boundaries: "境界", next: "コンポーネントを見る" },
  zh: { title: "Registry 架构", intro: "说明 source ownership、生成端点、依赖闭包和安装边界。", ownership: "Source ownership", generated: "Generated output", install: "安装流程", directory: "Directory metadata", boundaries: "边界", next: "浏览组件" },
} as const;

export default async function RegistryArchitecturePage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const locale = lang;
  const t = copy[locale];
  const origin = await getRequestOrigin();
  const urlTemplate = getRegistryUrlTemplate(origin);

  return (
    <div className="docs-reference-page">
      <article className="docs-content docs-article docs-reference-article">
        <header className="docs-page-header"><h1>{t.title}</h1><p>{t.intro}</p></header>

        <section className="docs-content-section">
          <h2>{t.ownership}</h2>
          <table>
            <thead><tr><th>Path</th><th>Owns</th></tr></thead>
            <tbody>
              <tr><td><code>registry/src/components/ui</code></td><td>Installable UI primitives</td></tr>
              <tr><td><code>registry/src/components/blocks</code></td><td>Templates, workspaces and chart recipes</td></tr>
              <tr><td><code>registry/src/lib</code></td><td>Shared utilities and analytics model</td></tr>
              <tr><td><code>registry/src/theme.ts</code></td><td>Preset data and token calculation</td></tr>
              <tr><td><code>registry/catalog.json</code></td><td>Item metadata and dependency declarations</td></tr>
            </tbody>
          </table>
        </section>

        <section className="docs-content-section">
          <h2>{t.generated}</h2>
          <ul>
            <li><code>registry/registry.json</code> and <code>registry/public/r</code> are built from source.</li>
            <li><code>docs/public/r</code> mirrors the same install endpoints for documentation.</li>
            <li><code>docs/src/registry</code> is a synchronized ignored build input, not a second source of truth.</li>
            <li>Generated CSS and theme bootstrap come from the same theme engine.</li>
          </ul>
        </section>

        <section className="docs-content-section">
          <h2>{t.install}</h2>
          <p><code>{REGISTRY_NAMESPACE}</code> resolves through one URL template, and shadcn follows each item's declared registry dependencies.</p>
          <CopyableCode code={urlTemplate} label="Registry URL template" />
          <InstallCommand name="button" />
          <p>Independent-install CI creates fresh projects per file-bearing item. Template items build in Next.js; other items build in both Next.js and Vite.</p>
        </section>

        <section className="docs-content-section">
          <h2>{t.directory}</h2>
          <p><code>registry/directory-entry.json</code> stores the current namespace, homepage, endpoint template, description and inline logo. Its presence does not imply directory submission or approval.</p>
        </section>

        <section className="docs-content-section">
          <h2>{t.boundaries}</h2>
          <ul>
            <li>The registry does not own application authentication, authorization, persistence, routing or business data.</li>
            <li>Component installation must not overwrite application-owned CSS, customized source, aliases or routes.</li>
            <li>Obsolete paths are removed instead of kept behind compatibility aliases.</li>
          </ul>
          <p><Link href={localeHref(locale, "/components")}>{t.next} →</Link></p>
        </section>
      </article>
    </div>
  );
}
