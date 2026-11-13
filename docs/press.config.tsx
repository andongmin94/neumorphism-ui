import { createPress } from "fumapress";
import { robotsPlugin } from "fumapress/plugins/robots";
import { sitemapPlugin } from "fumapress/plugins/sitemap";
import { defineI18n } from "fumadocs-core/i18n";

import { SiteShell } from "@/components/docs/site-shell";
import { getThemeBootstrapScript } from "@/components/docs/theme-config";
import { ThemePreference } from "@/components/docs/theme-preference";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";
import { LocaleProvider } from "@/i18n/locale-provider";
import { getLocalizedComponentDocGroups } from "@/i18n/localized-component-docs";
import { getMessages } from "@/i18n/messages";

const i18n = defineI18n({ languages: [...locales], defaultLanguage: defaultLocale });
const translations = i18n.translations();
function resolveLocale(lang: string | undefined): Locale {
  if (lang && isLocale(lang)) return lang;
  return defaultLocale;
}

export default createPress({ files: [] }, { i18n, mode: "force-static" })
  .plugins(sitemapPlugin(), robotsPlugin())
  .config({
    preset: [],
    site: {
      name: "Neumorphism UI",
      baseUrl: "https://neumorphism-ui.andongmin.com",
      hreflang: { zh: "zh-CN" },
    },
    head: [
      { tag: "link", attrs: { rel: "icon", href: "/favicon.ico", sizes: "16x16 32x32 48x48" } },
      { tag: "link", attrs: { rel: "icon", href: "/favicon.svg", type: "image/svg+xml", sizes: "any" } },
      { tag: "link", attrs: { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" } },
      { tag: "meta", attrs: { property: "og:type", content: "website" } },
      { tag: "meta", attrs: { property: "og:site_name", content: "Neumorphism UI" } },
      { tag: "meta", attrs: { property: "og:image", content: "https://neumorphism-ui.andongmin.com/og.png" } },
      { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" } },
    ],
    ui: {
      translations,
      providerProps: { search: { enabled: false }, theme: { enabled: false } },
      renderRoot: ({ children, head, lang }) => {
        const locale = resolveLocale(lang);
        const messages = getMessages(locale);
        const componentDocGroups = getLocalizedComponentDocGroups(locale).map(({ category, items }) => ({
          category: { id: category.id, label: category.label, description: category.description },
          items: items.map(({ category: itemCategory, slug, summary, title, description, props, accessibility }) => ({
            category: itemCategory, slug, summary, title,
            search: { description, props: props.map(({ name, description }) => ({ name, description })), accessibility },
          })),
        }));
        return (
          <html lang={locale} suppressHydrationWarning>
            <head>
              {head}
              <script dangerouslySetInnerHTML={{ __html: getThemeBootstrapScript() }} />
            </head>
            <body className="flex min-h-screen flex-col">
              <LocaleProvider componentDocGroups={componentDocGroups} locale={locale} messages={messages}>
                <ThemePreference />
                <a className="skip-link" href="#main-content">{messages.site.skipToContent}</a>
                <SiteShell>{children}</SiteShell>
              </LocaleProvider>
            </body>
          </html>
        );
      },
    },
  });
