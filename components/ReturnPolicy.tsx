import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { returnPolicies } from "@/lib/return-policy";
import type { Locale } from "@/lib/i18n";
import { BUSINESS_EMAIL } from "@/lib/site";
export default function ReturnPolicy({locale}: {locale: Locale}) {
 const t=returnPolicies[locale];return <main className="min-h-screen bg-[#faf9f7] text-[#1f1f1f]"><Header/><article className="mx-auto max-w-4xl px-6 py-16"><nav className="mb-8 flex gap-4 text-sm underline"><Link href="/politica-resi">Italiano</Link><Link href="/en/return-policy">English</Link><Link href="/ru/return-policy">Русский</Link></nav><h1 className="text-4xl font-bold sm:text-5xl">{t.title}</h1><p className="mt-4 text-lg text-neutral-600">{t.subtitle}</p><section className="mt-10 rounded-3xl bg-white p-8 shadow-sm"><h2 className="text-2xl font-bold">{t.heading}</h2><ol className="mt-5 list-decimal space-y-4 pl-6 leading-8">{t.steps.map(step=><li key={step}>{step}</li>)}</ol></section><section className="mt-6 rounded-3xl bg-white p-8 leading-8"><h2 className="mb-4 text-2xl font-bold">{locale==='it'?'Fiori freschi dopo la consegna':locale==='en'?'Fresh flowers after delivery':'Свежие цветы после доставки'}</h2><p>{t.fresh}</p></section><section className="mt-6 rounded-3xl bg-white p-8 leading-8"><h2 className="mb-4 text-2xl font-bold">{locale==='it'?'Prodotti difettosi e diritti di legge':locale==='en'?'Damaged items and statutory rights':'Повреждения и права покупателя'}</h2><p>{t.rights}</p><p className="mt-5">{t.contact} <a className="font-semibold underline" href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>.</p><p className="mt-5 text-sm text-neutral-600">{t.notice}</p></section></article><Footer/></main>
}
