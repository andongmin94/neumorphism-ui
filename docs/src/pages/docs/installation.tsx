import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";

import { CopyableCode } from "@/components/docs/copyable-code";
import { DocsToc } from "@/components/docs/docs-toc";
import { InstallCommand } from "@/components/docs/install-command";
import { PageMetadata } from "@/components/docs/page-metadata";
import {
  getComponentsJsonRegistry,
  getInstallCommand,
  getRegistryAddCommand,
} from "@/components/docs/registry-config";
import { getRequestOrigin } from "@/components/docs/request-origin";
import { isLocale, localeHref } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

const copy = {
  ko: {
    intro: "공통 스타일을 설치하고 앱에서 첫 Neumorphism UI 버튼을 확인하세요.",
    project: "준비 사항",
    projectBody: "React 19와 Tailwind CSS v4를 사용하는 프로젝트가 필요합니다. 컴포넌트는 Next.js와 Vite에서 사용할 수 있습니다. 아직 shadcn을 설정하지 않았다면 프로젝트 폴더에서 실행하세요.",
    projectNote: "CLI에서 컴포넌트 라이브러리를 묻는 경우 Base UI를 선택하세요.",
    setup: "빠른 설치",
    registryBody: "먼저 Registry를 한 번 등록합니다. 이후 컴포넌트와 그 구성 요소를 짧은 이름으로 설치할 수 있습니다.",
    manual: "components.json을 직접 설정하는 경우",
    manualBody: "아래 registries 항목을 기존 components.json에 병합하세요. 기존 별칭과 설정은 유지하세요.",
    setupBody: "공통 스타일은 한 번 설치한 뒤, 필요한 컴포넌트를 추가합니다. 공통 스타일에는 라이트·다크 색상, 그림자, 반경과 유틸리티가 들어 있습니다.",
    font: "Next.js의 app/layout.tsx 또는 src/app/layout.tsx, Vite의 src/main.tsx에서 폰트 CSS를 한 번 가져오세요. 앱 번들러가 폰트 파일을 함께 제공합니다.",
    replacement: "shadcn init이 만든 Button이 이미 있다면 CLI의 변경 내용을 확인하고 기본 파일만 교체하세요. 직접 수정한 Button이나 전역 CSS를 무조건 덮어쓰지 마세요. 아래 ‘기존 프로젝트’에서 먼저 변경 사항을 확인할 수 있습니다.",
    check: "첫 버튼 확인",
    checkBody: "페이지에서 설치한 Button을 렌더링하세요.",
    button: "시작하기",
    checkNote: "부드러운 표면과 그림자, 파란 강조색이 있는 버튼이 표시되면 설정이 완료된 것입니다. 기본 shadcn 버튼이 남아 있다면 components/ui/button.tsx가 설치한 소스인지 확인하세요.",
    existing: "기존 프로젝트",
    existingBody: "공통 스타일은 프로젝트 전체에 적용됩니다. 현재 작업을 커밋하고 설치 전에 변경 내용을 확인하세요. 전역 CSS, components.json, 의존성과 유틸리티를 특히 살펴보세요.",
    more: "컴포넌트 추가",
    moreBody: "각 컴포넌트 페이지의 설치 명령을 사용하세요. CLI가 필요한 패키지와 구성 요소를 함께 설치합니다. 이미 수정한 파일이 있다면 제안된 변경 내용을 비교하세요.",
    theme: "테마 선택",
    themeBody: "기본 Air 테마에는 라이트·다크 색상과 파란색 강조색이 포함됩니다. 다른 팔레트가 필요하면 원하는 테마 하나를 설치하세요. 먼저 dry run으로 변경 내용을 확인할 수 있습니다.",
    themeNote: "라이트·다크 토큰이 함께 제공되며 앱의 .dark 클래스로 모드를 선택합니다. Theme Studio에서 색상·깊이·광원·형태를 조절하고 CSS를 복사할 수도 있습니다.",
    updates: "수동 설치와 업데이트",
    updatesBody: "컴포넌트 페이지의 ‘컴포넌트 소스’ 탭에서 파일과 필요한 패키지를 확인할 수 있습니다. 설치한 파일은 앱에 속하며 자동 업데이트되지 않습니다. 업데이트 전에 dry run으로 직접 수정한 코드와 비교하세요.",
    next: "컴포넌트 살펴보기",
  },
  en: {
    intro: "Install the shared styles and confirm your first Neumorphism UI button in your app.",
    project: "Requirements",
    projectBody: "You need a React 19 project with Tailwind CSS v4. Components work with Next.js and Vite. Run this from your project folder if shadcn is not initialized yet.",
    projectNote: "Choose Base UI if the CLI asks which component library to use.",
    setup: "Fastest setup",
    registryBody: "Register the registry once so the CLI can resolve components and their supporting files using short names.",
    manual: "Configure components.json manually",
    manualBody: "Merge the registries entry below into your existing components.json. Keep your current aliases and other settings.",
    setupBody: "Install the shared styles once, then add your first component. The base provides light and dark colors, shadows, radii and utilities.",
    font: "Import the font CSS once in app/layout.tsx or src/app/layout.tsx (Next.js), or src/main.tsx (Vite). Your bundler serves the font files with your application.",
    replacement: "If shadcn init created a Button, review the CLI changes and replace only that default file. Do not blindly overwrite a customized Button or global CSS. Use the existing-project review below to inspect changes first.",
    check: "Check that it works",
    checkBody: "Render the installed Button in one of your pages.",
    button: "Get started",
    checkNote: "A soft button with a shadow and blue accent means setup worked. If the default shadcn button remains, check that components/ui/button.tsx contains the installed source.",
    existing: "Existing projects",
    existingBody: "The shared styles affect the whole project. Commit your current work and inspect the changes before installation. Pay particular attention to global CSS, components.json, dependencies and utilities.",
    more: "Add more components",
    moreBody: "Use the install command on each component page. The CLI installs required packages and supporting components automatically. Compare proposed changes when you already have customized files.",
    theme: "Choose a theme",
    themeBody: "The default Air theme includes light and dark surfaces with a blue accent. Install one named theme if you want another palette. Inspect changes with a dry run first.",
    themeNote: "Both light and dark tokens are included; your application's .dark class selects the mode. You can also adjust color, depth, light and shape in Theme Studio and copy the CSS.",
    updates: "Manual installation and updates",
    updatesBody: "The Component source tab on each component page shows the files and required packages. Installed files belong to your application and do not update automatically. Run a dry run and compare your customizations before updating.",
    next: "Browse components",
  },
  ja: {
    intro: "共有スタイルを導入し、アプリで最初の Neumorphism UI ボタンを確認します。",
    project: "必要な環境",
    projectBody: "React 19 と Tailwind CSS v4 のプロジェクトが必要です。コンポーネントは Next.js と Vite で使えます。shadcn をまだ設定していない場合はプロジェクトフォルダーで実行してください。",
    projectNote: "CLI がコンポーネントライブラリを尋ねた場合は Base UI を選んでください。",
    setup: "最短のセットアップ",
    registryBody: "最初に Registry を一度登録します。コンポーネントとその依存ファイルを短い名前で導入できるようになります。",
    manual: "components.json を手動で設定する場合",
    manualBody: "以下の registries 項目を既存の components.json に追加してください。現在のエイリアスや他の設定は残してください。",
    setupBody: "共有スタイルを一度導入し、最初のコンポーネントを追加します。基盤にはライト・ダークの色、影、半径、ユーティリティが含まれます。",
    font: "Next.js の app/layout.tsx または src/app/layout.tsx、Vite の src/main.tsx でフォント CSS を一度読み込みます。フォントファイルはアプリのバンドラーから配信されます。",
    replacement: "shadcn init が Button を作成済みの場合は CLI の変更を確認し、その初期ファイルだけを置き換えてください。独自の Button やグローバル CSS を一括上書きせず、以下の既存プロジェクト向け手順で差分を確認してください。",
    check: "最初のボタンを確認する",
    checkBody: "ページで導入した Button を表示してください。",
    button: "はじめる",
    checkNote: "柔らかな表面と影、青いアクセントのあるボタンが表示されれば完了です。shadcn の初期ボタンが残る場合は components/ui/button.tsx が導入したソースか確認してください。",
    existing: "既存プロジェクト",
    existingBody: "共有スタイルはプロジェクト全体に適用されます。現在の作業をコミットし、導入前に差分を確認してください。グローバル CSS、components.json、依存関係、ユーティリティを特に確認してください。",
    more: "コンポーネントを追加する",
    moreBody: "各コンポーネントページの導入コマンドを使ってください。CLI が必要なパッケージと依存コンポーネントを追加します。変更済みのファイルがある場合は差分を比較してください。",
    theme: "テーマを選ぶ",
    themeBody: "初期の Air テーマにはライト・ダークの表面と青いアクセントが含まれます。別のパレットが必要なら一つのテーマを導入してください。先に dry run で差分を確認できます。",
    themeNote: "ライト・ダークのトークンを含み、アプリの .dark クラスでモードを選択します。Theme Studio で色・深さ・光源・形を調整し、CSS をコピーすることもできます。",
    updates: "手動インストールと更新",
    updatesBody: "各コンポーネントページの「コンポーネントソース」タブでファイルと必要なパッケージを確認できます。導入したファイルはアプリのコードであり、自動更新されません。更新前に dry run で独自の変更と比較してください。",
    next: "コンポーネントを見る",
  },
  zh: {
    intro: "安装共享样式，并在应用中确认第一个 Neumorphism UI 按钮。",
    project: "环境要求",
    projectBody: "需要 React 19 与 Tailwind CSS v4 项目。组件支持 Next.js 和 Vite。如果尚未初始化 shadcn，请在项目目录中运行。",
    projectNote: "如果 CLI 询问组件库，请选择 Base UI。",
    setup: "快速安装",
    registryBody: "先注册一次 Registry，以便 CLI 通过短名称解析组件及其依赖文件。",
    manual: "手动配置 components.json",
    manualBody: "将以下 registries 项合并到已有的 components.json，保留当前别名及其他设置。",
    setupBody: "安装一次共享样式，再添加第一个组件。基础样式包含明暗颜色、阴影、圆角和工具函数。",
    font: "在 Next.js 的 app/layout.tsx 或 src/app/layout.tsx，或 Vite 的 src/main.tsx 中导入一次字体 CSS。应用打包工具会同时提供字体文件。",
    replacement: "如果 shadcn init 已创建 Button，请检查 CLI 的更改，只替换该初始文件。不要直接覆盖定制过的 Button 或全局 CSS。可先按下方现有项目的步骤查看差异。",
    check: "确认第一个按钮",
    checkBody: "在页面中渲染已安装的 Button。",
    button: "开始使用",
    checkNote: "看到带柔和表面、阴影和蓝色强调色的按钮，表示安装成功。如果仍显示 shadcn 默认按钮，请确认 components/ui/button.tsx 使用了安装的源码。",
    existing: "现有项目",
    existingBody: "共享样式会影响整个项目。先提交当前工作，再在安装前检查变化。重点查看全局 CSS、components.json、依赖项和工具函数。",
    more: "添加更多组件",
    moreBody: "使用各组件页面的安装命令。CLI 会自动安装所需包和依赖组件。已有定制文件时，请比较提议的更改。",
    theme: "选择主题",
    themeBody: "默认 Air 主题包含明暗表面和蓝色强调色。如需其他配色，请安装一个主题。可先通过 dry run 查看变化。",
    themeNote: "同时包含明暗令牌，由应用的 .dark 类选择模式。也可以在 Theme Studio 调整颜色、深度、光源和形状，再复制 CSS。",
    updates: "手动安装与更新",
    updatesBody: "在各组件页面的“组件源码”标签页查看文件和依赖包。安装的文件属于应用，不会自动更新。更新前使用 dry run，与已有定制进行比较。",
    next: "浏览组件",
  },
} as const;

