import React, { useRef, useState, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight, FiPlay, FiPause } from 'react-icons/fi'
import ProjectStoryCard from './ProjectStoryCard'
import type { ProjectData } from './ProjectCard'
import { soundFx } from '../../utils/sound'
import { isTouchDevice, prefersReducedMotion } from '../../config/animation'

interface ProjectLoopCarouselProps {
  projects: ProjectData[]
  accentMap: Record<string, string>
  onSelectProject: (project: ProjectData) => void
}

export default function ProjectLoopCarousel({
  projects,
  accentMap,
  onSelectProject,
}: ProjectLoopCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(isTouchDevice() || (typeof window !== 'undefined' && window.innerWidth < 768))
  }, [])

  // Duplicate project items across multiple blocks so the infinite loop is seamless
  const duplicatedProjects = [...projects, ...projects, ...projects]

  const handlePrev = () => {
    soundFx.playClick()
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -340, behavior: 'smooth' })
    }
  }

  const handleNext = () => {
    soundFx.playClick()
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 340, behavior: 'smooth' })
    }
  }

  const togglePause = () => {
    soundFx.playClick()
    setIsPaused((prev) => !prev)
  }

  return (
    <div className="relative w-full">
      
      {/* ── Top Bar Controls: Status Indicator & Navigation Buttons ── */}
      <div className="flex items-center justify-between pb-6 px-1">
        
        {/* Subtle status tag */}
        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500">
          <span className={`inline-block h-2 w-2 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`} />
          <span className="hidden sm:inline">
            {isPaused ? 'Carousel paused' : 'Continuous loop • Click card to view project'}
          </span>
          <span className="sm:hidden">
            {isPaused ? 'Paused' : 'Tap card to view project'}
          </span>
        </div>

        {/* Carousel Prev/Next & Play/Pause Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={togglePause}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 hover:border-black/30 dark:hover:border-white/30 hover:text-zinc-900 dark:hover:text-white transition cursor-pointer"
            title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
            aria-label={isPaused ? 'Resume carousel' : 'Pause carousel'}
          >
            {isPaused ? <FiPlay size={12} className="ml-0.5" /> : <FiPause size={12} />}
          </button>

          <button
            type="button"
            onClick={handlePrev}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 hover:border-black/30 dark:hover:border-white/30 hover:text-zinc-900 dark:hover:text-white transition cursor-pointer"
            title="Scroll left"
            aria-label="Previous project"
          >
            <FiChevronLeft size={15} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 hover:border-black/30 dark:hover:border-white/30 hover:text-zinc-900 dark:hover:text-white transition cursor-pointer"
            title="Scroll right"
            aria-label="Next project"
          >
            <FiChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* ── Carousel Viewport Container ── */}
      <div
        ref={containerRef}
        className="relative w-full overflow-x-auto overflow-y-hidden scrollbar-none py-4 px-2"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* ── Animated Infinite Loop Track ── */}
        <div
          data-paused={isPaused}
          className={`flex gap-5 sm:gap-6 ${prefersReducedMotion() ? '' : 'animate-loop-carousel'}`}
          style={{
            animationDuration: isMobile ? '30s' : '40s',
          }}
        >
          {duplicatedProjects.map((project, index) => {
            const key = `${project.id}-${index}`
            const accent = accentMap[project.id] || '#a78bfa'

            return (
              <ProjectStoryCard
                key={key}
                project={project}
                accentColor={accent}
                onClick={() => onSelectProject(project)}
              />
            )
          })}
        </div>
      </div>

    </div>
  )
}
