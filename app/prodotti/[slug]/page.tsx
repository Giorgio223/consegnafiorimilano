import type { Metadata } from "next";
import Link from "next/link";
import { deliveryAreas, deliveryAreaUrl } from "@/data/delivery-areas";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDetails from "@/components/ProductDetails";
import { getProduct, products } from "@/data/products";
import { getSizePrices } from "@/data/pricing";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Prodotto non trovato", robots: { index: false, follow: false } };
  const targetedTitles: Record<string, string> = {
    "rose-rosse-premium": "Rose Rosse Milano | Bouquet di Rose a Domicilio",
    "12-rose-rosse-premium": "12 Rose Rosse Milano | Consegna a Domicilio",
    "peonie-rosa": "Peonie Rosa Milano | Bouquet con Consegna",
  };
  const targetedDescriptions: Record<string, string> = {
    "rose-rosse-premium": "Cerchi rose rosse a Milano? Scopri Rose Rosse Premium, prezzi e formati disponibili. Ordina online con consegna a domicilio secondo disponibilità.",
    "12-rose-rosse-premium": "Regala 12 rose rosse a Milano: scopri la composizione e scegli la dimensione. Ordine online e consegna a domicilio in base a data e disponibilità.",
    "peonie-rosa": "Bouquet di peonie rosa a Milano: scopri foto, prezzi e dimensioni disponibili. Ordina online con consegna a domicilio secondo disponibilità stagionale.",
  };
  const title = targetedTitles[product.slug] ?? `${product.name} a Milano | Consegna a Domicilio`;
  return {
    title: { absolute: title },
    description: targetedDescriptions[product.slug] ?? `${product.shortDescription} Ordina ${product.name.toLowerCase()} online con consegna a domicilio a Milano.`,
    alternates: {
      canonical: `/prodotti/${product.slug}`,
      languages: {
        "it-IT": `/prodotti/${product.slug}`,
        en: `/en/prodotti/${product.slug}`,
        ru: `/ru/prodotti/${product.slug}`,
        "x-default": `/prodotti/${product.slug}`,
      },
    },
    openGraph: { title, description: product.shortDescription, url: `/prodotti/${product.slug}`, images: [{ url: product.image, alt: `${product.name} con consegna a Milano` }] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const prices = getSizePrices(product.price);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [`${SITE_URL}${product.image}`],
    description: product.description,
    brand: { "@type": "Brand", name: "Consegna Fiori Milano" },
    offers: { "@type": "AggregateOffer", priceCurrency: "EUR", lowPrice: prices.Piccolo, highPrice: prices.Premium, offerCount: 3, availability: "https://schema.org/InStock", url: `${SITE_URL}/prodotti/${product.slug}` },
  };
  return <main className="min-h-screen bg-white text-[#1f1f1f]"><Header /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /><ProductDetails product={product} />
    <section className="border-t border-black/10 bg-neutral-50 py-12"><div className="mx-auto max-w-6xl px-6"><h2 className="text-2xl font-bold">Consegna di {product.name.toLowerCase()} a Milano e dintorni</h2><p className="mt-3 leading-7 text-neutral-600">Verifica la disponibilità della consegna per il tuo indirizzo. Per i comuni fuori Milano, conferma copertura e costo prima di pagare.</p><div className="mt-6 flex flex-wrap gap-3">{deliveryAreas.map(area=><Link key={area.slug} href={deliveryAreaUrl(area)} className="rounded-full border border-black/15 bg-white px-4 py-3 text-sm font-semibold hover:border-black">{area.name}</Link>)}<Link href="/zone-consegna" className="rounded-full border border-black/15 bg-white px-4 py-3 text-sm font-semibold hover:border-black">Zone di consegna</Link></div></div></section>
    <Footer /></main>;
}
