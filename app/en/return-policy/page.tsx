import type { Metadata } from "next";
import ReturnPolicy from "@/components/ReturnPolicy";
export const metadata: Metadata = {title: 'Returns and cancellation policy', alternates: { canonical: "/en/return-policy", languages: {"it-IT":"/politica-resi", "en":"/en/return-policy", "ru":"/ru/return-policy"} } };
export default function Page() {return <ReturnPolicy locale="en"/>;}
