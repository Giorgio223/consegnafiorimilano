export const ORDER_STATUSES = [
  "received",
  "preparing",
  "courier_notified",
  "out_for_delivery",
  "delivered",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export function isOrderStatus(value: unknown): value is OrderStatus {
  return typeof value === "string" && ORDER_STATUSES.includes(value as OrderStatus);
}

export const trackingCopy = {
  it: {
    title: "Stato della consegna",
    labels: {
      received: ["Ordine ricevuto", "Pagamento confermato e ordine registrato"],
      preparing: ["In preparazione", "Il bouquet viene preparato con cura"],
      courier_notified: ["Corriere avvisato", "La consegna è stata affidata al corriere"],
      out_for_delivery: ["In consegna", "Il tuo ordine è in viaggio"],
      delivered: ["Consegnato", "Consegna completata"],
    },
  },
  en: {
    title: "Delivery status",
    labels: {
      received: ["Order received", "Payment confirmed and order registered"],
      preparing: ["Preparing", "Your bouquet is being prepared with care"],
      courier_notified: ["Courier notified", "The delivery has been assigned to the courier"],
      out_for_delivery: ["Out for delivery", "Your order is on the way"],
      delivered: ["Delivered", "Delivery completed"],
    },
  },
  ru: {
    title: "Статус доставки",
    labels: {
      received: ["Заказ получен", "Оплата подтверждена, заказ зарегистрирован"],
      preparing: ["Готовим заказ", "Букет собирается флористом"],
      courier_notified: ["Курьер уведомлён", "Заказ передан в доставку"],
      out_for_delivery: ["В пути", "Курьер везёт ваш заказ"],
      delivered: ["Доставлено", "Доставка завершена"],
    },
  },
} as const;
