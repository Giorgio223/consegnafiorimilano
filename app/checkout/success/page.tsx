import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PurchaseAnalytics from "@/components/PurchaseAnalytics";
import OrderTracking from "@/components/OrderTracking";
import { isLocale, withLocale } from "@/lib/i18n";
import { stripeRequest, type StripeSession } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export default async function CheckoutSuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string; locale?: string }> }) {
  const { session_id, locale: rawLocale } = await searchParams;
  const locale = isLocale(rawLocale) ? rawLocale : "it";
  const titles = {
    it: ["Pagamento completato", "Grazie per il tuo ordine. Da questa pagina puoi seguire lo stato della consegna.", "Apri il tracking permanente", "Torna alla home"],
    en: ["Payment completed", "Thank you for your order. You can follow your delivery from this page.", "Track your order", "Back to home"],
    de: ["Zahlung abgeschlossen", "Vielen Dank für Ihre Bestellung. Hier können Sie die Lieferung verfolgen.", "Bestellung verfolgen", "Zur Startseite"],
    es: ["Pago completado", "Gracias por tu pedido. Desde aquí puedes seguir la entrega.", "Seguir el pedido", "Volver al inicio"],
    fr: ["Paiement effectué", "Merci pour votre commande. Vous pouvez suivre votre livraison depuis cette page.", "Suivre la commande", "Accueil"],
    ru: ["Оплата завершена", "Спасибо за заказ. Здесь можно отслеживать доставку.", "Отследить заказ", "На главную"],
  } as const;
  const t = titles[locale];
  let session: StripeSession | null = null;
  if (session_id?.startsWith("cs_")) {
    try {
      session = await stripeRequest<StripeSession>(`/checkout/sessions/${encodeURIComponent(session_id)}`, { method: "GET" });
    } catch {
      session = null;
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f8fb] text-[#1f1f1f]">
      <Header overrideLocale={locale} />
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16">
        <div className="mb-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">✓</div>
          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">{t[0]}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-neutral-600">{t[1]}</p>
        </div>

        {session && session.payment_status === "paid" ? (
          <>
            <PurchaseAnalytics id={session.id} total={session.amount_total || 0} currency={session.currency || "eur"} />
            <OrderTracking session={session} />
            <div className="mt-8 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
              <Link href={`/tracking/${session.id}`} className="rounded-full bg-black px-7 py-4 font-semibold text-white">{t[2]}</Link>
              <Link href={withLocale("/", locale)} className="rounded-full border border-black px-7 py-4 font-semibold">{t[3]}</Link>
            </div>
          </>
        ) : (
          <div className="mx-auto max-w-2xl rounded-[2rem] border border-black/10 bg-white p-8 text-center">
            <p className="text-neutral-600">Il pagamento è stato ricevuto. Se il tracking non appare ancora, aggiorna questa pagina tra qualche secondo.</p>
            <Link href={withLocale("/", locale)} className="mt-6 inline-block rounded-full bg-black px-8 py-4 font-semibold text-white">{t[3]}</Link>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
