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



      {/* Maan — sci-fi, deels buiten beeld linksboven, alleen desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.5 }}
        className="hidden lg:block absolute pointer-events-none"
        style={{ top: "-160px", left: "-160px", animation: "moonFloat 11s ease-in-out infinite", zIndex: 2 }}
      >
        {/* Buitenste sci-fi ringen */}
        <div style={{ position:"absolute", inset:-28, borderRadius:"50%", border:"1px solid rgba(110,231,247,0.12)", boxShadow:"0 0 20px rgba(110,231,247,0.06)" }} />
        <div style={{ position:"absolute", inset:-52, borderRadius:"50%", border:"1px solid rgba(110,231,247,0.06)" }} />
        {/* Scan-lijn animatie */}
        <div style={{ position:"absolute", inset:0, borderRadius:"50%", overflow:"hidden", zIndex:5 }}>
          <div style={{ position:"absolute", left:0, right:0, height:2, background:"linear-gradient(90deg, transparent, rgba(110,231,247,0.35), transparent)", animation:"moonScan 4s ease-in-out infinite", top:0 }} />
        </div>

        {/* Maan bol */}
        <div style={{
          width: 520, height: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle at 38% 32%, #c8cdd8 0%, #8e95a8 28%, #5a6070 55%, #2e3340 78%, #12161e 100%)",
          boxShadow: "inset -80px -55px 150px rgba(0,0,0,0.85), inset 15px 15px 50px rgba(110,231,247,0.04), 0 0 60px rgba(110,231,247,0.08), 0 0 120px rgba(110,231,247,0.04)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Kraters met cyan gloed */}
          <div style={{ position:"absolute", width:80, height:80, borderRadius:"50%", top:"22%", left:"28%", background:"radial-gradient(circle at 40% 35%, #8890a0 0%, #505868 60%, #2a3040 100%)", boxShadow:"inset 8px 8px 20px rgba(0,0,0,0.7), 0 0 8px rgba(110,231,247,0.08)" }} />
          <div style={{ position:"absolute", width:48, height:48, borderRadius:"50%", top:"50%", left:"55%", background:"radial-gradient(circle at 40% 35%, #7880a0 0%, #484e68 60%, #222840 100%)", boxShadow:"inset 5px 5px 14px rgba(0,0,0,0.7), 0 0 6px rgba(110,231,247,0.07)" }} />
          <div style={{ position:"absolute", width:110, height:110, borderRadius:"50%", top:"55%", left:"38%", background:"radial-gradient(circle at 38% 33%, #7078900 0%, #404858 60%, #1e2430 100%)", boxShadow:"inset 12px 12px 28px rgba(0,0,0,0.75)" }} />
          <div style={{ position:"absolute", width:34, height:34, borderRadius:"50%", top:"30%", left:"60%", background:"radial-gradient(circle at 40% 35%, #8890a8 0%, #585e78 100%)", boxShadow:"inset 4px 4px 10px rgba(0,0,0,0.6)" }} />
          <div style={{ position:"absolute", width:58, height:58, borderRadius:"50%", top:"68%", left:"22%", background:"radial-gradient(circle at 40% 35%, #707888 0%, #404858 100%)", boxShadow:"inset 6px 6px 16px rgba(0,0,0,0.65)" }} />
          <div style={{ position:"absolute", width:26, height:26, borderRadius:"50%", top:"38%", left:"72%", background:"radial-gradient(circle at 40% 35%, #808898 0%, #505868 100%)", boxShadow:"inset 3px 3px 8px rgba(0,0,0,0.6)" }} />
          {/* Hex grid overlay — sci-fi */}
          <div style={{ position:"absolute", inset:0, opacity:0.04, backgroundImage:"linear-gradient(#6ee7f7 1px, transparent 1px), linear-gradient(90deg, #6ee7f7 1px, transparent 1px)", backgroundSize:"32px 32px" }} />
          {/* Cyan atmosferische rand */}
          <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:"radial-gradient(circle at 38% 32%, transparent 55%, rgba(110,231,247,0.06) 80%, rgba(110,231,247,0.12) 100%)" }} />
          {/* Lichtreflectie */}
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(circle at 36% 30%, rgba(200,210,230,0.18) 0%, transparent 45%)", borderRadius:"50%" }} />
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
