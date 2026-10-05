import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";

import { templateCopy } from "@/components/docs/template-copy";
import { TemplatePreview, type TemplateSlug } from "@/components/docs/template-preview";
import styles from "@/components/docs/template-gallery.module.css";
import { isLocale, localeHref } from "@/i18n/config";

type TemplateCard = {
  slug: TemplateSlug;
  registry: string;
  title: string;
  description: string;
};

const pageCopy = {
  en: { count: (n: number) => `${n} templates`, open: "View template" },
  ko: { count: (n: number) => `템플릿 ${n}개`, open: "템플릿 보기" },
  ja: { count: (n: number) => `${n}件のテンプレート`, open: "テンプレートを見る" },
  zh: { count: (n: number) => `${n}个模板`, open: "查看模板" },
} as const;

export default function TemplatesPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();

  const locale = lang;
  const t = templateCopy[locale];
  const page = pageCopy[locale];
  const items: TemplateCard[] = [
    { slug: "dashboard", registry: "template-analytics", title: t.dashboard, description: t.dashboardBody },
    { slug: "settings", registry: "template-settings", title: t.settings, description: t.settingsBody },
    { slug: "data-manager", registry: "template-data-manager", title: t.records, description: t.recordsBody },
    { slug: "link-hub", registry: "template-link-hub", title: t.links, description: t.linksBody },
    { slug: "portfolio", registry: "template-portfolio", title: t.portfolio, description: t.portfolioBody },
    { slug: "blog", registry: "template-blog", title: t.blog, description: t.blogBody },
    { slug: "blog-post", registry: "template-blog-post", title: t.blogPost, description: t.blogPostBody },
    { slug: "cms", registry: "template-cms", title: t.cms, description: t.cmsBody },
  ];

  return (
    <div className={`template-gallery-page ${styles.page}`}>
      <header className={`template-gallery-header ${styles.header}`}>
        <span className={styles.count}>{page.count(items.length)}</span>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
      </header>

      <div className={`template-gallery ${styles.gallery}`}>
        {items.map((item) => (
          <article className={`template-card ${styles.card}`} key={item.slug}>
            <div className={`template-card-preview ${styles.preview}`} aria-hidden="true" inert>
              <div className={`template-preview-stage ${styles.stage}`}>
                <div className={`template-preview-scale ${styles.scale}`}>
                  <TemplatePreview slug={item.slug} locale={locale} />
                </div>
              </div>
            </div>
            <div className={`template-card-body ${styles.body}`}>
              <div className={`template-card-heading ${styles.heading}`}>
                <h2>{item.title}</h2>
              </div>
              <p className={styles.description}>{item.description}</p>
              <div className={styles.footer}>
                <code className={styles.identifier}>@neumorphism-ui/{item.registry}</code>
                <Link className={`template-card-link ${styles.link}`}
                  href={localeHref(locale, `/templates/${item.slug}`)}
                  aria-label={`${page.open}: ${item.title}`}>
                  {page.open}
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
