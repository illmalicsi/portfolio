import { useState, useRef } from 'react'
import { projects } from '../../data/portfolioData'
import ProjectEditorialIndex from '../ui/ProjectEditorialIndex'
import ProjectModal from './ProjectModal'
import type { ProjectData } from '../ui/ProjectCard'

export default function SelectedWork() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative px-4 py-24 sm:px-8 md:py-32 lg:px-12 border-t border-hairline max-w-7xl mx-auto w-full select-none"
    >
      <div className="w-full">
        {/* Section Header */}
        <div className="mb-12 max-w-3xl">
          <div className="flex items-center gap-2 mb-2 font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)]">
            <span>03 / SELECTED WORK</span>
            <span className="h-1 w-1 rounded-full bg-[var(--vermilion)]" />
            <span>INDEX OF ARTIFACTS</span>
          </div>

          <h2 className="font-display text-[clamp(1.35rem,2.4vw,1.85rem)] font-light text-[var(--text)] tracking-tight">
            Crafted Systems &amp; Engineering.
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed max-w-[58ch]">
            Full-stack platforms, multimodal AI systems, and real-time computer vision applications built for real-world reliability and scale.
          </p>
        </div>

        {/* Editorial Project Index Rows with Hover Follow Preview & Shared-Element Transition */}
        <ProjectEditorialIndex
          projects={projects}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Architecture Blueprint Modal with Reverse Transition */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  )
}
