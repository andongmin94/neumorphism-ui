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
    if (!sections.length) return;

    // Native anchors include document padding as well as the section margin.
    const scrollOffset = Number.parseFloat(
      getComputedStyle(document.documentElement).scrollPaddingTop,
    ) + Number.parseFloat(getComputedStyle(sections[0]).scrollMarginTop) + 1;
    const updateActive = () => {
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top > scrollOffset) break;
        current = section;
      }
      const last = sections[sections.length - 1];
      if (
        window.location.hash === `#${last.id}` &&
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1
      ) current = last;
      if (current) setActiveHref(`#${current.id}`);
    };
    const observer = new IntersectionObserver(updateActive, {
      rootMargin: `-${scrollOffset}px 0px 0px`,
    });

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("hashchange", updateActive);
    updateActive();
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", updateActive);
    };
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
