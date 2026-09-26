import { useState, useMemo, useEffect } from 'react'
import { FiLayers } from 'react-icons/fi'
import { projects } from '../../data/portfolioData'
import OrbitLedger, { OrbitLedgerItem } from '../ui/OrbitLedger'
import ProjectModal from './ProjectModal'
import { soundFx } from '../../utils/sound'
import type { ProjectData } from '../ui/ProjectCard'

const projectAccentMap: Record<string, string> = {
  synapsy: '#a78bfa',
  dbemb: '#38bdf8',
  'tala-verde': '#34d399',
  calotrack: '#fbbf24',
  asl: '#f43f5e',
}

const projectYearMap: Record<string, string> = {
  synapsy: '2025',
  dbemb: '2024',
  'tala-verde': '2024',
  calotrack: '2024',
  asl: '2023',
}

export default function SelectedWork() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const [activeOrbitIndex, setActiveOrbitIndex] = useState(0)
  const [cardWidth, setCardWidth] = useState(280)

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return
      if (window.innerWidth < 420) {
        setCardWidth(240)
      } else if (window.innerWidth < 640) {
        setCardWidth(265)
      } else {
        setCardWidth(285)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const orbitItems: OrbitLedgerItem[] = useMemo(() => {
    return projects.map((p) => ({
      title: p.shortTitle || p.title,
      eyebrow: p.badge,
      year: projectYearMap[p.id] || '2024',
      description: p.description,
      image: p.image,
      alt: p.title,
      accent: projectAccentMap[p.id] || '#a78bfa',
      href: p.demo || p.github,
      tags: p.stack,
      rawProject: p,
    }))
  }, [])

  const activeProject = projects[activeOrbitIndex] || projects[0]

  return (
    <section id="projects" className="relative px-4 py-24 sm:px-6 md:py-32 lg:px-8 overflow-hidden">
      <div className="mx-auto w-full max-w-5xl">
        
        {/* Section Header */}
        <div className="mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">
            <FiLayers size={13} className="text-zinc-500 dark:text-zinc-400" />
            <span>03 / Selected Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Crafted Systems &amp; Engineering.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Full-stack platforms, multimodal AI systems, and real-time computer vision applications built for real-world impact.
          </p>
        </div>

        {/* Orbit Ledger 3D Showcase */}
        <div className="relative">
          <OrbitLedger
            key="all-orbit-projects"
            items={orbitItems}
            mode="contained"
            cardWidth={cardWidth}
            curve={24}
            depth={110}
            tilt={20}
            autoPlay={true}
            autoPlayInterval={3800}
            accent={activeProject ? projectAccentMap[activeProject.id] || '#a78bfa' : '#a78bfa'}
            onActiveIndexChange={(idx) => {
              setActiveOrbitIndex(idx)
              soundFx.playHover()
            }}
            onCardClick={(item) => {
              if (item.rawProject) {
                soundFx.playClick()
                setSelectedProject(item.rawProject as ProjectData)
              }
            }}
            onViewClick={(item) => {
              if (item.rawProject) {
                soundFx.playClick()
                setSelectedProject(item.rawProject as ProjectData)
              }
            }}
          />
        </div>

        {/* In-Depth Architecture Blueprint Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  )
}
