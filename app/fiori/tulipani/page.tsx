import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
export const metadata: Metadata = {
  title: "Tulipani a Domicilio Milano | Consegna Tulipani Milano",
  description:
    "Scopri bouquet di tulipani colorati, rosa e bianchi con consegna a domicilio a Milano. Ordina online i tuoi tulipani preferiti.",
  alternates: {
    canonical: "/fiori/tulipani",
  },
};

const products = [
  {
    name: "Tulipani Colorati",
    slug: "tulipani-colorati",
    price: "54 €",
    image:
      "/images/tulipani-colorati.jpg",
    description:
      "Un bouquet allegro di tulipani colorati per portare energia e felicità.",
  },
  {
    name: "Tulipani Rosa",
    slug: "tulipani-rosa",
    price: "59 €",
    image:
      "/images/tulipani-rosa.jpg",
    description:
      "Tulipani rosa delicati per un regalo elegante, romantico e raffinato.",
  },
  {
    name: "Tulipani Bianchi",
    slug: "tulipani-bianchi",
    price: "64 €",
    image:
      "/images/tulipani-bianchi.jpg",
    description:
      "Una composizione luminosa di tulipani bianchi dal carattere elegante.",
  },
  {
    name: "Bouquet Tulipani Premium",
    slug: "bouquet-tulipani-premium",
    price: "79 €",
    image:
      "/images/bouquet-tulipani-premium.jpg",
    description:
      "Una selezione premium di tulipani per compleanni e occasioni speciali.",
  },
];

export default function TulipaniCategoryPage() {
  return (
    <main className="min-h-screen bg-white text-[#1f1f1f]">
      <Header />

      <section className="border-b border-black/10">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8c6f5a]">
            Tulipani Milano
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl">
            Tulipani con consegna a domicilio a Milano
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            Scopri bouquet di tulipani colorati, eleganti e luminosi con
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
            Tulipani a Milano
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            Bouquet di tulipani per ogni occasione
          </h2>

          <div className="mt-8 space-y-6 text-lg leading-8 text-neutral-600">
            <p>
              I tulipani sono perfetti per compleanni, sorprese e regali
              spontanei. I loro colori rendono ogni composizione luminosa e
              speciale.
            </p>

            <p>
              Scegli la composizione che preferisci, apri la pagina del
              prodotto per vedere descrizione e dettagli e procedi poi con
              l&apos;ordine online.
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
              href="/fiori/girasoli"
              className="rounded-full bg-white px-7 py-4 font-semibold text-black"
            >
              Girasoli
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
          <p>Tulipani con consegna a domicilio a Milano</p>
        </div>
      </footer>
    </main>
  );
}
