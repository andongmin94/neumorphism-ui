"use client";

import { usePathname, useSearchParams } from "next/navigation";

import {
  localeDetails,
  locales,
  switchLocaleHref,
} from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale, messages } = useLocale();
  const currentLocale = localeDetails[locale];
  const query = searchParams.toString();

  return (
    <details className="language-switcher">
      <summary aria-label={messages.site.languageMenu}>
        <span aria-hidden="true">{currentLocale.shortLabel}</span>
      </summary>
      <nav aria-label={messages.site.languageMenu}>
        {locales.map((nextLocale) => {
          const details = localeDetails[nextLocale];

          return (
            <a
              aria-current={nextLocale === locale ? "page" : undefined}
              href={`${switchLocaleHref(pathname, nextLocale)}${
                query ? `?${query}` : ""
              }`}
              hrefLang={details.htmlLang}
              key={nextLocale}
              lang={details.htmlLang}
            >
              {details.label}
            </a>
          );
        })}
      </nav>
    </details>
  );
}
