import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderTracking from "@/components/OrderTracking";
import { stripeRequest, type StripeSession } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export default async function CheckoutSuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
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
      <Header />
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16">
        <div className="mb-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">✓</div>
          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">Pagamento completato</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-neutral-600">Grazie per il tuo ordine. Da questa pagina puoi seguire lo stato della consegna.</p>
        </div>

        {session && session.payment_status === "paid" ? (
          <>
            <OrderTracking session={session} />
            <div className="mt-8 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
              <Link href={`/tracking/${session.id}`} className="rounded-full bg-black px-7 py-4 font-semibold text-white">Apri il tracking permanente</Link>
              <Link href="/" className="rounded-full border border-black px-7 py-4 font-semibold">Torna alla home</Link>
            </div>
          </>
        ) : (
          <div className="mx-auto max-w-2xl rounded-[2rem] border border-black/10 bg-white p-8 text-center">
            <p className="text-neutral-600">Il pagamento è stato ricevuto. Se il tracking non appare ancora, aggiorna questa pagina tra qualche secondo.</p>
            <Link href="/" className="mt-6 inline-block rounded-full bg-black px-8 py-4 font-semibold text-white">Torna alla home</Link>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
