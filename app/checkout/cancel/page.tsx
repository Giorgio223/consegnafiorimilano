import Link from "next/link";
import Header from "@/components/Header";
import { isLocale, withLocale } from "@/lib/i18n";

const labels = {
  it: ["Pagamento non completato", "Nessun addebito è stato confermato. Puoi tornare al catalogo e riprovare quando vuoi.", "Torna ai bouquet"],
  en: ["Payment not completed", "No payment has been confirmed. You can return to the catalogue and try again.", "Back to bouquets"],
  de: ["Zahlung nicht abgeschlossen", "Es wurde keine Zahlung bestätigt. Sie können zum Katalog zurückkehren und es erneut versuchen.", "Zurück zu Blumensträußen"],
  es: ["Pago no completado", "No se ha confirmado ningún cargo. Puedes volver al catálogo e intentarlo de nuevo.", "Volver a los ramos"],
  fr: ["Paiement non effectué", "Aucun paiement n'a été confirmé. Vous pouvez revenir au catalogue et réessayer.", "Voir les bouquets"],
  ru: ["Оплата не завершена", "Платёж не подтверждён. Вы можете вернуться к букетам и попробовать снова.", "Вернуться к букетам"],
} as const;

export default async function CheckoutCancelPage({ searchParams }: { searchParams: Promise<{ locale?: string }> }) {
  const raw = (await searchParams).locale;
  const locale = isLocale(raw) ? raw : "it";
  const t = labels[locale];
  return (
    <main className="min-h-screen bg-white text-[#1f1f1f]">
      <Header overrideLocale={locale} />
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-5xl font-bold">{t[0]}</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-neutral-600">{t[1]}</p>
        <Link href={withLocale("/bouquet", locale)} className="mt-9 inline-block rounded-full bg-black px-8 py-4 font-semibold text-white">{t[2]}</Link>
      </section>
    </main>
  );
}
