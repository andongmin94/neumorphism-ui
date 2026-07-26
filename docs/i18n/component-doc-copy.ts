import type { Locale } from "@/i18n/config";

import { componentDocs } from "@/components/docs/component-docs-data";

export type ComponentDocCopy = {
  summary: string;
  description: string;
  props: readonly string[];
  accessibility: readonly string[];
};

export type ComponentDocCopyMap = Record<
  (typeof componentDocs)[number]["slug"],
  ComponentDocCopy
>;

export function defineComponentDocCopy<const T extends ComponentDocCopyMap>(
  copy: T,
): T {
  return copy;
}

export function validateComponentDocCopy(
  locale: Exclude<Locale, "ko">,
  copy: ComponentDocCopyMap,
) {
  for (const component of componentDocs) {
    const translated = copy[component.slug];

    if (!translated) {
      throw new Error(`[${locale}] Missing component copy: ${component.slug}`);
    }

    if (translated.props.length !== component.props.length) {
      throw new Error(
        `[${locale}] ${component.slug} prop descriptions: expected ${component.props.length}, received ${translated.props.length}`,
      );
    }

    if (translated.accessibility.length !== component.accessibility.length) {
      throw new Error(
        `[${locale}] ${component.slug} accessibility notes: expected ${component.accessibility.length}, received ${translated.accessibility.length}`,
      );
    }
  }
}
