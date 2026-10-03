"use client";

import * as React from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    title: "글 관리",
    intro: "초안을 편집하고 미리보기로 확인한 뒤 저장하세요.",
    fail: "다음 저장 실패 재현",
    newPost: "새 글",
    total: "전체 글",
    published: "게시됨",
    unsaved: "저장 안 됨",
    local: "데모는 새로고침하면 초기화됩니다. 실제 저장은 onSave에 연결하세요.",
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
    title: "Posts",
    intro: "Edit drafts, preview posts and save your changes.",
    fail: "Fail the next save",
    newPost: "New post",
    total: "Total posts",
    published: "Published",
    unsaved: "Unsaved",
    local: "Demo changes reset on reload. Connect onSave to store changes in your application.",
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
    title: "記事管理",
    intro: "下書きを編集し、プレビューで確認して保存します。",
    fail: "次の保存を失敗させる",
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
    title: "文章管理",
    intro: "编辑草稿，预览文章并保存更改。",
    fail: "模拟下次保存失败",
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
    <section data-slot="cms-workspace" className={cn("@container/workspace grid min-w-0 gap-7 text-[var(--foreground)]", className)}>
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div>
          <h2 className="text-2xl font-bold leading-tight tracking-tight">{t.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">{t.intro}</p>
        </div>
        <Button type="button" onClick={createPost}><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="size-4 shrink-0"><path d="M12 5v14M5 12h14" /></svg>{t.newPost}</Button>
      </header>

      <dl data-slot="workspace-metrics" className="grid min-w-0 grid-cols-3 gap-3 @min-[36rem]/workspace:gap-5">
        {([
          ["total", t.total, posts.length],
          ["published", t.published, publishedCount],
          ["unsaved", t.unsaved, unsavedCount],
        ] as const).map(([key, text, count]) => (
          <Card key={key} variant={key === "published" ? "accent" : "raised"} className="@container/metric grid grid-rows-[minmax(2.5rem,auto)_auto] min-h-32 min-w-0 content-center justify-items-center gap-2 rounded-[calc(var(--neu-radius-surface)*0.5)] px-3 py-5 text-center @min-[36rem]/workspace:px-5">
            <dt className={`row-start-2 min-h-[3em] max-w-full text-balance text-xs font-medium leading-normal [overflow-wrap:anywhere] ${key === "published" ? "text-[var(--primary-foreground)]" : "text-[var(--muted-foreground)]"}`}>{text}</dt>
            <dd data-metric={key} className="row-start-1 m-0 max-w-full self-end text-[clamp(1.375rem,24cqi,2.25rem)] font-extrabold leading-[1.1] tracking-tight tabular-nums [overflow-wrap:anywhere]">{count}</dd>
          </Card>
        ))}
      </dl>

      {feedback ? <p role="status" className="text-sm text-[var(--muted-foreground)]">{feedback}</p> : null}
      {failure ? (
        <Alert variant="destructive">
          <AlertTitle>{t.saveFailed}</AlertTitle>
          <AlertDescription>{t.saveRecovery}</AlertDescription>
        </Alert>
      ) : null}

      <div className="grid min-w-0 overflow-hidden rounded-[var(--neu-radius-surface)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] shadow-none lg:grid-cols-[minmax(17rem,2fr)_minmax(22rem,3fr)]">
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

const examplePosts = {
  "en": [
    {
      "id": "post-1",
      "title": "September editor update",
      "summary": "Draft recovery and the post review checklist.",
      "body": "The editor keeps the current draft when a save fails. Retry the request without re-entering the title or body.",
      "status": "published",
      "updatedLabel": "2026-09-18"
    },
    {
      "id": "post-2",
      "title": "Prepare a post for review",
      "summary": "Check the title, summary and publication status.",
      "body": "Confirm the title matches the article. Write a summary that names its topic. Keep the status as Draft until the reviewer approves publication.",
      "status": "draft",
      "updatedLabel": "2026-09-17"
    },
    {
      "id": "post-3",
      "title": "Assign a reviewer to each draft",
      "summary": "Record the reviewer and the outstanding changes.",
      "body": "Choose one reviewer for the draft. Collect requested changes in the article notes and confirm them before publishing.",
      "status": "published",
      "updatedLabel": "2026-09-16"
    }
  ],
  "ko": [
    {
      "id": "post-1",
      "title": "9월 편집기 업데이트",
      "summary": "초안 복구와 글 검토 체크리스트.",
      "body": "저장에 실패해도 현재 초안을 유지합니다. 제목과 본문을 다시 입력하지 않고 요청을 재시도할 수 있습니다.",
      "status": "published",
      "updatedLabel": "2026-09-18"
    },
    {
      "id": "post-2",
      "title": "검토할 글 준비하기",
      "summary": "제목, 요약, 게시 상태를 확인합니다.",
      "body": "제목이 본문 내용과 일치하는지 확인합니다. 주제가 드러나도록 요약을 작성합니다. 검토자가 게시를 승인하기 전까지 초안 상태를 유지합니다.",
      "status": "draft",
      "updatedLabel": "2026-09-17"
    },
    {
      "id": "post-3",
      "title": "초안마다 검토자 지정하기",
      "summary": "담당 검토자와 남은 수정 사항을 기록합니다.",
      "body": "초안의 검토자를 한 명 지정합니다. 요청된 변경 사항을 글 메모에 모으고 게시 전에 반영 여부를 확인합니다.",
      "status": "published",
      "updatedLabel": "2026-09-16"
    }
  ],
  "ja": [
    {
      "id": "post-1",
      "title": "9月の編集機能アップデート",
      "summary": "下書きの復元と記事の確認リスト。",
      "body": "保存に失敗しても現在の下書きを保持します。タイトルや本文を再入力せずに再試行できます。",
      "status": "published",
      "updatedLabel": "2026-09-18"
    },
    {
      "id": "post-2",
      "title": "記事をレビューに出す準備",
      "summary": "タイトル、概要、公開状態を確認します。",
      "body": "タイトルと本文が一致しているか確認します。概要には記事の話題を明記します。レビュー担当者が公開を承認するまでは下書きの状態にします。",
      "status": "draft",
      "updatedLabel": "2026-09-17"
    },
    {
      "id": "post-3",
      "title": "下書きにレビュー担当者を割り当てる",
      "summary": "担当者と未対応の修正内容を記録します。",
      "body": "下書きのレビュー担当者を一人決めます。修正依頼を記事のメモにまとめ、公開前に対応を確認します。",
      "status": "published",
      "updatedLabel": "2026-09-16"
    }
  ],
  "zh": [
    {
      "id": "post-1",
      "title": "九月编辑器更新",
      "summary": "草稿恢复与文章审核清单。",
      "body": "保存失败时保留当前草稿。无需重新输入标题或正文，即可重试请求。",
      "status": "published",
      "updatedLabel": "2026-09-18"
    },
    {
      "id": "post-2",
      "title": "准备待审核的文章",
      "summary": "检查标题、摘要与发布状态。",
      "body": "确认标题与正文相符。在摘要中明确文章主题。审核人员批准发布前，保持草稿状态。",
      "status": "draft",
      "updatedLabel": "2026-09-17"
    },
    {
      "id": "post-3",
      "title": "为每份草稿指定审核人",
      "summary": "记录审核人和待完成的修改。",
      "body": "为草稿指定一名审核人。将修改要求汇总到文章备注中，并在发布前确认完成情况。",
      "status": "published",
      "updatedLabel": "2026-09-16"
    }
  ]
} satisfies Record<CmsLocale, CmsPost[]>;

export function CmsExample({ locale = "en" }: { locale?: CmsLocale }) {
  const [failNext, setFailNext] = React.useState(false);
  const t = copy[locale];
  return (
    <div className="grid gap-4">
      <CmsWorkspace
        initialPosts={examplePosts[locale]}
        locale={locale}
        onSave={async () => {
          await new Promise((resolve) => setTimeout(resolve, 250));
          if (failNext) {
            setFailNext(false);
            throw new Error("Simulated save failure");
          }
        }}
      />
      <div data-demo-controls className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-4 text-xs leading-relaxed text-[var(--muted-foreground)]">
        <p className="max-w-xl">{t.local}</p>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={failNext} onChange={(event) => setFailNext(event.target.checked)} />
          {t.fail}
        </label>
      </div>
    </div>
  );
}
