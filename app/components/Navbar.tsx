"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const socials = [
  {
    label: "Instagram",
    href: "#",
    color: "#E1306C",
    glow: "rgba(225,48,108,0.4)",
    shadow: "0 0 20px 4px rgba(225,48,108,0.28), 0 0 8px rgba(225,48,108,0.2)",
    shadowHover: "0 0 28px 6px rgba(225,48,108,0.45), 0 0 12px rgba(225,48,108,0.3)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    color: "#1d9bf0",
    glow: "rgba(29,155,240,0.4)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    color: "#bf00ff",
    glow: "rgba(191,0,255,0.4)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    color: "#FF0000",
    glow: "rgba(255,0,0,0.4)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    color: "#0A66C2",
    glow: "rgba(10,102,194,0.4)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
];

const links = [
  { label: "Projecten", href: "/projecten" },
  { label: "Werkproces", href: "/#werkproces" },
  { label: "Over mij", href: "/#over-mij" },
  { label: "Skills", href: "/#skills" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080808]/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="SVD Webdesign logo" className="h-14 w-auto" />
          <span className="text-lg font-semibold tracking-tight">
            Sem van Dieen<span className="text-[#6ee7f7]">.</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}

          {/* Desktop socials */}
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200"
                style={{
                  color: s.color,
                  background: `${s.glow.replace("0.4", "0.06")}`,
                  border: `1px solid ${s.glow.replace("0.4", "0.18")}`,
                  boxShadow: s.shadow ?? `0 0 16px 2px ${s.glow.replace("0.4", "0.2")}, 0 0 6px ${s.glow.replace("0.4", "0.15")}`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = s.shadowHover ?? `0 0 24px 4px ${s.glow.replace("0.4", "0.35")}, 0 0 10px ${s.glow.replace("0.4", "0.25")}`;
                  (e.currentTarget as HTMLElement).style.borderColor = s.glow.replace("0.4", "0.45");
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = s.shadow ?? `0 0 16px 2px ${s.glow.replace("0.4", "0.2")}, 0 0 6px ${s.glow.replace("0.4", "0.15")}`;
                  (e.currentTarget as HTMLElement).style.borderColor = s.glow.replace("0.4", "0.18");
                }}
              >
                <span className="scale-75">{s.icon}</span>
              </a>
            ))}
          </div>

          <a
            href="/#contact"
            className="text-sm bg-[#6ee7f7] text-[#080808] font-medium px-4 py-2 rounded-full hover:bg-white transition-colors duration-200"
          >
            Contact
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#080808]/95 backdrop-blur-md border-t border-white/5 px-6 pb-6"
          >
            <div className="flex flex-col gap-4 pt-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="text-sm bg-[#6ee7f7] text-[#080808] font-medium px-4 py-2 rounded-full text-center hover:bg-white transition-colors"
              >
                Contact
              </a>

              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
                    style={{
                      color: s.color,
                      background: `${s.glow.replace("0.4", "0.06")}`,
                      border: `1px solid ${s.glow.replace("0.4", "0.18")}`,
                      boxShadow: s.shadow ?? `0 0 16px 2px ${s.glow.replace("0.4", "0.2")}, 0 0 6px ${s.glow.replace("0.4", "0.15")}`,
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = s.shadowHover ?? `0 0 24px 4px ${s.glow.replace("0.4", "0.35")}, 0 0 10px ${s.glow.replace("0.4", "0.25")}`;
                      (e.currentTarget as HTMLElement).style.borderColor = s.glow.replace("0.4", "0.45");
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = s.shadow ?? `0 0 16px 2px ${s.glow.replace("0.4", "0.2")}, 0 0 6px ${s.glow.replace("0.4", "0.15")}`;
                      (e.currentTarget as HTMLElement).style.borderColor = s.glow.replace("0.4", "0.18");
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
