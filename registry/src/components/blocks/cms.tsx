"use client";

import * as React from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type CmsLocale = "ko" | "en" | "ja" | "zh";
export type CmsPostStatus = "draft" | "published";

export type CmsPost = {
  id: string;
  title: string;
  summary: string;
  body: string;
  status: CmsPostStatus;
  updatedLabel?: string;
};

export interface CmsWorkspaceProps {
  initialPosts: readonly CmsPost[];
  onSave?: (post: CmsPost) => Promise<void>;
  locale?: CmsLocale;
  className?: string;
}

type EditablePost = CmsPost & { dirty: boolean };
type StatusFilter = "all" | CmsPostStatus;

const copy = {
  ko: {
    title: "콘텐츠 작업실",
    newPost: "새 글",
    total: "전체 글",
    published: "게시됨",
    unsaved: "저장 안 됨",
    local: "로컬 UI 예제입니다. 실제 저장은 onSave에 연결하세요.",
    search: "글 검색",
    all: "전체",
    draft: "초안",
    editor: "글 편집",
    updated: "업데이트",
    unsavedChanges: "저장하지 않은 변경",
    discard: "변경 취소",
    save: "저장",
    saving: "저장 중…",
    titleField: "제목",
    summary: "요약",
    content: "본문",
    preview: "미리보기",
    publish: "게시",
    noPosts: "조건에 맞는 글이 없습니다.",
    clear: "필터 초기화",
    saveFailed: "저장하지 못했습니다.",
    saveRecovery: "편집 내용은 유지됩니다. 다시 저장하거나 변경 취소로 마지막 저장 상태를 복원하세요.",
    saved: "저장했습니다.",
    restored: "마지막 저장 상태를 복원했습니다.",
    untitled: "제목 없는 글",
  },
  en: {
    title: "Content workspace",
    newPost: "New post",
    total: "Total posts",
    published: "Published",
    unsaved: "Unsaved",
    local: "Local UI example. Connect onSave to your authenticated persistence layer.",
    search: "Search posts",
    all: "All",
    draft: "Draft",
    editor: "Edit post",
    updated: "Updated",
    unsavedChanges: "Unsaved changes",
    discard: "Discard",
    save: "Save",
    saving: "Saving…",
    titleField: "Title",
    summary: "Summary",
    content: "Content",
    preview: "Read preview",
    publish: "Published",
    noPosts: "No posts match the current filters.",
    clear: "Clear filters",
    saveFailed: "Changes were not saved.",
    saveRecovery: "Your edits are still here. Try again or discard to restore the last saved version.",
    saved: "Saved.",
    restored: "Restored the last saved version.",
    untitled: "Untitled post",
  },
  ja: {
    title: "コンテンツワークスペース",
    newPost: "新規記事",
    total: "全記事",
    published: "公開済み",
    unsaved: "未保存",
    local: "ローカルUIの例です。実際の保存は onSave に接続してください。",
    search: "記事を検索",
    all: "すべて",
    draft: "下書き",
    editor: "記事を編集",
    updated: "更新",
    unsavedChanges: "未保存の変更",
    discard: "変更を破棄",
    save: "保存",
    saving: "保存中…",
    titleField: "タイトル",
    summary: "概要",
    content: "本文",
    preview: "プレビュー",
    publish: "公開",
    noPosts: "条件に一致する記事がありません。",
    clear: "フィルターをクリア",
    saveFailed: "保存できませんでした。",
    saveRecovery: "編集内容は残っています。再試行するか、破棄して最後の保存状態に戻してください。",
    saved: "保存しました。",
    restored: "最後の保存状態に戻しました。",
    untitled: "無題の記事",
  },
  zh: {
    title: "内容工作区",
    newPost: "新建文章",
    total: "全部文章",
    published: "已发布",
    unsaved: "未保存",
    local: "这是本地 UI 示例。请将 onSave 连接到已认证的持久化服务。",
    search: "搜索文章",
    all: "全部",
    draft: "草稿",
    editor: "编辑文章",
    updated: "更新于",
    unsavedChanges: "有未保存更改",
    discard: "放弃更改",
    save: "保存",
    saving: "正在保存…",
    titleField: "标题",
    summary: "摘要",
    content: "正文",
    preview: "阅读预览",
    publish: "已发布",
    noPosts: "没有符合当前筛选条件的文章。",
    clear: "清除筛选",
    saveFailed: "未能保存更改。",
    saveRecovery: "编辑内容仍然保留。请重试，或放弃更改以恢复上次保存的版本。",
    saved: "已保存。",
    restored: "已恢复上次保存的版本。",
    untitled: "无标题文章",
  },
} as const;

