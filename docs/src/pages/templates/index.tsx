import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";

import { templateCopy } from "@/components/docs/template-copy";
import { TemplatePreview, type TemplateSlug } from "@/components/docs/template-preview";
import { isLocale, localeHref } from "@/i18n/config";

type TemplateCard = {
  slug: TemplateSlug;
  title: string;
  description: string;
  tags: string;
};

export default function TemplatesPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();

  const locale = lang;
  const t = templateCopy[locale];
  const items: TemplateCard[] = [
    {
      slug: "dashboard",
      title: t.dashboard,
      description: t.dashboardBody,
      tags: "Chart · Recharts · CSV",
    },
    {
      slug: "settings",
      title: t.settings,
      description: t.settingsBody,
      tags: "Form · Field · Switch · Toast",
    },
    {
      slug: "data-manager",
      title: t.records,
      description: t.recordsBody,
      tags: "Data Table · Date Picker · Sheet · Menubar",
    },
    {
      slug: "link-hub",
      title: t.links,
      description: t.linksBody,
      tags: "Button · External links · Clipboard",
    },
    {
      slug: "portfolio",
      title: t.portfolio,
      description: t.portfolioBody,
      tags: "Case studies · Details · Contact",
    },
    {
      slug: "blog",
      title: t.blog,
      description: t.blogBody,
      tags: "Search · Topics · Sort",
    },
    {
      slug: "cms",
      title: t.cms,
      description: t.cmsBody,
      tags: "Editor · Dirty state · Preview",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-5 pt-8 pb-16 sm:px-8 sm:pt-12">
      <article className="docs-content docs-article">
        <header className="docs-page-header">
          <h1>{t.title}</h1>
          <p>{t.intro}</p>
        </header>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          {items.map((item) => (
            <section
              key={item.slug}
              className="grid min-w-0 gap-6 rounded-[var(--neu-radius-surface)] border border-[var(--neu-edge)] bg-[var(--neu-surface)] p-5 [box-shadow:var(--neu-shadow-raised-sm)]"
            >
              <div
                aria-hidden="true"
                inert
                className="relative h-56 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background)] [box-shadow:var(--neu-shadow-inset)]"
              >
                <div className="pointer-events-none absolute start-4 top-2 w-[960px] origin-top-left scale-[0.3]">
                  <TemplatePreview slug={item.slug} locale={locale} />
                </div>
              </div>

              <div className="grid gap-3">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                  {item.description}
                </p>
                <p className="text-xs leading-relaxed text-[var(--muted-foreground)]">
                  {item.tags}
                </p>
              </div>

              <Link
                href={localeHref(locale, `/templates/${item.slug}`)}
                className="rounded-lg py-1 text-sm font-semibold text-[var(--foreground)] no-underline outline-none hover:underline focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              >
                {t.open}: {item.title} <span aria-hidden="true">→</span>
              </Link>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
