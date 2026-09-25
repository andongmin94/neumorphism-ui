"use client";

import * as React from "react";
import { Link } from "fumapress/client";

import { localeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";
import { formatMessage } from "@/i18n/messages";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@neumorphism-ui/registry/ui/dialog";
import { Input } from "@neumorphism-ui/registry/ui/input";

const referenceSearchCopy = {
  ko: {
    tokens: ["디자인 토큰", "semantic · surface · depth"],
    registry: ["Registry 구조", "source ownership · generated endpoint"],
    resources: ["리소스", "components · templates · charts · verification"],
    accessibility: ["접근성", "keyboard · focus · semantics · reduced motion"], verification: ["검증과 릴리스", "source · generation · consumers · browsers"], credits: ["Credits & dependencies", "외부 패키지와 소유 경계"],
  },
  en: {
    tokens: ["Design tokens", "semantic · surface · depth"],
    registry: ["Registry architecture", "source ownership · generated endpoints"],
    resources: ["Resources", "components · templates · charts · verification"],
    accessibility: ["Accessibility", "keyboard · focus · semantics · reduced motion"], verification: ["Verification & release", "source · generation · consumers · browsers"], credits: ["Credits & dependencies", "external packages and ownership boundaries"],
  },
  ja: {
    tokens: ["デザイントークン", "semantic · surface · depth"],
    registry: ["Registry 構造", "source ownership · generated endpoint"],
    resources: ["リソース", "components · templates · charts · verification"],
    accessibility: ["アクセシビリティ", "keyboard · focus · semantics · reduced motion"], verification: ["検証とリリース", "source · generation · consumers · browsers"], credits: ["Credits & dependencies", "外部パッケージと所有境界"],
  },
  zh: {
    tokens: ["设计令牌", "semantic · surface · depth"],
    registry: ["Registry 架构", "source ownership · generated endpoint"],
    resources: ["资源", "components · templates · charts · verification"],
    accessibility: ["无障碍", "keyboard · focus · semantics · reduced motion"], verification: ["验证与发布", "source · generation · consumers · browsers"], credits: ["Credits & dependencies", "外部包与所有权边界"],
  },
} as const;

export function DocsSearch() {
  const { componentDocGroups, locale, messages } = useLocale();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const searchEntries = React.useMemo(() => {
    const componentDocs = componentDocGroups.flatMap(({ items }) => items);
    const categoryLabels = new Map(
      componentDocGroups.map(({ category }) => [category.id, category.label]),
    );

    return [
      {
        href: localeHref(locale),
        key: "introduction",
        title: messages.navigation.introduction,
        summary: messages.search.introSummary,
        category: messages.search.gettingStarted,
      },
      {
        href: localeHref(locale, "/docs/installation"),
        key: "installation",
        title: messages.navigation.installation,
        summary: messages.search.installSummary,
        category: messages.search.gettingStarted,
      },
      {
        href: localeHref(locale, "/docs/design-tokens"),
        key: "design-tokens",
        title: referenceSearchCopy[locale].tokens[0],
        summary: referenceSearchCopy[locale].tokens[1],
        category: messages.search.gettingStarted,
      },
      {
        href: localeHref(locale, "/docs/registry"),
        key: "registry-architecture",
        title: referenceSearchCopy[locale].registry[0],
        summary: referenceSearchCopy[locale].registry[1],
        category: messages.search.gettingStarted,
      },
      {
        href: localeHref(locale, "/docs/resources"),
        key: "resources",
        title: referenceSearchCopy[locale].resources[0],
        summary: referenceSearchCopy[locale].resources[1],
        category: messages.search.gettingStarted,
      },
      {
        href: localeHref(locale, "/docs/accessibility"),
        key: "accessibility",
        title: referenceSearchCopy[locale].accessibility[0],
        summary: referenceSearchCopy[locale].accessibility[1],
        category: messages.search.gettingStarted,
      },
      {
        href: localeHref(locale, "/docs/verification"),
        key: "verification",
        title: referenceSearchCopy[locale].verification[0],
        summary: referenceSearchCopy[locale].verification[1],
        category: messages.search.gettingStarted,
      },
      {
        href: localeHref(locale, "/docs/credits"),
        key: "credits",
        title: referenceSearchCopy[locale].credits[0],
        summary: referenceSearchCopy[locale].credits[1],
        category: messages.search.gettingStarted,
      },
      {
        href: localeHref(locale, "/components"),
        key: "components",
        title: messages.navigation.components,
        summary: messages.search.componentsSummary,
        category: messages.navigation.components,
      },
      {
        href: localeHref(locale, "/customize"),
        key: "theme-studio",
        title: messages.navigation.themeStudio,
        summary: messages.search.themeSummary,
        category: messages.search.customization,
      },
      { href: localeHref(locale, "/charts"), key: "charts", title: ({ko:"차트",en:"Charts",ja:"チャート",zh:"图表"})[locale], summary: "Recharts · Revenue · Conversion · CSV", category: messages.navigation.components },
      { href: localeHref(locale, "/templates/dashboard"), key: "dashboard", title: ({ko:"분석 대시보드",en:"Analytics dashboard",ja:"分析ダッシュボード",zh:"分析仪表盘"})[locale], summary: "Analytics · Charts · Reporting", category: messages.navigation.components },
      ...componentDocs.map((component) => ({
        href: localeHref(locale, `/components/${component.slug}`),
        key: component.slug,
        title: component.title,
        summary: component.summary,
        category: categoryLabels.get(component.category) ?? "",
      })),
    ];
  }, [componentDocGroups, locale, messages]);

  const handleOpenChange = React.useCallback((nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      setQuery("");
    }
  }, []);

  const closeSearch = React.useCallback(() => {
    handleOpenChange(false);
  }, [handleOpenChange]);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) {
          closeSearch();
        } else {
          handleOpenChange(true);
        }
      } else if (!isTyping && event.key === "/") {
        event.preventDefault();
        handleOpenChange(true);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeSearch, handleOpenChange, open]);

  const normalizedQuery = query.trim().toLowerCase();
  const results = searchEntries.filter((entry) => {
    if (!normalizedQuery) {
      return true;
    }

    return [
      entry.title,
      entry.key,
      entry.summary,
      entry.category,
    ].some((value) => value.toLowerCase().includes(normalizedQuery));
  });

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogTrigger
        render={
          <button
            className="docs-search-trigger"
            type="button"
          />
        }
      >
        <span aria-hidden="true">⌕</span>
        <span>{messages.search.trigger}</span>
        <kbd>Ctrl K</kbd>
      </DialogTrigger>

      <DialogContent className="docs-search-dialog" showCloseButton={false}>
        <DialogHeader className="sr-only">
          <DialogTitle>{messages.search.title}</DialogTitle>
          <DialogDescription>
            {messages.search.description}
          </DialogDescription>
        </DialogHeader>

        <div className="docs-search-input-wrap">
          <span aria-hidden="true">⌕</span>
          <Input
            aria-label={messages.search.label}
            autoFocus
            onChange={(event) => setQuery(event.target.value)}
            placeholder={messages.search.placeholder}
            value={query}
          />
          <DialogClose
            aria-label={messages.search.close}
            className="docs-search-close"
          >
            <span aria-hidden="true">×</span>
          </DialogClose>
        </div>

        <div className="docs-search-results">
          <span className="docs-search-results-label">
            {normalizedQuery
              ? formatMessage(messages.search.resultCount, {
                  count: results.length,
                })
              : messages.search.quickJump}
          </span>
          {results.length ? (
            <div>
              {results.slice(0, 12).map((entry) => (
                <DialogClose
                  key={entry.key}
                  render={
                    <Link
                      className="docs-search-result"
                      href={entry.href}
                    />
                  }
                >
                  <span>
                    <strong>{entry.title}</strong>
                    <small>{entry.category}</small>
                  </span>
                  <span aria-hidden="true">→</span>
                </DialogClose>
              ))}
            </div>
          ) : (
            <div className="docs-search-empty">
              {messages.search.empty}
            </div>
          )}
        </div>

        <footer className="docs-search-footer">
          <span><kbd>Ctrl K</kbd> {messages.search.open}</span>
          <span><kbd>Esc</kbd> {messages.search.closeAction}</span>
          <DialogClose
            render={<Link href={localeHref(locale, "/components")} />}
          >
            {messages.navigation.components}
          </DialogClose>
        </footer>
      </DialogContent>
    </Dialog>
  );
}
