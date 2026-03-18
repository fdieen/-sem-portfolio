export type Project = {
  name: string;
  url: string;
  type: string;
  description: string;
  tags: string[];
  year: string;
};

export const projects: Project[] = [
  {
    name: "BeletteringBestellen.nl",
    url: "https://beletteringbestellen.nl",
    type: "Webshop",
    description:
      "Een complete webshop voor plakletters en belettering. Klanten ontwerpen hun tekst in de webshop, zien direct de prijs en kunnen gemakkelijk betalen via iDEAL, Bancontact of creditcard. Inclusief automatische e-mails, Track & Trace en een admin-paneel voor de eigenaar.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Mollie", "Cloudflare"],
    year: "2026",
  },
  // Voeg hier nieuwe projecten toe:
  // {
  //   name: "StemCommunity.nl",
  //   url: "https://stemcommunity.nl",
  //   type: "Website",
  //   description: "...",
  //   tags: ["..."],
  //   year: "2026",
  // },
];
