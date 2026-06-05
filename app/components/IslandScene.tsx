"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

function seeded(s: number): number {
  const x = Math.sin(s * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/* ────────────── LANDING PLATFORM ────────────── */

function LandingPlatform({
  topPx,
  topVh,
  leftVw,
}: {
  topPx: number;
  topVh: number;
  leftVw: number;
}) {
  return (
    <div
      className="absolute z-20 pointer-events-none"
      style={{
        left: `${leftVw}vw`,
        transform: "translateX(-50%)",
        top: `calc(${topVh}vh + ${topPx}px)`,
      }}
    >
      <svg
        width="150"
        height="64"
        viewBox="0 0 150 64"
        style={{ display: "block", overflow: "visible" }}
      >
        <defs>
          <linearGradient id="deck-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a2235" />
            <stop offset="60%" stopColor="#0c121f" />
            <stop offset="100%" stopColor="#070a13" />
          </linearGradient>
          <radialGradient id="deck-glow" cx="50%" cy="100%" r="60%">
            <stop offset="0%" stopColor="rgba(110,231,247,0.55)" />
            <stop offset="100%" stopColor="rgba(110,231,247,0)" />
          </radialGradient>
        </defs>

        <ellipse cx="75" cy="58" rx="62" ry="5" fill="url(#deck-glow)" />

        <rect x="32" y="32" width="3" height="22" fill="#060911" rx="1" />
        <rect x="58" y="32" width="3" height="26" fill="#060911" rx="1" />
        <rect x="89" y="32" width="3" height="26" fill="#060911" rx="1" />
        <rect x="115" y="32" width="3" height="22" fill="#060911" rx="1" />

        <path
          d="M 40,12 L 110,12 L 132,18 L 132,28 L 110,34 L 40,34 L 18,28 L 18,18 Z"
          fill="url(#deck-grad)"
          stroke="rgba(110,231,247,0.35)"
          strokeWidth="1"
        />

        <path
          d="M 40,12 L 110,12"
          stroke="rgba(190,240,255,0.55)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <line x1="22" y1="22" x2="128" y2="22" stroke="rgba(110,231,247,0.10)" strokeWidth="0.6" />
        <line x1="75" y1="12" x2="75" y2="34" stroke="rgba(110,231,247,0.08)" strokeWidth="0.5" />

        {[
          { x: 40, y: 12 },
          { x: 110, y: 12 },
          { x: 132, y: 18 },
          { x: 132, y: 28 },
          { x: 110, y: 34 },
          { x: 40, y: 34 },
          { x: 18, y: 28 },
          { x: 18, y: 18 },
        ].map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="1.8"
            fill="#aef3ff"
            style={{ filter: "drop-shadow(0 0 4px #6ee7f7)" }}
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{
              duration: 2.4,
              delay: i * 0.18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ────────────── SHORELINE ──────────────
   Two foreground island silhouettes pinned to the bottom of the scene.
   Peaks on the far left and far right (where the palms stand) and dips
   in the middle so the water still reads as ocean. Stretches to full
   viewport width via preserveAspectRatio="none". */

function Shoreline() {
  return (
    <svg
      className="absolute left-0 right-0 bottom-0 pointer-events-none"
      style={{ height: "38vh", width: "100%" }}
      viewBox="0 0 1000 380"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="shore-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e1626" />
          <stop offset="55%" stopColor="#060c18" />
          <stop offset="100%" stopColor="#01040a" />
        </linearGradient>
        {/* Sand — desaturated, moonlit beach tones. Warm grey-brown rather than
            orange-tan so it reads as real nighttime sand instead of cartoon. */}
        <linearGradient id="sand-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#857764" stopOpacity="1" />
          <stop offset="30%" stopColor="#6c5f4e" stopOpacity="1" />
          <stop offset="65%" stopColor="#4a4034" stopOpacity="1" />
          <stop offset="100%" stopColor="#2c2620" stopOpacity="1" />
        </linearGradient>
        {/* Wet sand at the water's edge — slight cool moonlight reflection */}
        <linearGradient id="wet-sand-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9c9484" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#9c9484" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Continuous shoreline — one beach runs from left to right across the
          whole bottom, with a small dip in the middle so the waterline still
          curves naturally instead of being flat. */}
      <path
        d="M 0,380 L 0,92
           Q 50,68 130,72 Q 220,82 300,104 Q 370,124 410,150
           Q 500,168 590,150
           Q 630,124 700,104 Q 780,82 870,72 Q 950,68 1000,92
           L 1000,380 Z"
        fill="url(#shore-grad)"
      />

      {/* Continuous sandy beach — fills the entire land from waterline to the
          bottom of the scene so the ground is unmistakably present. */}
      <path
        d="M 0,92
           Q 50,68 130,72 Q 220,82 300,104 Q 370,124 410,150
           Q 500,168 590,150
           Q 630,124 700,104 Q 780,82 870,72 Q 950,68 1000,92
           L 1000,380 L 0,380 Z"
        fill="url(#sand-grad)"
      />

      {/* Wet-sand highlight band right at the water's edge — makes the beach pop */}
      <path
        d="M 0,92
           Q 50,68 130,72 Q 220,82 300,104 Q 370,124 410,150
           Q 500,168 590,150
           Q 630,124 700,104 Q 780,82 870,72 Q 950,68 1000,92
           L 1000,118
           Q 950,94 870,98 Q 780,108 700,130 Q 630,150 590,176
           Q 500,194 410,176
           Q 370,150 300,130 Q 220,108 130,98 Q 50,94 0,118 Z"
        fill="url(#wet-sand-grad)"
      />

      {/* Crisp cyan water-line edge — one unbroken curve across the page */}
      <path
        d="M 0,92
           Q 50,68 130,72 Q 220,82 300,104 Q 370,124 410,150
           Q 500,168 590,150
           Q 630,124 700,104 Q 780,82 870,72 Q 950,68 1000,92"
        stroke="rgba(180,250,255,0.65)"
        strokeWidth="1.4"
        fill="none"
      />

      {/* Soft shadow patches — wet spots / depressions, breaks up the flat gradient */}
      {[
        { cx: 90, cy: 140, rx: 38, ry: 6 },
        { cx: 240, cy: 178, rx: 44, ry: 7 },
        { cx: 460, cy: 222, rx: 52, ry: 8 },
        { cx: 700, cy: 188, rx: 42, ry: 7 },
        { cx: 870, cy: 142, rx: 38, ry: 6 },
      ].map((p, i) => (
        <ellipse
          key={`shadow-${i}`}
          cx={p.cx}
          cy={p.cy}
          rx={p.rx}
          ry={p.ry}
          fill="#1a1610"
          opacity="0.35"
        />
      ))}

      {/* Light highlight patches — drier raised spots catching ambient light */}
      {[
        { cx: 160, cy: 158, rx: 30, ry: 5 },
        { cx: 380, cy: 198, rx: 40, ry: 6 },
        { cx: 580, cy: 210, rx: 36, ry: 6 },
        { cx: 800, cy: 168, rx: 34, ry: 5 },
      ].map((p, i) => (
        <ellipse
          key={`hl-${i}`}
          cx={p.cx}
          cy={p.cy}
          rx={p.rx}
          ry={p.ry}
          fill="#a89a85"
          opacity="0.22"
        />
      ))}

      {/* Sand grain texture — mix of dark pebbles and light grains at varied
          sizes/opacities so it reads as real grain, not polka dots. */}
      {[
        // Darker pebbles
        { cx: 28, cy: 138, r: 1.3, fill: "#2a2218", o: 0.75 },
        { cx: 72, cy: 124, r: 1.0, fill: "#2a2218", o: 0.7 },
        { cx: 145, cy: 152, r: 1.5, fill: "#1f1a12", o: 0.8 },
        { cx: 198, cy: 142, r: 0.9, fill: "#2a2218", o: 0.65 },
        { cx: 252, cy: 168, r: 1.4, fill: "#1f1a12", o: 0.75 },
        { cx: 318, cy: 182, r: 1.1, fill: "#2a2218", o: 0.7 },
        { cx: 372, cy: 174, r: 1.6, fill: "#1f1a12", o: 0.8 },
        { cx: 428, cy: 208, r: 1.2, fill: "#2a2218", o: 0.7 },
        { cx: 495, cy: 230, r: 1.5, fill: "#1f1a12", o: 0.75 },
        { cx: 548, cy: 225, r: 0.9, fill: "#2a2218", o: 0.6 },
        { cx: 612, cy: 212, r: 1.4, fill: "#1f1a12", o: 0.75 },
        { cx: 665, cy: 188, r: 1.0, fill: "#2a2218", o: 0.7 },
        { cx: 728, cy: 168, r: 1.3, fill: "#1f1a12", o: 0.75 },
        { cx: 782, cy: 156, r: 1.5, fill: "#2a2218", o: 0.8 },
        { cx: 848, cy: 142, r: 1.1, fill: "#1f1a12", o: 0.7 },
        { cx: 912, cy: 130, r: 1.2, fill: "#2a2218", o: 0.7 },
        { cx: 968, cy: 150, r: 1.4, fill: "#1f1a12", o: 0.75 },
        // Lighter grains catching the light
        { cx: 50, cy: 128, r: 0.7, fill: "#b8aa92", o: 0.6 },
        { cx: 105, cy: 145, r: 0.6, fill: "#b8aa92", o: 0.5 },
        { cx: 178, cy: 138, r: 0.8, fill: "#c2b498", o: 0.65 },
        { cx: 228, cy: 162, r: 0.6, fill: "#b8aa92", o: 0.55 },
        { cx: 290, cy: 178, r: 0.7, fill: "#c2b498", o: 0.6 },
        { cx: 345, cy: 195, r: 0.8, fill: "#b8aa92", o: 0.55 },
        { cx: 405, cy: 200, r: 0.6, fill: "#c2b498", o: 0.5 },
        { cx: 462, cy: 218, r: 0.8, fill: "#b8aa92", o: 0.6 },
        { cx: 520, cy: 232, r: 0.7, fill: "#c2b498", o: 0.55 },
        { cx: 580, cy: 218, r: 0.6, fill: "#b8aa92", o: 0.5 },
        { cx: 640, cy: 198, r: 0.8, fill: "#c2b498", o: 0.6 },
        { cx: 695, cy: 175, r: 0.6, fill: "#b8aa92", o: 0.5 },
        { cx: 758, cy: 162, r: 0.7, fill: "#c2b498", o: 0.6 },
        { cx: 818, cy: 148, r: 0.8, fill: "#b8aa92", o: 0.55 },
        { cx: 882, cy: 138, r: 0.6, fill: "#c2b498", o: 0.5 },
        { cx: 938, cy: 132, r: 0.7, fill: "#b8aa92", o: 0.55 },
      ].map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill={p.fill} opacity={p.o} />
      ))}
    </svg>
  );
}

/* ────────────── PARTICLES & STARS ────────────── */

type Particle = {
  id: string;
  x: number;
  yTop: number;
  size: number;
  duration: number;
  delay: number;
  peakOpacity: number;
  driftY: number;
  driftX: number;
};

function generateParticles(count: number, yRange: [number, number]): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const s = i * 11 + 3;
    return {
      id: `p-${i}`,
      x: seeded(s) * 100,
      yTop: yRange[0] + seeded(s + 1) * (yRange[1] - yRange[0]),
      size: 1.2 + seeded(s + 2) * 2.4,
      duration: 3.5 + seeded(s + 3) * 5,
      delay: seeded(s + 4) * 5,
      peakOpacity: 0.45 + seeded(s + 5) * 0.5,
      driftY: -5 - seeded(s + 6) * 10,
      driftX: (seeded(s + 7) - 0.5) * 8,
    };
  });
}

