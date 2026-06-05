"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import QuoteRequestModal from "./QuoteRequestModal";

export default function Contact() {
  const [showQuote, setShowQuote] = useState(false);

  return (
    <section id="contact" className="relative pt-16 pb-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #0a0f28, #05060f)" }}
    >
      {/* Cyaan glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#06b6d4]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#7c3aed]/6 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">

          {/* Twee mensen — communicatie/samen */}
          <motion.div
            animate={{
              rotateY: [0, 15, 0, -15, 0],
              rotateX: [0, -8, 0, 8, 0],
              y: [0, -8, 0, -8, 0],
            }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            style={{ perspective: "600px", transformStyle: "preserve-3d", display: "inline-block" }}
            className="mb-8"
          >
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto"
              style={{
                background: "linear-gradient(135deg, rgba(110,231,247,0.1) 0%, rgba(99,102,241,0.1) 100%)",
                border: "1.5px solid rgba(110,231,247,0.3)",
                boxShadow: "0 0 50px rgba(110,231,247,0.18), 0 20px 40px rgba(0,0,0,0.3)",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6ee7f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Linker persoon */}
                <circle cx="6" cy="9" r="3" />
                <path d="M2 20v-0.5a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3V20" />
                {/* Rechter persoon */}
                <circle cx="18" cy="9" r="3" />
                <path d="M14 20v-0.5a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3V20" />
              </svg>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs text-[#6ee7f7] uppercase tracking-widest font-medium">
              Contact
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-3 mb-6 tracking-tight">
              Laten we praten.
            </h2>
            <p className="text-white/40 text-lg leading-relaxed mb-12">
              Wilt u een website of webshop laten maken? Vraag vrijblijvend
              een offerte aan. Ik denk graag met u mee en kom met een
              eerlijk voorstel op maat.
            </p>
          </motion.div>

          {/* Offerte (primair) + mail (subtiel alternatief) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col items-center gap-5"
          >
            <div className="relative w-full sm:w-auto">
              {/* Pulsing aura behind — lives outside the button so blur isn't clipped */}
              <motion.span
                aria-hidden
                className="absolute -inset-1 rounded-[1.7rem] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, #6ee7f7, #a78bfa 50%, #f0abfc)",
                  filter: "blur(16px)",
                  opacity: 0.16,
                }}
                animate={{ opacity: [0.12, 0.22, 0.12], scale: [1, 1.025, 1] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
              />
            <motion.button
              type="button"
              onClick={() => setShowQuote(true)}
              className="group relative flex items-center gap-5 rounded-2xl px-10 lg:px-14 py-6 lg:py-7 w-full sm:w-auto overflow-hidden text-left cursor-pointer"
              style={{
                background:
                  "linear-gradient(135deg, #6ee7f7 0%, #a78bfa 50%, #f0abfc 100%)",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.16) inset, 0 1px 0 rgba(255,255,255,0.4) inset, 0 8px 22px rgba(167,139,250,0.16), 0 0 30px rgba(110,231,247,0.08)",
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
            >
              {/* Diagonal shimmer sweep */}
              <motion.span
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.3) 50%, transparent 65%)",
                  mixBlendMode: "overlay",
                }}
                animate={{ x: ["-120%", "120%"] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 2.4,
                }}
              />

              {/* Top-edge highlight */}
              <span
                aria-hidden
                className="absolute inset-x-6 top-0 h-px pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(255,255,255,0.85), transparent)",
                }}
              />

              <div
                className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center shrink-0 text-[#1a0f3d]"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  boxShadow:
                    "0 6px 16px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.9)",
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                  <line x1="9" y1="11" x2="15" y2="11" />
                </svg>
              </div>
              <div className="relative text-left">
                <p className="text-xs lg:text-sm uppercase tracking-[0.2em] text-white/95 font-semibold mb-1 drop-shadow-[0_1px_2px_rgba(60,20,90,0.4)]">
                  Vrijblijvend &amp; persoonlijk
                </p>
                <p className="text-lg lg:text-2xl font-bold text-white flex items-center gap-2.5 drop-shadow-[0_1px_3px_rgba(60,20,90,0.45)]">
                  Offerte aanvragen
                  <motion.span
                    aria-hidden
                    className="inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </p>
              </div>
            </motion.button>
            </div>

            {/* Subtle mail alternative below the primary CTA */}
            <a
              href="mailto:semvdwebdesign@gmail.com"
              className="group inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm transition-all duration-200"
              style={{
                background: "rgba(110,231,247,0.05)",
                border: "1px solid rgba(110,231,247,0.18)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(110,231,247,0.45)";
                (e.currentTarget as HTMLElement).style.background = "rgba(110,231,247,0.09)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(110,231,247,0.18)";
                (e.currentTarget as HTMLElement).style.background = "rgba(110,231,247,0.05)";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#6ee7f7]">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="text-white/50">Of mail direct</span>
              <span className="text-white/85 font-medium group-hover:text-[#6ee7f7] transition-colors">
                semvdwebdesign@gmail.com
              </span>
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-14 pt-10 border-t border-white/5"
          >
            <p className="text-xs text-white/30 uppercase tracking-widest mb-6">Volg mij op</p>
            <div className="flex items-center justify-center gap-4 lg:gap-8 flex-wrap">
              {[
                { label: "LinkedIn", href: "https://www.linkedin.com/in/sem-van-dieen-a228353b8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", color: "#0A66C2", glow: "rgba(10,102,194,0.4)", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
                { label: "Instagram", href: "https://www.instagram.com/svd_webdesign?igsh=N3l5ZWxqYmozZTFl&utm_source=qr", color: "#E1306C", glow: "rgba(225,48,108,0.4)", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                { label: "X", href: "https://x.com/svd_webdesign?s=21", color: "#1d9bf0", glow: "rgba(29,155,240,0.4)", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg> },
                { label: "YouTube", href: "https://youtube.com/@svd_webdesign?si=AhEvKuutUMaCfyl", color: "#FF0000", glow: "rgba(255,0,0,0.4)", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
                { label: "TikTok", href: "https://www.tiktok.com/@svd_webdesign?_r=1&_t=ZG-94qMnxsIaK8", color: "#bf00ff", glow: "rgba(191,0,255,0.4)", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg> },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div
                    className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center transition-all duration-200"
                    style={{
                      color: s.color,
                      background: s.glow.replace("0.4", "0.07"),
                      border: `1px solid ${s.glow.replace("0.4", "0.2")}`,
                      boxShadow: `0 0 14px ${s.glow.replace("0.4", "0.15")}`,
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${s.glow.replace("0.4", "0.4")}, 0 0 8px ${s.glow.replace("0.4", "0.25")}`;
                      (e.currentTarget as HTMLElement).style.borderColor = s.glow.replace("0.4", "0.5");
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 14px ${s.glow.replace("0.4", "0.15")}`;
                      (e.currentTarget as HTMLElement).style.borderColor = s.glow.replace("0.4", "0.2");
                    }}
                  >
                    {s.icon}
                  </div>
                  <span className="text-xs lg:text-sm text-white/30 group-hover:text-white/60 transition-colors">{s.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      <QuoteRequestModal open={showQuote} onClose={() => setShowQuote(false)} />
    </section>
  );
}
