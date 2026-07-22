import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { stripeRequest, type StripeSession } from "@/lib/stripe";
import { isOrderStatus } from "@/lib/tracking";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const { id } = await params;
  const form = await request.formData();
  const status = String(form.get("status") || "");
  const note = String(form.get("note") || "").slice(0, 450);
  if (!isOrderStatus(status)) {
    return NextResponse.redirect(new URL("/admin/orders?error=status", request.url), 303);
  }

  const body = new URLSearchParams();
  body.set("metadata[tracking_status]", status);
  body.set("metadata[tracking_note]", note);
  body.set("metadata[tracking_updated_at]", new Date().toISOString());

  await stripeRequest<StripeSession>(`/checkout/sessions/${encodeURIComponent(id)}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  return NextResponse.redirect(new URL(`/admin/orders?updated=${encodeURIComponent(id)}`, request.url), 303);
}
