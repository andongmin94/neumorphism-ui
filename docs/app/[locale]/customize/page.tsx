import { notFound } from "next/navigation";

import { ThemeStudio } from "@/components/docs/theme-studio";
import { isLocale, locales } from "@/i18n/config";
import { createLocalizedMetadata } from "@/i18n/metadata";
import { getMessages } from "@/i18n/messages";

type CustomizePageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: CustomizePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const messages = getMessages(locale);

  return createLocalizedMetadata({
    locale,
    pathname: "/customize",
    title: messages.customizePage.title,
    description: messages.customizePage.metaDescription,
  });
}

export default async function CustomizePage({ params }: CustomizePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

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
