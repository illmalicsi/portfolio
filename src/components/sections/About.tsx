import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiBookOpen, FiChevronLeft, FiChevronRight, FiUsers, FiMaximize2, FiX, FiCpu } from 'react-icons/fi'
import me1 from '../../assets/me1.jpeg'
import me2 from '../../assets/me2.jpeg'
import me3 from '../../assets/me3.jpeg'
import me4 from '../../assets/me4.jpeg'
import me5 from '../../assets/me5.jpeg'
import me6 from '../../assets/me6.jpeg'
import { aboutData, skillsList } from '../../data/portfolioData'
import { soundFx } from '../../utils/sound'
import { prefersReducedMotion } from '../../config/animation'

gsap.registerPlugin(ScrollTrigger)

const memories = [
  { img: me1, caption: 'Peer Collaboration & Study Sessions · Ateneo de Davao' },
  { img: me2, caption: 'School of Computing Assembly & University Gatherings' },
  { img: me3, caption: 'Technical Brainstorming & Whiteboard Sessions' },
  { img: me4, caption: 'CS Student Community & Student Life' },
  { img: me5, caption: 'Academic Events & Computing Seminars' },
  { img: me6, caption: 'Project Celebrations with University Friends' },
]

export default function About() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [hoveredSkill, setHoveredSkill] = useState<typeof skillsList[0] | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const disciplines = [
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend & DB' },
    { id: 'ai', label: 'AI & Data' },
    { id: 'tools', label: 'Tools & DevOps' },
  ]

  const nextSlide = () => {
    soundFx.playClick()
    setActiveSlide((prev) => (prev + 1) % memories.length)
  }

  const prevSlide = () => {
    soundFx.playClick()
    setActiveSlide((prev) => (prev - 1 + memories.length) % memories.length)
  }

  // Lock background scroll and halt Lenis while lightbox is active
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden'
      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis
      if (lenis && typeof lenis.stop === 'function') lenis.stop()
      return () => {
        document.body.style.overflow = ''
        if (lenis && typeof lenis.start === 'function') lenis.start()
      }
    }
  }, [isLightboxOpen])

  // Handle escape & arrow keys for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false)
      } else if (isLightboxOpen && e.key === 'ArrowRight') {
        nextSlide()
      } else if (isLightboxOpen && e.key === 'ArrowLeft') {
        prevSlide()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen])

  // GSAP ScrollTrigger Entrance & Stats Counter
  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      // 1. Header reveal
      gsap.fromTo(
        '.about-header-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
          stagger: 0.1,
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.about-header-container',
            start: 'top 92%',
            once: true,
          },
        }
      )

      // 2. Bento cards reveal
      gsap.fromTo(
        '.about-bento-card',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.14,
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.about-bento-grid',
            start: 'top 90%',
            once: true,
          },
        }
      )

      // 3. Stats animated counter numbers
      const statElements = statsRef.current?.querySelectorAll<HTMLElement>('.about-stat-number')
      if (statElements && statElements.length > 0) {
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: 'top 92%',
          once: true,
          onEnter: () => {
            statElements.forEach((el) => {
              const targetStr = el.getAttribute('data-target') || '0'
              const match = targetStr.match(/^(\d+)(.*)$/)
              if (match) {
                const targetNum = parseInt(match[1], 10)
                const suffix = match[2] || ''
                const counter = { val: 0 }
                gsap.to(counter, {
                  val: targetNum,
                  duration: 1.2,
                  ease: 'power2.out',
                  onUpdate: () => {
                    el.innerText = `${Math.floor(counter.val)}${suffix}`
                  },
                })
              }
            })
          },
        })
      }

      // 4. Skills container reveal (animates container cleanly without hiding internal buttons)
      gsap.fromTo(
        '.about-skills-matrix',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.about-skills-matrix',
            start: 'top 92%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative px-4 py-24 sm:px-6 md:py-36 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        
        {/* Section Header */}
        <div className="about-header-container mb-14">
          <p className="about-header-item font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">
            02 / About &amp; Capabilities
          </p>
          <h2 className="about-header-item text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Engineering Craft &amp; Mindset.
          </h2>
          <p className="about-header-item mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
            A 4th-year computer science student driven by end-to-end product delivery, architecture rigor, and human-centered design.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="about-bento-grid grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Bio Narrative (6 cols) */}
          <div className="about-bento-card md:col-span-6 flex flex-col justify-between rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/90 dark:bg-[#0c0c0e] p-8 shadow-sm dark:shadow-none backdrop-blur-xl">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                <FiBookOpen size={14} className="text-zinc-900 dark:text-white" />
                <span>Background &amp; Ambition</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight leading-snug">
                Turning complex problems into elegant, production-ready interfaces.
              </h3>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {aboutData.intro}
              </p>

              <blockquote className="mt-6 border-l-2 border-zinc-900/30 dark:border-white/30 pl-4 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 italic">
                &ldquo;{aboutData.philosophy}&rdquo;
              </blockquote>
            </div>

            {/* Core Pillars / Stats */}
            <div ref={statsRef} className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-black/[0.08] dark:border-white/[0.08]">
              {aboutData.stats.map((item) => (
                <div key={item.label} className="min-w-0">
                  <p
                    data-target={item.value}
                    className="about-stat-number text-xl font-bold text-zinc-900 dark:text-white"
                  >
                    {item.value}
                  </p>
                  <p
                    className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis"
                    title={item.label}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Real Campus Photos Filmstrip (6 cols) */}
          <div className="about-bento-card md:col-span-6 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/90 dark:bg-[#0c0c0e] p-6 sm:p-7 shadow-sm dark:shadow-none backdrop-blur-xl flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-zinc-500 dark:text-zinc-400 mb-3.5">
                <span className="flex items-center gap-2">
                  <FiUsers size={14} className="text-zinc-900 dark:text-white" />
                  <span>University Life &amp; Community</span>
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">
                  {activeSlide + 1} / {memories.length}
                </span>
              </div>

              {/* Large Prominent Photo Frame */}
              <div
                onClick={() => {
                  soundFx.playClick()
                  setIsLightboxOpen(true)
                }}
                className="relative h-[340px] sm:h-[390px] md:h-[410px] w-full overflow-hidden rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-zinc-100 dark:bg-zinc-900 cursor-pointer group/frame shadow-sm"
              >
                <img
                  src={memories[activeSlide].img}
                  alt={memories[activeSlide].caption}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover/frame:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 pointer-events-none" />

                {/* Enlarge Hint Pill */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    soundFx.playClick()
                    setIsLightboxOpen(true)
                  }}
                  aria-label="Enlarge image"
                  className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 font-mono text-[11px] text-white/90 backdrop-blur-md transition hover:bg-white hover:text-black cursor-pointer shadow-md"
                >
                  <FiMaximize2 size={12} />
                  <span>Enlarge</span>
                </button>

                {/* Navigation Buttons */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    prevSlide()
                  }}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-white hover:text-black cursor-pointer shadow-lg"
                >
                  <FiChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    nextSlide()
                  }}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-white hover:text-black cursor-pointer shadow-lg"
                >
                  <FiChevronRight size={16} />
                </button>

                {/* Caption */}
                <div className="absolute bottom-3.5 left-4 right-4 pointer-events-none">
                  <p className="text-xs sm:text-sm font-medium text-white drop-shadow-md leading-snug">
                    {memories[activeSlide].caption}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Thumbnails Filmstrip */}
            <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 pt-1">
              {memories.map((m, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    soundFx.playClick()
                    setActiveSlide(idx)
                  }}
                  aria-label={`View photo ${idx + 1}`}
                  className={`relative h-12 flex-1 min-w-[44px] max-w-[68px] overflow-hidden rounded-lg border transition-all cursor-pointer ${
                    activeSlide === idx
                      ? 'border-zinc-900 dark:border-white ring-2 ring-zinc-900/40 dark:ring-white/40 scale-105 shadow-md'
                      : 'border-transparent opacity-60 hover:opacity-100 hover:scale-102'
                  }`}
                >
                  <img src={m.img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Skills & Technologies Matrix (12 cols) — Compact, No Cards */}
          <div className="about-skills-matrix md:col-span-12 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/90 dark:bg-[#0c0c0e] p-5 sm:p-8 shadow-sm dark:shadow-none backdrop-blur-xl">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-500 mb-1">
                  <FiCpu size={13} className="text-zinc-900 dark:text-white" />
                  <span>Technical Arsenal</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  Skills &amp; Technologies
                </h4>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 self-start sm:self-center">
                <span className="rounded-full bg-black/[0.04] dark:bg-white/[0.05] px-3 py-1 border border-black/[0.06] dark:border-white/[0.08] text-[11px] sm:text-xs">
                  16 Technologies · 4 Disciplines
                </span>
              </div>
            </div>

            {/* Categorized Rows (Zero Cards) */}
            <div className="mt-5 sm:mt-6 space-y-4">
              {disciplines.map((disc, idx) => {
                const categorySkills = skillsList.filter((s) => s.category === disc.id)

                return (
                  <div
                    key={disc.id}
                    className={`flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-6 ${
                      idx !== 0 ? 'pt-3.5 sm:pt-4 border-t border-black/[0.04] dark:border-white/[0.04]' : ''
                    }`}
                  >
                    {/* Category Label */}
                    <div className="w-full sm:w-36 shrink-0 flex items-center justify-between sm:justify-start gap-2">
                      <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        {disc.label}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 bg-black/[0.03] dark:bg-white/[0.04] px-1.5 py-0.5 rounded">
                        {categorySkills.length}
                      </span>
                    </div>

                    {/* Skill Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      {categorySkills.map((skill) => {
                        const Icon = skill.icon
                        const isHovered = hoveredSkill?.name === skill.name

                        return (
                          <button
                            key={skill.name}
                            type="button"
                            onClick={() => {
                              soundFx.playClick()
                              setHoveredSkill((prev) => (prev?.name === skill.name ? null : skill))
                            }}
                            onMouseEnter={() => {
                              soundFx.playHover()
                              setHoveredSkill(skill)
                            }}
                            onMouseLeave={() => setHoveredSkill(null)}
                            className={`about-skill-pill group relative inline-flex items-center gap-1.5 sm:gap-2 rounded-lg border px-2.5 py-1.5 sm:px-3 sm:py-1.5 transition-all duration-200 cursor-pointer select-none active:scale-95 ${
                              isHovered
                                ? 'border-zinc-900/60 dark:border-white/60 bg-zinc-900/[0.07] dark:bg-white/[0.09] shadow-sm -translate-y-0.5'
                                : 'border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] hover:border-black/20 dark:hover:border-white/20'
                            }`}
                          >
                            <span
                              className="flex h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 items-center justify-center transition-transform group-hover:scale-110"
                              style={{ color: skill.color }}
                            >
                              <Icon size={14} />
                            </span>
                            <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                              {skill.name}
                            </span>
                            <span className="hidden md:inline-block font-mono text-[9px] text-zinc-400 dark:text-zinc-500">
                              {skill.tier}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Interactive Dynamic Inspector Status Bar */}
            <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between min-h-[44px]">
              {hoveredSkill ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2 text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span style={{ color: hoveredSkill.color }} className="shrink-0">
                      <hoveredSkill.icon size={15} />
                    </span>
                    <span className="font-bold text-zinc-900 dark:text-white">
                      {hoveredSkill.name}
                    </span>
                    <span className="rounded bg-black/[0.04] dark:bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-zinc-600 dark:text-zinc-400 shrink-0">
                      {hoveredSkill.tier}
                    </span>
                    <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">·</span>
                    <span className="text-zinc-600 dark:text-zinc-400 text-xs w-full sm:w-auto">
                      {hoveredSkill.focus}
                    </span>
                  </div>
                  {hoveredSkill.projects && hoveredSkill.projects.length > 0 && (
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500 shrink-0 pt-1 sm:pt-0">
                      <span>Deployed:</span>
                      <span className="text-zinc-800 dark:text-zinc-200 font-semibold">
                        {hoveredSkill.projects.join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 dark:text-zinc-500">
                  <FiCpu size={13} className="text-zinc-400 shrink-0" />
                  <span className="leading-snug">Tap or hover over any technology to inspect architectural focus and project deployments.</span>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {isLightboxOpen && typeof document !== 'undefined' &&
        createPortal(
          <div
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-2xl"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] max-w-5xl w-full flex flex-col items-center"
            >
              {/* Top bar with counter and close */}
              <div className="w-full flex items-center justify-between pb-3 text-white">
                <span className="font-mono text-xs text-zinc-300">
                  {activeSlide + 1} / {memories.length} — Ateneo de Davao Life
                </span>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick()
                    setIsLightboxOpen(false)
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-black transition-colors cursor-pointer text-white shadow-md"
                  aria-label="Close image preview"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Large high-res image view */}
              <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-black/80 shadow-2xl">
                <img
                  src={memories[activeSlide].img}
                  alt={memories[activeSlide].caption}
                  className="max-h-[75vh] w-auto max-w-full object-contain select-none"
                />

                {/* Left/Right buttons */}
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous image"
                  className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md transition hover:bg-white hover:text-black cursor-pointer shadow-xl"
                >
                  <FiChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next image"
                  className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md transition hover:bg-white hover:text-black cursor-pointer shadow-xl"
                >
                  <FiChevronRight size={18} />
                </button>
              </div>

              {/* Caption */}
              <p className="mt-3.5 text-center text-sm font-medium text-zinc-200 drop-shadow">
                {memories[activeSlide].caption}
              </p>
            </div>
          </div>,
          document.body
        )
      }
    </section>
  )
}
