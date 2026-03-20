"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #0a0f28, #05060f)" }}
    >
      {/* Cyaan glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#06b6d4]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#7c3aed]/6 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">

          {/* 3D telefoon icoon */}
          <motion.div
            animate={{
              rotateY: [0, 20, 0, -20, 0],
              rotateX: [0, -10, 0, 10, 0],
              y: [0, -8, 0, -8, 0],
            }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            style={{ perspective: "600px", transformStyle: "preserve-3d", display: "inline-block" }}
            className="mb-8"
          >
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto"
              style={{
                background: "linear-gradient(135deg, rgba(110,231,247,0.08) 0%, rgba(99,102,241,0.08) 100%)",
                border: "1.5px solid rgba(110,231,247,0.2)",
                boxShadow: "0 0 40px rgba(110,231,247,0.12), 0 20px 40px rgba(0,0,0,0.3)",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6ee7f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l1.06-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
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
              Wilt u een website of webshop laten maken? Neem gerust contact
              op. Ik denk graag met u mee en stuur u een vrijblijvende
              offerte.
            </p>
          </motion.div>

          {/* WhatsApp — primair */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col lg:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://wa.me/31627381813"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl px-8 lg:px-12 py-5 lg:py-6 transition-all duration-200 w-full sm:w-auto"
              style={{
                background: "linear-gradient(135deg, rgba(37,211,102,0.15) 0%, rgba(37,211,102,0.08) 100%)",
                border: "1px solid rgba(37,211,102,0.3)",
                boxShadow: "0 0 24px rgba(37,211,102,0.12)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,211,102,0.6)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 36px rgba(37,211,102,0.25)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,211,102,0.3)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(37,211,102,0.12)";
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(37,211,102,0.15)", color: "#25d366" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.522a.5.5 0 0 0 .623.603l5.799-1.525A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.686-.523-5.209-1.433l-.374-.22-3.878 1.019 1.037-3.786-.243-.389A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-white/40 mb-0.5">Stuur een bericht</p>
                <p className="text-base lg:text-lg font-semibold text-white group-hover:text-[#25d366] transition-colors">
                  WhatsApp — +31 6 27 38 18 13
                </p>
              </div>
            </a>

            {/* Mail — secondary */}
            <a
              href="mailto:sem.vdieen@gmail.com"
              className="group flex items-center gap-3 rounded-xl px-6 lg:px-10 py-4 lg:py-5 transition-all duration-200 w-full sm:w-auto"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(110,231,247,0.3)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6ee7f7]"
                style={{ background: "rgba(110,231,247,0.08)" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-white/30 mb-0.5">Of mail mij</p>
                <p className="text-sm font-medium text-white/70 group-hover:text-[#6ee7f7] transition-colors">
                  sem.vdieen@gmail.com
                </p>
              </div>
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
                { label: "Instagram", href: "https://www.instagram.com/svd_webdesign?igsh=N3l5ZWxqYmozZTFl&utm_source=qr", color: "#E1306C", glow: "rgba(225,48,108,0.4)", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                { label: "X", href: "https://x.com/svd_webdesign?s=21", color: "#1d9bf0", glow: "rgba(29,155,240,0.4)", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg> },
                { label: "TikTok", href: "https://www.tiktok.com/@svd_webdesign?_r=1&_t=ZG-94qMnxsIaK8", color: "#bf00ff", glow: "rgba(191,0,255,0.4)", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg> },
                { label: "YouTube", href: "https://youtube.com/@svd_webdesign?si=AhEvKuutUMaCfyl", color: "#FF0000", glow: "rgba(255,0,0,0.4)", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/sem-van-dieen-a228353b8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", color: "#0A66C2", glow: "rgba(10,102,194,0.4)", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
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
    </section>
  );
}
