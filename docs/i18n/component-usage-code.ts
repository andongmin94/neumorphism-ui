import { componentDocs } from "@/components/docs/component-docs-data";

export type ComponentUsageCodeMap = Record<
  (typeof componentDocs)[number]["slug"],
  string
>;

export function defineComponentUsageCode<
  const T extends ComponentUsageCodeMap,
>(copy: T): T {
  return copy;
}

export function validateComponentUsageCode(copy: ComponentUsageCodeMap) {
  for (const component of componentDocs) {
    const example = copy[component.slug];

    if (!example?.trim()) {
      throw new Error(`Missing usage example: ${component.slug}`);
    }
  }
}
