"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type BlogLocale = "ko" | "en" | "ja" | "zh";

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  publishedAt: string;
  publishedLabel?: string;
  readTimeMinutes?: number;
};

export interface BlogProps {
  posts: readonly BlogPost[];
  basePath?: string;
  locale?: BlogLocale;
  className?: string;
}

const copy = {
  ko: {
    kicker: "FIELD NOTES / DESIGN & ENGINEERING",
    title: "최근 글",
    intro: "실제 작업에서 얻은 제품·디자인·프런트엔드 메모를 모아봅니다.",
    search: "글 검색",
    placeholder: "글 검색…",
    clear: "검색어 지우기",
    filter: "주제로 필터",
    all: "전체",
    sort: "정렬",
    newest: "최신순",
    oldest: "오래된 순",
    shortest: "짧은 읽기순",
    post: "개 글",
    posts: "개 글",
    noResults: "조건에 맞는 글이 없습니다.",
    reset: "필터 초기화",
    read: "분",
  },
  en: {
    kicker: "FIELD NOTES / DESIGN & ENGINEERING",
    title: "Latest posts",
    intro: "Practical notes from product, design and front-end work.",
    search: "Search posts",
    placeholder: "Search posts…",
    clear: "Clear search",
    filter: "Filter posts by topic",
    all: "All",
    sort: "Sort posts",
    newest: "Newest first",
    oldest: "Oldest first",
    shortest: "Shortest read",
    post: "post",
    posts: "posts",
    noResults: "No posts match the current filters.",
    reset: "Reset filters",
    read: "min read",
  },
  ja: {
    kicker: "FIELD NOTES / DESIGN & ENGINEERING",
    title: "最新の記事",
    intro: "プロダクト、デザイン、フロントエンドの実務から得たメモです。",
    search: "記事を検索",
    placeholder: "記事を検索…",
    clear: "検索をクリア",
    filter: "トピックで絞り込む",
    all: "すべて",
    sort: "並び順",
    newest: "新しい順",
    oldest: "古い順",
    shortest: "短い順",
    post: "件",
    posts: "件",
    noResults: "条件に一致する記事はありません。",
    reset: "フィルターをリセット",
    read: "分で読めます",
  },
  zh: {
    kicker: "FIELD NOTES / DESIGN & ENGINEERING",
    title: "最新文章",
    intro: "来自产品、设计与前端工作的实用笔记。",
    search: "搜索文章",
    placeholder: "搜索文章…",
    clear: "清除搜索",
    filter: "按主题筛选",
    all: "全部",
    sort: "排序",
    newest: "最新优先",
    oldest: "最早优先",
    shortest: "阅读时间最短",
    post: "篇",
    posts: "篇",
    noResults: "没有符合当前筛选条件的文章。",
    reset: "重置筛选",
    read: "分钟阅读",
  },
} as const;

function postHref(basePath: string, slug: string) {
  return basePath.replace(/\/$/, "") + "/" + slug;
}

