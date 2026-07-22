import { NextResponse } from "next/server";
import { getProduct } from "@/data/products";
import {
  DELIVERY_FEE,
  getSizePrices,
  isProductSize,
} from "@/data/pricing";
import { stripeRequest } from "@/lib/stripe";

type CheckoutPayload = {
  productSlug?: string;
  size?: string;
  quantity?: number;
  recipientName?: string;
  recipientPhone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  doorbell?: string;
  deliveryDate?: string;
  message?: string;
  notes?: string;
  customerName?: string;
  customerEmail?: string;
};

type StripeCreateResponse = { id: string; url: string | null };

function add(params: URLSearchParams, key: string, value?: string | number) {
  if (value !== undefined && value !== null && String(value).trim() !== "") {
    params.append(key, String(value));
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutPayload;
    const product = body.productSlug ? getProduct(body.productSlug) : undefined;
    if (!product) {
      return NextResponse.json({ error: "Prodotto non valido" }, { status: 400 });
    }

    const size = isProductSize(body.size) ? body.size : "Medio";
    const quantity = Math.min(Math.max(Math.trunc(Number(body.quantity) || 1), 1), 10);
    const unitPrice = getSizePrices(product.price)[size];

    const required = [
      body.recipientName,
      body.recipientPhone,
      body.address,
      body.city,
      body.postalCode,
      body.deliveryDate,
      body.customerName,
      body.customerEmail,
    ];
    if (required.some((value) => !value?.trim())) {
      return NextResponse.json({ error: "Compila tutti i campi obbligatori" }, { status: 400 });
    }
    if (!/^\d{5}$/.test(body.postalCode!.trim())) {
      return NextResponse.json({ error: "CAP non valido" }, { status: 400 });
    }

    const origin = new URL(request.url).origin;
    const params = new URLSearchParams();
    params.append("mode", "payment");
    params.append("success_url", `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`);
    params.append("cancel_url", `${origin}/checkout/cancel?product=${encodeURIComponent(product.slug)}&size=${encodeURIComponent(size)}&quantity=${quantity}`);
    params.append("customer_email", body.customerEmail!.trim());
    params.append("locale", "it");

    params.append("line_items[0][quantity]", String(quantity));
    params.append("line_items[0][price_data][currency]", "eur");
    params.append("line_items[0][price_data][unit_amount]", String(Math.round(unitPrice * 100)));
    params.append("line_items[0][price_data][product_data][name]", `${product.name} — ${size}`);
    params.append("line_items[0][price_data][product_data][description]", product.shortDescription);

    params.append("line_items[1][quantity]", "1");
    params.append("line_items[1][price_data][currency]", "eur");
    params.append("line_items[1][price_data][unit_amount]", String(Math.round(DELIVERY_FEE * 100)));
    params.append("line_items[1][price_data][product_data][name]", "Consegna a domicilio a Milano");
    params.append("line_items[1][price_data][product_data][description]", "Costo fisso di consegna");

    add(params, "metadata[product_slug]", product.slug);
    add(params, "metadata[product_name]", product.name);
    add(params, "metadata[size]", size);
    add(params, "metadata[quantity]", quantity);
    add(params, "metadata[unit_price]", unitPrice.toFixed(2));
    add(params, "metadata[delivery_fee]", DELIVERY_FEE.toFixed(2));
    add(params, "metadata[recipient_name]", body.recipientName);
    add(params, "metadata[recipient_phone]", body.recipientPhone);
    add(params, "metadata[address]", body.address);
    add(params, "metadata[city]", body.city);
    add(params, "metadata[postal_code]", body.postalCode);
    add(params, "metadata[doorbell]", body.doorbell);
    add(params, "metadata[delivery_date]", body.deliveryDate);
    add(params, "metadata[gift_message]", body.message?.slice(0, 450));
    add(params, "metadata[courier_notes]", body.notes?.slice(0, 450));
    add(params, "metadata[customer_name]", body.customerName);
    add(params, "metadata[customer_email]", body.customerEmail);

    const session = await stripeRequest<StripeCreateResponse>("/checkout/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    if (!session.url) throw new Error("Stripe non ha restituito un URL di pagamento");
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Errore durante la creazione del pagamento" },
      { status: 500 }
    );
  }
}
