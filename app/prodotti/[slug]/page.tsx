import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDetails from "@/components/ProductDetails";
import { getProduct, products } from "@/data/products";
import { getSizePrices } from "@/data/pricing";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Prodotto non trovato", robots: { index: false, follow: false } };
  const title = `${product.name} a Milano | Consegna a Domicilio`;
  return {
    title,
    description: `${product.shortDescription} Ordina ${product.name.toLowerCase()} online con consegna a domicilio a Milano.`,
    alternates: { canonical: `/prodotti/${product.slug}` },
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
    image: [product.image],
    description: product.description,
    brand: { "@type": "Brand", name: "Consegna Fiori Milano" },
    offers: { "@type": "AggregateOffer", priceCurrency: "EUR", lowPrice: prices.Piccolo, highPrice: prices.Premium, offerCount: 3, availability: "https://schema.org/InStock", url: `https://consegnafiorimilano.it/prodotti/${product.slug}` },
  };
  return <main className="min-h-screen bg-white text-[#1f1f1f]"><Header /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /><ProductDetails product={product} /><Footer /></main>;
}
