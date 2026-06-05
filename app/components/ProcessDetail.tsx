"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import IslandScene from "./IslandScene";
import RocketLanding, { RocketPhase } from "./RocketLanding";

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
  const swayDuration = 6.5 + (index % 3) * 0.9;
  const swayDelay = index * 0.55;
  const flickerDuration = 2.8 + (index % 4) * 0.35;
  // Slightly asymmetric keyframes so each lantern sways like it's caught in a
  // light breeze instead of swinging like a metronome.
  const swayKeyframes = [
    -0.9 - (index % 2) * 0.2,
     1.1 + (index % 3) * 0.15,
    -0.5,
     1.3 - (index % 2) * 0.15,
    -0.9 - (index % 2) * 0.2,
  ];

  return (
    <div ref={ref} className="relative flex items-stretch gap-0">
      {/* Timeline node — hanging lantern */}
      <div className="flex flex-col items-center" style={{ width: 56, flexShrink: 0 }}>
        <motion.div
          initial={{ scale: 0, opacity: 0, y: -8 }}
          animate={inView ? { scale: 1, opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: index * 0.12, ease: [0.2, 0.7, 0.3, 1] }}
          className="relative z-10"
          style={{ width: 48, height: 64 }}
        >
          {/* Soft outer halo — kept very faint so the orb doesn't glow loudly */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              width: 56,
              height: 56,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, ${step.color}14 0%, ${step.color}06 45%, transparent 75%)`,
              filter: "blur(6px)",
            }}
          />

          {/* Gentle sway — the whole orb drifts on its string in the breeze */}
          <motion.div
            className="absolute inset-0"
            style={{ transformOrigin: "50% 2px" }}
            animate={{ rotate: swayKeyframes }}
            transition={{
              duration: swayDuration,
              delay: swayDelay,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.28, 0.5, 0.74, 1],
            }}
          >
            <svg width="48" height="64" viewBox="0 0 48 64" style={{ overflow: "visible", display: "block" }}>
              <defs>
                <radialGradient id={`lantern-core-${index}`} cx="50%" cy="50%" r="55%">
                  <stop offset="0%" stopColor={step.color} stopOpacity="0.22" />
                  <stop offset="75%" stopColor={step.color} stopOpacity="0.08" />
                  <stop offset="100%" stopColor={step.color} stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Hanging string */}
              <line x1="24" y1="0" x2="24" y2="14" stroke={`${step.color}44`} strokeWidth="0.7" />

              {/* Orb */}
              <circle
                cx="24"
                cy="30"
                r="14"
                fill={`url(#lantern-core-${index})`}
                stroke={`${step.color}55`}
                strokeWidth="0.8"
              />

              {/* Phase number */}
              <text
                x="24"
                y="33"
                textAnchor="middle"
                fontSize="9"
                fontWeight="700"
                fill={step.color}
                style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
              >
                {step.phase}
              </text>
            </svg>
          </motion.div>
        </motion.div>
        {index < steps.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12 + 0.3 }}
            className="origin-top flex-1 w-px mt-1"
            style={{
              background: `linear-gradient(to bottom, ${step.color}66, ${steps[index + 1].color}33)`,
              boxShadow: `0 0 4px ${step.color}55`,
            }}
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
          className="relative p-6 rounded-2xl border transition-colors duration-300"
          style={{
            background: "rgba(8,12,22,0.7)",
            borderColor: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl"
              style={{ background: step.color + "0c", color: step.color }}>
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
  const router = useRouter();
  const [phase, setPhase] = useState<RocketPhase>("descending");
  const [flashShore, setFlashShore] = useState(false);

  useEffect(() => {
    // Trigger the shore flash slightly before the rocket fully settles,
    // so the bioluminescent burst feels like a reaction to the landing.
    const flashTimer = setTimeout(() => setFlashShore(true), 1850);
    return () => clearTimeout(flashTimer);
  }, []);

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (phase !== "idle") return;
    setPhase("ascending");
    // Signal the homepage RocketLaunch so it can fly the rocket back down
    // onto the "Hoe werkt het?" launch pad when the user lands there.
    if (typeof window !== "undefined") {
      sessionStorage.setItem("rocketReturning", "true");
    }
    // Navigate just before the rocket fully clears the screen — people are impatient
    setTimeout(() => router.push("/#werkproces"), 480);
  };

  return (
    <section className="relative min-h-screen py-32 px-6 overflow-hidden">
      {/* Island background — slightly blurred so it recedes behind the timeline */}
      <div className="absolute inset-0" style={{ filter: "blur(2px)" }}>
        <IslandScene landingFlash={flashShore} />
      </div>

      {/* Warm golden glow blooming from the timeline itself, like the lanterns
          are casting light outward into the scene around them. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 42% 62% at 48% 50%, rgba(255,180,75,0.38) 0%, rgba(255,150,55,0.22) 22%, rgba(245,125,45,0.10) 45%, rgba(220,100,35,0.04) 65%, transparent 80%)",
          mixBlendMode: "screen",
          zIndex: 1,
        }}
      />

      {/* Rocket — sharp during descent/ascent (in the spotlight), then
          eases into the same subtle blur as the island when it sits idle on
          the platform so it recedes back into the scene. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          filter: `blur(${phase === "idle" ? 2 : 0}px)`,
          transition: "filter 0.7s ease-in-out",
        }}
      >
        <RocketLanding
          phase={phase}
          onDescentComplete={() => setPhase("idle")}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.15, ease: "easeOut" }}
        className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <a href="/#werkproces"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors text-sm mb-8 group cursor-pointer">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Terug
          </a>
          <span className="block text-xs text-[#6ee7f7]/70 uppercase tracking-[0.3em] font-medium mb-4">
            Van idee tot lancering
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Het proces in 5 stappen
          </h1>
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
      </motion.div>
    </section>
  );
}
