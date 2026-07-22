const STRIPE_API = "https://api.stripe.com/v1";

function getSecretKey() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY non configurata");
  }
  return key;
}

export async function stripeRequest<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${getSecretKey()}`);

  const response = await fetch(`${STRIPE_API}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });

  const data = (await response.json()) as T & { error?: { message?: string } };
  if (!response.ok) {
    throw new Error(data.error?.message || "Errore Stripe");
  }
  return data;
}

export type StripeSession = {
  id: string;
  created: number;
  status: "open" | "complete" | "expired";
  payment_status: "paid" | "unpaid" | "no_payment_required";
  amount_total: number | null;
  currency: string | null;
  customer_details?: { email?: string | null; name?: string | null } | null;
  metadata: Record<string, string> | null;
};

export type StripeSessionList = {
  data: StripeSession[];
  has_more: boolean;
};