function editable(posts: readonly CmsPost[]): EditablePost[] {
  return posts.map((post) => ({ ...post, dirty: false }));
}

function displayTitle(post: CmsPost, untitled: string) {
  return post.title.trim() || untitled;
}

export function CmsWorkspace({
  initialPosts,
  onSave = async () => {},
  locale = "en",
  className,
}: CmsWorkspaceProps) {
  const t = copy[locale];
  const [posts, setPosts] = React.useState<EditablePost[]>(() => editable(initialPosts));
  const [saved, setSaved] = React.useState<CmsPost[]>(() => initialPosts.map((post) => ({ ...post })));
  const [selectedId, setSelectedId] = React.useState(initialPosts[0]?.id ?? "");
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState<StatusFilter>("all");
  const [pending, setPending] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const [feedback, setFeedback] = React.useState("");
  const nextId = React.useRef(1);

  const filtered = posts.filter((post) => {
    const text = (post.title + " " + post.summary).toLowerCase();
    return (filter === "all" || post.status === filter) &&
      text.includes(query.trim().toLowerCase());
  });
  const selected = posts.find((post) => post.id === selectedId);

  function updateSelected(changes: Partial<Pick<CmsPost, "title" | "summary" | "body" | "status">>) {
    if (!selected) return;
    const snapshot = saved.find((post) => post.id === selected.id);
    setFailure(false);
    setFeedback("");
    setPosts((current) =>
      current.map((post) => {
        if (post.id !== selected.id) return post;
        const next = { ...post, ...changes };
        next.dirty = !snapshot ||
          next.title !== snapshot.title ||
          next.summary !== snapshot.summary ||
          next.body !== snapshot.body ||
          next.status !== snapshot.status;
        return next;
      }),
    );
  }

  async function saveSelected() {
    if (!selected || !selected.dirty || pending) return;
    const snapshot: CmsPost = {
      id: selected.id,
      title: displayTitle(selected, t.untitled),
      summary: selected.summary.trim(),
      body: selected.body.trim(),
      status: selected.status,
      updatedLabel: selected.updatedLabel,
    };
    setPending(true);
    setFailure(false);
    setFeedback("");
    try {
      await onSave(snapshot);
      setSaved((current) => [...current.filter((post) => post.id !== snapshot.id), snapshot]);
      setPosts((current) =>
        current.map((post) => post.id === snapshot.id ? { ...snapshot, dirty: false } : post),
      );
      setFeedback(t.saved);
    } catch {
      setFailure(true);
    } finally {
      setPending(false);
    }
  }

  function discardSelected() {
    if (!selected || pending) return;
    const snapshot = saved.find((post) => post.id === selected.id);
    if (!snapshot) return;
    setPosts((current) =>
      current.map((post) => post.id === selected.id ? { ...snapshot, dirty: false } : post),
    );
    setFailure(false);
    setFeedback(t.restored);
  }

  function createPost() {
    if (pending) return;
    const id = "local-post-" + nextId.current++;
    const post: EditablePost = {
      id,
      title: t.untitled,
      summary: "",
      body: "",
      status: "draft",
      updatedLabel: "",
      dirty: true,
    };
    setPosts((current) => [post, ...current]);
    setSelectedId(id);
    setQuery("");
    setFilter("all");
    setFailure(false);
    setFeedback("");
  }

  const publishedCount = posts.filter((post) => post.status === "published").length;
  const unsavedCount = posts.filter((post) => post.dirty).length;

  return (
    <section data-slot="cms-workspace" className={cn("grid min-w-0 gap-5 text-[var(--foreground)]", className)}>
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div>
          <h2 className="text-2xl font-semibold">{t.title}</h2>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">{t.local}</p>
        </div>
        <Button type="button" onClick={createPost}>＋ {t.newPost}</Button>
      </header>

      <dl className="grid grid-cols-3 gap-3">
        {[
          [t.total, posts.length],
          [t.published, publishedCount],
          [t.unsaved, unsavedCount],
        ].map(([label, value]) => (
          <div key={String(label)} className="rounded-[var(--neu-radius-surface)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] p-4 [box-shadow:var(--neu-shadow-raised-sm)]">
            <dt className="text-xs text-[var(--muted-foreground)]">{label}</dt>
            <dd className="mt-2 text-2xl font-semibold tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>

      {feedback ? <p role="status" className="text-sm text-[var(--muted-foreground)]">{feedback}</p> : null}
      {failure ? (
        <Alert variant="destructive">
          <AlertTitle>{t.saveFailed}</AlertTitle>
          <AlertDescription>{t.saveRecovery}</AlertDescription>
        </Alert>
      ) : null}

      <div className="grid min-w-0 overflow-hidden rounded-[var(--neu-radius-surface)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] [box-shadow:var(--neu-shadow-raised-sm)] lg:grid-cols-[minmax(17rem,2fr)_minmax(22rem,3fr)]">
        <aside className="min-w-0 border-b border-[var(--border)] lg:border-r lg:border-b-0">
          <div className="grid gap-3 border-b border-[var(--border)] bg-[var(--neu-surface-soft)] p-3">
            <Input
              aria-label={t.search}
              type="search"
              placeholder={t.search}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <div role="group" aria-label={t.search} className="grid grid-cols-3 gap-2">
              {([
                ["all", t.all],
                ["draft", t.draft],
                ["published", t.published],
              ] as const).map(([value, label]) => (
                <Button
                  key={value}
                  type="button"
                  size="sm"
                  variant={filter === value ? "primary" : "soft"}
                  aria-pressed={filter === value}
                  onClick={() => setFilter(value)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {filtered.length ? (
            <ul className="grid">
              {filtered.map((post) => (
                <li key={post.id} className="border-b border-[var(--border)] last:border-b-0">
                  <button
                    type="button"
                    aria-pressed={post.id === selectedId}
                    onClick={() => { setSelectedId(post.id); setFailure(false); setFeedback(""); }}
                    className="grid w-full grid-cols-[minmax(0,1fr)_auto] gap-3 px-4 py-3 text-left outline-none hover:bg-[var(--neu-surface-soft)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ring)] aria-pressed:bg-[var(--neu-surface-low)] aria-pressed:[box-shadow:var(--neu-shadow-inset-sm)]"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{displayTitle(post, t.untitled)}</span>
                      <span className="mt-1 block truncate text-xs text-[var(--muted-foreground)]">{post.summary || "—"}</span>
                    </span>
                    <span className="grid justify-items-end gap-1">
                      <Badge variant={post.status === "published" ? "primary" : "soft"}>
                        {post.status === "published" ? t.published : t.draft}
                      </Badge>
                      {post.dirty ? <span className="text-xs text-[var(--destructive)]">{t.unsaved}</span> : null}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="grid justify-items-center gap-3 p-8 text-center">
              <p className="text-sm text-[var(--muted-foreground)]">{t.noPosts}</p>
              <Button type="button" size="sm" onClick={() => { setQuery(""); setFilter("all"); }}>{t.clear}</Button>
            </div>
          )}
        </aside>

        <section aria-label={t.editor} className="min-w-0">
          {selected ? (
            <form
              className="grid min-h-[28rem] grid-rows-[auto_1fr]"
              onSubmit={(event) => { event.preventDefault(); void saveSelected(); }}
            >
              <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--neu-surface-soft)] p-4">
                <div>
                  <h3 className="font-semibold">{t.editor}</h3>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                    {selected.dirty ? t.unsavedChanges : (selected.updatedLabel ? t.updated + " " + selected.updatedLabel : "—")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button type="button" size="sm" disabled={!selected.dirty || pending} onClick={discardSelected}>{t.discard}</Button>
                  <Button type="submit" size="sm" variant="primary" disabled={!selected.dirty || pending}>{pending ? t.saving : t.save}</Button>
                </div>
              </header>

              <div className="grid content-start gap-5 p-4 sm:p-5">
                <label className="grid gap-2 text-sm font-semibold">
                  {t.titleField}
                  <Input required value={selected.title} onChange={(event) => updateSelected({ title: event.target.value })} />
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  {t.summary}
                  <Textarea value={selected.summary} onChange={(event) => updateSelected({ summary: event.target.value })} />
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  {t.content}
                  <Textarea className="min-h-44" value={selected.body} onChange={(event) => updateSelected({ body: event.target.value })} />
                </label>

                <details className="rounded-[var(--neu-radius-surface)] border border-[var(--border)] bg-[var(--neu-surface-soft)] p-4">
                  <summary className="cursor-pointer font-semibold">{t.preview}</summary>
                  <article className="mt-4 grid gap-3">
                    <Badge variant={selected.status === "published" ? "primary" : "soft"}>
                      {selected.status === "published" ? t.published : t.draft}
                    </Badge>
                    <h4 className="text-xl font-semibold">{displayTitle(selected, t.untitled)}</h4>
                    <p className="text-sm text-[var(--muted-foreground)]">{selected.summary || "—"}</p>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{selected.body || "—"}</p>
                  </article>
                </details>

                <div className="flex items-center justify-between gap-4 border-t border-[var(--border)] pt-4">
                  <label htmlFor={"cms-published-" + selected.id} className="text-sm font-semibold">{t.publish}</label>
                  <Switch
                    id={"cms-published-" + selected.id}
                    checked={selected.status === "published"}
                    onCheckedChange={(checked) => updateSelected({ status: checked ? "published" : "draft" })}
                  />
                </div>
              </div>
            </form>
          ) : (
            <div className="grid min-h-[28rem] place-content-center justify-items-center gap-3 p-6 text-center">
              <p className="text-sm text-[var(--muted-foreground)]">{t.noPosts}</p>
              <Button type="button" onClick={createPost}>{t.newPost}</Button>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}

const examplePosts: CmsPost[] = [
  {
    id: "post-1",
    title: "September product update",
    summary: "Highlights from the latest workspace release.",
    body: "This release brings clearer ownership, faster search, and a simpler review queue.",
    status: "published",
    updatedLabel: "12 min",
  },
  {
    id: "post-2",
    title: "Organize your first team space",
    summary: "A practical structure for growing teams.",
    body: "Start with one shared space. Assign an owner to each area and write down the naming rules.",
    status: "draft",
    updatedLabel: "38 min",
  },
  {
    id: "post-3",
    title: "A faster review process",
    summary: "How one team simplified editorial review.",
    body: "The team replaced scattered feedback with a single review queue.",
    status: "published",
    updatedLabel: "2 hr",
  },
];

export function CmsExample({ locale = "en" }: { locale?: CmsLocale }) {
  const [failNext, setFailNext] = React.useState(false);
  return (
    <div className="grid gap-4">
      <label className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
        <input type="checkbox" checked={failNext} onChange={(event) => setFailNext(event.target.checked)} />
        Fail the next save
      </label>
      <CmsWorkspace
        initialPosts={examplePosts}
        locale={locale}
        onSave={async () => {
          await new Promise((resolve) => setTimeout(resolve, 250));
          if (failNext) {
            setFailNext(false);
            throw new Error("Simulated save failure");
          }
        }}
      />
    </div>
  );
}
