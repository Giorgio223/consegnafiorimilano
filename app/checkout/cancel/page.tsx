import Link from "next/link";
import Header from "@/components/Header";

export default function CheckoutCancelPage() {
  return (
    <main className="min-h-screen bg-white text-[#1f1f1f]">
      <Header />
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-5xl font-bold">Pagamento non completato</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-neutral-600">Nessun addebito è stato confermato. Puoi tornare al catalogo e riprovare quando vuoi.</p>
        <Link href="/bouquet" className="mt-9 inline-block rounded-full bg-black px-8 py-4 font-semibold text-white">Torna ai bouquet</Link>
      </section>
    </main>
  );
}
