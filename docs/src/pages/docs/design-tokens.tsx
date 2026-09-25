import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";

import { isLocale, localeHref } from "@/i18n/config";
import {
  themeControlShapes,
  themeDepthIds,
  themeLightDirections,
  themeMotionValues,
  themePresets,
} from "@neumorphism-ui/registry/theme";

const copy = {
  ko: {
    title: "디자인 토큰",
    intro: "컴포넌트가 공유하는 의미·표면·깊이 토큰과 preset 계약을 한 곳에서 확인합니다.",
    semantic: "의미 토큰",
    semanticBody: "상태와 역할을 나타내는 값입니다. 컴포넌트는 특정 색상 대신 이 토큰을 참조합니다.",
    surfaces: "뉴모피즘 표면 토큰",
    surfacesBody: "raised, inset, hover, floating 같은 깊이 표현은 공통 그림자 토큰으로 제한합니다.",
    settings: "유한한 설정 축",
    settingsBody: "Theme Studio가 조합할 수 있는 값은 source에서 유한한 목록으로 관리합니다.",
    presets: "Preset",
    rules: "사용 규칙",
    themeStudio: "Theme Studio에서 직접 조정",
  },
  en: {
    title: "Design tokens",
    intro: "The shared semantic, surface and depth contract used by every installable component.",
    semantic: "Semantic tokens",
    semanticBody: "These values describe role and state. Components consume them instead of hard-coded palette values.",
    surfaces: "Neumorphic surface tokens",
    surfacesBody: "Raised, inset, hover and floating depth are limited to shared shadow tokens.",
    settings: "Finite configuration axes",
    settingsBody: "Theme Studio can only compose values explicitly owned by the theme source.",
    presets: "Presets",
    rules: "Usage rules",
    themeStudio: "Adjust them in Theme Studio",
  },
  ja: {
    title: "デザイントークン",
    intro: "すべての導入可能コンポーネントが共有する semantic・surface・depth の契約です。",
    semantic: "Semantic token",
    semanticBody: "役割と状態を表します。コンポーネントは固定色ではなくこの token を参照します。",
    surfaces: "ニューモーフィズム surface token",
    surfacesBody: "raised、inset、hover、floating の奥行きは共有 shadow token に限定します。",
    settings: "有限な設定軸",
    settingsBody: "Theme Studio は source が明示的に所有する値だけを組み合わせます。",
    presets: "Preset",
    rules: "利用ルール",
    themeStudio: "Theme Studio で調整",
  },
  zh: {
    title: "设计令牌",
    intro: "所有可安装组件共享的语义、表面与深度契约。",
    semantic: "语义令牌",
    semanticBody: "这些值描述角色和状态，组件使用它们而不是硬编码颜色。",
    surfaces: "新拟态表面令牌",
    surfacesBody: "raised、inset、hover、floating 等深度效果仅使用共享阴影令牌。",
    settings: "有限配置轴",
    settingsBody: "Theme Studio 只组合主题源码明确拥有的有限值。",
    presets: "Preset",
    rules: "使用规则",
    themeStudio: "在 Theme Studio 中调整",
  },
} as const;

const semanticTokens = [
  "--background",
  "--foreground",
  "--primary",
  "--primary-foreground",
  "--secondary",
  "--muted",
  "--muted-foreground",
  "--destructive",
  "--border",
  "--input",
  "--ring",
] as const;

const surfaceTokens = [
  "--neu-surface",
  "--neu-surface-soft",
  "--neu-surface-low",
  "--neu-shadow-raised",
  "--neu-shadow-raised-sm",
  "--neu-shadow-inset",
  "--neu-shadow-inset-sm",
  "--neu-shadow-hover",
  "--neu-shadow-floating",
  "--neu-radius-control",
  "--neu-radius-surface",
  "--neu-duration",
] as const;

export default function DesignTokensPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const locale = lang;
  const t = copy[locale];

  return (
    <div className="docs-reference-page">
      <article className="docs-content docs-article docs-reference-article">
        <header className="docs-page-header">
          <h1>{t.title}</h1>
          <p>{t.intro}</p>
        </header>

        <section className="docs-content-section">
          <h2>{t.semantic}</h2>
          <p>{t.semanticBody}</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {semanticTokens.map((token) => <code key={token} className="rounded-lg border border-[var(--border)] bg-[var(--neu-surface)] px-3 py-2">{token}</code>)}
          </div>
        </section>

        <section className="docs-content-section">
          <h2>{t.surfaces}</h2>
          <p>{t.surfacesBody}</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {surfaceTokens.map((token) => <code key={token} className="rounded-lg border border-[var(--border)] bg-[var(--neu-surface)] px-3 py-2">{token}</code>)}
          </div>
        </section>

        <section className="docs-content-section">
          <h2>{t.settings}</h2>
          <p>{t.settingsBody}</p>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div><dt className="font-semibold">Depth</dt><dd className="mt-1 text-sm text-[var(--muted-foreground)]">{themeDepthIds.join(" · ")}</dd></div>
            <div><dt className="font-semibold">Light</dt><dd className="mt-1 text-sm text-[var(--muted-foreground)]">{themeLightDirections.join(" · ")}</dd></div>
            <div><dt className="font-semibold">Control shape</dt><dd className="mt-1 text-sm text-[var(--muted-foreground)]">{themeControlShapes.join(" · ")}</dd></div>
            <div><dt className="font-semibold">Motion</dt><dd className="mt-1 text-sm text-[var(--muted-foreground)]">{themeMotionValues.map((value) => value + "ms").join(" · ")}</dd></div>
          </dl>
        </section>

        <section className="docs-content-section">
          <h2>{t.presets}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {themePresets.map((preset) => (
              <article key={preset.id} className="rounded-[var(--neu-radius-surface)] border border-[var(--neu-edge)] bg-[var(--neu-surface)] p-5 [box-shadow:var(--neu-shadow-raised-sm)]">
                <h3>{preset.name}</h3>
                <p>{preset.description}</p>
                <p><code>{preset.registryName}</code></p>
                <p className="text-sm text-[var(--muted-foreground)]">{preset.defaults.depth} · {preset.defaults.lightDirection} · {preset.defaults.controlShape}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="docs-content-section">
          <h2>{t.rules}</h2>
          <ul>
            <li>Component source consumes semantic and surface variables instead of owning a private palette.</li>
            <li>Persistent selected state stays visually distinct from transient hover state.</li>
            <li>Reduced motion changes transition behavior without removing depth or focus semantics.</li>
            <li>Generated CSS, bootstrap and registry style items come from the same theme engine.</li>
          </ul>
          <p><Link href={localeHref(locale, "/customize")}>{t.themeStudio} →</Link></p>
        </section>
      </article>
    </div>
  );
}
