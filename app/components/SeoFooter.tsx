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
    "Webdesign heel Nederland",
    "Online webdesigner",
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

  const headingClass =
    "text-[9px] tracking-[0.2em] uppercase text-[#6ee7f7]/50 font-mono mb-1";
  const separator = (
    <span className="text-white/15 mx-1.5 select-none">·</span>
  );

  return (
    <section
      aria-label="Informatie over webdesign diensten"
      className="border-t border-white/[0.06]"
      style={{ background: "#05060f" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 space-y-3">

        <p className="text-[9px] tracking-[0.2em] uppercase text-white/20 font-mono">
          SVD WebDesign — Diensten & informatie
        </p>

        {/* Diensten — horizontal flowing list */}
        <div>
          <h3 className={headingClass}>Diensten</h3>
          <p className="text-[11px] leading-relaxed">
            {diensten.map((d, i) => (
              <span key={d.label}>
                <a
                  href={d.href}
                  className="text-white/30 hover:text-white/60 transition-colors duration-200"
                >
                  {d.label}
                </a>
                {i < diensten.length - 1 && separator}
              </span>
            ))}
          </p>
        </div>

        {/* Werkgebied + Gerelateerd — side by side on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
          <div>
            <h3 className={headingClass}>Werkgebied</h3>
            <p className="text-[11px] text-white/30 leading-relaxed">
              {regio.map((r, i) => (
                <span key={r}>
                  {r}
                  {i < regio.length - 1 && separator}
                </span>
              ))}
            </p>
          </div>
          <div>
            <h3 className={headingClass}>Gerelateerd</h3>
            <p className="text-[10px] text-white/20 leading-relaxed">
              {gerelateerd.map((g, i) => (
                <span key={g}>
                  {g}
                  {i < gerelateerd.length - 1 && separator}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* FAQ — inline Q + A so each item is compact, 2-col on desktop */}
        <div>
          <h3 className={headingClass}>Veelgestelde vragen</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
            {faq.map((item) => (
              <p key={item.v} className="text-[11px] leading-snug">
                <span className="text-white/40 font-medium">{item.v}</span>{" "}
                <span className="text-white/20">{item.a}</span>
              </p>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
