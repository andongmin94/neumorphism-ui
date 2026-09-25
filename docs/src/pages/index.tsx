import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";

import { InstallCommand } from "@/components/docs/install-command";
import { InteractivePreview } from "@/components/docs/interactive-preview";
import { isLocale, localeHref } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

const landingCopy = {
  ko: {
    kicker: "SOURCE-OWNED REACT UI",
    title: "뉴모피즘을 장식이 아니라 인터페이스 시스템으로.",
    body: "Base UI의 상호작용 모델, shadcn source 설치, Fumapress 문서와 실제 소비자 검증을 한 제품 안에 묶었습니다.",
    components: "컴포넌트",
    items: "Registry items",
    locales: "언어",
    browsers: "브라우저 엔진",
    explore: "제품 표면",
    componentsBody: "폼, 오버레이, 내비게이션과 데이터 UI를 source로 설치합니다.",
    templates: "템플릿",
    templatesBody: "설정, CMS, 블로그, 포트폴리오와 분석 화면을 바로 시작합니다.",
    charts: "차트",
    chartsBody: "정확한 데이터 표와 함께 제품·운영 지표를 시각화합니다.",
    theme: "Theme Studio",
    themeBody: "preset, depth, light, shape, motion을 한 theme engine에서 조정합니다.",
    principleTitle: "하나의 소스, 명확한 경계",
    source: "Source-owned",
    sourceBody: "설치된 파일은 애플리케이션 코드가 됩니다. runtime wrapper가 없습니다.",
    state: "Interaction-first",
    stateBody: "Base UI와 검증된 라이브러리가 키보드·포커스·상태 모델을 소유합니다.",
    verify: "Verified",
    verifyBody: "Next/Vite 독립 설치와 Chromium/Firefox/WebKit 상호작용을 CI에서 검증합니다.",
  },
  en: {
    kicker: "SOURCE-OWNED REACT UI",
    title: "Neumorphism as an interface system, not a visual effect.",
    body: "Base UI interaction models, shadcn source installation, Fumapress documentation and real consumer verification in one product.",
    components: "Components",
    items: "Registry items",
    locales: "Locales",
    browsers: "Browser engines",
    explore: "Product surfaces",
    componentsBody: "Install forms, overlays, navigation and data UI as editable source.",
    templates: "Templates",
    templatesBody: "Start from settings, CMS, blog, portfolio and analytics screens.",
    charts: "Charts",
    chartsBody: "Visualize product and operational signals beside exact-data tables.",
    theme: "Theme Studio",
    themeBody: "Tune preset, depth, light, shape and motion through one theme engine.",
    principleTitle: "One source, clear boundaries",
    source: "Source-owned",
    sourceBody: "Installed files become application code. There is no runtime wrapper.",
    state: "Interaction-first",
    stateBody: "Base UI and established libraries own keyboard, focus and state models.",
    verify: "Verified",
    verifyBody: "CI checks independent Next/Vite installs and Chromium/Firefox/WebKit interaction.",
  },
  ja: {
    kicker: "SOURCE-OWNED REACT UI",
    title: "ニューモーフィズムを装飾ではなくインターフェースシステムとして。",
    body: "Base UI の interaction、shadcn source install、Fumapress docs、実 consumer 検証を1つのプロダクトにまとめています。",
    components: "コンポーネント",
    items: "Registry items",
    locales: "言語",
    browsers: "ブラウザ",
    explore: "プロダクト",
    componentsBody: "フォーム、overlay、navigation、data UI を編集可能な source として導入します。",
    templates: "テンプレート",
    templatesBody: "設定、CMS、ブログ、ポートフォリオ、分析画面から始められます。",
    charts: "チャート",
    chartsBody: "正確なデータ表と一緒にプロダクト・運用指標を可視化します。",
    theme: "Theme Studio",
    themeBody: "preset、depth、light、shape、motion を1つの theme engine で調整します。",
    principleTitle: "1つの source、明確な境界",
    source: "Source-owned",
    sourceBody: "導入したファイルはアプリケーションコードになります。runtime wrapper はありません。",
    state: "Interaction-first",
    stateBody: "Base UI と実績あるライブラリが keyboard・focus・state model を所有します。",
    verify: "Verified",
    verifyBody: "Next/Vite の独立 install と Chromium/Firefox/WebKit interaction を CI で検証します。",
  },
  zh: {
    kicker: "SOURCE-OWNED REACT UI",
    title: "把新拟态做成界面系统，而不是视觉特效。",
    body: "将 Base UI 交互模型、shadcn 源码安装、Fumapress 文档和真实消费者验证整合在一个产品中。",
    components: "组件",
    items: "Registry items",
    locales: "语言",
    browsers: "浏览器引擎",
    explore: "产品界面",
    componentsBody: "以可编辑源码安装表单、浮层、导航和数据 UI。",
    templates: "模板",
    templatesBody: "从设置、CMS、博客、作品集和分析界面快速开始。",
    charts: "图表",
    chartsBody: "在精确数据表旁展示产品与运维指标。",
    theme: "Theme Studio",
    themeBody: "通过同一主题引擎调整 preset、depth、light、shape 和 motion。",
    principleTitle: "一个源码，清晰边界",
    source: "Source-owned",
    sourceBody: "安装后的文件就是应用代码，没有 runtime wrapper。",
    state: "Interaction-first",
    stateBody: "Base UI 与成熟库负责键盘、焦点和状态模型。",
    verify: "Verified",
    verifyBody: "CI 验证独立 Next/Vite 安装以及 Chromium/Firefox/WebKit 交互。",
  },
} as const;

