"use client";

import { motion } from "framer-motion";
import SpaceGlobe from "./SpaceGlobe";
import Satellite from "./Satellite";
import StarField from "./StarField";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Paarse blob linksboven */}
      <div className="absolute -top-20 -left-20 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-[#7c3aed]/20 blur-[120px] rounded-full pointer-events-none" />
      {/* Cyaan blob rechtsonder */}
      <div className="absolute bottom-0 right-0 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-[#06b6d4]/15 blur-[100px] rounded-full pointer-events-none" />
      {/* Kleine roze blob midden */}
      <div className="absolute top-1/2 left-1/3 w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] bg-[#ec4899]/8 blur-[90px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex items-center pt-24 pb-16 min-h-screen">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
          >
            Gevonden worden
            <br />
            <span className="text-[#6ee7f7]">begint hier.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-white/50 text-lg leading-relaxed mb-10 max-w-md"
          >
            Van webshop tot bedrijfswebsite, uw unieke ideeën breng ik tot leven.
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
      </div>



      {/* Maan — linksboven, alleen desktop */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="hidden lg:block absolute pointer-events-none"
        style={{ top: "8%", left: "4%", animation: "moonFloat 9s ease-in-out infinite", zIndex: 2 }}
      >
        <div style={{
          width: 520, height: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 30%, #e8e0d0 0%, #c8bfb0 30%, #9e9488 60%, #6e6660 85%, #3a3430 100%)",
          boxShadow: "inset -70px -50px 140px rgba(0,0,0,0.7), inset 20px 20px 60px rgba(255,255,240,0.1), 0 0 80px rgba(200,190,170,0.1), 0 0 160px rgba(180,170,150,0.05)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Kraters */}
          <div style={{ position:"absolute", width:80, height:80, borderRadius:"50%", top:"22%", left:"28%", background:"radial-gradient(circle at 40% 35%, #b0a898 0%, #7a7268 60%, #5a5248 100%)", boxShadow:"inset 8px 8px 18px rgba(0,0,0,0.5)" }} />
          <div style={{ position:"absolute", width:48, height:48, borderRadius:"50%", top:"52%", left:"18%", background:"radial-gradient(circle at 40% 35%, #b0a898 0%, #7a7268 60%, #5a5248 100%)", boxShadow:"inset 5px 5px 12px rgba(0,0,0,0.5)" }} />
          <div style={{ position:"absolute", width:100, height:100, borderRadius:"50%", top:"58%", left:"52%", background:"radial-gradient(circle at 40% 35%, #aaa098 0%, #787068 60%, #585048 100%)", boxShadow:"inset 10px 10px 24px rgba(0,0,0,0.5)" }} />
          <div style={{ position:"absolute", width:34, height:34, borderRadius:"50%", top:"32%", left:"62%", background:"radial-gradient(circle at 40% 35%, #b8b0a0 0%, #888078 100%)", boxShadow:"inset 4px 4px 8px rgba(0,0,0,0.4)" }} />
          <div style={{ position:"absolute", width:58, height:58, borderRadius:"50%", top:"70%", left:"32%", background:"radial-gradient(circle at 40% 35%, #a8a098 0%, #787068 100%)", boxShadow:"inset 6px 6px 16px rgba(0,0,0,0.45)" }} />
          <div style={{ position:"absolute", width:26, height:26, borderRadius:"50%", top:"14%", left:"55%", background:"radial-gradient(circle at 40% 35%, #bab2a2 0%, #8a8278 100%)", boxShadow:"inset 3px 3px 7px rgba(0,0,0,0.4)" }} />
          <div style={{ position:"absolute", width:42, height:42, borderRadius:"50%", top:"42%", left:"70%", background:"radial-gradient(circle at 40% 35%, #a8a098 0%, #787068 100%)", boxShadow:"inset 5px 5px 12px rgba(0,0,0,0.45)" }} />
          {/* Lichtreflectie linksboven */}
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(circle at 32% 28%, rgba(255,255,240,0.15) 0%, transparent 50%)", borderRadius:"50%" }} />
        </div>
      </motion.div>

      {/* Sterren + globe + satelliet */}
      <StarField />
      <SpaceGlobe />
      <Satellite />

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #05060f)', opacity: 0.85 }} />
    </section>
  );
}
