"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    phase: "01",
    title: "Neem contact op",
    description:
      "Stuur een bericht of mail. Vertel wat je zoekt — ik reageer binnen 24 uur met eerlijk advies en een concrete aanpak.",
    color: "#FFD700",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    phase: "02",
    title: "Kennismaking",
    description:
      "Een kort gesprek — online of telefonisch. Ik leer jouw wensen en doelen kennen en geef direct een helder beeld van wat mogelijk is.",
    color: "#c8e030",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    phase: "03",
    title: "Bouw & ontwikkeling",
    description:
      "Ik ga aan de slag. Volledig op maat gebouwd, met tussentijdse updates zodat je altijd weet waar we staan. Geen verrassingen.",
    color: "#6ee77a",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    phase: "04",
    title: "Lancering",
    description:
      "Jouw platform gaat live. Hosting, domeinkoppeling, snelheidsoptimalisatie — alles geregeld. De eerste bezoekers kunnen komen.",
    color: "#4ade80",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    phase: "05",
    title: "Support & groei",
    description:
      "Na oplevering blijf ik beschikbaar. Updates, uitbreidingen, nieuwe ideeën — we groeien samen door. Geen eenmalig project, een samenwerking.",
    color: "#22d3ee",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-stretch gap-0">
      {/* Timeline node */}
      <div className="flex flex-col items-center" style={{ width: 48, flexShrink: 0 }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.12 }}
          className="relative z-10 flex items-center justify-center rounded-full border"
          style={{
            width: 36, height: 36, flexShrink: 0,
            borderColor: step.color + "55",
            background: step.color + "12",
            boxShadow: `0 0 20px ${step.color}22`,
          }}
        >
          <span className="font-mono text-[10px] font-bold" style={{ color: step.color }}>
            {step.phase}
          </span>
        </motion.div>
        {index < steps.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12 + 0.3 }}
            className="origin-top flex-1 w-px mt-1"
            style={{ background: `linear-gradient(to bottom, ${step.color}40, ${steps[index + 1].color}20)` }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -24 : 24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, delay: index * 0.12 + 0.08 }}
        className="relative ml-6 mb-10 flex-1 group"
      >
        <div
          className="relative p-6 rounded-2xl border transition-all duration-500 group-hover:border-opacity-60"
          style={{
            background: "rgba(8,12,22,0.7)",
            borderColor: step.color + "20",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="absolute top-0 left-0 w-12 h-12 rounded-tl-2xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-30"
              style={{ background: `radial-gradient(circle at 0% 0%, ${step.color}, transparent 70%)` }} />
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl"
              style={{ background: step.color + "14", color: step.color }}>
              {step.icon}
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg mb-2 leading-snug">{step.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{step.description}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProcessDetail() {
  return (
    <section className="relative min-h-screen py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#4ade80]/4 blur-[160px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#06b6d4]/5 blur-[140px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <a href="/#werkproces"
            className="inline-flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors text-sm mb-8 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Terug
          </a>
          <span className="block text-xs text-[#6ee7f7]/70 uppercase tracking-[0.3em] font-medium mb-4">
            Van idee tot lancering
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Het proces in 5 stappen
          </h1>
          <p className="text-white/35 text-base leading-relaxed max-w-md">
            Transparant, persoonlijk en zonder gedoe. Zo breng ik jouw project tot leven.
          </p>
        </motion.div>

        {/* Timeline */}
        <div>
          {steps.map((step, i) => (
            <StepCard key={step.phase} step={step} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-4 flex flex-wrap gap-4"
        >
          <a href="/#contact"
            className="bg-[#6ee7f7] text-[#080808] font-semibold px-7 py-3.5 rounded-full hover:bg-white transition-colors duration-200 text-sm">
            Start jouw project
          </a>
          <a href="mailto:sem.vdwebdesign@gmail.com"
            className="text-white/50 hover:text-white transition-colors text-sm flex items-center gap-2 group">
            Of stuur een mail
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
