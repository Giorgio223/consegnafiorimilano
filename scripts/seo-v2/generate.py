#!/usr/bin/env python3
"""Generate typed, slug-keyed localized landing copy and validate source files. No npm build."""
from pathlib import Path
import json, re, sys, subprocess, shutil, hashlib, collections
ROOT = Path(sys.argv[1]).resolve() if len(sys.argv)>1 else Path(__file__).resolve().parents[2]
HERE = Path(__file__).resolve().parent
LANGS = ('it','en','de','es','fr','ru')

def blocks(name):
    lines=[x.strip() for x in (HERE/name).read_text(encoding='utf-8').splitlines() if x.strip() and not x.startswith('#')]
    assert len(lines)%7==0, name
    return {lines[i]:dict(zip(LANGS,lines[i+1:i+7])) for i in range(0,len(lines),7)}

def dump(o): return json.dumps(o,ensure_ascii=False,indent=2)

def wc(s): return len(re.findall(r'[^\W_]+(?:[’\-][^\W_]+)*',s,re.UNICODE))

tp=ROOT/'data/landing-topics.ts'; ap=ROOT/'data/landing-advice.ts'; cp=ROOT/'components/LandingPage.tsx'
original=tp.read_text(encoding='utf-8'); topics=json.loads(original[original.index('[\n'):original.rindex(']')+1]); assert len(topics)==32
if not (HERE/'original-advice.json').exists():
    raw=ap.read_text(encoding='utf-8'); old=json.loads(raw[raw.index('= [')+2:raw.rindex(']')+1]); assert len(old)==32
    (HERE/'original-advice.json').write_text(dump({t['slug']:old[i] for i,t in enumerate(topics)}),encoding='utf-8')
