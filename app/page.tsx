import type { Metadata } from "next";
import Link from "next/link";
import { InstallCommand } from "@/components/docs/install-command";
import { InteractivePreview } from "@/components/docs/interactive-preview";
import { Button } from "@/registry/src/components/ui/button";
import { Card } from "@/registry/src/components/ui/card";
import { Input } from "@/registry/src/components/ui/input";

export const metadata: Metadata = {
  description:
    "표면, 깊이, 상태를 한 번에 설치하는 shadcn 뉴모피즘 UI Registry.",
};

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="site-shell hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-pulse" />
              shadcn Registry · Source-first
            </div>
            <h1>
              표면에서 시작하는
              <span>인터페이스.</span>
            </h1>
            <p className="hero-description">
              빛과 그림자로 만든 깊이를 컴포넌트 단위로 설치하세요.
              Neumorphism UI는 shadcn의 조합성 위에 촉감 있는 상태와 접근성을
              더합니다.
            </p>
            <div className="hero-actions">
              <Link className="neu-button neu-button-primary" href="/docs/installation">
                설치 시작하기 <span aria-hidden="true">→</span>
              </Link>
              <Link className="neu-button neu-button-quiet" href="/components">
                컴포넌트 보기
              </Link>
            </div>
            <InstallCommand name="button" label="Button 설치 명령" />
            <ul className="hero-proof" aria-label="주요 특징">
              <li>
                <span aria-hidden="true">✓</span> 26개 컴포넌트
              </li>
              <li>
                <span aria-hidden="true">✓</span> Light &amp; Dark
              </li>
              <li>
                <span aria-hidden="true">✓</span> shadcn CLI
              </li>
            </ul>
          </div>

          <div className="hero-preview-wrap">
            <div className="depth-orbit depth-orbit-one" />
            <div className="depth-orbit depth-orbit-two" />
            <div className="hero-preview-label">
              <span>01</span>
              Surface / interaction
            </div>
            <InteractivePreview />
          </div>
        </div>
      </section>

      <section className="principles-section" aria-labelledby="principles-title">
        <div className="site-shell">
          <div className="section-heading">
            <div>
              <span className="section-index">01 · SYSTEM</span>
              <h2 id="principles-title">그림자가 아니라, 상태 시스템.</h2>
            </div>
            <p>
              모든 표면은 같은 광원 규칙을 공유합니다. 그래서 컴포넌트를
              조합해도 깊이와 상호작용이 흔들리지 않습니다.
            </p>
          </div>

          <div className="principles-grid">
            <article className="principle-card">
              <div className="principle-demo principle-demo-raised">
                <span>Raised</span>
              </div>
              <span className="principle-number">01</span>
              <h3>Surface</h3>
              <p>배경과 같은 색 위에 두 방향의 빛을 더해 자연스러운 층을 만듭니다.</p>
            </article>
            <article className="principle-card">
              <div className="principle-demo principle-demo-inset">
                <span>Inset</span>
              </div>
              <span className="principle-number">02</span>
              <h3>Depth</h3>
              <p>입력과 선택 상태는 안으로 눌린 표면으로 명확하게 구분합니다.</p>
            </article>
            <article className="principle-card">
              <div className="principle-demo principle-demo-accent">
                <span>Action</span>
              </div>
              <span className="principle-number">03</span>
              <h3>State</h3>
              <p>포커스와 활성 상태는 대비와 블루 포인트를 함께 사용합니다.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="component-strip" aria-labelledby="component-title">
        <div className="site-shell">
          <div className="section-heading section-heading-compact">
            <div>
              <span className="section-index">02 · COMPONENTS</span>
              <h2 id="component-title">작게 설치하고, 자유롭게 조합하세요.</h2>
            </div>
            <Link className="text-link" href="/components">
              전체 26개 컴포넌트 <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="home-component-stage">
            <div className="stage-column">
              <span className="stage-label">BUTTON</span>
              <div className="stage-preview stage-preview-buttons">
                <Button variant="primary">
                  Continue
                </Button>
                <Button variant="soft">
                  Secondary
                </Button>
                <Button size="icon" aria-label="추가">
                  +
                </Button>
              </div>
            </div>
            <div className="stage-column">
              <span className="stage-label">INPUT</span>
              <div className="stage-preview">
                <label className="demo-input">
                  <span>Workspace name</span>
                  <Input defaultValue="new-project" />
                </label>
              </div>
            </div>
            <div className="stage-column">
              <span className="stage-label">CARD</span>
              <div className="stage-preview">
                <Card className="mini-plan-card">
                  <span>Starter</span>
                  <strong>$0</strong>
                  <small>For side projects</small>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="closing-section">
        <div className="site-shell closing-card">
          <span className="section-index">READY TO BUILD?</span>
          <h2>첫 표면을 프로젝트에 추가하세요.</h2>
          <p>설정 한 줄, CLI 명령 한 번이면 시작할 수 있습니다.</p>
          <Link className="neu-button neu-button-primary" href="/docs/installation">
            3분 안에 설치하기 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
