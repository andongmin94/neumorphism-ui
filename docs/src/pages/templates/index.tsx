import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";

import { templateCopy } from "@/components/docs/template-copy";
import { TemplatePreview, type TemplateSlug } from "@/components/docs/template-preview";
import { isLocale, localeHref } from "@/i18n/config";

type TemplateCard = {
  slug: TemplateSlug;
  title: string;
  description: string;
  tags: readonly string[];
};

const pageCopy = {
  ko: { kicker: "INSTALLABLE SCREENS", note: "source로 설치하고 애플리케이션 데이터와 연결하는 완성 화면 패턴입니다." },
  en: { kicker: "INSTALLABLE SCREENS", note: "Complete screen patterns you install as source and connect to application data." },
  ja: { kicker: "INSTALLABLE SCREENS", note: "source として導入し、アプリケーションデータへ接続する完成画面パターンです。" },
  zh: { kicker: "INSTALLABLE SCREENS", note: "作为源码安装并连接应用数据的完整界面模式。" },
} as const;

export default function TemplatesPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();

  const locale = lang;
  const t = templateCopy[locale];
  const page = pageCopy[locale];
  const items: TemplateCard[] = [
    { slug: "dashboard", title: t.dashboard, description: t.dashboardBody, tags: ["Chart", "Recharts", "CSV"] },
    { slug: "settings", title: t.settings, description: t.settingsBody, tags: ["Form", "Field", "Switch", "Toast"] },
    { slug: "data-manager", title: t.records, description: t.recordsBody, tags: ["Data Table", "Date Picker", "Sheet"] },
    { slug: "link-hub", title: t.links, description: t.linksBody, tags: ["External links", "Clipboard"] },
    { slug: "portfolio", title: t.portfolio, description: t.portfolioBody, tags: ["Case studies", "Details", "Contact"] },
    { slug: "blog", title: t.blog, description: t.blogBody, tags: ["Search", "Topics", "Sort"] },
    { slug: "blog-post", title: t.blogPost, description: t.blogPostBody, tags: ["Article", "Sections", "Static"] },
    { slug: "cms", title: t.cms, description: t.cmsBody, tags: ["Editor", "Dirty state", "Preview"] },
  ];

  return (
    <div className="template-gallery-page">
      <header className="template-gallery-header">
        <span>{page.kicker}</span>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
        <small>{page.note}</small>
      </header>

      <div className="template-gallery">
        {items.map((item, index) => (
          <article
            className={`template-card ${index === 0 ? "template-card-featured" : ""}`}
            key={item.slug}
          >
            <div className="template-card-preview" aria-hidden="true" inert>
              <div className="template-preview-toolbar">
                <span><i /><i /><i /></span>
                <code>{item.slug}</code>
              </div>
              <div className="template-preview-stage">
                <div className="template-preview-scale">
                  <TemplatePreview slug={item.slug} locale={locale} />
                </div>
              </div>
            </div>

            <div className="template-card-body">
              <div className="template-card-heading">
                <div>
                  <span>0{index + 1}</span>
                  <h2>{item.title}</h2>
                </div>
                <span className="template-card-arrow" aria-hidden="true">↗</span>
              </div>
              <p>{item.description}</p>
              <div className="template-tags">
                {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <Link className="template-card-link" href={localeHref(locale, `/templates/${item.slug}`)}>
                {t.open}: {item.title}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
