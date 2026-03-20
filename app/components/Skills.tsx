"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const tags = [
  "Webshops", "Bedrijfswebsites", "iDEAL betalingen", "Admin panelen",
  "SEO", "Mobile-first", "Maatwerk", "E-commerce", "Branding", "Landingspages",
  "Databases", "Email automatisering", "Snelle laadtijden", "Op maat"
];

function cardHoverEnter(e: React.MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  el.style.transform = "scale(1.04)";
  el.style.boxShadow = "0 0 40px rgba(110,231,247,0.35), 0 0 80px rgba(110,231,247,0.15), 0 0 12px rgba(110,231,247,0.5), 0 8px 32px rgba(0,0,0,0.4)";
}
function cardHoverLeave(e: React.MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  el.style.transform = "scale(1)";
  el.style.boxShadow = "";
}

export default function Skills() {
  const [onderhoudHovered, setOnderhoudHovered] = useState(false);

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
            <span className="cursor-default transition-all duration-300 hover:text-[#6ee7f7]" style={{}} onMouseEnter={e => (e.currentTarget as HTMLElement).style.textShadow = "0 0 20px rgba(110,231,247,0.7), 0 0 40px rgba(110,231,247,0.3)"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.textShadow = "none"}>Divers.</span>{" "}
            <span className="cursor-default transition-all duration-300 hover:text-[#6ee7f7]" onMouseEnter={e => (e.currentTarget as HTMLElement).style.textShadow = "0 0 20px rgba(110,231,247,0.7), 0 0 40px rgba(110,231,247,0.3)"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.textShadow = "none"}>Aanpasbaar.</span><br />
            <span className="text-[#6ee7f7] cursor-default" onMouseEnter={e => (e.currentTarget as HTMLElement).style.textShadow = "0 0 20px rgba(110,231,247,0.9), 0 0 40px rgba(110,231,247,0.5)"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.textShadow = "none"}>Altijd op maat.</span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto">

          {/* Grote kaart — Onderhoud */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="col-span-2 row-span-2 rounded-2xl p-6 lg:p-8 flex flex-col justify-between min-h-[200px] lg:min-h-[240px] cursor-default overflow-hidden relative"
            whileHover={{ scale: 1.04 }}
            style={{
              background: "linear-gradient(135deg, rgba(255,215,0,0.05) 0%, rgba(255,160,0,0.04) 100%)",
              border: "1px solid transparent",
              backdropFilter: "blur(10px)",
              transition: "box-shadow 0.25s ease",
            }}
            onMouseEnter={e => {
              setOnderhoudHovered(true);
              e.currentTarget.style.boxShadow = "0 0 40px rgba(255,215,0,0.5), 0 0 80px rgba(255,185,0,0.25), 0 0 12px rgba(255,215,0,0.65), 0 8px 32px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={e => {
              setOnderhoudHovered(false);
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <AnimatePresence>
              {onderhoudHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
                >
                  {[
                    { right: "8%",  top: "6%",  duration: 2.6, delay: 0,   char: "★" },
                    { right: "14%", top: "10%", duration: 3.0, delay: 0.8, char: "✦" },
                    { right: "5%",  top: "18%", duration: 2.8, delay: 1.5, char: "★" },
                    { right: "20%", top: "4%",  duration: 3.2, delay: 2.2, char: "✦" },
                    { right: "11%", top: "22%", duration: 2.5, delay: 0.4, char: "★" },
                  ].map((s, i) => (
                    <motion.span
                      key={i}
                      style={{
                        position: "absolute",
                        right: s.right,
                        top: s.top,
                        color: "#FFD700",
                        fontSize: "9px",
                        pointerEvents: "none",
                        filter: "drop-shadow(0 0 4px rgba(255,215,0,1)) drop-shadow(7px -11px 1px rgba(255,215,0,0.7)) drop-shadow(15px -23px 3px rgba(255,210,0,0.4)) drop-shadow(24px -37px 6px rgba(255,195,0,0.18)) drop-shadow(32px -50px 9px rgba(255,175,0,0.06))",
                      }}
                      animate={{ x: [0, -110], y: [0, 170], opacity: [0, 1, 1, 0], scale: [1, 0.8, 0.3] }}
                      transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeIn", times: [0, 0.08, 0.85, 1] }}
                    >
                      {s.char}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="text-6xl lg:text-8xl font-black leading-none select-none"
              style={{ color: "#FFD700", textShadow: "0 0 8px rgba(255,215,0,0.6), 0 0 20px rgba(255,200,0,0.3), 0 0 40px rgba(255,180,0,0.1)" }}>
              ★
            </div>
            <div>
              <p className="card-title text-2xl font-bold mb-2 transition-all duration-200">Onderhoud</p>
              <p className="text-white/40 text-sm leading-relaxed">
                Als u na de oplevering nog gebruik wilt maken van mijn diensten kunnen we in samenspraak kijken naar wat u nodig heeft.
              </p>
            </div>
          </motion.div>

          {/* Webshops */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1 rounded-2xl p-6 flex flex-col justify-between min-h-[110px] cursor-default"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid transparent", transition: "transform 0.25s ease, box-shadow 0.25s ease" }}
            onMouseEnter={cardHoverEnter}
            onMouseLeave={cardHoverLeave}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6ee7f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <div>
              <p className="card-title font-semibold text-sm transition-all duration-200">Webshops</p>
              <p className="text-white/30 text-xs mt-0.5">iDEAL · Bancontact</p>
            </div>
          </motion.div>

          {/* Alle branches */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="col-span-1 rounded-2xl p-6 flex flex-col justify-between min-h-[110px] cursor-default"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid transparent", transition: "transform 0.25s ease, box-shadow 0.25s ease" }}
            onMouseEnter={cardHoverEnter}
            onMouseLeave={cardHoverLeave}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6ee7f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            <div>
              <p className="card-title font-semibold text-sm transition-all duration-200">Alle branches</p>
              <p className="text-white/30 text-xs mt-0.5">Elke branche welkom</p>
            </div>
          </motion.div>

          {/* SEO brede kaart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-2 rounded-2xl p-6 flex items-center gap-5 cursor-default"
            style={{ background: "rgba(110,231,247,0.04)", border: "1px solid transparent", transition: "transform 0.25s ease, box-shadow 0.25s ease" }}
            onMouseEnter={cardHoverEnter}
            onMouseLeave={cardHoverLeave}
          >
            <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(110,231,247,0.08)", border: "1px solid rgba(110,231,247,0.15)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6ee7f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <div>
              <p className="card-title font-semibold text-sm transition-all duration-200">SEO & Snelheid</p>
              <p className="text-white/40 text-xs leading-relaxed">Gebouwd om gevonden te worden. Snel, geoptimaliseerd en technisch sterk.</p>
            </div>
          </motion.div>

          {/* Geen project te groot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="col-span-2 row-span-2 lg:col-span-4 lg:row-span-1 rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-12 min-h-[200px] lg:min-h-[130px] cursor-default"
            style={{
              background: "linear-gradient(135deg, rgba(110,231,247,0.06) 0%, rgba(99,102,241,0.06) 100%)",
              border: "1px solid transparent",
              backdropFilter: "blur(10px)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
            }}
            onMouseEnter={cardHoverEnter}
            onMouseLeave={cardHoverLeave}
          >
            <div className="text-6xl lg:text-7xl font-black leading-none select-none shrink-0"
              style={{ WebkitTextStroke: "1.5px rgba(110,231,247,0.5)", color: "rgba(110,231,247,0.12)", textShadow: "0 0 20px rgba(110,231,247,0.25)" }}>
              ∞
            </div>
            <div>
              <p className="card-title text-2xl font-bold mb-2 transition-all duration-200">Geen project te groot of te klein.</p>
              <p className="text-white/40 text-sm leading-relaxed">
                Van een simpele landingspagina tot een volledige webshop met betalingen, database en admin-paneel. Ik pas me aan op wat u nodig hebt.
              </p>
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
