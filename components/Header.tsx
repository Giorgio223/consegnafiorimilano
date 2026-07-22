"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { localeFromPath, stripLocale, ui, withLocale, type Locale } from "@/lib/i18n";

const categoryPaths = ["/fiori/rose", "/fiori/peonie", "/fiori/tulipani", "/fiori/girasoli", "/fiori/orchidee"];

export default function Header() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const copy = ui[locale];
  const [mobileOpen, setMobileOpen] = useState(false);
  const [flowersOpen, setFlowersOpen] = useState(false);

  const local = (path: string) => withLocale(path, locale);
  const switchLanguage = (target: Locale) => {
    const clean = stripLocale(pathname);
    const unsupported = ["/servizi/", "/tracking/", "/checkout", "/admin", "/api"].some((prefix) => clean.startsWith(prefix));
    if (unsupported && target !== "it") return `/${target}`;
    return withLocale(pathname, target);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-1 sm:px-6">
        <Link href={local("/")} className="shrink-0" aria-label="Consegna Fiori Milano - Home">
          <Image
            src="/images/logo.png"
            alt="Consegna Fiori Milano"
            width={620}
            height={300}
            priority
            className="h-32 w-auto object-contain sm:h-40 md:h-44 lg:h-48"
          />
        </Link>

        <nav className="hidden items-center gap-7 text-base font-medium lg:flex" aria-label="Navigazione principale">
          <Link href={local("/bouquet")} className="transition hover:opacity-60">{copy.bouquet}</Link>

          <div className="relative" onMouseEnter={() => setFlowersOpen(true)} onMouseLeave={() => setFlowersOpen(false)}>
            <button
              type="button"
              className="flex items-center gap-2 py-8 transition hover:opacity-60"
              aria-expanded={flowersOpen}
              aria-haspopup="true"
              onClick={() => setFlowersOpen((value) => !value)}
              onFocus={() => setFlowersOpen(true)}
            >
              {copy.flowers} <span className={`text-[10px] transition-transform ${flowersOpen ? "rotate-180" : ""}`}>▼</span>
            </button>

            {flowersOpen && (
              <div className="absolute left-1/2 top-full z-50 w-96 -translate-x-1/2 pt-2">
                <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-2xl">
                  {copy.categories.map((item, index) => (
                    <Link
                      key={categoryPaths[index]}
                      href={local(categoryPaths[index])}
                      className="block rounded-xl px-5 py-4 transition hover:bg-neutral-50"
                      onClick={() => setFlowersOpen(false)}
                    >
                      <span className="block text-lg font-semibold">{item[0]}</span>
                      <span className="mt-1 block text-sm text-neutral-500">{item[1]}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href={local("/come-funziona")} className="transition hover:opacity-60">{copy.how}</Link>
          <Link href={local("/consegna-fiori-milano")} className="transition hover:opacity-60">{copy.delivery}</Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center rounded-full border border-black/10 bg-white p-1 md:flex" aria-label="Language selector">
            {(["it", "en", "ru"] as Locale[]).map((code) => (
              <Link
                key={code}
                href={switchLanguage(code)}
                hrefLang={code}
                className={`rounded-full px-3 py-2 text-xs font-bold uppercase transition ${locale === code ? "bg-black text-white" : "hover:bg-neutral-100"}`}
                aria-current={locale === code ? "page" : undefined}
              >
                {code}
              </Link>
            ))}
          </div>
          <Link href={local("/bouquet")} className="hidden shrink-0 rounded-full bg-black px-6 py-4 font-semibold text-white transition hover:opacity-85 sm:block">{copy.order}</Link>
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="rounded-full border border-black/15 px-4 py-3 text-sm font-semibold lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {copy.menu}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav id="mobile-navigation" className="border-t border-black/10 bg-white px-6 py-5 lg:hidden" aria-label="Navigazione mobile">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 font-medium">
            <div className="flex gap-2 pb-2">
              {(["it", "en", "ru"] as Locale[]).map((code) => (
                <Link key={code} href={switchLanguage(code)} className={`rounded-full border px-4 py-2 text-xs font-bold uppercase ${locale === code ? "border-black bg-black text-white" : "border-black/15"}`}>{code}</Link>
              ))}
            </div>
            <Link href={local("/bouquet")} onClick={() => setMobileOpen(false)}>{copy.bouquet}</Link>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">{copy.flowers}</p>
            {copy.categories.map((item, index) => (
              <Link key={categoryPaths[index]} href={local(categoryPaths[index])} onClick={() => setMobileOpen(false)}>{item[0]}</Link>
            ))}
            <Link href={local("/come-funziona")} onClick={() => setMobileOpen(false)}>{copy.how}</Link>
            <Link href={local("/consegna-fiori-milano")} onClick={() => setMobileOpen(false)}>{copy.delivery}</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
