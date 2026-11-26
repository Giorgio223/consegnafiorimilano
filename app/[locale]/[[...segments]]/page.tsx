import TrustStrip from "@/components/TrustStrip";
import LandingPage,{landingMetadata} from "@/components/LandingPage";
import {getTopic} from "@/data/landing-topics";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import SeoFaq from "@/components/SeoFaq";
import ReviewsSection from "@/components/ReviewsSection";
import BenefitsSection from "@/components/BenefitsSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import AboutSection from "@/components/AboutSection";
import { trustText } from "@/lib/seo-content";
import Footer from "@/components/Footer";
import ProductDetails from "@/components/ProductDetails";
import { products, getProduct, getProductsByCategory } from "@/data/products";
import { formatEur, getSizePrices } from "@/data/pricing";
import { SITE_URL } from "@/lib/site";
import { languageAlternates, type Locale, ui } from "@/lib/i18n";

const supported = new Set(["en", "de", "es", "fr", "ru"]);
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
  de: {
    homeTitle: "Blumenlieferung Mailand | Frische Blumensträuße online",
    homeDescription: "Blumenlieferung in Mailand: Rosen, Pfingstrosen und frische Sträuße online bestellen. Zustellung am selben Tag auf Anfrage und nach Verfügbarkeit.",
    h1: "Frische Blumenlieferung in Mailand", intro: "Blumensträuße für Geburtstage, Jubiläen und besondere Momente online bestellen. Wählen Sie einen Strauß und bezahlen Sie sicher online.",
    cta: "Blumensträuße entdecken", deliveryTitle: "Blumenlieferung in Mailand und Umgebung", deliveryText: "Wir liefern Blumen in Mailand. Für dringende Bestellungen und Lieferungen außerhalb der Stadt bestätigen wir Verfügbarkeit und Lieferzeit auf Anfrage.",
    howTitle: "So funktioniert die Blumenlieferung", howText: "Strauß auswählen, Empfänger und Lieferadresse eingeben, sicher mit Stripe bezahlen und den Bestellstatus verfolgen.",
    bouquetTitle: "Blumensträuße mit Lieferung in Mailand", bouquetIntro: "Entdecken Sie frische Sträuße für Geburtstage, Überraschungen und besondere Anlässe.", discover: "Strauß ansehen", from: "Ab", categoryTitle: (name: string) => `${name} mit Lieferung in Mailand`, productSuffix: "mit Blumenlieferung in Mailand",
  },
  es: {
    homeTitle: "Envío de flores Milán | Ramos frescos a domicilio", homeDescription: "Envío de flores a Milán. Compra rosas, peonías y ramos online con entrega a domicilio. Entrega en el mismo día según disponibilidad.",
    h1: "Envío de flores frescas a Milán", intro: "Pide flores online para cumpleaños, aniversarios y ocasiones especiales. Elige tu ramo y paga de forma segura.",
    cta: "Ver ramos", deliveryTitle: "Entrega de flores en Milán y alrededores", deliveryText: "Entregamos flores en Milán. Para pedidos urgentes o fuera de la ciudad, confirma la disponibilidad y los horarios antes de pagar.",
    howTitle: "Cómo funciona el envío de flores", howText: "Elige el ramo, introduce los datos de entrega, paga con Stripe y consulta el seguimiento del pedido.",
    bouquetTitle: "Ramos con entrega en Milán", bouquetIntro: "Explora ramos frescos para sorpresas románticas, celebraciones y regalos.", discover: "Ver ramo", from: "Desde", categoryTitle: (name: string) => `${name} con envío a Milán`, productSuffix: "con entrega de flores en Milán",
  },
  fr: {
    homeTitle: "Livraison de fleurs Milan | Bouquets frais à domicile", homeDescription: "Livraison de fleurs à Milan : roses, pivoines et bouquets frais en ligne. Livraison le jour même sur demande selon disponibilité.",
    h1: "Livraison de fleurs fraîches à Milan", intro: "Commandez des bouquets pour les anniversaires, fêtes et surprises. Choisissez vos fleurs et payez en ligne en toute sécurité.",
    cta: "Découvrir les bouquets", deliveryTitle: "Livraison de fleurs à Milan et aux environs", deliveryText: "Livraison de fleurs à Milan. Pour les demandes urgentes ou hors de la ville, contactez-nous pour confirmer la disponibilité.",
    howTitle: "Comment fonctionne la livraison", howText: "Choisissez un bouquet, renseignez l'adresse de livraison, payez via Stripe et suivez votre commande.",
    bouquetTitle: "Bouquets livrés à Milan", bouquetIntro: "Des bouquets frais pour vos cadeaux, fêtes et attentions romantiques.", discover: "Voir le bouquet", from: "À partir de", categoryTitle: (name: string) => `${name} livrées à Milan`, productSuffix: "avec livraison de fleurs à Milan",
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

function localeData(value: string): Exclude<Locale, "it"> {
  if (!supported.has(value)) notFound();
  return value as Exclude<Locale, "it">;
}


export async function generateMetadata({ params }: { params: Promise<{ locale: string; segments?: string[] }> }): Promise<Metadata> {
  const { locale: rawLocale, segments = [] } = await params;
  const locale = localeData(rawLocale);
  const t = copy[locale];
  const path = segments.join("/");
  if(segments.length===2&&segments[0]==="servizi"){const topic=getTopic(segments[1]);if(topic)return landingMetadata(topic,locale);}
  // Do not advertise nonexistent localized routes as indexable pages.
  const validRoute = (segments.length === 1 && ["chi-siamo","recensioni"].includes(segments[0])) || segments.length === 0 ||
    (segments.length === 1 && ["bouquet", "come-funziona", "consegna-fiori-milano"].includes(segments[0])) ||
    (segments.length === 2 && segments[0] === "fiori" && Boolean(categoryMap[segments[1]])) ||
    (segments.length === 2 && segments[0] === "prodotti" && Boolean(getProduct(segments[1])));
  if (!validRoute) return { robots: { index: false, follow: false } };
  const canonical = `/${locale}${path ? `/${path}` : ""}`;
  let title: string = t.homeTitle;
  let description: string = `${t.homeDescription} ${trustText[locale].since}`;

  if (segments[0] === "chi-siamo") { title = trustText[locale].about; description = trustText[locale].since; }
  else if (segments[0] === "recensioni") { title = trustText[locale].reviews; description = trustText[locale].reviewsLead; }
  else if (segments[0] === "bouquet") {
    title = t.bouquetTitle;
    description = t.bouquetIntro;
  } else if (segments[0] === "fiori" && segments[1] && categoryMap[segments[1]]) {
    const catIndex = Object.keys(categoryMap).indexOf(segments[1]);
    const categoryName = ui[locale].categories[catIndex]?.[0] || categoryMap[segments[1]];
    title = t.categoryTitle(categoryName);
    description = `${categoryName} ${t.productSuffix}.`;
  } else if (segments[0] === "prodotti" && segments[1]) {
    const product = getProduct(segments[1]);
    if (!product) return { robots: { index: false, follow: false } };
    title = `${product.name} ${t.productSuffix}`;
    description = `${product.name} ${t.productSuffix}. ${t.bouquetIntro}`;
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
      languages: languageAlternates(italianPath),
    },
    openGraph: { title, description, url: canonical, locale: ({ en: "en_GB", de: "de_DE", es: "es_ES", fr: "fr_FR", ru: "ru_RU" } as const)[locale], images: [{ url: "/images/hero-home.webp" }] },
  };
}

