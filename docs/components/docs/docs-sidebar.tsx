"use client";

import type { ReactNode } from "react";
import { Link, useRouter } from "fumapress/client";

import { localeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";

const navigationCopy = {
  ko: {
    start: "시작",
    explore: "탐색",
    reference: "레퍼런스",
    templates: "템플릿",
    charts: "차트",
    designTokens: "디자인 토큰",
    registry: "Registry 구조",
    resources: "리소스",
    accessibility: "접근성",
    verification: "검증과 릴리스",
    credits: "Credits & dependencies",
  },
  en: {
    start: "Start",
    explore: "Explore",
    reference: "Reference",
    templates: "Templates",
    charts: "Charts",
    designTokens: "Design tokens",
    registry: "Registry architecture",
    resources: "Resources",
    accessibility: "Accessibility",
    verification: "Verification & release",
    credits: "Credits & dependencies",
  },
  ja: {
    start: "スタート",
    explore: "探索",
    reference: "リファレンス",
    templates: "テンプレート",
    charts: "チャート",
    designTokens: "デザイントークン",
    registry: "Registry 構造",
    resources: "リソース",
    accessibility: "アクセシビリティ",
    verification: "検証とリリース",
    credits: "Credits & dependencies",
  },
  zh: {
    start: "开始",
    explore: "探索",
    reference: "参考",
    templates: "模板",
    charts: "图表",
    designTokens: "设计令牌",
    registry: "Registry 架构",
    resources: "资源",
    accessibility: "无障碍",
    verification: "验证与发布",
    credits: "Credits & dependencies",
  },
} as const;

type DocsNavProps = {
  onNavigate?: () => void;
};

function NavLink({
  children,
  href,
  onNavigate,
  pathname,
}: {
  children: ReactNode;
  href: string;
  onNavigate?: () => void;
  pathname: string;
}) {
  const isCurrent = pathname === href;

  return (
    <Link
      aria-current={isCurrent ? "page" : undefined}
      className={isCurrent ? "is-current" : undefined}
      href={href}
      onClick={onNavigate}
    >
      {children}
    </Link>
  );
}

export function DocsNav({ onNavigate }: DocsNavProps) {
  const { componentDocGroups, locale, messages } = useLocale();
  const { path: pathname } = useRouter();
  const copy = navigationCopy[locale];

  return (
    <nav className="docs-nav" aria-label={messages.navigation.docsNavigation}>
      <div className="docs-nav-group">
        <span>{copy.start}</span>
        <NavLink href={localeHref(locale)} onNavigate={onNavigate} pathname={pathname}>
          {messages.navigation.introduction}
        </NavLink>
        <NavLink
          href={localeHref(locale, "/docs/installation")}
          onNavigate={onNavigate}
          pathname={pathname}
        >
          {messages.navigation.installation}
        </NavLink>
      </div>

      <div className="docs-nav-group">
        <span>{copy.explore}</span>
        <NavLink href={localeHref(locale, "/components")} onNavigate={onNavigate} pathname={pathname}>
          {messages.navigation.components}
        </NavLink>
        <NavLink href={localeHref(locale, "/templates")} onNavigate={onNavigate} pathname={pathname}>
          {copy.templates}
        </NavLink>
        <NavLink href={localeHref(locale, "/charts")} onNavigate={onNavigate} pathname={pathname}>
          {copy.charts}
        </NavLink>
        <NavLink href={localeHref(locale, "/customize")} onNavigate={onNavigate} pathname={pathname}>
          {messages.navigation.themeStudio}
        </NavLink>
      </div>

      <div className="docs-nav-group">
        <span>{copy.reference}</span>
        <NavLink href={localeHref(locale, "/docs/design-tokens")} onNavigate={onNavigate} pathname={pathname}>
          {copy.designTokens}
        </NavLink>
        <NavLink href={localeHref(locale, "/docs/registry")} onNavigate={onNavigate} pathname={pathname}>
          {copy.registry}
        </NavLink>
        <NavLink href={localeHref(locale, "/docs/accessibility")} onNavigate={onNavigate} pathname={pathname}>
          {copy.accessibility}
        </NavLink>
        <NavLink href={localeHref(locale, "/docs/verification")} onNavigate={onNavigate} pathname={pathname}>
          {copy.verification}
        </NavLink>
        <NavLink href={localeHref(locale, "/docs/resources")} onNavigate={onNavigate} pathname={pathname}>
          {copy.resources}
        </NavLink>
        <NavLink href={localeHref(locale, "/docs/credits")} onNavigate={onNavigate} pathname={pathname}>
          {copy.credits}
        </NavLink>
      </div>

      {componentDocGroups.map(({ category, items }) => (
        <div className="docs-nav-group docs-nav-group-components" key={category.id}>
          <span>{category.label}</span>
          {items.map((item) => (
            <NavLink
              href={localeHref(locale, `/components/${item.slug}`)}
              key={item.slug}
              onNavigate={onNavigate}
              pathname={pathname}
            >
              {item.title}
            </NavLink>
          ))}
        </div>
      ))}
    </nav>
  );
}

export function DocsSidebar() {
  return (
    <aside className="docs-site-sidebar">
      <DocsNav />
    </aside>
  );
}
