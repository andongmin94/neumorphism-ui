"use client";

import { CopyableCode } from "@/components/docs/copyable-code";
import { ComponentDetailPreview } from "@/components/docs/component-detail-preview";
import type { ComponentPreviewMessages } from "@/i18n/component-preview-messages";
import { useLocale } from "@/i18n/locale-provider";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@neumorphism-ui/registry/ui/tabs";

type ComponentExampleProps = {
  code: string;
  copy: ComponentPreviewMessages;
  slug: string;
};

export function ComponentExample({
  code,
  copy,
  slug,
}: ComponentExampleProps) {
  const { locale, messages } = useLocale();

  return (
    <Tabs className="component-example" defaultValue="preview">
      <div className="component-example-toolbar">
        <TabsList aria-label={messages.common.preview}>
          <TabsTrigger value="preview">{messages.common.preview}</TabsTrigger>
          <TabsTrigger value="code">{messages.common.code}</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent className="component-example-panel" value="preview">
        <ComponentDetailPreview copy={copy} locale={locale} slug={slug} />
      </TabsContent>
      <TabsContent className="component-example-code" value="code">
        <CopyableCode
          code={code}
          label={`${slug} ${messages.common.code}`}
          multiline
        />
      </TabsContent>
    </Tabs>
  );
}
