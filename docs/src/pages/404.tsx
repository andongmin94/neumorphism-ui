import { defaultLocale, isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

export default function NotFoundPage({ lang }: { lang: string | undefined }) {
  const locale = lang && isLocale(lang) ? lang : defaultLocale;
  return (
    <div className="docs-content docs-article">
      <title>404 | Neumorphism UI</title>
      <meta name="robots" content="noindex" />
      <h1>404</h1>
      <p>{getMessages(locale).site.description}</p>
    </div>
  );
}
