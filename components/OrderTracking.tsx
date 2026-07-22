import type { StripeSession } from "@/lib/stripe";
import { ORDER_STATUSES, trackingCopy, type OrderStatus } from "@/lib/tracking";
import type { Locale } from "@/lib/i18n";

function money(amount: number | null, currency: string | null, locale: Locale) {
  return new Intl.NumberFormat(locale === "ru" ? "ru-RU" : locale === "en" ? "en-GB" : "it-IT", {
    style: "currency",
    currency: (currency || "EUR").toUpperCase(),
  }).format((amount || 0) / 100);
}

export default function OrderTracking({ session, locale = "it" }: { session: StripeSession; locale?: Locale }) {
  const metadata = session.metadata || {};
  const rawStatus = metadata.tracking_status as OrderStatus | undefined;
  const currentStatus: OrderStatus = ORDER_STATUSES.includes(rawStatus as OrderStatus) ? (rawStatus as OrderStatus) : "received";
  const currentIndex = ORDER_STATUSES.indexOf(currentStatus);
  const copy = trackingCopy[locale];
  const customerTitle = locale === "ru" ? "Ваш заказ" : locale === "en" ? "Your order" : "Il tuo ordine";
  const deliveryLabel = locale === "ru" ? "Доставка" : locale === "en" ? "Delivery" : "Consegna";
  const recipientLabel = locale === "ru" ? "Получатель" : locale === "en" ? "Recipient" : "Destinatario";
  const orderLabel = locale === "ru" ? "Заказ" : locale === "en" ? "Order" : "Ordine";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
      <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8c6f5a]">{customerTitle}</p>
        <div className="mt-4 flex flex-col gap-3 border-b border-black/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">{metadata.product_name || orderLabel}</h1>
            <p className="mt-2 text-neutral-500">#{session.id.slice(-10).toUpperCase()}</p>
          </div>
          <p className="text-2xl font-bold">{money(session.amount_total, session.currency, locale)}</p>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-neutral-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">{recipientLabel}</p>
            <p className="mt-2 font-semibold">{metadata.recipient_name || "—"}</p>
            <p className="mt-1 text-sm text-neutral-600">{metadata.city || "Milano"}</p>
          </div>
          <div className="rounded-2xl bg-neutral-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">{deliveryLabel}</p>
            <p className="mt-2 font-semibold">{metadata.delivery_date || "—"}</p>
            <p className="mt-1 text-sm text-neutral-600">{metadata.address || ""} {metadata.postal_code || ""}</p>
          </div>
          <div className="rounded-2xl bg-neutral-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">{orderLabel}</p>
            <p className="mt-2 font-semibold">{metadata.product_name || "—"}</p>
            <p className="mt-1 text-sm text-neutral-600">{metadata.size || "—"} · {metadata.quantity || "1"}</p>
          </div>
          <div className="rounded-2xl bg-neutral-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Pagamento</p>
            <p className="mt-2 font-semibold">{session.payment_status === "paid" ? (locale === "ru" ? "Оплачено" : locale === "en" ? "Paid" : "Pagato") : session.payment_status}</p>
            <p className="mt-1 text-sm text-neutral-600">Stripe Checkout</p>
          </div>
        </div>

        {metadata.gift_message && (
          <div className="mt-5 rounded-2xl border border-black/10 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Messaggio</p>
            <p className="mt-2 whitespace-pre-wrap text-neutral-700">{metadata.gift_message}</p>
          </div>
        )}
      </section>

      <aside className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-3xl font-bold">{copy.title}</h2>
        <div className="mt-8">
          {ORDER_STATUSES.map((status, index) => {
            const done = index <= currentIndex;
            const active = index === currentIndex;
            const [title, description] = copy.labels[status];
            return (
              <div key={status} className="relative flex gap-4 pb-8 last:pb-0">
                {index < ORDER_STATUSES.length - 1 && (
                  <div className={`absolute left-[15px] top-8 h-[calc(100%-1rem)] w-0.5 ${index < currentIndex ? "bg-blue-500" : "bg-neutral-200"}`} />
                )}
                <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${done ? "border-blue-500 bg-blue-500 text-white" : "border-neutral-200 bg-white text-neutral-400"}`}>
                  {done && !active ? "✓" : index + 1}
                </div>
                <div className="pt-0.5">
                  <h3 className={`text-lg font-bold ${done ? "text-neutral-900" : "text-neutral-400"}`}>{title}</h3>
                  <p className={`mt-1 text-sm leading-6 ${done ? "text-neutral-500" : "text-neutral-400"}`}>{description}</p>
                  {active && metadata.tracking_note && <p className="mt-2 rounded-xl bg-blue-50 px-3 py-2 text-sm text-blue-800">{metadata.tracking_note}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