export function Blog({
  posts,
  basePath = "/blog",
  locale = "en",
  className,
}: BlogProps) {
  const t = copy[locale];
  const [query, setQuery] = React.useState("");
  const [topic, setTopic] = React.useState<string>(t.all);
  const [sort, setSort] = React.useState<"newest" | "oldest" | "shortest">("newest");
  const searchRef = React.useRef<HTMLInputElement>(null);

  const topics = React.useMemo(
    () => [t.all, ...Array.from(new Set(posts.map((post) => post.topic)))],
    [posts, t.all],
  );

  React.useEffect(() => {
    if (!topics.includes(topic)) setTopic(t.all);
  }, [topic, topics, t.all]);

  const filteredPosts = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts
      .filter((post) => {
        const matchesTopic = topic === t.all || post.topic === topic;
        const text = [post.title, post.summary, post.topic].join(" ").toLowerCase();
        return matchesTopic && text.includes(normalizedQuery);
      })
      .sort((a, b) => {
        if (sort === "shortest") {
          return (a.readTimeMinutes ?? Number.MAX_SAFE_INTEGER) -
            (b.readTimeMinutes ?? Number.MAX_SAFE_INTEGER);
        }
        return sort === "oldest"
          ? a.publishedAt.localeCompare(b.publishedAt)
          : b.publishedAt.localeCompare(a.publishedAt);
      });
  }, [posts, query, sort, t.all, topic]);

  function resetFilters() {
    setQuery("");
    setTopic(t.all);
    setSort("newest");
    searchRef.current?.focus();
  }

  return (
    <section
      data-slot="blog"
      className={cn("mx-auto grid w-full max-w-3xl gap-7 text-[var(--foreground)]", className)}
    >
      <header className="grid gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
          {t.kicker}
        </p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.title}</h2>
        <p className="max-w-xl text-sm leading-relaxed text-[var(--muted-foreground)]">
          {t.intro}
        </p>
      </header>

      <section className="grid gap-4 rounded-[var(--neu-radius-surface)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] p-4 [box-shadow:var(--neu-shadow-inset)]">
        <div className="grid gap-2">
          <label htmlFor="blog-search" className="text-xs font-semibold">
            {t.search}
          </label>
          <div className="flex gap-2">
            <Input
              ref={searchRef}
              id="blog-search"
              type="search"
              role="searchbox"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.placeholder}
            />
            {query ? (
              <Button type="button" variant="soft" onClick={() => { setQuery(""); searchRef.current?.focus(); }}>
                {t.clear}
              </Button>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div role="group" aria-label={t.filter} className="flex flex-wrap gap-2">
            {topics.map((item) => (
              <Button
                key={item}
                type="button"
                size="sm"
                variant={topic === item ? "primary" : "soft"}
                aria-pressed={topic === item}
                onClick={() => setTopic(item)}
              >
                {item}
              </Button>
            ))}
          </div>

          <label className="grid min-w-44 gap-1 text-xs font-semibold">
            {t.sort}
            <Select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)}>
              <SelectItem value="newest">{t.newest}</SelectItem>
              <SelectItem value="oldest">{t.oldest}</SelectItem>
              <SelectItem value="shortest">{t.shortest}</SelectItem>
            </Select>
          </label>
        </div>

        <p role="status" className="text-xs text-[var(--muted-foreground)]">
          {filteredPosts.length} {filteredPosts.length === 1 ? t.post : t.posts}
        </p>
      </section>

      {filteredPosts.length ? (
        <ol className="grid gap-3">
          {filteredPosts.map((post) => (
            <li key={post.slug}>
              <article className="grid gap-3 rounded-[var(--neu-radius-surface)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] p-5 [box-shadow:var(--neu-shadow-raised-sm)]">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--muted-foreground)]">
                  <time dateTime={post.publishedAt}>{post.publishedLabel ?? post.publishedAt}</time>
                  <span>{post.topic}{post.readTimeMinutes ? " · " + post.readTimeMinutes + " " + t.read : ""}</span>
                </div>
                <h3 className="text-xl font-semibold">
                  <a
                    href={postHref(basePath, post.slug)}
                    className="rounded-sm underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                  >
                    {post.title}
                  </a>
                </h3>
                <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{post.summary}</p>
              </article>
            </li>
          ))}
        </ol>
      ) : (
        <div className="grid justify-items-center gap-4 rounded-[var(--neu-radius-surface)] border border-dashed border-[var(--border)] py-10">
          <p className="text-sm text-[var(--muted-foreground)]">{t.noResults}</p>
          <Button type="button" onClick={resetFilters}>{t.reset}</Button>
        </div>
      )}
    </section>
  );
}

const examplePosts: BlogPost[] = [
  {
    slug: "useful-empty-states",
    title: "Useful empty states are part of the workflow",
    summary: "Treat an empty result as a next-action surface instead of a dead end.",
    topic: "Product",
    publishedAt: "2026-09-18",
    publishedLabel: "Sep 18, 2026",
    readTimeMinutes: 4,
  },
  {
    slug: "keyboard-first-overlays",
    title: "Keyboard-first overlays without separate logic",
    summary: "Use the primitive state model and style its visible states rather than rebuilding interaction.",
    topic: "Engineering",
    publishedAt: "2026-09-10",
    publishedLabel: "Sep 10, 2026",
    readTimeMinutes: 6,
  },
  {
    slug: "depth-without-noise",
    title: "Depth without visual noise",
    summary: "Reserve raised and inset surfaces for state and hierarchy instead of decorating every region.",
    topic: "Design",
    publishedAt: "2026-08-29",
    publishedLabel: "Aug 29, 2026",
    readTimeMinutes: 5,
  },
];

export function BlogExample({ locale = "en" }: { locale?: BlogLocale }) {
  return <Blog posts={examplePosts} locale={locale} basePath="#post" />;
}
