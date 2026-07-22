import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Come Funziona | Consegna Fiori Milano",
  description:
    "Scopri come ordinare fiori online con consegna a domicilio a Milano. Scegli il bouquet, inserisci i dati del destinatario e completa il pagamento in modo semplice e sicuro.",
  alternates: {
    canonical: "/come-funziona",
    languages: { "it-IT": "/come-funziona", en: "/en/come-funziona", ru: "/ru/come-funziona", "x-default": "/come-funziona" },
  },
};

const steps = [
  {
    number: "01",
    title: "Scegli il bouquet",
    description:
      "Esplora la nostra selezione di bouquet, rose, peonie, tulipani e altre composizioni floreali.",
  },
  {
    number: "02",
    title: "Apri la scheda prodotto",
    description:
      "Leggi la descrizione, controlla il prezzo e scegli la quantità desiderata.",
  },
  {
    number: "03",
    title: "Procedi all'ordine",
    description:
      "Inserisci i dati del destinatario, l'indirizzo di consegna e il messaggio personale.",
  },
  {
    number: "04",
    title: "Completa il pagamento",
    description:
      "Completa il pagamento online in modo sicuro.",
  },
  {
    number: "05",
    title: "Prepariamo i fiori",
    description:
      "La composizione viene preparata con cura per il tuo ordine.",
  },
  {
    number: "06",
    title: "Consegniamo a Milano",
    description:
      "Il tuo ordine viene consegnato all'indirizzo indicato.",
  },
];

export default function ComeFunzionaPage() {
  return (
    <main className="min-h-screen bg-white text-[#1f1f1f]">
      <Header />

      <section className="border-b border-black/10">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8c6f5a]">
            Come funziona
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl">
            Ordinare fiori a domicilio a Milano è semplice
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            Scegli i fiori, apri la scheda prodotto, seleziona la quantità e
            procedi con il tuo ordine online.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-[2rem] border border-black/10 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="text-sm font-bold tracking-[0.2em] text-[#8c6f5a]">
                  {step.number}
                </span>

                <h2 className="mt-5 text-2xl font-bold">{step.title}</h2>

                <p className="mt-4 leading-7 text-neutral-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8c6f5a]">
              Ordine online
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Tutto pensato per rendere l&apos;ordine semplice
            </h2>

            <p className="mt-6 text-lg leading-8 text-neutral-600">
              Puoi scegliere la categoria di fiori che preferisci, aprire la
              pagina del prodotto, leggere tutti i dettagli e scegliere la
              quantità prima di procedere al checkout.
            </p>

            <Link
              href="/bouquet"
              className="mt-8 inline-block rounded-full bg-black px-8 py-4 font-semibold text-white transition hover:opacity-80"
            >
              Scopri i bouquet
            </Link>
          </div>

          <div className="overflow-hidden rounded-[2.5rem]">
            <Image width={1200} height={1200}
              src="/images/come-funziona.jpg"
              alt="Preparazione di bouquet di fiori freschi a Milano"
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-black py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
            Pronto per ordinare?
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Scegli i tuoi fiori e invia un regalo speciale a Milano
          </h2>

          <Link
            href="/bouquet"
            className="mt-9 inline-block rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:opacity-80"
          >
            Scopri i bouquet
          </Link>
        </div>
      </section>
    </main>
  );
}
