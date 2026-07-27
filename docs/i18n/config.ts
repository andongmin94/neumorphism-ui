export const locales = ["ko", "en", "zh", "ja"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ko";

export const localeDetails: Record<
  Locale,
  {
    htmlLang: string;
    label: string;
    shortLabel: string;
    openGraphLocale: string;
  }
> = {
  ko: {
    htmlLang: "ko",
    label: "한국어",
    shortLabel: "KO",
    openGraphLocale: "ko_KR",
  },
  en: {
    htmlLang: "en",
    label: "English",
    shortLabel: "EN",
    openGraphLocale: "en_US",
  },
  zh: {
    htmlLang: "zh-CN",
    label: "简体中文",
    shortLabel: "中文",
    openGraphLocale: "zh_CN",
  },
  ja: {
    htmlLang: "ja",
    label: "日本語",
    shortLabel: "日本語",
    openGraphLocale: "ja_JP",
  },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function assertLocale(value: string): Locale {
  if (!isLocale(value)) {
    throw new Error(`Unsupported locale: ${value}`);
  }

  return value;
}

export function localeHref(locale: Locale, pathname = "/"): string {
  const normalizedPath = pathname === "/" ? "" : `/${pathname.replace(/^\/+/, "")}`;
  return `/${locale}${normalizedPath}`;
}

export function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split("/");
  const possibleLocale = segments[1] ?? "";

  if (!isLocale(possibleLocale)) {
    return pathname || "/";
  }

  const stripped = `/${segments.slice(2).join("/")}`;
  return stripped === "/" ? "/" : stripped.replace(/\/+$/, "");
}

export function switchLocaleHref(
  pathname: string,
  nextLocale: Locale,
): string {
  return localeHref(nextLocale, stripLocalePrefix(pathname));
}

export function getLocaleAlternates(locale: Locale, pathname = "/") {
  return {
    canonical: localeHref(locale, pathname),
    languages: {
      ko: localeHref("ko", pathname),
      en: localeHref("en", pathname),
      "zh-CN": localeHref("zh", pathname),
      ja: localeHref("ja", pathname),
      "x-default": localeHref(defaultLocale, pathname),
    },
  };
}
