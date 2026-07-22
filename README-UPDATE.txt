AGGIORNAMENTO PROGETTO — SEO + TRACKING + LINGUE

1) Questo archivio NON contiene node_modules, .next, .git o .env.local.
   È corretto: Vercel installa le dipendenze e genera .next automaticamente.

2) Prima di lavorare in locale:
   npm install
   npm run dev

3) Mantieni il tuo file .env.local locale con:
   STRIPE_SECRET_KEY=...
   ADMIN_PASSWORD=...

4) Tracking ordini:
   - Dopo un pagamento completato il cliente vede subito la timeline.
   - Link permanente: /tracking/<STRIPE_SESSION_ID>
   - Admin: /admin/orders
   - Nell'admin puoi cambiare stato e aggiungere una nota per il cliente.
   - Gli stati sono salvati nei metadata della Checkout Session Stripe.

5) Lingue:
   - Italiano: URL normali, es. /bouquet
   - Inglese: /en, /en/bouquet, /en/prodotti/...
   - Russo: /ru, /ru/bouquet, /ru/prodotti/...
   Il selettore IT / EN / RU è nell'header.

6) SEO:
   - Canonical allineati a https://www.consegnafiorimilano.it
   - Sitemap multilingua con hreflang
   - Landing page dedicate in /servizi/ per query locali ad alta intenzione
   - robots esclude checkout, admin, API e tracking
   - favicon/logo del brand tramite app/icon.png

7) Per pubblicare le modifiche sul GitHub già collegato a Vercel:
   git add .
   git commit -m "SEO multilingual tracking update"
   git push

Vercel eseguirà automaticamente il nuovo deploy.
