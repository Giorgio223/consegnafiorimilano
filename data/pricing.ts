export const DELIVERY_FEE = 9.99;

export const PRODUCT_SIZES = ["Piccolo", "Medio", "Premium"] as const;
export type ProductSize = (typeof PRODUCT_SIZES)[number];

export function isProductSize(value: string | null | undefined): value is ProductSize {
  return PRODUCT_SIZES.includes(value as ProductSize);
}

export function getSizePrices(basePrice: number): Record<ProductSize, number> {
  return {
    Piccolo: Math.max(39.99, Number((basePrice - 15).toFixed(2))),
    Medio: Math.max(45.99, Number(basePrice.toFixed(2))),
    Premium: Math.max(64.99, Number((basePrice + 25).toFixed(2))),
  };
}

export function formatEur(value: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}
