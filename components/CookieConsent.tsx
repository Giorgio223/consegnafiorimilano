"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Choice = {analytics:boolean;marketing:boolean;at:string};
declare global {interface Window {dataLayer?: unknown[];gtag?: (...args: unknown[])=>void}}
const KEY="cfm_cookie_preferences_v1";
const ga=process.env.NEXT_PUBLIC_GA4_ID;
const ads=process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
function activate(choice: Choice){
  if(!choice.analytics && !choice.marketing) return;
  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function (...args:unknown[]){window.dataLayer?.push(args)};
  window.gtag("consent","update",{analytics_storage:choice.analytics?"granted":"denied",ad_storage:choice.marketing?"granted":"denied",ad_user_data:choice.marketing?"granted":"denied",ad_personalization:choice.marketing?"granted":"denied"});
  if(!document.getElementById("cfm-google-tag") && (ga||ads)){
    const script=document.createElement("script");script.id="cfm-google-tag";script.async=true;script.src=`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga||ads||"")}`;document.head.appendChild(script);
    window.gtag("js",new Date());
  }
  if(ga && choice.analytics) window.gtag("config",ga,{send_page_view:true});
  if(ads && choice.marketing) window.gtag("config",ads);
}
export default function CookieConsent(){
 const pathname=usePathname();
 const locale=pathname.startsWith("/ru")?"ru":pathname.startsWith("/en")?"en":"it";
 const [open,setOpen]=useState(false);const [analytics,setAnalytics]=useState(false);const [marketing,setMarketing]=useState(false);
 useEffect(()=>{try {const stored=localStorage.getItem(KEY);if(stored){const parsed=JSON.parse(stored) as Choice;setAnalytics(!!parsed.analytics);setMarketing(!!parsed.marketing);activate(parsed);}else setOpen(true);}catch{setOpen(true)};
 const listener=()=>setOpen(true);window.addEventListener("open-cookie-settings",listener);return()=>window.removeEventListener("open-cookie-settings",listener)},[]);
 function save(a:boolean,m:boolean){const choice={analytics:a,marketing:m,at:new Date().toISOString()};localStorage.setItem(KEY,JSON.stringify(choice));setAnalytics(a);setMarketing(m);setOpen(false);if(!a&&!m){window.gtag?.("consent","update",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});}else activate(choice);}
 const copy={it:["Preferenze cookie","Utilizziamo cookie necessari per gli ordini. Solo con il tuo consenso attiviamo Analytics e pubblicità Google. Puoi cambiare la scelta in qualsiasi momento.","Statistiche (Google Analytics)","Marketing (Google Ads)","Rifiuta","Salva scelta","Accetta tutti"],en:["Cookie preferences","Essential cookies support orders. We only activate Google Analytics and advertising with your permission. Change your choice at any time.","Analytics (Google Analytics)","Marketing (Google Ads)","Reject","Save choices","Accept all"],ru:["Настройки cookie","Необходимые cookie обеспечивают работу заказов. Аналитика и реклама Google включаются только с вашего согласия. Выбор можно изменить.","Аналитика (Google Analytics)","Реклама (Google Ads)","Отклонить","Сохранить","Принять все"]}[locale];
 if(!open)return null;
 return <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/45 p-4 sm:items-center"><section role="dialog" aria-modal="true" aria-label={copy[0]} className="w-full max-w-xl rounded-3xl bg-white p-6 text-neutral-900 shadow-xl sm:p-8"><h2 className="text-2xl font-bold">{copy[0]}</h2><p className="mt-3 text-sm leading-6 text-neutral-700">{copy[1]}</p><div className="mt-5 space-y-4"><label className="flex items-center justify-between gap-4"><span className="font-medium">{copy[2]}</span><input type="checkbox" checked={analytics} onChange={e=>setAnalytics(e.target.checked)} className="h-5 w-5"/></label><label className="flex items-center justify-between gap-4"><span className="font-medium">{copy[3]}</span><input type="checkbox" checked={marketing} onChange={e=>setMarketing(e.target.checked)} className="h-5 w-5"/></label></div><div className="mt-7 flex flex-wrap gap-3"><button onClick={()=>save(false,false)} className="rounded-full border border-black px-5 py-3 font-semibold">{copy[4]}</button><button onClick={()=>save(analytics,marketing)} className="rounded-full border border-black px-5 py-3 font-semibold">{copy[5]}</button><button onClick={()=>save(true,true)} className="rounded-full bg-black px-5 py-3 font-semibold text-white">{copy[6]}</button></div><a href="/privacy-policy" className="mt-5 block text-sm underline">Privacy & Cookie Policy</a></section></div>;
}
