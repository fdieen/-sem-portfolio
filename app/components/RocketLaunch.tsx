"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function RocketLaunch() {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "launching" | "gone">("idle");

  const handleLaunch = () => {
    if (state !== "idle") return;
    setState("launching");
    setTimeout(() => {
      setState("gone");
      router.push("/werkproces");
    }, 1100);
  };

  return (
    <div className="flex flex-col items-center gap-10">
      {/* Rocket */}
      <motion.div
        className="relative"
        animate={
          state === "idle"
            ? { y: [0, -10, 0] }
            : state === "launching"
            ? { y: -700, opacity: 0 }
            : {}
        }
        transition={
          state === "idle"
            ? { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
            : { duration: 1.05, ease: [0.4, 0.0, 0.2, 1] }
        }
      >
        <motion.div
          style={{ transformOrigin: "50% 90%" }}
          animate={
            state === "idle"
              ? {
                  y: [0, -4.5, 2.8, -1.6, 0.6, 0],
                  x: [0, 1.4, -1.6, 0.7, -0.3, 0],
                  rotate: [0, -1.8, 1.4, -0.6, 0.25, 0],
                }
              : { y: 0, x: 0, rotate: 0 }
          }
          transition={
            state === "idle"
              ? {
                  duration: 1.0,
                  repeat: Infinity,
                  repeatDelay: 14,
                  ease: "easeOut",
                  times: [0, 0.18, 0.38, 0.6, 0.85, 1],
                }
              : { duration: 0.2 }
          }
        >
        <svg width="160" height="290" viewBox="0 0 160 290" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* External Tank — orange */}
            <linearGradient id="et" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a03c08"/>
              <stop offset="35%" stopColor="#d86018"/>
              <stop offset="65%" stopColor="#e87828"/>
              <stop offset="100%" stopColor="#7a2e06"/>
            </linearGradient>
            {/* SRB — white/silver */}
            <linearGradient id="srb" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#9aaabb"/>
              <stop offset="40%" stopColor="#eef2f8"/>
              <stop offset="100%" stopColor="#6a7a8a"/>
            </linearGradient>
            {/* Orbiter fuselage */}
            <linearGradient id="orb" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#b0bcd0"/>
              <stop offset="40%" stopColor="#f0f4ff"/>
              <stop offset="100%" stopColor="#7888a0"/>
            </linearGradient>
            {/* Wings top */}
            <linearGradient id="wingTop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d8e0f0"/>
              <stop offset="100%" stopColor="#9aaac0"/>
            </linearGradient>
            {/* Wing belly (heat tiles) */}
            <linearGradient id="wingBelly" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1e2a"/>
              <stop offset="100%" stopColor="#0a0c14"/>
            </linearGradient>
            {/* Flame */}
            <radialGradient id="flameOut" cx="50%" cy="0%" r="85%">
              <stop offset="0%" stopColor="#ff9900"/>
              <stop offset="55%" stopColor="#ff4400"/>
              <stop offset="100%" stopColor="#cc1100" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="flameIn" cx="50%" cy="0%" r="70%">
              <stop offset="0%" stopColor="#ffee88"/>
              <stop offset="45%" stopColor="#ffbb00"/>
              <stop offset="100%" stopColor="#ff6600" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6ee7f7" stopOpacity="0.10"/>
              <stop offset="100%" stopColor="#6ee7f7" stopOpacity="0"/>
            </radialGradient>
            <filter id="fb"><feGaussianBlur stdDeviation="3"/></filter>
            <filter id="gs"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>

          {/* Background glow */}
          <ellipse cx="80" cy="145" rx="68" ry="130" fill="url(#bgGlow)"/>

          {/* ── LEFT SRB ── */}
          {/* Nose */}
          <path d="M26 22 L18 52 L34 52 Z" fill="url(#srb)"/>
          <path d="M26 22 L21 52 L26 52 Z" fill="#fff" opacity="0.2"/>
          {/* Body */}
          <rect x="18" y="49" width="16" height="170" rx="2.5" fill="url(#srb)"/>
          <rect x="18" y="49" width="6" height="170" rx="2" fill="#fff" opacity="0.08"/>
          {/* USA text line */}
          <rect x="20" y="110" width="12" height="2" rx="1" fill="#cc1111" opacity="0.7"/>
          {/* Separation ring */}
          <rect x="18" y="145" width="16" height="3" rx="1" fill="#8090a0" opacity="0.6"/>
          {/* Nozzle */}
          <path d="M18 219 Q15 232 17 238 L35 238 Q37 232 34 219 Z" fill="#1a2030"/>
          <ellipse cx="26" cy="238" rx="9" ry="3" fill="#080e18"/>

          {/* ── RIGHT SRB ── */}
          <path d="M134 22 L126 52 L142 52 Z" fill="url(#srb)"/>
          <path d="M134 22 L129 52 L134 52 Z" fill="#fff" opacity="0.2"/>
          <rect x="126" y="49" width="16" height="170" rx="2.5" fill="url(#srb)"/>
          <rect x="126" y="49" width="6" height="170" rx="2" fill="#fff" opacity="0.08"/>
          <rect x="128" y="110" width="12" height="2" rx="1" fill="#cc1111" opacity="0.7"/>
          <rect x="126" y="145" width="16" height="3" rx="1" fill="#8090a0" opacity="0.6"/>
          <path d="M126 219 Q123 232 125 238 L143 238 Q145 232 142 219 Z" fill="#1a2030"/>
          <ellipse cx="134" cy="238" rx="9" ry="3" fill="#080e18"/>

          {/* ── EXTERNAL TANK ── */}
          {/* Top dome */}
          <path d="M80 18 Q60 18 58 42 L102 42 Q100 18 80 18Z" fill="#c05010"/>
          <path d="M80 18 Q68 18 66 42 L80 42 Z" fill="#e06818" opacity="0.35"/>
          {/* Body */}
          <rect x="58" y="38" width="44" height="188" rx="2" fill="url(#et)"/>
          {/* ET highlight */}
          <rect x="58" y="38" width="14" height="188" rx="2" fill="#fff" opacity="0.06"/>
          {/* Bottom dome */}
          <path d="M58 226 Q58 240 80 242 Q102 240 102 226 Z" fill="#8a3006"/>

          {/* ── STRUTS ── */}
          <line x1="34" y1="105" x2="58" y2="108" stroke="#a0b0c0" strokeWidth="2" opacity="0.5"/>
          <line x1="126" y1="105" x2="102" y2="108" stroke="#a0b0c0" strokeWidth="2" opacity="0.5"/>
          <line x1="34" y1="175" x2="58" y2="178" stroke="#a0b0c0" strokeWidth="1.5" opacity="0.4"/>
          <line x1="126" y1="175" x2="102" y2="178" stroke="#a0b0c0" strokeWidth="1.5" opacity="0.4"/>

          {/* ── ORBITER ── */}
          {/* Vertical tail fin */}
          <path d="M77 24 L83 24 L83 115 L77 115 Z" fill="#c8d0e0"/>
          <path d="M79 24 L83 24 L83 100 Z" fill="#e8ecf8" opacity="0.25"/>
          <rect x="79" y="24" width="4" height="4" rx="1" fill="#6ee7f7" opacity="0.4"/>

          {/* Orbiter nose */}
          <path d="M80 16 C74 16 64 32 63 50 L97 50 C96 32 86 16 80 16Z" fill="url(#orb)"/>
          <path d="M80 16 C76 16 68 32 68 50 L80 50 Z" fill="#fff" opacity="0.15"/>
          {/* Orbiter nose tip — heat shield */}
          <path d="M80 16 C77 20 74 32 73 44 L80 44 L87 44 C86 32 83 20 80 16Z" fill="#2a1818" opacity="0.55"/>

          {/* Cockpit / flight deck windows */}
          <rect x="68" y="54" width="24" height="10" rx="2.5" fill="#1a3060"/>
          <rect x="70" y="55.5" width="9" height="7" rx="1.5" fill="#2a4a90" opacity="0.9"/>
          <rect x="81" y="55.5" width="9" height="7" rx="1.5" fill="#2a4a90" opacity="0.9"/>
          <rect x="71" y="56.5" width="3" height="4" rx="0.8" fill="#4a70c0" opacity="0.6"/>
          <rect x="82" y="56.5" width="3" height="4" rx="0.8" fill="#4a70c0" opacity="0.6"/>

          {/* Orbiter payload bay / fuselage */}
          <rect x="63" y="50" width="34" height="140" rx="3" fill="url(#orb)"/>
          <rect x="63" y="50" width="10" height="140" rx="3" fill="#fff" opacity="0.07"/>
          {/* Payload bay doors line */}
          <line x1="80" y1="65" x2="80" y2="185" stroke="#8090a8" strokeWidth="0.8" opacity="0.5"/>
          <line x1="63" y1="120" x2="97" y2="120" stroke="#8090a8" strokeWidth="0.7" opacity="0.35"/>

          {/* Heat tiles on belly */}
          <rect x="63" y="155" width="34" height="35" rx="2" fill="#1a1828"/>
          <rect x="63" y="185" width="34" height="8" rx="1" fill="#0e1020"/>

          {/* OMS engine pods */}
          <ellipse cx="68" cy="162" rx="5" ry="9" fill="#9aaabb"/>
          <ellipse cx="92" cy="162" rx="5" ry="9" fill="#9aaabb"/>

          {/* ── DELTA WINGS ── */}
          {/* Left wing — top face */}
          <path d="M63 125 L63 195 L8 220 L12 188 Z" fill="url(#wingTop)"/>
          {/* Left wing — belly (heat tiles) */}
          <path d="M63 165 L63 195 L8 220 L10 205 Z" fill="url(#wingBelly)"/>
          {/* Left wing leading edge */}
          <path d="M63 125 L12 188 L8 184 L63 120 Z" fill="#c8d4e8" opacity="0.5"/>

          {/* Right wing — top face */}
          <path d="M97 125 L97 195 L152 220 L148 188 Z" fill="url(#wingTop)"/>
          {/* Right wing — belly */}
          <path d="M97 165 L97 195 L152 220 L150 205 Z" fill="url(#wingBelly)"/>
          {/* Right wing leading edge */}
          <path d="M97 125 L148 188 L152 184 L97 120 Z" fill="#c8d4e8" opacity="0.5"/>

          {/* ── SSME NOZZLES (3 main engines) ── */}
          <path d="M69 193 Q65 205 67 210 L77 210 Q79 205 75 193 Z" fill="#0e1828"/>
          <ellipse cx="72" cy="210" rx="5.5" ry="2" fill="#060c18"/>
          <path d="M80 193 Q77 207 79 212 L89 212 Q91 207 88 193 Z" fill="#0e1828"/>
          <ellipse cx="84" cy="212" rx="5.5" ry="2" fill="#060c18"/>
          <path d="M74 199 Q70 213 72 218 L88 218 Q90 213 86 199 Z" fill="#1a2438"/>
          <ellipse cx="80" cy="218" rx="8" ry="2.5" fill="#060c18"/>

          {/* ── FLAMES (launching) ── */}
          <AnimatePresence>
            {state === "launching" && (
              <>
                {/* SRB left flame */}
                <motion.path d="M20 238 Q16 258 18 272 Q26 288 26 285 Q26 288 34 272 Q36 258 32 238Z"
                  fill="url(#flameOut)" filter="url(#fb)"
                  initial={{scaleY:0,opacity:0}} animate={{scaleY:[0.5,1.3,1.1],opacity:[0,1,0.85]}}
                  transition={{duration:0.3,ease:"easeOut"}} style={{transformOrigin:"26px 238px"}}/>
                <motion.path d="M22 238 Q20 252 22 263 Q26 276 26 273 Q26 276 30 263 Q32 252 30 238Z"
                  fill="url(#flameIn)"
                  initial={{scaleY:0,opacity:0}} animate={{scaleY:[0.4,1.2,1.0],opacity:[0,1,1]}}
                  transition={{duration:0.28,ease:"easeOut",delay:0.04}} style={{transformOrigin:"26px 238px"}}/>

                {/* SRB right flame */}
                <motion.path d="M128 238 Q124 258 126 272 Q134 288 134 285 Q134 288 142 272 Q144 258 140 238Z"
                  fill="url(#flameOut)" filter="url(#fb)"
                  initial={{scaleY:0,opacity:0}} animate={{scaleY:[0.5,1.3,1.1],opacity:[0,1,0.85]}}
                  transition={{duration:0.3,ease:"easeOut"}} style={{transformOrigin:"134px 238px"}}/>
                <motion.path d="M130 238 Q128 252 130 263 Q134 276 134 273 Q134 276 138 263 Q140 252 138 238Z"
                  fill="url(#flameIn)"
                  initial={{scaleY:0,opacity:0}} animate={{scaleY:[0.4,1.2,1.0],opacity:[0,1,1]}}
                  transition={{duration:0.28,ease:"easeOut",delay:0.04}} style={{transformOrigin:"134px 238px"}}/>

                {/* SSME center flame */}
                <motion.path d="M68 218 Q62 242 64 260 Q72 285 80 282 Q88 285 96 260 Q98 242 92 218Z"
                  fill="url(#flameOut)" filter="url(#fb)"
                  initial={{scaleY:0,opacity:0}} animate={{scaleY:[0.4,1.5,1.2],opacity:[0,1,0.9]}}
                  transition={{duration:0.35,ease:"easeOut",delay:0.06}} style={{transformOrigin:"80px 218px"}}/>
                <motion.path d="M72 218 Q69 238 71 252 Q77 272 80 270 Q83 272 89 252 Q91 238 88 218Z"
                  fill="url(#flameIn)"
                  initial={{scaleY:0,opacity:0}} animate={{scaleY:[0.3,1.4,1.1],opacity:[0,1,1]}}
                  transition={{duration:0.3,ease:"easeOut",delay:0.1}} style={{transformOrigin:"80px 218px"}}/>
              </>
            )}
          </AnimatePresence>
        </svg>
        </motion.div>

        {/* Exhaust smoke particles when launching */}
        <AnimatePresence>
          {state === "launching" && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: 8 + i * 4,
                    height: 8 + i * 4,
                    background: `rgba(${180 + i * 10}, ${100 + i * 8}, 30, 0.5)`,
                    left: `${(i % 3 - 1) * 14}px`,
                  }}
                  initial={{ y: 0, opacity: 0.8, scale: 0.5 }}
                  animate={{ y: 60 + i * 20, opacity: 0, scale: 2 + i * 0.4 }}
                  transition={{ duration: 0.8 + i * 0.1, ease: "easeOut", delay: i * 0.04 }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Launch button */}
      <motion.button
        onClick={handleLaunch}
        disabled={state !== "idle"}
        className="relative group overflow-hidden px-10 py-4 rounded-full font-bold text-sm tracking-[0.22em] uppercase transition-all duration-300"
        style={{
          background: state === "idle" ? "linear-gradient(135deg, #6ee7f7, #3ba8c8)" : "rgba(255,255,255,0.08)",
          color: state === "idle" ? "#05060f" : "rgba(255,255,255,0.4)",
          boxShadow: state === "idle" ? "0 0 30px rgba(110,231,247,0.35), 0 0 60px rgba(110,231,247,0.12)" : "none",
          border: "1px solid rgba(110,231,247,0.2)",
        }}
        whileHover={state === "idle" ? { scale: 1.04, boxShadow: "0 0 40px rgba(110,231,247,0.55), 0 0 80px rgba(110,231,247,0.2)" } : {}}
        whileTap={state === "idle" ? { scale: 0.97 } : {}}
      >
        {/* Shimmer on hover */}
        {state === "idle" && (
          <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12 pointer-events-none" />
        )}
        <span className="relative z-10">
          {state === "idle" ? "Launch" : "Launching..."}
        </span>
      </motion.button>

      <p className="text-white/20 text-xs tracking-[0.18em] uppercase -mt-4">
        Ontdek het werkproces
      </p>
    </div>
  );
}
