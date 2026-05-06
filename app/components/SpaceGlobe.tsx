"use client";

import { useEffect, useRef } from "react";

export default function SpaceGlobe() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    let angle = 0;
    let raf: number;
    const tick = () => {
      angle += 0.025;
      svg.querySelectorAll<SVGEllipseElement>(".lon").forEach((el, i) => {
        const base = (i / 12) * 180;
        el.setAttribute("rx", String(Math.max(0, R * Math.abs(Math.cos(Math.PI * (base + angle) / 180)))));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const S = 520;
  const R = 258;
  const C = S / 2;

  const lats = [-75,-60,-45,-30,-15,0,15,30,45,60,75].map(deg => {
    const rad = deg * Math.PI / 180;
    return { y: C - R * Math.sin(rad), rx: R * Math.cos(rad), ry: R * Math.cos(rad) * 0.28, deg };
  });

  const lons = Array.from({ length: 12 }, (_, i) => i * 15);

  return (
    <div
      className="pointer-events-none select-none"
      style={{ position:"absolute", bottom:"-165px", right:"-130px", width:S, height:S, zIndex:0 }}
    >
      {/* Verre halo */}
      <div style={{ position:"absolute", inset:-80, borderRadius:"50%", background:"radial-gradient(circle at 50% 50%, transparent 52%, rgba(0,180,255,0.04) 62%, rgba(0,200,255,0.07) 70%, transparent 80%)", pointerEvents:"none" }} />
      {/* Buitenste glow ring */}
      <div style={{ position:"absolute", inset:-12, borderRadius:"50%", boxShadow:"0 0 0 1px rgba(0,220,255,0.25), 0 0 30px rgba(0,200,255,0.2), 0 0 70px rgba(0,180,255,0.12), 0 0 140px rgba(0,160,255,0.07)", pointerEvents:"none" }} />

      {/* Bol */}
      <div style={{
        position:"absolute", inset:0, borderRadius:"50%", overflow:"hidden",
        background:"radial-gradient(circle at 50% 50%, #021018 0%, #010c14 52%, #010810 72%, rgba(0,160,220,0.18) 86%, rgba(0,200,255,0.55) 93%, rgba(0,230,255,0.85) 96%, rgba(0,210,255,0.35) 99%, transparent 100%)",
        boxShadow:"0 0 0 2px rgba(0,230,255,0.65), 0 0 25px rgba(0,210,255,0.4), 0 0 55px rgba(0,185,255,0.22), 0 0 110px rgba(0,160,255,0.1)",
      }}>

        {/* Continent vlakken — duidelijk herkenbaar */}
        <svg viewBox={`0 0 ${S} ${S}`} width={S} height={S} style={{ position:"absolute", inset:0, overflow:"visible" }}>
          <defs>
            <radialGradient id="globeBase" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#021018" />
              <stop offset="70%" stopColor="#010c14" />
              <stop offset="100%" stopColor="#010810" />
            </radialGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glowStrong" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <clipPath id="globe"><circle cx={C} cy={C} r={R} /></clipPath>
          </defs>

          {/* Continent outlines als filled polygons — zichtbare vormen */}
          <g clipPath="url(#globe)" fill="rgba(0,160,220,0.13)" stroke="rgba(0,200,255,0.55)" strokeWidth="1.2" filter="url(#glow)">
            {/* Eurazië */}
            <ellipse cx={310} cy={185} rx={105} ry={62} />
            {/* Zuidoost-Azië */}
            <ellipse cx={355} cy={255} rx={52} ry={38} />
            {/* Australië */}
            <ellipse cx={370} cy={340} rx={58} ry={38} />
            {/* Afrika */}
            <ellipse cx={255} cy={290} rx={46} ry={66} />
            {/* Europa klein */}
            <ellipse cx={248} cy={178} rx={32} ry={24} />
            {/* Noord-Amerika */}
            <ellipse cx={152} cy={195} rx={65} ry={55} />
            {/* Zuid-Amerika */}
            <ellipse cx={175} cy={325} rx={38} ry={58} />
            {/* Groenland */}
            <ellipse cx={225} cy={135} rx={22} ry={16} />
            {/* Japan */}
            <ellipse cx={390} cy={200} rx={14} ry={22} />
          </g>

          {/* Lat-/lonlijnen */}
          <g filter="url(#glow)">
            {lats.map(({ y, rx, ry, deg }) => (
              <ellipse key={`lat${deg}`} cx={C} cy={y} rx={rx} ry={ry}
                fill="none" stroke="#00d4ff"
                strokeWidth={deg === 0 ? 1.4 : 0.8}
                opacity={deg === 0 ? 0.75 : 0.45} />
            ))}
            {lons.map((deg) => (
              <ellipse key={`lon${deg}`} className="lon" cx={C} cy={C}
                rx={R * Math.abs(Math.cos(deg * Math.PI / 180))} ry={R}
                fill="none" stroke="#00d4ff" strokeWidth="0.8" opacity={0.38} />
            ))}
          </g>
        </svg>

        {/* Dot grid — zichtbaar patroon zoals referentie */}
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:"radial-gradient(circle, rgba(0,200,255,0.55) 1.2px, transparent 1.2px)",
          backgroundSize:"11px 11px",
          opacity:0.28,
        }} />

        {/* Rim glow overlay — zorgt voor de felle neon rand */}
        <div style={{
          position:"absolute", inset:0, borderRadius:"50%",
          background:"radial-gradient(circle at 50% 50%, transparent 60%, rgba(0,190,255,0.08) 74%, rgba(0,215,255,0.28) 86%, rgba(0,235,255,0.62) 93%, rgba(0,250,255,0.3) 97%, transparent 100%)",
        }} />
      </div>
    </div>
  );
}
