"use client";

import { Link } from "fumapress/client";

import { localeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";

const footerCopy = {
  ko: { meta: "56 UI · 16 blocks · 80 registry items", credits: "Credits" },
  en: { meta: "56 UI · 16 blocks · 80 registry items", credits: "Credits" },
  ja: { meta: "56 UI · 16 blocks · 80 registry items", credits: "Credits" },
  zh: { meta: "56 UI · 16 blocks · 80 registry items", credits: "Credits" },
} as const;

export function SiteFooter() {
  const { locale, messages } = useLocale();
  const copy = footerCopy[locale];

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-copy">
          <Link className="footer-brand" href={localeHref(locale)}>
            Neumorphism UI
          </Link>
          <p>{messages.footer.description}</p>
          <span>{copy.meta}</span>
        </div>

        <nav aria-label={messages.navigation.footerLabel}>
          <Link href={localeHref(locale, "/components")}>{messages.navigation.components}</Link>
          <Link href={localeHref(locale, "/templates")}>Templates</Link>
          <Link href={localeHref(locale, "/docs/credits")}>{copy.credits}</Link>
          <a href="https://github.com/andongmin94/neumorphism-ui" rel="noreferrer" target="_blank">
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
