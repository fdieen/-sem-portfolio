"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  opacity: number;
  phase: number;
  phase2: number;
  speed: number;
  speed2: number;
  amp: number;
  color: string;
  glow: boolean;
}

const COLORS = [
  "255,255,255",
  "220,240,255",
  "110,231,247",
  "200,230,255",
];

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    const resize = () => {
      canvas.width = W();
      canvas.height = H();
    };
    resize();

    const isMobile = window.innerWidth < 768;
    const total = isMobile ? 60 : 130;

    const makeStars = (): Star[] =>
      Array.from({ length: total }, (_, i) => {
        const tier = i / total;
        let r: number, opacity: number, glow: boolean, amp: number;
        if (tier < 0.65) {
          r = Math.random() * 0.5 + 0.2;
          opacity = 0.30 + Math.random() * 0.15;   // middelpunt ~0.38
          glow = false;
          amp = 0.22 + Math.random() * 0.12;        // ±0.22–0.34 → goed zichtbaar
        } else if (tier < 0.9) {
          r = Math.random() * 0.8 + 0.4;
          opacity = 0.38 + Math.random() * 0.15;
          glow = false;
          amp = 0.26 + Math.random() * 0.12;
        } else {
          r = Math.random() * 1.2 + 0.7;
          opacity = 0.52 + Math.random() * 0.18;
          glow = true;
          amp = 0.30 + Math.random() * 0.15;
        }
        return {
          x: Math.random() * W(),
          y: Math.random() * H(),
          r,
          opacity,
          phase:  Math.random() * Math.PI * 2,
          phase2: Math.random() * Math.PI * 2,
          // t+=0.026, speed ~1.0 → periode ≈ 4s (2s uit → 2s aan)
          speed:  0.85 + Math.random() * 0.3,
          speed2: 1.6  + Math.random() * 0.4,
          amp,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          glow,
        };
      });

    let stars = makeStars();
    let raf: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.026;

      for (const s of stars) {
        // Twee overlappende sinusgolven → organisch twinkle (niet perfect periodiek)
        const wave1 = Math.sin(t * s.speed  + s.phase)  * s.amp;
        const wave2 = Math.sin(t * s.speed2 + s.phase2) * s.amp * 0.4;
        const a = Math.max(0, Math.min(1, s.opacity + wave1 + wave2));

        if (s.glow) {
          const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
          grad.addColorStop(0, `rgba(${s.color},${a})`);
          grad.addColorStop(0.4, `rgba(${s.color},${a * 0.3})`);
          grad.addColorStop(1, `rgba(${s.color},0)`);
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color},${a})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      resize();
      stars = makeStars();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%", zIndex: 0 }}
    />
  );
}
