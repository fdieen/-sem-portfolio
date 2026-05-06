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
      angle += 0.03;
      svg.querySelectorAll<SVGEllipseElement>(".longitude").forEach((el, i) => {
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

  const latitudes = [-80, -65, -50, -35, -20, 0, 20, 35, 50, 65, 80].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return { y: C - R * Math.sin(rad), rx: R * Math.cos(rad), ry: R * Math.cos(rad) * 0.28, deg };
  });

  const longitudes = Array.from({ length: 12 }, (_, i) => ({
    deg: i * 15,
    rx: R * Math.abs(Math.cos((i * 15 * Math.PI) / 180)),
    ry: R,
  }));

  return (
    <div
      className="pointer-events-none select-none"
      style={{ position: "absolute", bottom: "-165px", right: "-130px", width: `${S}px`, height: `${S}px`, zIndex: 0 }}
    >
      {/* Buitenste glow ringen */}
      <div style={{ position:"absolute", inset:-40, borderRadius:"50%", background:"radial-gradient(circle at 50% 50%, transparent 48%, rgba(0,220,255,0.06) 56%, rgba(0,200,255,0.12) 63%, rgba(0,180,255,0.06) 70%, transparent 78%)" }} />
      <div style={{ position:"absolute", inset:-20, borderRadius:"50%", boxShadow:"0 0 60px rgba(0,200,255,0.15), 0 0 120px rgba(0,180,255,0.08)" }} />

      {/* Bol */}
      <div style={{
        position:"absolute", inset:0, borderRadius:"50%", overflow:"hidden",
        background:"radial-gradient(circle at 50% 50%, #020d1a 0%, #010810 60%, #000508 100%)",
        boxShadow:"inset 0 0 80px rgba(0,0,0,0.95), 0 0 0 1.5px rgba(0,220,255,0.5), 0 0 40px rgba(0,220,255,0.25), 0 0 100px rgba(0,180,255,0.12)",
      }}>
        {/* Continenten — heldere cyan blobs */}
        <div style={{ position:"absolute", inset:0, background:`
          radial-gradient(ellipse 130px 60px at 40% 38%, rgba(0,200,255,0.14) 0%, transparent 100%),
          radial-gradient(ellipse 90px 45px at 62% 30%, rgba(0,210,255,0.12) 0%, transparent 100%),
          radial-gradient(ellipse 160px 65px at 50% 60%, rgba(0,190,255,0.10) 0%, transparent 100%),
          radial-gradient(ellipse 70px 35px at 22% 54%, rgba(0,200,255,0.11) 0%, transparent 100%),
          radial-gradient(ellipse 50px 30px at 78% 52%, rgba(0,200,255,0.09) 0%, transparent 100%)
        `}} />

        {/* Grid SVG */}
        <svg ref={svgRef} viewBox={`0 0 ${S} ${S}`} width={S} height={S} style={{ position:"absolute", inset:0 }}>
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          {/* Breedtegraden */}
          {latitudes.map(({ y, rx, ry, deg }) => (
            <ellipse key={`lat-${deg}`} cx={C} cy={y} rx={rx} ry={ry}
              fill="none" stroke="#00d4ff" strokeWidth={deg === 0 ? 1.2 : 0.7}
              opacity={deg === 0 ? 0.7 : 0.45} filter="url(#glow)" />
          ))}
          {/* Lengtegraden */}
          {longitudes.map(({ deg, ry }) => (
            <ellipse key={`lon-${deg}`} className="longitude" cx={C} cy={C}
              rx={R * Math.abs(Math.cos((deg * Math.PI) / 180))} ry={ry}
              fill="none" stroke="#00d4ff" strokeWidth="0.7" opacity={0.4} filter="url(#glow)" />
          ))}
        </svg>

        {/* Rim glow — felle cyan rand */}
        <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:"radial-gradient(circle at 50% 50%, transparent 62%, rgba(0,210,255,0.08) 72%, rgba(0,230,255,0.22) 85%, rgba(0,240,255,0.35) 93%, rgba(0,255,255,0.18) 100%)" }} />
        {/* Dot texture */}
        <div style={{ position:"absolute", inset:0, opacity:0.06, backgroundImage:"radial-gradient(circle, #00d4ff 1px, transparent 1px)", backgroundSize:"14px 14px" }} />
      </div>
    </div>
  );
}
