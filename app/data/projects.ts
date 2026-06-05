export type Project = {
  name: string;
  url: string;
  type: string;
  description: string;
  techChoices?: string;
  tags: string[];
  year: string;
  comingSoon?: boolean;
  featured?: boolean;
  screenshot?: string;
};

export const projects: Project[] = [
  {
    name: "Hoek Las- en Montagebedrijf",
    url: "https://hoekmontagebedrijf.nl",
    type: "Website",
    screenshot: "/hoek-drone-still.jpg",
    description: "Een complete bedrijfswebsite voor Hoek Las- en Montagebedrijf B.V. uit Rotterdam, gespecialiseerd in verbouwingen, dakkapellen en las- en constructiewerk. Inclusief projecten-galerij, contactformulier, privacyverklaring en algemene voorwaarden. Volledig door mij opgezet en opgeleverd.",
    tags: [],
    year: "2026",
  },
  {
    name: "Donatues",
    url: "https://donatues.com",
    type: "Website",
    screenshot: "https://api.microlink.io/?url=https://donatues.com&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1920&viewport.height=900&waitUntil=networkidle0",
    description: "De volledige website voor Stichting Donatues, een community gericht op studenten. Van opzet tot oplevering volledig door mij gebouwd. De website laat bezoekers zien wat Donatues precies inhoudt en biedt studenten de mogelijkheid om zich aan te sluiten bij de community.",
    tags: [],
    year: "2026",
  },
  {
    name: "Belettering Bestellen",
    url: "https://beletteringbestellen.nl",
    type: "Webshop",
    featured: true,
    screenshot: "/belettering-screenshot.jpg",
    description:
      "Een complete webshop voor plakletters en belettering. Klanten ontwerpen hun tekst in de webshop, zien direct de prijs en kunnen gemakkelijk betalen via iDEAL, Bancontact of creditcard. Inclusief automatische e-mails, Track & Trace en een admin-paneel voor de eigenaar.",
    tags: [],
    year: "2026",
  },
  {
    name: "Stem Barometer",
    url: "",
    type: "Website",
    description: "",
    tags: [],
    year: "2026",
    comingSoon: true,
  },
];
