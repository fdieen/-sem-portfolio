"use client";

import { AnimatePresence, motion } from "framer-motion";

export type RocketPhase = "descending" | "idle" | "ascending";

type Props = {
  phase: RocketPhase;
  onDescentComplete?: () => void;
  onAscentComplete?: () => void;
  /** Position where the rocket comes to rest, in vh (% from top). */
  landingTopVh?: number;
  /** Horizontal landing position in vw (% from left), centered on rocket. */
  landingLeftVw?: number;
};

export default function RocketLanding({
  phase,
  onDescentComplete,
  onAscentComplete,
  landingTopVh = 42,
  landingLeftVw = 80,
}: Props) {
  const animate =
    phase === "descending"
      ? { y: ["-110vh", `${landingTopVh}vh`, `${landingTopVh}vh`] }
      : phase === "ascending"
      ? { y: [`${landingTopVh}vh`, "-130vh"] }
      : { y: `${landingTopVh}vh` };

  const transition =
    phase === "descending"
      ? { duration: 4.6, times: [0, 0.42, 1], ease: [0.55, 0.04, 0.4, 1] as const }
      : phase === "ascending"
      ? { duration: 0.6, ease: [0.55, 0.0, 0.7, 0.2] as const }
      : { duration: 0 };

  return (
    <motion.div
      className="absolute z-30 pointer-events-none"
      style={{ top: 0, left: `${landingLeftVw}vw`, x: "-50%" }}
      initial={{ y: "-110vh" }}
      animate={animate}
      transition={transition}
      onAnimationComplete={() => {
        if (phase === "descending") onDescentComplete?.();
        if (phase === "ascending") onAscentComplete?.();
      }}
    >
      {/* Inner wrapper: subtle idle wobble every 5s while resting on the pad */}
      <motion.div
        style={{ transformOrigin: "50% 95%" }}
        animate={
          phase === "idle"
            ? { y: [0, -3, 0.5, -1.5, 0], rotate: [0, 0.55, -0.15, 0.3, 0] }
            : { y: 0, rotate: 0 }
        }
        transition={
          phase === "idle"
            ? { duration: 5, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0 }
        }
      >
      <svg
        width="110"
        height="200"
        viewBox="0 0 160 290"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "block",
          overflow: "visible",
          filter: "brightness(0.58) saturate(0.8) drop-shadow(0 0 10px rgba(0,0,0,0.45))",
        }}
      >
        <defs>
          <linearGradient id="land-et" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a03c08" />
            <stop offset="35%" stopColor="#d86018" />
            <stop offset="65%" stopColor="#e87828" />
            <stop offset="100%" stopColor="#7a2e06" />
          </linearGradient>
          <linearGradient id="land-srb" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9aaabb" />
            <stop offset="40%" stopColor="#eef2f8" />
            <stop offset="100%" stopColor="#6a7a8a" />
          </linearGradient>
          <linearGradient id="land-orb" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#b0bcd0" />
            <stop offset="40%" stopColor="#f0f4ff" />
            <stop offset="100%" stopColor="#7888a0" />
          </linearGradient>
          <linearGradient id="land-wingTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d8e0f0" />
            <stop offset="100%" stopColor="#9aaac0" />
          </linearGradient>
          <linearGradient id="land-wingBelly" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1e2a" />
            <stop offset="100%" stopColor="#0a0c14" />
          </linearGradient>
          <radialGradient id="land-flameOut" cx="50%" cy="0%" r="85%">
            <stop offset="0%" stopColor="#ff9900" />
            <stop offset="55%" stopColor="#ff4400" />
            <stop offset="100%" stopColor="#cc1100" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="land-flameIn" cx="50%" cy="0%" r="70%">
            <stop offset="0%" stopColor="#ffee88" />
            <stop offset="45%" stopColor="#ffbb00" />
            <stop offset="100%" stopColor="#ff6600" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="land-bgGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6ee7f7" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#6ee7f7" stopOpacity="0" />
          </radialGradient>
          <filter id="land-fb">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        <ellipse cx="80" cy="145" rx="68" ry="130" fill="url(#land-bgGlow)" />

        {/* LEFT SRB */}
        <path d="M26 22 L18 52 L34 52 Z" fill="url(#land-srb)" />
        <path d="M26 22 L21 52 L26 52 Z" fill="#fff" opacity="0.2" />
        <rect x="18" y="49" width="16" height="170" rx="2.5" fill="url(#land-srb)" />
        <rect x="18" y="49" width="6" height="170" rx="2" fill="#fff" opacity="0.08" />
        <rect x="20" y="110" width="12" height="2" rx="1" fill="#cc1111" opacity="0.7" />
        <rect x="18" y="145" width="16" height="3" rx="1" fill="#8090a0" opacity="0.6" />
        <path d="M18 219 Q15 232 17 238 L35 238 Q37 232 34 219 Z" fill="#1a2030" />
        <ellipse cx="26" cy="238" rx="9" ry="3" fill="#080e18" />

        {/* RIGHT SRB */}
        <path d="M134 22 L126 52 L142 52 Z" fill="url(#land-srb)" />
        <path d="M134 22 L129 52 L134 52 Z" fill="#fff" opacity="0.2" />
        <rect x="126" y="49" width="16" height="170" rx="2.5" fill="url(#land-srb)" />
        <rect x="126" y="49" width="6" height="170" rx="2" fill="#fff" opacity="0.08" />
        <rect x="128" y="110" width="12" height="2" rx="1" fill="#cc1111" opacity="0.7" />
        <rect x="126" y="145" width="16" height="3" rx="1" fill="#8090a0" opacity="0.6" />
        <path d="M126 219 Q123 232 125 238 L143 238 Q145 232 142 219 Z" fill="#1a2030" />
        <ellipse cx="134" cy="238" rx="9" ry="3" fill="#080e18" />

        {/* EXTERNAL TANK */}
        <path d="M80 18 Q60 18 58 42 L102 42 Q100 18 80 18Z" fill="#c05010" />
        <path d="M80 18 Q68 18 66 42 L80 42 Z" fill="#e06818" opacity="0.35" />
        <rect x="58" y="38" width="44" height="188" rx="2" fill="url(#land-et)" />
        <rect x="58" y="38" width="14" height="188" rx="2" fill="#fff" opacity="0.06" />
        <path d="M58 226 Q58 240 80 242 Q102 240 102 226 Z" fill="#8a3006" />

        {/* STRUTS */}
        <line x1="34" y1="105" x2="58" y2="108" stroke="#a0b0c0" strokeWidth="2" opacity="0.5" />
        <line x1="126" y1="105" x2="102" y2="108" stroke="#a0b0c0" strokeWidth="2" opacity="0.5" />
        <line x1="34" y1="175" x2="58" y2="178" stroke="#a0b0c0" strokeWidth="1.5" opacity="0.4" />
        <line x1="126" y1="175" x2="102" y2="178" stroke="#a0b0c0" strokeWidth="1.5" opacity="0.4" />

        {/* ORBITER */}
        <path d="M77 24 L83 24 L83 115 L77 115 Z" fill="#c8d0e0" />
        <path d="M79 24 L83 24 L83 100 Z" fill="#e8ecf8" opacity="0.25" />
        <rect x="79" y="24" width="4" height="4" rx="1" fill="#6ee7f7" opacity="0.4" />
        <path d="M80 16 C74 16 64 32 63 50 L97 50 C96 32 86 16 80 16Z" fill="url(#land-orb)" />
        <path d="M80 16 C76 16 68 32 68 50 L80 50 Z" fill="#fff" opacity="0.15" />
        <path d="M80 16 C77 20 74 32 73 44 L80 44 L87 44 C86 32 83 20 80 16Z" fill="#2a1818" opacity="0.55" />

        {/* Cockpit */}
        <rect x="68" y="54" width="24" height="10" rx="2.5" fill="#1a3060" />
        <rect x="70" y="55.5" width="9" height="7" rx="1.5" fill="#2a4a90" opacity="0.9" />
        <rect x="81" y="55.5" width="9" height="7" rx="1.5" fill="#2a4a90" opacity="0.9" />
        <rect x="71" y="56.5" width="3" height="4" rx="0.8" fill="#4a70c0" opacity="0.6" />
        <rect x="82" y="56.5" width="3" height="4" rx="0.8" fill="#4a70c0" opacity="0.6" />

        {/* Orbiter body */}
        <rect x="63" y="50" width="34" height="140" rx="3" fill="url(#land-orb)" />
        <rect x="63" y="50" width="10" height="140" rx="3" fill="#fff" opacity="0.07" />
        <line x1="80" y1="65" x2="80" y2="185" stroke="#8090a8" strokeWidth="0.8" opacity="0.5" />
        <line x1="63" y1="120" x2="97" y2="120" stroke="#8090a8" strokeWidth="0.7" opacity="0.35" />
        <rect x="63" y="155" width="34" height="35" rx="2" fill="#1a1828" />
        <rect x="63" y="185" width="34" height="8" rx="1" fill="#0e1020" />
        <ellipse cx="68" cy="162" rx="5" ry="9" fill="#9aaabb" />
        <ellipse cx="92" cy="162" rx="5" ry="9" fill="#9aaabb" />

        {/* Wings */}
        <path d="M63 125 L63 195 L8 220 L12 188 Z" fill="url(#land-wingTop)" />
        <path d="M63 165 L63 195 L8 220 L10 205 Z" fill="url(#land-wingBelly)" />
        <path d="M63 125 L12 188 L8 184 L63 120 Z" fill="#c8d4e8" opacity="0.5" />
        <path d="M97 125 L97 195 L152 220 L148 188 Z" fill="url(#land-wingTop)" />
        <path d="M97 165 L97 195 L152 220 L150 205 Z" fill="url(#land-wingBelly)" />
        <path d="M97 125 L148 188 L152 184 L97 120 Z" fill="#c8d4e8" opacity="0.5" />

        {/* SSME nozzles */}
        <path d="M69 193 Q65 205 67 210 L77 210 Q79 205 75 193 Z" fill="#0e1828" />
        <ellipse cx="72" cy="210" rx="5.5" ry="2" fill="#060c18" />
        <path d="M80 193 Q77 207 79 212 L89 212 Q91 207 88 193 Z" fill="#0e1828" />
        <ellipse cx="84" cy="212" rx="5.5" ry="2" fill="#060c18" />
        <path d="M74 199 Q70 213 72 218 L88 218 Q90 213 86 199 Z" fill="#1a2438" />
        <ellipse cx="80" cy="218" rx="8" ry="2.5" fill="#060c18" />

        {/* FLAMES — descent (retro burn) */}
        <AnimatePresence>
          {phase === "descending" && (
            <>
              <motion.path
                key="d-srb-l"
                d="M20 238 Q16 258 18 272 Q26 288 26 285 Q26 288 34 272 Q36 258 32 238Z"
                fill="url(#land-flameOut)"
                filter="url(#land-fb)"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [0, 1.3, 1.1, 0], opacity: [0, 1, 0.85, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.0, delay: 0.2, times: [0, 0.3, 0.85, 1], ease: "easeInOut" }}
                style={{ transformOrigin: "26px 238px" }}
              />
              <motion.path
                key="d-srb-r"
                d="M128 238 Q124 258 126 272 Q134 288 134 285 Q134 288 142 272 Q144 258 140 238Z"
                fill="url(#land-flameOut)"
                filter="url(#land-fb)"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [0, 1.3, 1.1, 0], opacity: [0, 1, 0.85, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.0, delay: 0.2, times: [0, 0.3, 0.85, 1], ease: "easeInOut" }}
                style={{ transformOrigin: "134px 238px" }}
              />
              <motion.path
                key="d-ssme-out"
                d="M68 218 Q62 242 64 260 Q72 285 80 282 Q88 285 96 260 Q98 242 92 218Z"
                fill="url(#land-flameOut)"
                filter="url(#land-fb)"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [0, 1.5, 1.2, 0], opacity: [0, 1, 0.9, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.0, delay: 0.25, times: [0, 0.3, 0.85, 1], ease: "easeInOut" }}
                style={{ transformOrigin: "80px 218px" }}
              />
              <motion.path
                key="d-ssme-in"
                d="M72 218 Q69 238 71 252 Q77 272 80 270 Q83 272 89 252 Q91 238 88 218Z"
                fill="url(#land-flameIn)"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [0, 1.4, 1.1, 0], opacity: [0, 1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.0, delay: 0.3, times: [0, 0.3, 0.85, 1], ease: "easeInOut" }}
                style={{ transformOrigin: "80px 218px" }}
              />
            </>
          )}
        </AnimatePresence>

        {/* FLAMES — ascent (full burn) */}
        <AnimatePresence>
          {phase === "ascending" && (
            <>
              <motion.path
                key="a-srb-l"
                d="M20 238 Q16 258 18 272 Q26 288 26 285 Q26 288 34 272 Q36 258 32 238Z"
                fill="url(#land-flameOut)"
                filter="url(#land-fb)"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [0.5, 1.4, 1.2], opacity: [0, 1, 0.85] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ transformOrigin: "26px 238px" }}
              />
              <motion.path
                key="a-srb-r"
                d="M128 238 Q124 258 126 272 Q134 288 134 285 Q134 288 142 272 Q144 258 140 238Z"
                fill="url(#land-flameOut)"
                filter="url(#land-fb)"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [0.5, 1.4, 1.2], opacity: [0, 1, 0.85] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ transformOrigin: "134px 238px" }}
              />
              <motion.path
                key="a-ssme-out"
                d="M68 218 Q62 242 64 260 Q72 285 80 282 Q88 285 96 260 Q98 242 92 218Z"
                fill="url(#land-flameOut)"
                filter="url(#land-fb)"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [0.4, 1.6, 1.3], opacity: [0, 1, 0.9] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
                style={{ transformOrigin: "80px 218px" }}
              />
              <motion.path
                key="a-ssme-in"
                d="M72 218 Q69 238 71 252 Q77 272 80 270 Q83 272 89 252 Q91 238 88 218Z"
                fill="url(#land-flameIn)"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [0.3, 1.5, 1.2], opacity: [0, 1, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
                style={{ transformOrigin: "80px 218px" }}
              />
            </>
          )}
        </AnimatePresence>
      </svg>
      </motion.div>

      {/* Dust/spray burst on touchdown (descent only) */}
      <AnimatePresence>
        {phase === "descending" && (
          <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: -8 }}>
            {[...Array(10)].map((_, i) => {
              const angle = ((i / 10) - 0.5) * Math.PI;
              const dist = 50 + (i % 3) * 18;
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: 14 + (i % 3) * 6,
                    height: 14 + (i % 3) * 6,
                    background: "rgba(220, 200, 170, 0.45)",
                    filter: "blur(5px)",
                    left: 0,
                    top: 0,
                  }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                  animate={{
                    x: Math.cos(angle) * dist,
                    y: -Math.abs(Math.sin(angle)) * 16 + 6,
                    opacity: [0, 0.7, 0],
                    scale: [0.4, 1.6, 2.2],
                  }}
                  transition={{ duration: 1.6, delay: 1.85, ease: "easeOut" }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
