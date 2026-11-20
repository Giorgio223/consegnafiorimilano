import { NextRequest, NextResponse } from "next/server";
import { localeFromPath } from "@/lib/i18n";

const domainGroups: Record<string, string[]> = {
  en: [
    "flower.milan.it",
    "flowerdeliverymilan.it",
    "flowermilan.it",
    "flowers.milan.it",
    "flowersdeliverymilan.it",
  ],
  de: [
    "blumenmailand.com",
    "blumenmailand.it",
    "blumenversandmailand.it",
  ],
  es: [
    "entregafloresmilan.es",
    "enviofloresmilan.com",
    "enviofloresmilan.es",
    "enviofloresmilan.it",
    "flores.milan.it",
    "floresmilan.com",
    "floresmilan.es",
    "floresmilan.it",
  ],
  fr: [
    "fleurs.milan.it",
    "fleursmilan.com",
    "fleursmilan.it",
    "livraisonfleursmilan.com",
    "livraisonfleursmilan.it",
  ],
  ru: [
    "dostavkacvetovmilan.com",
    "dostavkacvetovmilan.it",
    "dostavkamilan.com",
    "dostavkamilan.it",
  ],
};

const domainToLocale = new Map<string, string>();

for (const [locale, domains] of Object.entries(domainGroups)) {
  for (const domain of domains) {
    domainToLocale.set(domain, locale);
    domainToLocale.set(`www.${domain}`, locale);
  }
}


// Adds a trustworthy, per-request language header for the root HTML layout.
// Domain 301 redirects are served by Vercel configuration, not this proxy.
export function proxy(request: NextRequest) {

  const hostname = request.nextUrl.hostname.toLowerCase();
  const pathname = request.nextUrl.pathname;

  // Let Vercel handle SSL certificate validation.
  if (pathname.startsWith("/.well-known/acme-challenge/")) {
    return NextResponse.next();
  }

  if (hostname === "www.consegnafiorimilano.it") {
    const destination = new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      "https://consegnafiorimilano.it"
    );

    return NextResponse.redirect(destination, 301);
  }

  const targetLocale = domainToLocale.get(hostname);

  if (targetLocale) {
    return NextResponse.redirect(
      `https://consegnafiorimilano.it/${targetLocale}`,
      301
    );
  }

  const headers = new Headers(request.headers);
  const path = request.nextUrl.pathname;
  const queryLocale = path.startsWith("/checkout") ? request.nextUrl.searchParams.get("locale") : null;
  const locale = queryLocale && ["it", "en", "de", "es", "fr", "ru"].includes(queryLocale) ? queryLocale : localeFromPath(path);
  headers.set("x-cfm-locale", locale);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/|\\.well-known/).*)",
  ],
};
