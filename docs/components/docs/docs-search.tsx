"use client";

import * as React from "react";
import { useRouter } from "fumapress/client";
import { localeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";
import { formatMessage } from "@/i18n/messages";
import { templateCopy } from "./template-copy";
import {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@neumorphism-ui/registry/ui/dialog";
import {
  Command, CommandEmpty, CommandInput, CommandItem, CommandList,
} from "@neumorphism-ui/registry/ui/command";
import styles from "./docs-search.module.css";

const referenceCopy = {
  ko: { search: "검색", tokens: "디자인 토큰", registry: "Registry 구조", resources: "리소스", accessibility: "접근성", verification: "검증과 릴리스", credits: "Credits & dependencies", charts: "차트", navigate: "탐색" },
  en: { search: "Search", tokens: "Design tokens", registry: "Registry architecture", resources: "Resources", accessibility: "Accessibility", verification: "Verification & release", credits: "Credits & dependencies", charts: "Charts", navigate: "Navigate" },
  ja: { search: "検索", tokens: "デザイントークン", registry: "Registry 構造", resources: "リソース", accessibility: "アクセシビリティ", verification: "検証とリリース", credits: "Credits & dependencies", charts: "チャート", navigate: "移動" },
  zh: { search: "搜索", tokens: "设计令牌", registry: "Registry 架构", resources: "资源", accessibility: "无障碍", verification: "验证与发布", credits: "Credits & dependencies", charts: "图表", navigate: "导航" },
} as const;

function SearchIcon() {
  return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>;
}

export function DocsSearch() {
  const router = useRouter();
  const { componentDocGroups, locale, messages } = useLocale();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const copy = referenceCopy[locale];
  const templates = templateCopy[locale];
  const entries = React.useMemo(() => {
    const componentDocs = componentDocGroups.flatMap(({ category, items }) =>
      items.map(item => ({
        href: localeHref(locale, `/components/${item.slug}`), key: item.slug,
        title: item.title, summary: item.summary, category: category.label,
      })),
    );
    const reference = [
      ["design-tokens", copy.tokens, "semantic surface depth light shape motion"],
      ["registry", copy.registry, "source ownership generated endpoints"],
      ["resources", copy.resources, "components templates charts verification"],
      ["accessibility", copy.accessibility, "keyboard focus semantics reduced motion"],
      ["verification", copy.verification, "source generation consumers browsers release"],
      ["credits", copy.credits, "license dependencies external packages ownership"],
    ].map(([key, title, summary]) => ({
      href: localeHref(locale, `/docs/${key}`), key: `docs-${key}`, title, summary,
      category: messages.search.gettingStarted,
    }));
    const screens = [
      ["dashboard", templates.dashboard, templates.dashboardBody],
      ["settings", templates.settings, templates.settingsBody],
      ["data-manager", templates.records, templates.recordsBody],
      ["link-hub", templates.links, templates.linksBody],
      ["portfolio", templates.portfolio, templates.portfolioBody],
      ["blog", templates.blog, templates.blogBody],
      ["blog-post", templates.blogPost, templates.blogPostBody],
      ["cms", templates.cms, templates.cmsBody],
    ].map(([slug, title, summary]) => ({
      href: localeHref(locale, `/templates/${slug}`), key: `template-${slug}`,
      title, summary, category: templates.title,
    }));
    return [
      { href: localeHref(locale, "/docs"), key: "introduction", title: messages.navigation.introduction, summary: messages.search.introSummary, category: messages.search.gettingStarted },
      { href: localeHref(locale, "/docs/installation"), key: "installation", title: messages.navigation.installation, summary: messages.search.installSummary, category: messages.search.gettingStarted },
      { href: localeHref(locale), key: "components", title: messages.navigation.components, summary: messages.search.componentsSummary, category: messages.navigation.components },
      { href: localeHref(locale, "/customize"), key: "theme-studio", title: messages.navigation.themeStudio, summary: messages.search.themeSummary, category: messages.search.customization },
      { href: localeHref(locale, "/charts"), key: "charts", title: copy.charts, summary: "Recharts revenue conversion operational charts CSV", category: messages.navigation.components },
      { href: localeHref(locale, "/templates"), key: "templates", title: templates.title, summary: templates.intro, category: templates.title },
      ...reference, ...componentDocs, ...screens,
    ];
  }, [componentDocGroups, locale, messages, copy, templates]);

  const handleOpenChange = React.useCallback((value: boolean) => {
    setOpen(value);
    if (!value) setQuery("");
  }, []);

  React.useEffect(() => {
    function shortcut(event: KeyboardEvent) {
      // The directory owns '/'. Respect its document-level preventDefault before
      // this window listener runs; never steal composition or an editable field.
      if (event.defaultPrevented || event.isComposing || event.keyCode === 229) return;
      const target = event.target as HTMLElement | null;
      const typing = Boolean(target?.closest("input, textarea, select, [contenteditable=true]"));
      const modifier = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (modifier || (!typing && !event.metaKey && !event.ctrlKey && !event.altKey && event.key === "/")) {
        event.preventDefault();
        handleOpenChange(!open);
      }
    }
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, [handleOpenChange, open]);

  const normalized = query.trim().toLocaleLowerCase(locale);
  const results = normalized
    ? entries.filter(entry => [entry.title, entry.key, entry.summary, entry.category].some(value => value.toLocaleLowerCase(locale).includes(normalized)))
    : entries.slice(0, 12);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<button aria-label={messages.search.trigger} className="docs-search-trigger" type="button" />}>
        <span aria-hidden="true"><SearchIcon /></span>
        <span>{copy.search}</span>
        <kbd>Ctrl K</kbd>
      </DialogTrigger>
      <DialogContent className={`docs-search-dialog ${styles.dialog}`} showCloseButton={false}>
        <DialogHeader className="sr-only">
          <DialogTitle>{messages.search.title}</DialogTitle>
          <DialogDescription>{messages.search.description}</DialogDescription>
        </DialogHeader>
        <Command
          className={styles.palette}
          shouldFilter={false}
          loop
          onKeyDownCapture={(event) => {
            if (event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229) {
              event.stopPropagation();
              return;
            }
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
              event.preventDefault();
              event.stopPropagation();
              handleOpenChange(false);
            }
          }}
        >
          <div className={styles.inputRow}>
            <SearchIcon />
            <CommandInput aria-label={messages.search.label} placeholder={messages.search.placeholder} value={query} onValueChange={setQuery} autoFocus />
            <DialogClose className={styles.close} aria-label={messages.search.close}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="m6 6 12 12M6 18 18 6" /></svg>
            </DialogClose>
          </div>
          <p className={styles.resultCount} aria-live="polite">{normalized ? formatMessage(messages.search.resultCount, { count: results.length }) : messages.search.quickJump}</p>
          <CommandList className={styles.list}>
            <CommandEmpty>{messages.search.empty}</CommandEmpty>
            {results.map(entry => (
              <CommandItem
                className={styles.result}
                key={entry.key}
                value={entry.key}
                data-href={entry.href}
                onSelect={() => {
                  handleOpenChange(false);
                  void router.push(entry.href);
                }}
              >
                <span><small>{entry.category}</small><strong>{entry.title}</strong></span>
                <span aria-hidden="true">→</span>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
        <footer className={styles.footer}>
          <span><kbd>↑</kbd><kbd>↓</kbd> {copy.navigate}</span>
          <span><kbd>Enter</kbd> {messages.search.open}</span>
          <span><kbd>Esc</kbd> {messages.search.closeAction}</span>
        </footer>
      </DialogContent>
    </Dialog>
  );
}
