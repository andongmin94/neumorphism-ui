import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";

import { ComponentDirectory } from "@/components/docs/component-directory";
import { HomeShowcase } from "@/components/docs/home-showcase";
import { componentDocs } from "@/components/docs/component-docs-data";
import { isLocale, localeHref } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

const landingCopy = {
  ko: {
    title: "React용 뉴모피즘 UI",
    body: "버튼, 입력 폼, 표, 메뉴를 shadcn으로 설치하세요. 소스를 직접 수정할 수 있으며 라이트·다크 테마를 제공합니다.",
    browse: "컴포넌트 살펴보기", meta: "오픈 소스 · 라이트와 다크 테마",
  },
  en: {
    title: "Neumorphic UI for React",
    body: "Install buttons, forms, tables and menus with shadcn. Edit the source in your project, with light and dark themes included.",
    browse: "Browse components", meta: "Open source · Light and dark themes",
  },
  ja: {
    title: "React向けニューモーフィズムUI",
    body: "ボタン、フォーム、テーブル、メニューをshadcnで導入できます。ソースを編集でき、ライト・ダークテーマに対応しています。",
    browse: "コンポーネントを見る", meta: "オープンソース · ライトとダークテーマ",
  },
  zh: {
    title: "React 新拟态 UI 组件",
    body: "通过 shadcn 安装按钮、表单、表格和菜单。直接编辑项目中的源码，支持明亮和深色主题。",
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
            <p className="directory-eyebrow">React · Base UI · Tailwind CSS 4</p>
            <h1>{copy.title}</h1>
            <p className="directory-hero-description">{copy.body}</p>
            <div className="directory-hero-actions">
              <Link className="docs-primary-action" href={localeHref(locale, "/docs/installation")}>
                {messages.home.install}<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
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
