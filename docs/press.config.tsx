import { defineConfig } from "fumapress";
import { fumapressTranslations } from "fumapress/i18n";
import { createRootLayout } from "fumapress/layouts/root";
import { defineI18n } from "fumadocs-core/i18n";

import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { SiteFooter } from "@/components/docs/site-footer";
import { SiteHeader } from "@/components/docs/site-header";
import { getThemeBootstrapScript } from "@/components/docs/theme-config";
import { ThemePreference } from "@/components/docs/theme-preference";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import { LocaleProvider } from "@/i18n/locale-provider";
import { getLocalizedComponentDocGroups } from "@/i18n/localized-component-docs";
import { getMessages } from "@/i18n/messages";

const i18n = defineI18n({ languages: [...locales], defaultLanguage: defaultLocale });
const translations = i18n.translations().extend(fumapressTranslations());
const PressRoot = createRootLayout({
  providerProps: { search: { enabled: false }, theme: { enabled: false } },
});

const config = defineConfig({
  content: { files: [] },
  mode: "static",
  preset: false,
  translations,
  site: {
    name: "Neumorphism UI",
    baseUrl: "https://neumorphism-ui.dev",
    hreflang: { zh: "zh-CN" },
  },
  meta: {
    root() {
      return (
        <>
          <title>Neumorphism UI</title>
          <meta name="description" content="Source-owned neumorphic React components for Base UI and shadcn projects." />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Neumorphism UI" />
          <meta property="og:image" content="https://neumorphism-ui.dev/og.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <script dangerouslySetInnerHTML={{ __html: getThemeBootstrapScript() }} />
        </>
      );
    },
  },
  renderRoot: ({ children, lang }) => {
    const locale = isLocale(lang ?? "") ? lang : defaultLocale;
    const messages = getMessages(locale);
    const componentDocGroups = getLocalizedComponentDocGroups(locale).map(({ category, items }) => ({
      category: { id: category.id, label: category.label, description: category.description },
      items: items.map(({ category: itemCategory, slug, summary, title }) => ({
        category: itemCategory, slug, summary, title,
      })),
    }));
    return (
      <PressRoot lang={locale}>
        <LocaleProvider componentDocGroups={componentDocGroups} locale={locale} messages={messages}>
          <ThemePreference />
          <a className="skip-link" href="#main-content">{messages.site.skipToContent}</a>
          <SiteHeader />
          <div className="docs-site-layout">
            <DocsSidebar />
            <div className="docs-site-main">
              <main id="main-content">{children}</main>
              <SiteFooter />
            </div>
          </div>
        </LocaleProvider>
      </PressRoot>
    );
  },
  renderNotFound: ({ lang }) => {
    const locale = isLocale(lang ?? "") ? lang : defaultLocale;
    return <main className="docs-content docs-article"><h1>404</h1><p>{getMessages(locale).site.description}</p></main>;
  },
});
export default config;
