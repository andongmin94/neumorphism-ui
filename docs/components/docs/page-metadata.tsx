import { getLocaleAlternates, localeDetails, type Locale } from "@/i18n/config";

const siteOrigin = "https://neumorphism-ui.andongmin.com";

export function PageMetadata({ locale, pathname, title, description }: {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
}) {
  const alternates = getLocaleAlternates(locale, pathname);
  const canonical = new URL(alternates.canonical, siteOrigin).href;
  const pageTitle = `${title} | Neumorphism UI`;

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {Object.entries(alternates.languages).map(([language, href]) => (
        <link key={language} rel="alternate" hrefLang={language} href={new URL(href, siteOrigin).href} />
      ))}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={localeDetails[locale].openGraphLocale} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
