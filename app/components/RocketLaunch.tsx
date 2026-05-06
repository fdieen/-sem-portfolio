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
        <svg width="100" height="240" viewBox="0 0 100 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="nose" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e0ecff"/>
              <stop offset="100%" stopColor="#8aacd8"/>
            </linearGradient>
            <linearGradient id="body" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#c8d8f0"/>
              <stop offset="40%" stopColor="#f0f4ff"/>
              <stop offset="100%" stopColor="#8090b0"/>
            </linearGradient>
            <linearGradient id="fin" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6ee7f7"/>
              <stop offset="100%" stopColor="#1a5080"/>
            </linearGradient>
            <radialGradient id="window" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#a0d8ff"/>
              <stop offset="60%" stopColor="#1a5090"/>
              <stop offset="100%" stopColor="#050f1f"/>
            </radialGradient>
            <linearGradient id="stripe" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6ee7f7" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#6ee7f7" stopOpacity="0.1"/>
            </linearGradient>
            {/* Flame gradients */}
            <radialGradient id="flameOuter" cx="50%" cy="0%" r="80%">
              <stop offset="0%" stopColor="#ff8c00"/>
              <stop offset="60%" stopColor="#ff4400"/>
              <stop offset="100%" stopColor="#cc1100" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="flameInner" cx="50%" cy="0%" r="70%">
              <stop offset="0%" stopColor="#ffe060"/>
              <stop offset="50%" stopColor="#ffaa00"/>
              <stop offset="100%" stopColor="#ff5500" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="glowPulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6ee7f7" stopOpacity="0.18"/>
              <stop offset="100%" stopColor="#6ee7f7" stopOpacity="0"/>
            </radialGradient>
            <filter id="flameBlur">
              <feGaussianBlur stdDeviation="2.5"/>
            </filter>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Glow behind rocket */}
          <ellipse cx="50" cy="120" rx="44" ry="120" fill="url(#glowPulse)"/>

          {/* === ROCKET BODY === */}
          {/* Nose cone */}
          <path d="M50 8 C50 8 30 50 28 72 L72 72 C70 50 50 8 50 8Z" fill="url(#nose)"/>
          <path d="M50 8 C50 8 38 50 38 72 L50 72 L50 8Z" fill="#fff" opacity="0.18"/>

          {/* Main body */}
          <rect x="28" y="68" width="44" height="110" rx="3" fill="url(#body)"/>
          {/* Body highlight */}
          <rect x="28" y="68" width="16" height="110" rx="3" fill="#fff" opacity="0.09"/>
          {/* Body shadow */}
          <rect x="66" y="68" width="6" height="110" rx="2" fill="#000" opacity="0.12"/>

          {/* Cyan accent stripe */}
          <rect x="28" y="95" width="44" height="5" rx="1" fill="url(#stripe)"/>
          <rect x="28" y="148" width="44" height="4" rx="1" fill="url(#stripe)"/>

          {/* Porthole window */}
          <circle cx="50" cy="120" r="14" fill="#0a1828" stroke="#6ee7f7" strokeWidth="1.5"/>
          <circle cx="50" cy="120" r="11" fill="url(#window)"/>
          <ellipse cx="46" cy="115" rx="4" ry="2.5" fill="#fff" opacity="0.22" transform="rotate(-20 46 115)"/>
          {/* Window glow */}
          <circle cx="50" cy="120" r="14" fill="none" stroke="#6ee7f7" strokeWidth="0.7" opacity="0.5" filter="url(#glow)"/>

          {/* Engine section */}
          <rect x="30" y="175" width="40" height="8" rx="2" fill="#1a2840"/>
          <rect x="33" y="181" width="34" height="6" rx="2" fill="#0e1828"/>

          {/* Left fin */}
          <path d="M28 158 L8 188 L28 178 Z" fill="url(#fin)" opacity="0.9"/>
          <path d="M28 158 L18 180 L28 178 Z" fill="#fff" opacity="0.12"/>

          {/* Right fin */}
          <path d="M72 158 L92 188 L72 178 Z" fill="url(#fin)" opacity="0.9"/>

          {/* Engine nozzle */}
          <path d="M36 187 Q33 200 35 205 L65 205 Q67 200 64 187 Z" fill="#0e1828"/>
          <ellipse cx="50" cy="205" rx="15" ry="4" fill="#060e1a"/>

          {/* === FLAME (only when launching) === */}
          <AnimatePresence>
            {state === "launching" && (
              <>
                {/* Outer flame */}
                <motion.path
                  d="M36 205 Q30 230 32 250 Q40 275 50 270 Q60 275 68 250 Q70 230 64 205 Z"
                  fill="url(#flameOuter)"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: [0.6, 1.4, 1.1], opacity: [0, 1, 0.9] }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{ transformOrigin: "50px 205px" }}
                  filter="url(#flameBlur)"
                />
                {/* Inner flame */}
                <motion.path
                  d="M41 205 Q38 222 40 238 Q45 258 50 255 Q55 258 60 238 Q62 222 59 205 Z"
                  fill="url(#flameInner)"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: [0.5, 1.3, 1.0], opacity: [0, 1, 1] }}
                  transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
                  style={{ transformOrigin: "50px 205px" }}
                />
              </>
            )}
          </AnimatePresence>
        </svg>

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
