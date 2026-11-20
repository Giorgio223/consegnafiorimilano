import type { Metadata } from "next";
import Header from "@/components/Header";import Footer from "@/components/Footer";import ReviewsSection from "@/components/ReviewsSection";import { languageAlternates } from "@/lib/i18n";
export const metadata:Metadata={title:"Cosa dicono di noi | Recensioni",description:"Leggi le esperienze autentiche dei clienti di Consegna Fiori Milano e condividi la tua opinione.",alternates:{canonical:"/recensioni",languages:languageAlternates('/recensioni')}};
export default function Page(){return <main><Header/><h1 className="mx-auto max-w-6xl px-6 pt-16 text-4xl font-bold">Cosa dicono di noi</h1><ReviewsSection/><Footer/></main>}
