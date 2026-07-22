import type { Metadata } from "next";
import "./globals.css";
import WhatsAppShare from "@/components/WhatsAppShare";
import { SEO_KEYWORDS, SITE_NAME, SITE_URL, WHATSAPP_NUMBER, BUSINESS_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Consegna Fiori Milano | Fiori a Domicilio e in Giornata",
    template: "%s | Consegna Fiori Milano",
  },
  description:
    "Consegna fiori a Milano: bouquet, rose e composizioni floreali con ordine online, consegna a domicilio e richieste in giornata secondo disponibilità.",
  keywords: SEO_KEYWORDS,
  applicationName: SITE_NAME,
  category: "flower delivery",
  alternates: {
    canonical: "/",
    languages: {
      "it-IT": "/",
      "en": "/en",
      "ru": "/ru",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Consegna Fiori Milano | Fiori a Domicilio",
    description: "Bouquet e fiori freschi con consegna a domicilio a Milano.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "it_IT",
    alternateLocale: ["en_GB", "ru_RU"],
    type: "website",
    images: [{ url: "/images/hero-home.jpg", width: 1200, height: 1500, alt: "Bouquet di fiori freschi con consegna a Milano" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: "Ordina fiori online con consegna a domicilio a Milano.",
    images: ["/images/hero-home.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: ["it-IT", "en", "ru"],
      },
      {
        "@type": ["Florist", "LocalBusiness"],
        "@id": `${SITE_URL}/#business`,
        name: SITE_NAME,
        url: SITE_URL,
        image: `${SITE_URL}/images/logo.png`,
        logo: `${SITE_URL}/images/logo.png`,
        telephone: WHATSAPP_NUMBER,
        email: BUSINESS_EMAIL,
        areaServed: [
          { "@type": "City", name: "Milano" },
          { "@type": "AdministrativeArea", name: "Città metropolitana di Milano" },
        ],
        priceRange: "€€",
        currenciesAccepted: "EUR",
        paymentAccepted: "Credit Card, Apple Pay, Google Pay",
      },
    ],
  };
  return (
    <html lang="it">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
        {children}
        <WhatsAppShare />
      </body>
    </html>
  );
}
