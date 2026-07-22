import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
export const metadata: Metadata = {
  title: "Rose a Domicilio Milano | Consegna Rose Milano",
  description:
    "Scopri rose rosse, rose rosa e bouquet romantici con consegna a domicilio a Milano. Ordina online le tue rose preferite.",
  alternates: {
    canonical: "/fiori/rose",
    languages: { "it-IT": "/fiori/rose", en: "/en/fiori/rose", ru: "/ru/fiori/rose", "x-default": "/fiori/rose" },
  },
};

const products = [
  {
    name: "12 Rose Rosse Premium",
    slug: "12-rose-rosse-premium",
    price: "69 €",
    image:
      "/images/12-rose-rosse-premium.jpg",
    description:
      "Dodici rose rosse selezionate per un regalo romantico ed elegante.",
  },
  {
    name: "24 Rose Rosse",
    slug: "24-rose-rosse",
    price: "119 €",
    image:
      "/images/24-rose-rosse.jpg",
    description:
      "Un bouquet importante di rose rosse per un gesto indimenticabile.",
  },
  {
    name: "Rose Rosa Elegance",
    slug: "rose-rosa-elegance",
    price: "74 €",
    image:
      "/images/rose-rosa-elegance.jpg",
    description:
      "Rose rosa delicate e raffinate per compleanni e occasioni speciali.",
  },
  {
    name: "Bouquet Rose Romantico",
    slug: "bouquet-rose-romantico",
    price: "89 €",
    image:
      "/images/bouquet-rose-romantico.jpg",
    description:
      "Una composizione romantica di rose pensata per sorprendere.",
  },
];

export default function RoseCategoryPage() {
  return (
    <main className="min-h-screen bg-white text-[#1f1f1f]">
      <Header />

      <section className="border-b border-black/10">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8c6f5a]">
            Rose Milano
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl">
            Rose con consegna a domicilio a Milano
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            Scopri la nostra selezione di rose rosse, rose rosa e composizioni
            romantiche con consegna a domicilio a Milano.
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
            Rose a Milano
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            Rose per anniversari, amore e occasioni speciali
          </h2>

          <div className="mt-8 space-y-6 text-lg leading-8 text-neutral-600">
            <p>
              Le rose sono tra i fiori più scelti per anniversari, sorprese
              romantiche e momenti importanti.
            </p>

            <p>
              Puoi scegliere la composizione che preferisci, leggere la
              descrizione completa del prodotto e procedere con l&apos;ordine
              direttamente online.
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
          <p>Rose con consegna a domicilio a Milano</p>
        </div>
      </footer>
    </main>
  );
}
