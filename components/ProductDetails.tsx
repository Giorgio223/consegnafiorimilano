"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { DELIVERY_FEE, formatEur, getSizePrices, type ProductSize } from "@/data/pricing";

type ProductDetailsProps = {
  locale?: "it" | "en" | "ru";
  product: {
    name: string;
    slug: string;
    price: number;
    category: string;
    image: string;
    description: string;
  };
};

const sizeDescriptions: Record<ProductSize, string> = {
  Piccolo: "Una composizione più compatta, ideale per un pensiero elegante.",
  Medio: "La misura equilibrata e versatile, perfetta per la maggior parte delle occasioni.",
  Premium: "Una composizione più ricca e scenografica per un regalo importante.",
};

export default function ProductDetails({ product, locale = "it" }: ProductDetailsProps) {
  const copy = locale === "en" ? {
    size: "Choose size", quantity: "Quantity", delivery: "Delivery in Milan", total: "Total", proceed: "Continue to order", details: "Product details",
    features: ["Selected fresh flowers", "Carefully prepared arrangement", "Add a personal message", "Home delivery in Milan"],
    sizeDesc: { Piccolo: "A compact arrangement for an elegant gesture.", Medio: "A balanced and versatile size for most occasions.", Premium: "A richer, more impressive arrangement for an important gift." },
  } : locale === "ru" ? {
    size: "Выберите размер", quantity: "Количество", delivery: "Доставка по Милану", total: "Итого", proceed: "Перейти к заказу", details: "О букете",
    features: ["Отборные свежие цветы", "Букет собирается с особой заботой", "Можно добавить личное сообщение", "Доставка по Милану"],
    sizeDesc: { Piccolo: "Компактная композиция для элегантного знака внимания.", Medio: "Универсальный сбалансированный размер.", Premium: "Более пышная премиальная композиция для особого подарка." },
  } : null;
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<ProductSize>("Medio");
  const prices = useMemo(() => getSizePrices(product.price), [product.price]);
  const unitPrice = prices[size];
  const productsTotal = unitPrice * quantity;
  const totalPrice = productsTotal + DELIVERY_FEE;

  return (
    <section className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-2">
      <div>
        <div className="overflow-hidden rounded-[2.5rem] bg-white">
          <Image
            width={1200}
            height={1200}
            src={product.image}
            alt={`${product.name} con consegna a domicilio a Milano`}
            className="aspect-square w-full object-cover"
            priority
          />
        </div>
      </div>

      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8c6f5a]">{product.category}</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight">{product.name}</h1>
        <p className="mt-5 text-3xl font-semibold">Da {formatEur(prices.Piccolo)}</p>
        <p className="mt-7 text-lg leading-8 text-neutral-600">{product.description}</p>

        <div className="mt-8">
          <p className="mb-3 text-sm font-semibold">{copy?.size || "Scegli la dimensione"}</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {(Object.keys(prices) as ProductSize[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSize(option)}
                className={`rounded-2xl border p-4 text-left transition ${size === option ? "border-black bg-black text-white" : "border-black/15 bg-white hover:border-black"}`}
              >
                <span className="block font-bold">{option}</span>
                <span className={`mt-1 block text-sm ${size === option ? "text-white/70" : "text-neutral-500"}`}>{formatEur(prices[option])}</span>
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm leading-6 text-neutral-500">{copy ? copy.sizeDesc[size] : sizeDescriptions[size]}</p>
        </div>

        <div className="mt-8 rounded-[2rem] border border-black/10 bg-white p-6">
          <h2 className="text-xl font-bold">{copy?.details || "Dettagli del prodotto"}</h2>
          <div className="mt-5 space-y-3 text-neutral-600">
            {(copy?.features || ["Fiori freschi selezionati", "Composizione preparata con cura", "Possibilità di aggiungere un messaggio personale", "Consegna a domicilio a Milano"]).map((feature) => <p key={feature}>✓ {feature}</p>)}
          </div>
        </div>

        <div className="mt-8">
          <p className="mb-3 text-sm font-semibold">{copy?.quantity || "Quantità"}</p>
          <div className="flex w-fit items-center overflow-hidden rounded-full border border-black/15 bg-white">
            <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="flex h-14 w-14 items-center justify-center text-2xl transition hover:bg-black hover:text-white" aria-label="Riduci quantità">−</button>
            <div className="flex h-14 min-w-16 items-center justify-center border-x border-black/15 text-lg font-bold">{quantity}</div>
            <button type="button" onClick={() => setQuantity((current) => Math.min(10, current + 1))} className="flex h-14 w-14 items-center justify-center text-2xl transition hover:bg-black hover:text-white" aria-label="Aumenta quantità">+</button>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-black/10 bg-white p-6">
          <div className="flex items-center justify-between text-neutral-600"><span>{product.name} · {size}</span><span>{formatEur(unitPrice)} × {quantity}</span></div>
          <div className="mt-3 flex items-center justify-between text-neutral-600"><span>{copy?.delivery || "Consegna a Milano"}</span><span>{formatEur(DELIVERY_FEE)}</span></div>
          <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-5 text-2xl font-bold"><span>{copy?.total || "Totale"}</span><span>{formatEur(totalPrice)}</span></div>
        </div>

        <Link href={`/checkout?product=${product.slug}&size=${size}&quantity=${quantity}`} className="mt-8 block w-full rounded-full bg-black px-8 py-5 text-center text-lg font-semibold text-white transition hover:opacity-80">
          {copy?.proceed || "Procedi all\'ordine"} — {formatEur(totalPrice)}
        </Link>

        <Link href="/bouquet" className="mt-4 block w-full rounded-full border border-black px-8 py-5 text-center font-semibold transition hover:bg-black hover:text-white">Continua a scegliere</Link>
      </div>
    </section>
  );
}
