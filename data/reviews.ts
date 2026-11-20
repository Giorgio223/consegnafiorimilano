// Publish only independently verified, permissioned testimonials.
// Never populate this array with invented reviews or automatically set a 5.0 rating.
export type CustomerReview = { id: string; name: string; city: string; body: string; rating: 1|2|3|4|5; date: string; verified: true; orderReference?: string };
export const customerReviews: CustomerReview[] = [];
