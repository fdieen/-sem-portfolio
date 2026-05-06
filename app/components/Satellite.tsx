"use client";

import { useEffect, useRef } from "react";

export default function Satellite() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Hero section is de parent
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

      const x = cx + Math.cos(angle) * rx - 48;
      const y = cy + Math.sin(angle) * ry - 48;

      // Buiten beeld → versnellen zodat het max ~2 sec uit beeld is
      const offscreen = x < -96 || x > w || y < -96 || y > h;
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
        opacity: 0.85,
        width: 96,
        height: 96,
        willChange: "transform",
      }}
    >
      <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="panelL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a6fa8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0a3d6b" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="panelR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a6fa8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0a3d6b" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e4080" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#050f1f" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Solar panel links */}
        <rect x="2" y="36" width="28" height="20" rx="2" fill="#0e3a5c" stroke="#6ee7f7" strokeWidth="1.2" filter="url(#glow)" />
        <rect x="2" y="36" width="28" height="20" rx="2" fill="url(#panelL)" />
        <line x1="16" y1="36" x2="16" y2="56" stroke="#6ee7f7" strokeWidth="0.7" opacity="0.6" />
        <line x1="9"  y1="36" x2="9"  y2="56" stroke="#6ee7f7" strokeWidth="0.5" opacity="0.35" />
        <line x1="23" y1="36" x2="23" y2="56" stroke="#6ee7f7" strokeWidth="0.5" opacity="0.35" />
        <line x1="2"  y1="43" x2="30" y2="43" stroke="#6ee7f7" strokeWidth="0.5" opacity="0.35" />
        <line x1="2"  y1="50" x2="30" y2="50" stroke="#6ee7f7" strokeWidth="0.5" opacity="0.35" />

        {/* Strut links */}
        <line x1="30" y1="46" x2="38" y2="46" stroke="#a0d8ef" strokeWidth="1.2" />

        {/* Body */}
        <rect x="38" y="33" width="20" height="26" rx="3" fill="#0a2540" stroke="#6ee7f7" strokeWidth="1.4" filter="url(#glow)" />
        <rect x="38" y="33" width="20" height="26" rx="3" fill="url(#bodyGrad)" />
        <rect x="41" y="37" width="14" height="18" rx="1.5" fill="none" stroke="#6ee7f7" strokeWidth="0.6" opacity="0.7" />
        <line x1="48" y1="37" x2="48" y2="55" stroke="#6ee7f7" strokeWidth="0.5" opacity="0.4" />
        <line x1="41" y1="46" x2="55" y2="46" stroke="#6ee7f7" strokeWidth="0.5" opacity="0.4" />

        {/* Strut rechts */}
        <line x1="58" y1="46" x2="66" y2="46" stroke="#a0d8ef" strokeWidth="1.2" />

        {/* Solar panel rechts */}
        <rect x="66" y="36" width="28" height="20" rx="2" fill="#0e3a5c" stroke="#6ee7f7" strokeWidth="1.2" filter="url(#glow)" />
        <rect x="66" y="36" width="28" height="20" rx="2" fill="url(#panelR)" />
        <line x1="80" y1="36" x2="80" y2="56" stroke="#6ee7f7" strokeWidth="0.7" opacity="0.6" />
        <line x1="73" y1="36" x2="73" y2="56" stroke="#6ee7f7" strokeWidth="0.5" opacity="0.35" />
        <line x1="87" y1="36" x2="87" y2="56" stroke="#6ee7f7" strokeWidth="0.5" opacity="0.35" />
        <line x1="66" y1="43" x2="94" y2="43" stroke="#6ee7f7" strokeWidth="0.5" opacity="0.35" />
        <line x1="66" y1="50" x2="94" y2="50" stroke="#6ee7f7" strokeWidth="0.5" opacity="0.35" />

        {/* Antenne */}
        <line x1="48" y1="33" x2="48" y2="20" stroke="#6ee7f7" strokeWidth="0.9" filter="url(#glow)" />
        <circle cx="48" cy="19" r="2.5" fill="none" stroke="#6ee7f7" strokeWidth="0.9" filter="url(#glow)" />
        <circle cx="48" cy="19" r="1.2" fill="#6ee7f7" />
      </svg>
    </div>
  );
}
