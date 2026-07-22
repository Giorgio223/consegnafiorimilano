import Link from "next/link";
import Header from "@/components/Header";

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-white text-[#1f1f1f]">
      <Header />
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">✓</div>
        <h1 className="mt-7 text-5xl font-bold">Pagamento completato</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-neutral-600">Grazie per il tuo ordine. Il pagamento è stato inviato correttamente e i dettagli dell&apos;ordine sono disponibili nella nostra area amministrativa.</p>
        <Link href="/" className="mt-9 inline-block rounded-full bg-black px-8 py-4 font-semibold text-white">Torna alla home</Link>
      </section>
    </main>
  );
}