export default async function InstallationPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const locale = lang;
  const messages = getMessages(locale);
  const t = copy[locale];
  const requestOrigin = await getRequestOrigin();
  const tocItems = [
    { href: "#project", label: t.project },
    { href: "#component", label: t.setup },
    { href: "#usage", label: t.check },
    { href: "#existing", label: t.existing },
    { href: "#more", label: t.more },
    { href: "#theme", label: t.theme },
    { href: "#updates", label: t.updates },
  ];
  const exampleCode = 'import { Button } from "@/components/ui/button";\n\nexport default function Example() {\n  return <Button variant="primary">' + t.button + '</Button>;\n}';

  return (
    <div className="docs-content-layout docs-reference-layout">
      <PageMetadata locale={locale} title={messages.navigation.installation} description={t.intro} />
      <article className="docs-content docs-article docs-guide-article">
        <header className="docs-page-header">
          <h1>{messages.navigation.installation}</h1>
          <p>{t.intro}</p>
        </header>

        <section className="docs-content-section" id="project">
          <h2>{t.project}</h2>
          <p>{t.projectBody}</p>
          <CopyableCode lang="bash" code="npx shadcn@latest init" label={messages.installationPage.initLabel} />
          <p>{t.projectNote}</p>
        </section>

        <section className="docs-content-section" id="component">
          <h2>{t.setup}</h2>
          <p>{t.registryBody}</p>
          <CopyableCode lang="bash" code={getRegistryAddCommand(requestOrigin)} label={messages.installationPage.registryCommandLabel} />
          <p>{t.setupBody}</p>
          <InstallCommand locale={locale} name="neumorphism-ui" />
          <p>{t.font}</p>
          <CopyableCode lang="tsx" code={'import "pretendard/dist/web/variable/pretendardvariable.css";'} label="Pretendard" />
          <InstallCommand locale={locale} name="button" />
          <p className="docs-section-note">{t.replacement}</p>
          <details className="docs-disclosure" id="configure">
            <summary>{t.manual}</summary>
            <p>{t.manualBody}</p>
            <CopyableCode lang="json" code={getComponentsJsonRegistry(requestOrigin)} label={messages.installationPage.configLabel} multiline />
          </details>
        </section>

        <section className="docs-content-section" id="usage">
          <h2>{t.check}</h2>
          <p>{t.checkBody}</p>
          <CopyableCode lang="tsx" code={exampleCode} label={messages.common.usage} multiline />
          <p>{t.checkNote}</p>
          <p><Link href={localeHref(locale, "/components")}>{t.next} →</Link></p>
        </section>

        <section className="docs-content-section" id="existing">
          <h2>{t.existing}</h2>
          <p>{t.existingBody}</p>
          <CopyableCode lang="bash" code="npx shadcn@latest view @neumorphism-ui/neumorphism-ui" label={`Registry: ${messages.common.preview}`} />
          <CopyableCode lang="bash" code={getInstallCommand("neumorphism-ui") + " --dry-run"} label={`${t.existing}: --dry-run`} />
        </section>

        <section className="docs-content-section" id="more">
          <h2>{t.more}</h2>
          <p>{t.moreBody}</p>
          <CopyableCode lang="bash" code={getInstallCommand("dialog") + "\n" + getInstallCommand("card")} label={t.more} multiline />
        </section>

        <section className="docs-content-section" id="theme">
          <h2>{t.theme}</h2>
          <p>{t.themeBody}</p>
          <CopyableCode lang="bash" code={getInstallCommand("style-sage") + " --dry-run"} label={messages.installationPage.dryRunLabel} />
          <CopyableCode lang="bash" code={getInstallCommand("style-sage")} label={messages.installationPage.installLabel} />
          <p>{t.themeNote}</p>
          <p><Link href={localeHref(locale, "/customize")}>{messages.navigation.themeStudio} →</Link></p>
        </section>

        <section className="docs-content-section" id="updates">
          <h2>{t.updates}</h2>
          <p>{t.updatesBody}</p>
          <CopyableCode lang="bash" code={getInstallCommand("button") + " --dry-run"} label={`${t.updates}: --dry-run`} />
        </section>

        <nav className="docs-next" aria-label={messages.installationPage.nextDocument}>
          <Link href={localeHref(locale, "/components")}>
            <span>{messages.common.next}</span>
            <strong>{messages.navigation.components} <span aria-hidden="true">→</span></strong>
          </Link>
        </nav>
      </article>
      <DocsToc items={tocItems} />
    </div>
  );
}
