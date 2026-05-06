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

      const x = cx + Math.cos(angle) * rx - 60;
      const y = cy + Math.sin(angle) * ry - 60;

      const offscreen = x < -120 || x > w || y < -120 || y > h;
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
        opacity: 0.93,
        width: 120,
        height: 120,
        willChange: "transform",
        filter: "blur(0.5px)",
      }}
    >
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="sg" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          {/* Body — gold MLI with lit side / shadow side */}
          <linearGradient id="bLit" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#e8b84b"/>
            <stop offset="30%"  stopColor="#c9922a"/>
            <stop offset="70%"  stopColor="#7d4e0e"/>
            <stop offset="100%" stopColor="#3b1f05"/>
          </linearGradient>
          <linearGradient id="bEdge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.12"/>
            <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
          </linearGradient>

          {/* Solar panel base */}
          <linearGradient id="pBase" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#1c3d70"/>
            <stop offset="50%"  stopColor="#0c2040"/>
            <stop offset="100%" stopColor="#060e1e"/>
          </linearGradient>
          {/* Panel sheen — sunlight glint */}
          <linearGradient id="pSheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#5aaaf0" stopOpacity="0.18"/>
            <stop offset="35%"  stopColor="#82c8ff" stopOpacity="0.08"/>
            <stop offset="100%" stopColor="#1a6aaa" stopOpacity="0"/>
          </linearGradient>
          {/* Panel frame (aluminium) */}
          <linearGradient id="pFrame" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#9ab8cc"/>
            <stop offset="100%" stopColor="#324e62"/>
          </linearGradient>

          {/* Strut */}
          <linearGradient id="strut" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#c8d0de"/>
            <stop offset="50%"  stopColor="#6e7d90"/>
            <stop offset="100%" stopColor="#303c4a"/>
          </linearGradient>

          {/* Dish */}
          <radialGradient id="dish" cx="40%" cy="35%" r="65%">
            <stop offset="0%"   stopColor="#d8e0f0"/>
            <stop offset="55%"  stopColor="#8898b8"/>
            <stop offset="100%" stopColor="#2e3a4a"/>
          </radialGradient>

          {/* Cell pattern */}
          <pattern id="cells" x="0" y="0" width="5.5" height="5" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="5.5" y2="0" stroke="#3a70b8" strokeWidth="0.45" opacity="0.55"/>
            <line x1="0" y1="0" x2="0"   y2="5" stroke="#3a70b8" strokeWidth="0.45" opacity="0.55"/>
          </pattern>
        </defs>

        {/* ── LEFT PANEL ── */}
        {/* Outer frame */}
        <rect x="2" y="42" width="36" height="28" rx="2.5" fill="url(#pFrame)"/>
        {/* Panel fill */}
        <rect x="3.5" y="43.5" width="33" height="25" rx="1.5" fill="url(#pBase)"/>
        <rect x="3.5" y="43.5" width="33" height="25" rx="1.5" fill="url(#cells)"/>
        <rect x="3.5" y="43.5" width="33" height="25" rx="1.5" fill="url(#pSheen)"/>
        {/* Sub-panel dividers */}
        <line x1="20" y1="43.5" x2="20" y2="68.5" stroke="#4a80c0" strokeWidth="1.1" opacity="0.6"/>
        <line x1="11.5" y1="43.5" x2="11.5" y2="68.5" stroke="#3a6090" strokeWidth="0.5" opacity="0.4"/>
        <line x1="28.5" y1="43.5" x2="28.5" y2="68.5" stroke="#3a6090" strokeWidth="0.5" opacity="0.4"/>
        <line x1="3.5" y1="56" x2="36.5" y2="56" stroke="#4a80c0" strokeWidth="1.1" opacity="0.6"/>
        <line x1="3.5" y1="49.7" x2="36.5" y2="49.7" stroke="#3a6090" strokeWidth="0.4" opacity="0.3"/>
        <line x1="3.5" y1="62.3" x2="36.5" y2="62.3" stroke="#3a6090" strokeWidth="0.4" opacity="0.3"/>
        {/* Sunlight glint */}
        <ellipse cx="10" cy="47" rx="5" ry="2" fill="#b8deff" opacity="0.14" transform="rotate(-18 10 47)"/>

        {/* ── LEFT STRUT ── */}
        <rect x="38" y="53" width="9" height="6" rx="2" fill="url(#strut)"/>
        <line x1="39" y1="56" x2="46" y2="56" stroke="#fff" strokeWidth="0.4" opacity="0.3"/>

        {/* ── BODY ── */}
        {/* Drop shadow */}
        <rect x="47" y="33" width="26" height="46" rx="4.5" fill="#000" opacity="0.45" transform="translate(2.5 2.5)"/>
        {/* Gold MLI body */}
        <rect x="47" y="33" width="26" height="46" rx="4.5" fill="url(#bLit)"/>
        {/* Top edge highlight */}
        <rect x="47" y="33" width="26" height="20" rx="4.5" fill="url(#bEdge)"/>
        {/* Body border */}
        <rect x="47" y="33" width="26" height="46" rx="4.5" fill="none" stroke="#c8902a" strokeWidth="0.7" opacity="0.6"/>
        {/* MLI foil seams */}
        {[40,47,54,61,68].map(y => (
          <line key={y} x1="47" y1={y} x2="73" y2={y} stroke="#5a3008" strokeWidth="0.55" opacity="0.65"/>
        ))}
        {/* Instrument panel window */}
        <rect x="51" y="37" width="18" height="14" rx="2.5" fill="#080402" opacity="0.82"/>
        <rect x="52.5" y="38.5" width="15" height="11" rx="1.5" fill="none" stroke="#c89030" strokeWidth="0.55" opacity="0.6"/>
        {/* LED indicators */}
        <circle cx="55" cy="44" r="1" fill="#30ff80" opacity="0.85" filter="url(#sg)"/>
        <circle cx="60" cy="44" r="1" fill="#ffaa20" opacity="0.7" filter="url(#sg)"/>
        <circle cx="65" cy="44" r="1" fill="#ff3030" opacity="0.6" filter="url(#sg)"/>
        {/* Thruster cone */}
        <ellipse cx="60" cy="78" rx="7" ry="3.5" fill="#1e0e02"/>
        <ellipse cx="60" cy="78" rx="5" ry="2.5" fill="#2e1804"/>
        <ellipse cx="60" cy="78" rx="3" ry="1.5" fill="#100800"/>
        <ellipse cx="60" cy="78" rx="1.2" ry="0.7" fill="#40200a" opacity="0.8"/>
        {/* Side thruster ports */}
        <rect x="46" y="55" width="2.5" height="6" rx="1" fill="#2a1508"/>
        <rect x="71.5" y="55" width="2.5" height="6" rx="1" fill="#2a1508"/>

        {/* ── RIGHT STRUT ── */}
        <rect x="73" y="53" width="9" height="6" rx="2" fill="url(#strut)"/>
        <line x1="74" y1="56" x2="81" y2="56" stroke="#fff" strokeWidth="0.4" opacity="0.3"/>

        {/* ── RIGHT PANEL ── */}
        <rect x="82" y="42" width="36" height="28" rx="2.5" fill="url(#pFrame)"/>
        <rect x="83.5" y="43.5" width="33" height="25" rx="1.5" fill="url(#pBase)"/>
        <rect x="83.5" y="43.5" width="33" height="25" rx="1.5" fill="url(#cells)"/>
        <rect x="83.5" y="43.5" width="33" height="25" rx="1.5" fill="url(#pSheen)"/>
        <line x1="100" y1="43.5" x2="100" y2="68.5" stroke="#4a80c0" strokeWidth="1.1" opacity="0.6"/>
        <line x1="91.5" y1="43.5" x2="91.5" y2="68.5" stroke="#3a6090" strokeWidth="0.5" opacity="0.4"/>
        <line x1="108.5" y1="43.5" x2="108.5" y2="68.5" stroke="#3a6090" strokeWidth="0.5" opacity="0.4"/>
        <line x1="83.5" y1="56" x2="116.5" y2="56" stroke="#4a80c0" strokeWidth="1.1" opacity="0.6"/>
        <line x1="83.5" y1="49.7" x2="116.5" y2="49.7" stroke="#3a6090" strokeWidth="0.4" opacity="0.3"/>
        <line x1="83.5" y1="62.3" x2="116.5" y2="62.3" stroke="#3a6090" strokeWidth="0.4" opacity="0.3"/>
        <ellipse cx="110" cy="47" rx="5" ry="2" fill="#b8deff" opacity="0.11" transform="rotate(-18 110 47)"/>

        {/* ── ANTENNA ASSEMBLY ── */}
        {/* Main mast */}
        <line x1="60" y1="33" x2="60" y2="17" stroke="#a0aaba" strokeWidth="1.3"/>
        {/* Dish bowl */}
        <path d="M51 17 Q60 10 69 17" stroke="#9aaac0" strokeWidth="1.2" fill="none"/>
        <path d="M51 17 Q60 22 69 17" fill="url(#dish)" opacity="0.9"/>
        <path d="M51 17 Q60 22 69 17" fill="none" stroke="#7888a0" strokeWidth="0.7"/>
        {/* Dish rim */}
        <line x1="51" y1="17" x2="69" y2="17" stroke="#9aaac0" strokeWidth="0.8" opacity="0.7"/>
        {/* Feed arm + feedhorn */}
        <line x1="60" y1="17" x2="60" y2="11" stroke="#8898b0" strokeWidth="0.7"/>
        <circle cx="60" cy="10.5" r="2" fill="#b0bcc8"/>
        <circle cx="60" cy="10.5" r="1" fill="#d0dae8"/>
        {/* Secondary strut arm on body */}
        <line x1="54" y1="33" x2="51" y2="17" stroke="#7888a0" strokeWidth="0.6" opacity="0.5"/>
        <line x1="66" y1="33" x2="69" y2="17" stroke="#7888a0" strokeWidth="0.6" opacity="0.5"/>
      </svg>
    </div>
  );
}
