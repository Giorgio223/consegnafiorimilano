// Pages are published as service-area information, NOT as claims of physical shops.
// Confirm operational coverage and pricing before promising delivery in any municipality.
export type DeliveryArea = {
  slug: string;
  name: string;
  type: "quartiere" | "comune";
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  context: string;
  logistics: string;
  keywords: string[];
};

export const deliveryAreas: DeliveryArea[] = [
  {
    slug: "porta-romana", name: "Porta Romana", type: "quartiere",
    eyebrow: "Milano · Porta Romana",
    title: "Consegna Fiori Porta Romana Milano | Bouquet a Domicilio",
    description: "Vuoi inviare fiori a Porta Romana, Milano? Scegli rose e bouquet online e verifica disponibilità, costi e fascia di consegna per il tuo indirizzo.",
    intro: "Un bouquet per un compleanno, rose per un anniversario o un piccolo gesto inatteso: scegli online la composizione e indica l’indirizzo del destinatario a Porta Romana, Milano.",
    context: "Porta Romana è una zona di Milano con abitazioni, uffici e attività: quando ordini, indica con precisione civico, citofono e nome del destinatario per facilitare il recapito.",
    logistics: "Per una consegna nella zona di Porta Romana, la disponibilità nella data scelta dipende dall’indirizzo, dall’orario e dai fiori selezionati. Se è urgente, scrivici su WhatsApp prima del pagamento.",
    keywords: ["consegna fiori Porta Romana", "fiori Porta Romana Milano", "bouquet Porta Romana"],
  },
  {
    slug: "rogoredo", name: "Rogoredo", type: "quartiere",
    eyebrow: "Milano · Rogoredo",
    title: "Consegna Fiori Rogoredo Milano | Bouquet e Rose",
    description: "Fiori e bouquet per Rogoredo a Milano: ordina online e verifica la disponibilità della consegna a domicilio per data e indirizzo scelti.",
    intro: "Vuoi sorprendere qualcuno a Rogoredo? Nel catalogo puoi scegliere bouquet, rose e fiori per una ricorrenza, con possibilità di indicare una data di consegna.",
    context: "Per gli indirizzi di Rogoredo, inclusi palazzi residenziali e uffici, è utile specificare il nome sul citofono e un recapito del destinatario quando possibile.",
    logistics: "La consegna verso Rogoredo viene verificata in base alla disponibilità operativa e all’orario richiesto; per sorprese in giornata, chiedi conferma su WhatsApp prima di ordinare.",
    keywords: ["consegna fiori Rogoredo", "fiori Rogoredo Milano", "rose Rogoredo"],
  },
  {
    slug: "rozzano", name: "Rozzano", type: "comune",
    eyebrow: "Area metropolitana · Rozzano",
    title: "Consegna Fiori Rozzano | Bouquet e Fiori a Domicilio",
    description: "Cerchi una consegna fiori a Rozzano? Scopri bouquet e rose online; contattaci per confermare copertura, prezzo e tempi prima di ordinare.",
    intro: "Per inviare un bouquet a Rozzano puoi scegliere online la composizione che preferisci, poi verificare con noi se è possibile effettuare la consegna all’indirizzo richiesto.",
    context: "Rozzano è un comune distinto da Milano: prima di completare il pagamento occorre verificare la copertura dell’indirizzo e l’eventuale costo aggiuntivo rispetto alla zona standard.",
    logistics: "Per Rozzano la consegna non è garantita automaticamente: scrivici su WhatsApp indicando indirizzo, CAP, data desiderata e bouquet, così possiamo confermare fattibilità e prezzo.",
    keywords: ["consegna fiori Rozzano", "fiori a domicilio Rozzano", "bouquet Rozzano"],
  },
  {
    slug: "san-giuliano-milanese", name: "San Giuliano Milanese", type: "comune",
    eyebrow: "Area metropolitana · San Giuliano Milanese",
    title: "Consegna Fiori San Giuliano Milanese | Bouquet Online",
    description: "Bouquet e rose da inviare a San Giuliano Milanese: scegli online i fiori e contattaci per confermare copertura, tempi e prezzo della consegna.",
    intro: "Hai un compleanno o un anniversario a San Giuliano Milanese? Esplora il catalogo e chiedici se possiamo organizzare la consegna alla persona che vuoi sorprendere.",
    context: "San Giuliano Milanese è un comune della città metropolitana, non un quartiere di Milano: la copertura e le condizioni di consegna vanno confermate per l’indirizzo specifico.",
    logistics: "Prima di pagare per una destinazione a San Giuliano Milanese, inviaci via WhatsApp l’indirizzo, il CAP e la data preferita per conoscere disponibilità ed eventuali supplementi.",
    keywords: ["consegna fiori San Giuliano Milanese", "fiori San Giuliano Milanese", "bouquet San Giuliano Milanese"],
  },
];

export function getDeliveryArea(slug: string) {
  return deliveryAreas.find((area) => area.slug === slug);
}
export const deliveryAreaUrl = (area: DeliveryArea) => `/zone-consegna/${area.slug}`;
