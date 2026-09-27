import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiLayers } from 'react-icons/fi'
import { projects } from '../../data/portfolioData'
import ProjectLoopCarousel from '../ui/ProjectLoopCarousel'
import ProjectModal from './ProjectModal'
import { soundFx } from '../../utils/sound'
import { prefersReducedMotion } from '../../config/animation'
import type { ProjectData } from '../ui/ProjectCard'

gsap.registerPlugin(ScrollTrigger)

const projectAccentMap: Record<string, string> = {
  synapsy: '#a78bfa',
  dbemb: '#38bdf8',
  calotrack: '#fbbf24',
  asl: '#f43f5e',
}

export default function SelectedWork() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const carouselContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 92%',
              once: true,
            },
          }
        )
      }

      if (carouselContainerRef.current) {
        gsap.fromTo(
          carouselContainerRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: carouselContainerRef.current,
              start: 'top 90%',
              once: true,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="relative px-4 py-24 sm:px-6 md:py-32 lg:px-8 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Section Header */}
        <div ref={headerRef} className="mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">
            <FiLayers size={13} className="text-zinc-500 dark:text-zinc-400" />
            <span>03 / Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Crafted Systems &amp; Engineering.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Full-stack platforms, multimodal AI systems, and real-time computer vision applications built for real-world impact.
          </p>
        </div>

        {/* Framer-Style Loop Carousel Cards */}
        <div ref={carouselContainerRef} className="relative">
          <ProjectLoopCarousel
            projects={projects}
            accentMap={projectAccentMap}
            onSelectProject={(project) => {
              soundFx.playClick()
              setSelectedProject(project)
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
