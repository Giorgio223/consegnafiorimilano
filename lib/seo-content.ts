import type { Locale } from "@/lib/i18n";

export const trustText: Record<Locale, { since: string; about: string; reviews: string; reviewsLead: string; noReviews: string; contact: string; faq: string; trust: string; } > = {
 it: { since: "Dal 2018 consegniamo fiori freschi a domicilio a Milano e provincia, secondo disponibilità.", about: "Chi siamo", reviews: "Cosa dicono di noi", reviewsLead: "Le esperienze dei nostri clienti, raccontate con le loro parole.", noReviews: "Stiamo raccogliendo testimonianze autentiche e verificabili dei clienti. Vuoi condividere la tua esperienza? Scrivici su WhatsApp.", contact: "Dati aziendali e contatti", faq: "Domande frequenti", trust: "Ordini online e assistenza per la consegna a Milano" },
 en: { since: "Since 2018, we have arranged fresh-flower delivery in Milan and the surrounding area, subject to availability.", about: "About us", reviews: "What our customers say", reviewsLead: "Real experiences shared by our customers.", noReviews: "We are collecting authentic, verifiable customer feedback. Would you like to share your experience? Message us on WhatsApp.", contact: "Company details and contact", faq: "Frequently asked questions", trust: "Online ordering and delivery assistance in Milan" },
 de: { since: "Seit 2018 organisieren wir Blumenlieferungen in Mailand und Umgebung, je nach Verfügbarkeit.", about: "Über uns", reviews: "Kundenstimmen", reviewsLead: "Erfahrungen unserer Kundinnen und Kunden.", noReviews: "Wir sammeln derzeit echte, überprüfbare Kundenbewertungen. Teilen Sie Ihre Erfahrung gerne per WhatsApp.", contact: "Unternehmensdaten und Kontakt", faq: "Häufige Fragen", trust: "Onlinebestellung und Beratung zur Lieferung in Mailand" },
 es: { since: "Desde 2018 organizamos entregas de flores frescas en Milán y alrededores, según disponibilidad.", about: "Quiénes somos", reviews: "Opiniones de nuestros clientes", reviewsLead: "Experiencias compartidas por nuestros clientes.", noReviews: "Estamos recopilando opiniones auténticas y verificables. ¿Quieres compartir tu experiencia? Escríbenos por WhatsApp.", contact: "Datos de empresa y contacto", faq: "Preguntas frecuentes", trust: "Pedidos online y ayuda con la entrega en Milán" },
 fr: { since: "Depuis 2018, nous organisons la livraison de fleurs fraîches à Milan et dans les environs, selon les disponibilités.", about: "Qui sommes-nous ?", reviews: "Avis de nos clients", reviewsLead: "Les expériences partagées par nos clients.", noReviews: "Nous recueillons des avis clients authentiques et vérifiables. Vous souhaitez partager votre expérience ? Écrivez-nous sur WhatsApp.", contact: "Informations légales et contact", faq: "Questions fréquentes", trust: "Commande en ligne et assistance pour la livraison à Milan" },
 ru: { since: "С 2018 года организуем доставку свежих цветов по Милану и окрестностям при наличии возможности.", about: "О нас", reviews: "Отзывы клиентов", reviewsLead: "Реальный опыт наших покупателей.", noReviews: "Мы собираем подлинные отзывы с подтверждением заказа. Хотите поделиться впечатлениями? Напишите в WhatsApp.", contact: "Реквизиты и контакты", faq: "Частые вопросы", trust: "Онлайн-заказ и помощь с доставкой по Милану" },
};

