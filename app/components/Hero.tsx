"use client";

import { motion } from "framer-motion";
import StarField from "./StarField";
import LiquidGlass from "./LiquidGlass";

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
            <LiquidGlass
              borderRadius={28}
              tintOpacity={0.2}
              blurRadius={5}
              rimIntensity={0.05}
              edgeIntensity={0.01}
              baseIntensity={0.01}
              edgeDistance={0.15}
              rimDistance={0.8}
              baseDistance={0.1}
              cornerBoost={0.02}
              rippleEffect={0.1}
              style={{ display: "inline-block" }}
            >
              <a
                href="/projecten"
                className="block font-semibold px-7 py-3.5 text-sm text-[#6ee7f7] hover:text-white transition-colors"
              >
                Bekijk mijn werk
              </a>
            </LiquidGlass>
            <LiquidGlass
              borderRadius={28}
              tintOpacity={0.2}
              blurRadius={5}
              rimIntensity={0.05}
              edgeIntensity={0.01}
              baseIntensity={0.01}
              edgeDistance={0.15}
              rimDistance={0.8}
              baseDistance={0.1}
              cornerBoost={0.02}
              rippleEffect={0.1}
              style={{ display: "inline-block" }}
            >
              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3.5 text-sm text-white/70 hover:text-white transition-colors group"
              >
                Neem contact op
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </LiquidGlass>
          </motion.div>
        </div>
      </div>



      {/* Bottom fade — staat eerst in DOM zodat sterren er bovenop blijven liggen */}
      <div className="absolute bottom-0 left-0 right-0 h-72 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(5,6,15,0.5) 60%, rgba(5,6,15,0.85) 100%)' }} />

      {/* Sterren — komen na de fade in DOM zodat ze door de fade heen prikken */}
      <StarField />
    </section>
  );
}
