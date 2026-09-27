import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiArrowRight } from 'react-icons/fi'
import { soundFx } from '../../utils/sound'
import { prefersReducedMotion } from '../../config/animation'
import { singleHackathonBlog } from '../../data/hackathonBlogData'

gsap.registerPlugin(ScrollTrigger)

interface HackathonJourneyProps {
  onOpenPost: (postId: string) => void
}

export default function HackathonJourney({ onOpenPost }: HackathonJourneyProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.blog-header-row',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.blog-header-row',
            start: 'top 92%',
            once: true,
          },
        }
      )

      gsap.fromTo(
        '.blog-post-row',
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.blog-post-row',
            start: 'top 90%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handlePostClick = () => {
    soundFx.playClick()
    onOpenPost(singleHackathonBlog.id)
  }

  return (
    <section ref={sectionRef} id="hackathon" className="relative px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        
        {/* ── Top Header Row (Matching 01 — blog / ALL POSTS → from reference) ── */}
        <div className="blog-header-row flex items-center justify-between pb-4">
          <div className="font-mono text-xs sm:text-sm text-zinc-500 tracking-wider">
            04 — blog
          </div>

          <button
            type="button"
            onClick={handlePostClick}
            className="group flex items-center gap-1.5 font-mono text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span>READ STORY</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

        {/* ── Single Hackathon Blog Minimalist Row ── */}
        <div className="blog-post-list border-t border-black/[0.08] dark:border-white/[0.08]">
          <article
            onClick={handlePostClick}
            onMouseEnter={() => soundFx.playHover()}
            className="blog-post-row group relative border-b border-black/[0.08] dark:border-white/[0.08] py-5 sm:py-6 cursor-pointer transition-colors hover:bg-black/[0.015] dark:hover:bg-white/[0.02] px-1 sm:px-2 rounded-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-6">
              
              {/* Left: Article Title */}
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors leading-snug">
                {singleHackathonBlog.title}
              </h3>

              {/* Right: Date & Arrow */}
              <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
                <span className="font-mono text-xs sm:text-sm text-zinc-500 dark:text-zinc-500">
                  {singleHackathonBlog.displayDate}
                </span>
                <FiArrowRight
                  size={13}
                  className="opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-zinc-400 dark:text-zinc-300 hidden sm:inline"
                />
              </div>
            </div>

            {/* Excerpt line */}
            <p className="mt-1.5 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
              {singleHackathonBlog.excerpt}
            </p>
          </article>
        </div>

      </div>
    </section>
  )
}
