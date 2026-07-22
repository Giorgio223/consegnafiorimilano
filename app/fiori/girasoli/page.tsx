import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
export const metadata: Metadata = {
  title: "Girasoli a Domicilio Milano | Consegna Girasoli Milano",
  description:
    "Scopri bouquet di girasoli freschi e luminosi con consegna a domicilio a Milano. Ordina online composizioni solari per compleanni e occasioni speciali.",
  alternates: {
    canonical: "/fiori/girasoli",
    languages: { "it-IT": "/fiori/girasoli", en: "/en/fiori/girasoli", ru: "/ru/fiori/girasoli", "x-default": "/fiori/girasoli" },
  },
};

const products = [
  {
    name: "Girasoli Milano",
    slug: "girasoli-milano",
    price: "52 €",
    image:
      "/images/girasoli-milano.jpg",
    description:
      "Un bouquet solare di girasoli freschi per portare energia e allegria.",
  },
  {
    name: "Bouquet Girasoli Premium",
    slug: "bouquet-girasoli-premium",
    price: "69 €",
    image:
      "/images/bouquet-girasoli-premium.jpg",
    description:
      "Una composizione importante di girasoli selezionati per un regalo speciale.",
  },
  {
    name: "Girasoli e Fiori Colorati",
    slug: "girasoli-fiori-colorati",
    price: "64 €",
    image:
      "/images/girasoli-fiori-colorati.jpg",
    description:
      "Girasoli e fiori colorati per una composizione vivace e luminosa.",
  },
  {
    name: "Bouquet Sole di Milano",
    slug: "bouquet-sole-milano",
    price: "74 €",
    image:
      "/images/bouquet-sole-milano.jpg",
    description:
      "Un bouquet allegro e luminoso pensato per sorprendere con originalità.",
  },
];

export default function GirasoliCategoryPage() {
  return (
    <main className="min-h-screen bg-white text-[#1f1f1f]">
      <Header />

      <section className="border-b border-black/10">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8c6f5a]">
            Girasoli Milano
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl">
            Girasoli con consegna a domicilio a Milano
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            Scopri bouquet di girasoli freschi, luminosi e pieni di energia con
            consegna a domicilio a Milano.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <article
                key={product.slug}
                className="group overflow-hidden rounded-[2rem] border border-black/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="overflow-hidden">
                  <Image width={1200} height={1200}
                    src={product.image}
                    alt={`${product.name} con consegna a Milano`}
                    className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl font-bold">{product.name}</h2>

                    <span className="whitespace-nowrap font-semibold">
                      {product.price}
                    </span>
                  </div>

                  <p className="mt-4 leading-7 text-neutral-600">
                    {product.description}
                  </p>

                  <Link
                    href={`/prodotti/${product.slug}`}
                    className="mt-7 block rounded-full bg-black px-6 py-4 text-center font-semibold text-white transition hover:opacity-80"
                  >
                    Scopri il prodotto
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8c6f5a]">
            Girasoli a Milano
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            Bouquet di girasoli per regalare energia e allegria
          </h2>

          <div className="mt-8 space-y-6 text-lg leading-8 text-neutral-600">
            <p>
              I girasoli sono perfetti per compleanni, congratulazioni e regali
              spontanei. Il loro colore intenso rende ogni composizione
              immediatamente riconoscibile e piena di energia.
            </p>

            <p>
              Apri la pagina del prodotto per vedere la descrizione completa,
              il prezzo e procedere successivamente con l&apos;ordine.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-black py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold">
            Scopri anche gli altri fiori
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/fiori/rose"
              className="rounded-full bg-white px-7 py-4 font-semibold text-black"
            >
              Rose
            </Link>

            <Link
              href="/fiori/peonie"
              className="rounded-full bg-white px-7 py-4 font-semibold text-black"
            >
              Peonie
            </Link>

            <Link
              href="/fiori/tulipani"
              className="rounded-full bg-white px-7 py-4 font-semibold text-black"
            >
              Tulipani
            </Link>

            <Link
              href="/fiori/orchidee"
              className="rounded-full bg-white px-7 py-4 font-semibold text-black"
            >
              Orchidee
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-neutral-600 md:flex-row md:justify-between">
          <p>© 2026 Consegna Fiori Milano</p>
          <p>Girasoli con consegna a domicilio a Milano</p>
        </div>
      </footer>
    </main>
  );
}
