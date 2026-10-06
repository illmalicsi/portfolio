import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { FiArrowUpRight, FiCpu, FiGithub, FiX } from 'react-icons/fi'
import { soundFx } from '../../utils/sound'
import { PRIMARY_EASE_CURVE, SHARED_SPRING } from '../../config/motion'
import type { ProjectData } from '../ui/ProjectCard'

interface ProjectModalProps {
  project: ProjectData | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock background scroll and halt Lenis while modal is active
  useEffect(() => {
    if (project) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis
      if (lenis && typeof lenis.stop === 'function') {
        lenis.stop()
      }

      return () => {
        document.body.style.overflow = originalOverflow
        if (lenis && typeof lenis.start === 'function') {
          lenis.start()
        }
      }
    }
  }, [project])

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        soundFx.playClick()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [project, onClose])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {project && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-hidden"
        >
          {/* Backdrop */}
          <Motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: PRIMARY_EASE_CURVE }}
            onClick={() => {
              soundFx.playClick()
              onClose()
            }}
            className="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-md z-[100]"
          />

          {/* Modal Container with Shared-Element layoutId */}
          <Motion.div
            key={`modal-window-${project.id}`}
            layoutId={`project-preview-${project.id}`}
            data-lenis-prevent
            onWheel={(e: React.WheelEvent) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={SHARED_SPRING}
            className="relative my-auto max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-hairline bg-white dark:bg-[#0c0c0e] shadow-2xl flex flex-col z-[101]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-hairline px-6 py-4 bg-zinc-50/50 dark:bg-white/[0.02] flex-shrink-0">
              <span className="font-mono text-xs text-zinc-500 font-medium tracking-wider">
                SPEC // {project.id.toUpperCase()}
              </span>

              <button
                type="button"
                onClick={() => {
                  soundFx.playClick()
                  onClose()
                }}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-hairline text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <FiX size={14} />
              </button>
            </div>

            {/* Content Body */}
            <div
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              className="overflow-y-auto p-6 md:p-8 space-y-6 overscroll-contain flex-1 min-h-0"
            >
              {/* Visual Banner */}
              <div className="relative aspect-[16/8] w-full overflow-hidden rounded-xl border border-hairline bg-zinc-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="inline-block rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 font-mono text-[10px] text-zinc-300 backdrop-blur-md">
                      {project.badge}
                    </span>
                    <h3 className="mt-1 text-xl sm:text-2xl font-display font-medium text-white">
                      {project.title}
                    </h3>
                  </div>

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => soundFx.playClick()}
                      className="btn-primary py-1 px-3.5 text-xs flex items-center gap-1 font-mono font-medium"
                    >
                      Live Preview <FiArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </div>

              {/* Overview & Impact */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-3 font-body">
                  <h4 className="text-sm font-display font-semibold text-zinc-900 dark:text-white">Project Overview</h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {project.description}
                  </p>
                  <div className="rounded-xl border border-hairline p-3.5 text-xs">
                    <span className="font-mono text-zinc-500 uppercase block mb-1">Target Impact:</span>
                    <p className="text-zinc-800 dark:text-zinc-200 font-medium leading-relaxed">{project.impact}</p>
                  </div>
                </div>

                {/* Sidebar Tech Stack */}
                <div className="space-y-3 font-body">
                  <h4 className="text-sm font-display font-semibold text-zinc-900 dark:text-white">Tech Stack</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-hairline bg-black/[0.02] dark:bg-white/[0.02] px-2 py-0.5 font-mono text-[11px] text-zinc-600 dark:text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.github && (
                    <div className="pt-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => soundFx.playClick()}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                      >
                        <FiGithub size={13} /> View on GitHub
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Architecture Blueprint Breakdown */}
              {project.architecture && (
                <div className="rounded-xl border border-hairline p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <FiCpu className="text-zinc-900 dark:text-white" size={15} />
                    <h4 className="text-xs font-mono font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">
                      Engineering Architecture
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {Object.entries(project.architecture).map(([key, val]) => (
                      <div key={key} className="rounded-lg border border-hairline p-3">
                        <p className="font-mono text-[10px] uppercase text-zinc-500 font-semibold">
                          {key.replace('_', ' ')}
                        </p>
                        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-body">
                          {val}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-hairline px-6 py-3 bg-zinc-50/50 dark:bg-white/[0.02] text-xs font-mono text-zinc-500">
              <span>Press Esc to close</span>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="text-zinc-900 dark:text-white hover:underline flex items-center gap-1 transition-colors"
                >
                  Launch Site <FiArrowUpRight size={12} />
                </a>
              )}
            </div>
          </Motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
