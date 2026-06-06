"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";


function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative overflow-hidden border border-white/10 rounded-2xl hover:border-[#6ee7f7]/30 transition-all duration-300"
    >
      {/* Screenshot preview bovenaan de kaart */}
      <div className="relative w-full h-44 overflow-hidden bg-[#111]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.screenshot}
          alt={`Preview ${project.name}`}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05060f] via-transparent to-transparent" />
      </div>

      <div className="p-5 sm:p-6 lg:p-8">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <span className="text-xs text-[#6ee7f7] font-medium uppercase tracking-wider">
            {project.type}
          </span>
          <h3 className="text-xl font-semibold mt-1 group-hover:text-[#6ee7f7] transition-colors duration-200">
            {project.name}
          </h3>
        </div>
        <span className="text-white/30 text-sm shrink-0">{project.year}</span>
      </div>

      <p className="text-white/60 text-sm leading-relaxed mb-6">
        {project.description}
      </p>

      {project.techChoices && (
        <>
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mb-6 border-t border-white/8 pt-5">
                  <p className="text-xs text-[#6ee7f7] uppercase tracking-widest font-medium mb-3">Waarom deze keuzes?</p>
                  <div className="space-y-3">
                    {project.techChoices.split("\n\n").map((paragraph, i) => (
                      <p key={i} className="text-white/50 text-sm leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-white/40 hover:text-[#6ee7f7] transition-colors duration-200 flex items-center gap-1.5 mb-6"
          >
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="inline-block"
            >
              ↓
            </motion.span>
            {expanded ? "Zie minder" : "Zie meer"}
          </button>
        </>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-white/5 border border-white/10 text-white/50 px-2.5 py-1 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>

      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#6ee7f7] transition-colors duration-200 group/link"
      >
        <span>Bekijk live website</span>
        <span className="group-hover/link:translate-x-1 transition-transform">→</span>
      </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projecten" className="relative py-28 px-6 overflow-hidden">
      {/* Grid die smooth verder loopt vanuit de hero en uitfade */}
      <div
        className="absolute top-0 left-0 right-0 h-[500px] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "linear-gradient(to bottom, black, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />
      {/* Blobs — bewust naar binnen geschoven zodat blur niet door overflow-hidden wordt afgekapt */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[800px] h-[380px] bg-[#4f46e5]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-60 left-0 w-[450px] h-[450px] bg-[#6ee7f7]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-[#7c3aed]/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-[#6ee7f7]/8 blur-[140px] rounded-full pointer-events-none" />
      {/* Top-fade boven de blobs — sluit aan op de bottom-fade van de hero (zelfde max-opacity) */}
      <div
        className="absolute top-0 left-0 right-0 h-96 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(5,6,15,0.85) 0%, rgba(5,6,15,0.5) 40%, transparent 100%)' }}
      />
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 relative"
        >
          <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#6ee7f7]/5 blur-[120px] rounded-full pointer-events-none" />
          <h2
            className="relative text-4xl lg:text-5xl font-bold tracking-tight text-[#6ee7f7]"
            style={{ textShadow: "0 0 18px rgba(110,231,247,0.22), 0 0 40px rgba(110,231,247,0.1)" }}
          >
            Mijn werk
          </h2>
          <p className="text-white/60 mt-4 max-w-xl">
            Bekijk hier de websites & webshops die ik heb afgerond.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.filter(p => p.featured).slice(0, 3).map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}

          {/* Zie alle projecten */}
          <motion.a
            href="/projecten"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="group flex flex-col items-center justify-center gap-4 border-2 border-dashed border-white/15 hover:border-[#6ee7f7]/50 rounded-2xl p-8 min-h-[200px] text-center transition-all duration-300 hover:bg-white/[0.03]"
          >
            <div className="w-12 h-12 rounded-full border border-white/15 group-hover:border-[#6ee7f7]/50 flex items-center justify-center transition-all duration-300">
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }}
                className="text-[#6ee7f7] text-xl"
                style={{ textShadow: "0 0 8px rgba(110,231,247,0.6), 0 0 20px rgba(110,231,247,0.3)" }}
              >→</motion.span>
            </div>
            <div>
              <p className="text-white font-semibold text-lg group-hover:text-[#6ee7f7] transition-colors duration-300">
                Zie alle projecten
              </p>
              <p className="text-white/40 text-sm mt-1">
                Bekijk het volledige overzicht
              </p>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
