"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DURATION_MS = 2600;
const COOLDOWN_MS = 600;

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
          transition={{ duration: 0.45 }}
        >
          {/* Diffuse glowing current — the body of water */}
          <motion.div
            className="absolute"
            style={{
              top: "28%",
              height: "44%",
              width: "70%",
              left: 0,
              background:
                "radial-gradient(ellipse at center, rgba(103,232,249,0.55) 0%, rgba(6,182,212,0.32) 35%, rgba(6,182,212,0) 70%)",
              filter: "blur(24px)",
            }}
            initial={{ x: "-110%" }}
            animate={{ x: "160%" }}
            transition={{ duration: 2.6, ease: [0.5, 0, 0.5, 1] }}
          />

          {/* Main rolling wave */}
          <motion.svg
            className="absolute left-0"
            style={{
              top: "42%",
              width: "220%",
              height: "200px",
              filter: "drop-shadow(0 0 22px rgba(103,232,249,0.75))",
            }}
            viewBox="0 0 1600 200"
            preserveAspectRatio="none"
            initial={{ x: "-110%" }}
            animate={{ x: "110%" }}
            transition={{ duration: 2.4, ease: [0.55, 0, 0.45, 1] }}
          >
            <path
              d="M0,100 C200,40 400,160 600,100 C800,40 1000,160 1200,100 C1400,40 1600,160 1600,100 L1600,200 L0,200 Z"
              fill="rgba(103,232,249,0.28)"
            />
          </motion.svg>

          {/* Deeper undercurrent — slower, offset */}
          <motion.svg
            className="absolute left-0"
            style={{
              top: "54%",
              width: "220%",
              height: "220px",
              filter: "drop-shadow(0 0 30px rgba(6,182,212,0.55))",
            }}
            viewBox="0 0 1600 220"
            preserveAspectRatio="none"
            initial={{ x: "-115%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2.7, ease: [0.55, 0, 0.45, 1], delay: 0.12 }}
          >
            <path
              d="M0,110 C250,50 500,180 800,110 C1100,50 1350,180 1600,110 L1600,220 L0,220 Z"
              fill="rgba(6,182,212,0.22)"
            />
          </motion.svg>

          {/* Top highlight — the glistening surface line */}
          <motion.svg
            className="absolute left-0"
            style={{
              top: "46%",
              width: "220%",
              height: "60px",
              filter: "drop-shadow(0 0 14px rgba(186,247,255,0.9))",
            }}
            viewBox="0 0 1600 60"
            preserveAspectRatio="none"
            initial={{ x: "-110%" }}
            animate={{ x: "110%" }}
            transition={{ duration: 2.4, ease: [0.55, 0, 0.45, 1], delay: 0.05 }}
          >
            <path
              d="M0,30 C300,8 600,52 900,30 C1200,8 1500,52 1600,30"
              fill="none"
              stroke="rgba(186,247,255,0.85)"
              strokeWidth="1.5"
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
