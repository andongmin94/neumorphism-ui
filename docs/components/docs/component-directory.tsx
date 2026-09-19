"use client";

import * as React from "react";
import Link from "next/link";

import type { ComponentDocCategory } from "@/components/docs/component-docs-data";
import { InstallCommand } from "@/components/docs/install-command";
import { localeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";
import { formatMessage } from "@/i18n/messages";
import { Input } from "@neumorphism-ui/registry/ui/input";

type CategoryFilter = "all" | ComponentDocCategory;

export function ComponentDirectory() {
  const { componentDocGroups, locale, messages } = useLocale();
  const [category, setCategory] = React.useState<CategoryFilter>("all");
  const [query, setQuery] = React.useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase(locale);

  const visibleGroups = componentDocGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((component) => {
        const matchesCategory =
          category === "all" || component.category === category;
        const matchesQuery =
          !normalizedQuery ||
          [component.title, component.slug, component.summary].some((value) =>
            value.toLocaleLowerCase(locale).includes(normalizedQuery),
          );

        return matchesCategory && matchesQuery;
      }),
    }))
    .filter((group) => group.items.length > 0);

  const resultCount = visibleGroups.reduce(
    (total, group) => total + group.items.length,
    0,
  );

  return (
    <section
      className="component-directory docs-content-section"
      aria-labelledby="component-directory-title"
      id="components"
    >
      <div className="component-directory-toolbar">
        <div>
          <h2 id="component-directory-title">{messages.directory.title}</h2>
          <p>{messages.directory.description}</p>
        </div>
        <label className="component-directory-search">
          <span className="sr-only">{messages.directory.searchLabel}</span>
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <Input
            onChange={(event) => setQuery(event.target.value)}
            placeholder={messages.directory.searchPlaceholder}
            value={query}
          />
        </label>
      </div>

      <div
        aria-label={messages.directory.filtersLabel}
        className="component-directory-filters"
        role="group"
      >
        <button
          aria-pressed={category === "all"}
          className={category === "all" ? "is-active" : undefined}
          onClick={() => setCategory("all")}
          type="button"
        >
          {messages.directory.all} <span>{componentDocGroups.reduce((count, group) => count + group.items.length, 0)}</span>
        </button>
        {componentDocGroups.map((group) => (
          <button
            aria-pressed={category === group.category.id}
            className={category === group.category.id ? "is-active" : undefined}
            key={group.category.id}
            onClick={() => setCategory(group.category.id)}
            type="button"
          >
            {group.category.label} <span>{group.items.length}</span>
          </button>
        ))}
      </div>

      <div className="component-directory-count" aria-live="polite">
        {formatMessage(messages.directory.resultCount, {
          count: resultCount,
        })}
      </div>

      {visibleGroups.length ? (
        <div className="component-directory-groups">
          {visibleGroups.map((group) => (
            <section key={group.category.id}>
              <header>
                <div>
                  <h3>{group.category.label}</h3>
                  <p>{group.category.description}</p>
                </div>
                <span>{group.items.length}</span>
              </header>
              <div className="component-directory-grid">
                {group.items.map((component) => (
                  <article className="component-directory-card" key={component.slug}>
                    <Link
                      href={localeHref(
                        locale,
                        `/components/${component.slug}`,
                      )}
                    >
                      <h4>
                        {component.title}
                        <span aria-hidden="true">→</span>
                      </h4>
                      <p>{component.summary}</p>
                    </Link>
                    <InstallCommand compact name={component.slug} />
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="component-directory-empty">
          <strong>{messages.directory.emptyTitle}</strong>
          <p>{messages.directory.emptyBody}</p>
          <button
            onClick={() => {
              setCategory("all");
              setQuery("");
            }}
            type="button"
          >
            {messages.directory.reset}
          </button>
        </div>
      )}
    </section>
  );
}
