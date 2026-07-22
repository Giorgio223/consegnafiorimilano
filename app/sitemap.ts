import type { MetadataRoute } from "next";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://consegnafiorimilano.it";
  const staticRoutes = ["", "/bouquet", "/come-funziona", "/consegna-fiori-milano", "/fiori/rose", "/fiori/peonie", "/fiori/tulipani", "/fiori/girasoli", "/fiori/orchidee"];
  return [
    ...staticRoutes.map((route, index) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: index === 0 ? "daily" as const : "weekly" as const, priority: index === 0 ? 1 : 0.8 })),
    ...products.map((product) => ({ url: `${base}/prodotti/${product.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 })),
  ];
}
