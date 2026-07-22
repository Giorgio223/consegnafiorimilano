"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useMemo, useState } from "react";
import Header from "@/components/Header";
import { products } from "@/data/products";
import { DELIVERY_FEE, formatEur, getSizePrices, isProductSize, type ProductSize } from "@/data/pricing";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const productSlug = searchParams.get("product");
  const quantityParam = Number(searchParams.get("quantity") ?? "1");
  const sizeParam = searchParams.get("size");

  const quantity = Number.isFinite(quantityParam) ? Math.min(Math.max(Math.trunc(quantityParam), 1), 10) : 1;
  const size: ProductSize = isProductSize(sizeParam) ? sizeParam : "Medio";
  const product = useMemo(() => products.find((item) => item.slug === productSlug), [productSlug]);
  const unitPrice = product ? getSizePrices(product.price)[size] : 0;
  const productsTotal = unitPrice * quantity;
  const totalPrice = productsTotal + DELIVERY_FEE;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!product) return;
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, productSlug: product.slug, size, quantity }),
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) throw new Error(data.error || "Impossibile avviare il pagamento");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore durante il pagamento");
      setLoading(false);
    }
  }

  const inputClass = "w-full rounded-2xl border border-black/15 bg-white px-5 py-4 outline-none transition focus:border-black";

  if (!product) {
    return <main className="min-h-screen bg-white text-[#1f1f1f]"><Header /><section className="mx-auto max-w-3xl px-6 py-24 text-center"><h1 className="text-4xl font-bold">Prodotto non trovato</h1><p className="mt-5 text-neutral-600">Il prodotto selezionato non è disponibile.</p><Link href="/bouquet" className="mt-8 inline-block rounded-full bg-black px-8 py-4 font-semibold text-white">Torna ai bouquet</Link></section></main>;
  }

  return (
    <main className="min-h-screen bg-white text-[#1f1f1f]">
      <Header />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1fr_400px]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8c6f5a]">Checkout sicuro</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Inserisci i dati di consegna</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">Prima raccogliamo i dati necessari per la consegna. Al passaggio successivo verrai trasferito al checkout sicuro di Stripe per completare il pagamento in euro.</p>

          <form id="checkout-form" onSubmit={handleSubmit} className="mt-12 space-y-8">
            <section className="rounded-[2rem] border border-black/10 bg-white p-8">
              <p className="text-sm font-bold text-[#8c6f5a]">01</p><h2 className="mt-3 text-2xl font-bold">Dati del destinatario</h2>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <div><label htmlFor="recipientName" className="mb-2 block text-sm font-semibold">Nome e cognome *</label><input id="recipientName" name="recipientName" required placeholder="Mario Rossi" className={inputClass} /></div>
                <div><label htmlFor="recipientPhone" className="mb-2 block text-sm font-semibold">Telefono *</label><input id="recipientPhone" name="recipientPhone" type="tel" inputMode="tel" minLength={7} required placeholder="+39 333 123 4567" className={inputClass} /></div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-black/10 bg-white p-8">
              <p className="text-sm font-bold text-[#8c6f5a]">02</p><h2 className="mt-3 text-2xl font-bold">Indirizzo di consegna</h2>
              <div className="mt-7 space-y-5">
                <div><label htmlFor="address" className="mb-2 block text-sm font-semibold">Via e numero civico *</label><input id="address" name="address" required placeholder="Via Torino 10" className={inputClass} /></div>
                <div className="grid gap-5 md:grid-cols-3">
                  <div><label htmlFor="city" className="mb-2 block text-sm font-semibold">Città *</label><input id="city" name="city" required defaultValue="Milano" className={inputClass} /></div>
                  <div><label htmlFor="postalCode" className="mb-2 block text-sm font-semibold">CAP *</label><input id="postalCode" name="postalCode" inputMode="numeric" pattern="[0-9]{5}" maxLength={5} required placeholder="20121" className={inputClass} /></div>
                  <div><label htmlFor="doorbell" className="mb-2 block text-sm font-semibold">Citofono</label><input id="doorbell" name="doorbell" placeholder="Rossi" className={inputClass} /></div>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-black/10 bg-white p-8">
              <p className="text-sm font-bold text-[#8c6f5a]">03</p><h2 className="mt-3 text-2xl font-bold">Consegna e messaggio</h2>
              <div className="mt-7 space-y-5">
                <div><label htmlFor="deliveryDate" className="mb-2 block text-sm font-semibold">Data di consegna *</label><input id="deliveryDate" name="deliveryDate" type="date" min={new Date().toISOString().slice(0, 10)} required className={inputClass} /></div>
                <div><label htmlFor="message" className="mb-2 block text-sm font-semibold">Messaggio sul biglietto</label><textarea id="message" name="message" rows={5} maxLength={450} placeholder="Scrivi il tuo messaggio..." className={`${inputClass} resize-none`} /></div>
                <div><label htmlFor="notes" className="mb-2 block text-sm font-semibold">Note per il corriere</label><textarea id="notes" name="notes" rows={3} maxLength={450} placeholder="Scala, piano o altre indicazioni..." className={`${inputClass} resize-none`} /></div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-black/10 bg-white p-8">
              <p className="text-sm font-bold text-[#8c6f5a]">04</p><h2 className="mt-3 text-2xl font-bold">I tuoi dati</h2>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <div><label htmlFor="customerName" className="mb-2 block text-sm font-semibold">Nome e cognome *</label><input id="customerName" name="customerName" required placeholder="Il tuo nome" className={inputClass} /></div>
                <div><label htmlFor="customerEmail" className="mb-2 block text-sm font-semibold">Email *</label><input id="customerEmail" name="customerEmail" type="email" required placeholder="email@esempio.it" className={inputClass} /></div>
              </div>
            </section>

            {error && <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">{error}</p>}
            <button type="submit" disabled={loading} className="w-full rounded-full bg-black px-8 py-5 text-lg font-semibold text-white disabled:opacity-50 lg:hidden">{loading ? "Connessione a Stripe..." : `Vai al pagamento — ${formatEur(totalPrice)}`}</button>
          </form>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[2rem] border border-black/10 bg-white p-7 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8c6f5a]">Il tuo ordine</p>
            <h2 className="mt-4 text-2xl font-bold">{product.name}</h2>
            <p className="mt-2 text-neutral-600">Dimensione: <strong>{size}</strong></p>
            <div className="mt-8 space-y-4 border-t border-black/10 pt-6">
              <div className="flex justify-between gap-4 text-neutral-600"><span>Prezzo unitario</span><span>{formatEur(unitPrice)}</span></div>
              <div className="flex justify-between gap-4 text-neutral-600"><span>Quantità</span><span>{quantity}</span></div>
              <div className="flex justify-between gap-4 text-neutral-600"><span>Subtotale</span><span>{formatEur(productsTotal)}</span></div>
              <div className="flex justify-between gap-4 text-neutral-600"><span>Consegna</span><span>{formatEur(DELIVERY_FEE)}</span></div>
            </div>
            <div className="mt-6 flex justify-between border-t border-black/10 pt-6 text-xl font-bold"><span>Totale</span><span>{formatEur(totalPrice)}</span></div>
            <button type="submit" form="checkout-form" disabled={loading} className="mt-8 hidden w-full rounded-full bg-black px-8 py-5 text-lg font-semibold text-white transition hover:opacity-80 disabled:opacity-50 lg:block">{loading ? "Connessione a Stripe..." : `Vai al pagamento — ${formatEur(totalPrice)}`}</button>
            <Link href={`/prodotti/${product.slug}`} className="mt-4 block text-center text-sm font-semibold underline underline-offset-4">Modifica prodotto</Link>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default function CheckoutPage() {
  return <Suspense fallback={<main className="min-h-screen bg-white" />}><CheckoutContent /></Suspense>;
}
