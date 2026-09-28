"use client";

import * as React from "react";
import styles from "./component-directory.module.css";
import { Link } from "fumapress/client";

import type { ComponentDocCategory } from "@/components/docs/component-docs-data";
import { localeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";
import { formatMessage } from "@/i18n/messages";
import { Input } from "@neumorphism-ui/registry/ui/input";

type CategoryFilter = "all" | ComponentDocCategory;

const categoryCopy = {
  ko: "카테고리",
  en: "Categories",
  ja: "カテゴリー",
  zh: "分类",
} as const;

export function ComponentDirectory() {
  const { componentDocGroups, locale, messages } = useLocale();
  const [category, setCategory] = React.useState<CategoryFilter>("all");
  const [query, setQuery] = React.useState("");
  const searchRef = React.useRef<HTMLInputElement>(null);
  const normalizedQuery = query.trim().toLocaleLowerCase(locale);

  const entries = componentDocGroups.flatMap((group) =>
    group.items.map((component) => ({
      ...component,
      categoryLabel: group.category.label,
    })),
  );
  const totalCount = entries.length;
  const visibleItems = entries.filter((component) => {
    const matchesCategory = category === "all" || component.category === category;
    const matchesQuery =
      !normalizedQuery ||
      [component.title, component.slug, component.summary, component.categoryLabel].some((value) =>
        value.toLocaleLowerCase(locale).includes(normalizedQuery),
      );
    return matchesCategory && matchesQuery;
  });

  React.useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.closest("input, textarea, select, [contenteditable=true]");
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey || isTyping) return;
      event.preventDefault();
      searchRef.current?.focus();
    }

    document.addEventListener("keydown", focusSearch);
    return () => document.removeEventListener("keydown", focusSearch);
  }, []);

  function reset() {
    setCategory("all");
    setQuery("");
    searchRef.current?.focus();
  }

  return (
    <section className="component-directory" aria-labelledby="component-directory-title" id="components">
      <div className="component-directory-toolbar">
        <div>
          <h2 id="component-directory-title">{messages.directory.title}</h2>
          <p>{messages.directory.description}</p>
        </div>

        <label className="component-directory-search">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <Input
            ref={searchRef}
            aria-label={messages.directory.searchLabel}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={messages.directory.searchPlaceholder}
            value={query}
          />
          {query ? (
            <button aria-label={messages.directory.reset} onClick={() => { setQuery(""); searchRef.current?.focus(); }} type="button"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m6 6 12 12M6 18 18 6" /></svg></button>
          ) : (
            <kbd>/</kbd>
          )}
        </label>
      </div>

      <div className="component-directory-browser">
        <aside aria-label={messages.directory.filtersLabel} className="component-directory-categories">
          <h2>{categoryCopy[locale]}</h2>
          <div>
            <button
              aria-pressed={category === "all"}
              className={category === "all" ? "is-active" : undefined}
              onClick={() => setCategory("all")}
              type="button"
            >
              <span>{messages.directory.all}</span>
              <small>{totalCount}</small>
            </button>
            {componentDocGroups.map((group) => (
              <button
                aria-pressed={category === group.category.id}
                className={category === group.category.id ? "is-active" : undefined}
                key={group.category.id}
                onClick={() => setCategory(group.category.id)}
                type="button"
              >
                <span>{group.category.label}</span>
                <small>{group.items.length}</small>
              </button>
            ))}
          </div>
        </aside>

        <section className="component-directory-results" aria-label={messages.navigation.components}>
          <div className="component-directory-results-head">
            <p aria-live="polite">
              {formatMessage(messages.directory.resultCount, { count: visibleItems.length })}
            </p>
            <Link href={localeHref(locale, "/templates")}>
              Templates <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
            </Link>
          </div>

          {visibleItems.length ? (
            <div className="component-directory-grid">
              {visibleItems.map((component) => (
                <Link
                  className={`component-directory-card ${styles.card}`}
                  href={localeHref(locale, `/components/${component.slug}`)}
                  key={component.slug}
                >
                  <div className={styles.top}>
                    <span>{component.categoryLabel}</span>
                    <code>source</code>
                  </div>
                  <div className={styles.body}>
                    <h3>{component.title}</h3>
                    <p>{component.summary}</p>
                  </div>
                  <div className={styles.footer}>
                    <code>@neumorphism-ui/{component.slug}</code>
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="component-directory-empty">
              <strong>{messages.directory.emptyTitle}</strong>
              <p>{messages.directory.emptyBody}</p>
              <button onClick={reset} type="button">
                {messages.directory.reset}
              </button>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
