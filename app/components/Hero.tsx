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



      {/* Maan — holografisch wireframe, linksboven, alleen desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.5 }}
        className="hidden lg:block absolute pointer-events-none"
        style={{ top: "-160px", left: "-160px", animation: "moonFloat 11s ease-in-out infinite", zIndex: 2, width: 520, height: 520 }}
      >
        {/* Buitenste glow */}
        <div style={{ position:"absolute", inset:-40, borderRadius:"50%", background:"radial-gradient(circle at 50% 50%, transparent 48%, rgba(0,220,255,0.04) 56%, rgba(0,200,255,0.08) 63%, transparent 75%)" }} />
        <div style={{ position:"absolute", inset:-20, borderRadius:"50%", boxShadow:"0 0 50px rgba(0,200,255,0.1), 0 0 100px rgba(0,180,255,0.06)" }} />
        {/* Scan-lijn */}
        <div style={{ position:"absolute", inset:0, borderRadius:"50%", overflow:"hidden", zIndex:5 }}>
          <div style={{ position:"absolute", left:0, right:0, height:2, background:"linear-gradient(90deg, transparent, rgba(0,220,255,0.4), transparent)", animation:"moonScan 5s ease-in-out infinite" }} />
        </div>
        {/* Bol */}
        <div style={{
          position:"absolute", inset:0, borderRadius:"50%", overflow:"hidden",
          background:"radial-gradient(circle at 50% 50%, #020d1a 0%, #010810 60%, #000508 100%)",
          boxShadow:"inset 0 0 80px rgba(0,0,0,0.95), 0 0 0 1.5px rgba(0,220,255,0.4), 0 0 30px rgba(0,220,255,0.18), 0 0 80px rgba(0,180,255,0.08)",
        }}>
          {/* Krater-achtige donkere zones */}
          <div style={{ position:"absolute", inset:0, background:`
            radial-gradient(ellipse 100px 50px at 35% 40%, rgba(0,180,255,0.07) 0%, transparent 100%),
            radial-gradient(ellipse 70px 35px at 60% 30%, rgba(0,190,255,0.06) 0%, transparent 100%),
            radial-gradient(ellipse 120px 55px at 48% 62%, rgba(0,170,255,0.05) 0%, transparent 100%),
            radial-gradient(ellipse 50px 25px at 25% 58%, rgba(0,180,255,0.06) 0%, transparent 100%)
          `}} />
          {/* Grid lijnen */}
          <svg viewBox="0 0 520 520" width="520" height="520" style={{ position:"absolute", inset:0 }}>
            <defs>
              <filter id="moonGlow">
                <feGaussianBlur stdDeviation="1" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            {[-75,-55,-35,-15,0,15,35,55,75].map((deg) => {
              const rad = deg * Math.PI / 180;
              const y = 260 - 258 * Math.sin(rad);
              const rx = 258 * Math.cos(rad);
              const ry = rx * 0.28;
              return <ellipse key={deg} cx={260} cy={y} rx={rx} ry={ry} fill="none" stroke="#00d4ff" strokeWidth={deg===0?1:0.6} opacity={deg===0?0.6:0.35} filter="url(#moonGlow)" />;
            })}
            {[0,30,60,90,120,150].map((deg) => (
              <ellipse key={deg} cx={260} cy={260} rx={258*Math.abs(Math.cos(deg*Math.PI/180))} ry={258} fill="none" stroke="#00d4ff" strokeWidth="0.6" opacity={0.3} filter="url(#moonGlow)" />
            ))}
          </svg>
          {/* Rim glow */}
          <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:"radial-gradient(circle at 50% 50%, transparent 62%, rgba(0,210,255,0.06) 72%, rgba(0,230,255,0.18) 85%, rgba(0,240,255,0.28) 93%, rgba(0,255,255,0.12) 100%)" }} />
          {/* Dot texture */}
          <div style={{ position:"absolute", inset:0, opacity:0.05, backgroundImage:"radial-gradient(circle, #00d4ff 1px, transparent 1px)", backgroundSize:"14px 14px" }} />
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
