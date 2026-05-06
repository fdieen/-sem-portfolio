"use client";

import { useEffect, useRef } from "react";

export default function Satellite() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    containerRef.current = el.closest("section") as HTMLElement;

    let angle = Math.PI * 1.1;
    let speed = 0.005;
    let raf: number;

    const tick = () => {
      angle += speed;

      const container = containerRef.current;
      const w = container ? container.offsetWidth  : window.innerWidth;
      const h = container ? container.offsetHeight : window.innerHeight;

      const cx = w - 130;
      const cy = h - 95;
      const rx = 300;
      const ry = 168;

      const x = cx + Math.cos(angle) * rx - 56;
      const y = cy + Math.sin(angle) * ry - 56;

      const offscreen = x < -112 || x > w || y < -112 || y > h;
      const target = offscreen ? 0.022 : 0.005;
      speed += (target - speed) * 0.08;

      const deg = (Math.atan2(
        -Math.sin(angle) * ry,
        -Math.cos(angle) * rx
      ) * 180) / Math.PI + 90;

      el.style.transform = `translate(${x}px, ${y}px) rotate(${deg}deg)`;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none select-none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 2,
        opacity: 0.92,
        width: 112,
        height: 112,
        willChange: "transform",
      }}
    >
      <svg width="112" height="112" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Soft glow filter */}
          <filter id="sat-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="sat-glow-strong" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* Body gradient — gold MLI foil */}
          <linearGradient id="bodyGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d4a843" />
            <stop offset="35%" stopColor="#c8932a" />
            <stop offset="65%" stopColor="#7a5010" />
            <stop offset="100%" stopColor="#3a2208" />
          </linearGradient>
          <linearGradient id="bodyHighlight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>

          {/* Solar panel — dark blue photovoltaic cells */}
          <linearGradient id="panelBase" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1b3a6b" />
            <stop offset="50%" stopColor="#0e2244" />
            <stop offset="100%" stopColor="#060f22" />
          </linearGradient>
          <linearGradient id="panelSheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4a90d9" stopOpacity="0.22" />
            <stop offset="40%" stopColor="#6eb8f7" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1a5a9a" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="panelFrame" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8ab4cc" />
            <stop offset="100%" stopColor="#3a6280" />
          </linearGradient>

          {/* Strut gradient */}
          <linearGradient id="strutGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c0c8d8" />
            <stop offset="50%" stopColor="#7a8898" />
            <stop offset="100%" stopColor="#3a4858" />
          </linearGradient>

          {/* Antenna dish */}
          <radialGradient id="dishGrad" cx="45%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#d0d8e8" />
            <stop offset="60%" stopColor="#8898b0" />
            <stop offset="100%" stopColor="#3a4858" />
          </radialGradient>

          {/* Solar panel cell grid pattern */}
          <pattern id="cellGrid" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
            <rect width="5" height="5" fill="none" />
            <line x1="0" y1="0" x2="5" y2="0" stroke="#4a80b8" strokeWidth="0.4" opacity="0.5" />
            <line x1="0" y1="0" x2="0" y2="5" stroke="#4a80b8" strokeWidth="0.4" opacity="0.5" />
          </pattern>
        </defs>

        {/* ── LEFT SOLAR PANEL ── */}
        {/* Frame */}
        <rect x="2" y="38" width="34" height="26" rx="2.5" fill="url(#panelFrame)" />
        {/* Panel surface */}
        <rect x="3.5" y="39.5" width="31" height="23" rx="1.5" fill="url(#panelBase)" />
        {/* Cell grid */}
        <rect x="3.5" y="39.5" width="31" height="23" rx="1.5" fill="url(#cellGrid)" />
        {/* Sheen */}
        <rect x="3.5" y="39.5" width="31" height="23" rx="1.5" fill="url(#panelSheen)" />
        {/* Main dividers */}
        <line x1="19" y1="39.5" x2="19" y2="62.5" stroke="#4a80b8" strokeWidth="0.9" opacity="0.7" />
        <line x1="10" y1="39.5" x2="10" y2="62.5" stroke="#4a80b8" strokeWidth="0.5" opacity="0.4" />
        <line x1="28" y1="39.5" x2="28" y2="62.5" stroke="#4a80b8" strokeWidth="0.5" opacity="0.4" />
        <line x1="3.5" y1="51" x2="34.5" y2="51" stroke="#4a80b8" strokeWidth="0.9" opacity="0.7" />
        {/* Light reflection sparkle */}
        <ellipse cx="9" cy="43" rx="3.5" ry="1.5" fill="#a8d4f8" opacity="0.18" transform="rotate(-15 9 43)" />

        {/* ── LEFT STRUT ── */}
        <rect x="36" y="49" width="8" height="4" rx="1.5" fill="url(#strutGrad)" />

        {/* ── MAIN BODY ── */}
        {/* Body shadow/depth */}
        <rect x="43" y="30" width="26" height="42" rx="4" fill="#1a0d02" opacity="0.6" transform="translate(2,2)" />
        {/* Body gold MLI */}
        <rect x="43" y="30" width="26" height="42" rx="4" fill="url(#bodyGold)" />
        {/* Body highlight */}
        <rect x="43" y="30" width="26" height="18" rx="4" fill="url(#bodyHighlight)" />
        {/* Body edge border */}
        <rect x="43" y="30" width="26" height="42" rx="4" fill="none" stroke="#d4a843" strokeWidth="0.8" opacity="0.5" />
        {/* MLI foil lines horizontal */}
        <line x1="43" y1="37" x2="69" y2="37" stroke="#7a5010" strokeWidth="0.6" opacity="0.6" />
        <line x1="43" y1="44" x2="69" y2="44" stroke="#7a5010" strokeWidth="0.6" opacity="0.6" />
        <line x1="43" y1="51" x2="69" y2="51" stroke="#7a5010" strokeWidth="0.6" opacity="0.6" />
        <line x1="43" y1="58" x2="69" y2="58" stroke="#7a5010" strokeWidth="0.6" opacity="0.6" />
        <line x1="43" y1="65" x2="69" y2="65" stroke="#7a5010" strokeWidth="0.6" opacity="0.6" />
        {/* Dark instrument panel inset */}
        <rect x="47" y="34" width="18" height="14" rx="2" fill="#0a0402" opacity="0.75" />
        <rect x="48.5" y="35.5" width="15" height="11" rx="1.2" fill="none" stroke="#d4a843" strokeWidth="0.5" opacity="0.5" />
        {/* Thruster nozzle bottom */}
        <ellipse cx="56" cy="71" rx="6" ry="3" fill="#2a1808" />
        <ellipse cx="56" cy="71" rx="4" ry="2" fill="#3a2208" />
        <ellipse cx="56" cy="71" rx="2" ry="1" fill="#1a0d02" />

        {/* ── RIGHT STRUT ── */}
        <rect x="68" y="49" width="8" height="4" rx="1.5" fill="url(#strutGrad)" />

        {/* ── RIGHT SOLAR PANEL ── */}
        <rect x="76" y="38" width="34" height="26" rx="2.5" fill="url(#panelFrame)" />
        <rect x="77.5" y="39.5" width="31" height="23" rx="1.5" fill="url(#panelBase)" />
        <rect x="77.5" y="39.5" width="31" height="23" rx="1.5" fill="url(#cellGrid)" />
        <rect x="77.5" y="39.5" width="31" height="23" rx="1.5" fill="url(#panelSheen)" />
        <line x1="93" y1="39.5" x2="93" y2="62.5" stroke="#4a80b8" strokeWidth="0.9" opacity="0.7" />
        <line x1="84" y1="39.5" x2="84" y2="62.5" stroke="#4a80b8" strokeWidth="0.5" opacity="0.4" />
        <line x1="102" y1="39.5" x2="102" y2="62.5" stroke="#4a80b8" strokeWidth="0.5" opacity="0.4" />
        <line x1="77.5" y1="51" x2="108.5" y2="51" stroke="#4a80b8" strokeWidth="0.9" opacity="0.7" />
        <ellipse cx="103" cy="43" rx="3.5" ry="1.5" fill="#a8d4f8" opacity="0.15" transform="rotate(-15 103 43)" />

        {/* ── ANTENNA ── */}
        {/* Antenna mast */}
        <line x1="56" y1="30" x2="56" y2="16" stroke="#b0b8c8" strokeWidth="1.2" />
        {/* Dish (parabolic) */}
        <ellipse cx="56" cy="14" rx="7" ry="3.5" fill="url(#dishGrad)" />
        <ellipse cx="56" cy="14" rx="7" ry="3.5" fill="none" stroke="#8898b0" strokeWidth="0.7" />
        {/* Dish center dot */}
        <circle cx="56" cy="14" r="1.2" fill="#d0d8e8" />
        {/* Feed arm */}
        <line x1="56" y1="14" x2="56" y2="10" stroke="#8898b0" strokeWidth="0.6" />
        <circle cx="56" cy="10" r="1.5" fill="#a0aabb" />

        {/* ── SUNLIT HIGHLIGHT on body ── */}
        <rect x="43" y="30" width="8" height="42" rx="3" fill="#fff" opacity="0.04" />
      </svg>
    </div>
  );
}
