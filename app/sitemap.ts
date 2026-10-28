import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { seoLandingPages } from "@/data/seo-pages";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/bouquet", "/come-funziona", "/consegna-fiori-milano", "/fiori/rose", "/fiori/peonie", "/fiori/tulipani", "/fiori/girasoli", "/fiori/orchidee", "/politica-resi", "/privacy-policy"];

  const italian = [
    ...staticRoutes.map((route, index) => ({
      url: `${SITE_URL}${route}`,
      changeFrequency: index === 0 ? "daily" as const : "weekly" as const,
      priority: index === 0 ? 1 : 0.8,
      alternates: ["/politica-resi", "/privacy-policy"].includes(route) ? undefined : { languages: { it: `${SITE_URL}${route}`, en: `${SITE_URL}/en${route}`, ru: `${SITE_URL}/ru${route}` } },
    })),
    ...products.map((product) => ({
      url: `${SITE_URL}/prodotti/${product.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      alternates: { languages: { it: `${SITE_URL}/prodotti/${product.slug}`, en: `${SITE_URL}/en/prodotti/${product.slug}`, ru: `${SITE_URL}/ru/prodotti/${product.slug}` } },
    })),
    ...seoLandingPages.map((page) => ({
      url: `${SITE_URL}/servizi/${page.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];

  const localizedRoutes = [
    ...staticRoutes.filter((route) => !["/politica-resi", "/privacy-policy"].includes(route)),
    ...products.map((product) => `/prodotti/${product.slug}`),
  ];
  const localized = (["en", "ru"] as const).flatMap((locale) => localizedRoutes.map((route, index) => ({
    url: `${SITE_URL}/${locale}${route}`,
    changeFrequency: index === 0 ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 0.85 : route.startsWith("/prodotti/") ? 0.55 : 0.65,
  })));

  return [...italian, ...localized, {url: `${SITE_URL}/en/return-policy`, priority: 0.3}, {url: `${SITE_URL}/ru/return-policy`, priority: 0.3}];
}
