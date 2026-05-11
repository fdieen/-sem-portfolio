"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { projects } from "../data/projects";

function screenshotUrl(project: (typeof projects)[0]) {
  if (project.screenshot) return project.screenshot;
  return `https://image.thum.io/get/width/1200/crop/800/${project.url}`;
}

function ActiveProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group flex flex-col bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden hover:border-[#6ee7f7]/40 transition-all duration-300 h-full"
    >
      {/* Screenshot */}
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="block shrink-0">
        <div className="relative w-full h-[220px] bg-[#111] overflow-hidden">
          {/* Browser chrome */}
          <div className="absolute top-0 left-0 right-0 bg-[#1a1a1a] z-10 flex items-center gap-2 px-3 py-2 border-b border-white/5">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
              <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
              <div className="w-2 h-2 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 bg-[#111] rounded px-2 py-0.5 text-[10px] text-white/25 font-mono truncate">
              {project.url.replace("https://", "")}
            </div>
            <div className="text-white/20 text-xs group-hover:text-[#6ee7f7] transition-colors">↗</div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={screenshotUrl(project)}
            alt={`Screenshot van ${project.name}`}
            className="w-full h-full object-cover object-top mt-8 group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#6ee7f7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </a>

      {/* Info */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <span className="text-xs text-[#6ee7f7] font-medium uppercase tracking-wider">{project.type}</span>
            <h2 className="text-lg font-semibold mt-0.5 group-hover:text-[#6ee7f7] transition-colors duration-200">{project.name}</h2>
          </div>
          <span className="text-white/20 text-sm shrink-0">{project.year}</span>
        </div>

        <p className="text-white/50 text-sm leading-relaxed mb-4">{project.description}</p>

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
                  <div className="mb-4 border-t border-white/8 pt-4">
                    <p className="text-xs text-[#6ee7f7] uppercase tracking-widest font-medium mb-3">Waarom deze keuzes?</p>
                    <div className="space-y-3">
                      {project.techChoices.split("\n\n").map((paragraph, i) => (
                        <p key={i} className="text-white/45 text-sm leading-relaxed">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-white/40 hover:text-[#6ee7f7] transition-colors duration-200 flex items-center gap-1.5 mb-4 w-fit"
            >
              <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="inline-block">
                ↓
              </motion.span>
              {expanded ? "Zie minder" : "Zie meer"}
            </button>
          </>
        )}

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs bg-white/5 border border-white/8 text-white/40 px-2.5 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectenGallery() {
  return (
    <section className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors"
          >
            <span>←</span> Terug naar home
          </Link>
          <span className="block text-xs text-[#6ee7f7] uppercase tracking-widest font-medium mb-3">
            Mijn werk
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
            Alle projecten
          </h1>
          <p className="text-white/40 mt-4 max-w-xl text-lg">
            Klik op een project om de live website te bekijken.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8 auto-rows-fr">
          {projects.map((project, i) => (
            project.comingSoon ? (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden cursor-default h-full"
              >
                {/* Placeholder preview */}
                <div className="relative w-full h-[220px] bg-[#0d0d0d] overflow-hidden flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />
                  <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full border"
                    style={{ color: "#6ee7f7", borderColor: "rgba(110,231,247,0.2)", background: "rgba(110,231,247,0.05)" }}
                  >
                    In afwachting
                  </span>
                </div>

                {/* Info */}
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs text-white/20 font-medium uppercase tracking-wider">
                        {project.type}
                      </span>
                      <h2 className="text-lg font-semibold mt-0.5 text-white/30">
                        {project.name}
                      </h2>
                    </div>
                    <span className="text-white/15 text-sm shrink-0">
                      {project.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
            <ActiveProjectCard key={project.name} project={project} index={i} />
            )
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-white/30 text-sm mb-4">
            Wilt u ook een website laten maken?
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 bg-[#6ee7f7] text-[#080808] font-semibold px-7 py-3.5 rounded-full hover:bg-white transition-colors duration-200 text-sm"
          >
            Neem contact op
          </a>
        </motion.div>
      </div>
    </section>
  );
}
