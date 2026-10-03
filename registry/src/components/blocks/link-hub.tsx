"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type LinkHubLocale = "ko" | "en" | "ja" | "zh";

export type LinkHubProfile = {
  name: string;
  handle?: string;
  bio?: string;
  initials?: string;
};

export type LinkHubLink = {
  group: string;
  title: string;
  detail?: string;
  href: string;
  external?: boolean;
  highlighted?: boolean;
};

export interface LinkHubProps {
  profile: LinkHubProfile;
  links: readonly LinkHubLink[];
  contactEmail?: string;
  locale?: LinkHubLocale;
  className?: string;
}

const copy = {
  ko: {
    all: "전체",
    filter: "링크 필터",
    destinations: "링크",
    links: "개 링크",
    link: "개 링크",
    contact: "연락하기",
    copy: "이메일 복사",
    copied: "이메일 주소를 복사했습니다.",
    copyFailed: "복사하지 못했습니다. 위 이메일 주소를 직접 복사하세요.",
    newTab: "새 탭에서 열림",
  },
  en: {
    all: "All",
    filter: "Filter links",
    destinations: "Links",
    links: "links",
    link: "link",
    contact: "Contact",
    copy: "Copy email",
    copied: "Email copied.",
    copyFailed: "Could not copy. Select the email address above and copy it manually.",
    newTab: "Opens in a new tab",
  },
  ja: {
    all: "すべて",
    filter: "リンクを絞り込む",
    destinations: "リンク",
    links: "件のリンク",
    link: "件のリンク",
    contact: "連絡先",
    copy: "メールをコピー",
    copied: "メールアドレスをコピーしました。",
    copyFailed: "コピーできませんでした。上のメールアドレスを手動でコピーしてください。",
    newTab: "新しいタブで開きます",
  },
  zh: {
    all: "全部",
    filter: "筛选链接",
    destinations: "链接",
    links: "个链接",
    link: "个链接",
    contact: "联系",
    copy: "复制邮箱",
    copied: "邮箱地址已复制。",
    copyFailed: "复制失败，请手动复制上方邮箱地址。",
    newTab: "在新标签页打开",
  },
} as const;

function LinkHub({
  profile,
  links,
  contactEmail,
  locale = "en",
  className,
}: LinkHubProps) {
  const t = copy[locale];
  const groups = React.useMemo(
    () => [t.all, ...Array.from(new Set(links.map((link) => link.group)))],
    [links, t.all],
  );
  const [group, setGroup] = React.useState<string>(t.all);
  const [copyState, setCopyState] = React.useState("");

  React.useEffect(() => {
    if (!groups.includes(group)) setGroup(t.all);
  }, [group, groups, t.all]);

  const filteredLinks = links.filter(
    (link) => group === t.all || link.group === group,
  );

  async function copyEmail() {
    if (!contactEmail) return;
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopyState(t.copied);
    } catch {
      setCopyState(t.copyFailed);
    }
  }

  return (
    <section
      data-slot="link-hub"
      className={cn(
        "mx-auto grid min-w-0 w-full max-w-2xl gap-7 text-[var(--foreground)] [overflow-wrap:anywhere]",
        locale === "ko" && "break-keep",
        className,
      )}
    >
      <header className="grid justify-items-center gap-3 text-center">
        <div
          aria-hidden="true"
          className="grid size-24 place-items-center rounded-full border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] text-xl font-semibold [box-shadow:var(--neu-shadow-raised)]"
        >
          {profile.initials ?? profile.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="grid min-w-0 max-w-full gap-1">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {profile.name}
          </h2>
          {profile.handle ? (
            <p className="text-sm text-[var(--muted-foreground)]">{profile.handle}</p>
          ) : null}
        </div>
        {profile.bio ? (
          <p className="max-w-md text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
            {profile.bio}
          </p>
        ) : null}
      </header>

      <section className="grid min-w-0 gap-3">
        <h3 className="text-sm font-semibold">
          {t.destinations}
        </h3>
        <div role="group" aria-label={t.filter} className="flex flex-wrap gap-2">
          {groups.map((item) => (
            <Button
              key={item}
              type="button"
              size="sm"
              variant={group === item ? "primary" : "soft"}
              aria-pressed={group === item}
              onClick={() => setGroup(item)}
            >
              {item}
            </Button>
          ))}
        </div>
        <p role="status" className="text-xs text-[var(--muted-foreground)]">
          {filteredLinks.length} {filteredLinks.length === 1 ? t.link : t.links}
        </p>
      </section>

      <ul className="grid gap-3 sm:grid-cols-2">
        {filteredLinks.map((link) => (
          <li key={`${link.group}:${link.title}`} className="min-w-0">
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              data-highlighted={link.highlighted}
              className={cn(
                "flex min-h-20 h-full min-w-0 w-full items-center gap-3 rounded-[var(--neu-radius-surface)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] p-4 text-left text-[var(--foreground)] no-underline [box-shadow:var(--neu-shadow-raised-sm)] outline-none transition-[box-shadow,transform] duration-[var(--neu-duration)] motion-reduce:transition-none hover:[box-shadow:var(--neu-shadow-hover)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] active:translate-y-px active:[box-shadow:var(--neu-shadow-inset)] data-[highlighted=true]:border-transparent data-[highlighted=true]:bg-[var(--neu-surface)] data-[highlighted=true]:text-[var(--neu-accent-ink)] data-[highlighted=true]:[box-shadow:var(--neu-shadow-raised-sm)]",
              )}
            >
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{link.title}</span>
                {link.detail ? (
                  <span className="mt-1 block text-xs leading-5 opacity-70">
                    {link.detail}
                  </span>
                ) : null}
                {link.external ? <span className="sr-only">{t.newTab}</span> : null}
              </span>
              <svg aria-hidden="true" className="size-4 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={link.external ? "M6 18 18 6M8 6h10v10" : "M4 12h16m-6-6 6 6-6 6"} /></svg>
            </a>
          </li>
        ))}
      </ul>

      {contactEmail ? (
        <section
          aria-label={t.contact}
          className="grid gap-3 border-t border-[var(--border)] pt-5"
        >
          <h3 className="text-lg font-semibold">{t.contact}</h3>
          <p className="break-all text-sm text-[var(--muted-foreground)]">
            {contactEmail}
          </p>
          <Button className="w-fit" size="sm" onClick={() => void copyEmail()}>
            {t.copy}
          </Button>
          <p role="status" className="min-h-5 text-xs text-[var(--muted-foreground)]">
            {copyState}
          </p>
        </section>
      ) : null}
    </section>
  );
}

