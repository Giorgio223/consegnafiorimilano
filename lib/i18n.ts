export type Locale = "it" | "en" | "de" | "es" | "fr" | "ru";

export const locales: Locale[] = ["it", "en", "de", "es", "fr", "ru"];

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && locales.includes(value as Locale);
}

export function localeFromPath(pathname: string): Locale {
  const first = pathname.split("/")[1];
  return isLocale(first) ? first : "it";
}

export function stripLocale(pathname: string): string {
  const first = pathname.split("/")[1];
  return isLocale(first) ? pathname.slice(first.length + 1) || "/" : pathname;
}

export function withLocale(pathname: string, locale: Locale): string {
  const clean = stripLocale(pathname);
  return locale === "it" ? clean : `/${locale}${clean === "/" ? "" : clean}`;
}

export const languageLabels: Record<Locale, string> = {
  it: "Italiano", en: "English", de: "Deutsch", es: "Español", fr: "Français", ru: "Русский",
};

export const seoTerms: Record<Locale, string> = {
  it: "Consegna fiori Milano", en: "Flower delivery Milan", de: "Blumenlieferung Mailand",
  es: "Envío de flores Milán", fr: "Livraison de fleurs Milan", ru: "Доставка цветов в Милане",
};

export function languageAlternates(pathname: string): Record<string, string> {
  const result: Record<string, string> = { "x-default": withLocale(pathname, "it") };
  for (const locale of locales) result[locale === "it" ? "it-IT" : locale] = withLocale(pathname, locale);
  return result;
}

export const ui = {
  it: {
    bouquet: "Bouquet",
    flowers: "Fiori",
    how: "Come funziona",
    delivery: "Consegna a Milano",
    order: "Ordina ora",
    menu: "Menu",
    categories: [
      ["Rose", "Rose romantiche e composizioni"],
      ["Peonie", "Bouquet eleganti e raffinati"],
      ["Tulipani", "Tulipani freschi e colorati"],
      ["Girasoli", "Bouquet luminosi e solari"],
      ["Orchidee", "Regali eleganti e premium"],
    ],
  },
  en: {
    bouquet: "Bouquets",
    flowers: "Flowers",
    how: "How it works",
    delivery: "Delivery in Milan",
    order: "Order now",
    menu: "Menu",
    categories: [
      ["Roses", "Romantic roses and arrangements"],
      ["Peonies", "Elegant and refined bouquets"],
      ["Tulips", "Fresh and colourful tulips"],
      ["Sunflowers", "Bright and sunny bouquets"],
      ["Orchids", "Elegant premium gifts"],
    ],
  },
  de: {
    bouquet: "Blumensträuße", flowers: "Blumen", how: "So funktioniert es", delivery: "Lieferung in Mailand", order: "Jetzt bestellen", menu: "Menü",
    categories: [["Rosen", "Romantische Rosen und Arrangements"], ["Pfingstrosen", "Elegante Blumensträuße"], ["Tulpen", "Frische, bunte Tulpen"], ["Sonnenblumen", "Strahlende Blumensträuße"], ["Orchideen", "Elegante Geschenke"]],
  },
  es: {
    bouquet: "Ramos", flowers: "Flores", how: "Cómo funciona", delivery: "Entrega en Milán", order: "Pedir ahora", menu: "Menú",
    categories: [["Rosas", "Rosas y arreglos románticos"], ["Peonías", "Ramos elegantes"], ["Tulipanes", "Tulipanes frescos y coloridos"], ["Girasoles", "Ramos llenos de luz"], ["Orquídeas", "Regalos elegantes"]],
  },
  fr: {
    bouquet: "Bouquets", flowers: "Fleurs", how: "Comment ça marche", delivery: "Livraison à Milan", order: "Commander", menu: "Menu",
    categories: [["Roses", "Roses et compositions romantiques"], ["Pivoines", "Bouquets élégants"], ["Tulipes", "Tulipes fraîches et colorées"], ["Tournesols", "Bouquets lumineux"], ["Orchidées", "Cadeaux raffinés"]],
  },
  ru: {
    bouquet: "Букеты",
    flowers: "Цветы",
    how: "Как это работает",
    delivery: "Доставка по Милану",
    order: "Заказать",
    menu: "Меню",
    categories: [
      ["Розы", "Романтические розы и композиции"],
      ["Пионы", "Элегантные и изысканные букеты"],
      ["Тюльпаны", "Свежие и яркие тюльпаны"],
      ["Подсолнухи", "Солнечные яркие букеты"],
      ["Орхидеи", "Элегантные премиальные подарки"],
    ],
  },
} as const;
