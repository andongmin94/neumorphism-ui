"use client";

import * as React from "react";
import { Link, useRouter } from "fumapress/client";

import { localeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@neumorphism-ui/registry/ui/dialog";

import { DocsSearch } from "./docs-search";
import { DocsNav } from "./docs-sidebar";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

const navigationCopy = {
  ko: { docs: "문서", components: "컴포넌트", templates: "템플릿", charts: "차트", theme: "테마" },
  en: { docs: "Docs", components: "Components", templates: "Templates", charts: "Charts", theme: "Theme" },
  ja: { docs: "ドキュメント", components: "コンポーネント", templates: "テンプレート", charts: "チャート", theme: "テーマ" },
  zh: { docs: "文档", components: "组件", templates: "模板", charts: "图表", theme: "主题" },
} as const;

function MobileDocsNavigation() {
  const { messages } = useLocale();
  const [open, setOpen] = React.useState(false);

  const closeMobileNav = React.useCallback(() => setOpen(false), []);

  React.useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1025px)");
    const closeAtDesktopWidth = (event: MediaQueryListEvent) => {
      if (event.matches) closeMobileNav();
    };
    desktopQuery.addEventListener("change", closeAtDesktopWidth);
    return () => desktopQuery.removeEventListener("change", closeAtDesktopWidth);
  }, [closeMobileNav]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            aria-controls="mobile-docs-navigation"
            aria-label={open ? messages.navigation.mobileClose : messages.navigation.mobileOpen}
            className="mobile-nav-trigger"
            type="button"
          />
        }
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </DialogTrigger>

      <DialogContent
        aria-labelledby="mobile-docs-navigation-title"
        className="mobile-nav-panel translate-x-0 translate-y-0"
        id="mobile-docs-navigation"
        overlayClassName="mobile-nav-backdrop"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only" id="mobile-docs-navigation-title">
          {messages.navigation.mobileLabel}
        </DialogTitle>
        <div className="mobile-nav-heading">
          <strong>{messages.navigation.docs}</strong>
          <DialogClose aria-label={messages.navigation.mobileClose} className="mobile-nav-close">
            <span aria-hidden="true">×</span>
          </DialogClose>
        </div>
        <div className="mobile-nav-scroll">
          <DocsNav onNavigate={closeMobileNav} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function SiteHeader() {
  const { locale, messages } = useLocale();
  const { path: pathname } = useRouter();
  const copy = navigationCopy[locale];

  const homeHref = localeHref(locale);
  const docsHref = localeHref(locale, "/docs");
  const componentsHref = localeHref(locale, "/components");
  const templatesHref = localeHref(locale, "/templates");
  const chartsHref = localeHref(locale, "/charts");
  const customizeHref = localeHref(locale, "/customize");

  const links = [
    {
      href: homeHref,
      label: copy.docs,
      active: pathname === homeHref || pathname === docsHref || pathname.startsWith(`${docsHref}/`),
    },
    {
      href: componentsHref,
      label: copy.components,
      active: pathname === componentsHref || pathname.startsWith(`${componentsHref}/`),
    },
    {
      href: templatesHref,
      label: copy.templates,
      active: pathname === templatesHref || pathname.startsWith(`${templatesHref}/`),
    },
    {
      href: chartsHref,
      label: copy.charts,
      active: pathname === chartsHref || pathname.startsWith(`${chartsHref}/`),
    },
    {
      href: customizeHref,
      label: copy.theme,
      active: pathname === customizeHref || pathname.startsWith(`${customizeHref}/`),
    },
  ];

  return (
    <header className="site-header">
      <div className="header-inner">
        <MobileDocsNavigation key={pathname} />

        <Link className="brand" href={homeHref} aria-label={messages.site.homeLabel}>
          <span className="brand-sigil" aria-hidden="true">N</span>
          <span className="brand-copy">
            <strong>Neumorphism UI</strong>
          </span>
        </Link>

        <nav className="primary-nav" aria-label={messages.navigation.primaryLabel}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={link.active ? "page" : undefined}
              className={link.active ? "is-active" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-search">
          <DocsSearch />
        </div>

        <a
          className="header-github-link"
          href="https://github.com/andongmin94/neumorphism-ui"
          rel="noreferrer"
          target="_blank"
          aria-label="Open Neumorphism UI on GitHub"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 .7a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C15 6.2 16 6.5 16 6.5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.1v3.1c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .7Z"
            />
          </svg>
          <span>GitHub</span>
        </a>

        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
}
