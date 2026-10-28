import type { Metadata } from "next";
import ReturnPolicy from "@/components/ReturnPolicy";
export const metadata: Metadata = {title: 'Возврат и отмена заказов', alternates: { canonical: "/ru/return-policy", languages: {"it-IT":"/politica-resi", "en":"/en/return-policy", "ru":"/ru/return-policy"} } };
export default function Page() {return <ReturnPolicy locale="ru"/>;}
