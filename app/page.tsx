import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { formatEur, getSizePrices } from "@/data/pricing";

const featuredProducts = [
  {
    name: "Bouquet Eleganza",
    slug: "bouquet-eleganza",
    category: "Bouquet",
    price: 59,
    image:
      "/images/bouquet-eleganza.jpg",
    description:
      "Un bouquet elegante e raffinato con fiori freschi selezionati.",
  },
  {
    name: "Rose Rosse Premium",
    slug: "rose-rosse-premium",
    category: "Rose",
    price: 79,
    image:
      "/images/rose-rosse-premium.jpg",
    description:
      "Rose rosse premium per anniversari, sorprese romantiche e occasioni speciali.",
  },
  {
    name: "Bouquet Primavera",
    slug: "bouquet-primavera",
    category: "Bouquet",
    price: 49,
    image:
      "/images/bouquet-primavera.jpg",
    description:
      "Un bouquet luminoso e colorato, perfetto per regalare un sorriso.",
  },
  {
    name: "Peonie Rosa",
    slug: "peonie-rosa",
    category: "Peonie",
    price: 89,
    image:
      "/images/peonie-rosa.jpg",
    description:
      "Peonie delicate e romantiche per un regalo elegante e raffinato.",
  },
  {
    name: "Tulipani Colorati",
    slug: "tulipani-colorati",
    category: "Tulipani",
    price: 54,
    image:
      "/images/tulipani-colorati.jpg",
    description:
      "Tulipani colorati e luminosi per portare allegria in ogni occasione.",
  },
  {
    name: "Girasoli Milano",
    slug: "girasoli-milano",
    category: "Girasoli",
    price: 52,
    image:
      "/images/girasoli-milano.jpg",
    description:
      "Un bouquet solare di girasoli per un regalo pieno di energia.",
  },
];

const flowerCategories = [
  {
    name: "Rose",
    href: "/fiori/rose",
  },
  {
    name: "Peonie",
    href: "/fiori/peonie",
  },
  {
    name: "Tulipani",
    href: "/fiori/tulipani",
  },
  {
    name: "Girasoli",
    href: "/fiori/girasoli",
  },
  {
    name: "Orchidee",
    href: "/fiori/orchidee",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#1f1f1f]">
      <Header />

      <section className="mx-auto grid min-h-[82vh] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-[#8c6f5a]">
            Consegna Fiori Milano
          </p>

          <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Fiori freschi consegnati a domicilio a Milano
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-600">
            Ordina bouquet, rose, peonie, tulipani e composizioni floreali con
            consegna a domicilio a Milano. Scegli i tuoi fiori online e
            sorprendi una persona speciale.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/bouquet"
              className="rounded-full bg-black px-8 py-4 text-center font-semibold text-white transition hover:opacity-80"
            >
              Scopri i bouquet
            </Link>

            <Link
              href="/consegna-fiori-milano"
              className="rounded-full border border-black px-8 py-4 text-center font-semibold transition hover:bg-black hover:text-white"
            >
              Consegna a Milano
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] shadow-xl">
          <Image
            width={1200}
            height={1200}
            priority
            unoptimized
            src="/images/hero-home.jpg"
            alt="Bouquet colorato di fiori freschi con consegna a Milano"
            className="aspect-[4/5] h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          <div className="absolute inset-x-6 bottom-6 rounded-3xl bg-white/95 p-6 shadow-xl backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8c6f5a]">
              Consegna a Milano
            </p>

            <p className="mt-2 text-3xl font-bold">
              Fiori per ogni momento speciale
            </p>

            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Bouquet freschi preparati con cura e consegnati direttamente a
              domicilio.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8c6f5a]">
                I nostri fiori
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Fiori scelti per sorprendere
              </h2>

              <p className="mt-5 text-lg leading-8 text-neutral-600">
                Scopri alcune delle composizioni più richieste con consegna a
                domicilio a Milano.
              </p>
            </div>

            <Link
              href="/bouquet"
              className="inline-flex rounded-full border border-black px-7 py-4 font-semibold transition hover:bg-black hover:text-white"
            >
              Scopri tutti i bouquet
            </Link>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
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
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8c6f5a]">
                    {product.category}
                  </p>

                  <div className="mt-3 flex items-start justify-between gap-5">
                    <h3 className="text-xl font-bold">{product.name}</h3>

                    <span className="whitespace-nowrap text-lg font-semibold">
                      {`Da ${formatEur(getSizePrices(product.price).Piccolo)}`}
                    </span>
                  </div>

                  <p className="mt-3 leading-7 text-neutral-600">
                    {product.description}
                  </p>

                  <Link
                    href={`/prodotti/${product.slug}`}
                    className="mt-6 block w-full rounded-full bg-black px-5 py-3 text-center font-semibold text-white transition hover:opacity-80"
                  >
                    Scopri il prodotto
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/bouquet"
              className="inline-flex rounded-full bg-black px-9 py-4 font-semibold text-white transition hover:opacity-80"
            >
              Vedi tutti i bouquet
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8c6f5a]">
              Categorie
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Scegli i tuoi fiori preferiti
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {flowerCategories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="rounded-[2rem] border border-black/10 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <h3 className="text-2xl font-bold">{category.name}</h3>

                <span className="mt-5 inline-block font-semibold">
                  Scopri →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8c6f5a]">Servizi a Milano</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Consegna fiori per ogni esigenza</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">Scopri le pagine dedicate alla consegna in giornata, agli ordini online H24, alle richieste urgenti e alla copertura di Milano e provincia.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/servizi/consegna-fiori-in-giornata-milano" className="rounded-full border border-black/15 bg-white px-5 py-3 font-semibold">Consegna in giornata</Link>
            <Link href="/servizi/fiorista-milano" className="rounded-full border border-black/15 bg-white px-5 py-3 font-semibold">Fiorista Milano</Link>
            <Link href="/servizi/fiori-urgenti-milano" className="rounded-full border border-black/15 bg-white px-5 py-3 font-semibold">Fiori urgenti</Link>
            <Link href="/servizi/fiori-express-milano" className="rounded-full border border-black/15 bg-white px-5 py-3 font-semibold">Fiori express</Link>
            <Link href="/servizi/consegna-fiori-h24-milano" className="rounded-full border border-black/15 bg-white px-5 py-3 font-semibold">Ordini online H24</Link>
            <Link href="/servizi/consegna-fiori-provincia-milano" className="rounded-full border border-black/15 bg-white px-5 py-3 font-semibold">Milano e provincia</Link>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
          <div>
            <Link href="/" className="text-xl font-bold">
              Consegna Fiori Milano
            </Link>

            <p className="mt-4 text-sm leading-6 text-white/60">
              Bouquet e fiori con consegna a domicilio a Milano.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Fiori</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              <Link href="/fiori/rose">Rose</Link>
              <Link href="/fiori/peonie">Peonie</Link>
              <Link href="/fiori/tulipani">Tulipani</Link>
              <Link href="/fiori/girasoli">Girasoli</Link>
              <Link href="/fiori/orchidee">Orchidee</Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Servizio</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              <Link href="/bouquet">Bouquet</Link>
              <Link href="/consegna-fiori-milano">
                Consegna fiori Milano
              </Link>
              <Link href="/come-funziona">Come funziona</Link>
              <Link href="/servizi/consegna-fiori-in-giornata-milano">Consegna in giornata</Link>
              <Link href="/servizi/fiorista-milano">Fiorista Milano</Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Contatti</h3>

            <div className="mt-4 text-sm text-white/60">
              <a href="mailto:info@consegnafiorimilano.it">
                info@consegnafiorimilano.it
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
