"use client";
import { usePathname } from "next/navigation";
import { localeFromPath, type Locale } from "@/lib/i18n";
import { WHATSAPP_NUMBER } from "@/lib/site";
const words:Record<Locale,{label:string;message:string}>={
 it:{label:"Scrivici su WhatsApp",message:"Ciao, vorrei informazioni su un bouquet."},
 en:{label:"Chat on WhatsApp",message:"Hello, I would like information about a bouquet."},
 de:{label:"Per WhatsApp schreiben",message:"Hallo, ich hätte gern Informationen zu einem Blumenstrauß."},
 es:{label:"Escríbenos por WhatsApp",message:"Hola, quisiera información sobre un ramo."},
 fr:{label:"Écrivez-nous sur WhatsApp",message:"Bonjour, je souhaite des renseignements sur un bouquet."},
 ru:{label:"Напишите в WhatsApp",message:"Здравствуйте! Хочу узнать подробнее о букете."}
};
export default function WhatsAppShare(){const locale=localeFromPath(usePathname());const t=words[locale];const openChat=()=>{window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g,"")}?text=${encodeURIComponent(`${t.message} ${window.location.href}`)}`,"_blank","noopener,noreferrer")};return <button type="button" onClick={openChat} className="fixed bottom-5 right-5 z-[60] rounded-full bg-[#25D366] px-5 py-3.5 font-semibold text-white shadow-xl" aria-label={t.label} title={t.label}>☏ <span className="hidden sm:inline">{t.label}</span></button>}
