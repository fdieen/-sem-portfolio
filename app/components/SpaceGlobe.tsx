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
      angle += 0.04;
      const longs = svg.querySelectorAll<SVGEllipseElement>(".longitude");
      longs.forEach((el, i) => {
        const base = (i / longs.length) * 180;
        const rx = 258 * Math.abs(Math.cos(Math.PI * (base + angle) / 180));
        el.setAttribute("rx", String(Math.max(0, rx)));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const S = 520;
  const R = 258;
  const C = S / 2;

  const latitudes = [-75, -55, -35, -15, 0, 15, 35, 55, 75].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    const y   = C - R * Math.sin(rad);
    const rx  = R * Math.cos(rad);
    const ry  = rx * 0.28;
    return { y, rx, ry, deg };
  });

  const longitudes = [0, 30, 60, 90, 120, 150].map((deg) => ({
    deg,
    rx: R * Math.abs(Math.cos((deg * Math.PI) / 180)),
    ry: R,
  }));

  return (
    <div
      className="pointer-events-none select-none"
      style={{
        position: "absolute",
        bottom: "-165px",
        right: "-130px",
        width: `${S}px`,
        height: `${S}px`,
        zIndex: 0,
      }}
    >
      {/* Atmosferische halo */}
      <div
        style={{
          position: "absolute",
          inset: "-32px",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle at 50% 50%, transparent 46%, rgba(110,231,247,0.03) 54%, rgba(6,182,212,0.07) 62%, rgba(110,231,247,0.02) 70%, transparent 78%)",
        }}
      />

      {/* Bol */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "9999px",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 36% 32%, #0d2040 0%, #07111f 38%, #030b17 65%, #010609 100%)",
          boxShadow:
            "inset -40px -30px 100px rgba(0,0,0,0.95), inset 12px 12px 50px rgba(110,231,247,0.025), 0 0 100px rgba(110,231,247,0.07), 0 0 240px rgba(6,182,212,0.04)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(ellipse 110px 55px at 38% 44%, rgba(18,42,75,0.55) 0%, transparent 100%),
              radial-gradient(ellipse 70px 35px at 68% 32%, rgba(14,34,62,0.45) 0%, transparent 100%),
              radial-gradient(ellipse 130px 60px at 52% 62%, rgba(12,30,54,0.40) 0%, transparent 100%),
              radial-gradient(ellipse 55px 28px at 22% 57%, rgba(18,42,75,0.45) 0%, transparent 100%),
              radial-gradient(ellipse 80px 40px at 80% 55%, rgba(12,30,54,0.35) 0%, transparent 100%)
            `,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(ellipse 200px 80px at 45% 30%, rgba(110,231,247,0.018) 0%, transparent 100%),
              radial-gradient(ellipse 160px 60px at 70% 65%, rgba(110,231,247,0.012) 0%, transparent 100%)
            `,
          }}
        />

        <svg
          ref={svgRef}
          viewBox={`0 0 ${S} ${S}`}
          width={S}
          height={S}
          style={{ position: "absolute", inset: 0, opacity: 0.18 }}
        >
          {latitudes.map(({ y, rx, ry, deg }) => (
            <ellipse
              key={`lat-${deg}`}
              cx={C}
              cy={y}
              rx={rx}
              ry={ry}
              fill="none"
              stroke="#6ee7f7"
              strokeWidth={deg === 0 ? 0.8 : 0.5}
            />
          ))}
          {longitudes.map(({ deg, ry }) => (
            <ellipse
              key={`lon-${deg}`}
              className="longitude"
              cx={C}
              cy={C}
              rx={R * Math.abs(Math.cos((deg * Math.PI) / 180))}
              ry={ry}
              fill="none"
              stroke="#6ee7f7"
              strokeWidth="0.5"
            />
          ))}
        </svg>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 30% 28%, rgba(110,231,247,0.06) 0%, transparent 45%)",
          }}
        />
      </div>
    </div>
  );
}