export default function Home({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const locale = lang;
  const messages = getMessages(locale);
  const copy = landingCopy[locale];

  const paths = [
    {
      href: "/components",
      eyebrow: "01",
      title: copy.components,
      body: copy.componentsBody,
    },
    {
      href: "/templates",
      eyebrow: "02",
      title: copy.templates,
      body: copy.templatesBody,
    },
    {
      href: "/charts",
      eyebrow: "03",
      title: copy.charts,
      body: copy.chartsBody,
    },
    {
      href: "/customize",
      eyebrow: "04",
      title: copy.theme,
      body: copy.themeBody,
    },
  ] as const;

  return (
    <div className="docs-home-shell">
      <section className="home-hero">
        <div className="home-hero-copy">
          <span className="home-kicker">{copy.kicker}</span>
          <h1>{copy.title}</h1>
          <p>{copy.body}</p>

          <div className="docs-page-actions">
            <Link className="docs-primary-action" href={localeHref(locale, "/docs/installation")}>
              {messages.home.install}
            </Link>
            <Link className="docs-secondary-action" href={localeHref(locale, "/components")}>
              {messages.home.viewComponents}
            </Link>
          </div>

          <div className="home-stat-grid" aria-label="Project statistics">
            <div><strong>56</strong><span>{copy.components}</span></div>
            <div><strong>80</strong><span>{copy.items}</span></div>
            <div><strong>4</strong><span>{copy.locales}</span></div>
            <div><strong>3</strong><span>{copy.browsers}</span></div>
          </div>

          <div className="home-install-card">
            <span>Install one component</span>
            <InstallCommand name="button" label={messages.home.buttonInstallLabel} />
          </div>
        </div>

        <div className="home-preview-card">
          <div className="home-preview-bar">
            <span><i /> live preview</span>
            <span>Base UI · React 19</span>
          </div>
          <InteractivePreview />
        </div>
      </section>

      <section className="home-explore-section">
        <div className="home-section-heading">
          <span>EXPLORE</span>
          <h2>{copy.explore}</h2>
        </div>
        <div className="home-path-grid">
          {paths.map((item) => (
            <Link className="home-path-card" href={localeHref(locale, item.href)} key={item.href}>
              <span className="home-path-index">{item.eyebrow}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-principles">
        <div className="home-section-heading">
          <span>CONTRACT</span>
          <h2>{copy.principleTitle}</h2>
        </div>
        <div className="home-principle-grid">
          {[
            [copy.source, copy.sourceBody],
            [copy.state, copy.stateBody],
            [copy.verify, copy.verifyBody],
          ].map(([title, body], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
