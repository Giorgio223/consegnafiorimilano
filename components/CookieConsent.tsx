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
    };
    script.onerror = () => { googleStarted = false; };
    document.head.appendChild(script);
  } else if (googleLoaded) {
    pageView();
  }
}
const translations = {
  it: { summary: "Utilizziamo cookie necessari per gli ordini. Con il tuo consenso possiamo usare statistiche e marketing.", details: "Scegli quali cookie facoltativi attivare. Puoi modificare le preferenze in qualsiasi momento dal footer.", reject: "Rifiuta", accept: "Accetta tutti", customize: "Personalizza", save: "Salva scelta", back: "Indietro", analytics: "Statistiche (Google Analytics)", marketing: "Marketing (Google Ads)", policy: "Informativa privacy e cookie", title: "Preferenze cookie" },
  en: { summary: "We use essential cookies for orders. With your permission we can use analytics and marketing cookies.", details: "Choose which optional cookies to enable. You can change your preferences at any time in the footer.", reject: "Reject", accept: "Accept all", customize: "Customize", save: "Save choices", back: "Back", analytics: "Analytics (Google Analytics)", marketing: "Marketing (Google Ads)", policy: "Privacy & cookie policy", title: "Cookie preferences" },
  ru: { summary: "Необходимые cookie используются для заказов. Аналитика и реклама — только с вашего согласия.", details: "Выберите необязательные cookie. Изменить решение можно в любой момент через подвал сайта.", reject: "Отклонить", accept: "Принять все", customize: "Настроить", save: "Сохранить", back: "Назад", analytics: "Аналитика (Google Analytics)", marketing: "Реклама (Google Ads)", policy: "Политика конфиденциальности", title: "Настройки cookie" },
} as const;
export default function CookieConsent() {
  const pathname = usePathname();
  const locale = pathname.startsWith("/ru") ? "ru" : pathname.startsWith("/en") ? "en" : "it";
  const t = translations[locale];
  useEffect(() => { pageView(); }, [pathname]);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  useEffect(() => {
    ensureTag();
    window.gtag?.("consent", "default", consentState({ analytics: false, marketing: false }));
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
  if (!open) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] px-3 pb-3 sm:px-5 sm:pb-5" role="region" aria-label={t.title}>
      <section className="pointer-events-auto mx-auto w-full max-w-6xl rounded-2xl border border-neutral-200 bg-white p-5 text-neutral-900 shadow-[0_12px_55px_rgba(0,0,0,.18)] sm:p-7">
        {!expanded ? (
          <div className="flex flex-col items-start gap-3 lg:flex-row lg:items-center lg:gap-8">
            <div className="min-w-0 flex-1"><p className="text-base leading-7 text-neutral-700">{t.summary} <a className="font-semibold underline underline-offset-2" href="/privacy-policy">{t.policy}</a>.</p></div>
            <div className="flex w-full flex-wrap gap-2 lg:w-auto lg:shrink-0">
              <button type="button" onClick={() => save(false, false)} className="rounded-full border border-neutral-300 px-5 py-3 text-base font-semibold hover:bg-neutral-50">{t.reject}</button>
              <button type="button" onClick={() => setExpanded(true)} className="rounded-full border border-neutral-300 px-5 py-3 text-base font-semibold hover:bg-neutral-50">{t.customize}</button>
              <button type="button" onClick={() => save(true, true)} className="rounded-full bg-neutral-900 px-5 py-3 text-base font-semibold text-white hover:bg-neutral-700">{t.accept}</button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold">{t.title}</h2>
            <p className="mt-1 text-sm leading-6 text-neutral-600">{t.details} <a href="/privacy-policy" className="underline underline-offset-2">{t.policy}</a>.</p>
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
    </div>
  );
}
