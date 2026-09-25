"use client";

import type { ReactNode } from "react";
import { Link, useRouter } from "fumapress/client";

import { localeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";

const referenceNavigation = {
  ko: { designTokens: "디자인 토큰", registry: "Registry 구조", resources: "리소스", credits: "Credits & dependencies", reference: "레퍼런스" },
  en: { designTokens: "Design tokens", registry: "Registry architecture", resources: "Resources", credits: "Credits & dependencies", reference: "Reference" },
  ja: { designTokens: "デザイントークン", registry: "Registry 構造", resources: "リソース", credits: "Credits & dependencies", reference: "リファレンス" },
  zh: { designTokens: "设计令牌", registry: "Registry 架构", resources: "资源", credits: "Credits & dependencies", reference: "参考" },
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

  return (
    <nav
      className="docs-nav"
      aria-label={messages.navigation.docsNavigation}
    >
      <div className="docs-nav-group">
        <span>{messages.navigation.gettingStarted}</span>
        <NavLink
          href={localeHref(locale)}
          onNavigate={onNavigate}
          pathname={pathname}
        >
          {messages.navigation.introduction}
        </NavLink>
        <NavLink
          href={localeHref(locale, "/docs/installation")}
          onNavigate={onNavigate}
          pathname={pathname}
        >
          {messages.navigation.installation}
        </NavLink>
        <NavLink
          href={localeHref(locale, "/docs/design-tokens")}
          onNavigate={onNavigate}
          pathname={pathname}
        >
          {referenceNavigation[locale].designTokens}
        </NavLink>
        <NavLink
          href={localeHref(locale, "/docs/registry")}
          onNavigate={onNavigate}
          pathname={pathname}
        >
          {referenceNavigation[locale].registry}
        </NavLink>
      </div>

      <div className="docs-nav-group">
        <span>{messages.navigation.configuration}</span>
        <NavLink
          href={localeHref(locale, "/customize")}
          onNavigate={onNavigate}
          pathname={pathname}
        >
          {messages.navigation.themeStudio}
        </NavLink>
      </div>

      <div className="docs-nav-group">
        <span>{referenceNavigation[locale].reference}</span>
        <NavLink
          href={localeHref(locale, "/docs/resources")}
          onNavigate={onNavigate}
          pathname={pathname}
        >
          {referenceNavigation[locale].resources}
        </NavLink>
        <NavLink
          href={localeHref(locale, "/docs/credits")}
          onNavigate={onNavigate}
          pathname={pathname}
        >
          {referenceNavigation[locale].credits}
        </NavLink>
      </div>

      <div className="docs-nav-group">
        <span>{messages.navigation.components}</span>
        <NavLink
          href={localeHref(locale, "/components")}
          onNavigate={onNavigate}
          pathname={pathname}
        >
          {messages.navigation.allComponents}
        </NavLink>
      </div>

      <div className="docs-nav-group"><span>{({ko:"템플릿",en:"Templates",ja:"テンプレート",zh:"模板"})[locale]}</span><NavLink href={localeHref(locale, "/templates")} onNavigate={onNavigate} pathname={pathname}>{({ko:"모든 템플릿",en:"All templates",ja:"すべてのテンプレート",zh:"全部模板"})[locale]}</NavLink></div>
      <div className="docs-nav-group"><NavLink href={localeHref(locale, "/charts")} onNavigate={onNavigate} pathname={pathname}>{({ko:"차트",en:"Charts",ja:"チャート",zh:"图表"})[locale]}</NavLink></div>
      {componentDocGroups.map(({ category, items }) => (
        <div className="docs-nav-group" key={category.id}>
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
