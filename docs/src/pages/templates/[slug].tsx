import type { RouteConfig } from "fumapress";
import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";

import { CopyableCode } from "@/components/docs/copyable-code";
import { InstallCommand } from "@/components/docs/install-command";
import { templateCopy } from "@/components/docs/template-copy";
import { TemplatePreview, type TemplateSlug } from "@/components/docs/template-preview";
import { isLocale, localeHref, type Locale } from "@/i18n/config";
import analyticsSource from "@/public/r/template-analytics.json";
import blogSource from "@/public/r/template-blog.json";
import blogPostSource from "@/public/r/template-blog-post.json";
import cmsSource from "@/public/r/template-cms.json";
import recordsSource from "@/public/r/template-data-manager.json";
import linksSource from "@/public/r/template-link-hub.json";
import portfolioSource from "@/public/r/template-portfolio.json";
import settingsSource from "@/public/r/template-settings.json";

const templateSlugs = [
  "settings",
  "data-manager",
  "dashboard",
  "link-hub",
  "portfolio",
  "blog",
  "blog-post",
  "cms",
] as const satisfies readonly TemplateSlug[];

function isTemplateSlug(value: string): value is TemplateSlug {
  return templateSlugs.includes(value as TemplateSlug);
}

function templateTitle(slug: TemplateSlug, locale: Locale) {
  const t = templateCopy[locale];
  switch (slug) {
    case "dashboard":
      return t.dashboard;
    case "settings":
      return t.settings;
    case "data-manager":
      return t.records;
    case "link-hub":
      return t.links;
    case "portfolio":
      return t.portfolio;
    case "blog":
      return t.blog;
    case "blog-post":
      return t.blogPost;
    case "cms":
      return t.cms;
  }
}

function templateDescription(slug: TemplateSlug, locale: Locale) {
  const t = templateCopy[locale];
  switch (slug) {
    case "dashboard":
      return t.dashboardBody;
    case "settings":
      return t.settingsBody;
    case "data-manager":
      return t.recordsBody;
    case "link-hub":
      return t.linksBody;
    case "portfolio":
      return t.portfolioBody;
    case "blog":
      return t.blogBody;
    case "blog-post":
      return t.blogPostBody;
    case "cms":
      return t.cmsBody;
  }
}

function templateNote(slug: TemplateSlug, locale: Locale) {
  const t = templateCopy[locale];
  switch (slug) {
    case "dashboard":
      return t.analyticsNote;
    case "link-hub":
      return t.linksNote;
    case "portfolio":
      return t.portfolioNote;
    case "blog":
      return t.blogNote;
    case "blog-post":
      return t.blogPostNote;
    case "cms":
      return t.cmsNote;
    default:
      return t.note;
  }
}

function templateSource(slug: TemplateSlug) {
  switch (slug) {
    case "dashboard":
      return analyticsSource;
    case "settings":
      return settingsSource;
    case "data-manager":
      return recordsSource;
    case "link-hub":
      return linksSource;
    case "portfolio":
      return portfolioSource;
    case "blog":
      return blogSource;
    case "blog-post":
      return blogPostSource;
    case "cms":
      return cmsSource;
  }
}

function templateUsage(slug: TemplateSlug, locale: Locale) {
  switch (slug) {
    case "dashboard":
      return `"use client";
import { AnalyticsDashboard, type AnalyticsRecord } from "@/components/blocks/analytics-dashboard";

export function Example({ records }: { records: AnalyticsRecord[] }) {
  return <AnalyticsDashboard records={records} locale="${locale}" currency="USD" />;
}`;
    case "settings":
      return `"use client";
import { SettingsPanel, type ProfileSettings } from "@/components/blocks/settings-panel";

export function Example({ profile, saveProfile }: {
  profile: ProfileSettings;
  saveProfile: (values: ProfileSettings) => Promise<void>;
}) {
  return <SettingsPanel initialValues={profile} onSave={saveProfile} locale="${locale}" />;
}`;
    case "data-manager":
      return `"use client";
import { DataManager, type ManagedRecord } from "@/components/blocks/data-manager";

export function Example({ records, saveRecord, deleteRecords }: {
  records: ManagedRecord[];
  saveRecord: (record: ManagedRecord) => Promise<void>;
  deleteRecords: (ids: string[]) => Promise<void>;
}) {
  return <DataManager initialRecords={records} onSave={saveRecord} onDelete={deleteRecords} locale="${locale}" />;
}`;
    case "link-hub":
      return `"use client";
import { LinkHub, type LinkHubLink, type LinkHubProfile } from "@/components/blocks/link-hub";

export function Example({ profile, links, contactEmail }: {
  profile: LinkHubProfile;
  links: LinkHubLink[];
  contactEmail?: string;
}) {
  return <LinkHub profile={profile} links={links} contactEmail={contactEmail} locale="${locale}" />;
}`;
    case "portfolio":
      return `import { Portfolio, type PortfolioProfile, type PortfolioProject } from "@/components/blocks/portfolio";

export function Example({ profile, projects }: {
  profile: PortfolioProfile;
  projects: PortfolioProject[];
}) {
  return <Portfolio profile={profile} projects={projects} locale="${locale}" />;
}`;
    case "blog":
      return `"use client";
import { Blog, type BlogPost } from "@/components/blocks/blog";

export function Example({ posts }: { posts: BlogPost[] }) {
  return <Blog posts={posts} locale="${locale}" basePath="/blog" />;
}`;
    case "cms":
      return `"use client";
import { CmsWorkspace, type CmsPost } from "@/components/blocks/cms";

export function Example({
  posts,
  savePost,
}: {
  posts: CmsPost[];
  savePost: (post: CmsPost) => Promise<void>;
}) {
  return <CmsWorkspace initialPosts={posts} onSave={savePost} locale="${locale}" />;
}`;
  }
}

export async function getConfig() {
  return { staticPaths: [...templateSlugs] } satisfies RouteConfig;
}

export default function TemplatePage({
  lang,
  slug,
}: {
  lang: string;
  slug: string;
}) {
  if (!isLocale(lang) || !isTemplateSlug(slug)) notFound();

  const locale = lang;
  const t = templateCopy[locale];
  const source = templateSource(slug);
  const usage = templateUsage(slug, locale);

  return (
    <div className="mx-auto w-full max-w-7xl px-5 pt-8 pb-16 sm:px-8 sm:pt-12">
      <article className="docs-content docs-article">
        <header className="docs-page-header">
          <Link href={localeHref(locale, "/templates")} className="text-sm">
            ← {t.back}
          </Link>
          <h1>{templateTitle(slug, locale)}</h1>
          <p>{templateDescription(slug, locale)}</p>
        </header>

        <TemplatePreview slug={slug} locale={locale} />

        <section className="docs-content-section mt-10" id="installation">
          <h2>{t.install}</h2>
          <p>{t.base}</p>
          <InstallCommand name={source.name} />
          <h3>{t.use}</h3>
          <CopyableCode code={usage} label={t.use} multiline />
          <h3>{t.integration}</h3>
          <p>{templateNote(slug, locale)}</p>
          {(slug === "settings" || slug === "data-manager" || slug === "cms") && (
            <p>{t.imports}</p>
          )}
        </section>

        <section className="docs-content-section" id="installed-source">
          <h2>{t.source}</h2>
          {source.files.map((file) => (
            <details key={file.path} className="docs-disclosure">
              <summary>
                <code>{file.target ?? file.path}</code>
              </summary>
              <CopyableCode code={file.content} label={file.target ?? file.path} multiline />
            </details>
          ))}
        </section>
      </article>
    </div>
  );
}
