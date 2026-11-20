import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { seoLandingPages } from "@/data/seo-pages";
import { deliveryAreas, deliveryAreaUrl } from "@/data/delivery-areas";
import { locales, languageAlternates, withLocale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/bouquet", "/come-funziona", "/consegna-fiori-milano", "/fiori/rose", "/fiori/peonie", "/fiori/tulipani", "/fiori/girasoli", "/fiori/orchidee", "/politica-resi", "/privacy-policy", "/zone-consegna"];

  // Only routes implemented for every language are included in language clusters.
  const translatedRoutes = [
    ...staticRoutes.filter((route) => !["/politica-resi", "/privacy-policy", "/zone-consegna"].includes(route)),
    ...products.map((product) => `/prodotti/${product.slug}`),
  ];
  const localized = translatedRoutes.flatMap((route) => locales.map((locale) => ({
    url: `${SITE_URL}${withLocale(route || "/", locale) === "/" ? "" : withLocale(route, locale)}`,
    changeFrequency: "weekly" as const,
    priority: locale === "it" ? (route === "" ? 1 : 0.8) : 0.65,
    alternates: { languages: Object.fromEntries(Object.entries(languageAlternates(route || "/")).map(([key, path]) => [key, `${SITE_URL}${path === "/" ? "" : path}`])) },
  })));
  return [
    ...localized,
    ...["/politica-resi", "/privacy-policy", "/zone-consegna"].map((path) => ({url: `${SITE_URL}${path}`, changeFrequency: "monthly" as const, priority: 0.3})),
    ...deliveryAreas.map((area) => ({ url: `${SITE_URL}${deliveryAreaUrl(area)}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...seoLandingPages.map((page) => ({ url: `${SITE_URL}/servizi/${page.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...["en", "ru"].map((locale) => ({ url: `${SITE_URL}/${locale}/return-policy`, priority: 0.3 })),
  ];
}
