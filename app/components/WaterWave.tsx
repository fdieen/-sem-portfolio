"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DURATION_MS = 3200;
const COOLDOWN_MS = 800;

type Drop = {
  left: string;
  size: number;
  delay: number;
  fall: number;
  wobble: number;
};

const drops: Drop[] = [
  { left: "6%",  size: 22, delay: 0.05, fall: 1.7, wobble: -8 },
  { left: "14%", size: 14, delay: 0.45, fall: 2.0, wobble: 6 },
  { left: "22%", size: 30, delay: 0.20, fall: 1.5, wobble: -10 },
  { left: "31%", size: 18, delay: 0.65, fall: 1.9, wobble: 5 },
  { left: "40%", size: 26, delay: 0.10, fall: 1.6, wobble: -7 },
  { left: "48%", size: 16, delay: 0.55, fall: 2.0, wobble: 9 },
  { left: "56%", size: 34, delay: 0.30, fall: 1.55, wobble: -6 },
  { left: "64%", size: 20, delay: 0.0, fall: 1.85, wobble: 7 },
  { left: "73%", size: 24, delay: 0.50, fall: 1.7, wobble: -9 },
  { left: "81%", size: 16, delay: 0.15, fall: 2.0, wobble: 5 },
  { left: "89%", size: 28, delay: 0.40, fall: 1.65, wobble: -8 },
  { left: "96%", size: 14, delay: 0.25, fall: 1.95, wobble: 6 },
];

function Droplet({ d }: { d: Drop }) {
  const w = d.size;
  const h = d.size * 1.32;
  const trailH = d.size * 2.6;

  return (
    <motion.div
      className="absolute top-0"
      style={{ left: d.left, width: w, transform: `translateX(-50%)` }}
      initial={{ y: "-20vh", x: 0, opacity: 0 }}
      animate={{
        y: "115vh",
        x: [0, d.wobble, -d.wobble * 0.6, 0],
        opacity: [0, 1, 1, 0.85, 0],
      }}
      transition={{
        duration: d.fall,
        delay: d.delay,
        ease: [0.42, 0, 0.6, 1],
        x: { duration: d.fall, delay: d.delay, ease: "easeInOut" },
        opacity: {
          duration: d.fall,
          delay: d.delay,
          times: [0, 0.12, 0.75, 0.9, 1],
        },
      }}
    >
      {/* Soft trail behind */}
      <div
        className="absolute left-1/2"
        style={{
          top: -trailH,
          width: w * 0.55,
          height: trailH,
          transform: "translateX(-50%)",
          background:
            "linear-gradient(to bottom, rgba(103,232,249,0) 0%, rgba(103,232,249,0.35) 70%, rgba(186,247,255,0.65) 100%)",
          filter: "blur(5px)",
          borderRadius: "50%",
        }}
      />

      {/* Teardrop body */}
      <svg
        width={w}
        height={h}
        viewBox="0 0 24 32"
        style={{
          display: "block",
          filter:
            "drop-shadow(0 0 8px rgba(103,232,249,0.95)) drop-shadow(0 0 18px rgba(6,182,212,0.7)) drop-shadow(0 0 32px rgba(6,182,212,0.35))",
        }}
      >
        <defs>
          <radialGradient
            id={`drop-grad-${d.left.replace("%", "")}-${d.size}`}
            cx="38%"
            cy="62%"
            r="62%"
          >
            <stop offset="0%" stopColor="rgba(220,250,255,0.95)" />
            <stop offset="40%" stopColor="rgba(103,232,249,0.9)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0.85)" />
          </radialGradient>
        </defs>
        <path
          d="M12 2 C 12 2, 3 14, 3 21 C 3 27, 7 31, 12 31 C 17 31, 21 27, 21 21 C 21 14, 12 2, 12 2 Z"
          fill={`url(#drop-grad-${d.left.replace("%", "")}-${d.size})`}
        />
        {/* Glossy highlight */}
        <ellipse
          cx="8.5"
          cy="22"
          rx="2.4"
          ry="3.8"
          fill="rgba(255,255,255,0.75)"
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
          key="water-drops"
          aria-hidden
          className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
          style={{ mixBlendMode: "screen" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Source glow — turquoise haze raining down from above */}
          <motion.div
            className="absolute top-0 left-0 right-0"
            style={{
              height: "55vh",
              background:
                "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(103,232,249,0.45) 0%, rgba(6,182,212,0.22) 35%, rgba(6,182,212,0) 70%)",
              filter: "blur(10px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              duration: DURATION_MS / 1000,
              times: [0, 0.12, 0.7, 1],
              ease: "easeInOut",
            }}
          />

          {/* Falling droplets */}
          {drops.map((d, i) => (
            <Droplet key={i} d={d} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
