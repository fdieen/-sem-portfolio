export default function SeoFooter() {
  const diensten = [
    { label: "Website laten maken", href: "#contact" },
    { label: "Webshop bouwen", href: "#contact" },
    { label: "Bedrijfswebsite op maat", href: "#contact" },
    { label: "React & Next.js development", href: "#contact" },
    { label: "Onderhoud & beheer", href: "#contact" },
    { label: "SEO-vriendelijke websites", href: "#contact" },
    { label: "Landingspagina's", href: "#contact" },
    { label: "Portfolio websites", href: "#contact" },
  ];

  const faq = [
    {
      v: "Wat kost een website laten maken?",
      a: "Elk project is anders — neem contact op voor een vrijblijvende offerte op maat.",
    },
    {
      v: "Hoe lang duurt het bouwen van een website?",
      a: "Een eenvoudige website is vaak binnen 1–2 weken klaar. Een webshop duurt gemiddeld 2–4 weken.",
    },
    {
      v: "Bouw je ook webshops met online betalen?",
      a: "Ja — inclusief iDEAL, Bancontact en andere betaalmethoden via Mollie of Stripe.",
    },
    {
      v: "Kan ik mijn website zelf beheren na oplevering?",
      a: "Absoluut. Ik bouw een adminpaneel of koppel een CMS zodat je zelf content kunt aanpassen.",
    },
  ];

  const regio = [
    "Webdesign Nederland",
    "Webdesign Eindhoven",
    "Website laten maken Noord-Brabant",
    "Webdesign freelancer",
    "Goedkope website laten maken",
    "Professionele webdesigner",
  ];

  const gerelateerd = [
    "moderne website bouwen",
    "responsive webdesign",
    "maatwerkwebsite",
    "webdesign portfolio",
    "website voor zzp",
    "website voor mkb",
    "snelle website",
    "website met cms",
    "webshop met betaalsysteem",
    "website laten bouwen nederland",
  ];

  return (
    <section
      aria-label="Informatie over webdesign diensten"
      className="border-t border-white/[0.06]"
      style={{ background: "#03040b" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-6">

        <p className="text-[9px] tracking-[0.2em] uppercase text-white/20 mb-4 font-mono">
          SVD WebDesign — Diensten & informatie
        </p>

        {/* Alles op één rij: 4 kolommen naast elkaar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Kolom 1: Diensten */}
          <div>
            <h3 className="text-[9px] tracking-[0.2em] uppercase text-[#6ee7f7]/50 font-mono mb-2">
              Diensten
            </h3>
            <ul className="space-y-1">
              {diensten.map((d) => (
                <li key={d.label}>
                  <a
                    href={d.href}
                    className="text-[11px] text-white/30 hover:text-white/60 transition-colors duration-200"
                  >
                    {d.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 2: Werkgebied */}
          <div>
            <h3 className="text-[9px] tracking-[0.2em] uppercase text-[#6ee7f7]/50 font-mono mb-2">
              Werkgebied
            </h3>
            <ul className="space-y-1 mb-4">
              {regio.map((r) => (
                <li key={r} className="text-[11px] text-white/30">
                  {r}
                </li>
              ))}
            </ul>
            <h3 className="text-[9px] tracking-[0.2em] uppercase text-[#6ee7f7]/50 font-mono mb-2">
              Gerelateerd
            </h3>
            <div className="flex flex-wrap gap-x-2 gap-y-0.5">
              {gerelateerd.map((g) => (
                <span key={g} className="text-[10px] text-white/20">
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* Kolom 3 + 4: FAQ */}
          <div className="lg:col-span-2">
            <h3 className="text-[9px] tracking-[0.2em] uppercase text-[#6ee7f7]/50 font-mono mb-2">
              Veelgestelde vragen
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {faq.map((item) => (
                <div key={item.v}>
                  <p className="text-[11px] text-white/40 font-medium leading-snug">
                    {item.v}
                  </p>
                  <p className="text-[10px] text-white/20 leading-snug mt-0.5">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
