"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DURATION_MS = 3200;
const COOLDOWN_MS = 800;

type Drop = {
  left: string;
  size: number;
  delay: number;
  startY: string;
  fall: number;
  drift: number;
};

// Druppels spatten vanaf de onderkant van de golf naarmate die voorbij rolt.
// startY = ongeveer de y-positie van de golf-onderkant op tijdstip `delay`.
const drops: Drop[] = [
  { left: "9%",  size: 13, delay: 0.70, startY: "30vh", fall: 1.5, drift:  6 },
  { left: "17%", size: 10, delay: 0.95, startY: "42vh", fall: 1.4, drift: -5 },
  { left: "26%", size: 17, delay: 0.75, startY: "33vh", fall: 1.5, drift:  8 },
  { left: "35%", size: 12, delay: 1.05, startY: "47vh", fall: 1.4, drift: -7 },
  { left: "43%", size: 9,  delay: 0.85, startY: "38vh", fall: 1.5, drift:  5 },
  { left: "52%", size: 16, delay: 0.65, startY: "28vh", fall: 1.6, drift: -8 },
  { left: "60%", size: 11, delay: 1.10, startY: "49vh", fall: 1.4, drift:  6 },
  { left: "68%", size: 18, delay: 0.80, startY: "35vh", fall: 1.5, drift: -9 },
  { left: "76%", size: 12, delay: 1.00, startY: "44vh", fall: 1.4, drift:  7 },
  { left: "84%", size: 15, delay: 0.78, startY: "34vh", fall: 1.5, drift: -6 },
  { left: "92%", size: 10, delay: 1.02, startY: "45vh", fall: 1.4, drift:  5 },
];

function Droplet({ d, idx }: { d: Drop; idx: number }) {
  const w = d.size;
  const h = d.size * 1.32;
  const gradId = `drop-grad-${idx}`;

  return (
    <motion.div
      className="absolute top-0"
      style={{ left: d.left, width: w, transform: "translateX(-50%)" }}
      initial={{ y: d.startY, x: 0, opacity: 0, scale: 0.4 }}
      animate={{
        y: "115vh",
        x: d.drift,
        opacity: [0, 1, 1, 0.85, 0],
        scale: 1,
      }}
      transition={{
        duration: d.fall,
        delay: d.delay,
        ease: [0.4, 0, 0.65, 1],
        x: { duration: d.fall, delay: d.delay, ease: "easeInOut" },
        opacity: {
          duration: d.fall,
          delay: d.delay,
          times: [0, 0.12, 0.7, 0.88, 1],
        },
        scale: { duration: 0.25, delay: d.delay, ease: "easeOut" },
      }}
    >
      <svg
        width={w}
        height={h}
        viewBox="0 0 24 32"
        style={{
          display: "block",
          filter:
            "drop-shadow(0 0 6px rgba(103,232,249,0.95)) drop-shadow(0 0 14px rgba(6,182,212,0.7))",
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

          {/* De golf zelf — een gebogen waterband die van boven naar beneden rolt */}
          <motion.div
            className="absolute left-0 right-0"
            style={{ top: 0 }}
            initial={{ y: "-35vh" }}
            animate={{ y: "120vh" }}
            transition={{ duration: 2.4, ease: [0.42, 0, 0.55, 1] }}
          >
            <svg
              width="100%"
              height="220"
              viewBox="0 0 1600 220"
              preserveAspectRatio="none"
              style={{
                display: "block",
                filter:
                  "drop-shadow(0 0 28px rgba(103,232,249,0.75)) drop-shadow(0 0 60px rgba(6,182,212,0.55)) drop-shadow(0 0 110px rgba(6,182,212,0.3))",
              }}
            >
              <defs>
                <linearGradient id="wave-body" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(186,247,255,0.0)" />
                  <stop offset="15%" stopColor="rgba(186,247,255,0.55)" />
                  <stop offset="50%" stopColor="rgba(103,232,249,0.65)" />
                  <stop offset="100%" stopColor="rgba(6,182,212,0.7)" />
                </linearGradient>
                <linearGradient id="wave-crest" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
                  <stop offset="100%" stopColor="rgba(186,247,255,0)" />
                </linearGradient>
              </defs>

              {/* Hoofd-waterlichaam met golvende boven- en onderkant */}
              <path
                d="M 0 40
                   C 200 5  400 70  600 35
                   C 800 0  1000 65 1200 30
                   C 1400 0  1600 60 1600 35
                   L 1600 165
                   C 1400 215 1200 140 1000 180
                   C 800 215  600 135 400 175
                   C 200 215  0 140  0 175
                   Z"
                fill="url(#wave-body)"
              />

              {/* Schitterende crest-lijn bovenop */}
              <path
                d="M 0 40
                   C 200 5  400 70  600 35
                   C 800 0  1000 65 1200 30
                   C 1400 0  1600 60 1600 35"
                fill="none"
                stroke="url(#wave-crest)"
                strokeWidth="2"
                opacity="0.9"
              />
            </svg>
          </motion.div>

          {/* Druppels die loslaten naarmate de golf voorbij rolt */}
          {drops.map((d, i) => (
            <Droplet key={i} d={d} idx={i} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
