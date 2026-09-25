"use client";

import type { ReactNode } from "react";
import { useRouter } from "fumapress/client";

import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { SiteFooter } from "@/components/docs/site-footer";
import { SiteHeader } from "@/components/docs/site-header";

function normalizePath(pathname: string) {
  const withoutQuery = pathname.split("?")[0]?.split("#")[0] ?? "/";
  const withoutLocale = withoutQuery.replace(/^\/(ko|en|ja|zh)(?=\/|$)/, "");
  if (!withoutLocale || withoutLocale === "/") return "/";
  return withoutLocale.replace(/\/$/, "");
}

function usesDocsSidebar(pathname: string) {
  const path = normalizePath(pathname);
  return path === "/docs" ||
    path.startsWith("/docs/") ||
    /^\/components\/[^/]+$/.test(path);
}

export function SiteShell({ children }: { children: ReactNode }) {
  const { path: pathname } = useRouter();
  const sidebar = usesDocsSidebar(pathname);

  return (
    <div className="site-frame">
      <SiteHeader />

      <div
        className={
          sidebar
            ? "docs-site-layout docs-site-layout-sidebar"
            : "docs-site-layout docs-site-layout-product"
        }
      >
        {sidebar ? <DocsSidebar /> : null}
        <div className="docs-site-main">
          <main id="main-content" tabIndex={-1}>{children}</main>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
