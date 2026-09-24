"use client";

import { Link } from "fumapress/client";

import { localeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";

export function SiteFooter() {
  const { locale, messages } = useLocale();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>
          <Link className="footer-brand" href={localeHref(locale)}>
            Neumorphism UI
          </Link>{" "}
          · {messages.footer.description}
        </p>
        <nav aria-label={messages.navigation.footerLabel}>
          <Link href={localeHref(locale, "/components")}>
            {messages.navigation.components}
          </Link>
          <Link href={localeHref(locale, "/customize")}>
            {messages.navigation.themes}
          </Link>
          <Link href="/r/registry.json">{messages.common.registryJson}</Link>
        </nav>
      </div>
    </footer>
  );
}
