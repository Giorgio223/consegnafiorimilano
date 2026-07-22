import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
export const metadata: Metadata = {
  title: "Orchidee a Domicilio Milano | Consegna Orchidee Milano",
  description:
    "Scopri orchidee eleganti e composizioni floreali raffinate con consegna a domicilio a Milano. Ordina online orchidee per regali e occasioni speciali.",
  alternates: {
    canonical: "/fiori/orchidee",
  },
};

const products = [
  {
    name: "Orchidea Bianca Elegance",
    slug: "orchidea-bianca-elegance",
    price: "69 €",
    image:
      "/images/orchidea-bianca-elegance.jpg",
    description:
      "Un'orchidea bianca elegante e raffinata, perfetta per un regalo speciale.",
  },
  {
    name: "Orchidea Rosa Premium",
    slug: "orchidea-rosa-premium",
    price: "79 €",
    image:
      "/images/orchidea-rosa-premium.jpg",
    description:
      "Un'orchidea rosa delicata e raffinata per sorprendere con eleganza.",
  },
  {
    name: "Composizione Orchidee",
    slug: "composizione-orchidee",
    price: "99 €",
    image:
      "/images/composizione-orchidee.jpg",
    description:
      "Una composizione elegante di orchidee pensata per occasioni importanti.",
  },
  {
    name: "Orchidea Luxury Milano",
    slug: "orchidea-luxury-milano",
    price: "119 €",
    image:
      "/images/orchidea-luxury-milano.jpg",
    description:
      "Una proposta premium e sofisticata per un regalo davvero indimenticabile.",
  },
];

export default function OrchideeCategoryPage() {
  return (
    <main className="min-h-screen bg-white text-[#1f1f1f]">
      <Header />

      <section className="border-b border-black/10">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8c6f5a]">
            Orchidee Milano
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl">
            Orchidee con consegna a domicilio a Milano
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            Scopri orchidee eleganti, raffinate e perfette per regali
            importanti con consegna a domicilio a Milano.
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
            Orchidee a Milano
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            Orchidee eleganti per regali e occasioni speciali
          </h2>

          <div className="mt-8 space-y-6 text-lg leading-8 text-neutral-600">
            <p>
              Le orchidee sono una scelta elegante e raffinata per compleanni,
              ringraziamenti, inaugurazioni e occasioni importanti.
            </p>

            <p>
              Apri la pagina del prodotto per vedere la descrizione completa,
              il prezzo e procedere successivamente con l&apos;ordine online.
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
              href="/fiori/girasoli"
              className="rounded-full bg-white px-7 py-4 font-semibold text-black"
            >
              Girasoli
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-neutral-600 md:flex-row md:justify-between">
          <p>© 2026 Consegna Fiori Milano</p>
          <p>Orchidee con consegna a domicilio a Milano</p>
        </div>
      </footer>
    </main>
  );
}
