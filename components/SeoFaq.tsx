import { faqByLocale, trustText } from "@/lib/seo-content";
import type { Locale } from "@/lib/i18n";
export default function SeoFaq({locale="it"}: {locale?:Locale}) {
 const faq=faqByLocale[locale];
 const schema={"@context":"https://schema.org","@type":"FAQPage",mainEntity:faq.map(({q,a})=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))};
 return <section className="border-t border-black/10 bg-neutral-50 py-20" aria-labelledby="faq-title"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/><div className="mx-auto max-w-5xl px-6"><h2 id="faq-title" className="text-3xl font-bold">{trustText[locale].faq}</h2><div className="mt-8 space-y-3">{faq.map(({q,a})=><details key={q} className="group rounded-2xl bg-white p-6"><summary className="cursor-pointer text-lg font-semibold">{q}</summary><p className="mt-4 leading-7 text-neutral-600">{a}</p></details>)}</div></div></section>;
}
