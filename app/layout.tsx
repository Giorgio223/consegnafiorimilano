import type { Metadata } from "next";
import "./globals.css";
import WhatsAppShare from "@/components/WhatsAppShare";

const siteUrl = "https://consegnafiorimilano.it";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Consegna Fiori Milano | Fiori a Domicilio e in Giornata",
    template: "%s | Consegna Fiori Milano",
  },
  description:
    "Consegna fiori a Milano e fiori a domicilio: bouquet, rose e composizioni floreali ordinabili online. Scopri il servizio di consegna fiori a Milano anche per regali e occasioni speciali.",
  keywords: [
    "consegna fiori Milano",
    "consegna fiori in giornata Milano",
    "fiori Milano",
    "fiori a Milano",
    "consegna fiori a domicilio Milano",
    "fiori a domicilio Milano",
    "bouquet Milano",
    "fioraio online Milano",
  ],
  applicationName: "Consegna Fiori Milano",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Consegna Fiori Milano | Fiori a Domicilio",
    description: "Bouquet e fiori a Milano con consegna a domicilio.",
    url: siteUrl,
    siteName: "Consegna Fiori Milano",
    locale: "it_IT",
    type: "website",
    images: [{ url: "/images/logo.png", alt: "Consegna Fiori Milano" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Consegna Fiori Milano",
    description: "Ordina fiori online con consegna a domicilio a Milano.",
    images: ["/images/logo.png"],
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
        name: "Consegna Fiori Milano",
        url: siteUrl,
        inLanguage: "it-IT",
      },
      {
        "@type": "Florist",
        name: "Consegna Fiori Milano",
        url: siteUrl,
        image: `${siteUrl}/images/logo.png`,
        telephone: "+39 379 371 8598",
        areaServed: { "@type": "City", name: "Milano" },
        priceRange: "€€",
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
