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
  const [expandedIndex, setExpandedIndex] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll('.timeline-item-trigger')
      if (items && items.length > 0) {
        items.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, x: -35 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
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
        <div className="mb-14">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">
            04 / Trajectory &amp; Leadership
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Experience &amp; Community.
          </h2>
          <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-xl">
            Student governance committees, academic societies, and independent engineering milestones.
          </p>
        </div>

        {/* Vertical Timeline Rail */}
        <div className="relative border-l border-zinc-200 dark:border-white/[0.1] ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-6">
          {experience.map((item, index) => {
            const isExpanded = expandedIndex === index

            return (
              <div
                key={`${item.role}-${item.company}`}
                className="timeline-item-trigger relative"
              >
                {/* Timeline Node Dot */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-4 h-3.5 w-3.5 rounded-full border-2 transition-all ${
                    isExpanded
                      ? 'border-zinc-900 bg-zinc-900 ring-4 ring-zinc-900/20 dark:border-white dark:bg-white dark:ring-white/20'
                      : 'border-zinc-400 bg-zinc-100 dark:border-white/40 dark:bg-black'
                  }`}
                />

                {/* Timeline Card */}
                <div
                  onClick={() => toggleExpand(index)}
                  data-cursor="pointer"
                  className={`cursor-pointer rounded-2xl border p-6 backdrop-blur-xl transition-all duration-200 ${
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
