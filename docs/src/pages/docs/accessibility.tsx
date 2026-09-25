import { notFound } from "fumapress/router";

import { isLocale } from "@/i18n/config";

const copy = {
  ko: {
    title: "접근성",
    intro: "컴포넌트가 지키는 접근성 계약과 현재 검증 범위를 구분해서 설명합니다.",
    keyboard: "키보드와 포커스",
    semantics: "의미와 상태",
    motion: "모션과 시각 상태",
    evidence: "현재 검증",
    limits: "검증하지 않았다고 말해야 하는 것",
  },
  en: {
    title: "Accessibility",
    intro: "The interaction contract components aim to preserve, separated from what the project has actually verified.",
    keyboard: "Keyboard and focus",
    semantics: "Semantics and state",
    motion: "Motion and visible state",
    evidence: "Current verification",
    limits: "What is not certified",
  },
  ja: {
    title: "アクセシビリティ",
    intro: "コンポーネントが維持する interaction contract と、実際に検証した範囲を分けて説明します。",
    keyboard: "キーボードとフォーカス",
    semantics: "意味と状態",
    motion: "モーションと可視状態",
    evidence: "現在の検証",
    limits: "認証していない範囲",
  },
  zh: {
    title: "无障碍",
    intro: "区分组件应保持的交互契约与项目实际完成的验证范围。",
    keyboard: "键盘与焦点",
    semantics: "语义与状态",
    motion: "动效与可见状态",
    evidence: "当前验证",
    limits: "尚未认证的范围",
  },
} as const;

export default function AccessibilityPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const t = copy[lang];

  return (
    <div className="mx-auto w-full max-w-5xl px-5 pt-8 pb-16 sm:px-8 sm:pt-12">
      <article className="docs-content docs-article">
        <header className="docs-page-header"><h1>{t.title}</h1><p>{t.intro}</p></header>

        <section className="docs-content-section">
          <h2>{t.keyboard}</h2>
          <ul>
            <li>Base UI owns keyboard state machines for dialogs, menus, tabs, comboboxes, drawers, tooltips and related overlays.</li>
            <li>Visible focus rings are retained instead of being removed for visual cleanliness.</li>
            <li>Modal and overlay examples verify Escape dismiss and focus return to the trigger.</li>
            <li>Carousel, resizable panels, command lists and menus keep their native or library keyboard model.</li>
          </ul>
        </section>

        <section className="docs-content-section">
          <h2>{t.semantics}</h2>
          <ul>
            <li>Form controls keep label, description, validation and disabled-state relationships explicit.</li>
            <li>Persistent selection is exposed semantically and remains visually distinct from hover.</li>
            <li>Charts provide exact-data tables next to visual marks instead of making SVG the only data representation.</li>
            <li>Duplicated Marquee content is hidden from assistive technology; Image Card keeps figure and figcaption semantics.</li>
          </ul>
        </section>

        <section className="docs-content-section">
          <h2>{t.motion}</h2>
          <ul>
            <li>Reduced motion removes or short-circuits transitions without removing focus, pressed or selected state.</li>
            <li>Depth is used for state and hierarchy, not as the only signal for destructive or selected content.</li>
            <li>Theme presets share one semantic foreground/background contract in light and dark modes.</li>
          </ul>
        </section>

        <section className="docs-content-section">
          <h2>{t.evidence}</h2>
          <ul>
            <li>Installed Vite and Next.js consumers are exercised in Chromium, Firefox and WebKit.</li>
            <li>Documentation runs desktop-light and mobile-dark interaction checks plus reflow and source-recovery checks.</li>
            <li>Independent-item CI builds every file-bearing registry item in fresh projects.</li>
            <li>Regression tests cover theme contrast constraints, generated equality, form composition and state recovery.</li>
          </ul>
        </section>

        <section className="docs-content-section">
          <h2>{t.limits}</h2>
          <p>
            These checks are evidence, not exhaustive accessibility certification. They do not establish
            complete screen-reader behavior across every component state, real Korean/Japanese/Chinese IME
            composition, every touch-device gesture, or every preset/browser/assistive-technology combination.
          </p>
        </section>
      </article>
    </div>
  );
}
