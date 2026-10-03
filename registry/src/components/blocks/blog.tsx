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
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.title}</h2>
        <p className="max-w-xl text-sm leading-relaxed text-[var(--muted-foreground)]">
          {t.intro}
        </p>
      </header>

      <section className="grid gap-4 rounded-[var(--neu-radius-surface)] border border-[color:var(--neu-edge)] bg-transparent py-4 shadow-none">
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

const examplePosts = {
  "en": [
    {
      "slug": "draft-after-failed-save",
      "title": "Recover a draft after a failed save",
      "summary": "Retain the edited title and body, report the error, and retry the save.",
      "topic": "Product",
      "publishedAt": "2026-09-18",
      "readTimeMinutes": 4
    },
    {
      "slug": "dialog-keyboard-focus",
      "title": "Return keyboard focus after closing a dialog",
      "summary": "Check Escape, the close action and focus returning to the button that opened the dialog.",
      "topic": "Engineering",
      "publishedAt": "2026-09-10",
      "readTimeMinutes": 6
    },
    {
      "slug": "compact-control-icons",
      "title": "Align icons in compact controls",
      "summary": "Use the same icon box for small buttons, menu indicators and disclosure controls.",
      "topic": "Design",
      "publishedAt": "2026-08-29",
      "readTimeMinutes": 5
    }
  ],
  "ko": [
    {
      "slug": "draft-after-failed-save",
      "title": "저장 실패 후 초안 복구하기",
      "summary": "수정한 제목과 본문을 유지하고 오류를 표시한 뒤 저장을 다시 시도합니다.",
      "topic": "제품",
      "publishedAt": "2026-09-18",
      "readTimeMinutes": 4
    },
    {
      "slug": "dialog-keyboard-focus",
      "title": "대화상자를 닫은 뒤 키보드 포커스 돌려주기",
      "summary": "Escape와 닫기 동작을 확인하고 대화상자를 연 버튼으로 포커스를 돌려줍니다.",
      "topic": "개발",
      "publishedAt": "2026-09-10",
      "readTimeMinutes": 6
    },
    {
      "slug": "compact-control-icons",
      "title": "작은 컨트롤의 아이콘 정렬하기",
      "summary": "작은 버튼, 메뉴 표시, 펼침 컨트롤에 같은 크기의 아이콘 영역을 사용합니다.",
      "topic": "디자인",
      "publishedAt": "2026-08-29",
      "readTimeMinutes": 5
    }
  ],
  "ja": [
    {
      "slug": "draft-after-failed-save",
      "title": "保存失敗後の下書きを復元する",
      "summary": "編集したタイトルと本文を保持し、エラーを表示して保存を再試行します。",
      "topic": "プロダクト",
      "publishedAt": "2026-09-18",
      "readTimeMinutes": 4
    },
    {
      "slug": "dialog-keyboard-focus",
      "title": "ダイアログを閉じた後にフォーカスを戻す",
      "summary": "Escape、閉じる操作、開いたボタンへのフォーカス復帰を確認します。",
      "topic": "開発",
      "publishedAt": "2026-09-10",
      "readTimeMinutes": 6
    },
    {
      "slug": "compact-control-icons",
      "title": "小さなコントロールのアイコンを揃える",
      "summary": "小さなボタン、メニューの印、開閉コントロールで同じアイコン領域を使います。",
      "topic": "デザイン",
      "publishedAt": "2026-08-29",
      "readTimeMinutes": 5
    }
  ],
  "zh": [
    {
      "slug": "draft-after-failed-save",
      "title": "保存失败后恢复草稿",
      "summary": "保留编辑过的标题和正文，显示错误，然后重新保存。",
      "topic": "产品",
      "publishedAt": "2026-09-18",
      "readTimeMinutes": 4
    },
    {
      "slug": "dialog-keyboard-focus",
      "title": "关闭对话框后恢复键盘焦点",
      "summary": "检查 Escape、关闭操作以及焦点是否返回打开对话框的按钮。",
      "topic": "开发",
      "publishedAt": "2026-09-10",
      "readTimeMinutes": 6
    },
    {
      "slug": "compact-control-icons",
      "title": "对齐小型控件中的图标",
      "summary": "为小按钮、菜单标记和展开控件使用相同尺寸的图标区域。",
      "topic": "设计",
      "publishedAt": "2026-08-29",
      "readTimeMinutes": 5
    }
  ]
} satisfies Record<BlogLocale, BlogPost[]>;

export function BlogExample({ locale = "en" }: { locale?: BlogLocale }) {
  return <Blog posts={examplePosts[locale]} locale={locale} basePath="#post" />;
}
