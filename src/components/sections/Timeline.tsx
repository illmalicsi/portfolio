import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiChevronDown, FiMapPin } from 'react-icons/fi'
import { experience } from '../../data/portfolioData'
import { prefersReducedMotion } from '../../config/animation'
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
      // 1. Header reveal
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

      // 2. Animated Progress Line down the rail
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

      // 3. Staggered node dot & card entrance
      const items = containerRef.current?.querySelectorAll('.timeline-item-trigger')
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
              { opacity: 0, x: -20 },
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
    <section id="experience" className="relative px-4 py-24 sm:px-6 md:py-36 lg:px-8">
      <div ref={containerRef} className="mx-auto w-full max-w-5xl">
        
        {/* Header */}
        <div className="timeline-header mb-14">
          <p className="timeline-header-item font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">
            04 / Trajectory &amp; Leadership
          </p>
          <h2 className="timeline-header-item text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Experience &amp; Community.
          </h2>
          <p className="timeline-header-item mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-xl">
            Student governance committees, academic societies, and independent engineering milestones.
          </p>
        </div>

        {/* Vertical Timeline Rail */}
        <div ref={railRef} className="relative ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-6">
          {/* Static track */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-zinc-200 dark:bg-white/[0.1]" />
          
          {/* Dynamic GSAP Scrubbed Progress Line */}
          <div
            ref={progressLineRef}
            className="absolute left-0 top-0 bottom-0 w-[2px] -translate-x-[0.5px] origin-top bg-gradient-to-b from-zinc-900 via-zinc-600 to-zinc-400 dark:from-white dark:via-zinc-200 dark:to-zinc-400 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            style={{ transform: 'scaleY(0)' }}
          />

          {experience.map((item, index) => {
            const isExpanded = expandedIndex === index

            return (
              <div
                key={`${item.role}-${item.company}`}
                className="timeline-item-trigger relative"
              >
                {/* Timeline Node Dot */}
                <div
                  className={`timeline-node-dot absolute -left-[31px] sm:-left-[47px] top-4 h-3.5 w-3.5 rounded-full border-2 transition-all ${
                    isExpanded
                      ? 'border-zinc-900 bg-zinc-900 ring-4 ring-zinc-900/20 dark:border-white dark:bg-white dark:ring-white/20'
                      : 'border-zinc-400 bg-zinc-100 dark:border-white/40 dark:bg-black'
                  }`}
                />

                {/* Timeline Card */}
                <div
                  onClick={() => toggleExpand(index)}
                  data-cursor="pointer"
                  className={`timeline-card-content cursor-pointer rounded-2xl border p-6 backdrop-blur-xl transition-all duration-200 ${
                    isExpanded
                      ? 'border-zinc-900/20 dark:border-white/[0.22] bg-white dark:bg-[#0c0c0e] shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)]'
                      : 'border-black/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-[#0c0c0e]/60 hover:border-black/20 dark:hover:border-white/[0.15]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{item.badge}</span>
                        <span>·</span>
                        <span>{item.type}</span>
                      </div>

                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                        {item.role}
                      </h3>
                      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-0.5">
                        {item.company}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      <span>{item.period}</span>
                      <FiChevronDown
                        size={15}
                        className={`transition-transform duration-200 ${isExpanded ? 'rotate-180 text-zinc-900 dark:text-white' : 'text-zinc-400'}`}
                      />
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="mt-3 flex items-center gap-1.5 font-mono text-xs text-zinc-500">
                        <FiMapPin size={12} />
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
