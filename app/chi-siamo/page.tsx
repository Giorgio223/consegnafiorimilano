import type { Metadata } from "next";
import Header from "@/components/Header";import Footer from "@/components/Footer";import AboutSection from "@/components/AboutSection";import { languageAlternates } from "@/lib/i18n";
export const metadata:Metadata={title:"Chi siamo | Consegna Fiori Milano",description:"Scopri il servizio di consegna fiori a Milano dal 2018, i contatti e i dettagli aziendali.",alternates:{canonical:"/chi-siamo",languages:languageAlternates('/chi-siamo')}};
export default function Page(){return <main><Header/><AboutSection/><Footer/></main>}
