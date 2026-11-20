import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { deliveryAreas, getDeliveryArea, deliveryAreaUrl } from "@/data/delivery-areas";
import { products } from "@/data/products";
import { getSizePrices } from "@/data/pricing";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return deliveryAreas.map((area) => ({ area: area.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
  const { area: slug } = await params;
  const area = getDeliveryArea(slug);
  if (!area) return { robots: { index: false, follow: false } };
  const canonical = deliveryAreaUrl(area);
  return {
    title: { absolute: area.title },
    description: area.description,
    keywords: area.keywords,
    alternates: { canonical },
    openGraph: { title: area.title, description: area.description, url: canonical, locale: "it_IT", type: "website", images: [{url:"/images/consegna-fiori-milano.jpg",alt:`Bouquet e consegna fiori ${area.name}`}] },
  };
}

export default async function AreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area: slug } = await params;
  const area = getDeliveryArea(slug);
  if (!area) notFound();
  const canonical = `${SITE_URL}${deliveryAreaUrl(area)}`;
  const faq = [
    { question: `Posso inviare fiori a ${area.name}?`, answer: `Puoi scegliere i bouquet online e richiedere una verifica della consegna a ${area.name}; disponibilità e copertura dipendono dall'indirizzo e dalla data.` },
    { question: `Quanto costa consegnare fiori a ${area.name}?`, answer: area.type === "comune" ? "Per le consegne fuori Milano, contattaci prima di pagare: verificheremo il costo per l'indirizzo indicato." : "Il checkout mostra il costo standard previsto per gli indirizzi coperti. Per un indirizzo specifico o condizioni particolari chiedi conferma su WhatsApp." },
    { question: `È possibile la consegna in giornata a ${area.name}?`, answer: "Non è garantita. Contattaci prima del pagamento per verificare disponibilità dei fiori, orario e zona." },
  ];
  const schema = [
    { "@context": "https://schema.org", "@type": "WebPage", "@id": `${canonical}#webpage`, url: canonical, name: area.title, description: area.description, inLanguage: "it-IT", isPartOf: {"@id":`${SITE_URL}/#website`}, about: {"@id":`${SITE_URL}/#business`} },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      {"@type":"ListItem", position:1, name:"Home", item:SITE_URL},
      {"@type":"ListItem", position:2, name:"Zone di consegna", item:`${SITE_URL}/zone-consegna`},
      {"@type":"ListItem", position:3, name:area.name, item:canonical},
    ]},
  ];
  const featured = products.filter((p) => ["rose-rosse-premium", "12-rose-rosse-premium", "peonie-rosa", "bouquet-eleganza"].includes(p.slug)).slice(0, 4);
  return <main className="min-h-screen bg-white text-[#1f1f1f]">
    <Header />
    {schema.map((json, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(json).replace(/</g,"\u003c")}} />)}
    <article>
      <section className="border-b border-black/10 bg-[#f8f6f2]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <nav className="mb-7 flex flex-wrap gap-2 text-sm text-neutral-600" aria-label="Percorso"><Link href="/">Home</Link><span>/</span><Link href="/zone-consegna">Zone di consegna</Link><span>/</span><span>{area.name}</span></nav>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8c6f5a]">{area.eyebrow}</p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">Consegna fiori a {area.name}: bouquet e rose online</h1>
            <p className="mt-6 text-lg leading-8 text-neutral-700">{area.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/bouquet" className="rounded-full bg-black px-7 py-4 font-semibold text-white">Scegli i bouquet</Link><a href="https://wa.me/393793718598?text=Ciao%2C%20vorrei%20verificare%20una%20consegna%20fiori" className="rounded-full border border-black px-7 py-4 font-semibold">Verifica su WhatsApp</a></div>
          </div>
          <Image src="/images/consegna-fiori-milano.jpg" width={1200} height={1000} alt={`Bouquet e fiori con consegna nella zona ${area.name}`} className="h-auto w-full rounded-[2rem] object-cover" />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-bold">Come organizzare la consegna a {area.name}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-black/10 p-7"><p className="font-semibold">1. Scegli i fiori</p><p className="mt-3 leading-7 text-neutral-600">Sfoglia rose, peonie e bouquet per compleanni, anniversari o ringraziamenti.</p></div>
          <div className="rounded-3xl border border-black/10 p-7"><p className="font-semibold">2. Indica la destinazione</p><p className="mt-3 leading-7 text-neutral-600">Controlla indirizzo, civico, CAP e recapito del destinatario.</p></div>
          <div className="rounded-3xl border border-black/10 p-7"><p className="font-semibold">3. Conferma le condizioni</p><p className="mt-3 leading-7 text-neutral-600">{area.type === "comune" ? "Per questo comune chiedi conferma di copertura e costo prima del pagamento." : "Per esigenze urgenti verifica la fascia disponibile prima del pagamento."}</p></div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2"><div className="rounded-3xl bg-neutral-50 p-8"><h2 className="text-2xl font-bold">Indicazioni per {area.name}</h2><p className="mt-4 leading-8 text-neutral-700">{area.context}</p></div><div className="rounded-3xl bg-neutral-50 p-8"><h2 className="text-2xl font-bold">Tempi e disponibilità</h2><p className="mt-4 leading-8 text-neutral-700">{area.logistics}</p></div></div>
      </section>
      <section className="border-y border-black/10 bg-[#faf9f7] py-16"><div className="mx-auto max-w-6xl px-6"><h2 className="text-3xl font-bold">Fiori da regalare</h2><p className="mt-3 text-neutral-600">Proposte dal nostro catalogo online; disponibilità da verificare per la data scelta.</p><div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{featured.map(product => <Link href={`/prodotti/${product.slug}`} key={product.slug} className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:shadow-md"><Image src={product.image} width={560} height={460} alt={product.name} className="aspect-[5/4] w-full object-cover"/><div className="p-5"><h3 className="font-bold">{product.name}</h3><p className="mt-2 text-sm text-neutral-600">Da €{getSizePrices(product.price).Piccolo.toFixed(2).replace(".", ",")}</p><span className="mt-3 inline-block text-sm font-semibold underline">Vedi il bouquet</span></div></Link>)}</div></div></section>
      <section className="mx-auto max-w-4xl px-6 py-16"><h2 className="text-3xl font-bold">Domande frequenti su {area.name}</h2><div className="mt-8 space-y-6">{faq.map(item=><div key={item.question}><h3 className="text-xl font-semibold">{item.question}</h3><p className="mt-2 leading-7 text-neutral-600">{item.answer}</p></div>)}</div></section>
      <section className="border-t border-black/10 py-14"><div className="mx-auto max-w-6xl px-6"><h2 className="text-2xl font-bold">Altre zone di consegna</h2><div className="mt-6 flex flex-wrap gap-3">{deliveryAreas.filter(other=>other.slug!==area.slug).map(other=><Link className="rounded-full border border-black/15 px-5 py-3 font-medium hover:bg-neutral-50" key={other.slug} href={deliveryAreaUrl(other)}>{other.name}</Link>)}<Link className="rounded-full border border-black/15 px-5 py-3 font-medium hover:bg-neutral-50" href="/zone-consegna">Tutte le zone</Link></div></div></section>
    </article>
    <Footer />
  </main>;
}
