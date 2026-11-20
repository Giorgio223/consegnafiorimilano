"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPath, withLocale, ui } from "@/lib/i18n";
import { trustText } from "@/lib/seo-content";
import { business } from "@/lib/business";

const labels={
 it:{flowers:"Fiori",service:"Servizio",delivery:"Consegna a Milano",returns:"Resi e cancellazioni",cookies:"Preferenze cookie"},
 en:{flowers:"Flowers",service:"Service",delivery:"Delivery in Milan",returns:"Returns and cancellations",cookies:"Cookie preferences"},
 de:{flowers:"Blumen",service:"Service",delivery:"Lieferung in Mailand",returns:"Rückgabe und Stornierung",cookies:"Cookie-Einstellungen"},
 es:{flowers:"Flores",service:"Servicio",delivery:"Entrega en Milán",returns:"Devoluciones y cancelaciones",cookies:"Preferencias de cookies"},
 fr:{flowers:"Fleurs",service:"Service",delivery:"Livraison à Milan",returns:"Retours et annulations",cookies:"Préférences des cookies"},
 ru:{flowers:"Цветы",service:"Сервис",delivery:"Доставка по Милану",returns:"Возврат и отмена",cookies:"Настройки cookie"},
};
export default function Footer(){
 const locale=localeFromPath(usePathname()), t=labels[locale], c=trustText[locale], l=(path:string)=>withLocale(path,locale);
 return <footer className="border-t border-black/10 bg-white text-[#1f1f1f]"><div className="mx-auto grid max-w-7xl gap-9 px-6 py-14 md:grid-cols-4">
 <div><Link href={l('/')} className="text-xl font-bold">Consegna Fiori Milano</Link><p className="mt-4 text-sm leading-7 text-neutral-600">{c.since}</p><Link className="mt-3 inline-block underline" href={l('/chi-siamo')}>{c.about}</Link></div>
 <div><h2 className="font-bold">{t.flowers}</h2><div className="mt-4 flex flex-col gap-3 text-sm text-neutral-600">{['rose','peonie','tulipani','girasoli','orchidee'].map((slug,i)=><Link key={slug} href={l(`/fiori/${slug}`)}>{ui[locale].categories[i][0]}</Link>)}</div></div>
 <div><h2 className="font-bold">{t.service}</h2><div className="mt-4 flex flex-col gap-3 text-sm text-neutral-600"><Link href={l('/bouquet')}>Bouquet</Link><Link href={l('/consegna-fiori-milano')}>{t.delivery}</Link><Link href={l('/recensioni')}>{c.reviews}</Link><Link href={locale==='it'?'/politica-resi':locale==='en'?'/en/return-policy':locale==='ru'?'/ru/return-policy':'/politica-resi'}>{t.returns}</Link><Link href="/privacy-policy">Privacy & Cookie</Link><button type="button" onClick={()=>window.dispatchEvent(new Event('open-cookie-settings'))} className="text-left underline">{t.cookies}</button></div></div>
 <div><h2 className="font-bold">{c.contact}</h2><div className="mt-4 flex flex-col gap-2 break-words text-sm text-neutral-600"><p>{({it:"Ragione sociale",en:"Business name",de:"Firmenname",es:"Nombre de empresa",fr:"Nom de l’entreprise",ru:"Название компании"} as const)[locale]}: {business.legalName}</p><a href={`mailto:${business.email}`}>{business.email}</a><a href={`https://wa.me/${business.whatsapp.replace(/\D/g,'')}`}>WhatsApp: {business.whatsapp}</a></div></div>
 </div><div className="border-t border-black/10 px-6 py-6 text-center text-sm text-neutral-500">© {new Date().getFullYear()} Consegna Fiori Milano · {c.trust}</div></footer>;
}
