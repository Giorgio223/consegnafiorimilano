export const DELIVERY_SLOTS = {
  morning: { label: "09:00–15:00", surcharge: 0 },
  afternoon: { label: "15:00–20:00", surcharge: 0 },
  evening: { label: "20:00–23:00", surcharge: 10 },
} as const;

export type DeliverySlot = keyof typeof DELIVERY_SLOTS;
export function isDeliverySlot(value: unknown): value is DeliverySlot {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(DELIVERY_SLOTS, value);
}
