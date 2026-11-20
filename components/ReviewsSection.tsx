import Link from "next/link";
import { trustText } from "@/lib/seo-content";
import { customerReviews } from "@/data/reviews";
import { WHATSAPP_NUMBER } from "@/lib/site";
import { withLocale, type Locale } from "@/lib/i18n";
export default function ReviewsSection({locale="it",compact=false}:{locale?:Locale;compact?:boolean}) {
 const t=trustText[locale];
 return <section className="border-t border-black/10 py-20" aria-labelledby="reviews-title"><div className="mx-auto max-w-6xl px-6">
  <h2 id="reviews-title" className="text-3xl font-bold">{t.reviews}</h2><p className="mt-3 text-neutral-600">{t.reviewsLead}</p>
  {customerReviews.length ? <div className="mt-8 grid gap-5 md:grid-cols-3">{customerReviews.slice(0,compact?3:undefined).map(r=><blockquote key={r.id} className="rounded-2xl border border-black/10 p-6"><p aria-label={`${r.rating} su 5`} className="text-amber-600">{"★".repeat(r.rating)}</p><p className="mt-3">{r.body}</p><footer className="mt-4 text-sm text-neutral-500">{r.name} · {r.city} · {r.date}</footer></blockquote>)}</div> : <p className="mt-8 max-w-2xl rounded-2xl bg-neutral-50 p-6 text-neutral-700">{t.noReviews}</p>}
  <div className="mt-6 flex flex-wrap gap-4"><a className="rounded-full border border-black px-6 py-3 font-semibold" href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g,"")}`}>WhatsApp</a>{compact && <Link className="rounded-full bg-black px-6 py-3 font-semibold text-white" href={withLocale('/recensioni',locale)}>{t.reviews}</Link>}</div>
 </div></section>;
}
