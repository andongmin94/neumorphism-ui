import * as React from "react";
import { createRoot } from "react-dom/client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { buildThemeVariables, defaultThemeSettings } from "../../src/registry/theme";
import "./styles.css";

const labels = { en: ["Preview", "Code"], ko: ["미리보기", "코드"], ja: ["プレビュー", "コード"], zh: ["预览", "代码"] };
function Specimen() {
  const params = new URLSearchParams(location.search);
  const locale = (["en", "ko", "ja", "zh"] as const).find(v => v === params.get("locale")) ?? "en";
  const mode = params.get("mode") === "dark" ? "dark" : "light";
  const [value, setValue] = React.useState<string | number | null>("preview");
  React.useLayoutEffect(() => {
    for (const [key, val] of Object.entries(buildThemeVariables(defaultThemeSettings, mode))) document.documentElement.style.setProperty(key, val);
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.lang = locale;
  }, [mode, locale]);
  return <main className="mx-auto grid max-w-3xl gap-10 p-6">
    <Tabs data-testid="horizontal" value={value} onValueChange={setValue}>
      <TabsList aria-label="Preview mode">
        <TabsTrigger value="preview">{labels[locale][0]}</TabsTrigger>
        <TabsTrigger value="locked" disabled>Locked</TabsTrigger>
        <TabsTrigger value="code">{labels[locale][1]}</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">Preview content</TabsContent>
      <TabsContent value="code">Code content</TabsContent>
    </Tabs>
    <Tabs data-testid="vertical" orientation="vertical" defaultValue="preview">
      <TabsList aria-label="Vertical mode">
        <TabsTrigger value="preview">{labels[locale][0]}</TabsTrigger>
        <TabsTrigger value="code">{labels[locale][1]}</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">Preview content</TabsContent>
      <TabsContent value="code">Code content</TabsContent>
    </Tabs>
    <Tabs data-testid="long" defaultValue="first">
      <TabsList aria-label="Long labels">
        <TabsTrigger value="first">A complete long preview label</TabsTrigger>
        <TabsTrigger value="last">A complete long source code label</TabsTrigger>
      </TabsList>
      <TabsContent value="first">First panel</TabsContent>
      <TabsContent value="last">Last panel</TabsContent>
    </Tabs>
  </main>;
}
createRoot(document.getElementById("root")!).render(<Specimen />);
