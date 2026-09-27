import React from 'react'
import { FiArrowRight, FiMaximize2, FiCpu, FiActivity, FiLayers, FiTerminal, FiAward } from 'react-icons/fi'
import type { ProjectData } from './ProjectCard'
import { soundFx } from '../../utils/sound'

import synapsyCardArt from '../../assets/card-synapsy.jpg'
import calotrackCardArt from '../../assets/card-calotrack.jpg'
import dbembCardArt from '../../assets/card-dbemb.jpg'
import aslCardArt from '../../assets/card-asl.jpg'

const projectArtMap: Record<string, string> = {
  synapsy: synapsyCardArt,
  calotrack: calotrackCardArt,
  dbemb: dbembCardArt,
  asl: aslCardArt,
}

interface ProjectStoryCardProps {
  project: ProjectData
  accentColor: string
  onClick: () => void
}

export default function ProjectStoryCard({ project, accentColor, onClick }: ProjectStoryCardProps) {
  // Render custom typographic brand mark inspired by Framer stories (Zapier, Mixpanel, Flora, Mutiny)
  const renderBrandMark = () => {
    switch (project.id) {
      case 'synapsy':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-500/20 text-violet-400 border border-violet-500/30">
                <FiCpu size={13} />
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-violet-400 font-semibold">
                Gemini 1.5
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center font-sans">
              synapsy<span className="text-violet-400 animate-pulse">.</span>
            </h3>
            <p className="mt-2.5 text-xs text-zinc-400 max-w-[220px] line-clamp-2">
              AI-powered document study companion &amp; quiz synthesis
            </p>
          </div>
        )
      case 'calotrack':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <FiActivity size={13} />
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-semibold">
                Health Tech
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center font-sans">
              calo<span className="text-amber-400 mx-0.5">•</span>track
            </h3>
            <p className="mt-2.5 text-xs text-zinc-400 max-w-[220px] line-clamp-2">
              Vision-assisted macro &amp; caloric nutritional intelligence
            </p>
          </div>
        )
      case 'dbemb':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
                <FiLayers size={13} />
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-sky-400 font-semibold">
                Community Hub
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black tracking-widest text-white uppercase font-mono">
              _dbemb
            </h3>
            <p className="mt-2.5 text-xs text-zinc-400 max-w-[220px] line-clamp-2">
              Full-stack university marching band roster &amp; media system
            </p>
          </div>
        )
      case 'asl':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <FiTerminal size={13} />
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-rose-400 font-semibold">
                MediaPipe ML
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center font-mono">
              asl<span className="text-rose-400">.</span>vision
            </h3>
            <p className="mt-2.5 text-xs text-zinc-400 max-w-[220px] line-clamp-2">
              Real-time browser American Sign Language interpreter
            </p>
          </div>
        )
      default:
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {project.shortTitle || project.title}
            </h3>
            <p className="mt-2 text-xs text-zinc-400 max-w-[220px] line-clamp-2">
              {project.description}
            </p>
          </div>
        )
    }
  }

  const coverArt = projectArtMap[project.id] || project.image

  return (
    <div
      onClick={() => {
        soundFx.playClick()
        onClick()
      }}
      onMouseEnter={() => soundFx.playHover()}
      className="group relative flex-shrink-0 w-[290px] sm:w-[330px] md:w-[350px] h-[430px] sm:h-[470px] md:h-[490px] rounded-[28px] sm:rounded-[32px] overflow-hidden cursor-pointer select-none border border-white/[0.08] dark:border-white/[0.1] bg-[#09090b] shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_24px_60px_rgba(0,0,0,0.85)] hover:border-white/30"
      style={{
        boxShadow: `0 16px 40px rgba(0,0,0,0.5)`,
      }}
    >
      {/* ── 1. Full-Card Background Art with silky hover fade & subtle zoom ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={coverArt}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-all duration-700 ease-out opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-105"
        />

        {/* Cinematic gradient overlay on hover ensuring high text contrast (Zapier style) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
      </div>

      {/* ── 2. Default Ambient Glow (active when unhovered) ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-25 group-hover:opacity-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accentColor}25, transparent 70%)`,
        }}
      />

      {/* ── 3. Foreground Content Layout ── */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-7">
        
        {/* Top Header: Category Eyebrow & Expand Indicator */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-400 group-hover:text-zinc-200 transition-colors">
            {project.category.toUpperCase()}
          </span>

          <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] font-mono text-zinc-300 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            <FiMaximize2 size={10} />
            <span>Blueprint</span>
          </div>
        </div>

        {/* Center: Unique Brand Logo / Typography */}
        <div className="my-auto py-4 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          {renderBrandMark()}
        </div>

        {/* Bottom Footer: "Read story →" (Matching Framer reference) */}
        <div className="pt-4 border-t border-white/[0.08] group-hover:border-white/20 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white group-hover:text-white transition-colors">
              <span>View Project</span>
              <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5 text-zinc-400 group-hover:text-white" />
            </div>

            <div className="flex items-center gap-1.5">
              {project.stack.slice(0, 2).map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 font-mono text-[9px] text-zinc-400 group-hover:text-zinc-300 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Subtle border highlight on hover matching project accent */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[28px] sm:rounded-[32px] border border-transparent group-hover:border-white/20 transition-colors duration-300"
        style={{
          boxShadow: `inset 0 0 0 1px ${accentColor}10`,
        }}
      />
    </div>
  )
}
