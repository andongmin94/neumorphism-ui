import { defineConfig, type PressPlugin } from "fumapress";
import { fumapressTranslations } from "fumapress/i18n";
import { createRootLayout } from "fumapress/layouts/root";
import { defineI18n } from "fumadocs-core/i18n";

import { SiteShell } from "@/components/docs/site-shell";
import { getThemeBootstrapScript } from "@/components/docs/theme-config";
import { ThemePreference } from "@/components/docs/theme-preference";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";
import { LocaleProvider } from "@/i18n/locale-provider";
import { getLocalizedComponentDocGroups } from "@/i18n/localized-component-docs";
import { getMessages } from "@/i18n/messages";

const i18n = defineI18n({ languages: [...locales], defaultLanguage: defaultLocale });
const translations = i18n.translations().extend(fumapressTranslations());
function resolveLocale(lang: string | undefined): Locale {
  if (lang && isLocale(lang)) return lang;
  return defaultLocale;
}

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
    const locale = resolveLocale(lang);
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
          <SiteShell>{children}</SiteShell>
        </LocaleProvider>
      </PressRoot>
    );
  },
  renderNotFound: ({ lang }) => {
    const locale = resolveLocale(lang);
    return <main className="docs-content docs-article"><h1>404</h1><p>{getMessages(locale).site.description}</p></main>;
  },
});

// Build-time API: the deployed docs remain static. No browser GitHub token or
// per-visitor upstream request; an unavailable count is never represented as zero.
const githubStarsPlugin: PressPlugin<typeof config.$context> = {
  name: "site:github-stars",
  createPages({ createApiIsomorphic }) {
    createApiIsomorphic({
      render: "static",
      path: "/api/github-stars",
      async handler() {
        try {
          const headers: Record<string, string> = {
            Accept: "application/vnd.github+json",
            "User-Agent": "neumorphism-ui-build",
          };
          if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
          const response = await fetch("https://api.github.com/repos/andongmin94/neumorphism-ui", {
            headers,
            signal: AbortSignal.timeout(5000),
          });
          if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
          const payload = await response.json();
          const count = payload?.stargazers_count;
          if (typeof count !== "number" || !Number.isSafeInteger(count) || count < 0) {
            throw new Error("GitHub returned an invalid star count");
          }
          console.info(`GitHub star snapshot: ${count}`);
          return Response.json({ count, fetchedAt: new Date().toISOString() });
        } catch (error) {
          console.warn("GitHub star snapshot unavailable:", error instanceof Error ? error.message : "request failed");
          return Response.json({ count: null, fetchedAt: null });
        }
      },
    });
  },
};

export default config.plugins(githubStarsPlugin);
