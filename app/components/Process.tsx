"use client";

import { motion } from "framer-motion";
import RocketLaunch from "./RocketLaunch";
import { useDeviceCapabilities } from "../hooks/useDeviceCapabilities";

export default function Process() {
  const { isCompact } = useDeviceCapabilities();
  return (
    <section id="werkproces" className="relative py-28 px-6 border-t border-white/5">
      {/* Ambient halo — allowed to bleed softly across section borders so the
          glow fades naturally into the neighbouring sections. Pinned at
          zIndex 11 so it sits above neighbouring sections' z-10 content
          (e.g. the Projects copy) which would otherwise cover the bleed. */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 11 }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#06b6d4]/4 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-xs text-[#6ee7f7]/70 uppercase tracking-[0.3em] font-medium">
            Werkproces
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold mt-4 mb-3 tracking-tight">
            Hoe werkt het?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {isCompact ? (
            <a
              href="/werkproces"
              className="inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold bg-[#6ee7f7] text-[#080808] hover:bg-white transition-colors"
            >
              Bekijk het werkproces
              <span aria-hidden>→</span>
            </a>
          ) : (
            <RocketLaunch />
          )}
        </motion.div>
      </div>
    </section>
  );
}
