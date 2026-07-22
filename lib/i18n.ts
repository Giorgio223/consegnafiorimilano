export type Locale = "it" | "en" | "ru";

export const locales: Locale[] = ["it", "en", "ru"];

export function localeFromPath(pathname: string): Locale {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/ru" || pathname.startsWith("/ru/")) return "ru";
  return "it";
}

export function stripLocale(pathname: string) {
  if (pathname === "/en" || pathname === "/ru") return "/";
  if (pathname.startsWith("/en/") || pathname.startsWith("/ru/")) return pathname.slice(3) || "/";
  return pathname;
}

export function withLocale(pathname: string, locale: Locale) {
  const clean = stripLocale(pathname);
  return locale === "it" ? clean : `/${locale}${clean === "/" ? "" : clean}`;
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
