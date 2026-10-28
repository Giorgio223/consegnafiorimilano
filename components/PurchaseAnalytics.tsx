"use client";
import { useEffect } from "react";
export default function PurchaseAnalytics({id,total,currency}:{id:string;total:number;currency:string}){
 useEffect(()=>{
  if (!id || !id.startsWith("cs_")) return;
  const key=`cfm_purchase_${id}`;
  try {
   if(sessionStorage.getItem(key)) return;
   const raw=localStorage.getItem("cfm_cookie_preferences_v1");
   if(!raw)return;
   const consent=JSON.parse(raw) as {analytics?:boolean;marketing?:boolean};
   if(!consent.analytics&&!consent.marketing)return;
   if(typeof window.gtag!=="function")return;
   if(consent.analytics && process.env.NEXT_PUBLIC_GA4_ID)window.gtag("event","purchase",{transaction_id:id,value:total/100,currency});
   if(consent.marketing && process.env.NEXT_PUBLIC_GOOGLE_ADS_ID && process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL)window.gtag("event","conversion",{send_to:`${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}/${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL}`,transaction_id:id,value:total/100,currency});
   sessionStorage.setItem(key,"1");
  }catch{/* Analytics must never block orders */}
 },[id,total,currency]);
 return null;
}
