import { localeDetails, type Locale } from "@/i18n/config";

export function PageMetadata({ locale, title, description }: {
  locale: Locale;
  title: string;
  description: string;
}) {
  const pageTitle = `${title} | Neumorphism UI`;

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={localeDetails[locale].openGraphLocale} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
