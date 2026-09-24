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

function MobileDocsNavigation() {
  const { messages } = useLocale();
  const [open, setOpen] = React.useState(false);

  const closeMobileNav = React.useCallback(() => {
    setOpen(false);
  }, []);

  React.useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1025px)");

    function closeAtDesktopWidth(event: MediaQueryListEvent) {
      if (event.matches) {
        closeMobileNav();
      }
    }

    desktopQuery.addEventListener("change", closeAtDesktopWidth);
    return () =>
      desktopQuery.removeEventListener("change", closeAtDesktopWidth);
  }, [closeMobileNav]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            aria-controls="mobile-docs-navigation"
            aria-label={
              open
                ? messages.navigation.mobileClose
                : messages.navigation.mobileOpen
            }
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
        aria-label={messages.navigation.mobileLabel}
        className="mobile-nav-panel"
        id="mobile-docs-navigation"
        overlayClassName="mobile-nav-backdrop"
        showCloseButton={false}
      >
        <div className="mobile-nav-heading">
          <DialogTitle>{messages.navigation.docs}</DialogTitle>
          <DialogClose
            aria-label={messages.navigation.mobileClose}
            className="mobile-nav-close"
          >
            <span aria-hidden="true">×</span>
          </DialogClose>
        </div>
        <DocsNav onNavigate={closeMobileNav} />
      </DialogContent>
    </Dialog>
  );
}

export function SiteHeader() {
  const { locale, messages } = useLocale();
  const { path: pathname } = useRouter();
  const homeHref = localeHref(locale);
  const componentsHref = localeHref(locale, "/components");
  const docsHref = localeHref(locale, "/docs");
  const customizeHref = localeHref(locale, "/customize");
  const isComponents =
    pathname === componentsHref || pathname.startsWith(`${componentsHref}/`);
  const isInstallation =
    pathname === docsHref || pathname.startsWith(`${docsHref}/`);
  const isCustomize =
    pathname === customizeHref || pathname.startsWith(`${customizeHref}/`);
  const isDocs = pathname === homeHref || isInstallation;

  return (
    <header className="site-header">
      <div className="header-inner">
        <MobileDocsNavigation key={pathname} />

        <Link
          className="brand"
          href={homeHref}
          aria-label={messages.site.homeLabel}
        >
          <span className="brand-sigil" aria-hidden="true">
            N
          </span>
          <strong>Neumorphism UI</strong>
          <span>{messages.navigation.docs}</span>
        </Link>

        <nav
          className="primary-nav"
          aria-label={messages.navigation.primaryLabel}
        >
          <Link
            aria-current={isDocs ? "page" : undefined}
            className={isDocs ? "is-active" : undefined}
            href={homeHref}
          >
            {messages.navigation.docs}
          </Link>
          <Link
            aria-current={isComponents ? "page" : undefined}
            className={isComponents ? "is-active" : undefined}
            href={componentsHref}
          >
            {messages.navigation.components}
          </Link>
          <Link
            aria-current={isCustomize ? "page" : undefined}
            className={isCustomize ? "is-active" : undefined}
            href={customizeHref}
          >
            {messages.navigation.themes}
          </Link>
        </nav>

        <div className="header-search">
          <DocsSearch />
        </div>

        <Link className="header-registry-link" href="/r/registry.json">
          {messages.common.registryJson}
        </Link>

        <LanguageSwitcher />
        <ThemeToggle />
      </div>

    </header>
  );
}
