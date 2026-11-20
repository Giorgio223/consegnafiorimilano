import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { deliveryAreas, deliveryAreaUrl } from "@/data/delivery-areas";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Zone di Consegna Fiori Milano | Quartieri e Comuni" },
  description: "Scopri le zone di consegna fiori a Milano: Porta Romana, Rogoredo e richieste per Rozzano e San Giuliano Milanese. Verifica copertura e disponibilità.",
  alternates: {canonical: "/zone-consegna"},
};
export default function ZoneConsegna() {
  const breadcrumb = {"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:SITE_URL},{"@type":"ListItem",position:2,name:"Zone di consegna",item:`${SITE_URL}/zone-consegna`}]};
  return <main className="min-h-screen bg-white text-[#1f1f1f]"><Header/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb)}}/><section className="mx-auto max-w-6xl px-6 py-20"><nav className="text-sm text-neutral-500"><Link href="/">Home</Link> / Zone di consegna</nav><h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl">Zone di consegna fiori a Milano e dintorni</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-600">Scegli online rose e bouquet e consulta le informazioni sulle destinazioni. Copertura, orario e costo vanno verificati per l’indirizzo specifico, soprattutto fuori Milano.</p><div className="mt-12 grid gap-6 md:grid-cols-2">{deliveryAreas.map(area=><article key={area.slug} className="rounded-3xl border border-black/10 p-8"><p className="text-sm font-semibold uppercase tracking-widest text-[#8c6f5a]">{area.type === "comune" ? "Comune fuori Milano" : "Quartiere di Milano"}</p><h2 className="mt-3 text-2xl font-bold"><Link href={deliveryAreaUrl(area)} className="hover:underline">Consegna fiori {area.name}</Link></h2><p className="mt-4 leading-7 text-neutral-600">{area.description}</p><Link href={deliveryAreaUrl(area)} className="mt-6 inline-block font-semibold underline underline-offset-4">Scopri la zona</Link></article>)}</div><div className="mt-12 rounded-3xl bg-neutral-50 p-8"><h2 className="text-2xl font-bold">Non trovi il tuo indirizzo?</h2><p className="mt-3 leading-7 text-neutral-600">Contattaci su WhatsApp con CAP, indirizzo e data preferita prima di ordinare: ti confermeremo la possibilità e il prezzo della consegna.</p><a className="mt-5 inline-block rounded-full bg-black px-7 py-4 font-semibold text-white" href="https://wa.me/393793718598">Richiedi disponibilità</a></div></section><Footer/></main>;
}
