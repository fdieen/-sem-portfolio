"use client";

import { motion, useAnimate } from "framer-motion";
import SpaceGlobe from "./SpaceGlobe";
import Satellite from "./Satellite";
import StarField from "./StarField";

function GoldenCoin() {
  const [scope, animate] = useAnimate();
  const [shineScope, animateShine] = useAnimate();
  const spinning = { current: false };

  const handleHover = async () => {
    if (spinning.current) return;
    spinning.current = true;
    await animate(scope.current, { rotateY: 1800 }, { duration: 1.5, ease: "easeInOut" });
    animate(scope.current, { rotateY: 0 }, { duration: 0 });
    animateShine(shineScope.current, { x: ["-120%", "160%"] }, { duration: 0.45, ease: "easeIn" });
    spinning.current = false;
  };

  return (
    // Outer: CSS float — Inner: Framer Motion 3D spin (geen conflict)
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="hidden lg:block absolute"
      style={{ top: "18%", left: "3%", animation: "coinFloat1 6s ease-in-out infinite", zIndex: 20 }}
    >
      <motion.div
        ref={scope}
        onMouseEnter={handleHover}
        className="flex items-center justify-center cursor-pointer"
        style={{
          width: 76, height: 76,
          borderRadius: "50%",
          background: "radial-gradient(circle at 38% 32%, #ffe066 0%, #f5a800 45%, #b8720a 80%, #7a4a00 100%)",
          boxShadow: "0 2px 0 #7a4a00, 0 4px 0 #5a3600, 0 0 24px rgba(245,168,0,0.35), inset 0 1px 2px rgba(255,255,255,0.35)",
          border: "1.5px solid rgba(255,220,80,0.5)",
          transformStyle: "preserve-3d",
          overflow: "hidden",
        }}
      >
        {/* Shine sweep */}
        <motion.div
          ref={shineScope}
          style={{
            position: "absolute",
            inset: 0,
            x: "-120%",
            background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
            pointerEvents: "none",
            borderRadius: "50%",
          }}
        />
        <span style={{
          color: "#5a3200",
          fontSize: 9,
          fontWeight: 800,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          textShadow: "0 1px 0 rgba(255,220,100,0.5)",
          textAlign: "center",
          lineHeight: 1.2,
          userSelect: "none",
        }}>
          3D<br/>Animaties
        </span>
      </motion.div>
    </motion.div>
  );
}

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

      {/* Gouden muntje — linksboven */}
      <GoldenCoin />


      {/* Sterren + globe + satelliet */}
      <StarField />
      <SpaceGlobe />
      <Satellite />

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #05060f)', opacity: 0.85 }} />
    </section>
  );
}
