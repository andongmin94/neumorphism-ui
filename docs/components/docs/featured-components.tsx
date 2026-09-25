"use client";

import { Link } from "fumapress/client";

import { ComponentDetailPreview } from "@/components/docs/component-detail-preview";
import { componentPreviewMessages } from "@/i18n/component-preview-messages";
import { localeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";

const copy = {
  ko: {
    kicker: "LIVE PRIMITIVES",
    title: "문서에 있는 바로 그 컴포넌트.",
    body: "별도 showcase 구현이 아니라 실제 registry source를 작은 제품 장면으로 렌더링합니다.",
    open: "문서 열기",
  },
  en: {
    kicker: "LIVE PRIMITIVES",
    title: "The same components you install.",
    body: "These are not separate showcase mocks. Each stage renders the actual registry source used by the documentation.",
    open: "Open docs",
  },
  ja: {
    kicker: "LIVE PRIMITIVES",
    title: "インストールするものと同じコンポーネント。",
    body: "別の showcase 実装ではなく、ドキュメントが使う実際の registry source を表示します。",
    open: "ドキュメントを開く",
  },
  zh: {
    kicker: "LIVE PRIMITIVES",
    title: "与你安装的源码完全一致。",
    body: "这里不是单独制作的展示 mock，而是直接渲染文档正在使用的 registry source。",
    open: "打开文档",
  },
} as const;

const featured = [
  { slug: "button", label: "Button", index: "01" },
  { slug: "dialog", label: "Dialog", index: "02" },
  { slug: "command", label: "Command", index: "03" },
  { slug: "carousel", label: "Carousel", index: "04" },
] as const;

export function FeaturedComponents() {
  const { locale } = useLocale();
  const t = copy[locale];

  return (
    <section className="featured-components-section" aria-labelledby="featured-components-title">
      <header className="featured-components-heading">
        <span>{t.kicker}</span>
        <h2 id="featured-components-title">{t.title}</h2>
        <p>{t.body}</p>
      </header>

      <div className="featured-components-grid">
        {featured.map((item) => (
          <article className="featured-component-card" key={item.slug}>
            <div className="featured-component-stage" aria-hidden="true" inert>
              <div className="featured-component-stage-inner">
                <ComponentDetailPreview
                  copy={componentPreviewMessages[locale]}
                  locale={locale}
                  slug={item.slug}
                />
              </div>
            </div>
            <footer>
              <div>
                <span>{item.index}</span>
                <strong>{item.label}</strong>
              </div>
              <Link href={localeHref(locale, `/components/${item.slug}`)}>
                {t.open} <span aria-hidden="true">↗</span>
              </Link>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
