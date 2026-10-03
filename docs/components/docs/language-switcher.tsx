"use client";

import "pretendard-jp/dist/web/variable/pretendardvariable-jp-dynamic-subset.css";
import "@fontsource/noto-sans-sc/500.css";
import styles from "./language-switcher.module.css";

import { useRouter } from "fumapress/client";

import {
  localeDetails,
  locales,
  switchLocaleHref,
} from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";

export function LanguageSwitcher() {
  const { path: pathname, query: routerQuery } = useRouter();
  const { locale, messages } = useLocale();
  const currentLocale = localeDetails[locale];
  const query = routerQuery ?? "";

  return (
    <details className={`language-switcher ${styles.switcher}`}>
      <summary className={styles.trigger} aria-label={messages.site.languageMenu}>
        <span aria-hidden="true">{currentLocale.shortLabel}</span>
      </summary>
      <nav className={styles.menu} aria-label={messages.site.languageMenu}>
        {locales.map((nextLocale) => {
          const details = localeDetails[nextLocale];

          return (
            <a
              className={styles.item}
              aria-current={nextLocale === locale ? "page" : undefined}
              href={`${switchLocaleHref(pathname, nextLocale)}${
                query ? `?${query}` : ""
              }`}
              hrefLang={details.htmlLang}
              key={nextLocale}
              lang={details.htmlLang}
            >
              <span>{details.label}</span>
              <svg aria-hidden="true" className={styles.check} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12 4 4L19 6" />
              </svg>
            </a>
          );
        })}
      </nav>
    </details>
  );
}