export const faqByLocale: Record<Locale, {q:string; a:string}[]> = {
 it: [
 { q:"Consegnate anche nelle zone ZTL di Milano?", a:"Possiamo valutare consegne nelle aree ZTL in base all'indirizzo e alle fasce consentite. Contattaci prima dell'ordine per verificare l'accesso." },
 { q:"Posso pagare con una carta emessa all'estero?", a:"Il checkout utilizza Stripe e può accettare carte internazionali supportate dall'emittente e dal circuito. L'esito dipende dalla banca e dai controlli di pagamento." },
 { q:"Posso ricevere una foto del bouquet prima della consegna?", a:"Puoi richiedere una foto tramite WhatsApp: la possibilità di inviarla dipende dal carico di lavoro e non è garantita." },
 { q:"È possibile la consegna in giornata?", a:"Su richiesta e secondo disponibilità di fiori, orario, indirizzo e capacità dei corrieri. Per urgenze contattaci prima di pagare." },
 ],
 en: [
 {q:"Can you deliver to Milan's restricted-traffic (ZTL) areas?",a:"We can assess the address and permitted access times. Please contact us before ordering."},
 {q:"Can I pay with a card issued abroad?",a:"Our Stripe checkout supports eligible international cards, subject to your card issuer's approval."},
 {q:"Can you send a bouquet photo before delivery?",a:"You may request a photo over WhatsApp. Availability depends on workload and cannot be guaranteed."},
 {q:"Do you offer same-day delivery?",a:"On request, subject to flower availability, location, order time and delivery capacity. Please confirm before paying."},
 ],
 de: [
 {q:"Liefern Sie in Mailänder ZTL-Zonen?",a:"Wir prüfen die Zufahrt anhand der Adresse und der erlaubten Zeiten. Bitte kontaktieren Sie uns vor der Bestellung."},
 {q:"Kann ich mit einer ausländischen Karte zahlen?",a:"Die Zahlung läuft über Stripe. Internationale Karten werden je nach Kartenaussteller unterstützt."},
 {q:"Kann ich vor der Lieferung ein Foto erhalten?",a:"Fotos können per WhatsApp angefragt werden, sind aber abhängig vom Arbeitsaufkommen und nicht garantiert."},
 {q:"Ist eine Lieferung am selben Tag möglich?",a:"Auf Anfrage und je nach Blumenverfügbarkeit, Uhrzeit, Adresse und Kurierkapazität."},
 ],
 es: [
 {q:"¿Entregáis en las zonas ZTL de Milán?",a:"Podemos comprobar el acceso según la dirección y el horario permitido. Consúltanos antes de comprar."},
 {q:"¿Aceptáis tarjetas extranjeras?",a:"El pago se realiza con Stripe y admite tarjetas internacionales compatibles, sujeto a la aprobación del emisor."},
 {q:"¿Puedo pedir una foto antes de la entrega?",a:"Puedes solicitarla por WhatsApp, según la carga de trabajo; no está garantizada."},
 {q:"¿Hay entrega el mismo día?",a:"Bajo petición y según flores disponibles, hora, dirección y capacidad de reparto."},
 ],
 fr: [
 {q:"Livrez-vous dans les zones ZTL de Milan ?",a:"Nous pouvons vérifier l'accès selon l'adresse et les horaires autorisés. Contactez-nous avant de commander."},
 {q:"Puis-je payer avec une carte étrangère ?",a:"Le paiement passe par Stripe et accepte les cartes internationales éligibles, sous réserve de validation bancaire."},
 {q:"Puis-je recevoir une photo avant la livraison ?",a:"Vous pouvez la demander sur WhatsApp, selon la charge de travail. Ce service n'est pas garanti."},
 {q:"La livraison le jour même est-elle possible ?",a:"Sur demande, selon les fleurs disponibles, l'heure, l'adresse et la capacité de livraison."},
 ],
 ru: [
 {q:"Доставляете ли вы в зоны ZTL Милана?",a:"Проверяем доступ по адресу и разрешённому времени въезда. Свяжитесь с нами до заказа."},
 {q:"Можно оплатить иностранной банковской картой?",a:"Оплата через Stripe поддерживает подходящие международные карты, если платёж одобряет банк."},
 {q:"Можно получить фото букета до доставки?",a:"Фото можно запросить в WhatsApp, но отправка зависит от загруженности и не гарантируется."},
 {q:"Возможна доставка в день заказа?",a:"По запросу, при наличии цветов и свободного времени курьера. Срочные заказы согласуйте до оплаты."},
 ],
};

