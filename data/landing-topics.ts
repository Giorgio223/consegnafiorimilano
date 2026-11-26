import type { Locale } from "@/lib/i18n";
export type TopicSlug = "consegna-fiori-in-giornata-milano" | "consegna-fiori-2-ore" | "domenica-festivi" | "consegna-anonima" | "hotel-ristoranti" | "uffici-aziende" | "abbonamento-fiori" | "ordinare-estero" | "duomo-centro" | "brera-moscova" | "porta-nuova-isola" | "navigli-ticinese" | "citylife-fiera" | "porta-romana-corvetto" | "porta-venezia" | "san-siro-wagner" | "laurea" | "nascita" | "compleanno" | "anniversario" | "matrimonio" | "condoglianze" | "mamma-donna" | "scusa-grazie" | "provenienza" | "mercato-fiori" | "filiera-sostenibile" | "cura-fiori" | "significato-fiori" | "consegna-fiori-provincia-milano" | "recensioni-clienti" | "faq-consegna";
export type Topic = {slug:TopicSlug; group:number; titles:Record<Locale,string>; detail:string};
export const topics:Topic[] = [
  {
    "slug": "consegna-fiori-in-giornata-milano",
    "group": 0,
    "titles": {
      "it": "Consegna fiori in giornata",
      "en": "Same-day flower delivery",
      "de": "Blumenlieferung am selben Tag",
      "es": "Flores en el mismo día",
      "fr": "Fleurs le jour même",
      "ru": "Доставка цветов день в день"
    },
    "detail": ""
  },
  {
    "slug": "consegna-fiori-2-ore",
    "group": 0,
    "titles": {
      "it": "Fiori urgenti in 2 ore",
      "en": "Urgent flowers within 2 hours",
      "de": "Expressblumen in 2 Stunden",
      "es": "Flores urgentes en 2 horas",
      "fr": "Fleurs express en 2 heures",
      "ru": "Срочные цветы за 2 часа"
    },
    "detail": ""
  },
  {
    "slug": "domenica-festivi",
    "group": 0,
    "titles": {
      "it": "Fiori di domenica e festivi",
      "en": "Sunday and holiday flowers",
      "de": "Blumen an Sonn- und Feiertagen",
      "es": "Flores domingos y festivos",
      "fr": "Fleurs dimanche et jours fériés",
      "ru": "Цветы в воскресенье и праздники"
    },
    "detail": ""
  },
  {
    "slug": "consegna-anonima",
    "group": 0,
    "titles": {
      "it": "Consegna fiori anonima",
      "en": "Anonymous flower delivery",
      "de": "Anonyme Blumenlieferung",
      "es": "Entrega anónima de flores",
      "fr": "Livraison anonyme de fleurs",
      "ru": "Анонимная доставка цветов"
    },
    "detail": ""
  },
  {
    "slug": "hotel-ristoranti",
    "group": 0,
    "titles": {
      "it": "Fiori in hotel e ristoranti",
      "en": "Flowers for hotels and restaurants",
      "de": "Blumen für Hotels und Restaurants",
      "es": "Flores para hoteles y restaurantes",
      "fr": "Fleurs pour hôtels et restaurants",
      "ru": "Цветы в отели и рестораны"
    },
    "detail": ""
  },
  {
    "slug": "uffici-aziende",
    "group": 0,
    "titles": {
      "it": "Fiori in ufficio e regali aziendali",
      "en": "Office flowers and corporate gifts",
      "de": "Büroblumen und Firmengeschenke",
      "es": "Flores de oficina y regalos de empresa",
      "fr": "Fleurs de bureau et cadeaux d’entreprise",
      "ru": "Цветы в офис и корпоративные подарки"
    },
    "detail": ""
  },
  {
    "slug": "abbonamento-fiori",
    "group": 0,
    "titles": {
      "it": "Abbonamento fiori settimanale",
      "en": "Weekly flower subscription",
      "de": "Wöchentliches Blumenabo",
      "es": "Suscripción semanal de flores",
      "fr": "Abonnement floral hebdomadaire",
      "ru": "Еженедельная подписка на цветы"
    },
    "detail": ""
  },
  {
    "slug": "ordinare-estero",
    "group": 0,
    "titles": {
      "it": "Ordinare fiori dall’estero",
      "en": "Order flowers from abroad",
      "de": "Blumen aus dem Ausland bestellen",
      "es": "Pedir flores desde el extranjero",
      "fr": "Commander des fleurs depuis l’étranger",
      "ru": "Заказ цветов из-за границы"
    },
    "detail": ""
  },
  {
    "slug": "duomo-centro",
    "group": 1,
    "titles": {
      "it": "Fiori Duomo e Quadrilatero",
      "en": "Flowers in Duomo and Quadrilatero",
      "de": "Blumen am Duomo und Quadrilatero",
      "es": "Flores en Duomo y Quadrilatero",
      "fr": "Fleurs à Duomo et Quadrilatero",
      "ru": "Цветы в Дуомо и Квадрилатеро"
    },
    "detail": "CAP 20121"
  },
  {
    "slug": "brera-moscova",
    "group": 1,
    "titles": {
      "it": "Fiori Brera e Moscova",
      "en": "Flowers in Brera and Moscova",
      "de": "Blumen in Brera und Moscova",
      "es": "Flores en Brera y Moscova",
      "fr": "Fleurs à Brera et Moscova",
      "ru": "Цветы в Брера и Москова"
    },
    "detail": "CAP 20121"
  },
  {
    "slug": "porta-nuova-isola",
    "group": 1,
    "titles": {
      "it": "Fiori Porta Nuova, Garibaldi e Isola",
      "en": "Flowers in Porta Nuova, Garibaldi and Isola",
      "de": "Blumen in Porta Nuova, Garibaldi und Isola",
      "es": "Flores en Porta Nuova, Garibaldi e Isola",
      "fr": "Fleurs à Porta Nuova, Garibaldi et Isola",
      "ru": "Цветы в Порта Нуова, Гарибальди и Изола"
    },
    "detail": "CAP 20124, 20159"
  },
  {
    "slug": "navigli-ticinese",
    "group": 1,
    "titles": {
      "it": "Fiori Navigli, Ticinese e Porta Genova",
      "en": "Flowers in Navigli, Ticinese and Porta Genova",
      "de": "Blumen in Navigli, Ticinese und Porta Genova",
      "es": "Flores en Navigli, Ticinese y Porta Genova",
      "fr": "Fleurs à Navigli, Ticinese et Porta Genova",
      "ru": "Цветы в Навильи, Тичинезе и Порта Дженова"
    },
    "detail": "CAP 20123, 20144"
  },
  {
    "slug": "citylife-fiera",
    "group": 1,
    "titles": {
      "it": "Fiori CityLife, Tre Torri e Fiera",
      "en": "Flowers in CityLife, Tre Torri and Fiera",
      "de": "Blumen in CityLife, Tre Torri und Fiera",
      "es": "Flores en CityLife, Tre Torri y Fiera",
      "fr": "Fleurs à CityLife, Tre Torri et Fiera",
      "ru": "Цветы в СитиЛайф, Тре Торри и Фьера"
    },
    "detail": "CAP 20145, 20149"
  },
  {
    "slug": "porta-romana-corvetto",
    "group": 1,
    "titles": {
      "it": "Fiori Porta Romana, Corvetto e Brenta",
      "en": "Flowers in Porta Romana, Corvetto and Brenta",
      "de": "Blumen in Porta Romana, Corvetto und Brenta",
      "es": "Flores en Porta Romana, Corvetto y Brenta",
      "fr": "Fleurs à Porta Romana, Corvetto et Brenta",
      "ru": "Цветы в Порта Романа, Корветто и Брента"
    },
    "detail": "CAP 20135, 20139"
  },
  {
    "slug": "porta-venezia",
    "group": 1,
    "titles": {
      "it": "Fiori Porta Venezia, Buenos Aires e Città Studi",
      "en": "Flowers in Porta Venezia, Buenos Aires and Città Studi",
      "de": "Blumen in Porta Venezia, Buenos Aires und Città Studi",
      "es": "Flores en Porta Venezia, Buenos Aires y Città Studi",
      "fr": "Fleurs à Porta Venezia, Buenos Aires et Città Studi",
      "ru": "Цветы в Порта Венеция и Читта Студи"
    },
    "detail": "CAP 20129, 20133"
  },
  {
    "slug": "san-siro-wagner",
    "group": 1,
    "titles": {
      "it": "Fiori San Siro, Wagner e De Angeli",
      "en": "Flowers in San Siro, Wagner and De Angeli",
      "de": "Blumen in San Siro, Wagner und De Angeli",
      "es": "Flores en San Siro, Wagner y De Angeli",
      "fr": "Fleurs à San Siro, Wagner et De Angeli",
      "ru": "Цветы в Сан-Сиро, Вагнер и Де Анджели"
    },
    "detail": "CAP 20146, 20148"
  },
  {
    "slug": "laurea",
    "group": 2,
    "titles": {
      "it": "Fiori e corone d’alloro per laurea",
      "en": "Graduation flowers and laurel wreaths",
      "de": "Blumen und Lorbeerkränze zum Abschluss",
      "es": "Flores y coronas de laurel de graduación",
      "fr": "Fleurs et couronnes de laurier de diplôme",
      "ru": "Цветы и лавровые венки на выпускной"
    },
    "detail": "Bocconi · Cattolica · Statale · Politecnico"
  },
  {
    "slug": "nascita",
    "group": 2,
    "titles": {
      "it": "Fiori per nascita e maternità",
      "en": "New baby and maternity flowers",
      "de": "Blumen zur Geburt",
      "es": "Flores para nacimiento y maternidad",
      "fr": "Fleurs de naissance et maternité",
      "ru": "Цветы на рождение ребёнка"
    },
    "detail": "Mangiagalli · San Raffaele · Humanitas"
  },
  {
    "slug": "compleanno",
    "group": 2,
    "titles": {
      "it": "Fiori per compleanno",
      "en": "Birthday flowers",
      "de": "Geburtstagsblumen",
      "es": "Flores de cumpleaños",
      "fr": "Fleurs d’anniversaire",
      "ru": "Цветы на день рождения"
    },
    "detail": ""
  },
  {
    "slug": "anniversario",
    "group": 2,
    "titles": {
      "it": "Rose per anniversario e San Valentino",
      "en": "Anniversary and Valentine roses",
      "de": "Rosen zum Jubiläum und Valentinstag",
      "es": "Rosas de aniversario y San Valentín",
      "fr": "Roses d’anniversaire et Saint-Valentin",
      "ru": "Розы на годовщину и День святого Валентина"
    },
    "detail": ""
  },
  {
    "slug": "matrimonio",
    "group": 2,
    "titles": {
      "it": "Bouquet da sposa e matrimonio",
      "en": "Bridal and wedding flowers",
      "de": "Braut- und Hochzeitsblumen",
      "es": "Ramos de novia y boda",
      "fr": "Bouquets de mariée et mariage",
      "ru": "Свадебные цветы и букет невесты"
    },
    "detail": ""
  },
  {
    "slug": "condoglianze",
    "group": 2,
    "titles": {
      "it": "Fiori per condoglianze e funerali",
      "en": "Sympathy and funeral flowers",
      "de": "Trauerblumen und Beerdigung",
      "es": "Flores de condolencias y funerales",
      "fr": "Fleurs de deuil et funérailles",
      "ru": "Цветы для соболезнований и похорон"
    },
    "detail": ""
  },
  {
    "slug": "mamma-donna",
    "group": 2,
    "titles": {
      "it": "Fiori Festa della Mamma e della Donna",
      "en": "Mother’s Day and Women’s Day flowers",
      "de": "Blumen zum Muttertag und Frauentag",
      "es": "Flores del Día de la Madre y de la Mujer",
      "fr": "Fleurs fête des Mères et journée des femmes",
      "ru": "Цветы на День матери и 8 марта"
    },
    "detail": ""
  },
  {
    "slug": "scusa-grazie",
    "group": 2,
    "titles": {
      "it": "Fiori per chiedere scusa o dire grazie",
      "en": "Apology and thank-you flowers",
      "de": "Blumen als Entschuldigung und Dank",
      "es": "Flores para disculpas y agradecimiento",
      "fr": "Fleurs pour s’excuser et remercier",
      "ru": "Цветы для извинения и благодарности"
    },
    "detail": ""
  },
  {
    "slug": "provenienza",
    "group": 3,
    "titles": {
      "it": "Provenienza: Aalsmeer e Sanremo",
      "en": "Flower origins: Aalsmeer and Sanremo",
      "de": "Blumenherkunft: Aalsmeer und Sanremo",
      "es": "Origen floral: Aalsmeer y Sanremo",
      "fr": "Origine des fleurs : Aalsmeer et Sanremo",
      "ru": "Происхождение цветов: Алсмер и Сан-Ремо"
    },
    "detail": "Aalsmeer · Sanremo"
  },
  {
    "slug": "mercato-fiori",
    "group": 3,
    "titles": {
      "it": "Mercato dei fiori e selezione",
      "en": "Flower market and selection",
      "de": "Blumenmarkt und Auswahl",
      "es": "Mercado floral y selección",
      "fr": "Marché aux fleurs et sélection",
      "ru": "Цветочный рынок и отбор"
    },
    "detail": "Ortomercato"
  },
  {
    "slug": "filiera-sostenibile",
    "group": 3,
    "titles": {
      "it": "Filiera corta e sostenibilità",
      "en": "Local sourcing and sustainability",
      "de": "Regionale Lieferkette und Nachhaltigkeit",
      "es": "Cadena local y sostenibilidad",
      "fr": "Circuit court et durabilité",
      "ru": "Местные поставки и экологичность"
    },
    "detail": "Lombardia · Liguria"
  },
  {
    "slug": "cura-fiori",
    "group": 3,
    "titles": {
      "it": "Cura dei fiori recisi",
      "en": "Cut flower care",
      "de": "Schnittblumenpflege",
      "es": "Cuidado de flores cortadas",
      "fr": "Entretien des fleurs coupées",
      "ru": "Уход за срезанными цветами"
    },
    "detail": ""
  },
  {
    "slug": "significato-fiori",
    "group": 3,
    "titles": {
      "it": "Significato dei fiori e colori",
      "en": "Flower meanings and colours",
      "de": "Blumensprache und Farben",
      "es": "Significado y colores de las flores",
      "fr": "Langage et couleurs des fleurs",
      "ru": "Значение цветов и оттенков"
    },
    "detail": ""
  },
  {
    "slug": "consegna-fiori-provincia-milano",
    "group": 3,
    "titles": {
      "it": "Fiori in provincia e Monza",
      "en": "Flowers around Milan and Monza",
      "de": "Blumen im Umland und Monza",
      "es": "Flores en alrededores y Monza",
      "fr": "Fleurs en périphérie et à Monza",
      "ru": "Цветы в пригородах и Монце"
    },
    "detail": "Monza · Sesto San Giovanni · Rho · Assago · Segrate"
  },
  {
    "slug": "recensioni-clienti",
    "group": 3,
    "titles": {
      "it": "Recensioni dei clienti",
      "en": "Customer reviews",
      "de": "Kundenbewertungen",
      "es": "Opiniones de clientes",
      "fr": "Avis clients",
      "ru": "Отзывы клиентов"
    },
    "detail": ""
  },
  {
    "slug": "faq-consegna",
    "group": 3,
    "titles": {
      "it": "Domande sulla consegna fiori",
      "en": "Flower delivery FAQ",
      "de": "Fragen zur Blumenlieferung",
      "es": "Preguntas sobre envío floral",
      "fr": "Questions sur la livraison florale",
      "ru": "Вопросы о доставке цветов"
    },
    "detail": ""
  }
];
export const getTopic=(slug:string)=>topics.find(t=>t.slug===slug);
