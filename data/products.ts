export type Product = {
  name: string;
  slug: string;
  price: number;
  category: string;
  image: string;
  shortDescription: string;
  description: string;
};

export const products: Product[] = [
  {
    name: "Bouquet Eleganza",
    slug: "bouquet-eleganza",
    price: 59,
    category: "Bouquet",
    image:
      "/images/bouquet-eleganza.jpg",
    shortDescription:
      "Un bouquet elegante e raffinato con fiori freschi selezionati.",
    description:
      "Bouquet Eleganza è una composizione floreale raffinata, pensata per compleanni, anniversari, ringraziamenti e momenti speciali.",
  },
  {
    name: "Rose Rosse Premium",
    slug: "rose-rosse-premium",
    price: 79,
    category: "Rose",
    image:
      "/images/rose-rosse-premium.jpg",
    shortDescription:
      "Rose rosse premium per anniversari e sorprese romantiche.",
    description:
      "Una composizione di rose rosse selezionate per esprimere amore, passione e attenzione.",
  },
  {
    name: "Bouquet Primavera",
    slug: "bouquet-primavera",
    price: 49,
    category: "Bouquet",
    image:
      "/images/bouquet-primavera.jpg",
    shortDescription:
      "Un bouquet luminoso e colorato, perfetto per regalare un sorriso.",
    description:
      "Bouquet Primavera combina colori vivaci e fiori freschi per creare una composizione allegra e luminosa.",
  },
  {
    name: "Bouquet Romantico",
    slug: "bouquet-romantico",
    price: 69,
    category: "Bouquet",
    image:
      "/images/bouquet-romantico.jpg",
    shortDescription:
      "Una composizione delicata e romantica pensata per sorprendere.",
    description:
      "Bouquet Romantico è pensato per chi vuole inviare un messaggio speciale attraverso i fiori.",
  },
  {
    name: "Bouquet Bianco",
    slug: "bouquet-bianco",
    price: 64,
    category: "Bouquet",
    image:
      "/images/bouquet-bianco.jpg",
    shortDescription:
      "Fiori bianchi eleganti per occasioni importanti.",
    description:
      "Una composizione floreale dai toni bianchi, elegante e luminosa.",
  },
  {
    name: "Bouquet Colorato",
    slug: "bouquet-colorato",
    price: 55,
    category: "Bouquet",
    image:
      "/images/bouquet-colorato.jpg",
    shortDescription:
      "Un mix di colori vivaci per portare energia e allegria.",
    description:
      "Bouquet Colorato è una composizione allegra e vivace, ideale per compleanni e sorprese.",
  },


  {
    name: "Bouquet Amore Milano",
    slug: "bouquet-amore-milano",
    price: 72,
    category: "Bouquet",
    image:
      "/images/bouquet-amore-milano.jpg",
    shortDescription:
      "Fiori romantici dai toni delicati per sorprendere una persona speciale.",
    description:
      "Una composizione romantica pensata per dichiarazioni, anniversari e sorprese con consegna a domicilio a Milano.",
  },
  {
    name: "Bouquet Compleanno Felice",
    slug: "bouquet-compleanno-felice",
    price: 58,
    category: "Bouquet",
    image:
      "/images/bouquet-compleanno-felice.jpg",
    shortDescription:
      "Un bouquet vivace e festoso per augurare buon compleanno.",
    description:
      "Fiori freschi e colori allegri per trasformare un compleanno in un momento ancora più speciale.",
  },
  {
    name: "Bouquet Dolce Sorpresa",
    slug: "bouquet-dolce-sorpresa",
    price: 62,
    category: "Bouquet",
    image:
      "/images/bouquet-dolce-sorpresa.jpg",
    shortDescription:
      "Una composizione morbida e luminosa per una sorpresa inaspettata.",
    description:
      "Bouquet Dolce Sorpresa unisce fiori freschi e tonalità eleganti per un regalo spontaneo e memorabile.",
  },
  {
    name: "Bouquet Milano Chic",
    slug: "bouquet-milano-chic",
    price: 85,
    category: "Bouquet",
    image:
      "/images/bouquet-milano-chic.jpg",
    shortDescription:
      "Una proposta moderna ed elegante ispirata allo stile milanese.",
    description:
      "Una composizione floreale raffinata per chi cerca un regalo elegante con consegna a Milano.",
  },
  {
    name: "Bouquet Festa",
    slug: "bouquet-festa",
    price: 56,
    category: "Bouquet",
    image:
      "/images/bouquet-festa.jpg",
    shortDescription:
      "Colori allegri e fiori freschi per festeggiare ogni occasione.",
    description:
      "Bouquet Festa è pensato per compleanni, congratulazioni e momenti da celebrare insieme.",
  },
  {
    name: "Bouquet Rosa Cipria",
    slug: "bouquet-rosa-cipria",
    price: 68,
    category: "Bouquet",
    image:
      "/images/bouquet-rosa-cipria.jpg",
    shortDescription:
      "Tonalità rosa delicate per un regalo romantico e raffinato.",
    description:
      "Una composizione nei toni rosa, ideale per sorprendere con eleganza e delicatezza.",
  },
  {
    name: "Bouquet Luce",
    slug: "bouquet-luce",
    price: 61,
    category: "Bouquet",
    image:
      "/images/bouquet-luce.jpg",
    shortDescription:
      "Fiori chiari e luminosi per portare serenità e bellezza.",
    description:
      "Bouquet Luce è una composizione fresca e luminosa adatta a ringraziamenti e occasioni speciali.",
  },
  {
    name: "Bouquet Passione",
    slug: "bouquet-passione",
    price: 76,
    category: "Bouquet",
    image:
      "/images/bouquet-passione.jpg",
    shortDescription:
      "Una composizione intensa pensata per esprimere emozioni forti.",
    description:
      "Bouquet Passione combina tonalità profonde e fiori scelti per un regalo romantico di grande effetto.",
  },
  {
    name: "Bouquet Auguri",
    slug: "bouquet-auguri",
    price: 54,
    category: "Bouquet",
    image:
      "/images/bouquet-auguri.jpg",
    shortDescription:
      "Un bouquet fresco e colorato per inviare i tuoi migliori auguri.",
    description:
      "Una composizione versatile per compleanni, congratulazioni e piccoli grandi traguardi.",
  },
  {
    name: "Bouquet Mamma",
    slug: "bouquet-mamma",
    price: 73,
    category: "Bouquet",
    image:
      "/images/bouquet-mamma.jpg",
    shortDescription:
      "Fiori delicati per dire grazie alla mamma con un gesto speciale.",
    description:
      "Bouquet Mamma è pensato per la Festa della Mamma, compleanni e sorprese piene di affetto.",
  },
  {
    name: "Bouquet Anniversario",
    slug: "bouquet-anniversario",
    price: 82,
    category: "Bouquet",
    image:
      "/images/bouquet-anniversario.jpg",
    shortDescription:
      "Una composizione elegante per celebrare una storia importante.",
    description:
      "Fiori freschi selezionati per anniversari e ricorrenze romantiche con consegna a Milano.",
  },
  {
    name: "Bouquet Sogno Rosa",
    slug: "bouquet-sogno-rosa",
    price: 66,
    category: "Bouquet",
    image:
      "/images/bouquet-sogno-rosa.jpg",
    shortDescription:
      "Tonalità rosa e atmosfera romantica in una composizione delicata.",
    description:
      "Bouquet Sogno Rosa è un regalo elegante per compleanni, anniversari e sorprese romantiche.",
  },
  {
    name: "Bouquet Buongiorno",
    slug: "bouquet-buongiorno",
    price: 52,
    category: "Bouquet",
    image:
      "/images/bouquet-buongiorno.jpg",
    shortDescription:
      "Fiori freschi e luminosi per iniziare la giornata con un sorriso.",
    description:
      "Una composizione allegra da inviare a domicilio a Milano per una sorpresa spontanea.",
  },
  {
    name: "Bouquet Grazie",
    slug: "bouquet-grazie",
    price: 57,
    category: "Bouquet",
    image:
      "/images/bouquet-grazie.jpg",
    shortDescription:
      "Un modo elegante e sincero per dire grazie con i fiori.",
    description:
      "Bouquet Grazie è una composizione fresca e curata per esprimere riconoscenza e affetto.",
  },
  {
    name: "Bouquet Congratulazioni",
    slug: "bouquet-congratulazioni",
    price: 63,
    category: "Bouquet",
    image:
      "/images/bouquet-congratulazioni.jpg",
    shortDescription:
      "Una composizione festosa per celebrare un successo importante.",
    description:
      "Fiori freschi e colori luminosi per lauree, promozioni, nuove case e nuovi inizi.",
  },
  {
    name: "Bouquet Delicato",
    slug: "bouquet-delicato",
    price: 60,
    category: "Bouquet",
    image:
      "/images/bouquet-delicato.jpg",
    shortDescription:
      "Fiori dai toni morbidi per un regalo semplice e raffinato.",
    description:
      "Bouquet Delicato è pensato per chi ama uno stile elegante, naturale e senza eccessi.",
  },
  {
    name: "Bouquet Luxury Milano",
    slug: "bouquet-luxury-milano",
    price: 129,
    category: "Bouquet",
    image:
      "/images/bouquet-luxury-milano.jpg",
    shortDescription:
      "Una composizione premium di grande presenza e raffinatezza.",
    description:
      "Bouquet Luxury Milano è una proposta importante per occasioni speciali e regali di prestigio.",
  },
  {
    name: "Bouquet Piccolo Pensiero",
    slug: "bouquet-piccolo-pensiero",
    price: 45,
    category: "Bouquet",
    image:
      "/images/bouquet-piccolo-pensiero.jpg",
    shortDescription:
      "Un gesto semplice e curato per far sapere a qualcuno che lo pensi.",
    description:
      "Una composizione compatta di fiori freschi, ideale per una sorpresa spontanea a Milano.",
  },
  {
    name: "Bouquet Grande Emozione",
    slug: "bouquet-grande-emozione",
    price: 99,
    category: "Bouquet",
    image:
      "/images/bouquet-grande-emozione.jpg",
    shortDescription:
      "Un bouquet importante per momenti che meritano di essere ricordati.",
    description:
      "Una composizione ricca e scenografica per anniversari, compleanni e grandi sorprese.",
  },
  {
    name: "Bouquet Armonia",
    slug: "bouquet-armonia",
    price: 67,
    category: "Bouquet",
    image:
      "/images/bouquet-armonia.jpg",
    shortDescription:
      "Colori equilibrati e fiori freschi in una composizione armoniosa.",
    description:
      "Bouquet Armonia unisce eleganza e naturalezza per un regalo adatto a molte occasioni.",
  },
  {
    name: "Bouquet Eleganza Bianca",
    slug: "bouquet-eleganza-bianca",
    price: 78,
    category: "Bouquet",
    image:
      "/images/bouquet-eleganza-bianca.jpg",
    shortDescription:
      "Una composizione chiara e sofisticata per un regalo di classe.",
    description:
      "Fiori bianchi e tonalità delicate per cerimonie, ringraziamenti e occasioni importanti.",
  },
  {
    name: "Bouquet Cuore Felice",
    slug: "bouquet-cuore-felice",
    price: 65,
    category: "Bouquet",
    image:
      "/images/bouquet-cuore-felice.jpg",
    shortDescription:
      "Un bouquet allegro e romantico per regalare un sorriso.",
    description:
      "Una composizione fresca e colorata pensata per sorprendere con affetto e leggerezza.",
  },
  {
    name: "Bouquet Festa della Donna",
    slug: "bouquet-festa-della-donna",
    price: 59,
    category: "Bouquet",
    image:
      "/images/bouquet-festa-della-donna.jpg",
    shortDescription:
      "Una proposta luminosa per celebrare una donna speciale.",
    description:
      "Fiori freschi e colori solari per la Festa della Donna e per ogni occasione dedicata a lei.",
  },
  {
    name: "Bouquet San Valentino",
    slug: "bouquet-san-valentino",
    price: 88,
    category: "Bouquet",
    image:
      "/images/bouquet-san-valentino.jpg",
    shortDescription:
      "Una composizione romantica pensata per il giorno degli innamorati.",
    description:
      "Bouquet San Valentino è una proposta intensa ed elegante per sorprendere la persona amata a Milano.",
  },
  {
    name: "Bouquet Sera Speciale",
    slug: "bouquet-sera-speciale",
    price: 74,
    category: "Bouquet",
    image:
      "/images/bouquet-sera-speciale.jpg",
    shortDescription:
      "Fiori eleganti per accompagnare una cena, un invito o una sorpresa.",
    description:
      "Una composizione raffinata pensata per rendere speciale una serata importante.",
  },

  {
    name: "12 Rose Rosse Premium",
    slug: "12-rose-rosse-premium",
    price: 69,
    category: "Rose",
    image:
      "/images/12-rose-rosse-premium.jpg",
    shortDescription:
      "Dodici rose rosse selezionate per un regalo romantico.",
    description:
      "Dodici rose rosse premium selezionate per un regalo romantico e importante.",
  },
  {
    name: "24 Rose Rosse",
    slug: "24-rose-rosse",
    price: 119,
    category: "Rose",
    image:
      "/images/24-rose-rosse.jpg",
    shortDescription:
      "Un bouquet importante di rose rosse.",
    description:
      "Ventiquattro rose rosse per un gesto importante e indimenticabile.",
  },
  {
    name: "Rose Rosa Elegance",
    slug: "rose-rosa-elegance",
    price: 74,
    category: "Rose",
    image:
      "/images/rose-rosa-elegance.jpg",
    shortDescription:
      "Rose rosa delicate e raffinate.",
    description:
      "Una composizione delicata di rose rosa per compleanni e occasioni speciali.",
  },
  {
    name: "Bouquet Rose Romantico",
    slug: "bouquet-rose-romantico",
    price: 89,
    category: "Rose",
    image:
      "/images/bouquet-rose-romantico.jpg",
    shortDescription:
      "Una composizione romantica di rose.",
    description:
      "Un bouquet romantico di rose pensato per anniversari e dichiarazioni.",
  },

  {
    name: "Peonie Rosa",
    slug: "peonie-rosa",
    price: 89,
    category: "Peonie",
    image:
      "/images/peonie-rosa.jpg",
    shortDescription:
      "Peonie rosa delicate e romantiche.",
    description:
      "Una composizione romantica di peonie rosa, perfetta per compleanni e anniversari.",
  },
  {
    name: "Peonie Bianche",
    slug: "peonie-bianche",
    price: 95,
    category: "Peonie",
    image:
      "/images/peonie-bianche.jpg",
    shortDescription:
      "Peonie bianche eleganti e luminose.",
    description:
      "Peonie bianche eleganti e luminose, pensate per occasioni importanti.",
  },
  {
    name: "Bouquet Peonie Premium",
    slug: "bouquet-peonie-premium",
    price: 109,
    category: "Peonie",
    image:
      "/images/bouquet-peonie-premium.jpg",
    shortDescription:
      "Un bouquet premium di peonie.",
    description:
      "Una composizione premium di peonie selezionate per un regalo importante.",
  },
  {
    name: "Peonie Romantiche",
    slug: "peonie-romantiche",
    price: 99,
    category: "Peonie",
    image:
      "/images/peonie-romantiche.jpg",
    shortDescription:
      "Una composizione morbida e romantica.",
    description:
      "Peonie Romantiche è una composizione delicata pensata per occasioni speciali.",
  },

  {
    name: "Tulipani Colorati",
    slug: "tulipani-colorati",
    price: 54,
    category: "Tulipani",
    image:
      "/images/tulipani-colorati.jpg",
    shortDescription:
      "Un bouquet allegro di tulipani colorati.",
    description:
      "Una composizione fresca e colorata di tulipani, ideale per compleanni e sorprese.",
  },
  {
    name: "Tulipani Rosa",
    slug: "tulipani-rosa",
    price: 59,
    category: "Tulipani",
    image:
      "/images/tulipani-rosa.jpg",
    shortDescription:
      "Tulipani rosa delicati ed eleganti.",
    description:
      "Tulipani rosa delicati ed eleganti, perfetti per sorprendere una persona speciale.",
  },
  {
    name: "Tulipani Bianchi",
    slug: "tulipani-bianchi",
    price: 64,
    category: "Tulipani",
    image:
      "/images/tulipani-bianchi.jpg",
    shortDescription:
      "Tulipani bianchi luminosi.",
    description:
      "Tulipani bianchi luminosi e raffinati per occasioni importanti.",
  },
  {
    name: "Bouquet Tulipani Premium",
    slug: "bouquet-tulipani-premium",
    price: 79,
    category: "Tulipani",
    image:
      "/images/bouquet-tulipani-premium.jpg",
    shortDescription:
      "Una selezione premium di tulipani.",
    description:
      "Una composizione premium di tulipani selezionati per momenti importanti.",
  },

  {
    name: "Girasoli Milano",
    slug: "girasoli-milano",
    price: 52,
    category: "Girasoli",
    image:
      "/images/girasoli-milano.jpg",
    shortDescription:
      "Un bouquet solare di girasoli.",
    description:
      "Un bouquet luminoso di girasoli freschi, perfetto per portare allegria.",
  },
  {
    name: "Bouquet Girasoli Premium",
    slug: "bouquet-girasoli-premium",
    price: 69,
    category: "Girasoli",
    image:
      "/images/bouquet-girasoli-premium.jpg",
    shortDescription:
      "Una composizione premium di girasoli.",
    description:
      "Una composizione premium di girasoli selezionati per un regalo speciale.",
  },
  {
    name: "Girasoli e Fiori Colorati",
    slug: "girasoli-fiori-colorati",
    price: 64,
    category: "Girasoli",
    image:
      "/images/girasoli-fiori-colorati.jpg",
    shortDescription:
      "Girasoli e fiori colorati.",
    description:
      "Una composizione vivace che combina girasoli e fiori colorati.",
  },
  {
    name: "Bouquet Sole di Milano",
    slug: "bouquet-sole-milano",
    price: 74,
    category: "Girasoli",
    image:
      "/images/bouquet-sole-milano.jpg",
    shortDescription:
      "Un bouquet allegro e luminoso.",
    description:
      "Una composizione luminosa e originale pensata per sorprendere.",
  },

  {
    name: "Orchidea Bianca Elegance",
    slug: "orchidea-bianca-elegance",
    price: 69,
    category: "Orchidee",
    image:
      "/images/orchidea-bianca-elegance.jpg",
    shortDescription:
      "Un'orchidea bianca elegante e raffinata.",
    description:
      "Un'orchidea bianca elegante e sofisticata, ideale per occasioni importanti.",
  },
  {
    name: "Orchidea Rosa Premium",
    slug: "orchidea-rosa-premium",
    price: 79,
    category: "Orchidee",
    image:
      "/images/orchidea-rosa-premium.jpg",
    shortDescription:
      "Un'orchidea rosa delicata.",
    description:
      "Un'orchidea rosa delicata e raffinata, pensata per un regalo elegante.",
  },
  {
    name: "Composizione Orchidee",
    slug: "composizione-orchidee",
    price: 99,
    category: "Orchidee",
    image:
      "/images/composizione-orchidee.jpg",
    shortDescription:
      "Una composizione elegante di orchidee.",
    description:
      "Una composizione elegante di orchidee pensata per occasioni importanti.",
  },
  {
    name: "Orchidea Luxury Milano",
    slug: "orchidea-luxury-milano",
    price: 119,
    category: "Orchidee",
    image:
      "/images/orchidea-luxury-milano.jpg",
    shortDescription:
      "Una proposta premium e sofisticata.",
    description:
      "Una proposta premium pensata per chi desidera un regalo elegante e memorabile.",
  },
];

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
export const getProductsByCategory = (category: string) => products.filter((product) => product.category === category);
