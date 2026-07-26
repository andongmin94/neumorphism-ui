import type { Metadata } from "next";

import {
  getLocaleAlternates,
  localeDetails,
  type Locale,
} from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { getRequestOrigin } from "@/components/docs/request-origin";

export async function createLocalizedMetadata({
  description,
  locale,
  pathname = "/",
  title,
}: {
  description: string;
  locale: Locale;
  pathname?: string;
  title?: string;
}): Promise<Metadata> {
  const messages = getMessages(locale);
  const metadataBase = new URL(await getRequestOrigin());
  const alternates = getLocaleAlternates(locale, pathname);
  const canonical = alternates.canonical;

  return {
    metadataBase,
    title: title
      ? `${title} · Neumorphism UI`
      : "Neumorphism UI",
    description,
    alternates,
    openGraph: {
      type: "website",
      url: canonical,
      locale: localeDetails[locale].openGraphLocale,
      title: title ?? "Neumorphism UI",
      description,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: messages.site.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? "Neumorphism UI",
      description,
      images: ["/og.png"],
    },
  };
}
