import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";

import { DocsToc } from "@/components/docs/docs-toc";
import { PageMetadata } from "@/components/docs/page-metadata";
import { isLocale, localeHref } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

const copy = {
  ko: {
    intro: "부드러운 표면과 명확한 상호작용 상태로 일관된 React 인터페이스를 만드세요.",
    overview: "Neumorphism UI는 빛과 그림자로 깊이를 표현하는 React 컴포넌트 모음입니다. shadcn CLI로 필요한 소스를 프로젝트에 설치하고 직접 수정할 수 있습니다.",
    start: "여기서 시작하세요",
    steps: ["설치 안내에 따라 공통 스타일과 Button을 추가합니다.", "앱에서 첫 버튼이 올바르게 표시되는지 확인합니다.", "컴포넌트 목록에서 필요한 요소를 골라 추가합니다."],
    startNote: "첫 컴포넌트를 사용하기 전에 디자인 토큰이나 Registry 내부 구조를 모두 이해할 필요는 없습니다.",
    screen: "완성된 화면 살펴보기",
    screenBody: "로컬 CMS에서 초안을 선택하고 제목과 본문을 편집한 뒤 미리보기와 저장을 사용해 보세요. 선택·입력·피드백이 한 화면에서 어떻게 연결되는지 확인할 수 있습니다.",
    screenLink: "CMS 예제 열기",
    screenNote: "데모의 변경 사항은 메모리에만 남고 새로고침하면 초기화됩니다. 실제 서비스에서는 initialPosts와 onSave에 데이터를 연결하고 인증·저장·게시 권한을 처리하세요.",
    rules: "인터페이스 구성 원칙",
    principles: [
      { title: "깊이에는 역할이 있어야 합니다", body: "돌출된 표면은 누를 수 있는 동작을, 안으로 들어간 표면은 입력이나 눌림 상태를 표현합니다. 모든 중첩 영역에 그림자를 추가하기보다 관련 내용을 한 표면으로 묶으세요." },
      { title: "선택 상태를 계속 보여 주세요", body: "선택한 탭이나 필터는 포인터가 떠나도 구분되어야 합니다. 색상과 형태로 선택을 표시하고, 키보드 포커스는 별도로 유지하세요." },
      { title: "빛과 형태를 일관되게 유지하세요", body: "같은 화면에서 광원 방향과 표면 반경을 공유하세요. Theme Studio에서 색상·깊이·광원·모양을 함께 조절할 수 있습니다." },
      { title: "입력과 피드백을 명확하게 만드세요", body: "필드의 레이블을 유지하고 오류를 해당 입력 가까이에 표시하세요. 저장 상태를 설명하고, 애니메이션을 줄여도 선택·포커스·오류가 보이도록 구성하세요." },
    ],
    includes: "제공하는 것",
    features: ["필요에 따라 Base UI의 키보드·포커스 동작을 사용하는 React 19 컴포넌트", "라이트·다크 색상, 깊이, 광원, 형태를 관리하는 Tailwind CSS v4 토큰", "앱에 직접 설치하고 수정하는 컴포넌트 소스", "실용적인 조합을 보여 주는 차트와 화면 템플릿"],
    installation: "설치와 커스터마이징",
    installationBody: "shadcn CLI는 선택한 소스와 필요한 패키지를 프로젝트에 추가합니다. 설치된 파일은 앱 코드이며 자동으로 업데이트되지 않습니다. 이후 변경을 적용할 때는 직접 수정한 부분을 비교하세요.",
    referenceBody: "설치가 끝나면 디자인 토큰으로 화면을 조정할 수 있습니다. Registry 구성과 검증 범위는 필요할 때 참고하세요.",
    customize: "디자인 토큰", registry: "설치 동작 이해하기", verification: "검증과 릴리스",
  },
  en: {
    intro: "Build consistent React interfaces with soft surfaces and clear interaction states.",
    overview: "Neumorphism UI is a collection of React components that use light and shadow to express depth. Install the source into your project with the shadcn CLI, then read and edit everything you use.",
    start: "Start here",
    steps: ["Follow Installation to add the shared styles and one Button.", "Confirm that the first button renders correctly in your app.", "Browse the component directory and add only the pieces you need."],
    startNote: "You can use your first component before learning the design tokens or registry internals.",
    screen: "Try a complete screen",
    screenBody: "Open the local CMS, select a draft, edit its title and content, then try previewing and saving. See how selection, input and feedback work together across a complete screen.",
    screenLink: "Open the CMS example",
    screenNote: "Demo changes stay in memory and reset on reload. In your application, connect initialPosts and onSave to your data and handle authentication, persistence and publishing authorization.",
    rules: "Interaction rules",
    principles: [
      { title: "Give depth a purpose", body: "Raised surfaces suggest actions; inset surfaces suggest inputs or pressed states. Group related content on one surface rather than adding shadows to every nested container." },
      { title: "Keep selection visible", body: "A selected tab or filter stays distinct after the pointer leaves. Use color and shape for persistent selection, and retain a separate keyboard focus treatment." },
      { title: "Use consistent light and shape", body: "Share one light direction and surface radius across a screen. Adjust color, depth, light and shape together in Theme Studio to keep components consistent." },
      { title: "Keep input and feedback clear", body: "Keep field labels visible and explain errors near their inputs. Describe saving states, and retain selection, focus and errors when motion is reduced." },
    ],
    includes: "What you get",
    features: ["React 19 components with keyboard and focus behavior from Base UI where needed", "Tailwind CSS v4 tokens for light and dark colors, depth, light direction and shape", "Editable component source installed directly in your application", "Charts and screen templates that demonstrate useful compositions"],
    installation: "Installation and customization",
    installationBody: "The shadcn CLI adds the selected source and required packages to your project. Installed files are application code and do not update automatically. Compare your customizations before applying future changes.",
    referenceBody: "After setup, adjust the design tokens to suit your screen. Use the registry and verification references when you need those details.",
    customize: "Design tokens", registry: "How installation works", verification: "Verification & release",
  },
  ja: {
    intro: "柔らかな表面と明確な操作状態で、一貫した React インターフェイスを作れます。",
    overview: "Neumorphism UI は光と影で奥行きを表現する React コンポーネント集です。shadcn CLI で必要なソースをプロジェクトに導入し、自由に確認・編集できます。",
    start: "ここから始める",
    steps: ["インストールガイドに従い、共有スタイルと Button を追加します。", "アプリで最初のボタンが正しく表示されることを確認します。", "一覧から必要なコンポーネントだけを追加します。"],
    startNote: "最初のコンポーネントを使う前に、デザイントークンや Registry の内部構造をすべて理解する必要はありません。",
    screen: "完成した画面を試す",
    screenBody: "ローカル CMS で下書きを選び、タイトルと本文を編集してからプレビューと保存を試してください。選択・入力・フィードバックの連携を確認できます。",
    screenLink: "CMS の例を開く",
    screenNote: "デモの変更はメモリ内に残り、再読み込みでリセットされます。実際のアプリでは initialPosts と onSave にデータを接続し、認証・保存・公開権限を処理してください。",
    rules: "画面構成の原則",
    principles: [
      { title: "奥行きに役割を持たせる", body: "浮き上がった表面は操作を、くぼんだ表面は入力や押下状態を表します。入れ子の領域ごとに影を追加するより、関連する内容を一つの表面にまとめてください。" },
      { title: "選択状態を見せ続ける", body: "選択したタブやフィルターはポインターが離れても区別できるようにします。色や形で選択を示し、キーボードフォーカスは別に表示してください。" },
      { title: "光と形を統一する", body: "画面内で光の方向と表面の半径を共有してください。Theme Studio で色・深さ・光源・形を一緒に調整できます。" },
      { title: "入力とフィードバックを明確にする", body: "ラベルを表示し、エラーは対応する入力の近くで説明してください。保存状態を伝え、動きを減らした場合も選択・フォーカス・エラーを残してください。" },
    ],
    includes: "含まれるもの",
    features: ["必要に応じて Base UI のキーボード・フォーカス操作を使う React 19 コンポーネント", "ライト・ダークの色、奥行き、光源、形を管理する Tailwind CSS v4 トークン", "アプリに直接導入して編集できるコンポーネントソース", "実用的な組み合わせを示すチャートと画面テンプレート"],
    installation: "インストールとカスタマイズ",
    installationBody: "shadcn CLI は選んだソースと必要なパッケージをプロジェクトに追加します。導入したファイルはアプリのコードとなり、自動更新されません。更新時は独自の変更と比較してください。",
    referenceBody: "導入後はデザイントークンで画面を調整できます。Registry の構成や検証範囲は必要に応じて参照してください。",
    customize: "デザイントークン", registry: "インストールの仕組み", verification: "検証とリリース",
  },
  zh: {
    intro: "通过柔和的表面和清晰的交互状态，构建一致的 React 界面。",
    overview: "Neumorphism UI 是一组通过光影表达深度的 React 组件。使用 shadcn CLI 将所需源码安装到项目中，然后直接查看和修改。",
    start: "从这里开始",
    steps: ["按照安装指南添加共享样式和一个 Button。", "确认第一个按钮在应用中正确显示。", "浏览组件目录，只添加需要的组件。"],
    startNote: "开始使用组件之前，无需先掌握所有设计令牌或 Registry 内部结构。",
    screen: "试用完整界面",
    screenBody: "打开本地 CMS，选择草稿，修改标题和正文，再尝试预览与保存。查看选择、输入和反馈如何在同一界面协作。",
    screenLink: "打开 CMS 示例",
    screenNote: "演示更改仅保存在内存中，刷新后重置。在应用中，将 initialPosts 和 onSave 连接到数据，并处理认证、持久化和发布权限。",
    rules: "界面构建原则",
    principles: [
      { title: "让深度承担明确作用", body: "凸起的表面表示操作；内凹的表面表示输入或按下状态。将相关内容放在同一表面上，避免为每层容器添加阴影。" },
      { title: "持续显示选中状态", body: "选中的标签页或筛选项在指针离开后仍应清晰可辨。用颜色和形状表达选择，并保留独立的键盘焦点指示。" },
      { title: "统一光源与形状", body: "同一界面应共享光源方向和表面圆角。使用 Theme Studio 一起调整颜色、深度、光源和形状，保持组件一致。" },
      { title: "保持输入与反馈清晰", body: "保持字段标签可见，在对应输入附近解释错误。说明保存状态；减少动画时，也应保留选择、焦点和错误反馈。" },
    ],
    includes: "包含的内容",
    features: ["根据需要使用 Base UI 键盘与焦点行为的 React 19 组件", "管理明暗颜色、深度、光源方向和形状的 Tailwind CSS v4 令牌", "直接安装到应用中、可编辑的组件源码", "展示实用组合的图表和界面模板"],
    installation: "安装与定制",
    installationBody: "shadcn CLI 将所选源码与必要依赖添加到项目。安装后的文件属于应用代码，不会自动更新。之后应用更新前，请比较已有定制。",
    referenceBody: "完成安装后，使用设计令牌调整界面。需要时再查看 Registry 结构和验证范围。",
    customize: "设计令牌", registry: "了解安装机制", verification: "验证与发布",
  },
} as const;

