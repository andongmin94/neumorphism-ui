import { notFound } from "fumapress/router";

import { ThemeStudio } from "@/components/docs/theme-studio";
import { isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

export default function CustomizePage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const locale = lang;
  const messages = getMessages(locale);

  return (
    <div className="docs-tool-page">
      <header className="docs-page-header">
        <h1>{messages.customizePage.title}</h1>
        <p>{messages.customizePage.intro}</p>
      </header>

      <ThemeStudio />
    </div>
  );
}
