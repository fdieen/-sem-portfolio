"use client";

import { motion } from "framer-motion";
import { projects } from "../data/projects";

function screenshotUrl(url: string) {
  // Lokale screenshots — voeg per project toe aan /public/
  const screenshots: Record<string, string> = {
    "https://beletteringbestellen.nl": "/belettering-screenshot.jpg",
  };
  return screenshots[url] ?? `https://image.thum.io/get/width/1200/crop/800/${url}`;
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
          <a
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors"
          >
            <span>←</span> Terug naar home
          </a>
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
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group block bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden hover:border-[#6ee7f7]/40 transition-all duration-300"
            >
              {/* Screenshot */}
              <div className="relative w-full aspect-video bg-[#111] overflow-hidden">
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
                  <div className="text-white/20 text-xs group-hover:text-[#6ee7f7] transition-colors">
                    ↗
                  </div>
                </div>

                {/* Screenshot via microlink */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={screenshotUrl(project.url)}
                  alt={`Screenshot van ${project.name}`}
                  className="w-full h-full object-cover object-top mt-8 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#6ee7f7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <span className="text-xs text-[#6ee7f7] font-medium uppercase tracking-wider">
                      {project.type}
                    </span>
                    <h2 className="text-lg font-semibold mt-0.5 group-hover:text-[#6ee7f7] transition-colors duration-200">
                      {project.name}
                    </h2>
                  </div>
                  <span className="text-white/20 text-sm shrink-0">
                    {project.year}
                  </span>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-white/5 border border-white/8 text-white/40 px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
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
            Wil u ook een website laten maken?
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
