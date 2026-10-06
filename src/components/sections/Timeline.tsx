import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiChevronDown, FiMapPin } from 'react-icons/fi'
import { experience } from '../../data/portfolioData'
import { prefersReducedMotion } from '../../config/motion'
import { soundFx } from '../../utils/sound'

gsap.registerPlugin(ScrollTrigger)

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)
  const [expandedIndex, setExpandedIndex] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      // 1. Header reveal animation
      gsap.fromTo(
        '.timeline-header-item',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.timeline-header',
            start: 'top 92%',
            once: true,
          },
        }
      )

      // 2. Animated Scrubbed Progress Line down the rail
      if (progressLineRef.current && railRef.current) {
        gsap.to(progressLineRef.current, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: railRef.current,
            start: 'top 75%',
            end: 'bottom 85%',
            scrub: 0.5,
          },
        })
      }

      // 3. Staggered node dot & card entrance animation
      const items = containerRef.current?.querySelectorAll<HTMLElement>('.timeline-item-trigger')
      if (items && items.length > 0) {
        items.forEach((item) => {
          const dot = item.querySelector('.timeline-node-dot')
          const card = item.querySelector('.timeline-card-content')

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              once: true,
            },
          })

          if (dot) {
            tl.fromTo(
              dot,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(2)', clearProps: 'all' }
            )
          }

          if (card) {
            tl.fromTo(
              card,
              { opacity: 0, x: -24 },
              { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', clearProps: 'all' },
              '-=0.25'
            )
          }
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const toggleExpand = (index: number) => {
    soundFx.playClick()
    setExpandedIndex(expandedIndex === index ? -1 : index)
  }

  return (
    <section
      id="experience"
      className="relative px-4 py-24 sm:px-8 md:py-32 lg:px-12 border-t border-hairline max-w-7xl mx-auto w-full select-none"
    >
      <div ref={containerRef} className="w-full">
        
        {/* ── Section Header with GSAP Reveal ── */}
        <div className="timeline-header mb-14 max-w-3xl">
          <div className="timeline-header-item flex items-center gap-2 mb-2 font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)]">
            <span>05 / TRAJECTORY &amp; LEADERSHIP</span>
            <span className="h-1 w-1 rounded-full bg-[var(--vermilion)]" />
            <span>COMMUNITY MILESTONES</span>
          </div>

          <h2 className="timeline-header-item font-display text-[clamp(1.35rem,2.4vw,1.85rem)] font-light text-[var(--text)] tracking-tight">
            Experience &amp; Community.
          </h2>

          <p className="timeline-header-item mt-2 text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed max-w-[58ch]">
            Student governance committees, academic societies, and independent engineering milestones.
          </p>
        </div>

        {/* ── Animated Vertical Timeline Rail ── */}
        <div ref={railRef} className="relative ml-2 sm:ml-5 pl-6 sm:pl-10 space-y-6">
          {/* Static Hairline Track */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[var(--hairline)]" />
          
          {/* Dynamic GSAP Scrubbed Progress Line */}
          <div
            ref={progressLineRef}
            className="absolute left-0 top-0 bottom-0 w-[2px] -translate-x-[0.5px] origin-top bg-[var(--vermilion)] shadow-[0_0_8px_rgba(232,66,31,0.5)]"
            style={{ transform: 'scaleY(0)' }}
          />

          {experience.map((item, index) => {
            const isExpanded = expandedIndex === index

            return (
              <div
                key={`${item.role}-${item.company}`}
                className="timeline-item-trigger relative"
              >
                {/* Animated Timeline Node Dot */}
                <div
                  className={`timeline-node-dot absolute -left-[31px] sm:-left-[47px] top-4.5 h-3.5 w-3.5 rounded-full border-2 transition-all duration-300 ${
                    isExpanded
                      ? 'border-[var(--vermilion)] bg-[var(--vermilion)] ring-4 ring-[var(--vermilion)]/20'
                      : 'border-[var(--text-muted)] bg-[var(--bg)]'
                  }`}
                />

                {/* Animated Interactive Timeline Card */}
                <div
                  onClick={() => toggleExpand(index)}
                  data-cursor="pointer"
                  className={`timeline-card-content cursor-pointer border rounded-xl hover:rounded-2xl p-5 sm:p-6 transition-all duration-300 ${
                    isExpanded
                      ? 'border-[var(--vermilion)] bg-[var(--bg)] shadow-md'
                      : 'border-hairline bg-[var(--text)]/[0.015] hover:border-[var(--text)]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5 font-mono text-[11px] text-[var(--text-muted)]">
                        <span className="text-[var(--vermilion)] font-semibold">{item.badge}</span>
                        <span>·</span>
                        <span>{item.type}</span>
                      </div>

                      <h3 className="font-display text-base sm:text-lg font-medium text-[var(--text)] tracking-tight">
                        {item.role}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-[var(--text-muted)] mt-0.5">
                        {item.company}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 text-xs font-mono text-[var(--text-muted)]">
                      <span>{item.period}</span>
                      <FiChevronDown
                        size={15}
                        className={`transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-[var(--vermilion)]' : 'text-[var(--text-muted)]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Expandable Content Area */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-hairline space-y-3">
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed max-w-[58ch]">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)]">
                        <FiMapPin size={12} className="text-[var(--vermilion)]" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
