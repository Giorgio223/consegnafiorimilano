# Consegna Fiori Milano

Sito Next.js ottimizzato per un progetto locale di consegna fiori a Milano.

## Avvio locale

```bash
npm install
npm run dev
```

## Controlli prima della pubblicazione

```bash
npm run lint
npm run build
```

## SEO incluso

- sitemap.xml generata automaticamente
- robots.txt con checkout escluso dall'indicizzazione
- canonical URL sulle pagine principali
- redirect permanente da `/rose` a `/fiori/rose`
- pagine prodotto generate staticamente
- dati strutturati Product sulle schede prodotto
- Open Graph e Twitter metadata
- immagini gestite tramite `next/image`
- navigazione mobile e internal linking

## Nota checkout

Il checkout valida i dati e non simula più un pagamento inesistente. Prima della pubblicazione commerciale va collegato a un backend ordini e/o provider di pagamento reale.

## Stripe e area amministratore

Il progetto include Stripe Checkout e un pannello ordini protetto.

1. Copia `.env.example` in `.env.local`.
2. Inserisci `STRIPE_SECRET_KEY=sk_test_...` per i test.
3. Imposta una password forte in `ADMIN_PASSWORD=...`.
4. Avvia il progetto con `npm run dev`.
5. Gli ordini sono visibili in `/admin/orders`.

Su Vercel aggiungi le stesse variabili in Project Settings > Environment Variables. Non pubblicare mai `.env.local` e non inserire chiavi `sk_live_...` nel codice o su GitHub.
