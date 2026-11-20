# DEPLOY: 6 языков + домены на Vercel

Главный канонический URL: **https://consegnafiorimilano.it** (без www).

## Шаги

1. Сохраните старую production-версию и настройки Environment Variables в Vercel. Не публикуйте секреты Stripe.
2. Скопируйте содержимое архива в свой GitHub-репозиторий и запустите `npm ci`, `npm run build`.
3. Подключите в **Vercel → Project → Settings → Domains** только домены из `vercel.json`, включая варианты `www`, с DNS/SSL, указанными Vercel. Не трогайте `flowersmilan.co`, `flowersmilan.it`, `flowersmilan.com` и `consegnah24.it`.
4. Выберите `consegnafiorimilano.it` как основной домен. Если Vercel создаёт автоматический редирект в противоположную сторону, удалите его. Отдельно проверьте `www.consegnafiorimilano.it`.
5. Тесты HTTP: `curl -I https://www.consegnafiorimilano.it/` → 301 на корень; `curl -I https://blumenmailand.it/abc` → 301 на `/de`; `curl -I https://flowermilan.it/abc` → 301 на `/en`; тесты аналогично для `/es`, `/fr`, `/ru`.
6. Проверьте `https://consegnafiorimilano.it/{en,de,es,fr,ru}` и карточку товара в каждом языке. Убедитесь, что `<html lang>` соответствует языку, canonical self-referencing, hreflang взаимные, sitemap корректен.
7. Пройдите Stripe Checkout в **тестовом режиме** для каждого языка, проверьте цены, условия доставки, return URL и webhook, прежде чем включать живой трафик.
8. В Google Search Console отправьте `https://consegnafiorimilano.it/sitemap.xml` и наблюдайте за индексацией.

### Важные ограничения

- Редиректы сбрасывают исходные пути на корень нужного языка. Для доменов с уже индексированными страницами нужно отдельно спланировать постраничную миграцию.
- Для `/checkout` язык передаётся параметром `?locale=`; страница предназначена для оформления покупки, а не SEO.
- Страница возврата и политики сайта на итальянском остаются в исходной структуре; политика возвратов `/en/return-policy` и `/ru/return-policy` сохраняются.
- Новые языковые версии отображают названия некоторых товаров по оригинальному коммерческому имени; полную редакторскую локализацию всех наименований и юридических текстов рекомендуется завершить перед продвижением.
- **Сборка ZIP не изменяет Vercel Settings и DNS автоматически.** Подключите домены вручную.
