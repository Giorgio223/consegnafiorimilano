import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDetails from "@/components/ProductDetails";
import { products, getProduct, getProductsByCategory } from "@/data/products";
import { formatEur, getSizePrices } from "@/data/pricing";
import { SITE_URL } from "@/lib/site";

const supported = new Set(["en", "ru"]);
const categoryMap: Record<string, string> = { rose: "Rose", peonie: "Peonie", tulipani: "Tulipani", girasoli: "Girasoli", orchidee: "Orchidee" };

const copy = {
  en: {
    homeTitle: "Flower Delivery Milan | Fresh Bouquets Delivered",
    homeDescription: "Order fresh flowers and bouquets online with delivery in Milan. Roses, peonies, tulips, orchids and same-day delivery requests subject to availability.",
    h1: "Fresh flower delivery in Milan",
    intro: "Order bouquets and fresh flowers online for birthdays, anniversaries and special occasions. Choose your arrangement, enter the recipient details and pay securely online.",
    cta: "Shop bouquets",
    deliveryTitle: "Flower delivery in Milan and nearby areas",
    deliveryText: "We deliver flowers across Milan. For urgent or same-day requests and addresses in the province of Milan, contact us to confirm availability before ordering.",
    howTitle: "How flower delivery works",
    howText: "Choose a bouquet, enter the recipient and delivery details, complete payment with Stripe and follow the order status from your personal tracking page.",
    bouquetTitle: "Bouquets with delivery in Milan",
    bouquetIntro: "Explore fresh bouquets for romantic surprises, birthdays, celebrations and elegant gifts in Milan.",
    discover: "View bouquet",
    from: "From",
    categoryTitle: (name: string) => `${name} delivery in Milan`,
    productSuffix: "with flower delivery in Milan",
  },
  ru: {
    homeTitle: "Доставка цветов в Милане | Свежие букеты на дом",
    homeDescription: "Закажите свежие цветы и букеты с доставкой по Милану. Розы, пионы, тюльпаны, орхидеи и срочная доставка при наличии возможности.",
    h1: "Доставка свежих цветов и букетов в Милане",
    intro: "Заказывайте букеты онлайн на день рождения, годовщину и другие важные события. Выберите композицию, укажите данные получателя и оплатите заказ онлайн.",
    cta: "Выбрать букет",
    deliveryTitle: "Доставка цветов по Милану и провинции",
    deliveryText: "Основная зона доставки — Милан. Для срочных заказов, доставки в тот же день и адресов в провинции свяжитесь с нами для подтверждения возможности доставки.",
    howTitle: "Как работает доставка цветов",
    howText: "Выберите букет, заполните данные получателя, оплатите через Stripe и отслеживайте статус заказа на персональной странице tracking.",
    bouquetTitle: "Букеты с доставкой по Милану",
    bouquetIntro: "Свежие букеты для романтических сюрпризов, дней рождения, праздников и красивых подарков в Милане.",
    discover: "Открыть букет",
    from: "От",
    categoryTitle: (name: string) => `${name}: доставка по Милану`,
    productSuffix: "с доставкой цветов по Милану",
  },
} as const;

function localeData(value: string): "en" | "ru" {
  if (!supported.has(value)) notFound();
  return value as "en" | "ru";
}


export async function generateMetadata({ params }: { params: Promise<{ locale: string; segments?: string[] }> }): Promise<Metadata> {
  const { locale: rawLocale, segments = [] } = await params;
  const locale = localeData(rawLocale);
  const t = copy[locale];
  const path = segments.join("/");
  const canonical = `/${locale}${path ? `/${path}` : ""}`;
  let title: string = t.homeTitle;
  let description: string = t.homeDescription;

  if (segments[0] === "bouquet") {
    title = t.bouquetTitle;
    description = t.bouquetIntro;
  } else if (segments[0] === "fiori" && segments[1] && categoryMap[segments[1]]) {
    title = t.categoryTitle(categoryMap[segments[1]]);
    description = `${categoryMap[segments[1]]} ${t.productSuffix}.`;
  } else if (segments[0] === "prodotti" && segments[1]) {
    const product = getProduct(segments[1]);
    if (!product) return { robots: { index: false, follow: false } };
    title = `${product.name} ${t.productSuffix}`;
    description = `${product.shortDescription} ${t.productSuffix}.`;
  } else if (segments[0] === "consegna-fiori-milano") {
    title = t.deliveryTitle;
    description = t.deliveryText;
  } else if (segments[0] === "come-funziona") {
    title = t.howTitle;
    description = t.howText;
  }

  const italianPath = path ? `/${path}` : "/";
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "it-IT": italianPath,
        "en": `/en${italianPath === "/" ? "" : italianPath}`,
        "ru": `/ru${italianPath === "/" ? "" : italianPath}`,
        "x-default": italianPath,
      },
    },
    openGraph: { title, description, url: canonical, locale: locale === "en" ? "en_GB" : "ru_RU", images: [{ url: "/images/hero-home.jpg" }] },
  };
}

