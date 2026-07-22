export type SeoLandingPage = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  h1: string;
  intro: string;
  sections: { title: string; body: string }[];
  faq: { q: string; a: string }[];
};

export const seoLandingPages: SeoLandingPage[] = [
  {
    slug: "consegna-fiori-in-giornata-milano",
    title: "Consegna Fiori in Giornata Milano | Bouquet a Domicilio",
    eyebrow: "Consegna in giornata a Milano",
    description: "Richiedi la consegna fiori in giornata a Milano per bouquet, rose e composizioni selezionate. Disponibilità e orari vengono confermati in base alla zona.",
    h1: "Consegna fiori in giornata a Milano",
    intro: "Per un compleanno, un anniversario o una sorpresa dell'ultimo momento puoi richiedere la consegna in giornata a Milano. La disponibilità effettiva dipende dall'orario dell'ordine, dai fiori scelti e dalla zona di consegna.",
    sections: [
      { title: "Fiori freschi per una consegna veloce", body: "Scegli online il bouquet, indica i dati del destinatario e la data desiderata. Per richieste urgenti puoi contattarci su WhatsApp prima del pagamento per verificare la fattibilità della consegna nello stesso giorno." },
      { title: "Consegna a domicilio in diverse zone di Milano", body: "Il servizio è rivolto a Milano e, quando disponibile, ad alcune località della provincia. Tempi e copertura vengono verificati in base all'indirizzo indicato dal cliente." },
    ],
    faq: [
      { q: "La consegna in giornata è sempre garantita?", a: "No. È soggetta alla disponibilità dei fiori, alla zona e all'orario dell'ordine. Per urgenze consigliamo di contattarci prima di completare il pagamento." },
      { q: "Quanto costa la consegna?", a: "Il costo fisso mostrato nel checkout è di 9,99 € salvo eventuali accordi specifici per destinazioni fuori dall'area standard." },
    ],
  },
  {
    slug: "fiorista-milano",
    title: "Fiorista Milano Online | Bouquet e Fiori a Domicilio",
    eyebrow: "Fiorista online a Milano",
    description: "Cerchi un fiorista a Milano? Scopri bouquet, rose, peonie, tulipani e composizioni ordinabili online con consegna a domicilio.",
    h1: "Fiorista a Milano per bouquet e fiori a domicilio",
    intro: "Consegna Fiori Milano è un servizio online dedicato a chi cerca composizioni floreali da ordinare a distanza e inviare a una persona speciale a Milano.",
    sections: [
      { title: "Bouquet per compleanni, anniversari e sorprese", body: "Il catalogo include composizioni romantiche, bouquet colorati e proposte premium. Ogni prodotto può essere scelto in diverse dimensioni e personalizzato con un messaggio." },
      { title: "Ordine online e pagamento sicuro", body: "Inserisci i dati del destinatario sul sito e completa il pagamento tramite Stripe. Dopo il pagamento puoi seguire lo stato dell'ordine attraverso la pagina di tracking." },
    ],
    faq: [{ q: "Posso ordinare fiori online per una persona a Milano?", a: "Sì. Puoi scegliere il bouquet, indicare l'indirizzo del destinatario e completare il pagamento online." }],
  },
  {
    slug: "fiori-urgenti-milano",
    title: "Fiori Urgenti Milano | Consegna Rapida di Bouquet",
    eyebrow: "Fiori urgenti a Milano",
    description: "Hai bisogno di fiori urgenti a Milano? Ordina online e contattaci su WhatsApp per verificare disponibilità e tempi di una consegna rapida.",
    h1: "Fiori urgenti a Milano per sorprese dell'ultimo momento",
    intro: "Quando serve un regalo floreale con poco preavviso, puoi scegliere una composizione disponibile e contattarci per verificare la possibilità di organizzare una consegna rapida.",
    sections: [{ title: "Come richiedere una consegna urgente", body: "Scegli il bouquet e scrivici su WhatsApp indicando zona e orario desiderato. Ti confermeremo la fattibilità prima di procedere." }],
    faq: [{ q: "Posso ricevere i fiori entro poche ore?", a: "Dipende dalla disponibilità, dalla zona e dall'orario. Contattaci per una verifica prima di effettuare l'ordine." }],
  },
  {
    slug: "fiori-express-milano",
    title: "Fiori Express Milano | Consegna Rapida a Domicilio",
    eyebrow: "Fiori express Milano",
    description: "Servizio di fiori express a Milano con ordine online, bouquet freschi e verifica della disponibilità per consegne rapide.",
    h1: "Fiori express a Milano con ordine online",
    intro: "Per chi cerca un servizio rapido e semplice, il catalogo permette di scegliere online bouquet e composizioni e richiedere la consegna all'indirizzo desiderato.",
    sections: [{ title: "Un processo semplice dalla scelta alla consegna", body: "Scegli la composizione, inserisci destinatario, data e indirizzo e completa il pagamento online. Le richieste più urgenti vengono gestite in base alla disponibilità operativa." }],
    faq: [{ q: "Express significa consegna garantita immediata?", a: "No. Indica la possibilità di richiedere una gestione rapida; tempi e disponibilità devono sempre essere confermati." }],
  },
  {
    slug: "consegna-fiori-h24-milano",
    title: "Consegna Fiori H24 Milano | Ordini Online 24 Ore su 24",
    eyebrow: "Ordini online H24",
    description: "Ordina fiori online 24 ore su 24 per consegne a Milano. Gli ordini possono essere effettuati H24; la fascia di consegna viene confermata in base alla disponibilità.",
    h1: "Ordina fiori online H24 per consegne a Milano",
    intro: "Il sito permette di effettuare un ordine online in qualsiasi momento. La consegna non è necessariamente operativa 24 ore su 24: data e fascia vengono gestite in base alla disponibilità del servizio.",
    sections: [{ title: "Ordini online sempre disponibili", body: "Puoi scegliere i fiori, compilare i dati del destinatario e pagare online in qualsiasi momento. Per richieste notturne o particolarmente urgenti è necessario attendere conferma operativa." }],
    faq: [{ q: "Consegnate fiori durante tutta la notte?", a: "Non garantiamo consegne notturne H24. È possibile ordinare online 24 ore su 24, mentre gli orari di consegna dipendono dalla disponibilità operativa." }],
  },
  {
    slug: "consegna-fiori-provincia-milano",
    title: "Consegna Fiori Milano e Provincia | Bouquet a Domicilio",
    eyebrow: "Milano e provincia",
    description: "Richiedi la consegna di fiori a Milano e verifica la disponibilità per comuni della provincia. Bouquet, rose e composizioni floreali online.",
    h1: "Consegna fiori a Milano e provincia",
    intro: "Il servizio è focalizzato sulla città di Milano. Per indirizzi nella provincia puoi contattarci prima dell'ordine per verificare copertura, tempi ed eventuali condizioni di consegna.",
    sections: [{ title: "Verifica della zona di consegna", body: "Scrivici su WhatsApp indicando il comune e l'indirizzo. Ti comunicheremo se la consegna è disponibile per la data richiesta." }],
    faq: [{ q: "Consegnate in tutta la provincia di Milano?", a: "La copertura fuori città varia in base alla distanza e alla disponibilità. È necessaria una verifica preventiva." }],
  },
];

export function getSeoLandingPage(slug: string) {
  return seoLandingPages.find((page) => page.slug === slug);
}
