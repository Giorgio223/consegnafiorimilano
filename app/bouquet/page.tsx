import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getProductsByCategory } from "@/data/products";
import { formatEur, getSizePrices } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Bouquet di Fiori a Milano | Consegna a Domicilio",
  description:
    "Scopri bouquet di fiori freschi con consegna a domicilio a Milano. Composizioni per compleanni, anniversari, amore, feste e occasioni speciali.",
  alternates: { canonical: "/bouquet", languages: { "it-IT": "/bouquet", en: "/en/bouquet", ru: "/ru/bouquet", "x-default": "/bouquet" } },
  openGraph: {
    title: "Bouquet di Fiori a Milano | Consegna a Domicilio",
    description: "Bouquet freschi per ogni occasione con consegna a domicilio a Milano.",
    url: "/bouquet",
    type: "website",
  },
};

const products = getProductsByCategory("Bouquet");

export default function BouquetPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Bouquet di fiori con consegna a Milano",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.consegnafiorimilano.it/prodotti/${product.slug}`,
      name: product.name,
    })),
  };

  return (
    <main className="min-h-screen bg-white text-[#1f1f1f]">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <section className="border-b border-black/10">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8c6f5a]">Bouquet Milano</p>
          <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl">
            Bouquet di fiori con consegna a domicilio a Milano
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-neutral-600">
            Scopri la nostra selezione di {products.length} bouquet per compleanni, anniversari, sorprese romantiche, feste e momenti speciali, con consegna a domicilio a Milano.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article key={product.slug} className="group overflow-hidden rounded-[2rem] border border-black/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="overflow-hidden bg-neutral-50">
                  <Image
                    width={1200}
                    height={1200}
                    src={product.image}
                    alt={`${product.name} con consegna a domicilio a Milano`}
                    className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-5">
                    <h2 className="text-2xl font-bold">{product.name}</h2>
                    <span className="whitespace-nowrap text-lg font-semibold">Da {formatEur(getSizePrices(product.price).Piccolo)}</span>
                  </div>
                  <p className="mt-4 leading-7 text-neutral-600">{product.shortDescription}</p>
                  <Link href={`/prodotti/${product.slug}`} className="mt-7 block rounded-full bg-black px-6 py-4 text-center font-semibold text-white transition hover:opacity-80">
                    Scopri il bouquet
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-4xl font-bold tracking-tight">Bouquet di fiori per ogni occasione a Milano</h2>
          <div className="mt-8 space-y-6 text-lg leading-8 text-neutral-600">
            <p>
              Scegliere il bouquet giusto significa trasformare un semplice regalo in un momento speciale. La selezione comprende composizioni floreali per compleanni, anniversari, ringraziamenti, congratulazioni e sorprese romantiche.
            </p>
            <p>
              Dalle composizioni più romantiche ai bouquet luminosi e colorati, il catalogo offre proposte per occasioni diverse con pagine dedicate e informazioni chiare su ogni composizione.
            </p>
            <p>
              Il servizio è dedicato alla consegna di fiori a Milano e permette di scegliere online il bouquet più adatto all&apos;occasione e preparare l&apos;ordine per il destinatario.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
