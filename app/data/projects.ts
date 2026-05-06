export type Project = {
  name: string;
  url: string;
  type: string;
  description: string;
  techChoices?: string;
  tags: string[];
  year: string;
  comingSoon?: boolean;
};

export const projects: Project[] = [
  {
    name: "BeletteringBestellen.nl",
    url: "https://beletteringbestellen.nl",
    type: "Webshop",
    description:
      "Een complete webshop voor plakletters en belettering. Klanten ontwerpen hun tekst in de webshop, zien direct de prijs en kunnen gemakkelijk betalen via iDEAL, Bancontact of creditcard. Inclusief automatische e-mails, Track & Trace en een admin-paneel voor de eigenaar.",
    techChoices:
      "Mollie in plaats van Stripe. iDEAL is in Nederland goed voor zo'n 70% van alle online betalingen. Stripe ondersteunt het wel, maar het voelt er als een bijzaak. Mollie is een Nederlands bedrijf dat iDEAL als kern van zijn product heeft gebouwd. Geen gedoe, gewoon werkt het.\n\nCloudflare in plaats van Netlify of Vercel. De webshop is gebouwd met Vite. Dat levert een statische build op: gewoon bestanden, geen server. Cloudflare Pages host die bestanden vanuit een datacenter zo dicht mogelijk bij de bezoeker. Voor Nederlandse bezoekers is dat razendsnel, en gratis.\n\nSupabase in plaats van een eigen backend. Een eigen server opzetten kost tijd en geld. Supabase geeft je in één keer een database, een API en serverless functies. De volledige betalingslogica draait daarin. Er is geen server om bij te houden.\n\nResend in plaats van een SMTP-server. E-mail versturen klinkt simpel. Een eigen mailserver opzetten is dat niet. SPF-records, DKIM, spamfilters — het gaat snel mis. Resend regelt dat allemaal. Eén API-call, mail komt aan.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Mollie", "Cloudflare"],
    year: "2026",
  },
  {
    name: "Luxury Dream",
    url: "",
    type: "Website",
    description: "",
    tags: [],
    year: "2026",
    comingSoon: true,
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
