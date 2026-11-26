"use client";
import {useState} from "react";
import {landingCopy} from "@/lib/landing-copy";
import {topics} from "@/data/landing-topics";
import type {Locale} from "@/lib/i18n";
export default function DeliveryCheck({locale}:{locale:Locale}) {
 const t=landingCopy[locale]; const [query,setQuery]=useState(""); const [result,setResult]=useState<boolean|null>(null);
 const check=()=>{const q=query.trim().toLowerCase();setResult(/^201(?:2[1-9]|[3-5][0-9]|6[0-2])$/.test(q)|| (q.length>=4 && topics.filter(x=>x.group===1).some(x=>x.titles.it.toLowerCase().includes(q))));};
 return <section className="rounded-2xl bg-neutral-100 p-6"><h2 className="text-2xl font-bold">{t[5]}</h2><form className="mt-4 flex flex-wrap gap-3" onSubmit={e=>{e.preventDefault();check()}}><input required aria-label={t[6]} placeholder={t[6]} value={query} onChange={e=>{setQuery(e.target.value);setResult(null)}} className="rounded border p-3"/><button className="rounded bg-black px-5 text-white">{t[7]}</button></form>{result!==null&&<p role="status" className="mt-4">{result?t[8]:t[9]}</p>}<a className="mt-4 inline-block underline" href={"https://wa.me/393793718598?text="+encodeURIComponent(t[5]+" "+query)}>{t[15]}</a></section>
}
