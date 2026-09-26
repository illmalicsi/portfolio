import React, { useRef, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { FiArrowUpRight, FiCpu, FiGithub } from 'react-icons/fi'
import { ANIMATION, isTouchDevice, prefersReducedMotion } from '../../config/animation'
import { soundFx } from '../../utils/sound'

export interface ProjectData {
  id: string
  title: string
  shortTitle?: string
  category: string
  badge: string
  featured?: boolean
  description: string
  impact: string
  stack: string[]
  architecture?: Record<string, string>
  demo: string
  github: string
  image: string
}

interface ProjectCardProps {
  project: ProjectData
  index: number
  onInspect?: (project: ProjectData) => void
}

export default function ProjectCard({ project, index, onInspect }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0, opacity: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice() || prefersReducedMotion()) return
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // 3D tilt calculation (max ~6 degrees)
    const rotX = -((y - centerY) / centerY) * ANIMATION.tilt.max
    const rotY = ((x - centerX) / centerX) * ANIMATION.tilt.max

    setRotateX(rotX)
    setRotateY(rotY)
    setSpotlightPos({ x, y, opacity: 1 })
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setSpotlightPos((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="pointer"
      className="project-card-trigger relative rounded-2xl p-[1px] transition-transform duration-300 ease-out hover:-translate-y-1.5"
      style={{
        perspective: ANIMATION.tilt.perspective,
      }}
    >
      {/* 3D Container */}
      <Motion.div
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 260,
          mass: 0.1,
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c0e] shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/[0.22] hover:shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
      >
        {/* Spotlight cursor glow overlay on border & card surface */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255, 255, 255, 0.08), transparent 60%)`,
          }}
        />

        {/* Top: Project Image with hover zoom */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950 border-b border-white/[0.08]">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent opacity-70" />

          {/* Badge */}
          <span className="absolute top-3.5 left-3.5 rounded-full border border-white/[0.12] bg-black/70 px-2.5 py-0.5 font-mono text-[10px] text-zinc-300 backdrop-blur-md">
            {project.badge}
          </span>
        </div>

        {/* Bottom Details: Content + Reveal */}
        <div className="p-6 flex flex-col flex-1 justify-between">
          <div>
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-zinc-100 transition-colors">
                {project.title}
              </h3>
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClick()}
                className="text-zinc-500 hover:text-white transition-colors p-1"
                aria-label={`Open demo for ${project.title}`}
              >
                <FiArrowUpRight size={18} />
              </a>
            </div>

            {/* Description & Impact (smooth reveal & transition) */}
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
              {project.description}
            </p>

            {/* Tech Stack Tags (Revealed and highlighted on hover) */}
            <div className="mt-4 flex flex-wrap gap-1.5 transition-opacity duration-200">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 font-mono text-[11px] text-zinc-400 transition-colors group-hover:border-white/[0.12] group-hover:text-zinc-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Card Footer Actions */}
          <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-3.5 text-xs font-mono">
            {onInspect ? (
              <button
                type="button"
                onClick={() => onInspect(project)}
                className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <FiCpu size={12} /> Spec
              </button>
            ) : (
              <span className="text-zinc-500">{project.shortTitle || 'Web Application'}</span>
            )}

            <div className="flex items-center gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClick()}
                className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                title="GitHub Repo"
              >
                <FiGithub size={13} />
              </a>

              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClick()}
                className="font-medium text-white hover:underline flex items-center gap-1"
              >
                Live <FiArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </Motion.div>
    </div>
  )
}
