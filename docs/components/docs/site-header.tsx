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
import { GitHubRepoLink } from "./github-repo-link";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

const navigationCopy = {
  ko: { docs: "문서", theme: "스타일링", charts: "차트", templates: "템플릿" },
  en: { docs: "Docs", theme: "Styling", charts: "Charts", templates: "Templates" },
  ja: { docs: "ドキュメント", theme: "スタイリング", charts: "チャート", templates: "テンプレート" },
  zh: { docs: "文档", theme: "样式", charts: "图表", templates: "模板" },
} as const;

function MobileDocsNavigation() {
  const { messages } = useLocale();
  const [open, setOpen] = React.useState(false);
  const closeMobileNav = React.useCallback(() => setOpen(false), []);

  React.useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
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
  const customizeHref = localeHref(locale, "/customize");
  const chartsHref = localeHref(locale, "/charts");
  const templatesHref = localeHref(locale, "/templates");

  const links = [
    { href: docsHref, label: copy.docs, active: pathname === docsHref || pathname.startsWith(docsHref + "/") || pathname.startsWith(componentsHref + "/") },
    { href: customizeHref, label: copy.theme, active: pathname === customizeHref || pathname.startsWith(customizeHref + "/") },
    { href: chartsHref, label: copy.charts, active: pathname === chartsHref || pathname.startsWith(chartsHref + "/") },
    { href: templatesHref, label: copy.templates, active: pathname === templatesHref || pathname.startsWith(templatesHref + "/") },
  ];

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <MobileDocsNavigation key={pathname} />
        <Link className="site-brand" href={homeHref} aria-label={messages.site.homeLabel}>
          <span className="site-brand__mark" aria-hidden="true">N</span>
          <span className="site-brand__name">Neumorphism UI</span>
        </Link>
        <nav className="primary-nav" aria-label={messages.navigation.primaryLabel}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} aria-current={link.active ? "page" : undefined} className={link.active ? "is-active" : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="site-actions">
          <div className="header-search"><DocsSearch /></div>
          <GitHubRepoLink />
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
