import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-shell header-inner">
        <Link className="brand" href="/" aria-label="Neumorphism UI 홈">
          <span className="brand-mark" aria-hidden="true">
            N
          </span>
          <span>
            <strong>Neumorphism</strong>
            <small>UI Registry</small>
          </span>
        </Link>

        <nav className="primary-nav" aria-label="주요 메뉴">
          <Link href="/components">컴포넌트</Link>
          <Link href="/docs/installation">문서</Link>
        </nav>

        <div className="header-actions">
          <Link className="header-install-link" href="/docs/installation">
            시작하기
            <span aria-hidden="true">→</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
