"use client";
import { useEffect } from "react";

/** This component only renders for a Stripe session verified as paid server-side. */
export default function PurchaseAnalytics({ id, total, currency }: { id: string; total: number; currency: string }) {
  useEffect(() => {
    if (!id.startsWith("cs_") || !Number.isFinite(total) || total <= 0) return;
    const amount = total / 100;
    const isoCurrency = currency.toUpperCase();
    const preferenceKey = "cfm_cookie_preferences_v1";
    const send = () => {
      try {
        const raw = localStorage.getItem(preferenceKey);
        if (!raw || typeof window.gtag !== "function") return;
        const consent = JSON.parse(raw) as { analytics?: boolean; marketing?: boolean };
        // A distinct key per destination prevents an Analytics event from suppressing Ads,
        // or vice versa, when the visitor changes consent after checkout.
        const destinations = [
          { allowed: Boolean(consent.analytics), configured: Boolean(process.env.NEXT_PUBLIC_GA4_ID),
            key: `cfm_ga4_purchase_${id}`,
            fire: () => window.gtag?.("event", "purchase", {
              send_to: process.env.NEXT_PUBLIC_GA4_ID, transaction_id: id,
              value: amount, currency: isoCurrency,
            }) },
          { allowed: Boolean(consent.marketing), configured: Boolean(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID && process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL),
            key: `cfm_ads_purchase_${id}`,
            fire: () => window.gtag?.("event", "conversion", {
              send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}/${process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL}`,
              transaction_id: id, value: amount, currency: isoCurrency,
            }) },
        ];
        for (const destination of destinations) {
          if (!destination.allowed || !destination.configured || localStorage.getItem(destination.key)) continue;
          destination.fire();
          // Client-side deduplication only. Google's transaction_id should also be used
          // for deduplication; a browser event cannot guarantee delivery if blocked/offline.
          localStorage.setItem(destination.key, "1");
        }
      } catch { /* Tracking must never interfere with an order. */ }
    };
    send();
    window.addEventListener("cfm-google-ready", send);
    window.addEventListener("storage", send);
    return () => {
      window.removeEventListener("cfm-google-ready", send);
      window.removeEventListener("storage", send);
    };
  }, [id, total, currency]);
  return null;
}
