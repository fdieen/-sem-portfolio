"use client";

import { motion } from "framer-motion";

const sections = [
  {
    nr: "01",
    title: "Definities en toepasselijkheid",
    body: [
      "In deze algemene voorwaarden wordt verstaan onder: ‘opdrachtnemer’: SVD WebDesign, gevestigd in Nederland, eigendom van Sem van Dieen. ‘opdrachtgever’: de natuurlijke of rechtspersoon die met opdrachtnemer een overeenkomst sluit of wenst te sluiten.",
      "Deze voorwaarden zijn van toepassing op alle offertes, overeenkomsten en leveringen van diensten door SVD WebDesign, tenzij schriftelijk uitdrukkelijk anders is overeengekomen.",
      "Eventuele inkoop- of andere voorwaarden van opdrachtgever zijn niet van toepassing, tenzij deze door opdrachtnemer uitdrukkelijk schriftelijk zijn aanvaard.",
    ],
  },
  {
    nr: "02",
    title: "Offertes",
    body: [
      "Alle offertes van SVD WebDesign zijn vrijblijvend, tenzij in de offerte een termijn voor aanvaarding is gesteld. Een offerte is geldig gedurende 30 dagen na dagtekening, daarna heeft zij slechts een informatieve waarde.",
      "Opdrachtnemer kan niet aan zijn offerte worden gehouden indien opdrachtgever redelijkerwijs kan begrijpen dat de offerte een kennelijke vergissing of verschrijving bevat.",
      "De in een offerte vermelde prijzen zijn exclusief btw en eventuele kosten van derden (zoals hosting, domeinregistratie, licenties of stockmateriaal), tenzij anders aangegeven.",
    ],
  },
  {
    nr: "03",
    title: "Totstandkoming van de overeenkomst",
    body: [
      "De overeenkomst komt tot stand op het moment dat opdrachtgever de offerte of opdrachtbevestiging schriftelijk (per e-mail volstaat) aanvaardt, dan wel op het moment dat opdrachtnemer met de uitvoering van de werkzaamheden start na uitdrukkelijk akkoord van opdrachtgever.",
      "Indien de aanvaarding afwijkt van het in de offerte opgenomen aanbod, is opdrachtnemer daaraan niet gebonden. De overeenkomst komt dan niet tot stand overeenkomstig deze afwijkende aanvaarding, tenzij opdrachtnemer anders aangeeft.",
    ],
  },
  {
    nr: "04",
    title: "Uitvoering van de opdracht",
    body: [
      "SVD WebDesign zal de overeenkomst naar beste inzicht en vermogen en in overeenstemming met de eisen van goed vakmanschap uitvoeren. Alle verbintenissen zijn inspanningsverplichtingen, geen resultaatsverplichtingen, tenzij uitdrukkelijk anders overeengekomen.",
      "Opdrachtgever draagt er zorg voor dat alle gegevens, materialen en informatie waarvan opdrachtnemer aangeeft dat deze noodzakelijk zijn, tijdig worden aangeleverd. Vertraging in de aanlevering komt voor risico van opdrachtgever.",
      "Opdrachtnemer is gerechtigd bepaalde werkzaamheden door derden te laten verrichten. De toepasselijkheid van artikel 7:404, 7:407 lid 2 en 7:409 BW wordt uitdrukkelijk uitgesloten.",
    ],
  },
  {
    nr: "05",
    title: "Wijzigingen en meerwerk",
    body: [
      "Indien opdrachtgever na het sluiten van de overeenkomst wijzigingen wenst aan te brengen in de specificaties, vormgeving of functionaliteit, geldt dit als meerwerk. Meerwerk wordt apart in rekening gebracht op basis van het op dat moment geldende uurtarief.",
      "Opdrachtnemer zal vooraf, zoveel als redelijkerwijs mogelijk, een indicatie geven van de extra kosten en/of vertraging die het meerwerk met zich meebrengt.",
    ],
  },
  {
    nr: "06",
    title: "Tarieven en betaling",
    body: [
      "Tenzij anders overeengekomen, factureert SVD WebDesign 50% van het overeengekomen bedrag bij aanvang van het project en het resterende deel bij oplevering. Voor onderhouds- en doorlopende dienstverlening wordt maandelijks of jaarlijks gefactureerd.",
      "Betaling dient te geschieden binnen 14 dagen na factuurdatum, op een door opdrachtnemer aan te wijzen bankrekening, zonder verrekening of opschorting.",
      "Bij niet-tijdige betaling is opdrachtgever zonder nadere ingebrekestelling in verzuim en is hij de wettelijke (handels)rente verschuldigd, alsmede alle gerechtelijke en buitengerechtelijke incassokosten.",
      "Bij aanhoudende wanbetaling is opdrachtnemer gerechtigd om de geleverde diensten op te schorten of offline te halen, totdat de openstaande facturen volledig zijn voldaan.",
    ],
  },
  {
    nr: "07",
    title: "Levering en opleveringstermijnen",
    body: [
      "Genoemde opleveringstermijnen zijn indicatief en gelden nimmer als fatale termijn. Overschrijding van een termijn geeft opdrachtgever geen recht op schadevergoeding of ontbinding van de overeenkomst, tenzij sprake is van opzet of bewuste roekeloosheid van opdrachtnemer.",
      "Oplevering vindt plaats zodra het project in een testomgeving of op de productieomgeving voor opdrachtgever beschikbaar is gesteld. Indien opdrachtgever niet binnen 14 dagen na oplevering schriftelijk en gemotiveerd reclameert, wordt de opdracht geacht te zijn goedgekeurd.",
    ],
  },
  {
    nr: "08",
    title: "Hosting, domeinen en derden",
    body: [
      "Indien hosting, domeinregistratie of andere diensten van derden via opdrachtnemer worden afgenomen, gelden tevens de voorwaarden van de betreffende derde partij. Opdrachtnemer is niet aansprakelijk voor storingen, uitval of fouten in de dienstverlening van deze derden.",
      "Opdrachtgever blijft te allen tijde eigenaar van zijn domeinnaam. Op verzoek werkt opdrachtnemer mee aan verhuizing of overdracht, na voldoening van alle openstaande facturen.",
    ],
  },
  {
    nr: "09",
    title: "Intellectueel eigendom",
    body: [
      "Alle door SVD WebDesign ontwikkelde of ter beschikking gestelde werken — waaronder ontwerpen, broncode, teksten en grafisch materiaal — blijven eigendom van opdrachtnemer, tenzij schriftelijk anders is overeengekomen.",
      "Na volledige betaling verkrijgt opdrachtgever een niet-exclusief, niet-overdraagbaar gebruiksrecht op de specifiek voor hem ontwikkelde werken, voor het overeengekomen doel.",
      "Opdrachtnemer behoudt het recht om gebruikte ideeën, technieken, frameworks en achterliggende componenten ook voor andere opdrachten te gebruiken, en het opgeleverde werk te tonen als referentie in zijn portfolio.",
      "Opdrachtgever garandeert dat door hem aangeleverde materialen vrij zijn van rechten van derden en vrijwaart opdrachtnemer voor aanspraken van derden ter zake.",
    ],
  },
  {
    nr: "10",
    title: "Aansprakelijkheid",
    body: [
      "De aansprakelijkheid van SVD WebDesign is beperkt tot directe schade en tot maximaal het bedrag dat in de betreffende opdracht door opdrachtgever is betaald, met een maximum van € 2.500,-.",
      "Opdrachtnemer is niet aansprakelijk voor indirecte schade, waaronder gevolgschade, gederfde winst, gemiste besparingen, dataverlies of schade door bedrijfsstagnatie.",
      "Opdrachtnemer is niet aansprakelijk voor schade die ontstaat doordat opdrachtgever onjuiste of onvolledige informatie heeft verstrekt, of door wijzigingen die opdrachtgever zelf of een door hem ingeschakelde derde in de geleverde producten aanbrengt.",
      "Iedere aanspraak op schadevergoeding vervalt indien deze niet binnen 12 maanden na ontdekking schriftelijk bij opdrachtnemer is gemeld.",
    ],
  },
  {
    nr: "11",
    title: "Overmacht",
    body: [
      "In geval van overmacht is opdrachtnemer gerechtigd de uitvoering van de overeenkomst op te schorten, dan wel de overeenkomst geheel of gedeeltelijk te ontbinden, zonder dat opdrachtnemer tot enige schadevergoeding gehouden is.",
      "Onder overmacht wordt onder meer verstaan: storingen in internet- of telecommunicatie-infrastructuur, stroomstoringen, cyberaanvallen, ziekte, oorlog, overheidsmaatregelen en het niet of niet tijdig nakomen door leveranciers.",
    ],
  },
  {
    nr: "12",
    title: "Geheimhouding en gegevensbescherming",
    body: [
      "Beide partijen verplichten zich tot geheimhouding van alle vertrouwelijke informatie die zij in het kader van de overeenkomst van elkaar hebben verkregen.",
      "Opdrachtnemer verwerkt persoonsgegevens in overeenstemming met de AVG. Indien opdrachtnemer in opdracht persoonsgegevens verwerkt, wordt op verzoek een verwerkersovereenkomst gesloten.",
    ],
  },
  {
    nr: "13",
    title: "Beëindiging",
    body: [
      "Beide partijen kunnen de overeenkomst schriftelijk opzeggen met inachtneming van een redelijke termijn. Reeds verrichte werkzaamheden worden naar rato gefactureerd en dienen door opdrachtgever te worden voldaan.",
      "Opdrachtnemer is gerechtigd de overeenkomst met onmiddellijke ingang op te zeggen indien opdrachtgever in staat van faillissement verkeert, surseance van betaling heeft aangevraagd of structureel zijn verplichtingen niet nakomt.",
    ],
  },
  {
    nr: "14",
    title: "Klachten",
    body: [
      "Klachten over geleverde diensten dienen binnen 14 dagen na oplevering, schriftelijk en gemotiveerd, kenbaar te worden gemaakt aan opdrachtnemer. Een klacht schort de betalingsverplichting van opdrachtgever niet op.",
      "Opdrachtnemer streeft ernaar binnen 14 dagen na ontvangst van de klacht een inhoudelijke reactie te geven en gezamenlijk tot een passende oplossing te komen.",
    ],
  },
  {
    nr: "15",
    title: "Toepasselijk recht en geschillen",
    body: [
      "Op alle overeenkomsten tussen opdrachtgever en SVD WebDesign is uitsluitend Nederlands recht van toepassing.",
      "Geschillen die voortvloeien uit of verband houden met de overeenkomst worden bij uitsluiting voorgelegd aan de bevoegde rechter in het arrondissement waar opdrachtnemer is gevestigd, tenzij dwingend recht een andere rechter aanwijst.",
    ],
  },
];