old=json.loads((HERE/'original-advice.json').read_text(encoding='utf-8'))
rawfacts=blocks('facts.txt'); rawscenarios=blocks('scenarios.txt'); modules=blocks('modules.txt')
questions=blocks('questions.txt') if (HERE/'questions.txt').exists() else {}
assert len(rawfacts)==len(rawscenarios)==32
# Local headings in every locale. Shared modules are selected according to the topic rather than repeated as a single fixed article.
heads={
'access':['Accesso e percorso in città','City access and delivery routes','Zufahrt und Lieferwege','Acceso y recorrido urbano','Accès et trajet en ville','Въезд и маршрут по городу'],
'handover':['Dati per una consegna precisa','Details for an accurate handover','Angaben für eine genaue Übergabe','Datos para una entrega precisa','Informations pour une remise précise','Данные для точного вручения'],
 'timing':['Concordare la fascia oraria','Agreeing the delivery window','Das Zeitfenster vereinbaren','Acordar el horario','Convenir du créneau','Согласование интервала доставки'],
 'choice':['Scegliere formato e composizione','Choosing size and arrangement','Größe und Zusammenstellung wählen','Elegir tamaño y composición','Choisir taille et composition','Выбор размера и композиции'],
 'photo':['Foto del bouquet prima della partenza','A photo before dispatch','Ein Foto vor der Abfahrt','Foto antes de la salida','Photo avant le départ','Фото перед отправлением'],
 'hydration':['Idratazione durante il trasporto','Hydration during transport','Wasserversorgung beim Transport','Hidratación durante el transporte','Hydratation pendant le transport','Увлажнение во время перевозки'],
 'source':['Origine e freschezza dei fiori','Flower origin and freshness','Herkunft und Frische','Origen y frescura','Origine et fraîcheur','Происхождение и свежесть цветов'],
 'price':['Preventivo e condizioni','Price and order terms','Preis und Bestellbedingungen','Presupuesto y condiciones','Devis et conditions','Стоимость и условия заказа'],
 'message':['La dedica e il destinatario','The card and the recipient','Karte und Empfänger','La tarjeta y el destinatario','Le message et le destinataire','Открытка и получатель'],
 'venue':['Consegna presso una struttura','Delivery at a managed venue','Übergabe in einer Einrichtung','Entrega en un establecimiento','Remise dans un établissement','Доставка в учреждение'],
 'care':['Dopo la consegna: cura dei fiori','After delivery: flower care','Nach der Lieferung: Blumenpflege','Después de la entrega: cuidado','Après la livraison : entretien','После вручения: уход за цветами'],
 'verification':['Verificare la qualità del servizio','Checking service quality','Servicequalität überprüfen','Comprobar la calidad del servicio','Vérifier la qualité du service','Проверка качества услуги'],
 'scenario':['Un esempio pratico','A practical example','Ein praktisches Beispiel','Un ejemplo práctico','Un exemple pratique','Практический пример'],
 'points':['Quattro aspetti da considerare','Four points to consider','Vier wichtige Punkte','Cuatro aspectos que considerar','Quatre points à considérer','Четыре важных момента'],
}
# Primary modules are tailored to search intent. Four operational modules provide a consistent factual baseline.
primary=[['timing','handover'],['timing','handover'],['timing','care'],['message','handover'],['venue','choice'],['venue','price'],['care','price'],['price','message'],['handover','venue'],['handover','venue'],['venue','handover'],['timing','handover'],['venue','price'],['handover','timing'],['venue','handover'],['timing','venue'],['venue','timing'],['venue','choice'],['choice','message'],['choice','timing'],['price','venue'],['message','venue'],['timing','message'],['message','choice'],['choice','verification'],['care','verification'],['care','verification'],['care','choice'],['choice','message'],['price','handover'],['verification','price'],['price','verification']]
# All links below are to official institutional references, not claims of commercial affiliation.
refs={
 'access':[('Comune di Milano — Area B','https://www.comune.milano.it/argomenti/mobilita/area-b'),('Comune di Milano — Area C','https://www.comune.milano.it/argomenti/mobilita/area-c')],
 'laurea':[('Università Bocconi','https://www.unibocconi.it/it/campus/edifici-e-aule'),('Università degli Studi di Milano','https://www.unimi.it/it/ateneo/uffici-e-strutture/sedi'),('Università Cattolica','https://milano.unicatt.it/il-campus-contatti/il-campus-mappa-e-strutture'),('Politecnico di Milano','https://www.polimi.it/')],
 'nascita':[('Clinica Mangiagalli','https://www.policlinico.mi.it/reparti/51/ostetricia'),('Ospedale San Raffaele','https://www.hsr.it/strutture/ospedale-san-raffaele/contatti'),('Humanitas','https://www.humanitas.it/info/come-raggiungere-humanitas/')],
 'source':[('Sogemi — Mercato Fiori','https://sogemispa.it/mercato-fiori'),('Royal FloraHolland — Aalsmeer','https://www.royalfloraholland.com/en/auction-times-for-flowers'),('Comune di Sanremo — Mercato dei fiori','https://comune.sanremo.im.it/it/vivere/mercato-dei-fiori-valle-armea')]
}
question_forms={
 'it':lambda t,k:f'{t}: che cosa sapere su {k.lower()}?',
 'en':lambda t,k:f'{t}: what should I know about {k.lower()}?',
 'de':lambda t,k:f'{t}: Was ist beim Thema {k} zu beachten?',
 'es':lambda t,k:f'{t}: ¿qué debo saber sobre {k.lower()}?',
 'fr':lambda t,k:f'{t} : que faut-il savoir sur le thème « {k.lower()} » ?',
 'ru':lambda t,k:f'{t}: что важно знать о пункте «{k.lower()}»?',
}
entries={}; counts=[]; allq=[]; alla=[]; main_hashes=set(); specifics=[]
for i,topic in enumerate(topics):
    slug=topic['slug']; entries[slug]={}
    for n,lang in enumerate(LANGS):
        facts=[]
        for fact in rawfacts[str(i)][lang].split('|'):
            k,a=fact.split(':',1); facts.append({'heading':k.strip(),'text':a.strip()})
        assert len(facts)==4
        title=topic['titles'][lang]; intro=old[slug][lang]; scenario=rawscenarios[str(i)][lang]
        # Four core sections are shared factual reference material. Choose one or two primary modules for the topic.
        selected=[primary[i][0],'access','hydration','source','photo']
        sections=[{'heading':heads['scenario'][n],'text':scenario}]
        for key in selected:
            sections.append({'heading':heads[key][n],'text':modules[key][lang]})
        # Place topic-specific checklist first; all word-count assertions exclude FAQ, headings, and interface text.
        body=[intro,scenario]+[x['text'] for x in facts]+[s['text'] for s in sections[1:]]
        if wc(' '.join(body))<450:
            key=primary[i][1]; sections.insert(2,{'heading':heads[key][n],'text':modules[key][lang]}); body.append(modules[key][lang])
        count=wc(' '.join(body)); assert 450<=count<=650,(slug,lang,count)
        qlist=questions.get(str(i),{}).get(lang,'').split('|') if str(i) in questions else []
        if qlist: assert len(qlist)==4,(slug,lang,qlist)
        faq=[{'q':qlist[j].strip() if qlist else question_forms[lang](title,f['heading']), 'a':f['text']} for j,f in enumerate(facts)]
        assert all(f['q'].endswith('?') for f in faq)
        # A topic-specific question may be identical in different pages only if qualified by the page title.
        for f in faq:
            if f['q'] in allq: f['q']=title+' — '+f['q']
            assert f['q'] not in allq; allq.append(f['q']); alla.append(f['a'])
        links=refs['access']+refs.get(slug,[])+(refs['source'] if i in (24,25,26) else [])
        entries[slug][lang]={'intro':intro,'checklistHeading':heads['points'][n],'checklist':facts,'sections':sections,'faq':faq,'sources':[{'label':label,'url':url} for label,url in links]}
        counts.append((slug,lang,count)); specifics.append(wc(' '.join([intro,scenario]+[x['text'] for x in facts])))
        main_hashes.add(hashlib.sha256(' '.join(body).encode()).hexdigest())