const faqExtra:Record<Locale,{q:string;a:string}[]> = {
 it:[{q:"Quanto tempo richiede una consegna urgente a Milano?",a:"Dipende da orario, indirizzo, disponibilità dei fiori e dei corrieri. Contattaci su WhatsApp prima di ordinare per una stima."},{q:"Che cosa succede se il destinatario non è presente?",a:"Contatteremo il recapito indicato per cercare una soluzione; eventuali ulteriori tentativi e costi saranno concordati."},{q:"Posso aggiungere un biglietto o inviare fiori in forma anonima?",a:"Puoi richiedere un biglietto personalizzato o di non inserire il nome del mittente; verifica le opzioni prima del pagamento."}],
 en:[{q:"How quickly can you deliver urgent flowers in Milan?",a:"Timing depends on the hour, address, flower stock and courier capacity. Ask on WhatsApp for an estimate before ordering."},{q:"What if the recipient is not at home?",a:"We will try to contact the number provided and agree on a solution; extra attempts and fees must be agreed."},{q:"Can I add a card or send flowers anonymously?",a:"You may request a personalised message or omit the sender's name; please confirm the options before paying."}],
 de:[{q:"Wie schnell ist eine Expresslieferung in Mailand?",a:"Dies hängt von Uhrzeit, Adresse, Blumenbestand und Kurieren ab. Fragen Sie vor der Bestellung per WhatsApp nach."},{q:"Was passiert, wenn niemand zu Hause ist?",a:"Wir versuchen, den angegebenen Kontakt zu erreichen und eine Lösung abzustimmen. Weitere Versuche und Kosten werden vereinbart."},{q:"Kann ich eine Karte hinzufügen oder anonym Blumen senden?",a:"Sie können einen Grußtext hinzufügen oder den Absendernamen weglassen. Bitte vor der Zahlung bestätigen."}],
 es:[{q:"¿Cuánto tarda una entrega urgente en Milán?",a:"Depende de la hora, la dirección, las flores y los repartidores. Consulta por WhatsApp antes de comprar."},{q:"¿Qué ocurre si el destinatario no está?",a:"Intentaremos contactar con el número facilitado para acordar una solución y los posibles costes adicionales."},{q:"¿Puedo añadir una tarjeta o enviar flores anónimamente?",a:"Puedes solicitar una dedicatoria u omitir el nombre del remitente; confirma las opciones antes de pagar."}],
 fr:[{q:"Quel est le délai d'une livraison urgente à Milan ?",a:"Il dépend de l'heure, de l'adresse, des fleurs et des livreurs disponibles. Contactez-nous sur WhatsApp avant de commander."},{q:"Et si le destinataire est absent ?",a:"Nous tenterons de joindre le contact fourni et de convenir d'une solution; frais et nouvelles tentatives sont à confirmer."},{q:"Puis-je ajouter une carte ou envoyer des fleurs anonymement ?",a:"Vous pouvez demander un message personnel ou l'absence du nom de l'expéditeur; confirmez avant le paiement."}],
 ru:[{q:"Сколько занимает срочная доставка по Милану?",a:"Зависит от времени заказа, адреса, цветов и курьеров. Напишите в WhatsApp до оплаты для уточнения."},{q:"Что, если получателя не будет дома?",a:"Попытаемся связаться по указанному номеру и согласовать решение; повторная доставка и расходы обсуждаются отдельно."},{q:"Можно добавить открытку или отправить цветы анонимно?",a:"Можно попросить открытку с вашим текстом или не указывать имя отправителя; уточните детали перед оплатой."}]
};
for(const locale of Object.keys(faqByLocale) as Locale[]) faqByLocale[locale] = [faqExtra[locale][0], ...faqByLocale[locale], ...faqExtra[locale].slice(1)];
