"use client";

import { motion } from "framer-motion";

const tags = [
  "Webshops", "Bedrijfswebsites", "iDEAL betalingen", "Admin panelen",
  "SEO", "Mobile-first", "Maatwerk", "E-commerce", "Branding", "Landingspages",
  "Databases", "Email automatisering", "Snelle laadtijden", "Op maat"
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6 overflow-hidden">
      {/* Achtergrond — deep navy, smooth fade vanuit donker */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060f] via-[#080c1e] to-[#0a0f28]" />

      {/* Lichte glows voor diepte */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#6ee7f7]/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#7c3aed]/8 blur-[110px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-xs text-[#6ee7f7] uppercase tracking-widest font-medium">
            Wat ik bied
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-3 tracking-tight">
            Divers. Aanpasbaar.<br />
            <span className="text-[#6ee7f7]">Altijd op maat.</span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto">

          {/* Grote kaart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="col-span-2 row-span-2 rounded-2xl p-6 lg:p-8 flex flex-col justify-between min-h-[200px] lg:min-h-[240px]"
            style={{
              background: "linear-gradient(135deg, rgba(110,231,247,0.06) 0%, rgba(99,102,241,0.06) 100%)",
              border: "1px solid rgba(110,231,247,0.12)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="text-6xl lg:text-8xl font-black leading-none select-none"
              style={{ WebkitTextStroke: "1px rgba(110,231,247,0.15)", color: "transparent" }}>
              ∞
            </div>
            <div>
              <p className="text-2xl font-bold mb-2">Geen project te groot<br />of te klein.</p>
              <p className="text-white/40 text-sm leading-relaxed">
                Van een simpele landingspagina tot een volledige webshop met betalingen, database en admin-paneel. Ik pas me aan op wat jij nodig hebt.
              </p>
            </div>
          </motion.div>

          {/* Webshops */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1 rounded-2xl p-6 flex flex-col justify-between min-h-[110px]"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6ee7f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <div>
              <p className="font-semibold text-sm">Webshops</p>
              <p className="text-white/30 text-xs mt-0.5">iDEAL · Bancontact</p>
            </div>
          </motion.div>

          {/* Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="col-span-1 rounded-2xl p-6 flex flex-col justify-between min-h-[110px]"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6ee7f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
            <div>
              <p className="font-semibold text-sm">Modern design</p>
              <p className="text-white/30 text-xs mt-0.5">Altijd van deze tijd</p>
            </div>
          </motion.div>

          {/* SEO brede kaart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-2 rounded-2xl p-6 flex items-center gap-5"
            style={{ background: "rgba(110,231,247,0.04)", border: "1px solid rgba(110,231,247,0.1)" }}
          >
            <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(110,231,247,0.08)", border: "1px solid rgba(110,231,247,0.15)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6ee7f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm">SEO & Snelheid</p>
              <p className="text-white/40 text-xs leading-relaxed">Gebouwd om gevonden te worden. Snel, geoptimaliseerd en technisch sterk.</p>
            </div>
          </motion.div>

          {/* Onderhoud */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="col-span-1 rounded-2xl p-6 flex flex-col justify-between min-h-[110px]"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6ee7f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
            <div>
              <p className="font-semibold text-sm">Onderhoud</p>
              <p className="text-white/30 text-xs mt-0.5">Beschikbaar na oplevering</p>
            </div>
          </motion.div>

          {/* Alle branches */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1 rounded-2xl p-6 flex flex-col justify-between min-h-[110px]"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6ee7f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            <div>
              <p className="font-semibold text-sm">Alle branches</p>
              <p className="text-white/30 text-xs mt-0.5">Ik verdiep me in jouw markt</p>
            </div>
          </motion.div>

        </div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex gap-3 flex-wrap"
        >
          {tags.map((tag, i) => (
            <span key={i} className="text-xs border text-white/30 px-3 py-1.5 rounded-full whitespace-nowrap"
              style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
              {tag}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
