"use client";

import { AnalyticsExample } from "@neumorphism-ui/registry/blocks/analytics-dashboard";
import { Blog } from "@neumorphism-ui/registry/blocks/blog";
import { BlogPost } from "@neumorphism-ui/registry/blocks/blog-post";
import { CmsExample } from "@neumorphism-ui/registry/blocks/cms";
import { DataManagerExample } from "@neumorphism-ui/registry/blocks/data-manager";
import { LinkHubExample } from "@neumorphism-ui/registry/blocks/link-hub";
import { PortfolioExample } from "@neumorphism-ui/registry/blocks/portfolio";
import { SettingsExample } from "@neumorphism-ui/registry/blocks/settings-panel";

import { demoBlogArticles } from "@/components/docs/blog-demo";
import { localeHref, type Locale } from "@/i18n/config";

export type TemplateSlug =
  | "dashboard"
  | "settings"
  | "data-manager"
  | "link-hub"
  | "portfolio"
  | "blog"
  | "blog-post"
  | "cms";

export function TemplatePreview({
  slug,
  locale,
}: {
  slug: TemplateSlug;
  locale: Locale;
}) {
  let content;

  switch (slug) {
    case "dashboard":
      content = <AnalyticsExample locale={locale} />;
      break;
    case "settings":
      content = <SettingsExample locale={locale} />;
      break;
    case "data-manager":
      content = <DataManagerExample locale={locale} />;
      break;
    case "link-hub":
      content = <LinkHubExample locale={locale} />;
      break;
    case "portfolio":
      content = <PortfolioExample locale={locale} />;
      break;
    case "blog":
      content = <Blog posts={demoBlogArticles[locale]} locale={locale} basePath={localeHref(locale, "/templates/blog")} />;
      break;
    case "blog-post":
      content = <BlogPost post={demoBlogArticles[locale][0]} locale={locale} backHref={localeHref(locale, "/templates/blog")} />;
      break;
    case "cms":
      content = <CmsExample locale={locale} />;
      break;
  }

  return (
    <div className="min-w-0 py-4" data-template={slug}>
      {content}
    </div>
  );
}
