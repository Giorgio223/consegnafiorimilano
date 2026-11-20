import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { withLocale, type Locale } from "@/lib/i18n";
const homeNames:Record<Locale,string>={it:"Home",en:"Home",de:"Startseite",es:"Inicio",fr:"Accueil",ru:"Главная"};
export default function Breadcrumbs({locale="it",items}:{locale?:Locale;items:{label:string;path:string}[]}){
 const all=[{label:homeNames[locale],path:"/"},...items];
 const ld={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:all.map(({label,path},i)=>({"@type":"ListItem",position:i+1,name:label,item:`${SITE_URL}${withLocale(path,locale)==='/'?'':withLocale(path,locale)}`}))};
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(ld).replace(/</g,"\\u003c")}}/><nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-6 pt-5 text-sm text-neutral-500"><ol className="flex flex-wrap gap-2">{all.map((item,i)=><li key={i}>{i>0&&<span aria-hidden="true" className="mr-2">/</span>}{i===all.length-1?<span aria-current="page">{item.label}</span>:<Link href={withLocale(item.path,locale)} className="underline">{item.label}</Link>}</li>)}</ol></nav></>;
}