function ProductGrid({ items, locale }: { items: typeof products; locale: "en" | "ru" }) {
  const t = copy[locale];
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {items.map((product) => (
        <article key={product.slug} className="overflow-hidden rounded-[2rem] border border-black/10 bg-white">
          <Image src={product.image} alt={`${product.name} ${t.productSuffix}`} width={1000} height={1000} className="aspect-square w-full object-cover" />
          <div className="p-6">
            <div className="flex items-start justify-between gap-4"><h2 className="text-2xl font-bold">{product.name}</h2><span className="whitespace-nowrap font-semibold">{t.from} {formatEur(getSizePrices(product.price).Piccolo)}</span></div>
            <p className="mt-4 leading-7 text-neutral-600">{locale === "en" ? `Fresh ${product.category.toLowerCase()} arrangement designed for gifts and special occasions in Milan.` : `Свежая композиция категории ${product.category} для подарков и особых случаев с доставкой по Милану.`}</p>
            <Link href={`/${locale}/prodotti/${product.slug}`} className="mt-6 block rounded-full bg-black px-6 py-4 text-center font-semibold text-white">{t.discover}</Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export default async function LocalizedPage({ params }: { params: Promise<{ locale: string; segments?: string[] }> }) {
  const { locale: rawLocale, segments = [] } = await params;
  const locale = localeData(rawLocale);
  const t = copy[locale];

  if (segments[0] === "prodotti" && segments[1]) {
    const product = getProduct(segments[1]);
    if (!product) notFound();
    const localizedProduct = { ...product, description: locale === "en" ? `${product.name} is a fresh floral arrangement prepared for birthdays, anniversaries, romantic surprises and other special occasions, with delivery available in Milan.` : `${product.name} — свежая цветочная композиция для дней рождения, годовщин, романтических сюрпризов и других особых случаев с доставкой по Милану.` };
    return <main className="min-h-screen bg-white text-[#1f1f1f]"><Header /><ProductDetails product={localizedProduct} locale={locale} /><Footer /></main>;
  }

  let heading: string = t.h1;
  let intro: string = t.intro;
  let items = products.slice(0, 6);
  let showGrid = true;

  if (segments[0] === "bouquet") {
    heading = t.bouquetTitle; intro = t.bouquetIntro; items = getProductsByCategory("Bouquet");
  } else if (segments[0] === "fiori" && segments[1] && categoryMap[segments[1]]) {
    const category = categoryMap[segments[1]]; heading = t.categoryTitle(category); intro = `${category} ${t.productSuffix}.`; items = getProductsByCategory(category);
  } else if (segments[0] === "consegna-fiori-milano") {
    heading = t.deliveryTitle; intro = t.deliveryText; showGrid = false;
  } else if (segments[0] === "come-funziona") {
    heading = t.howTitle; intro = t.howText; showGrid = false;
  } else if (segments.length > 0) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: heading,
    description: intro,
    url: `${SITE_URL}/${locale}${segments.length ? `/${segments.join("/")}` : ""}`,
    inLanguage: locale === "en" ? "en" : "ru",
  };

  return (
    <main className="min-h-screen bg-white text-[#1f1f1f]">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8c6f5a]">Consegna Fiori Milano</p>
          <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl">{heading}</h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-neutral-600">{intro}</p>
          <Link href={`/${locale}/bouquet`} className="mt-9 inline-block rounded-full bg-black px-8 py-4 font-semibold text-white">{t.cta}</Link>
        </div>
      </section>
      {showGrid ? (
        <section className="py-20"><div className="mx-auto max-w-7xl px-6"><ProductGrid items={items} locale={locale} /></div></section>
      ) : (
        <section className="py-20"><div className="mx-auto grid max-w-5xl gap-6 px-6 md:grid-cols-2"><article className="rounded-[2rem] border border-black/10 p-8"><h2 className="text-3xl font-bold">{t.deliveryTitle}</h2><p className="mt-5 text-lg leading-8 text-neutral-600">{t.deliveryText}</p></article><article className="rounded-[2rem] border border-black/10 p-8"><h2 className="text-3xl font-bold">{t.howTitle}</h2><p className="mt-5 text-lg leading-8 text-neutral-600">{t.howText}</p></article></div></section>
      )}
      <Footer />
    </main>
  );
}
