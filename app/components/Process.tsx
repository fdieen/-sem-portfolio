"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Neem contact op",
    description: "Stuur me een berichtje via WhatsApp of mail. Vertel wat u zoekt en ik reageer snel.",
  },
  {
    number: "02",
    title: "Afspraak of WhatsApp",
    description: "We plannen een gesprek of sparren gewoon via WhatsApp. Wat jij fijner vindt.",
  },
  {
    number: "03",
    title: "Ik ga aan de slag",
    description: "Ik bouw uw website of webshop volledig op maat. U blijft op de hoogte tijdens het proces.",
  },
  {
    number: "04",
    title: "Oplevering",
    description: "Uw website gaat live. Ik zorg dat alles werkt en blijf beschikbaar voor vragen achteraf.",
  },
];

export default function Process() {
  return (
    <section id="werkproces" className="relative py-28 px-6 overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#6ee7f7]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs text-[#6ee7f7] uppercase tracking-widest font-medium">
            Werkproces
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-3 tracking-tight">
            Hoe werkt het?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Verbindingslijn tussen stappen */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-white/10 to-transparent z-0 -translate-y-0.5" />
              )}

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-3xl font-black leading-none"
                    style={{
                      color: "#4ade80",
                      textShadow: "0 0 20px rgba(74,222,128,0.5), 0 0 40px rgba(74,222,128,0.2)",
                    }}
                  >
                    {step.number}
                  </span>
                  <div className="w-2 h-2 rounded-full" style={{ background: "#4ade80", boxShadow: "0 0 8px rgba(74,222,128,0.6), 0 0 16px rgba(74,222,128,0.3)" }} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 flex flex-wrap gap-4"
        >
          <a
            href="https://wa.me/31627381813"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#6ee7f7] text-[#080808] font-semibold px-7 py-3.5 rounded-full hover:bg-white transition-colors duration-200 text-sm"
          >
            Start via WhatsApp
          </a>
          <a
            href="mailto:sem.vdieen@gmail.com"
            className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2 group"
          >
            Of stuur een mail
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
