import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";

import { DocsToc } from "@/components/docs/docs-toc";
import { isLocale, localeHref } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

const copy = {
  ko: {
    title: "Documentation",
    intro: "설치, 디자인 토큰, Registry 구조와 검증 경계를 한 곳에서 확인합니다.",
    start: "시작하기",
    startBody: "Base UI 기반 프로젝트에 shared base를 설치하고 필요한 component source만 추가합니다.",
    system: "시스템",
    systemBody: "surface, depth, light, shape와 motion을 공통 token contract로 관리합니다.",
    release: "검증",
    releaseBody: "독립 설치, 브라우저 상호작용과 generated-source equality를 CI에서 검증합니다.",
  },
  en: {
    title: "Documentation",
    intro: "Installation, design tokens, registry architecture and verification boundaries in one place.",
    start: "Get started",
    startBody: "Install the shared Base UI foundation, then add only the component source your application needs.",
    system: "System",
    systemBody: "Surface, depth, light, shape and motion share one token contract.",
    release: "Verification",
    releaseBody: "CI checks independent installs, browser interaction and generated-source equality.",
  },
  ja: {
    title: "Documentation",
    intro: "Installation、design tokens、Registry architecture、verification boundary をまとめて確認します。",
    start: "はじめる",
    startBody: "Base UI の共有基盤を導入し、必要な component source だけを追加します。",
    system: "システム",
    systemBody: "surface、depth、light、shape、motion を共通 token contract で管理します。",
    release: "検証",
    releaseBody: "独立 install、browser interaction、generated-source equality を CI で確認します。",
  },
  zh: {
    title: "Documentation",
    intro: "集中查看安装、设计令牌、Registry 架构与验证边界。",
    start: "开始使用",
    startBody: "安装 Base UI 共享基础，再只添加应用需要的组件源码。",
    system: "系统",
    systemBody: "surface、depth、light、shape 与 motion 共用同一套 token contract。",
    release: "验证",
    releaseBody: "CI 检查独立安装、浏览器交互与 generated-source equality。",
  },
} as const;

export default function DocsIndexPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const locale = lang;
  const messages = getMessages(locale);
  const t = copy[locale];
  const toc = [
    { href: "#start", label: t.start },
    { href: "#system", label: t.system },
    { href: "#verification", label: t.release },
  ] as const;

  return (
    <div className="docs-content-layout docs-reference-layout">
      <article className="docs-content docs-article docs-reference-article">
        <header className="docs-page-header">
          <p className="docs-page-kicker">PROJECT DOCS / NEUMORPHISM UI</p>
          <h1>{t.title}</h1>
          <p>{t.intro}</p>
        </header>

        <section className="docs-content-section" id="start">
          <h2>{t.start}</h2>
          <p>{t.startBody}</p>
          <div className="docs-link-list">
            <Link href={localeHref(locale, "/docs/installation")}>
              <strong>{messages.navigation.installation}</strong>
              <span>→</span>
            </Link>
            <Link href={localeHref(locale)}>
              <strong>{messages.navigation.components}</strong>
              <span>→</span>
            </Link>
          </div>
        </section>

        <section className="docs-content-section" id="system">
          <h2>{t.system}</h2>
          <p>{t.systemBody}</p>
          <div className="docs-link-list">
            <Link href={localeHref(locale, "/docs/design-tokens")}>
              <strong>Design tokens</strong>
              <span>→</span>
            </Link>
            <Link href={localeHref(locale, "/docs/registry")}>
              <strong>Registry architecture</strong>
              <span>→</span>
            </Link>
          </div>
        </section>

        <section className="docs-content-section" id="verification">
          <h2>{t.release}</h2>
          <p>{t.releaseBody}</p>
          <div className="docs-link-list">
            <Link href={localeHref(locale, "/docs/accessibility")}>
              <strong>Accessibility</strong>
              <span>→</span>
            </Link>
            <Link href={localeHref(locale, "/docs/verification")}>
              <strong>Verification & release</strong>
              <span>→</span>
            </Link>
          </div>
        </section>
      </article>

      <DocsToc items={toc} />
    </div>
  );
}
