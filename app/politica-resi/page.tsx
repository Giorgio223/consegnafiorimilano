import type { Metadata } from "next";
import ReturnPolicy from "@/components/ReturnPolicy";
export const metadata: Metadata = {title: 'Politica resi e cancellazioni', alternates: { canonical: "/politica-resi", languages: {"it-IT":"/politica-resi", "en":"/en/return-policy", "ru":"/ru/return-policy"} } };
export default function Page() {return <ReturnPolicy locale="it"/>;}
