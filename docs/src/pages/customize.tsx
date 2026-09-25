import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";

import { ThemeStudio } from "@/components/docs/theme-studio";
import { isLocale, localeHref } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

const pageCopy = {
  ko: {
    kicker: "INTERACTIVE THEME WORKBENCH",
    title: "토큰을 숫자가 아니라 실제 인터페이스에서 조정합니다.",
    body: "preset, depth, light, shape, motion을 한 theme engine에서 조정하고 실제 컴포넌트 표면과 생성 CSS를 동시에 확인합니다.",
    tokens: "토큰 계약 보기",
    registry: "Registry 구조",
    presets: "Preset",
    depth: "Depth",
    directions: "Light",
    shapes: "Shape",
  },
  en: {
    kicker: "INTERACTIVE THEME WORKBENCH",
    title: "Tune tokens in a real interface, not in a spreadsheet.",
    body: "Adjust preset, depth, light, shape and motion through one theme engine while the live component surface and generated CSS update together.",
    tokens: "View token contract",
    registry: "Registry architecture",
    presets: "Presets",
    depth: "Depth",
    directions: "Light",
    shapes: "Shape",
  },
  ja: {
    kicker: "INTERACTIVE THEME WORKBENCH",
    title: "トークンを表ではなく実際のインターフェースで調整します。",
    body: "preset、depth、light、shape、motion を1つの theme engine で調整し、実コンポーネントと生成 CSS を同時に確認します。",
    tokens: "トークン契約を見る",
    registry: "Registry 構造",
    presets: "Preset",
    depth: "Depth",
    directions: "Light",
    shapes: "Shape",
  },
  zh: {
    kicker: "INTERACTIVE THEME WORKBENCH",
    title: "在真实界面中调节令牌，而不是在表格里。",
    body: "通过同一主题引擎调整 preset、depth、light、shape 和 motion，同时查看真实组件表面与生成 CSS。",
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
  const messages = getMessages(locale);
  const copy = pageCopy[locale];

  return (
    <div className="theme-studio-page">
      <header className="theme-studio-page-hero">
        <span>{copy.kicker}</span>
        <h1>{copy.title}</h1>
        <p>{copy.body}</p>
        <div className="docs-page-actions">
          <Link className="docs-primary-action" href={localeHref(locale, "/docs/design-tokens")}>
            {copy.tokens}
          </Link>
          <Link className="docs-secondary-action" href={localeHref(locale, "/docs/registry")}>
            {copy.registry}
          </Link>
        </div>
        <div className="theme-studio-stats" aria-label={messages.customizePage.title}>
          <div><strong>5</strong><span>{copy.presets}</span></div>
          <div><strong>3</strong><span>{copy.depth}</span></div>
          <div><strong>4</strong><span>{copy.directions}</span></div>
          <div><strong>3</strong><span>{copy.shapes}</span></div>
        </div>
      </header>

      <ThemeStudio />
    </div>
  );
}
