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
      className={cn(
        "mx-auto w-full max-w-3xl text-[var(--foreground)]",
        locale === "ko" && "break-keep [overflow-wrap:anywhere]",
        className,
      )}
    >
      <header className="grid gap-5 border-b border-[var(--border)] pb-7">
        <a
          href={backHref}
          className="inline-flex w-fit items-center gap-2 rounded-[var(--neu-radius-control)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] px-4 py-2 text-sm font-semibold no-underline [box-shadow:var(--neu-shadow-raised-sm)] outline-none hover:[box-shadow:var(--neu-shadow-hover)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] active:[box-shadow:var(--neu-shadow-inset)]"
        >
          <svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12H4m6-6-6 6 6 6" /></svg>{t.all}
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

      <p data-slot="blog-post-lead" className="my-8 max-w-prose text-lg leading-8">
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

const exampleArticles = {
  "en": {
    "slug": "draft-after-failed-save",
    "title": "Keep a draft after a failed save",
    "summary": "What the editor should retain when a save request fails.",
    "topic": "Engineering",
    "publishedAt": "2026-09-12",
    "publishedLabel": "Sep 12, 2026",
    "readTime": "4 min read",
    "intro": "A failed save should not erase the title, summary or body that someone just edited. Keep the draft in the form and show the error next to the save action.",
    "sections": [
      {
        "heading": "Separate the draft from the saved copy",
        "paragraphs": [
          "When the editor opens, start with the saved post and keep a separate draft for changes. Typing updates the draft; it does not mark the post as saved.",
          "Only replace the saved copy after the save callback resolves. When it rejects, leave both the draft and the previous saved copy intact."
        ]
      },
      {
        "heading": "Retry without re-entering the post",
        "paragraphs": [
          "After a failed request, the author should be able to correct a field or retry with the same draft."
        ],
        "points": [
          "Show a save error without clearing the inputs.",
          "Keep Save available after the request finishes.",
          "Ask before discarding a draft with unsaved changes."
        ]
      }
    ]
  },
  "ko": {
    "slug": "draft-after-failed-save",
    "title": "저장에 실패해도 초안은 유지하기",
    "summary": "저장 요청이 실패했을 때 편집기에 남아 있어야 하는 내용입니다.",
    "topic": "개발",
    "publishedAt": "2026-09-12",
    "publishedLabel": "2026년 9월 12일",
    "readTime": "4분 읽기",
    "intro": "저장에 실패했다고 방금 고친 제목, 요약, 본문까지 사라져서는 안 됩니다. 입력한 초안은 폼에 남기고 저장 버튼 근처에 오류를 표시합니다.",
    "sections": [
      {
        "heading": "초안과 저장된 사본 구분하기",
        "paragraphs": [
          "편집기를 열면 저장된 글을 불러오고, 수정할 초안을 별도로 둡니다. 입력은 초안만 바꾸며 글을 저장된 상태로 표시하지 않습니다.",
          "저장 콜백이 성공한 뒤에만 저장된 사본을 교체합니다. 요청이 실패하면 초안과 이전 사본을 모두 유지합니다."
        ]
      },
      {
        "heading": "다시 입력하지 않고 재시도하기",
        "paragraphs": [
          "요청이 실패한 뒤에도 작성자는 항목을 고치거나 같은 초안으로 저장을 다시 시도할 수 있어야 합니다."
        ],
        "points": [
          "입력란을 비우지 않고 저장 오류를 표시합니다.",
          "요청이 끝나면 저장 버튼을 다시 사용할 수 있게 합니다.",
          "저장하지 않은 초안을 버리기 전에 확인을 받습니다."
        ]
      }
    ]
  },
  "ja": {
    "slug": "draft-after-failed-save",
    "title": "保存に失敗しても下書きを残す",
    "summary": "保存リクエストが失敗したときに、編集画面で保持する内容です。",
    "topic": "開発",
    "publishedAt": "2026-09-12",
    "publishedLabel": "2026年9月12日",
    "readTime": "4分で読めます",
    "intro": "保存に失敗しても、編集したタイトル、概要、本文を消してはいけません。下書きをフォームに残し、保存ボタンの近くにエラーを表示します。",
    "sections": [
      {
        "heading": "下書きと保存済みの内容を分ける",
        "paragraphs": [
          "編集画面を開いたら、保存済みの記事とは別に編集用の下書きを用意します。入力は下書きだけを変更し、記事を保存済みにはしません。",
          "保存コールバックが成功してから、保存済みの内容を更新します。失敗した場合は、下書きと前回の保存内容をどちらも保持します。"
        ]
      },
      {
        "heading": "再入力せずにやり直す",
        "paragraphs": [
          "リクエストが失敗した後も、項目を修正したり、同じ下書きのまま保存を再試行したりできるようにします。"
        ],
        "points": [
          "入力欄を空にせず、保存エラーを表示します。",
          "リクエストが終わったら、保存ボタンを再び使えるようにします。",
          "未保存の下書きを破棄する前に確認します。"
        ]
      }
    ]
  },
  "zh": {
    "slug": "draft-after-failed-save",
    "title": "保存失败后保留草稿",
    "summary": "保存请求失败时，编辑器应当保留哪些内容。",
    "topic": "开发",
    "publishedAt": "2026-09-12",
    "publishedLabel": "2026年9月12日",
    "readTime": "阅读约4分钟",
    "intro": "保存失败不应清除刚刚编辑的标题、摘要和正文。将草稿保留在表单中，并在保存按钮附近显示错误。",
    "sections": [
      {
        "heading": "区分草稿与已保存的副本",
        "paragraphs": [
          "打开编辑器时，读取已保存的文章，同时建立单独的编辑草稿。输入只更新草稿，不会将文章标记为已保存。",
          "仅在保存回调成功后更新已保存的副本。如果请求失败，保留草稿和上一次保存的内容。"
        ]
      },
      {
        "heading": "无需重新输入即可重试",
        "paragraphs": [
          "请求失败后，作者仍应能够修改字段，或使用同一份草稿重新保存。"
        ],
        "points": [
          "显示保存错误，不清空输入内容。",
          "请求结束后，让保存按钮可以再次使用。",
          "丢弃未保存的草稿之前请求确认。"
        ]
      }
    ]
  }
} satisfies Record<BlogPostLocale, BlogArticle>;

export function BlogPostExample({ locale = "en" }: { locale?: BlogPostLocale }) {
  return <BlogPost post={exampleArticles[locale]} locale={locale} backHref="#all-posts" />;
}