export default function DocsIndexPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const locale = lang;
  const messages = getMessages(locale);
  const t = copy[locale];
  const toc = [
    { href: "#start", label: t.start },
    { href: "#screen", label: t.screen },
    { href: "#interaction", label: t.rules },
    { href: "#included", label: t.includes },
    { href: "#installation", label: t.installation },
  ];

  return (
    <div className="docs-content-layout docs-reference-layout">
      <PageMetadata locale={locale} title={messages.navigation.introduction} description={t.intro} />
      <article className="docs-content docs-article docs-guide-article">
        <header className="docs-page-header">
          <h1>{messages.navigation.introduction}</h1>
          <p>{t.intro}</p>
          <p>{t.overview}</p>
        </header>

        <section className="docs-content-section" id="start">
          <h2>{t.start}</h2>
          <ol>{t.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          <p>{t.startNote}</p>
          <div className="docs-link-list">
            <Link href={localeHref(locale, "/docs/installation")}><strong>{messages.navigation.installation}</strong><span aria-hidden="true">→</span></Link>
            <Link href={localeHref(locale, "/components")}><strong>{messages.navigation.components}</strong><span aria-hidden="true">→</span></Link>
          </div>
        </section>

        <section className="docs-content-section" id="screen">
          <h2>{t.screen}</h2>
          <p>{t.screenBody}</p>
          <p><Link href={localeHref(locale, "/templates/cms")}>{t.screenLink}</Link></p>
          <p className="docs-section-note">{t.screenNote}</p>
        </section>

        <section className="docs-content-section" id="interaction">
          <h2>{t.rules}</h2>
          {t.principles.map((principle) => (
            <div key={principle.title}>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </div>
          ))}
        </section>

        <section className="docs-content-section" id="included">
          <h2>{t.includes}</h2>
          <ul>{t.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
        </section>

        <section className="docs-content-section" id="installation">
          <h2>{t.installation}</h2>
          <p>{t.installationBody}</p>
          <p>{t.referenceBody}</p>
          <div className="docs-link-list">
            <Link href={localeHref(locale, "/docs/design-tokens")}><strong>{t.customize}</strong><span aria-hidden="true">→</span></Link>
            <Link href={localeHref(locale, "/docs/registry")}><strong>{t.registry}</strong><span aria-hidden="true">→</span></Link>
            <Link href={localeHref(locale, "/docs/verification")}><strong>{t.verification}</strong><span aria-hidden="true">→</span></Link>
          </div>
        </section>
      </article>
      <DocsToc items={toc} />
    </div>
  );
}