const exampleCopy = {
  en: { guides: "Guides", code: "Code", contact: "Contact", docs: "Documentation", components: "Components", issues: "Report an issue", email: "Email", bio: "Documentation, component examples and source code.", note: "The email address is an example and is not monitored." },
  ko: { guides: "문서", code: "코드", contact: "연락", docs: "시작하기", components: "컴포넌트", issues: "문제 신고", email: "이메일", bio: "사용 문서, 컴포넌트 예제와 소스 코드를 모았습니다.", note: "이메일은 예제 주소이며 문의를 받지 않습니다." },
  ja: { guides: "ガイド", code: "コード", contact: "連絡先", docs: "ドキュメント", components: "コンポーネント", issues: "問題を報告", email: "メール", bio: "ドキュメント、コンポーネントの使用例、ソースコード。", note: "メールアドレスはサンプルです。お問い合わせは受け付けていません。" },
  zh: { guides: "指南", code: "代码", contact: "联系", docs: "使用文档", components: "组件", issues: "报告问题", email: "邮箱", bio: "使用文档、组件示例和源代码。", note: "邮箱地址仅供演示，不接收咨询。" },
} as const;

export function LinkHubExample({ locale = "en" }: { locale?: LinkHubLocale }) {
  const t = exampleCopy[locale];
  const homepage = "https://neumorphism-ui.andongmin.com";
  const repository = "https://github.com/andongmin94/neumorphism-ui";
  const links: LinkHubLink[] = [
    { group: t.guides, title: t.docs, detail: `${homepage}/${locale}/docs`, href: `${homepage}/${locale}/docs`, external: true, highlighted: true },
    { group: t.guides, title: t.components, detail: `${homepage}/${locale}/components`, href: `${homepage}/${locale}/components`, external: true },
    { group: t.code, title: "GitHub", detail: repository, href: repository, external: true },
    { group: t.code, title: t.issues, detail: `${repository}/issues`, href: `${repository}/issues`, external: true },
    { group: t.contact, title: t.email, detail: "hello@example.com", href: "mailto:hello@example.com" },
  ];
  return (
    <div className="grid min-w-0 gap-5">
      <LinkHub
        locale={locale}
        profile={{ name: "Neumorphism UI", bio: t.bio, initials: "N" }}
        links={links}
        contactEmail="hello@example.com"
      />
      <p className="mx-auto w-full max-w-2xl text-xs leading-relaxed text-[var(--muted-foreground)]">{t.note}</p>
    </div>
  );
}

export { LinkHub };
