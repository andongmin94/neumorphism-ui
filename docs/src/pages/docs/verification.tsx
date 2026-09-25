import { notFound } from "fumapress/router";

import { isLocale } from "@/i18n/config";

const copy = {
  ko: {
    title: "검증과 릴리스",
    intro: "무엇을 어떤 gate에서 검증하고, 어떤 증거를 릴리스 판단에 쓰는지 설명합니다.",
    source: "Source contracts",
    generation: "생성 일치",
    consumers: "소비자 설치",
    browser: "브라우저 검증",
    release: "릴리스 경계",
  },
  en: {
    title: "Verification & release",
    intro: "The gates used to verify source, generated output, real consumer installs and documentation behavior.",
    source: "Source contracts",
    generation: "Generated equality",
    consumers: "Consumer installation",
    browser: "Browser verification",
    release: "Release boundaries",
  },
  ja: {
    title: "検証とリリース",
    intro: "source、生成物、実際の consumer install、ドキュメント動作を確認する gate です。",
    source: "Source contract",
    generation: "生成一致",
    consumers: "Consumer install",
    browser: "ブラウザ検証",
    release: "リリース境界",
  },
  zh: {
    title: "验证与发布",
    intro: "用于验证源码、生成产物、真实消费者安装和文档行为的各层 gate。",
    source: "源码契约",
    generation: "生成一致性",
    consumers: "消费者安装",
    browser: "浏览器验证",
    release: "发布边界",
  },
} as const;

const commands = [
  "npm run lint --prefix registry",
  "npm run build --prefix registry",
  "npm run sync:docs --prefix registry",
  "npm test --prefix registry",
  "npm run check:generated --prefix registry",
  "npm run lint --prefix docs",
  "npm run typecheck --prefix docs",
  "npm run build --prefix docs",
].join("\n");

export default function VerificationPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const t = copy[lang];

  return (
    <div className="docs-reference-page">
      <article className="docs-content docs-article docs-reference-article">
        <header className="docs-page-header"><h1>{t.title}</h1><p>{t.intro}</p></header>

        <section className="docs-content-section">
          <h2>{t.source}</h2>
          <pre><code>{commands}</code></pre>
          <p>Registry tests verify dependency closure, documented examples, theme contracts and generated-source assumptions before browser work begins.</p>
        </section>

        <section className="docs-content-section">
          <h2>{t.generation}</h2>
          <ul>
            <li><code>registry/registry.json</code>, both public endpoint copies, theme CSS and bootstrap are source-derived.</li>
            <li><code>check:generated</code> requires byte-equivalent generated output and matching item lists.</li>
            <li>The final clean-generation step rejects tracked diffs and unexpected untracked files.</li>
          </ul>
        </section>

        <section className="docs-content-section">
          <h2>{t.consumers}</h2>
          <ul>
            <li>Aggregate scenarios cover fresh/existing Vite and Next.js projects, real shadcn installs, custom aliases and application-owned CSS/source preservation.</li>
            <li>The independent matrix derives every file-bearing item from the built catalog.</li>
            <li>Templates build in fresh Next.js projects; other items build independently in both Next.js and Vite.</li>
            <li>The independent matrix is sharded across three CI jobs to keep the release gate finite.</li>
          </ul>
        </section>

        <section className="docs-content-section">
          <h2>{t.browser}</h2>
          <ul>
            <li>Chromium, Firefox and WebKit exercise installed consumer interactions without documentation CSS.</li>
            <li>Documentation Playwright checks localized routes, light/dark layouts, mobile reflow, templates, charts and recovery states.</li>
            <li>Failure evidence is retained under <code>docs/test-results</code> by CI artifacts.</li>
          </ul>
        </section>

        <section className="docs-content-section">
          <h2>{t.release}</h2>
          <ul>
            <li>A passing local or CI build does not claim shadcn directory approval or deployed-domain equivalence.</li>
            <li>Live-domain verification must match the exact deployed commit and public registry endpoints.</li>
            <li>License and attribution are a separate legal release gate; they are not inferred from repository ownership.</li>
          </ul>
        </section>
      </article>
    </div>
  );
}
