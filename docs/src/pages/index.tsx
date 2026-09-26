import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";

import { ComponentDirectory } from "@/components/docs/component-directory";
import { HomeShowcase } from "@/components/docs/home-showcase";
import { componentDocs } from "@/components/docs/component-docs-data";
import { isLocale, localeHref } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

const landingCopy = {
  ko: {
    lines: ["부드러운 표면.", "명확한 사용성."],
    body: "표면과 상태, 키보드 동작까지 같은 규칙을 따르는 React 컴포넌트입니다. 소스를 설치하고 내 프로젝트에 맞게 수정하세요.",
    browse: "컴포넌트 살펴보기", meta: "오픈 소스 · 라이트와 다크 테마",
  },
  en: {
    lines: ["Soft by design.", "Clear in use."],
    body: "Raised controls, clear selection and visible focus. Build a complete interface with shared styles and source you can edit.",
    browse: "Browse components", meta: "Open source · Light and dark themes",
  },
  ja: {
    lines: ["柔らかな表面。", "明確な使い心地。"],
    body: "表面、選択状態、キーボード操作を共通のルールで。ソースを導入し、自分のプロジェクトに合わせて編集できます。",
    browse: "コンポーネントを見る", meta: "オープンソース · ライトとダークテーマ",
  },
  zh: {
    lines: ["柔和的设计。", "清晰的体验。"],
    body: "凸起控件、清晰的选择状态与可见的焦点。用共享样式和可编辑源码构建完整界面。",
    browse: "浏览组件", meta: "开源 · 明亮与深色主题",
  },
} as const;

export default function Home({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const locale = lang;
  const messages = getMessages(locale);
  const copy = landingCopy[locale];

  return (
    <div className="directory-page">
      <section className="directory-hero">
        <div className="directory-hero-inner">
          <div className="directory-hero-copy">
            <p className="directory-eyebrow">REACT / BASE UI / TAILWIND CSS V4</p>
            <h1>{copy.lines[0]}<br />{copy.lines[1]}</h1>
            <p className="directory-hero-description">{copy.body}</p>
            <div className="directory-hero-actions">
              <Link className="docs-primary-action" href={localeHref(locale, "/docs/installation")}>
                {messages.home.install}<span aria-hidden="true">→</span>
              </Link>
              <a className="docs-secondary-action" href="#components">{copy.browse} <span>{componentDocs.length}</span></a>
            </div>
            <p className="directory-hero-meta">{copy.meta}</p>
          </div>
          <HomeShowcase />
        </div>
      </section>
      <ComponentDirectory />
    </div>
  );
}
