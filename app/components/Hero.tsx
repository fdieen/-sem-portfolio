"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Lerp refs voor soepele animatie zonder shaking
  const targetRotate = useRef({ x: 0, y: 0 });
  const currentRotate = useRef({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x: e.clientX, y: e.clientY });
      // Grotere hoeken voor intensere rotatie
      targetRotate.current = { x: y * -20, y: x * 30 };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // rAF loop met lerp — elimineert shaking, zorgt voor soepele beweging
  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      currentRotate.current.x = lerp(currentRotate.current.x, targetRotate.current.x, 0.35);
      currentRotate.current.y = lerp(currentRotate.current.y, targetRotate.current.y, 0.35);

      if (cardRef.current) {
        cardRef.current.style.transform = `rotateX(${currentRotate.current.x}deg) rotateY(${currentRotate.current.y}deg)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const screenshotFront = "/belettering-screenshot.jpg";
  const screenshotBack = "/belettering-screenshot.jpg";

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow die muis volgt */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(110,231,247,0.06), transparent 60%)`,
        }}
      />

      {/* Paarse blob linksboven */}
      <div className="absolute -top-20 -left-20 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-[#7c3aed]/20 blur-[120px] rounded-full pointer-events-none" />
      {/* Cyaan blob rechtsonder */}
      <div className="absolute bottom-0 right-0 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-[#06b6d4]/15 blur-[100px] rounded-full pointer-events-none" />
      {/* Kleine roze blob midden */}
      <div className="absolute top-1/2 left-1/3 w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] bg-[#ec4899]/8 blur-[90px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-24 pb-16">
        {/* Text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/50 mb-8"
          >
            <span className="w-1.5 h-1.5 bg-[#6ee7f7] rounded-full animate-pulse" />
            Beschikbaar voor nieuwe projecten
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
          >
            Uw unieke ideeën
            <br />
            <span className="text-[#6ee7f7]">breng ik tot leven.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-white/50 text-lg leading-relaxed mb-10 max-w-md"
          >
            Van webshop tot bedrijfswebsite, volledig op maat. Gevonden worden begint hier.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="/projecten"
              className="bg-[#6ee7f7] text-[#080808] font-semibold px-7 py-3.5 rounded-full hover:bg-white transition-colors duration-200 text-sm"
            >
              Bekijk mijn werk
            </a>
            <a
              href="#contact"
              className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2 group"
            >
              Neem contact op
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        </div>

        {/* 3D kaart met voor- en achterkant */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center items-center mt-10 lg:mt-0"
          style={{ perspective: "1000px" }}
        >
          {/* Outer wrapper voor badge */}
          <div className="relative">
            {/* 3D roterende container */}
            <div
              ref={cardRef}
              style={{ transformStyle: "preserve-3d", willChange: "transform" }}
              className="relative w-full max-w-[320px] lg:max-w-[440px]"
            >
              {/* VOORKANT */}
              <a
                href="https://beletteringbestellen.nl"
                target="_blank"
                rel="noopener noreferrer"
                style={{ backfaceVisibility: "hidden" }}
                className="block rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#111] hover:border-[#6ee7f7]/40 transition-colors duration-300 group/browser"
              >
                <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-2 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex-1 bg-[#111] rounded-md px-3 py-1 mx-2 text-xs text-white/20 font-mono group-hover/browser:text-white/40 transition-colors truncate">
                    beletteringbestellen.nl
                  </div>
                  <span className="text-white/20 group-hover/browser:text-[#6ee7f7] text-xs transition-colors">↗</span>
                </div>
                <div className="h-[200px] lg:h-[280px] relative overflow-hidden bg-[#111]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={screenshotFront}
                    alt="BeletteringBestellen.nl homepage"
                    className="w-full h-full object-cover object-top group-hover/browser:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#6ee7f7]/5 opacity-0 group-hover/browser:opacity-100 transition-opacity duration-300" />
                </div>
              </a>

              {/* ACHTERKANT — designer tool */}
              <a
                href="https://beletteringbestellen.nl"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                }}
                className="block rounded-2xl overflow-hidden border border-[#6ee7f7]/20 shadow-2xl bg-[#111] group/back"
              >
                <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-2 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex-1 bg-[#111] rounded-md px-3 py-1 mx-2 text-xs text-[#6ee7f7]/40 font-mono truncate">
                    beletteringbestellen.nl · designer
                  </div>
                  <span className="text-[#6ee7f7]/40 text-xs">↗</span>
                </div>
                <div className="h-[200px] lg:h-[280px] relative overflow-hidden bg-[#111]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={screenshotBack}
                    alt="BeletteringBestellen.nl designer"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-[#6ee7f7]/5" />
                </div>
              </a>
            </div>

            {/* Badge — altijd bovenop, buiten 3D */}
            <div className="absolute -bottom-4 -right-4 z-10 bg-[#6ee7f7] text-[#080808] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg pointer-events-none">
              Live project
            </div>

            {/* Glow */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-12 bg-[#6ee7f7]/20 blur-2xl rounded-full pointer-events-none" />
          </div>
        </motion.div>
      </div>

    </section>
  );
}
