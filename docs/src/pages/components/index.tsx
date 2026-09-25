import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";

import { ComponentDirectory } from "@/components/docs/component-directory";
import { FeaturedComponents } from "@/components/docs/featured-components";
import { RegistryShowcase } from "@/components/docs/registry-showcase";
import { themePresets } from "@/components/docs/theme-config";
import { isLocale, localeHref } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { showcaseMessages } from "@/i18n/showcase-messages";

const pageCopy = {
  ko: {
    kicker: "56 INSTALLABLE PRIMITIVES",
    title: "필요한 인터페이스 부품만 source로.",
    body: "폼, 오버레이, 탐색, 데이터 표시와 피드백을 같은 표면·상태 규칙으로 조합합니다.",
    install: "설치 가이드",
    templates: "완성 템플릿 보기",
    themesKicker: "THEME SYSTEM",
    examplesKicker: "COMPOSITION",
  },
  en: {
    kicker: "56 INSTALLABLE PRIMITIVES",
    title: "Install only the interface parts you need.",
    body: "Forms, overlays, navigation, data display and feedback share one surface and interaction language.",
    install: "Installation guide",
    templates: "Explore complete templates",
    themesKicker: "THEME SYSTEM",
    examplesKicker: "COMPOSITION",
  },
  ja: {
    kicker: "56 INSTALLABLE PRIMITIVES",
    title: "必要なインターフェース部品だけを source として。",
    body: "フォーム、overlay、navigation、data display、feedback を同じ surface と state のルールで組み合わせます。",
    install: "インストールガイド",
    templates: "完成テンプレートを見る",
    themesKicker: "THEME SYSTEM",
    examplesKicker: "COMPOSITION",
  },
  zh: {
    kicker: "56 INSTALLABLE PRIMITIVES",
    title: "只安装你需要的界面部件。",
    body: "表单、浮层、导航、数据展示和反馈共享同一套表面与交互语言。",
    install: "安装指南",
    templates: "查看完整模板",
    themesKicker: "THEME SYSTEM",
    examplesKicker: "COMPOSITION",
  },
} as const;

export default function ComponentsPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const locale = lang;
  const messages = getMessages(locale);
  const copy = pageCopy[locale];

  return (
    <div className="components-landing-page">
      <header className="components-landing-hero">
        <span>{copy.kicker}</span>
        <h1>{copy.title}</h1>
        <p>{copy.body}</p>
        <div className="docs-page-actions">
          <Link className="docs-primary-action" href={localeHref(locale, "/docs/installation")}>
            {copy.install}
          </Link>
          <Link className="docs-secondary-action" href={localeHref(locale, "/templates")}>
            {copy.templates}
          </Link>
        </div>
      </header>

      <FeaturedComponents />

      <ComponentDirectory />

      <section className="components-feature-section" id="themes">
        <header>
          <span>{copy.themesKicker}</span>
          <h2>{messages.componentsPage.themes}</h2>
          <p>{messages.componentsPage.themesBody}</p>
        </header>
        <div className="docs-theme-list">
          {themePresets.map((preset) => (
            <Link href={localeHref(locale, "/customize")} key={preset.id}>
              <span className="docs-theme-swatch" style={{ background: preset.light.surface }}>
                <span style={{ background: preset.light.primary }} />
              </span>
              <span>
                <strong>{preset.name}</strong>
                <small>{preset.defaults.depth} · {preset.defaults.controlShape}</small>
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="components-feature-section components-composition-section" id="examples">
        <header>
          <span>{copy.examplesKicker}</span>
          <h2>{messages.componentsPage.examples}</h2>
          <p>{messages.componentsPage.examplesBody}</p>
        </header>
        <RegistryShowcase copy={showcaseMessages[locale]} />
      </section>
    </div>
  );
}
