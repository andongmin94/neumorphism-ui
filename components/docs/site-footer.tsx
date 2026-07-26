import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-inner">
        <div>
          <Link className="footer-brand" href="/">
            Neumorphism UI
          </Link>
          <p>shadcn을 위한 부드럽고 설치 가능한 UI Registry.</p>
        </div>
        <nav aria-label="하단 메뉴">
          <Link href="/components">컴포넌트</Link>
          <Link href="/docs/installation">설치</Link>
        </nav>
        <p className="footer-note">Source-first · Built for composition</p>
      </div>
    </footer>
  );
}
