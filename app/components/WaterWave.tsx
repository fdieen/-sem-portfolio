"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DURATION_MS = 3600;
const COOLDOWN_MS = 800;

type Stream = {
  d: string;
  strokeWidth: number;
  duration: number;
  delay: number;
};

// 4 verticale golfstromen — viewBox 1000x1000, lichte slingering links/rechts
const streams: Stream[] = [
  {
    d: "M 160 -60 Q 110 220 160 440 Q 210 660 160 880 L 160 1060",
    strokeWidth: 16,
    duration: 2.6,
    delay: 0.0,
  },
  {
    d: "M 390 -60 Q 430 240 390 460 Q 350 680 390 900 L 390 1060",
    strokeWidth: 13,
    duration: 2.85,
    delay: 0.18,
  },
  {
    d: "M 620 -60 Q 575 250 620 470 Q 665 690 620 910 L 620 1060",
    strokeWidth: 18,
    duration: 2.5,
    delay: 0.08,
  },
  {
    d: "M 850 -60 Q 895 220 850 440 Q 805 660 850 880 L 850 1060",
    strokeWidth: 14,
    duration: 2.95,
    delay: 0.25,
  },
];

type Splash = {
  left: string;
  startY: string;
  delay: number;
  fall: number;
  drift: number;
  size: number;
};

// Spetters vanaf elke golfstroom — timing ongeveer afgestemd op golfkop-positie
const splashes: Splash[] = [
  // Golf 1 (~16%)
  { left: "17.5%", startY: "22vh", delay: 0.55, fall: 1.3, drift:  10, size: 11 },
  { left: "14%",   startY: "52vh", delay: 1.20, fall: 1.2, drift: -12, size: 13 },
  { left: "17%",   startY: "78vh", delay: 1.85, fall: 1.1, drift:   8, size:  9 },
  // Golf 2 (~39%)
  { left: "40.5%", startY: "26vh", delay: 0.75, fall: 1.3, drift: -11, size: 10 },
  { left: "37%",   startY: "55vh", delay: 1.40, fall: 1.2, drift:   9, size: 12 },
  { left: "40%",   startY: "80vh", delay: 2.05, fall: 1.0, drift:  -7, size:  9 },
  // Golf 3 (~62%)
  { left: "60.5%", startY: "24vh", delay: 0.60, fall: 1.3, drift:  12, size: 13 },
  { left: "63.5%", startY: "54vh", delay: 1.25, fall: 1.2, drift: -10, size: 11 },
  { left: "61%",   startY: "82vh", delay: 1.90, fall: 1.1, drift:   8, size: 12 },
  // Golf 4 (~85%)
  { left: "83%",   startY: "28vh", delay: 0.85, fall: 1.3, drift: -12, size: 10 },
  { left: "86%",   startY: "58vh", delay: 1.50, fall: 1.2, drift:   9, size: 13 },
  { left: "82.5%", startY: "82vh", delay: 2.15, fall: 1.0, drift:  -7, size:  9 },
];

function SplashDroplet({ s, idx }: { s: Splash; idx: number }) {
  const w = s.size;
  const h = s.size * 1.32;
  const gradId = `splash-grad-${idx}`;

  return (
    <motion.div
      className="absolute top-0"
      style={{ left: s.left, width: w, transform: "translateX(-50%)" }}
      initial={{ y: s.startY, x: 0, opacity: 0, scale: 0.35 }}
      animate={{
        y: "115vh",
        x: s.drift,
        opacity: [0, 1, 1, 0.8, 0],
        scale: 1,
      }}
      transition={{
        duration: s.fall,
        delay: s.delay,
        ease: [0.4, 0, 0.65, 1],
        x: { duration: s.fall, delay: s.delay, ease: "easeInOut" },
        opacity: {
          duration: s.fall,
          delay: s.delay,
          times: [0, 0.14, 0.7, 0.88, 1],
        },
        scale: { duration: 0.22, delay: s.delay, ease: "easeOut" },
      }}
    >
      <svg
        width={w}
        height={h}
        viewBox="0 0 24 32"
        style={{
          display: "block",
          filter:
            "drop-shadow(0 0 6px rgba(110,231,247,0.95)) drop-shadow(0 0 14px rgba(6,182,212,0.7))",
        }}
      >
        <defs>
          <radialGradient id={gradId} cx="38%" cy="62%" r="62%">
            <stop offset="0%" stopColor="rgba(220,250,255,0.95)" />
            <stop offset="45%" stopColor="rgba(103,232,249,0.9)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0.85)" />
          </radialGradient>
        </defs>
        <path
          d="M12 2 C 12 2, 3 14, 3 21 C 3 27, 7 31, 12 31 C 17 31, 21 27, 21 21 C 21 14, 12 2, 12 2 Z"
          fill={`url(#${gradId})`}
        />
      </svg>
    </motion.div>
  );
}

export default function WaterWave() {
  const [show, setShow] = useState(false);
  const playingRef = useRef(false);

  useEffect(() => {
    const target = document.getElementById("werkproces");
    if (!target) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let hideTimer: number | undefined;
    let cooldownTimer: number | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !playingRef.current) {
          playingRef.current = true;
          setShow(true);
          hideTimer = window.setTimeout(() => setShow(false), DURATION_MS);
          cooldownTimer = window.setTimeout(() => {
            playingRef.current = false;
          }, DURATION_MS + COOLDOWN_MS);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(target);
    return () => {
      observer.disconnect();
      if (hideTimer !== undefined) window.clearTimeout(hideTimer);
      if (cooldownTimer !== undefined) window.clearTimeout(cooldownTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="water-wave"
          aria-hidden
          className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
          style={{ mixBlendMode: "screen" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Turquoise haze bovenaan — de bron */}
          <motion.div
            className="absolute top-0 left-0 right-0"
            style={{
              height: "45vh",
              background:
                "radial-gradient(ellipse 65% 100% at 50% 0%, rgba(103,232,249,0.4) 0%, rgba(6,182,212,0.2) 35%, rgba(6,182,212,0) 70%)",
              filter: "blur(8px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              duration: DURATION_MS / 1000,
              times: [0, 0.12, 0.7, 1],
              ease: "easeInOut",
            }}
          />

          {/* 4 verticale golfstromen */}
          <svg
            className="absolute inset-0"
            style={{
              width: "100%",
              height: "100%",
              filter:
                "drop-shadow(0 0 8px rgba(110,231,247,0.95)) drop-shadow(0 0 22px rgba(6,182,212,0.55)) drop-shadow(0 0 50px rgba(6,182,212,0.3))",
            }}
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
          >
            {streams.map((stream, i) => (
              <motion.path
                key={i}
                d={stream.d}
                stroke="rgba(110,231,247,0.9)"
                strokeWidth={stream.strokeWidth}
                strokeLinecap="round"
                fill="none"
                vectorEffect="non-scaling-stroke"
                pathLength={1}
                strokeDasharray="0.35 2"
                initial={{ strokeDashoffset: 0.4 }}
                animate={{ strokeDashoffset: -1.05 }}
                transition={{
                  duration: stream.duration,
                  delay: stream.delay,
                  ease: [0.4, 0, 0.6, 1],
                }}
              />
            ))}
          </svg>

          {/* Spetters die loslaten van de golven */}
          {splashes.map((s, i) => (
            <SplashDroplet key={i} s={s} idx={i} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
