import type { Metadata } from "next";
import Link from "next/link";
import { InstallCommand } from "@/components/docs/install-command";
import { Badge } from "@/registry/src/components/ui/badge";
import { Button } from "@/registry/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/src/components/ui/card";
import { Input } from "@/registry/src/components/ui/input";
import { Skeleton } from "@/registry/src/components/ui/skeleton";
import { Tooltip } from "@/registry/src/components/ui/tooltip";

export const metadata: Metadata = {
  title: "컴포넌트",
  description:
    "Neumorphism UI의 Button, Card, Input 컴포넌트를 확인하고 설치하세요.",
};

export default function ComponentsPage() {
  return (
    <div className="subpage">
      <section className="page-intro site-shell">
        <span className="section-index">REGISTRY / COMPONENTS</span>
        <div className="page-intro-grid">
          <h1>설치 가능한<br />표면들.</h1>
          <div>
            <p>
              필요한 컴포넌트만 선택해 프로젝트로 가져가세요. 코드는 복사된 뒤
              여러분의 것이 되고, 모든 토큰과 상태를 직접 수정할 수 있습니다.
            </p>
            <div className="page-meta">
              <span><strong>Core</strong> available</span>
              <span><strong>CLI</strong> compatible</span>
              <span><strong>Theme</strong> light / dark</span>
            </div>
          </div>
        </div>
      </section>

      <section className="component-catalog site-shell" aria-label="컴포넌트 목록">
        <article className="catalog-card catalog-card-wide">
          <header className="catalog-header">
            <div>
              <span className="catalog-kicker">ACTION</span>
              <h2>Button</h2>
              <p>상승한 기본 표면과 선명한 Primary 상태.</p>
            </div>
            <Badge variant="soft" className="available-badge">Available</Badge>
          </header>
          <div className="catalog-preview button-preview">
            <Button variant="primary">
              Primary
            </Button>
            <Button variant="soft">
              Secondary
            </Button>
            <Button variant="ghost">
              Ghost
            </Button>
            <Button size="icon" aria-label="새 항목 추가">
              +
            </Button>
          </div>
          <InstallCommand name="button" />
        </article>

        <article className="catalog-card">
          <header className="catalog-header">
            <div>
              <span className="catalog-kicker">CONTAINER</span>
              <h2>Card</h2>
              <p>정보 계층을 만드는 부드러운 표면.</p>
            </div>
            <Badge variant="soft" className="available-badge">Available</Badge>
          </header>
          <div className="catalog-preview">
            <Card className="product-card-preview">
              <CardHeader className="product-card-top">
                <span className="product-icon" aria-hidden="true">N</span>
                <Badge variant="primary">Pro</Badge>
              </CardHeader>
              <CardContent>
                <CardTitle className="product-card-title">Team workspace</CardTitle>
                <p className="product-card-description">
                  Build together with shared tokens.
                </p>
              </CardContent>
              <CardFooter className="product-card-bottom">
                <span>8 members</span>
                <button type="button">Open →</button>
              </CardFooter>
            </Card>
          </div>
          <InstallCommand name="card" />
        </article>

        <article className="catalog-card">
          <header className="catalog-header">
            <div>
              <span className="catalog-kicker">FORM</span>
              <h2>Input</h2>
              <p>눌린 표면으로 입력 가능성을 전달합니다.</p>
            </div>
            <Badge variant="soft" className="available-badge">Available</Badge>
          </header>
          <div className="catalog-preview input-preview-stack">
            <label className="demo-input">
              <span>Email address</span>
              <Input type="email" placeholder="you@example.com" />
            </label>
            <label className="demo-input">
              <span>Project slug</span>
              <Input defaultValue="soft-interface" />
            </label>
          </div>
          <InstallCommand name="input" />
        </article>

        <article className="catalog-card catalog-card-compact">
          <header className="catalog-header">
            <div>
              <span className="catalog-kicker">STATUS</span>
              <h2>Badge</h2>
              <p>상태와 분류를 작고 선명하게 표시합니다.</p>
            </div>
            <Badge variant="soft" className="available-badge">Available</Badge>
          </header>
          <div className="catalog-preview badge-preview">
            <Badge>Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="soft">Soft</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <InstallCommand name="badge" />
        </article>

        <article className="catalog-card catalog-card-compact">
          <header className="catalog-header">
            <div>
              <span className="catalog-kicker">FEEDBACK</span>
              <h2>Skeleton</h2>
              <p>인셋 깊이로 로딩 중인 영역을 표현합니다.</p>
            </div>
            <Badge variant="soft" className="available-badge">Available</Badge>
          </header>
          <div className="catalog-preview skeleton-preview">
            <Skeleton className="skeleton-avatar" />
            <div>
              <Skeleton className="skeleton-line skeleton-line-strong" />
              <Skeleton className="skeleton-line" />
              <Skeleton className="skeleton-line skeleton-line-short" />
            </div>
          </div>
          <InstallCommand name="skeleton" />
        </article>

        <article className="catalog-card catalog-card-wide catalog-card-compact">
          <header className="catalog-header">
            <div>
              <span className="catalog-kicker">CONTEXT</span>
              <h2>Tooltip</h2>
              <p>마우스와 키보드 포커스 모두에 짧은 설명을 제공합니다.</p>
            </div>
            <Badge variant="soft" className="available-badge">Available</Badge>
          </header>
          <div className="catalog-preview tooltip-preview">
            <Tooltip content="프로젝트에 새 표면을 추가합니다.">
              <Button variant="soft">포커스하거나 가리켜 보세요</Button>
            </Tooltip>
          </div>
          <InstallCommand name="tooltip" />
        </article>
      </section>

      <section className="catalog-note site-shell">
        <div className="note-index">NEXT</div>
        <div>
          <h2>더 많은 컴포넌트가 같은 규칙으로 확장됩니다.</h2>
          <p>
            Dialog, Select, Switch와 완성형 블록을 같은 토큰 체계로
            확장합니다.
          </p>
        </div>
        <Link className="neu-button neu-button-quiet" href="/docs/installation">
          설치 문서 보기 <span aria-hidden="true">→</span>
        </Link>
      </section>
    </div>
  );
}