export default function AlgemeneVoorwaarden() {
  return (
    <section className="relative min-h-screen py-32 px-6 overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#06b6d4]/4 blur-[160px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#7c3aed]/5 blur-[140px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors text-sm mb-8 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Terug naar home
          </a>
          <span className="block text-xs text-[#6ee7f7]/70 uppercase tracking-[0.3em] font-medium mb-4">
            Juridisch
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Algemene voorwaarden
          </h1>
          <p className="text-white/40 text-base leading-relaxed max-w-xl">
            Deze voorwaarden zijn van toepassing op alle offertes, opdrachten en
            leveringen van SVD WebDesign. Laatst bijgewerkt: juni 2026.
          </p>
        </motion.div>

        {/* Company block */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mb-14 p-6 rounded-2xl border"
          style={{
            background: "rgba(8,12,22,0.7)",
            borderColor: "rgba(110,231,247,0.18)",
            backdropFilter: "blur(12px)",
          }}
        >
          <p className="text-xs text-white/30 uppercase tracking-widest mb-3">
            Bedrijfsgegevens
          </p>
          <div className="space-y-1 text-sm text-white/60 leading-relaxed">
            <p><span className="text-white/40">Handelsnaam:</span> SVD WebDesign</p>
            <p><span className="text-white/40">Eigenaar:</span> Sem van Dieen</p>
            <p>
              <span className="text-white/40">E-mail:</span>{" "}
              <a
                href="mailto:semvdwebdesign@gmail.com"
                className="text-[#6ee7f7] hover:text-white transition-colors"
              >
                semvdwebdesign@gmail.com
              </a>
            </p>
            <p>
              <span className="text-white/40">Website:</span>{" "}
              <a
                href="https://svdwebdesign.nl"
                className="text-[#6ee7f7] hover:text-white transition-colors"
              >
                svdwebdesign.nl
              </a>
            </p>
          </div>
        </motion.div>

        {/* Articles */}
        <div className="space-y-6">
          {sections.map((s, i) => (
            <motion.article
              key={s.nr}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.04, 0.3) }}
              className="relative p-6 rounded-2xl border group"
              style={{
                background: "rgba(8,12,22,0.6)",
                borderColor: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl font-mono text-[11px] font-bold"
                  style={{
                    background: "rgba(110,231,247,0.08)",
                    color: "#6ee7f7",
                    border: "1px solid rgba(110,231,247,0.2)",
                  }}
                >
                  {s.nr}
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-white text-lg mb-3 leading-snug">
                    {s.title}
                  </h2>
                  <div className="space-y-3 text-white/50 text-sm leading-relaxed">
                    {s.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 flex flex-wrap items-center gap-4"
        >
          <a
            href="/#contact"
            className="bg-[#6ee7f7] text-[#080808] font-semibold px-7 py-3.5 rounded-full hover:bg-white transition-colors duration-200 text-sm"
          >
            Vragen? Neem contact op
          </a>
          <a
            href="mailto:semvdwebdesign@gmail.com"
            className="text-white/50 hover:text-white transition-colors text-sm flex items-center gap-2 group"
          >
            Of stuur een mail
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
