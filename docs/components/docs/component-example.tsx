"use client";

import { useEffect, useState, type ReactNode } from "react";
import styles from "./component-example.module.css";
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
  code: ReactNode;
  copy: ComponentPreviewMessages;
  slug: string;
};

export function ComponentExample({
  code,
  copy,
  slug,
}: ComponentExampleProps) {
  const { locale, messages } = useLocale();
  const [ready, setReady] = useState(false);

  // Static tabs must not accept a click before their event handlers exist.
  useEffect(() => setReady(true), []);

  return (
    <Tabs className={`component-example ${styles.example}`} defaultValue="preview" aria-busy={!ready}>
      <div className={`component-example-toolbar ${styles.toolbar}`}>
        <TabsList aria-label={messages.common.preview}>
          <TabsTrigger value="preview" disabled={!ready}>{messages.common.preview}</TabsTrigger>
          <TabsTrigger value="code" disabled={!ready}>{messages.common.code}</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent className={`component-example-panel ${styles.preview}`} value="preview">
        {/* The stage owns the documentation width, not the installed control. */}
        <div className="grid min-w-0 place-items-center" data-component-stage>
          <ComponentDetailPreview copy={copy} locale={locale} slug={slug} />
        </div>
      </TabsContent>
      <TabsContent className={`component-example-code ${styles.code}`} value="code">
        {code}
      </TabsContent>
    </Tabs>
  );
}
