"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useMemo, useState } from "react";
import Header from "@/components/Header";
import { isLocale, type Locale, withLocale } from "@/lib/i18n";
import { DELIVERY_SLOTS, type DeliverySlot } from "@/data/delivery-slots";
import { products } from "@/data/products";
import { DELIVERY_FEE, formatEur, getSizePrices, isProductSize, type ProductSize } from "@/data/pricing";

// Customer-facing checkout labels. Stripe uses the same validated locale.
const checkoutTranslations: Record<Locale, Record<string, string>> = {
  it: {"Checkout sicuro": "Checkout sicuro", "Inserisci i dati di consegna": "Inserisci i dati di consegna", "Prima raccogliamo i dati necessari per la consegna. Al passaggio successivo verrai trasferito al checkout sicuro di Stripe per completare il pagamento in euro.": "Prima raccogliamo i dati necessari per la consegna. Al passaggio successivo verrai trasferito al checkout sicuro di Stripe per completare il pagamento in euro.", "Dati del destinatario": "Dati del destinatario", "Nome e cognome *": "Nome e cognome *", "Telefono *": "Telefono *", "Indirizzo di consegna": "Indirizzo di consegna", "Via e numero civico *": "Via e numero civico *", "Città *": "Città *", "CAP *": "CAP *", "Citofono": "Citofono", "Consegna e messaggio": "Consegna e messaggio", "Data di consegna *": "Data di consegna *", "Fascia oraria di consegna *": "Fascia oraria di consegna *", "Nessun supplemento": "Nessun supplemento", "La fascia oraria selezionata sarà riportata nella conferma d’ordine.": "La fascia oraria selezionata sarà riportata nella conferma d’ordine.", "Messaggio sul biglietto": "Messaggio sul biglietto", "Note per il corriere": "Note per il corriere", "I tuoi dati": "I tuoi dati", "Email *": "Email *", "Il tuo telefono * (numero dell’acquirente)": "Il tuo telefono * (numero dell’acquirente)", "Il tuo ordine": "Il tuo ordine", "Dimensione:": "Dimensione:", "Prezzo unitario": "Prezzo unitario", "Quantità": "Quantità", "Subtotale": "Subtotale", "Consegna": "Consegna", "Totale": "Totale", "Modifica prodotto": "Modifica prodotto", "Prodotto non trovato": "Prodotto non trovato", "Il prodotto selezionato non è disponibile.": "Il prodotto selezionato non è disponibile.", "Torna ai bouquet": "Torna ai bouquet", "Vai al pagamento": "Vai al pagamento", "Connessione a Stripe...": "Connessione a Stripe...", "Fascia": "Fascia", "Prima del pagamento consulta la": "Prima del pagamento consulta la", "politica di cancellazione e resi": "politica di cancellazione e resi", "e l’": "e l’", "informativa privacy": "informativa privacy", "I fiori freschi sono deperibili; restano validi i diritti di garanzia previsti dalla legge.": "I fiori freschi sono deperibili; restano validi i diritti di garanzia previsti dalla legge."},
  en: {"Checkout sicuro": "Secure checkout", "Inserisci i dati di consegna": "Enter delivery details", "Prima raccogliamo i dati necessari per la consegna. Al passaggio successivo verrai trasferito al checkout sicuro di Stripe per completare il pagamento in euro.": "We collect the delivery information before transferring you to Stripe to pay securely in euros.", "Dati del destinatario": "Recipient details", "Nome e cognome *": "Full name *", "Telefono *": "Phone *", "Indirizzo di consegna": "Delivery address", "Via e numero civico *": "Street and number *", "Città *": "City *", "CAP *": "Postal code *", "Citofono": "Doorbell", "Consegna e messaggio": "Delivery and message", "Data di consegna *": "Delivery date *", "Fascia oraria di consegna *": "Delivery time slot *", "Nessun supplemento": "No extra charge", "La fascia oraria selezionata sarà riportata nella conferma d’ordine.": "Your selected delivery window will appear in the order confirmation.", "Messaggio sul biglietto": "Card message", "Note per il corriere": "Courier notes", "I tuoi dati": "Your details", "Email *": "Email *", "Il tuo telefono * (numero dell’acquirente)": "Your phone * (buyer's number)", "Il tuo ordine": "Your order", "Dimensione:": "Size:", "Prezzo unitario": "Unit price", "Quantità": "Quantity", "Subtotale": "Subtotal", "Consegna": "Delivery", "Totale": "Total", "Modifica prodotto": "Edit product", "Prodotto non trovato": "Product not found", "Il prodotto selezionato non è disponibile.": "This product is unavailable.", "Torna ai bouquet": "Back to bouquets", "Vai al pagamento": "Proceed to payment", "Connessione a Stripe...": "Connecting to Stripe...", "Fascia": "Time slot", "Prima del pagamento consulta la": "Before payment, please read the", "politica di cancellazione e resi": "cancellation and returns policy", "e l’": "and the", "informativa privacy": "privacy policy", "I fiori freschi sono deperibili; restano validi i diritti di garanzia previsti dalla legge.": "Fresh flowers are perishable; applicable statutory warranty rights remain in force."},
  de: {"Checkout sicuro": "Sicher bezahlen", "Inserisci i dati di consegna": "Lieferdaten eingeben", "Prima raccogliamo i dati necessari per la consegna. Al passaggio successivo verrai trasferito al checkout sicuro di Stripe per completare il pagamento in euro.": "Geben Sie zuerst die Lieferdaten ein. Anschließend bezahlen Sie sicher über Stripe in Euro.", "Dati del destinatario": "Empfängerdaten", "Nome e cognome *": "Vor- und Nachname *", "Telefono *": "Telefon *", "Indirizzo di consegna": "Lieferadresse", "Via e numero civico *": "Straße und Hausnummer *", "Città *": "Stadt *", "CAP *": "Postleitzahl *", "Citofono": "Klingel", "Consegna e messaggio": "Lieferung und Nachricht", "Data di consegna *": "Lieferdatum *", "Fascia oraria di consegna *": "Lieferzeitfenster *", "Nessun supplemento": "Kein Aufpreis", "La fascia oraria selezionata sarà riportata nella conferma d’ordine.": "Das Zeitfenster erscheint in der Bestellbestätigung.", "Messaggio sul biglietto": "Grußkartentext", "Note per il corriere": "Hinweise für den Kurier", "I tuoi dati": "Ihre Daten", "Email *": "E-Mail *", "Il tuo telefono * (numero dell’acquirente)": "Ihr Telefon * (Besteller)", "Il tuo ordine": "Ihre Bestellung", "Dimensione:": "Größe:", "Prezzo unitario": "Einzelpreis", "Quantità": "Anzahl", "Subtotale": "Zwischensumme", "Consegna": "Lieferung", "Totale": "Gesamt", "Modifica prodotto": "Produkt ändern", "Prodotto non trovato": "Produkt nicht gefunden", "Il prodotto selezionato non è disponibile.": "Dieses Produkt ist nicht verfügbar.", "Torna ai bouquet": "Zurück zu Blumensträußen", "Vai al pagamento": "Weiter zur Zahlung", "Connessione a Stripe...": "Verbindung zu Stripe...", "Fascia": "Zeitfenster", "Prima del pagamento consulta la": "Bitte lesen Sie vor der Zahlung die", "politica di cancellazione e resi": "Storno- und Rückgabebedingungen", "e l’": "und die", "informativa privacy": "Datenschutzerklärung", "I fiori freschi sono deperibili; restano validi i diritti di garanzia previsti dalla legge.": "Frische Blumen sind verderblich; gesetzliche Gewährleistungsrechte bleiben bestehen."},
  es: {"Checkout sicuro": "Pago seguro", "Inserisci i dati di consegna": "Introduce los datos de entrega", "Prima raccogliamo i dati necessari per la consegna. Al passaggio successivo verrai trasferito al checkout sicuro di Stripe per completare il pagamento in euro.": "Primero recogemos los datos de entrega. Después pagarás de forma segura con Stripe en euros.", "Dati del destinatario": "Datos del destinatario", "Nome e cognome *": "Nombre y apellidos *", "Telefono *": "Teléfono *", "Indirizzo di consegna": "Dirección de entrega", "Via e numero civico *": "Calle y número *", "Città *": "Ciudad *", "CAP *": "Código postal *", "Citofono": "Timbre", "Consegna e messaggio": "Entrega y mensaje", "Data di consegna *": "Fecha de entrega *", "Fascia oraria di consegna *": "Franja horaria *", "Nessun supplemento": "Sin suplemento", "La fascia oraria selezionata sarà riportata nella conferma d’ordine.": "La franja elegida aparecerá en la confirmación.", "Messaggio sul biglietto": "Mensaje para la tarjeta", "Note per il corriere": "Notas para el repartidor", "I tuoi dati": "Tus datos", "Email *": "Email *", "Il tuo telefono * (numero dell’acquirente)": "Tu teléfono * (comprador)", "Il tuo ordine": "Tu pedido", "Dimensione:": "Tamaño:", "Prezzo unitario": "Precio unitario", "Quantità": "Cantidad", "Subtotale": "Subtotal", "Consegna": "Entrega", "Totale": "Total", "Modifica prodotto": "Cambiar producto", "Prodotto non trovato": "Producto no encontrado", "Il prodotto selezionato non è disponibile.": "Este producto no está disponible.", "Torna ai bouquet": "Volver a los ramos", "Vai al pagamento": "Ir al pago", "Connessione a Stripe...": "Conectando con Stripe...", "Fascia": "Franja", "Prima del pagamento consulta la": "Antes de pagar, consulta la", "politica di cancellazione e resi": "política de cancelación y devoluciones", "e l’": "y la", "informativa privacy": "política de privacidad", "I fiori freschi sono deperibili; restano validi i diritti di garanzia previsti dalla legge.": "Las flores frescas son perecederas; se respetan los derechos legales de garantía."},
  fr: {"Checkout sicuro": "Paiement sécurisé", "Inserisci i dati di consegna": "Informations de livraison", "Prima raccogliamo i dati necessari per la consegna. Al passaggio successivo verrai trasferito al checkout sicuro di Stripe per completare il pagamento in euro.": "Renseignez les informations de livraison, puis payez en toute sécurité avec Stripe en euros.", "Dati del destinatario": "Informations du destinataire", "Nome e cognome *": "Nom et prénom *", "Telefono *": "Téléphone *", "Indirizzo di consegna": "Adresse de livraison", "Via e numero civico *": "Rue et numéro *", "Città *": "Ville *", "CAP *": "Code postal *", "Citofono": "Interphone", "Consegna e messaggio": "Livraison et message", "Data di consegna *": "Date de livraison *", "Fascia oraria di consegna *": "Créneau de livraison *", "Nessun supplemento": "Sans supplément", "La fascia oraria selezionata sarà riportata nella conferma d’ordine.": "Le créneau choisi apparaîtra dans la confirmation.", "Messaggio sul biglietto": "Message sur la carte", "Note per il corriere": "Instructions pour le livreur", "I tuoi dati": "Vos coordonnées", "Email *": "E-mail *", "Il tuo telefono * (numero dell’acquirente)": "Votre téléphone * (acheteur)", "Il tuo ordine": "Votre commande", "Dimensione:": "Taille :", "Prezzo unitario": "Prix unitaire", "Quantità": "Quantité", "Subtotale": "Sous-total", "Consegna": "Livraison", "Totale": "Total", "Modifica prodotto": "Modifier le produit", "Prodotto non trovato": "Produit introuvable", "Il prodotto selezionato non è disponibile.": "Ce produit n’est pas disponible.", "Torna ai bouquet": "Voir les bouquets", "Vai al pagamento": "Passer au paiement", "Connessione a Stripe...": "Connexion à Stripe...", "Fascia": "Créneau", "Prima del pagamento consulta la": "Avant de payer, consultez la", "politica di cancellazione e resi": "politique d’annulation et de retour", "e l’": "et la", "informativa privacy": "politique de confidentialité", "I fiori freschi sono deperibili; restano validi i diritti di garanzia previsti dalla legge.": "Les fleurs fraîches sont périssables; les droits légaux restent applicables."},
  ru: {"Checkout sicuro": "Безопасная оплата", "Inserisci i dati di consegna": "Данные доставки", "Prima raccogliamo i dati necessari per la consegna. Al passaggio successivo verrai trasferito al checkout sicuro di Stripe per completare il pagamento in euro.": "Сначала укажите данные доставки, затем перейдите к безопасной оплате через Stripe в евро.", "Dati del destinatario": "Данные получателя", "Nome e cognome *": "Имя и фамилия *", "Telefono *": "Телефон *", "Indirizzo di consegna": "Адрес доставки", "Via e numero civico *": "Улица и номер дома *", "Città *": "Город *", "CAP *": "Почтовый индекс *", "Citofono": "Домофон", "Consegna e messaggio": "Доставка и сообщение", "Data di consegna *": "Дата доставки *", "Fascia oraria di consegna *": "Время доставки *", "Nessun supplemento": "Без доплаты", "La fascia oraria selezionata sarà riportata nella conferma d’ordine.": "Выбранный интервал будет указан в подтверждении заказа.", "Messaggio sul biglietto": "Текст открытки", "Note per il corriere": "Комментарий курьеру", "I tuoi dati": "Ваши данные", "Email *": "Электронная почта *", "Il tuo telefono * (numero dell’acquirente)": "Ваш телефон * (покупатель)", "Il tuo ordine": "Ваш заказ", "Dimensione:": "Размер:", "Prezzo unitario": "Цена за единицу", "Quantità": "Количество", "Subtotale": "Подытог", "Consegna": "Доставка", "Totale": "Итого", "Modifica prodotto": "Изменить товар", "Prodotto non trovato": "Товар не найден", "Il prodotto selezionato non è disponibile.": "Этот товар недоступен.", "Torna ai bouquet": "К букетам", "Vai al pagamento": "Перейти к оплате", "Connessione a Stripe...": "Подключение к Stripe...", "Fascia": "Интервал", "Prima del pagamento consulta la": "Перед оплатой прочитайте", "politica di cancellazione e resi": "условия отмены и возврата", "e l’": "и", "informativa privacy": "политику конфиденциальности", "I fiori freschi sono deperibili; restano validi i diritti di garanzia previsti dalla legge.": "Свежие цветы скоропортящиеся; законные гарантийные права сохраняются."},
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const rawLocale = searchParams.get("locale");
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "it";
  const tr = (text: string) => checkoutTranslations[locale][text] || text;
  const productSlug = searchParams.get("product");
  const quantityParam = Number(searchParams.get("quantity") ?? "1");
  const sizeParam = searchParams.get("size");

  const quantity = Number.isFinite(quantityParam) ? Math.min(Math.max(Math.trunc(quantityParam), 1), 10) : 1;
  const size: ProductSize = isProductSize(sizeParam) ? sizeParam : "Medio";
  const product = useMemo(() => products.find((item) => item.slug === productSlug), [productSlug]);
  const unitPrice = product ? getSizePrices(product.price)[size] : 0;
  const productsTotal = unitPrice * quantity;
  const [deliverySlot, setDeliverySlot] = useState<DeliverySlot>("afternoon");
  const deliverySurcharge = DELIVERY_SLOTS[deliverySlot].surcharge;
  const totalPrice = productsTotal + DELIVERY_FEE + deliverySurcharge;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!product) return;
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, deliverySlot, productSlug: product.slug, size, quantity, locale }),
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) throw new Error(data.error || "Impossibile avviare il pagamento");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore durante il pagamento");
      setLoading(false);
    }
  }

  const inputClass = "w-full rounded-2xl border border-black/15 bg-white px-5 py-4 outline-none transition focus:border-black";

  if (!product) {
    return <main className="min-h-screen bg-white text-[#1f1f1f]"><Header overrideLocale={locale} /><section className="mx-auto max-w-3xl px-6 py-24 text-center"><h1 className="text-4xl font-bold">{tr("Prodotto non trovato")}</h1><p className="mt-5 text-neutral-600">{tr("Il prodotto selezionato non è disponibile.")}</p><Link href={withLocale("/bouquet", locale)} className="mt-8 inline-block rounded-full bg-black px-8 py-4 font-semibold text-white">{tr("Torna ai bouquet")}</Link></section></main>;
  }

  return (
    <main className="min-h-screen bg-white text-[#1f1f1f]">
      <Header overrideLocale={locale} />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1fr_400px]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8c6f5a]">{tr("Checkout sicuro")}</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{tr("Inserisci i dati di consegna")}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">{tr("Prima raccogliamo i dati necessari per la consegna. Al passaggio successivo verrai trasferito al checkout sicuro di Stripe per completare il pagamento in euro.")}</p>

          <form id="checkout-form" onSubmit={handleSubmit} className="mt-12 space-y-8">
            <section className="rounded-[2rem] border border-black/10 bg-white p-8">
              <p className="text-sm font-bold text-[#8c6f5a]">01</p><h2 className="mt-3 text-2xl font-bold">{tr("Dati del destinatario")}</h2>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <div><label htmlFor="recipientName" className="mb-2 block text-sm font-semibold">{tr("Nome e cognome *")}</label><input id="recipientName" name="recipientName" required placeholder="Mario Rossi" className={inputClass} /></div>
                <div><label htmlFor="recipientPhone" className="mb-2 block text-sm font-semibold">{tr("Telefono *")}</label><input id="recipientPhone" name="recipientPhone" type="tel" inputMode="tel" minLength={7} required placeholder="+39 333 123 4567" className={inputClass} /></div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-black/10 bg-white p-8">
              <p className="text-sm font-bold text-[#8c6f5a]">02</p><h2 className="mt-3 text-2xl font-bold">{tr("Indirizzo di consegna")}</h2>
              <div className="mt-7 space-y-5">
                <div><label htmlFor="address" className="mb-2 block text-sm font-semibold">{tr("Via e numero civico *")}</label><input id="address" name="address" required placeholder="Via Torino 10" className={inputClass} /></div>
                <div className="grid gap-5 md:grid-cols-3">
                  <div><label htmlFor="city" className="mb-2 block text-sm font-semibold">{tr("Città *")}</label><input id="city" name="city" required defaultValue="Milano" className={inputClass} /></div>
                  <div><label htmlFor="postalCode" className="mb-2 block text-sm font-semibold">{tr("CAP *")}</label><input id="postalCode" name="postalCode" inputMode="numeric" pattern="[0-9]{5}" maxLength={5} required placeholder="20121" className={inputClass} /></div>
                  <div><label htmlFor="doorbell" className="mb-2 block text-sm font-semibold">{tr("Citofono")}</label><input id="doorbell" name="doorbell" placeholder="Rossi" className={inputClass} /></div>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-black/10 bg-white p-8">
              <p className="text-sm font-bold text-[#8c6f5a]">03</p><h2 className="mt-3 text-2xl font-bold">{tr("Consegna e messaggio")}</h2>
              <div className="mt-7 space-y-5">
                <div><label htmlFor="deliveryDate" className="mb-2 block text-sm font-semibold">{tr("Data di consegna *")}</label><input id="deliveryDate" name="deliveryDate" type="date" min={new Date().toISOString().slice(0, 10)} required className={inputClass} /></div>
                <fieldset><legend className="mb-3 block text-sm font-semibold">{tr("Fascia oraria di consegna *")}</legend><div className="grid gap-3">{(Object.entries(DELIVERY_SLOTS) as [DeliverySlot, (typeof DELIVERY_SLOTS)[DeliverySlot]][]).map(([key, slot]) => <label key={key} className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 ${deliverySlot === key ? "border-black bg-neutral-50" : "border-black/15"}`}><span className="flex items-center gap-3"><input type="radio" name="deliverySlot" value={key} checked={deliverySlot === key} onChange={() => setDeliverySlot(key)} required /><span>{slot.label}</span></span><span className="font-semibold">{slot.surcharge ? `+${formatEur(slot.surcharge)}` : "Nessun supplemento"}</span></label>)}</div><p className="mt-2 text-sm text-neutral-500">{tr("La fascia oraria selezionata sarà riportata nella conferma d’ordine.")}</p></fieldset>
                <div><label htmlFor="message" className="mb-2 block text-sm font-semibold">{tr("Messaggio sul biglietto")}</label><textarea id="message" name="message" rows={5} maxLength={450} placeholder="Scrivi il tuo messaggio..." className={`${inputClass} resize-none`} /></div>
                <div><label htmlFor="notes" className="mb-2 block text-sm font-semibold">{tr("Note per il corriere")}</label><textarea id="notes" name="notes" rows={3} maxLength={450} placeholder="Scala, piano o altre indicazioni..." className={`${inputClass} resize-none`} /></div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-black/10 bg-white p-8">
              <p className="text-sm font-bold text-[#8c6f5a]">04</p><h2 className="mt-3 text-2xl font-bold">{tr("I tuoi dati")}</h2>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <div><label htmlFor="customerName" className="mb-2 block text-sm font-semibold">{tr("Nome e cognome *")}</label><input id="customerName" name="customerName" required placeholder="Il tuo nome" className={inputClass} /></div>
                <div><label htmlFor="customerEmail" className="mb-2 block text-sm font-semibold">{tr("Email *")}</label><input id="customerEmail" name="customerEmail" type="email" required placeholder="email@esempio.it" className={inputClass} /></div>
                <div><label htmlFor="customerPhone" className="mb-2 block text-sm font-semibold">{tr("Il tuo telefono * (numero dell’acquirente)")}</label><input id="customerPhone" name="customerPhone" type="tel" autoComplete="tel" inputMode="tel" minLength={7} maxLength={25} required placeholder="+39 333 123 4567" className={inputClass} /></div>
              </div>
            </section>

            <p className="text-sm text-neutral-600">{tr("Prima del pagamento consulta la")} <Link href="/politica-resi" target="_blank" className="underline">{tr("politica di cancellazione e resi")}</Link> {tr("e l’")}<Link href="/privacy-policy" target="_blank" className="underline">{tr("informativa privacy")}</Link>. {tr("I fiori freschi sono deperibili; restano validi i diritti di garanzia previsti dalla legge.")}</p>
            {error && <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">{error}</p>}
            <button type="submit" disabled={loading} className="w-full rounded-full bg-black px-8 py-5 text-lg font-semibold text-white disabled:opacity-50 lg:hidden">{loading ? tr("Connessione a Stripe...") : `${tr("Vai al pagamento")} — ${formatEur(totalPrice)}`}</button>
          </form>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[2rem] border border-black/10 bg-white p-7 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8c6f5a]">{tr("Il tuo ordine")}</p>
            <h2 className="mt-4 text-2xl font-bold">{product.name}</h2>
            <p className="mt-2 text-neutral-600">{tr("Dimensione:")} <strong>{size}</strong></p>
            <div className="mt-8 space-y-4 border-t border-black/10 pt-6">
              <div className="flex justify-between gap-4 text-neutral-600"><span>{tr("Prezzo unitario")}</span><span>{formatEur(unitPrice)}</span></div>
              <div className="flex justify-between gap-4 text-neutral-600"><span>{tr("Quantità")}</span><span>{quantity}</span></div>
              <div className="flex justify-between gap-4 text-neutral-600"><span>{tr("Subtotale")}</span><span>{formatEur(productsTotal)}</span></div>
              <div className="flex justify-between gap-4 text-neutral-600"><span>{tr("Consegna")}</span><span>{formatEur(DELIVERY_FEE)}</span></div>
              <div className="flex justify-between gap-4 text-neutral-600"><span>{tr("Fascia")} {DELIVERY_SLOTS[deliverySlot].label}</span><span>{formatEur(deliverySurcharge)}</span></div>
            </div>
            <div className="mt-6 flex justify-between border-t border-black/10 pt-6 text-xl font-bold"><span>{tr("Totale")}</span><span>{formatEur(totalPrice)}</span></div>
            <button type="submit" form="checkout-form" disabled={loading} className="mt-8 hidden w-full rounded-full bg-black px-8 py-5 text-lg font-semibold text-white transition hover:opacity-80 disabled:opacity-50 lg:block">{loading ? tr("Connessione a Stripe...") : `${tr("Vai al pagamento")} — ${formatEur(totalPrice)}`}</button>
            <Link href={withLocale(`/prodotti/${product.slug}`, locale)} className="mt-4 block text-center text-sm font-semibold underline underline-offset-4">{tr("Modifica prodotto")}</Link>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default function CheckoutPage() {
  return <Suspense fallback={<main className="min-h-screen bg-white" />}><CheckoutContent /></Suspense>;
}
