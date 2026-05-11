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
    name: "BeletteringBestellen.nl",
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
    name: "Donatues",
    url: "https://donatues.com",
    type: "Website",
    screenshot: "https://api.microlink.io/?url=https://donatues.com&screenshot=true&meta=false&embed=screenshot.url",
    description: "De volledige website voor Stichting Donatues, een community gericht op studenten. Van opzet tot oplevering volledig door mij gebouwd. De website laat bezoekers zien wat Donatues precies inhoudt en biedt studenten de mogelijkheid om zich aan te sluiten bij de community.",
    tags: [],
    year: "2026",
  },
  {
    name: "Hoek Las en Montagebedrijf",
    url: "",
    type: "Website",
    description: "",
    tags: [],
    year: "2026",
    comingSoon: true,
  },
  {
    name: "Future Trust and Investment",
    url: "",
    type: "Website",
    description: "",
    tags: [],
    year: "2026",
    comingSoon: true,
  },
];
