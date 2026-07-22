"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPath, withLocale } from "@/lib/i18n";

export default function Footer() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const l = (path: string) => withLocale(path, locale);
  const copy = locale === "en"
    ? { about: "Fresh bouquets and flowers delivered in Milan.", flowers: "Flowers", service: "Service", delivery: "Flower delivery in Milan", how: "How it works", city: "Milan delivery", cityText: "Order online and enter the recipient details and preferred delivery date." }
    : locale === "ru"
      ? { about: "Свежие букеты и цветы с доставкой по Милану.", flowers: "Цветы", service: "Сервис", delivery: "Доставка цветов в Милане", how: "Как это работает", city: "Доставка по Милану", cityText: "Выберите букет онлайн, укажите получателя и желаемую дату доставки." }
      : { about: "Bouquet e fiori freschi con consegna a domicilio a Milano.", flowers: "Fiori", service: "Servizio", delivery: "Consegna fiori Milano", how: "Come funziona", city: "Consegna a Milano", cityText: "Ordina online una composizione floreale e indica i dati del destinatario e la data desiderata." };

  return (
    <footer className="border-t border-black/10 bg-white text-[#1f1f1f]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <Link href={l("/")} className="text-xl font-bold">Consegna Fiori Milano</Link>
          <p className="mt-4 text-sm leading-6 text-neutral-500">{copy.about}</p>
        </div>
        <div>
          <h2 className="font-bold">{copy.flowers}</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-neutral-500">
            <Link href={l("/fiori/rose")}>Rose</Link>
            <Link href={l("/fiori/peonie")}>Peonie</Link>
            <Link href={l("/fiori/tulipani")}>Tulipani</Link>
            <Link href={l("/fiori/girasoli")}>Girasoli</Link>
            <Link href={l("/fiori/orchidee")}>Orchidee</Link>
          </div>
        </div>
        <div>
          <h2 className="font-bold">{copy.service}</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-neutral-500">
            <Link href={l("/bouquet")}>Bouquet</Link>
            <Link href={l("/come-funziona")}>{copy.how}</Link>
            <Link href={l("/consegna-fiori-milano")}>{copy.delivery}</Link>
            {locale === "it" && <Link href="/servizi/consegna-fiori-in-giornata-milano">Consegna in giornata</Link>}
          </div>
        </div>
        <div>
          <h2 className="font-bold">{copy.city}</h2>
          <p className="mt-4 text-sm leading-6 text-neutral-500">{copy.cityText}</p>
          {locale === "it" && (
            <div className="mt-4 flex flex-col gap-2 text-sm text-neutral-500">
              <Link href="/servizi/fiorista-milano">Fiorista Milano</Link>
              <Link href="/servizi/fiori-urgenti-milano">Fiori urgenti Milano</Link>
              <Link href="/servizi/consegna-fiori-provincia-milano">Milano e provincia</Link>
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-black/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-sm text-neutral-500 md:flex-row md:justify-between">
          <p>© 2026 Consegna Fiori Milano</p>
          <p>{copy.delivery}</p>
        </div>
      </div>
    </footer>
  );
}
