"use client";

import * as React from "react";

import { useLocale } from "@/i18n/locale-provider";

type DocsTocItem = {
  href: string;
  label: string;
};

export function DocsToc({
  items,
  label,
}: {
  items: readonly DocsTocItem[];
  label?: string;
}) {
  const { messages } = useLocale();
  const [activeHref, setActiveHref] = React.useState(items[0]?.href ?? "");
  const visibleLabel = label ?? messages.common.onThisPage;

  React.useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.href.replace(/^#/, "")))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-96px 0px -65% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <aside className="docs-toc" aria-label={messages.common.pageToc}>
      <span>{visibleLabel}</span>
      <nav>
        {items.map((item) => (
          <a
            aria-current={activeHref === item.href ? "location" : undefined}
            className={activeHref === item.href ? "is-current" : undefined}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
