"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="over-mij" className="relative py-28 px-6 border-t border-white/5 overflow-hidden">
      {/* Warme achtergrond blobs */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-20 w-[450px] h-[450px] bg-[#f59e0b]/6 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#6ee7f7]/8 blur-[100px] rounded-full pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative w-full max-w-sm mx-auto lg:mx-0">
              {/* Glow */}
              <div className="absolute -inset-4 bg-[#6ee7f7]/10 rounded-3xl blur-2xl" />

              <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[3/4]">
                <Image
                  src="/sem-new.jpg"
                  alt="Sem van Dieen"
                  fill
                  className="object-cover object-[center_10%]"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                {/* Overlay gradient at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent" />
              </div>

              {/* Name badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#111] border border-white/10 rounded-xl px-4 py-2.5 whitespace-nowrap">
                <p className="text-sm font-semibold">Sem van Dieen</p>
                <p className="text-xs text-white/40">14 jaar · Den Haag</p>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="text-xs text-[#6ee7f7] uppercase tracking-widest font-medium">
              Over mij
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-3 mb-6 tracking-tight">
              Hoi, ik ben Sem,
            </h2>

            <div className="space-y-4 text-white/50 leading-relaxed">
              <p>
                Vanuit mijn jonge, frisse blik ga ik met mijn 100% mentaliteit voor u aan de slag.
              </p>
              <p>
                Mijn verhaal, passie, creativiteit breng ik samen tot een tactische professionele uitvoering.
              </p>
              <p>
                Hierbij staat uw verhaal en doel voorop, waarbij wij samen met een kritische blik kijken hoe uw website dit overbrengt.
              </p>
              <p>
                Een betrouwbare connectie, eerlijke prijs en een resultaat dat er toe doet.
              </p>
              <p>
                Ik garandeer een vertrouwde nieuwe look of eerste stap.
              </p>
              <p className="text-white/70 font-medium">
                → Full service van bouwen tot design en SEO verwerking in de website
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