type Star = {
  id: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
};

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => {
    const s = i * 13 + 97;
    return {
      id: `s-${i}`,
      x: seeded(s) * 100,
      y: seeded(s + 1) * 45,
      size: 0.8 + seeded(s + 2) * 1.4,
      duration: 2.5 + seeded(s + 3) * 4,
      delay: seeded(s + 4) * 3,
    };
  });
}

/* ────────────── SCENE ────────────── */

type SceneProps = {
  landingFlash?: boolean;
  landingTopVh?: number;
  landingLeftVw?: number;
  rocketBottomOffsetPx?: number;
};

export default function IslandScene({
  landingFlash = false,
  landingTopVh = 42,
  landingLeftVw = 80,
  rocketBottomOffsetPx = 164,
}: SceneProps) {
  const planktonParticles = useMemo(() => generateParticles(36, [58, 80]), []);
  const stars = useMemo(() => generateStars(40), []);
  // Visible deck top is now at SVG y=12 (was y=8) so shift the wrapper up by 4
  // to keep the rocket landing on the actual deck surface.
  const platformTopPx = rocketBottomOffsetPx - 12;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #03050b 0%, #050a18 30%, #061528 50%, #062236 58%, #04141f 62%, #02080e 78%, #010406 100%)",
        }}
      />

      <div
        className="absolute left-0 right-0"
        style={{
          top: "54%",
          height: "60px",
          background:
            "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(70,150,180,0.16) 0%, transparent 70%)",
          filter: "blur(10px)",
        }}
      />

      <svg
        className="absolute left-0 right-0"
        style={{ top: "53%", width: "100%", height: "40px" }}
        viewBox="0 0 1000 40"
        preserveAspectRatio="none"
      >
        <path
          d="M 0,40 L 0,28 Q 80,20 140,26 Q 200,30 280,22 Q 340,16 420,24 L 420,40 Z"
          fill="#040810"
          opacity="0.85"
        />
        <path
          d="M 580,40 L 580,30 Q 660,22 720,28 Q 800,32 880,24 Q 940,20 1000,26 L 1000,40 Z"
          fill="#040810"
          opacity="0.85"
        />
      </svg>

      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: "#e4f1ff",
            boxShadow: "0 0 3px rgba(228,241,255,0.7)",
          }}
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div
        className="absolute left-0 right-0"
        style={{
          top: "55%",
          bottom: 0,
          background:
            "linear-gradient(to bottom, rgba(8,28,42,0.0) 0%, rgba(8,30,46,0.45) 20%, rgba(6,24,40,0.4) 55%, rgba(8,24,38,0) 100%)",
        }}
      />

      <motion.div
        className="absolute left-0 right-0"
        style={{
          top: "58%",
          height: "240px",
          background:
            "radial-gradient(ellipse 75% 60% at 50% 50%, rgba(110,231,247,0.30) 0%, rgba(110,231,247,0.12) 40%, transparent 75%)",
          filter: "blur(10px)",
          mixBlendMode: "screen",
        }}
        animate={{ opacity: [0.55, 0.95, 0.55] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute left-0 right-0"
        style={{
          top: "62%",
          height: "180px",
          background:
            "radial-gradient(ellipse 50% 100% at 30% 50%, rgba(120,255,240,0.22) 0%, transparent 70%), radial-gradient(ellipse 55% 100% at 78% 50%, rgba(80,210,255,0.20) 0%, transparent 70%)",
          filter: "blur(14px)",
          mixBlendMode: "screen",
        }}
        animate={{ opacity: [0.4, 0.85, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <motion.div
        className="absolute left-0 right-0"
        style={{
          top: "57.5%",
          height: "2px",
          background:
            "linear-gradient(to right, transparent 0%, rgba(170,250,255,0.0) 8%, rgba(170,250,255,0.55) 30%, rgba(190,255,255,0.75) 50%, rgba(170,250,255,0.55) 70%, transparent 92%)",
          filter: "blur(1.2px)",
        }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Surface waves — each one has its own character: peak height, rise
          speed and fall speed all differ. The motion is a single smooth
          sine-like arc (no peak hold, no abrupt jumps): the crest grows out
          of the water, smoothly turns over at its peak, and sinks back in.
          easeInOutSine on each segment keeps the velocity continuous. Five
          waves on a 40s cycle, staggered 8s apart. */}
      {[
        // Normal medium swell — smooth and even, left to right
        { left: "12%", top: "60.5%", width: 170, drift:  55, delay: 1,
          peakY: 1.0,  riseT: 0.045, fallT: 0.050 },
        // Tall fast wave — quick rise, quick fall, right to left
        { left: "66%", top: "62%",   width: 185, drift: -78, delay: 9,
          peakY: 1.65, riseT: 0.028, fallT: 0.038 },
        // Small gentle ripple — slow and lazy
        { left: "32%", top: "58.5%", width: 145, drift:  48, delay: 17,
          peakY: 0.55, riseT: 0.070, fallT: 0.070 },
        // Tall wave with a long slow fall back — right to left
        { left: "74%", top: "65.5%", width: 195, drift: -68, delay: 25,
          peakY: 1.30, riseT: 0.035, fallT: 0.080 },
        // Quick low dart — fast rise, fast fall
        { left: "22%", top: "61%",   width: 155, drift:  62, delay: 33,
          peakY: 0.90, riseT: 0.025, fallT: 0.030 },
      ].map((w, i) => {
        const restEnd = 0.025;
        const peakAt = restEnd + w.riseT;
        const visibleEnd = peakAt + w.fallT;
        // Drift continues all through the visible window; the wave is at
        // (rise / (rise + fall)) of its total drift when it hits the peak.
        const driftAtPeak = w.drift * (w.riseT / (w.riseT + w.fallT));
        return (
          <motion.svg
            key={`wave-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: w.left,
              top: w.top,
              width: w.width,
              height: 20,
              transformOrigin: "50% 100%",
              overflow: "visible",
              filter: "drop-shadow(0 0 6px rgba(170,235,250,0.55))",
            }}
            viewBox={`0 0 ${w.width} 20`}
            initial={{ scaleY: 0, x: 0 }}
            animate={{
              x:      [0, 0, driftAtPeak, w.drift, w.drift],
              scaleY: [0, 0, w.peakY,     0,       0      ],
            }}
            transition={{
              duration: 40,
              delay: w.delay,
              times: [0, restEnd, peakAt, visibleEnd, 1.0],
              repeat: Infinity,
              // Sinusoidal ease — velocity is 0 at the peak from both sides,
              // giving a smooth U-turn instead of a sharp triangle.
              ease: [0.37, 0, 0.63, 1],
            }}
          >
          {/* Main crest — bright cyan-white, clearly readable as a wave */}
          <path
            d={`M 6,11
                Q ${w.width * 0.18},3 ${w.width * 0.32},11
                Q ${w.width * 0.46},18 ${w.width * 0.6},11
                Q ${w.width * 0.74},3 ${w.width * 0.88},11
                L ${w.width - 6},11`}
            stroke="rgba(225,250,255,0.98)"
            strokeWidth="1.7"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Foam trail just below the crest */}
          <path
            d={`M 14,14
                Q ${w.width * 0.3},12 ${w.width * 0.5},14
                Q ${w.width * 0.7},16 ${w.width - 14},14`}
            stroke="rgba(180,235,250,0.65)"
            strokeWidth="1.0"
            fill="none"
            strokeLinecap="round"
          />
          {/* Soft secondary ripple further below for depth */}
          <path
            d={`M 22,17.5
                Q ${w.width * 0.4},16 ${w.width * 0.6},17.5
                Q ${w.width * 0.78},18.5 ${w.width - 22},17.5`}
            stroke="rgba(160,220,245,0.4)"
            strokeWidth="0.7"
            fill="none"
            strokeLinecap="round"
          />
        </motion.svg>
        );
      })}

      {landingFlash && (
        <>
          <motion.div
            className="absolute"
            style={{
              left: `${landingLeftVw}vw`,
              transform: "translateX(-50%)",
              top: "55%",
              width: "60vw",
              maxWidth: "700px",
              height: "320px",
              background:
                "radial-gradient(ellipse 60% 80% at 50% 30%, rgba(180,255,255,0.85) 0%, rgba(110,231,247,0.45) 35%, transparent 75%)",
              filter: "blur(12px)",
              mixBlendMode: "screen",
            }}
            initial={{ opacity: 0, scaleX: 0.2 }}
            animate={{ opacity: [0, 1, 0.3], scaleX: [0.2, 1.1, 1] }}
            transition={{ duration: 1.8, ease: [0.2, 0.6, 0.2, 1] }}
          />
          {/* Splash droplets sprayed outward from impact */}
          {Array.from({ length: 18 }).map((_, i) => {
            const t = i / 18;
            const angle = (t - 0.5) * Math.PI * 1.55;
            const dist = 70 + (i % 4) * 26;
            const size = 3 + (i % 3) * 2;
            return (
              <motion.div
                key={`splash-${i}`}
                className="absolute rounded-full"
                style={{
                  left: `${landingLeftVw}vw`,
                  top: "58.8%",
                  width: size,
                  height: size,
                  background: "#cdf5ff",
                  boxShadow: "0 0 6px rgba(110,231,247,0.85)",
                  marginLeft: -size / 2,
                }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                animate={{
                  x: Math.sin(angle) * dist,
                  y: [-Math.abs(Math.cos(angle)) * 40, 30 + (i % 4) * 8],
                  opacity: [0, 0.95, 0],
                  scale: [0.4, 1.1, 0.5],
                }}
                transition={{
                  duration: 1.5 + (i % 3) * 0.2,
                  delay: 0.05 + (i % 5) * 0.03,
                  ease: "easeOut",
                }}
              />
            );
          })}

        </>
      )}

      {planktonParticles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.yTop}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "#aef3ff",
            boxShadow: "0 0 6px #6ee7f7, 0 0 12px rgba(110,231,247,0.55)",
          }}
          animate={{
            opacity: [0, p.peakOpacity, 0],
            y: [0, p.driftY, 0],
            x: [0, p.driftX, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <LandingPlatform topVh={landingTopVh} topPx={platformTopPx} leftVw={landingLeftVw} />

      {/* Foreground islands — clear land/water separation */}
      <Shoreline />
    </div>
  );
}
