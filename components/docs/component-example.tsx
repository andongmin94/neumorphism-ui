"use client";

import { CopyableCode } from "@/components/docs/copyable-code";
import { ComponentDetailPreview } from "@/components/docs/component-detail-preview";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/src/components/ui/tabs";

type ComponentExampleProps = {
  code: string;
  slug: string;
};

export function ComponentExample({ code, slug }: ComponentExampleProps) {
  return (
    <Tabs className="component-example" defaultValue="preview">
      <div className="component-example-toolbar">
        <TabsList aria-label="예제 보기 방식">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <span>Interactive example</span>
      </div>
      <TabsContent className="component-example-panel" value="preview">
        <ComponentDetailPreview slug={slug} />
      </TabsContent>
      <TabsContent className="component-example-code" value="code">
        <CopyableCode
          code={code}
          label={`${slug} 예제 코드`}
          multiline
        />
      </TabsContent>
    </Tabs>
  );
}
