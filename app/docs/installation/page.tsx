import type { Metadata } from "next";
import Link from "next/link";
import { CopyableCode } from "@/components/docs/copyable-code";
import { InstallCommand } from "@/components/docs/install-command";
import {
  getComponentsJsonRegistry,
  getRegistryAddCommand,
  getRegistryUrlTemplate,
  REGISTRY_NAMESPACE,
} from "@/components/docs/registry-config";
import { getRequestOrigin } from "@/components/docs/request-origin";

export const metadata: Metadata = {
  title: "설치",
  description: "Neumorphism UI Registry를 shadcn 프로젝트에 설치하는 방법.",
};

const initCommand = "npx shadcn@latest init";

export default async function InstallationPage() {
  const requestOrigin = await getRequestOrigin();
  const registryUrlTemplate = getRegistryUrlTemplate(requestOrigin);

  return (
    <div className="docs-page site-shell">
      <aside className="docs-sidebar" aria-label="문서 목차">
        <span className="docs-sidebar-title">Getting started</span>
        <nav>
          <a className="is-current" href="#installation" aria-current="page">
            설치
          </a>
          <a href="#configure">Registry 설정</a>
          <a href="#component">컴포넌트 추가</a>
          <a href="#theme">테마</a>
        </nav>
        <div className="docs-sidebar-status">
          <span className="status-pulse" />
          Registry online
        </div>
      </aside>

      <article className="docs-article">
        <header className="docs-intro" id="installation">
          <span className="section-index">DOCS / GETTING STARTED</span>
          <h1>Installation</h1>
          <p>
            Neumorphism UI는 shadcn Registry 프로토콜을 사용합니다. 패키지에
            종속되지 않고, 선택한 컴포넌트의 소스와 디자인 토큰을 여러분의
            프로젝트로 가져옵니다.
          </p>
          <div className="docs-requirements">
            <span>React</span>
            <span>Tailwind CSS</span>
            <span>shadcn CLI</span>
          </div>
        </header>

        <section className="docs-step" aria-labelledby="step-one-title">
          <div className="step-marker">01</div>
          <div className="step-content">
            <span className="step-label">프로젝트 준비</span>
            <h2 id="step-one-title">shadcn을 초기화하세요.</h2>
            <p>
              이미 <code>components.json</code>이 있다면 이 단계는 건너뛰어도
              됩니다.
            </p>
            <CopyableCode code={initCommand} label="shadcn 초기화 명령" />
          </div>
        </section>

        <section className="docs-step" id="configure" aria-labelledby="step-two-title">
          <div className="step-marker">02</div>
          <div className="step-content">
            <span className="step-label">Registry 연결</span>
            <h2 id="step-two-title">namespace를 등록하세요.</h2>
            <p>
              공식 CLI로 namespace와 배포 URL을 프로젝트에 등록합니다.
            </p>
            <CopyableCode
              code={getRegistryAddCommand(requestOrigin)}
              label="Registry 등록 명령"
            />
            <h3 className="docs-inline-heading">수동 설정</h3>
            <p>
              CLI 대신 직접 설정하려면 <code>components.json</code>에 아래
              Registry 매핑을 추가하세요.
            </p>
            <CopyableCode
              code={getComponentsJsonRegistry(requestOrigin)}
              label="components.json Registry 설정"
              multiline
            />
            <div className="docs-callout">
              <span aria-hidden="true">i</span>
              <p>
                namespace는 <code>{REGISTRY_NAMESPACE}</code>, URL 템플릿은{" "}
                <code>{registryUrlTemplate}</code>입니다.
              </p>
            </div>
          </div>
        </section>

        <section className="docs-step" id="component" aria-labelledby="step-three-title">
          <div className="step-marker">03</div>
          <div className="step-content">
            <span className="step-label">컴포넌트 설치</span>
            <h2 id="step-three-title">첫 컴포넌트를 추가하세요.</h2>
            <p>
              CLI가 의존성과 토큰을 확인하고 Button 소스를 프로젝트에
              복사합니다.
            </p>
            <InstallCommand name="button" />
            <div className="after-install">
              <span className="after-install-check" aria-hidden="true">✓</span>
              <div>
                <strong>설치 후에는</strong>
                <p>
                  <code>@/components/ui/button</code>에서 평소의 shadcn
                  컴포넌트처럼 import할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="docs-step" id="theme" aria-labelledby="theme-title">
          <div className="step-marker">04</div>
          <div className="step-content">
            <span className="step-label">Theme</span>
            <h2 id="theme-title">빛의 방향은 토큰으로 유지됩니다.</h2>
            <p>
              설치된 base 토큰은 surface, raised, inset, focus 상태를 함께
              정의합니다. 우측 상단 테마 토글로 두 모드의 대비를 바로 확인할
              수 있습니다.
            </p>
            <div className="theme-token-grid">
              <div>
                <span className="token-swatch token-swatch-surface" />
                <code>--neu-surface</code>
                <small>Base surface</small>
              </div>
              <div>
                <span className="token-swatch token-swatch-shadow" />
                <code>--neu-shadow-raised</code>
                <small>Raised depth</small>
              </div>
              <div>
                <span className="token-swatch token-swatch-accent" />
                <code>--primary</code>
                <small>Focus &amp; action</small>
              </div>
            </div>
          </div>
        </section>

        <div className="docs-next">
          <span>다음</span>
          <Link href="/components">
            컴포넌트 둘러보기
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>
    </div>
  );
}