assert len(counts)==192 and len(main_hashes)==192 and len(set(allq))==768 and len(set(alla))==768
# Strong typing prevents accidental slug/index mismatches. Other routes can continue calling getTopic(string).
slugs=' | '.join(json.dumps(t['slug']) for t in topics)
tp.write_text('import type { Locale } from "@/lib/i18n";\nexport type TopicSlug = '+slugs+';\nexport type Topic = {slug:TopicSlug; group:number; titles:Record<Locale,string>; detail:string};\nexport const topics:Topic[] = '+dump(topics)+';\nexport const getTopic=(slug:string)=>topics.find(t=>t.slug===slug);\n',encoding='utf-8')
ap.write_text('import type { Locale } from "@/lib/i18n";\nimport type { TopicSlug } from "@/data/landing-topics";\nexport type LandingContent = { intro:string; checklistHeading:string; checklist:{heading:string;text:string}[]; sections:{heading:string;text:string}[]; faq:{q:string;a:string}[]; sources:{label:string;url:string}[] };\n// Generated by scripts/seo-v2/generate.py. All page data is keyed by slug and locale.\nexport const landingAdvice: Record<TopicSlug, Record<Locale, LandingContent>> = '+dump(entries)+';\n',encoding='utf-8')
s=cp.read_text(encoding='utf-8')
if 'faqByLocale' in s:
    s=s.replace('import {faqByLocale} from "@/lib/seo-content";\n','')
    s=s.replace(',index=topics.indexOf(topic);',';')
    s=s.replace('const faq=faqByLocale[locale].slice(0,4);','const content=landingAdvice[topic.slug][locale];\n const faq=content.faq;')
    s=s.replace('{landingAdvice[index][locale]}','{content.intro}')
    oldsection='<section className="space-y-5 leading-8">{[10,11,12].map((n,i)=><div key={n}><h2 className="text-2xl font-bold">{t[n]}</h2><p>{t[16+i]}</p></div>)}</section>'
    newsection='''<section className="space-y-5 leading-8"><h2 className="text-2xl font-bold">{content.checklistHeading}</h2><ul className="list-disc space-y-3 pl-6">{content.checklist.map(item=><li key={item.heading}><h3 className="inline font-semibold">{item.heading}: </h3>{item.text}</li>)}</ul></section><section className="space-y-8 leading-8">{content.sections.map(section=><section key={section.heading}><h2 className="mb-3 text-2xl font-bold">{section.heading}</h2><p>{section.text}</p></section>)}</section>'''
    assert oldsection in s; s=s.replace(oldsection,newsection)
    s=s.replace('<section><h2 className="text-2xl font-bold">{t[13]}</h2>','<section aria-label={locale==="it"?"Fonti istituzionali":locale==="en"?"Official references":locale==="de"?"Offizielle Quellen":locale==="es"?"Fuentes oficiales":locale==="fr"?"Sources officielles":"Официальные источники"}><h2 className="text-xl font-bold">{locale==="it"?"Fonti istituzionali":locale==="en"?"Official references":locale==="de"?"Offizielle Quellen":locale==="es"?"Fuentes oficiales":locale==="fr"?"Sources officielles":"Официальные источники"}</h2><ul className="mt-3 list-disc space-y-2 pl-6">{content.sources.map(source=><li key={source.url}><a href={source.url} className="underline" target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}</ul></section><section><h2 className="text-2xl font-bold">{t[13]}</h2>')
    cp.write_text(s,encoding='utf-8')
assert 'const faq=content.faq;' in s and 'faq.map(f=>' in s and 'faqByLocale' not in s and 'landingAdvice[topic.slug][locale]' in s
# Resolve project-local imports without installing dependencies. Parse actual TS/TSX with TypeScript compiler if globally available.
parser=HERE/'validate.cjs'
if shutil.which('tsc') and shutil.which('node'):
    ts=Path(shutil.which('tsc')).resolve().parents[1]
    result=subprocess.run(['node',str(parser),str(ROOT),str(ts)],capture_output=True,text=True,check=True)
    print(result.stdout.strip()); syntax=result.stdout.strip()
else:
    syntax='Global TypeScript parser not available; generated JSON and structural invariants checked only.'
    print(syntax)
report={'pages':len(counts),'faq_count':len(allq),'distinct_questions':len(set(allq)),'distinct_answers':len(set(alla)),'distinct_article_hashes':len(main_hashes),'min_words':min(x[2] for x in counts),'max_words':max(x[2] for x in counts),'topic_specific_words_min':min(specifics),'topic_specific_words_max':max(specifics),'per_locale':{l:{'pages':32,'min_words':min(x[2] for x in counts if x[1]==l),'max_words':max(x[2] for x in counts if x[1]==l)} for l in LANGS},'syntax':syntax,'build':'not run (requested)','word_counts':[{'slug':x[0],'locale':x[1],'words':x[2]} for x in counts]}
(ROOT/'SEO-V2-VALIDATION.json').write_text(dump(report),encoding='utf-8')
print(json.dumps({k:v for k,v in report.items() if k!='word_counts'},ensure_ascii=False,indent=2))
