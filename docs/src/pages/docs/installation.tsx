import { Link } from "fumapress/client";
import { notFound } from "fumapress/router";

import { CopyableCode } from "@/components/docs/copyable-code";
import { DocsToc } from "@/components/docs/docs-toc";
import { InstallCommand } from "@/components/docs/install-command";
import {
  getComponentsJsonRegistry,
  getInstallCommand,
  getRegistryAddCommand,
  getRegistryUrlTemplate,
  REGISTRY_NAMESPACE,
} from "@/components/docs/registry-config";
import { getRequestOrigin } from "@/components/docs/request-origin";
import { isLocale, localeHref } from "@/i18n/config";
import { formatMessage, getMessages } from "@/i18n/messages";

export default async function InstallationPage({ lang }: { lang: string }) {
  if (!isLocale(lang)) notFound();
  const locale = lang;
  const messages = getMessages(locale);
  const requestOrigin = await getRequestOrigin();
  const registryUrlTemplate = getRegistryUrlTemplate(requestOrigin);
  const tocItems = [
    { href: "#project", label: messages.installationPage.tocProject },
    { href: "#configure", label: messages.installationPage.tocConfigure },
    { href: "#component", label: messages.installationPage.tocComponent },
    { href: "#theme", label: messages.installationPage.tocTheme },
  ] as const;

  return (
    <div className="docs-content-layout">
      <article className="docs-content docs-article">
        <header className="docs-page-header">
          <h1>Installation</h1>
          <p>{messages.installationPage.intro}</p>
        </header>

        <section className="docs-content-section" id="project">
          <h2>{messages.installationPage.projectTitle}</h2>
          <p>{messages.installationPage.projectBody}</p>
          <CopyableCode
            code={initCommand}
            label={messages.installationPage.initLabel}
          />
        </section>

        <section className="docs-content-section" id="configure">
          <h2>{messages.installationPage.configureTitle}</h2>
          <p>{messages.installationPage.configureBody}</p>
          <CopyableCode
            code={getRegistryAddCommand(requestOrigin)}
            label={messages.installationPage.registryCommandLabel}
          />

          <details className="docs-disclosure">
            <summary>{messages.installationPage.manualSummary}</summary>
            <p>
              {formatMessage(messages.installationPage.manualBody, {
                namespace: REGISTRY_NAMESPACE,
                url: registryUrlTemplate,
              })}
            </p>
            <CopyableCode
              code={getComponentsJsonRegistry(requestOrigin)}
              label={messages.installationPage.configLabel}
              multiline
            />
          </details>
        </section>

        <section className="docs-content-section" id="component">
          <h2>{messages.installationPage.componentTitle}</h2>
          <p>{messages.installationPage.componentBody}</p>
          <InstallCommand name="neumorphism-ui" />
          <p>{{ ko: "기본 테마 설치 후 Next.js의 app/layout.tsx 또는 Vite의 src/main.tsx에서 폰트 CSS를 한 번 가져옵니다. 앱 번들러가 폰트 파일을 함께 제공합니다.", en: "After installing the base, import the font CSS once in app/layout.tsx (Next.js) or src/main.tsx (Vite). Your bundler serves the font assets with your application.", ja: "基本テーマの後、Next.jsのapp/layout.tsxまたはViteのsrc/main.tsxでフォントCSSを一度読み込みます。", zh: "安装基础主题后，在Next.js的app/layout.tsx或Vite的src/main.tsx中导入一次字体CSS。" }[locale]}</p>
          <CopyableCode code={'import "pretendard/dist/web/variable/pretendardvariable.css";'} label="Pretendard" />
          <CopyableCode code={`${getInstallCommand("button")} --overwrite`} label={messages.installationPage.installLabel} />
          <p className="docs-section-note">
            {messages.installationPage.componentNote}
          </p>
        </section>

        <section className="docs-content-section" id="theme">
          <h2>{messages.installationPage.themeTitle}</h2>
          <p>{messages.installationPage.themeBody}</p>
          <h3>Dry run</h3>
          <CopyableCode
            code={styleDryRunCommand}
            label={messages.installationPage.dryRunLabel}
          />
          <h3>Install</h3>
          <CopyableCode
            code={styleInstallCommand}
            label={messages.installationPage.installLabel}
          />
          <p className="docs-section-note">
            {messages.installationPage.themeNotePrefix}{" "}
            <Link href={localeHref(locale, "/customize")}>Theme Studio</Link>
            {messages.installationPage.themeNoteSuffix}
          </p>
        </section>

        <nav
          className="docs-next"
          aria-label={messages.installationPage.nextDocument}
        >
          <Link href={localeHref(locale, "/components")}>
            <span>{messages.common.next}</span>
            <strong>
              Components <span aria-hidden="true">→</span>
            </strong>
          </Link>
        </nav>
      </article>

      <DocsToc items={tocItems} />
    </div>
  );
}
