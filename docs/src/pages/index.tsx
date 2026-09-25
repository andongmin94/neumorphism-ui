import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";

import { ComponentDirectory } from "@/components/docs/component-directory";
import { InteractivePreview } from "@/components/docs/interactive-preview";
import { isLocale, localeHref } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

const landingCopy = {
  ko: {
    kicker: "REACT / BASE UI / TAILWIND CSS V4",
    title: "뉴모피즘을 장식이 아니라 인터페이스 시스템으로.",
    body: "Raised surface, inset state, keyboard interaction을 같은 규칙으로 묶고 source로 설치합니다.",
    meta: "56 components · 80 registry items · light and dark themes",
    showcase: "실제 컴포넌트. 같은 규칙.",
    try: "직접 사용해보기 ↓",
  },
  en: {
    kicker: "REACT / BASE UI / TAILWIND CSS V4",
    title: "Neumorphism as an interface system, not a visual effect.",
    body: "Raised surfaces, inset states and keyboard interaction share one system. Install the source and make it yours.",
    meta: "56 components · 80 registry items · light and dark themes",
    showcase: "Real controls. Shared rules.",
    try: "Try it out ↓",
  },
  ja: {
    kicker: "REACT / BASE UI / TAILWIND CSS V4",
    title: "ニューモーフィズムを装飾ではなくインターフェースシステムとして。",
    body: "Raised surface、inset state、keyboard interaction を同じルールでまとめ、source として導入します。",
    meta: "56 components · 80 registry items · light and dark themes",
    showcase: "実際のコンポーネント。同じルール。",
    try: "試してみる ↓",
  },
  zh: {
    kicker: "REACT / BASE UI / TAILWIND CSS V4",
    title: "把新拟态做成界面系统，而不是视觉特效。",
    body: "Raised surface、inset state 与 keyboard interaction 共用一套规则，并以源码安装。",
    meta: "56 components · 80 registry items · light and dark themes",
    showcase: "真实组件。同一套规则。",
    try: "试试看 ↓",
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
            <p className="directory-eyebrow">{copy.kicker}</p>
            <h1>{copy.title}</h1>
            <p className="directory-hero-description">{copy.body}</p>
            <div className="directory-hero-actions">
              <Link className="docs-primary-action" href={localeHref(locale, "/docs/installation")}>
                {messages.home.install}
                <span aria-hidden="true">→</span>
              </Link>
              <a className="docs-secondary-action" href="#components">
                {messages.home.viewComponents}
              </a>
            </div>
            <p className="directory-hero-meta">{copy.meta}</p>
          </div>

          <div className="home-showcase">
            <div className="home-showcase-caption">
              <span>{copy.showcase}</span>
              <span>{copy.try}</span>
            </div>
            <div className="home-preview-card">
              <InteractivePreview />
            </div>
          </div>
        </div>
      </section>

      <ComponentDirectory />
    </div>
  );
}
