import Link from "next/link";
import { trustText } from "@/lib/seo-content";
import { business } from "@/lib/business";
import { withLocale, type Locale } from "@/lib/i18n";
export default function AboutSection({locale="it"}:{locale?:Locale}) { const t=trustText[locale];return <section className="mx-auto max-w-5xl px-6 py-20">
<h1 className="text-4xl font-bold">{t.about} — Consegna Fiori Milano</h1><p className="mt-7 text-xl leading-9">{t.since}</p><h2 className="mt-10 text-2xl font-bold">{t.trust}</h2>
<p className="mt-4 leading-8 text-neutral-600">{t.since}</p>
<h2 className="mt-10 text-2xl font-bold">{t.contact}</h2><dl className="mt-5 grid gap-3 text-neutral-700"><div>{({it:"Ragione sociale",en:"Legal business name",de:"Firmenname",es:"Razón social",fr:"Raison sociale",ru:"Юридическое название"} as Record<Locale,string>)[locale]}: {business.legalName}</div><div>Email: <a href={`mailto:${business.email}`}>{business.email}</a></div><div>WhatsApp: <a href={`https://wa.me/${business.whatsapp.replace(/\D/g,"")}`}>{business.whatsapp}</a></div></dl>
<Link className="mt-8 inline-block rounded-full bg-black px-7 py-4 font-semibold text-white" href={withLocale('/bouquet',locale)}>Bouquet</Link></section>}
