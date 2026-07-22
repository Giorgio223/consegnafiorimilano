"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const flowerCategories = [
  { name: "Rose", href: "/fiori/rose", description: "Rose romantiche e composizioni" },
  { name: "Peonie", href: "/fiori/peonie", description: "Bouquet eleganti e raffinati" },
  { name: "Tulipani", href: "/fiori/tulipani", description: "Tulipani freschi e colorati" },
  { name: "Girasoli", href: "/fiori/girasoli", description: "Bouquet luminosi e solari" },
  { name: "Orchidee", href: "/fiori/orchidee", description: "Regali eleganti e premium" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [flowersOpen, setFlowersOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-1">
        <Link href="/" className="shrink-0" aria-label="Consegna Fiori Milano - Home">
          <Image
            src="/images/logo.png"
            alt="Consegna Fiori Milano"
            width={620}
            height={300}
            priority
            className="h-36 w-auto object-contain sm:h-40 md:h-44 lg:h-48"
          />
        </Link>

        <nav className="hidden items-center gap-8 text-base font-medium md:flex" aria-label="Navigazione principale">
          <Link href="/bouquet" className="transition hover:opacity-60">Bouquet</Link>

          <div
            className="relative"
            onMouseEnter={() => setFlowersOpen(true)}
            onMouseLeave={() => setFlowersOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-2 py-8 transition hover:opacity-60"
              aria-expanded={flowersOpen}
              aria-haspopup="true"
              onClick={() => setFlowersOpen((value) => !value)}
              onFocus={() => setFlowersOpen(true)}
            >
              Fiori <span className={`text-[10px] transition-transform ${flowersOpen ? "rotate-180" : ""}`}>▼</span>
            </button>

            {flowersOpen && (
              <div className="absolute left-1/2 top-full z-50 w-96 -translate-x-1/2 pt-2">
                <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-2xl">
                  {flowerCategories.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-xl px-5 py-4 transition hover:bg-neutral-50"
                      onClick={() => setFlowersOpen(false)}
                    >
                      <span className="block text-lg font-semibold">{item.name}</span>
                      <span className="mt-1 block text-sm text-neutral-500">{item.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/come-funziona" className="transition hover:opacity-60">Come funziona</Link>
          <Link href="/consegna-fiori-milano" className="transition hover:opacity-60">Consegna a Milano</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/bouquet" className="hidden shrink-0 rounded-full bg-black px-7 py-4 font-semibold text-white transition hover:opacity-85 sm:block">Ordina ora</Link>
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="rounded-full border border-black/15 px-4 py-3 text-sm font-semibold md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            Menu
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav id="mobile-navigation" className="border-t border-black/10 bg-white px-6 py-5 md:hidden" aria-label="Navigazione mobile">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 font-medium">
            <Link href="/bouquet" onClick={() => setMobileOpen(false)}>Bouquet</Link>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Fiori</p>
            {flowerCategories.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>{item.name}</Link>
            ))}
            <Link href="/come-funziona" onClick={() => setMobileOpen(false)}>Come funziona</Link>
            <Link href="/consegna-fiori-milano" onClick={() => setMobileOpen(false)}>Consegna a Milano</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
