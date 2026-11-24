import { BlogPost } from "@neumorphism-ui/registry/blocks/blog-post";
import type { WakuRouteConfig } from "fumapress";
import { notFound } from "fumapress/router";

import { demoBlogArticles } from "@/components/docs/blog-demo";
import { PageMetadata } from "@/components/docs/page-metadata";
import { isLocale, localeHref } from "@/i18n/config";

export async function getConfig() {
  return {
    staticPaths: demoBlogArticles.en.map((post) => post.slug),
  } satisfies WakuRouteConfig;
}

export default function BlogDemoPage({ lang, slug }: { lang: string; slug: string }) {
  if (!isLocale(lang)) notFound();
  const post = demoBlogArticles[lang].find((article) => article.slug === slug);
  if (!post) notFound();

  return (
    <div className="docs-content-layout" data-template="blog-post">
      <PageMetadata locale={lang} title={post.title} description={post.summary} />
      <BlogPost post={post} locale={lang} backHref={localeHref(lang, "/templates/blog")} />
    </div>
  );
}
