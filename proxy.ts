import { NextRequest, NextResponse } from "next/server";
import { localeFromPath } from "@/lib/i18n";

// Adds a trustworthy, per-request language header for the root HTML layout.
// Domain 301 redirects are served by Vercel configuration, not this proxy.
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  const path = request.nextUrl.pathname;
  const queryLocale = path.startsWith("/checkout") ? request.nextUrl.searchParams.get("locale") : null;
  const locale = queryLocale && ["it", "en", "de", "es", "fr", "ru"].includes(queryLocale) ? queryLocale : localeFromPath(path);
  headers.set("x-cfm-locale", locale);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/).*)"],
};
