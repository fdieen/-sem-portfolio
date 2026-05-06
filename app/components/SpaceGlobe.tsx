"use client";

import { useEffect, useRef, useMemo } from "react";

const CX = 260, CY = 260, R = 258;
const CENTER_LON = 118, CENTER_LAT = 18; // Asia-Pacific view

function project(lon: number, lat: number): { x: number; y: number } | null {
  const dlam = (lon - CENTER_LON) * Math.PI / 180;
  const phi  = lat * Math.PI / 180;
  const phi0 = CENTER_LAT * Math.PI / 180;
  const cosC = Math.sin(phi0) * Math.sin(phi) + Math.cos(phi0) * Math.cos(phi) * Math.cos(dlam);
  if (cosC <= 0.01) return null;
  return {
    x: CX + R * Math.cos(phi) * Math.sin(dlam),
    y: CY - R * (Math.cos(phi0) * Math.sin(phi) - Math.sin(phi0) * Math.cos(phi) * Math.cos(dlam)),
  };
}

function toPath(pts: [number, number][]): string {
  let d = "", move = true;
  for (const [lon, lat] of pts) {
    const p = project(lon, lat);
    if (!p) { move = true; continue; }
    d += move ? `M${p.x.toFixed(1)},${p.y.toFixed(1)}` : `L${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    move = false;
  }
  return d + "Z";
}

const CONTINENTS: [number,number][][] = [
  // Russia
  [[28,56],[35,55],[50,56],[65,56],[80,53],[95,53],[110,52],[125,52],[135,53],[145,55],[155,58],[162,60],[170,63],[175,66],[168,68],[158,70],[144,72],[130,72],[118,70],[104,68],[90,68],[75,67],[60,67],[48,65],[38,62],[30,60],[28,56]],
  // Kazakhstan/Mongolia strip
  [[52,44],[65,45],[80,46],[95,46],[110,46],[125,48],[130,44],[125,42],[110,42],[95,42],[80,45],[65,43],[52,44]],
  // China
  [[76,40],[88,40],[98,42],[108,42],[120,44],[130,43],[132,38],[130,32],[125,28],[120,24],[115,22],[108,22],[100,24],[94,28],[88,28],[78,36],[76,40]],
  // Indochina
  [[94,28],[100,24],[105,20],[108,16],[106,12],[104,8],[102,4],[100,2],[98,4],[96,8],[94,12],[94,16],[97,20],[94,28]],
  // Malay Peninsula
  [[100,4],[104,4],[104,2],[102,2],[100,2],[100,4]],
  // India
  [[62,22],[68,24],[74,28],[80,28],[86,24],[88,22],[85,18],[82,12],[80,8],[77,8],[74,12],[70,18],[66,22],[62,22]],
  // Sri Lanka
  [[80,8],[82,8],[82,6],[80,6],[80,8]],
  // Arabian Peninsula
  [[32,30],[40,30],[48,30],[56,24],[60,20],[58,14],[52,12],[44,12],[36,14],[32,22],[32,30]],
  // East Africa (visible edge)
  [[40,22],[45,12],[50,4],[44,0],[38,-6],[34,-12],[36,-22],[38,-34],[32,-28],[28,-20],[24,-12],[22,0],[22,12],[28,14],[30,20],[34,26],[40,22]],
  // Europe (partial)
  [[0,44],[8,44],[14,44],[20,44],[28,46],[36,50],[40,56],[34,58],[26,60],[18,62],[12,58],[8,54],[4,50],[0,48],[0,44]],
  // Japan (Honshu)
  [[130,32],[133,34],[136,36],[138,38],[140,40],[142,44],[141,43],[138,40],[136,36],[133,34],[131,33],[130,32]],
  // Japan (Hokkaido)
  [[140,43],[144,44],[145,44],[144,42],[141,42],[140,43]],
  // Korean peninsula
  [[126,38],[129,38],[129,35],[127,34],[125,36],[126,38]],
  // Taiwan
  [[120,22],[122,24],[122,22],[120,22]],
  // Philippines (Luzon)
  [[118,18],[122,18],[124,14],[122,10],[120,8],[118,10],[116,14],[118,18]],
  // Philippines (Mindanao)
  [[122,8],[126,8],[126,6],[124,6],[122,6],[122,8]],
  // Borneo
  [[108,2],[116,4],[118,4],[120,2],[118,0],[115,-2],[110,-2],[108,0],[108,2]],
  // Sumatra
  [[96,4],[100,4],[104,2],[106,0],[104,-2],[102,-4],[98,-4],[96,0],[96,4]],
  // Java
  [[106,-6],[110,-8],[114,-8],[118,-8],[116,-8],[112,-8],[108,-6],[106,-6]],
  // Sulawesi (simplified)
  [[120,0],[124,2],[126,2],[124,0],[122,-2],[120,-2],[120,0]],
  // New Guinea
  [[130,-4],[134,-4],[138,-4],[142,-6],[146,-6],[148,-6],[144,-6],[140,-6],[136,-4],[132,-4],[130,-4]],
  // Australia
  [[114,-22],[120,-18],[128,-14],[132,-12],[136,-12],[138,-15],[142,-18],[148,-20],[154,-24],[154,-30],[152,-38],[148,-38],[140,-38],[132,-34],[124,-34],[116,-32],[114,-26],[114,-22]],
  // New Zealand (South)
  [[168,-46],[172,-44],[172,-42],[168,-40],[166,-42],[168,-46]],
  // New Zealand (North)
  [[174,-38],[178,-36],[178,-40],[174,-40],[174,-38]],
];

export default function SpaceGlobe() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    let angle = 0, raf: number;
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

  const lats = useMemo(() => [-75,-60,-45,-30,-15,0,15,30,45,60,75].map(deg => {
    const rad = deg * Math.PI / 180;
    return { y: CY - R * Math.sin(rad), rx: R * Math.cos(rad), ry: R * Math.cos(rad) * 0.28, deg };
  }), []);

  const lons = useMemo(() => Array.from({ length: 12 }, (_, i) => i * 15), []);
  const continentPaths = useMemo(() => CONTINENTS.map(toPath), []);

  return (
    <div className="pointer-events-none select-none" style={{ position:"absolute", bottom:"-165px", right:"-130px", width:520, height:520, zIndex:0 }}>
      {/* Outer glow */}
      <div style={{ position:"absolute", inset:-80, borderRadius:"50%", background:"radial-gradient(circle at 50% 50%, transparent 52%, rgba(0,180,255,0.04) 62%, rgba(0,200,255,0.08) 70%, transparent 80%)" }} />
      <div style={{ position:"absolute", inset:-12, borderRadius:"50%", boxShadow:"0 0 0 1px rgba(0,220,255,0.2), 0 0 30px rgba(0,200,255,0.18), 0 0 70px rgba(0,180,255,0.10), 0 0 140px rgba(0,160,255,0.06)" }} />

      {/* Globe */}
      <div style={{
        position:"absolute", inset:0, borderRadius:"50%", overflow:"hidden",
        background:"radial-gradient(circle at 50% 50%, #021018 0%, #010c14 52%, #010810 72%, rgba(0,140,200,0.15) 86%, rgba(0,200,255,0.5) 93%, rgba(0,230,255,0.82) 96%, rgba(0,210,255,0.3) 99%, transparent 100%)",
        boxShadow:"0 0 0 2px rgba(0,230,255,0.6), 0 0 25px rgba(0,210,255,0.38), 0 0 55px rgba(0,185,255,0.20), 0 0 110px rgba(0,160,255,0.09)",
      }}>
        <svg ref={svgRef} viewBox="0 0 520 520" width="520" height="520" style={{ position:"absolute", inset:0 }}>
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.8" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glowSoft">
              <feGaussianBlur stdDeviation="1" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <clipPath id="globeClip"><circle cx="260" cy="260" r="258"/></clipPath>
          </defs>

          <g clipPath="url(#globeClip)">
            {/* Continent fills */}
            <g fill="rgba(0,150,220,0.12)" stroke="rgba(0,200,255,0.65)" strokeWidth="1.3" filter="url(#glow)">
              {continentPaths.map((d, i) => <path key={i} d={d} />)}
            </g>

            {/* Latitude lines */}
            <g filter="url(#glowSoft)">
              {lats.map(({ y, rx, ry, deg }) => (
                <ellipse key={deg} cx={CX} cy={y} rx={rx} ry={ry}
                  fill="none" stroke="#00d4ff"
                  strokeWidth={deg === 0 ? 1.4 : 0.75}
                  opacity={deg === 0 ? 0.7 : 0.42} />
              ))}
            </g>

            {/* Longitude lines (rotating) */}
            <g filter="url(#glowSoft)">
              {lons.map((deg) => (
                <ellipse key={deg} className="lon" cx={CX} cy={CY}
                  rx={R * Math.abs(Math.cos(deg * Math.PI / 180))} ry={R}
                  fill="none" stroke="#00d4ff" strokeWidth="0.75" opacity={0.38} />
              ))}
            </g>
          </g>
        </svg>

        {/* Dot grid */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, rgba(0,200,255,0.5) 1px, transparent 1px)", backgroundSize:"10px 10px", opacity:0.25 }} />

        {/* Rim glow */}
        <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:"radial-gradient(circle at 50% 50%, transparent 60%, rgba(0,180,255,0.06) 73%, rgba(0,215,255,0.26) 85%, rgba(0,235,255,0.60) 93%, rgba(0,250,255,0.28) 97%, transparent 100%)" }} />
      </div>
    </div>
  );
}