function ProductGrid({ items, locale }: { items: typeof products; locale: Exclude<Locale, "it"> }) {
  const t = copy[locale];
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {items.map((product) => (
        <article key={product.slug} className="overflow-hidden rounded-[2rem] border border-black/10 bg-white">
          <Image src={product.image} alt={`${product.name} ${t.productSuffix}`} width={1000} height={1000} className="aspect-square w-full object-cover" loading="lazy"
                   title={`${product.name} - fiori e bouquet a Milano`} />
          <div className="p-6">
            <div className="flex items-start justify-between gap-4"><h2 className="text-2xl font-bold">{product.name}</h2><span className="whitespace-nowrap font-semibold">{t.from} {formatEur(getSizePrices(product.price).Piccolo)}</span></div>
            <p className="mt-4 leading-7 text-neutral-600">{`${t.categoryTitle(ui[locale].categories.find((_, i) => ["Rose", "Peonie", "Tulipani", "Girasoli", "Orchidee"][i] === product.category)?.[0] || product.category)}.`}</p>
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
  if(segments.length===2&&segments[0]==="servizi"){const topic=getTopic(segments[1]);if(!topic)notFound();return <LandingPage topic={topic} locale={locale}/>;} 

  if (segments.length===1 && segments[0]==="chi-siamo") return <main><Header/><Breadcrumbs locale={locale} items={[{label:trustText[locale].about,path:"/chi-siamo"}]}/><AboutSection locale={locale}/><Footer/></main>;
  if (segments.length===1 && segments[0]==="recensioni") return <main><Header/><Breadcrumbs locale={locale} items={[{label:trustText[locale].reviews,path:"/recensioni"}]}/><h1 className="mx-auto max-w-6xl px-6 pt-14 text-4xl font-bold">{trustText[locale].reviews}</h1><ReviewsSection locale={locale}/><Footer/></main>;
  if (segments[0] === "prodotti" && segments[1]) {
    const product = getProduct(segments[1]);
    if (!product) notFound();
    const localizedProduct = { ...product, description: `${product.name} — ${t.productSuffix}. ${t.bouquetIntro}` };
    const schema={"@context":"https://schema.org","@type":"Product",name:product.name,description:localizedProduct.description,image:[SITE_URL+product.image],offers:{ "@type":"AggregateOffer",priceCurrency:"EUR",lowPrice:getSizePrices(product.price).Piccolo,highPrice:getSizePrices(product.price).Premium,offerCount:3,url:SITE_URL+"/"+locale+"/prodotti/"+product.slug}};
    return <main className="min-h-screen bg-white text-[#1f1f1f]"><Header /><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/><ProductDetails product={localizedProduct} locale={locale} /><Footer /></main>;
  }

  let heading: string = t.h1;
  let intro: string = t.intro;
  let items = products.slice(0, 6);
  let showGrid = true;

  if (segments[0] === "bouquet") {
    heading = t.bouquetTitle; intro = t.bouquetIntro; items = getProductsByCategory("Bouquet");
  } else if (segments[0] === "fiori" && segments[1] && categoryMap[segments[1]]) {
    const category = categoryMap[segments[1]]; const catIndex = Object.keys(categoryMap).indexOf(segments[1]); const categoryName = ui[locale].categories[catIndex]?.[0] || category; heading = t.categoryTitle(categoryName); intro = `${categoryName} ${t.productSuffix}.`; items = getProductsByCategory(category);
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
    inLanguage: locale,
  };

  return (
    <main className="min-h-screen bg-white text-[#1f1f1f]">
      <Header />
      {segments.length>0 && <Breadcrumbs locale={locale} items={[{label:heading,path:`/${segments.join("/")}`}]} />}
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
      {segments.length===0 && <><TrustStrip locale={locale}/><BenefitsSection locale={locale}/></>}
      <SeoFaq locale={locale} />
      <Footer />
    </main>
  );
}
