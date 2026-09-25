import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";

import { isLocale, localeHref } from "@/i18n/config";

const copy = {
  ko: { title: "리소스", intro: "컴포넌트, 템플릿, 차트, 테마와 Registry 검증으로 빠르게 이동합니다.", product: "제품 표면", engineering: "개발·검증", source: "소스 확인" },
  en: { title: "Resources", intro: "Quick paths to components, templates, charts, themes and registry verification.", product: "Product surfaces", engineering: "Engineering & verification", source: "Inspect source" },
  ja: { title: "リソース", intro: "コンポーネント、テンプレート、チャート、テーマ、Registry 検証へのショートカットです。", product: "プロダクト", engineering: "開発・検証", source: "ソース確認" },
  zh: { title: "资源", intro: "快速访问组件、模板、图表、主题和 Registry 验证。", product: "产品界面", engineering: "开发与验证", source: "查看源码" },
} as const;

const verificationCommands = "npm run lint --prefix registry\nnpm run build --prefix registry\nnpm run sync:docs --prefix registry\nnpm test --prefix registry\nnpm run typecheck --prefix docs\nnpm run build --prefix docs\nnode registry/scripts/verify-independent-items.mjs --shard=1/1";

export default function ResourcesPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const locale = lang;
  const t = copy[locale];
  const product = [
    ["/components", "Components", "56 installable UI primitives"],
    ["/templates", "Templates", "Workspaces and application page patterns"],
    ["/charts", "Charts", "Product analytics and operational chart recipes"],
    ["/customize", "Theme Studio", "Preset, depth, light, shape and motion controls"],
  ] as const;

  return (
    <div className="mx-auto w-full max-w-5xl px-5 pt-8 pb-16 sm:px-8 sm:pt-12">
      <article className="docs-content docs-article">
        <header className="docs-page-header"><h1>{t.title}</h1><p>{t.intro}</p></header>

        <section className="docs-content-section">
          <h2>{t.product}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {product.map(([href, title, body]) => (
              <Link key={href} href={localeHref(locale, href)} className="rounded-[var(--neu-radius-surface)] border border-[var(--neu-edge)] bg-[var(--neu-surface)] p-5 text-[var(--foreground)] no-underline [box-shadow:var(--neu-shadow-raised-sm)] outline-none hover:[box-shadow:var(--neu-shadow-hover)] focus-visible:ring-2 focus-visible:ring-[var(--ring)]">
                <strong>{title}</strong><span className="mt-2 block text-sm text-[var(--muted-foreground)]">{body}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="docs-content-section">
          <h2>{t.engineering}</h2>
          <pre><code>{verificationCommands}</code></pre>
        </section>

        <section className="docs-content-section">
          <h2>{t.source}</h2>
          <ul>
            <li><a href="/r/registry.json">/r/registry.json</a> — generated public catalog</li>
            <li><Link href={localeHref(locale, "/docs/registry")}>Registry architecture</Link> — ownership and generated boundaries</li>
            <li><Link href={localeHref(locale, "/docs/design-tokens")}>Design tokens</Link> — theme contract and finite settings</li>
          </ul>
        </section>
      </article>
    </div>
  );
}
