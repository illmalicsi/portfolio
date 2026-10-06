import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { soundFx } from '../../utils/sound'
import { PRIMARY_EASE_CURVE, SHARED_SPRING, prefersReducedMotion, isTouchDevice } from '../../config/motion'
import type { ProjectData } from './ProjectCard'

interface ProjectEditorialIndexProps {
  projects: ProjectData[]
  onSelectProject: (project: ProjectData) => void
}

const PROJECT_YEARS: Record<string, string> = {
  prismsql: '2026',
  quintessence: '2026',
  dbemb: '2024',
  synapsy: '2025',
  calotrack: '2025',
  asl: '2024',
}

export default function ProjectEditorialIndex({
  projects,
  onSelectProject,
}: ProjectEditorialIndexProps) {
  const [hoveredProject, setHoveredProject] = useState<ProjectData | null>(null)
  const [canTrackCursor, setCanTrackCursor] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const mousePos = useRef({ x: 0, y: 0 })
  const previewPos = useRef({ x: 0, y: 0 })
  const prevX = useRef(0)
  const velocityX = useRef(0)
  const rotation = useRef(0)
  const animFrameId = useRef<number | null>(null)
  const previewContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
    if (typeof window === 'undefined') return
    if (!prefersReducedMotion() && !isTouchDevice()) {
      setCanTrackCursor(true)
    }
  }, [])

  // Floating cursor follow loop with velocity-based tilt
  useEffect(() => {
    if (!canTrackCursor) return

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      velocityX.current = e.clientX - prevX.current
      prevX.current = e.clientX
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const updatePreview = () => {
      const factor = 0.16
      previewPos.current.x += (mousePos.current.x - previewPos.current.x) * factor
      previewPos.current.y += (mousePos.current.y - previewPos.current.y) * factor

      // Calculate subtle tilt from velocity clamped between -8 and 8 degrees
      const targetRotation = Math.max(-8, Math.min(8, velocityX.current * 0.4))
      rotation.current += (targetRotation - rotation.current) * 0.14
      velocityX.current *= 0.85

      if (previewContainerRef.current) {
        previewContainerRef.current.style.transform = `translate3d(${previewPos.current.x + 32}px, ${previewPos.current.y - 130}px, 0) rotate(${rotation.current}deg)`
      }

      animFrameId.current = requestAnimationFrame(updatePreview)
    }

    animFrameId.current = requestAnimationFrame(updatePreview)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
    }
  }, [canTrackCursor])

  return (
    <div className="relative w-full border-t border-hairline select-none">
      
      {/* ── Editorial Project Rows ── */}
      <div className="divide-y divide-hairline">
        {projects.map((project, index) => {
          const numberStr = String(index + 1).padStart(2, '0')
          const isHovered = hoveredProject?.id === project.id
          const isAnyHovered = hoveredProject !== null
          const isDimmed = isAnyHovered && !isHovered
          const year = PROJECT_YEARS[project.id] || '2025'

          return (
            <div
              key={project.id}
              data-cursor="pointer"
              onMouseEnter={() => {
                soundFx.playHover()
                setHoveredProject(project)
              }}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => {
                soundFx.playClick()
                onSelectProject(project)
              }}
              className={`group relative flex flex-col md:flex-row md:items-center justify-between gap-4 py-5 sm:py-6 cursor-pointer transition-opacity duration-250 ${
                isDimmed ? 'opacity-40' : 'opacity-100'
              }`}
            >
              {/* Left: Number + Sliding Vermilion Dot + Title */}
              <div className="flex items-baseline gap-4 sm:gap-8">
                <div className="flex items-center gap-2 w-12 sm:w-14 shrink-0">
                  {/* Sliding Vermilion Dot */}
                  <div className="w-2 h-2 flex items-center justify-center">
                    {isHovered && (
                      <Motion.span
                        layoutId="project-hover-vermilion-dot"
                        className="h-1.5 w-1.5 rounded-full bg-[var(--vermilion)] shrink-0"
                        transition={SHARED_SPRING}
                      />
                    )}
                  </div>

                  <span className="font-mono text-xs text-[var(--text-muted)] tabular-nums select-none">
                    {numberStr}
                  </span>
                </div>

                <h3 className="font-display text-base sm:text-lg md:text-[1.2rem] text-[var(--text)] font-normal tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                  {project.title}
                </h3>
              </div>

              {/* Right: Year + Stack + Arrow */}
              <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-8 pl-16 md:pl-0">
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  {year}
                </span>

                <span className="font-mono text-xs text-[var(--text-muted)] hidden sm:inline-block">
                  {project.stack.slice(0, 3).join(' · ')}
                </span>

                <span className="flex h-7 w-7 items-center justify-center border border-hairline text-[var(--text-muted)] group-hover:border-[var(--vermilion)] group-hover:text-[var(--vermilion)] transition-colors">
                  <FiArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Cursor-Following Project Preview Card with Rounded Border Radius ── */}
      {isMounted && canTrackCursor && createPortal(
        <div
          ref={previewContainerRef}
          aria-hidden="true"
          className="pointer-events-none fixed top-0 left-0 z-[9995] will-change-transform"
          style={{
            transform: 'translate3d(-300px, -300px, 0)',
          }}
        >
          <AnimatePresence>
            {hoveredProject && (
              <Motion.div
                key={hoveredProject.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{
                  duration: 0.25,
                  ease: PRIMARY_EASE_CURVE,
                }}
                className="relative h-44 w-72 sm:h-48 sm:w-80 overflow-hidden rounded-xl hover:rounded-2xl border border-hairline bg-[var(--bg)] shadow-2xl transition-all duration-300"
              >
                <img
                  src={hoveredProject.image}
                  alt={hoveredProject.title}
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] text-white">
                  <span className="font-medium">{hoveredProject.shortTitle || hoveredProject.title}</span>
                  <span className="uppercase text-white/70">{hoveredProject.category}</span>
                </div>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>,
        document.body
      )}

    </div>
  )
}
