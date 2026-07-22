import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
export const metadata: Metadata = {
  title: "Consegna Fiori a Milano | Fiori a Domicilio e in Giornata",
  description:
    "Cerchi fiori a Milano? Ordina bouquet e composizioni con consegna fiori a domicilio a Milano. Servizio per regali, occasioni speciali e consegna in giornata secondo disponibilità.",
  keywords: ["consegna fiori in giornata Milano", "fiori Milano", "fiori a Milano", "consegna fiori a domicilio Milano", "fiori a domicilio Milano"],
  alternates: {
    canonical: "/consegna-fiori-milano",
    languages: { "it-IT": "/consegna-fiori-milano", en: "/en/consegna-fiori-milano", ru: "/ru/consegna-fiori-milano", "x-default": "/consegna-fiori-milano" },
  },
};

const areas = [
  "Centro",
  "Navigli",
  "Porta Romana",
  "Porta Venezia",
  "Isola",
  "CityLife",
  "Brera",
  "Città Studi",
];

export default function ConsegnaFioriMilanoPage() {
  return (
    <main className="min-h-screen bg-white text-[#1f1f1f]">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "È possibile richiedere la consegna fiori in giornata a Milano?", acceptedAnswer: { "@type": "Answer", text: "La consegna in giornata può essere richiesta in base alla disponibilità dei fiori, alla zona e all&apos;orario dell&apos;ordine." } },
              { "@type": "Question", name: "Quanto costa la consegna a domicilio?", acceptedAnswer: { "@type": "Answer", text: "Il costo fisso di consegna è di 9,99 euro." } },
              { "@type": "Question", name: "Posso scegliere la dimensione del bouquet?", acceptedAnswer: { "@type": "Answer", text: "Sì. Le composizioni sono disponibili nelle dimensioni Piccolo, Medio e Premium." } }
            ]
          }).replace(/</g, "\\u003c"),
        }}
      />

      <section className="border-b border-black/10">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8c6f5a]">
              Consegna fiori Milano
            </p>

            <h1 className="mt-5 text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
              Consegna fiori a Milano, a domicilio e in giornata
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
              Ordina online bouquet, rose e composizioni floreali con consegna
              a domicilio a Milano. Per gli ordini compatibili con disponibilità e orari operativi, puoi richiedere anche la consegna fiori in giornata a Milano. Scegli i fiori, inserisci i dati del
              destinatario e completa il tuo ordine in pochi passaggi.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/bouquet"
                className="rounded-full bg-black px-8 py-4 text-center font-semibold text-white transition hover:opacity-80"
              >
                Scegli il bouquet
              </Link>

              <Link
                href="/come-funziona"
                className="rounded-full border border-black px-8 py-4 text-center font-semibold transition hover:bg-black hover:text-white"
              >
                Come funziona
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2.5rem]">
            <Image width={1200} height={1200}
              src="/images/consegna-fiori-milano.jpg"
              alt="Consegna fiori a domicilio a Milano"
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8c6f5a]">
              Il servizio
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Fiori a domicilio a Milano per ogni occasione
            </h2>

            <p className="mt-6 text-lg leading-8 text-neutral-600">
              Il nostro servizio di consegna fiori a Milano è pensato per chi cerca fiori a Milano con un processo di ordine semplice. La consegna fiori a domicilio a Milano è disponibile per bouquet e composizioni selezionate ed è pensata per chi
              desidera inviare un regalo speciale in modo semplice e veloce.
              Puoi scegliere tra bouquet, rose e composizioni floreali e
              indicare direttamente l&apos;indirizzo del destinatario.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <article className="rounded-[2rem] bg-white p-8">
              <span className="text-sm font-bold text-[#8c6f5a]">01</span>

              <h3 className="mt-4 text-2xl font-bold">
                Scegli i tuoi fiori
              </h3>

              <p className="mt-4 leading-7 text-neutral-600">
                Scopri bouquet, rose e composizioni floreali disponibili
                online.
              </p>
            </article>

            <article className="rounded-[2rem] bg-white p-8">
              <span className="text-sm font-bold text-[#8c6f5a]">02</span>

              <h3 className="mt-4 text-2xl font-bold">
                Inserisci l&apos;indirizzo
              </h3>

              <p className="mt-4 leading-7 text-neutral-600">
                Indica dove vuoi inviare i fiori e i dati del destinatario.
              </p>
            </article>

            <article className="rounded-[2rem] bg-white p-8">
              <span className="text-sm font-bold text-[#8c6f5a]">03</span>

              <h3 className="mt-4 text-2xl font-bold">
                Completa l&apos;ordine
              </h3>

              <p className="mt-4 leading-7 text-neutral-600">
                Completa il pagamento online e ricevi la conferma
                dell&apos;ordine.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8c6f5a]">
                Milano
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Consegna fiori in diverse zone di Milano
              </h2>

              <p className="mt-6 text-lg leading-8 text-neutral-600">
                Organizziamo la consegna di bouquet e composizioni floreali in
                diverse zone della città di Milano.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {areas.map((area) => (
                  <div
                    key={area}
                    className="rounded-2xl border border-black/10 bg-white px-5 py-4 font-medium"
                  >
                    {area}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-black p-10 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
                Un regalo speciale
              </p>

              <h2 className="mt-4 text-4xl font-bold">
                Invia fiori a una persona importante
              </h2>

              <p className="mt-6 text-lg leading-8 text-white/70">
                Compleanni, anniversari, sorprese romantiche o semplicemente
                un pensiero speciale: scegli il bouquet più adatto e invialo a
                Milano.
              </p>

              <Link
                href="/bouquet"
                className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:opacity-80"
              >
                Scopri i bouquet
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-4xl font-bold tracking-tight">
            Consegna fiori Milano: ordina online in modo semplice
          </h2>

          <div className="mt-8 space-y-6 text-lg leading-8 text-neutral-600">
            <p>
              Ordinare fiori online può essere una soluzione semplice per
              sorprendere una persona speciale anche quando non puoi
              consegnare il regalo personalmente.
            </p>

            <p>
              Su Consegna Fiori Milano puoi scegliere il bouquet più adatto
              all&apos;occasione, inserire i dati del destinatario e completare
              l&apos;ordine online.
            </p>

            <p>
              Le nostre pagine dedicate a bouquet e rose ti permettono di
              trovare facilmente la composizione più adatta per il tuo regalo.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-white py-24">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8c6f5a]">Domande frequenti</p>
          <h2 className="mt-4 text-4xl font-bold">Consegna fiori a Milano: informazioni utili</h2>
          <div className="mt-10 space-y-8">
            <article><h3 className="text-2xl font-bold">È possibile richiedere la consegna fiori in giornata a Milano?</h3><p className="mt-3 leading-7 text-neutral-600">La consegna in giornata può essere richiesta in base alla disponibilità dei fiori, alla zona e all&apos;orario dell&apos;ordine. Per esigenze urgenti è consigliabile contattarci su WhatsApp prima di completare l&apos;ordine.</p></article>
            <article><h3 className="text-2xl font-bold">Quanto costa la consegna a domicilio?</h3><p className="mt-3 leading-7 text-neutral-600">Il costo fisso di consegna è di 9,99 € e viene mostrato chiaramente nel riepilogo prima del pagamento.</p></article>
            <article><h3 className="text-2xl font-bold">Posso scegliere la dimensione del bouquet?</h3><p className="mt-3 leading-7 text-neutral-600">Sì. Ogni composizione può essere ordinata nelle versioni Piccolo, Medio o Premium, con prezzi differenti visibili prima del checkout.</p></article>
          </div>
        </div>
      </section>

      <section className="bg-black py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
            Consegna fiori a Milano
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Scegli ora il bouquet perfetto
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Scopri la nostra selezione di fiori e scegli la composizione più
            adatta per il tuo regalo.
          </p>

          <Link
            href="/bouquet"
            className="mt-9 inline-block rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:opacity-80"
          >
            Vedi tutti i bouquet
          </Link>
        </div>
      </section>

      <footer className="bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-neutral-600 md:flex-row md:justify-between">
          <p>© 2026 Consegna Fiori Milano</p>
          <p>Consegna fiori a domicilio a Milano</p>
        </div>
      </footer>
    </main>
  );
}
