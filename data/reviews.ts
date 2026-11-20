// Customer testimonials supplied by the store owner, reportedly received over WhatsApp.
// Names are abbreviated as supplied. Do not claim independent order verification.
// Do not generate self-serving LocalBusiness AggregateRating rich-result markup.
import type { Locale } from "@/lib/i18n";
import { ownerReviewDrafts } from "@/data/review-drafts";

export type CustomerReview = {id:string;name:string;district:string;rating:5;translations:Record<Locale,string>};
export const customerReviews: CustomerReview[] = ownerReviewDrafts.map(({id,name,district,rating,translations})=>({id,name,district,rating,translations}));
