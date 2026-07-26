import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, isLocale } from "@/i18n/config";

const PUBLIC_FILE = /\.[^/]+$/;
const NON_LOCALIZED_PREFIXES = ["/r/", "/fonts/", "/_next/", "/_vinext/"];
const NON_LOCALIZED_FILES = new Set([
  "/favicon.ico",
  "/og.png",
  "/robots.txt",
  "/sitemap.xml",
]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1] ?? "";

  if (
    isLocale(firstSegment) ||
    NON_LOCALIZED_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
    NON_LOCALIZED_FILES.has(pathname) ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const destination = request.nextUrl.clone();
  destination.pathname =
    pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;

  return NextResponse.redirect(destination);
}

export const config = {
  matcher: ["/((?!api).*)"],
};
