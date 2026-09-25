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
    destinations: "다음 목적지",
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
    destinations: "Find your next stop",
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
    destinations: "次のリンクへ",
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
    destinations: "找到下一站",
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
        "mx-auto grid w-full max-w-2xl gap-7 text-[var(--foreground)]",
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
        <div className="grid gap-1">
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

      <section className="grid gap-3 rounded-[var(--neu-radius-surface)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] p-4 [box-shadow:var(--neu-shadow-inset)]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
          {t.destinations}
        </p>
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
          <li key={`${link.group}:${link.title}`}>
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              data-highlighted={link.highlighted}
              className={cn(
                "flex min-h-24 w-full items-center gap-3 rounded-[var(--neu-radius-surface)] border border-[color:var(--neu-edge)] bg-[var(--neu-surface)] p-4 text-left text-[var(--foreground)] no-underline [box-shadow:var(--neu-shadow-raised-sm)] outline-none transition-[box-shadow,transform] duration-[var(--neu-duration)] motion-reduce:transition-none hover:[box-shadow:var(--neu-shadow-hover)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] active:translate-y-px active:[box-shadow:var(--neu-shadow-inset)] data-[highlighted=true]:border-transparent data-[highlighted=true]:bg-[var(--primary)] data-[highlighted=true]:text-[var(--primary-foreground)] data-[highlighted=true]:[box-shadow:var(--neu-shadow-primary)]",
              )}
            >
              <span
                aria-hidden="true"
                className="grid size-9 shrink-0 place-items-center rounded-full border border-current/20 text-sm font-semibold"
              >
                {link.title.slice(0, 1).toUpperCase()}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{link.title}</span>
                {link.detail ? (
                  <span className="mt-1 block truncate text-xs opacity-70">
                    {link.detail}
                  </span>
                ) : null}
                {link.external ? <span className="sr-only">{t.newTab}</span> : null}
              </span>
              <span aria-hidden="true" className="text-sm opacity-60">
                {link.external ? "↗" : "→"}
              </span>
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

const exampleLinks: LinkHubLink[] = [
  {
    group: "Work",
    title: "Portfolio",
    detail: "example.com",
    href: "https://example.com",
    external: true,
    highlighted: true,
  },
  {
    group: "Work",
    title: "GitHub",
    detail: "github.com",
    href: "https://github.com",
    external: true,
  },
  {
    group: "Writing",
    title: "Newsletter",
    detail: "buttondown.email",
    href: "https://buttondown.email",
    external: true,
  },
  {
    group: "Connect",
    title: "LinkedIn",
    detail: "linkedin.com",
    href: "https://www.linkedin.com",
    external: true,
  },
  {
    group: "Connect",
    title: "Email",
    detail: "hello@example.com",
    href: "mailto:hello@example.com",
  },
];

export function LinkHubExample({ locale = "en" }: { locale?: LinkHubLocale }) {
  return (
    <LinkHub
      locale={locale}
      profile={{
        name: "Alex Kim",
        handle: "@alexbuilds",
        bio: "Designer and developer sharing small tools, notes, and experiments.",
        initials: "AK",
      }}
      links={exampleLinks}
      contactEmail="hello@example.com"
    />
  );
}

export { LinkHub };
