import { cn } from "@/lib/utils";

export type BlogPostLocale = "ko" | "en" | "ja" | "zh";

export type BlogPostSection = {
  heading: string;
  paragraphs: readonly string[];
  points?: readonly string[];
};

export type BlogArticle = {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  publishedAt: string;
  publishedLabel: string;
  readTime: string;
  intro: string;
  sections: readonly BlogPostSection[];
};

export interface BlogPostProps {
  post: BlogArticle;
  backHref?: string;
  locale?: BlogPostLocale;
  className?: string;
}

const copy = {
  ko: { all: "모든 글", back: "맨 위로" },
  en: { all: "All posts", back: "Back to top" },
  ja: { all: "すべての記事", back: "先頭へ" },
  zh: { all: "全部文章", back: "返回顶部" },
} as const;

export function BlogPost({
  post,
  backHref = "/blog",
  locale = "en",
  className,
}: BlogPostProps) {
  const t = copy[locale];

  return (
    <article
      id="blog-post-top"
      data-slot="blog-post"
      className={cn("mx-auto w-full max-w-3xl text-[var(--foreground)]", className)}
    >
      <header className="grid gap-5 border-b border-[var(--border)] pb-7">
        <a
          href={backHref}
          className="w-fit rounded-[var(--neu-radius-control)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] px-4 py-2 text-sm font-semibold no-underline [box-shadow:var(--neu-shadow-raised-sm)] outline-none hover:[box-shadow:var(--neu-shadow-hover)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] active:[box-shadow:var(--neu-shadow-inset)]"
        >
          ← {t.all}
        </a>
        <p className="text-sm font-semibold text-[var(--muted-foreground)]">{post.topic}</p>
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-[var(--muted-foreground)]">
          {post.summary}
        </p>
        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted-foreground)]">
          <time dateTime={post.publishedAt}>{post.publishedLabel}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readTime}</span>
        </div>
      </header>

      <p className="my-8 rounded-[var(--neu-radius-surface)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] px-5 py-5 text-lg leading-relaxed [box-shadow:var(--neu-shadow-inset)] sm:px-7">
        {post.intro}
      </p>

      <div className="grid gap-10">
        {post.sections.map((section, index) => {
          const headingId = post.slug + "-section-" + (index + 1);
          return (
            <section key={section.heading} aria-labelledby={headingId} className="grid gap-4">
              <h2 id={headingId} className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {section.heading}
              </h2>
              <div className="grid gap-4 text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.points?.length ? (
                <ul className="grid list-disc gap-2 pl-6 text-base leading-7 text-[var(--muted-foreground)]">
                  {section.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              ) : null}
            </section>
          );
        })}
      </div>

      <footer className="mt-10 flex items-center justify-between gap-4 border-t border-[var(--border)] pt-5 text-sm text-[var(--muted-foreground)]">
        <a href={backHref} className="hover:underline">{t.all}</a>
        <a href="#blog-post-top" className="hover:underline">{t.back}</a>
      </footer>
    </article>
  );
}

const exampleArticle: BlogArticle = {
  slug: "small-interfaces",
  title: "Why small interfaces age better",
  summary: "A practical case for fewer controls, clearer defaults, and less maintenance.",
  topic: "Design",
  publishedAt: "2026-09-12",
  publishedLabel: "Sep 12, 2026",
  readTime: "5 min read",
  intro: "Small interfaces are easier to understand on the first visit and easier to maintain on the hundredth release.",
  sections: [
    {
      heading: "Start with the boundary",
      paragraphs: [
        "A useful interface begins by deciding what it will not ask the user to manage.",
        "Keep the controls that change the outcome and move rare configuration closer to the moment it matters.",
      ],
    },
    {
      heading: "Make the default path obvious",
      paragraphs: [
        "A strong default removes a decision without hiding what happened.",
      ],
      points: [
        "Name the primary action precisely.",
        "Show the current state beside the control that changes it.",
        "Keep advanced choices available without making them mandatory.",
      ],
    },
  ],
};

export function BlogPostExample({ locale = "en" }: { locale?: BlogPostLocale }) {
  return <BlogPost post={exampleArticle} locale={locale} backHref="#all-posts" />;
}
