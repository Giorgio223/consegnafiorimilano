"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Choice = { analytics: boolean; marketing: boolean; at: string };
declare global { interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void } }
const KEY = "cfm_cookie_preferences_v1";
const ga = process.env.NEXT_PUBLIC_GA4_ID;
const ads = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const consentState = (choice: Pick<Choice,"analytics" | "marketing">) => ({
  analytics_storage: choice.analytics ? "granted" : "denied",
  ad_storage: choice.marketing ? "granted" : "denied",
  ad_user_data: choice.marketing ? "granted" : "denied",
  ad_personalization: choice.marketing ? "granted" : "denied",
});
// The first page_view and client-side route changes are sent explicitly.
// This follows the tested approach from Flowers Milan without auto page-view duplication.
let googleStarted = false;
let googleLoaded = false;
let lastPage = "";
let currentChoice: Pick<Choice, "analytics" | "marketing"> = { analytics: false, marketing: false };
function ensureTag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function (...args: unknown[]) { window.dataLayer?.push(args); };
}
function pageView() {
  if (!ga || !googleLoaded || !currentChoice.analytics) return;
  const location = window.location.pathname + window.location.search;
  if (lastPage === location) return;
  lastPage = location;
  window.gtag?.("event", "page_view", {
    send_to: ga, page_location: window.location.href, page_title: document.title,
  });
}
function apply(choice: Pick<Choice, "analytics" | "marketing">) {
  ensureTag();
  const hadPermission = currentChoice.analytics || currentChoice.marketing;
  currentChoice = { analytics: choice.analytics, marketing: choice.marketing };
  window.gtag?.("consent", "update", consentState(choice));
  if (!choice.analytics && !choice.marketing) {
    // Once the Google script has loaded, removing its tag cannot revoke execution.
    // Reload with consent denied to stop further collection.
    if (hadPermission && googleStarted) window.location.reload();
    return;
  }
  if (!(ga || ads)) return;
  if (!googleStarted) {
    googleStarted = true;
    const script = document.createElement("script");
    script.id = "cfm-google-tag";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga || ads || "")}`;
    script.onload = () => {
      googleLoaded = true;
      window.gtag?.("js", new Date());
      if (ga) window.gtag?.("config", ga, { send_page_view: false });
      if (ads) window.gtag?.("config", ads);
      pageView();
      window.dispatchEvent(new Event("cfm-google-ready"));
    };
    script.onerror = () => { googleStarted = false; };
    document.head.appendChild(script);
  } else if (googleLoaded) {
    pageView();
    window.dispatchEvent(new Event("cfm-google-ready"));
  }
}
const translations = {
  it: { summary: "Utilizziamo cookie necessari per gli ordini. Con il tuo consenso possiamo usare statistiche e marketing.", details: "Scegli quali cookie facoltativi attivare. Puoi modificare le preferenze in qualsiasi momento dal footer.", reject: "Rifiuta", accept: "Accetta tutti", customize: "Personalizza", save: "Salva scelta", back: "Indietro", analytics: "Statistiche (Google Analytics)", marketing: "Marketing (Google Ads)", policy: "Informativa privacy e cookie", title: "Preferenze cookie" },
  en: { summary: "We use essential cookies for orders. With your permission we can use analytics and marketing cookies.", details: "Choose which optional cookies to enable. You can change your preferences at any time in the footer.", reject: "Reject", accept: "Accept all", customize: "Customize", save: "Save choices", back: "Back", analytics: "Analytics (Google Analytics)", marketing: "Marketing (Google Ads)", policy: "Privacy & cookie policy", title: "Cookie preferences" },
  de: { summary: "Wir verwenden notwendige Cookies für Bestellungen. Mit Ihrer Einwilligung können wir Analyse- und Marketing-Cookies verwenden.", details: "Wählen Sie optionale Cookies aus. Sie können Ihre Einstellungen jederzeit über die Fußzeile ändern.", reject: "Ablehnen", accept: "Alle akzeptieren", customize: "Anpassen", save: "Auswahl speichern", back: "Zurück", analytics: "Analyse (Google Analytics)", marketing: "Marketing (Google Ads)", policy: "Datenschutz- und Cookie-Richtlinie", title: "Cookie-Einstellungen" },
  es: { summary: "Usamos cookies necesarias para los pedidos. Con tu consentimiento, podemos utilizar cookies de análisis y marketing.", details: "Elige qué cookies opcionales deseas activar. Puedes cambiar tus preferencias en cualquier momento desde el pie de página.", reject: "Rechazar", accept: "Aceptar todas", customize: "Personalizar", save: "Guardar selección", back: "Volver", analytics: "Analítica (Google Analytics)", marketing: "Marketing (Google Ads)", policy: "Política de privacidad y cookies", title: "Preferencias de cookies" },
  fr: { summary: "Nous utilisons des cookies nécessaires aux commandes. Avec votre accord, nous pouvons utiliser des cookies de statistiques et de marketing.", details: "Choisissez les cookies facultatifs à activer. Vous pouvez modifier vos préférences à tout moment depuis le pied de page.", reject: "Refuser", accept: "Tout accepter", customize: "Personnaliser", save: "Enregistrer le choix", back: "Retour", analytics: "Statistiques (Google Analytics)", marketing: "Marketing (Google Ads)", policy: "Politique de confidentialité et cookies", title: "Préférences de cookies" },
  ru: { summary: "Необходимые cookie используются для заказов. Аналитика и реклама — только с вашего согласия.", details: "Выберите необязательные cookie. Изменить решение можно в любой момент через подвал сайта.", reject: "Отклонить", accept: "Принять все", customize: "Настроить", save: "Сохранить", back: "Назад", analytics: "Аналитика (Google Analytics)", marketing: "Реклама (Google Ads)", policy: "Политика конфиденциальности", title: "Настройки cookie" },
} as const;
export default function CookieConsent() {
  const pathname = usePathname();
  const firstSegment = pathname.split("/")[1];
  const locale = firstSegment === "en" || firstSegment === "de" || firstSegment === "es" || firstSegment === "fr" || firstSegment === "ru" ? firstSegment : "it";
  const t = translations[locale];
  useEffect(() => { pageView(); }, [pathname]);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  useEffect(() => {
    ensureTag();
    // Default consent is already initialized synchronously in <head>.
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Choice;
        setAnalytics(Boolean(parsed.analytics));
        setMarketing(Boolean(parsed.marketing));
        apply(parsed);
      } else setOpen(true);
    } catch { setOpen(true); }
    const listener = () => { setExpanded(true); setOpen(true); };
    window.addEventListener("open-cookie-settings", listener);
    return () => window.removeEventListener("open-cookie-settings", listener);
  }, []);
  function save(a: boolean, m: boolean) {
    const choice: Choice = { analytics: a, marketing: m, at: new Date().toISOString() };
    try { localStorage.setItem(KEY, JSON.stringify(choice)); } catch { /* Optional storage can be blocked */ }
    setAnalytics(a); setMarketing(m); setOpen(false); setExpanded(false);
    apply(choice);
  }
  return (
    <>
    {!open && (
      <button type="button" onClick={() => { setExpanded(true); setOpen(true); }}
        className="fixed bottom-4 left-4 z-[100] rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-800 shadow-lg hover:bg-neutral-50 sm:bottom-5 sm:left-5"
        aria-label={t.title}>{t.title}</button>
    )}
    {open && <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] px-3 pb-3 sm:px-5 sm:pb-5" role="region" aria-label={t.title}>
      <section className="pointer-events-auto mx-auto w-full max-w-6xl rounded-2xl border border-neutral-200 bg-white p-6 text-neutral-900 shadow-[0_12px_55px_rgba(0,0,0,.18)] sm:p-9">
        {!expanded ? (
          <div className="flex flex-col items-start gap-3 lg:flex-row lg:items-center lg:gap-8">
            <div className="min-w-0 flex-1"><p className="text-[17px] leading-8 text-neutral-700">{t.summary} <a className="font-semibold underline underline-offset-2" href="/privacy-policy">{t.policy}</a>.</p></div>
            <div className="flex w-full flex-wrap gap-2 lg:w-auto lg:shrink-0">
              <button type="button" onClick={() => save(false, false)} className="rounded-full border border-neutral-300 px-6 py-3.5 text-base font-semibold hover:bg-neutral-50">{t.reject}</button>
              <button type="button" onClick={() => setExpanded(true)} className="rounded-full border border-neutral-300 px-6 py-3.5 text-base font-semibold hover:bg-neutral-50">{t.customize}</button>
              <button type="button" onClick={() => save(true, true)} className="rounded-full bg-neutral-900 px-6 py-3.5 text-base font-semibold text-white hover:bg-neutral-700">{t.accept}</button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold">{t.title}</h2>
            <p className="mt-1 text-base leading-7 text-neutral-600">{t.details} <a href="/privacy-policy" className="underline underline-offset-2">{t.policy}</a>.</p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-8">
              <label className="flex items-center gap-3 text-sm font-medium"><input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="h-4 w-4 accent-neutral-900" />{t.analytics}</label>
              <label className="flex items-center gap-3 text-sm font-medium"><input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="h-4 w-4 accent-neutral-900" />{t.marketing}</label>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={() => save(false, false)} className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-semibold">{t.reject}</button>
              <button type="button" onClick={() => save(analytics, marketing)} className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white">{t.save}</button>
              <button type="button" onClick={() => setExpanded(false)} className="rounded-full px-4 py-2 text-sm font-semibold underline">{t.back}</button>
            </div>
          </div>
        )}
      </section>
    </div>}
    </>
  );
}
