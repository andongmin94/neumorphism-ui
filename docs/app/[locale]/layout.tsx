import { notFound } from "next/navigation";

import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { SiteFooter } from "@/components/docs/site-footer";
import { SiteHeader } from "@/components/docs/site-header";
import { getThemeBootstrapScript } from "@/components/docs/theme-config";
import { ThemePreference } from "@/components/docs/theme-preference";
import {
  isLocale,
  localeDetails,
  locales,
  type Locale,
} from "@/i18n/config";
import { LocaleProvider } from "@/i18n/locale-provider";
import { getLocalizedComponentDocGroups } from "@/i18n/localized-component-docs";
import { createLocalizedMetadata } from "@/i18n/metadata";
import { getMessages } from "@/i18n/messages";
import "pretendard/dist/web/variable/pretendardvariable.css";
import "@/app/globals.css";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, "params">) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  return createLocalizedMetadata({
    locale: localeParam,
    description: getMessages(localeParam).site.description,
  });
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const messages = getMessages(locale);
  const componentDocGroups = getLocalizedComponentDocGroups(locale).map(
    ({ category, items }) => ({
      category: {
        id: category.id,
        label: category.label,
        description: category.description,
      },
      items: items.map(({ category: itemCategory, slug, summary, title }) => ({
        category: itemCategory,
        slug,
        summary,
        title,
      })),
    }),
  );

  return (
    <html lang={localeDetails[locale].htmlLang} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: getThemeBootstrapScript(),
          }}
        />
      </head>
      <body>
        <LocaleProvider
          componentDocGroups={componentDocGroups}
          locale={locale}
          messages={messages}
        >
          <ThemePreference />
          <a className="skip-link" href="#main-content">
            {messages.site.skipToContent}
          </a>
          <SiteHeader />
          <div className="docs-site-layout">
            <DocsSidebar />
            <div className="docs-site-main">
              <main id="main-content">{children}</main>
              <SiteFooter />
            </div>
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
