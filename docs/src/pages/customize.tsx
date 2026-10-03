import { notFound } from "fumapress/router";

import { ThemeStudio } from "@/components/docs/theme-studio";
import { isLocale } from "@/i18n/config";

const pageCopy = {
  ko: {
    title: "테마 설정",
    body: "색상, 그림자, 모서리와 움직임을 조정하세요. 미리보기에 적용한 설정을 CSS로 복사할 수 있습니다.",
    tokens: "토큰 계약 보기",
    registry: "Registry 구조",
    presets: "Preset",
    depth: "Depth",
    directions: "Light",
    shapes: "Shape",
  },
  en: {
    title: "Theme Studio",
    body: "Adjust colors, shadows, corners and motion. Preview the settings on components and copy the CSS.",
    tokens: "View token contract",
    registry: "Registry architecture",
    presets: "Presets",
    depth: "Depth",
    directions: "Light",
    shapes: "Shape",
  },
  ja: {
    title: "テーマ設定",
    body: "色、影、角の丸み、動きを調整します。コンポーネントで確認した設定をCSSとしてコピーできます。",
    tokens: "トークン契約を見る",
    registry: "Registry 構造",
    presets: "Preset",
    depth: "Depth",
    directions: "Light",
    shapes: "Shape",
  },
  zh: {
    title: "主题设置",
    body: "调整颜色、阴影、圆角与动效。在组件中预览设置，然后复制 CSS。",
    tokens: "查看令牌契约",
    registry: "Registry 架构",
    presets: "Preset",
    depth: "Depth",
    directions: "Light",
    shapes: "Shape",
  },
} as const;

export default function CustomizePage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const locale = lang;
  const copy = pageCopy[locale];

  return (
    <div className="theme-studio-page">
      <header className="theme-studio-page-hero">
        <h1>{copy.title}</h1>
        <p>{copy.body}</p>
      </header>

      <ThemeStudio />
    </div>
  );
}
