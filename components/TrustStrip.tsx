import {business} from "@/lib/business";
import {landingCopy} from "@/lib/landing-copy";
import type {Locale} from "@/lib/i18n";
export default function TrustStrip({locale="it"}:{locale?:Locale}){const t=landingCopy[locale];return <aside className="border-y bg-neutral-50 px-6 py-5 text-center text-sm"><p>{business.legalName} · {business.address} · P.IVA {business.vat}</p><a className="mt-2 inline-block font-semibold underline" href="https://wa.me/393793718598">{t[19]} · WhatsApp +39 379 371 8598</a></aside>}
