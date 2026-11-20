import { SITE_NAME, SITE_URL, BUSINESS_EMAIL, WHATSAPP_NUMBER } from "@/lib/site";

// IMPORTANT: replace the editorial placeholders with verified legal information before publication.
// Do not add invented street coordinates, phone numbers or opening times.
export const business = {
  name: SITE_NAME,
  url: SITE_URL,
  founded: "2018", // Owner-provided claim: verify supporting documents before deploying.
  legalName: "Consegna Dei Fiori A Milano e dintorni",
  vat: "[P.IVA — da inserire]",
  address: "Via Romilli, Milano (MI), Italia — numero civico da verificare",
  landline: "[Telefono fisso — da inserire]",
  email: "info@consegnah24.it",
  whatsapp: WHATSAPP_NUMBER,
  // Publish these ONLY if they match the real business address and actual opening hours.
  latitude: undefined as number | undefined,
  longitude: undefined as number | undefined,
  openingHours: undefined as string[] | undefined,
};
