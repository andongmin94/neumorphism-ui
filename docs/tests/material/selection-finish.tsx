import * as React from "react";
import { createRoot } from "react-dom/client";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { buildThemeVariables, defaultThemeSettings, getThemePreset, type ThemePresetId } from "../../src/registry/theme";
import "./styles.css";

const copy = {
  en: ["Left", "Center", "Right", "Pin", "Keep this complete label readable within the control"],
  ko: ["왼쪽", "가운데", "오른쪽", "고정", "선택한 작업을 프로젝트 상단에 항상 고정하기"],
  ja: ["左揃え", "中央揃え", "右揃え", "固定", "選択したタスクをプロジェクトの先頭に固定する"],
  zh: ["左对齐", "居中", "右对齐", "固定", "始终将所选任务固定在项目列表的顶部"],
};
function Specimen() {
  const params = new URLSearchParams(location.search);
  const locale = (["en", "ko", "ja", "zh"] as const).find(v => v === params.get("locale")) ?? "en";
  const mode = params.get("mode") === "dark" ? "dark" : "light";
  const preset = getThemePreset((params.get("preset") ?? "air") as ThemePresetId);
  const [value, setValue] = React.useState<string[]>(["left"]);
  const [pressed, setPressed] = React.useState(false);
  React.useLayoutEffect(() => {
    for (const [key, val] of Object.entries(buildThemeVariables({ ...defaultThemeSettings, ...preset.defaults, presetId: preset.id }, mode))) document.documentElement.style.setProperty(key, val);
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.lang = locale;
  }, [mode, preset, locale]);
  return <main className="mx-auto grid max-w-3xl gap-8 p-6">
    <section className="grid min-w-0 gap-3" data-testid="single">
      <ToggleGroup aria-label="Alignment" value={value} onValueChange={setValue}>
        {["left", "center", "right"].map((v, i) => <ToggleGroupItem key={v} value={v}>{copy[locale][i]}</ToggleGroupItem>)}
        <ToggleGroupItem value="locked" disabled>Locked</ToggleGroupItem>
      </ToggleGroup><output>{value.join(",")}</output>
    </section>
    <section data-testid="multiple"><ToggleGroup aria-label="Text formatting" multiple defaultValue={["bold"]}>
      <ToggleGroupItem value="bold">B</ToggleGroupItem><ToggleGroupItem value="italic">I</ToggleGroupItem><ToggleGroupItem value="underline">U</ToggleGroupItem>
    </ToggleGroup></section>
    <section data-testid="vertical"><ToggleGroup orientation="vertical" aria-label="Vertical alignment" defaultValue={["left"]}>
      <ToggleGroupItem value="left">{copy[locale][0]}</ToggleGroupItem><ToggleGroupItem value="right">{copy[locale][2]}</ToggleGroupItem>
    </ToggleGroup></section>
    <section className="flex min-w-0 flex-wrap items-center gap-4" data-testid="standalone">
      <Toggle pressed={pressed} onPressedChange={setPressed}>{copy[locale][3]}</Toggle>
      <Toggle disabled defaultPressed>{copy[locale][3]}</Toggle>
      <Toggle className="min-h-12 text-base" data-testid="caller">Custom <svg className="size-6" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor"/></svg></Toggle>
    </section>
    <section className="grid min-w-0 max-w-full gap-4" data-testid="long">
      <Toggle>{copy[locale][4]}</Toggle>
      <ToggleGroup aria-label="Long choices" defaultValue={["long"]}>
        <ToggleGroupItem value="long">{"UnbrokenLabel".repeat(10)}</ToggleGroupItem><ToggleGroupItem value="short">Short</ToggleGroupItem>
      </ToggleGroup>
    </section>
  </main>;
}
createRoot(document.getElementById("root")!).render(<Specimen />);
