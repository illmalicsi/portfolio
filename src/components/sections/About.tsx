import { useState, useEffect, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import portraitImg from '../../assets/me-portrait.png'
import me1 from '../../assets/me1.jpeg'
import me2 from '../../assets/me2.jpeg'
import me3 from '../../assets/me3.jpeg'
import me4 from '../../assets/me4.jpeg'
import me5 from '../../assets/me5.jpeg'
import me6 from '../../assets/me6.jpeg'
import { aboutData, skillsList } from '../../data/portfolioData'
import { soundFx } from '../../utils/sound'
import { prefersReducedMotion } from '../../config/motion'
import CampusCarousel from '../ui/CampusCarousel'

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
  const [activePhotoIdx, setActivePhotoIdx] = useState(0)
  const [hoveredSkill, setHoveredSkill] = useState<typeof skillsList[0] | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const sectionRef = useRef<HTMLDivElement>(null)
  const portraitWrapRef = useRef<HTMLDivElement>(null)
  const portraitImgRef = useRef<HTMLImageElement>(null)
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const disciplines = [
    { id: 'frontend', label: 'Frontend Architecture' },
    { id: 'backend', label: 'Backend & Distributed Systems' },
    { id: 'ai', label: 'Machine Learning & AI' },
    { id: 'tools', label: 'DevOps, Cloud & Database' },
  ]

  // Tokenize intro into words for scroll-driven word-by-word opacity scrub
  const introWords = useMemo(() => {
    return aboutData.intro.split(' ')
  }, [])

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
      if (!isLightboxOpen) return
      if (e.key === 'Escape') {
        setIsLightboxOpen(false)
      } else if (e.key === 'ArrowRight') {
        soundFx.playClick()
        setActivePhotoIdx((prev) => (prev + 1) % memories.length)
      } else if (e.key === 'ArrowLeft') {
        soundFx.playClick()
        setActivePhotoIdx((prev) => (prev - 1 + memories.length) % memories.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen])

  // GSAP Animations: Portrait clip wipe & parallax, word-by-word scrub, animated counters
  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      // 1. Portrait slow clip-path wipe & parallax
      if (portraitWrapRef.current) {
        gsap.fromTo(
          portraitWrapRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.25,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: portraitWrapRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        )

        if (portraitImgRef.current) {
          gsap.fromTo(
            portraitImgRef.current,
            { scale: 1.05, y: -10 },
            {
              scale: 1,
              y: 10,
              ease: 'none',
              scrollTrigger: {
                trigger: portraitWrapRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          )
        }
      }

      // 2. Scroll-driven word-by-word opacity scrub
      if (paragraphRef.current) {
        const words = paragraphRef.current.querySelectorAll('.word-scrub')
        if (words.length > 0) {
          gsap.fromTo(
            words,
            { opacity: 0.2 },
            {
              opacity: 1,
              stagger: 0.04,
              ease: 'none',
              scrollTrigger: {
                trigger: paragraphRef.current,
                start: 'top 80%',
                end: 'bottom 45%',
                scrub: 0.4,
              },
            }
          )
        }
      }

      // 3. Large lightweight numerals animated counter numbers
      const statElements = statsRef.current?.querySelectorAll<HTMLElement>('.about-stat-num')
      if (statElements && statElements.length > 0) {
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: 'top 90%',
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
                  duration: 1.4,
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative px-4 py-20 sm:px-8 md:py-28 lg:px-12 border-t border-hairline max-w-7xl mx-auto w-full select-none"
    >
      <div className="w-full">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
            <span>02 / PHILOSOPHY &amp; PROFILE</span>
            <span className="h-1 w-1 rounded-full bg-[var(--vermilion)]" />
            <span>BIO // CREDENTIALS</span>
          </div>
          <h2 className="font-display text-[clamp(1.35rem,2.4vw,1.85rem)] font-light text-[var(--text)] tracking-tight">
            Engineering Craft &amp; Mindset.
          </h2>
        </div>

        {/* ── Calm Two-Column Editorial Spread ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ── Left Column: Portrait with Slow Clip-Path Wipe & Parallax (5 cols) ── */}
          <div className="lg:col-span-5 space-y-4">
            <div
              ref={portraitWrapRef}
              className="relative w-full aspect-[4/5] overflow-hidden rounded-xl hover:rounded-2xl border border-hairline bg-[var(--bg)] will-change-transform transition-all duration-500"
            >
              <img
                ref={portraitImgRef}
                src={portraitImg}
                alt="Ivan Louie Malicsi portrait"
                className="h-full w-full object-cover object-center will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-transparent opacity-30" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between font-mono text-[9px] text-[var(--text-muted)] border-t border-hairline pt-1.5">
                <span>FIG. 01 — PORTRAIT</span>
                <span>IVAN LOUIE MALICSI</span>
              </div>
            </div>

            {/* Quick Spec Folio */}
            <div className="border border-hairline rounded-xl hover:rounded-2xl transition-all duration-300 p-3.5 font-mono text-[10px] space-y-1.5 text-[var(--text-muted)]">
              <div className="flex justify-between border-b border-hairline pb-1">
                <span>AFFILIATION</span>
                <span className="text-[var(--text)]">Ateneo de Davao University</span>
              </div>
              <div className="flex justify-between border-b border-hairline pb-1">
                <span>PROGRAM</span>
                <span className="text-[var(--text)]">BS Computer Science (4th Year)</span>
              </div>
              <div className="flex justify-between">
                <span>FOCUS</span>
                <span className="text-[var(--text)]">Full-Stack &amp; Applied AI</span>
              </div>
            </div>
          </div>

          {/* ── Right Column: Narrative, Counters, Arsenal, Campus Carousel (7 cols) ── */}
          <div className="lg:col-span-7 space-y-9">
            
            {/* Scroll-Driven Word-by-Word Opacity Paragraph (Compact text after heading) */}
            <div className="space-y-4">
              <p
                ref={paragraphRef}
                className="text-xs sm:text-sm leading-relaxed text-[var(--text)] font-normal font-body max-w-[58ch]"
              >
                {introWords.map((word, idx) => (
                  <span
                    key={idx}
                    className="word-scrub inline-block opacity-20 will-change-[opacity]"
                  >
                    {word}&nbsp;
                  </span>
                ))}
              </p>

              {/* Philosophy blockquote with Instrument Serif emphasis */}
              <blockquote className="border-l-2 border-[var(--vermilion)] pl-3 py-0.5 text-xs sm:text-[13px] text-[var(--text-muted)] italic font-serif max-w-[58ch] leading-relaxed">
                &ldquo;{aboutData.philosophy}&rdquo;
              </blockquote>
            </div>

            {/* Compact Row of Large Lightweight Numerals */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-hairline"
            >
              {aboutData.stats.map((item) => (
                <div key={item.label} className="space-y-0.5">
                  <p
                    data-target={item.value}
                    className="about-stat-num text-2xl sm:text-3xl font-light font-display text-[var(--text)] tracking-tight tabular-nums"
                  >
                    {item.value}
                  </p>
                  <p className="font-mono text-[9px] sm:text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Technical Arsenal Grouped by Discipline (Compact) */}
            <div className="pt-6 border-t border-hairline space-y-4">
              <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-muted)]">
                <span className="uppercase tracking-wider">
                  TECHNICAL CAPABILITIES
                </span>
                <span>
                  HOVER TO INSPECT
                </span>
              </div>

              <div className="space-y-3.5">
                {disciplines.map((disc) => {
                  const categorySkills = skillsList.filter((s) => s.category === disc.id)

                  return (
                    <div key={disc.id} className="space-y-1.5 pb-2.5 border-b border-hairline">
                      <p className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                        {disc.label}
                      </p>

                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {categorySkills.map((skill) => {
                          const isHovered = hoveredSkill?.name === skill.name
                          const isAnyHovered = hoveredSkill !== null
                          const isDimmed = isAnyHovered && !isHovered

                          return (
                            <button
                              key={skill.name}
                              type="button"
                              onMouseEnter={() => {
                                soundFx.playHover()
                                setHoveredSkill(skill)
                              }}
                              onMouseLeave={() => setHoveredSkill(null)}
                              onClick={() => {
                                soundFx.playClick()
                                setHoveredSkill((prev) => (prev?.name === skill.name ? null : skill))
                              }}
                              className={`group font-body text-xs sm:text-[13px] transition-all duration-200 cursor-pointer text-left ${
                                isHovered
                                  ? 'text-[var(--text)] font-medium underline underline-offset-4 decoration-[var(--vermilion)]'
                                  : isDimmed
                                  ? 'opacity-30 text-[var(--text-muted)]'
                                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                              }`}
                            >
                              <span>{skill.name}</span>
                              <span className="text-hairline ml-2.5 text-[10px]">/</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Quiet Inline Reveal Drawer */}
              <div className="min-h-[40px] pt-1 font-mono text-[11px] text-[var(--text-muted)] border-l border-hairline pl-2.5">
                {hoveredSkill ? (
                  <div className="space-y-0.5">
                    <p className="text-[var(--text)]">
                      <span className="font-semibold text-[var(--vermilion)]">{hoveredSkill.name}</span> — {hoveredSkill.focus}
                    </p>
                    {hoveredSkill.projects && hoveredSkill.projects.length > 0 && (
                      <p className="text-[var(--text-muted)] text-[10px]">
                        Deployed in: {hoveredSkill.projects.join(', ')}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-[var(--text-muted)]">
                    Hover any technology to inspect architectural focus and deployments.
                  </p>
                )}
              </div>
            </div>

            {/* ── Campus Life Image Carousel (Zero OS Scrollbar) ── */}
            <CampusCarousel
              memories={memories}
              onSelectPhoto={(idx) => {
                soundFx.playClick()
                setActivePhotoIdx(idx)
                setIsLightboxOpen(true)
              }}
            />

          </div>

        </div>

      </div>

      {/* ── Fullscreen Photo Lightbox Modal ── */}
      {isLightboxOpen && typeof document !== 'undefined' &&
        createPortal(
          <div
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-xl"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] max-w-5xl w-full flex flex-col items-center"
            >
              <div className="w-full flex items-center justify-between pb-3 text-white">
                <span className="font-mono text-xs text-white/70">
                  {activePhotoIdx + 1} / {memories.length} — Ateneo de Davao Life
                </span>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick()
                    setIsLightboxOpen(false)
                  }}
                  className="flex h-8 w-8 items-center justify-center border border-white/20 bg-white/10 hover:bg-white hover:text-black transition-colors cursor-pointer text-white"
                  aria-label="Close image preview"
                >
                  <FiX size={16} />
                </button>
              </div>

              <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden border border-white/10 bg-black">
                <img
                  src={memories[activePhotoIdx].img}
                  alt={memories[activePhotoIdx].caption}
                  className="max-h-[75vh] w-auto max-w-full object-contain select-none"
                />

                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick()
                    setActivePhotoIdx((prev) => (prev - 1 + memories.length) % memories.length)
                  }}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md transition hover:bg-white hover:text-black cursor-pointer"
                >
                  <FiChevronLeft size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick()
                    setActivePhotoIdx((prev) => (prev + 1) % memories.length)
                  }}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md transition hover:bg-white hover:text-black cursor-pointer"
                >
                  <FiChevronRight size={16} />
                </button>
              </div>

              <p className="mt-3 text-center text-xs sm:text-sm font-medium text-white/80 font-mono">
                {memories[activePhotoIdx].caption}
              </p>
            </div>
          </div>,
          document.body
        )
      }
    </section>
  )
}
