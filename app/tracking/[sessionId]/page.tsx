import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderTracking from "@/components/OrderTracking";
import { stripeRequest, type StripeSession } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Tracking ordine",
  robots: { index: false, follow: false, noarchive: true },
};

export const dynamic = "force-dynamic";

export default async function TrackingPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  if (!sessionId.startsWith("cs_")) notFound();
  let session: StripeSession;
  try {
    session = await stripeRequest<StripeSession>(`/checkout/sessions/${encodeURIComponent(sessionId)}`, { method: "GET" });
  } catch {
    notFound();
  }
  if (session.payment_status !== "paid") notFound();

  return (
    <main className="min-h-screen bg-[#f7f8fb] text-[#1f1f1f]">
      <Header />
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16">
        <OrderTracking session={session} />
        <p className="mt-6 text-center text-sm text-neutral-500">Salva questa pagina per controllare gli aggiornamenti della consegna.</p>
      </section>
      <Footer />
    </main>
  );
}
