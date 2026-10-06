import { motion as Motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { soundFx } from '../../utils/sound'
import { singleHackathonBlog } from '../../data/hackathonBlogData'

interface HackathonJourneyProps {
  onOpenPost: (postId: string) => void
}

export default function HackathonJourney({ onOpenPost }: HackathonJourneyProps) {
  const handlePostClick = () => {
    soundFx.playClick()
    onOpenPost(singleHackathonBlog.id)
  }

  return (
    <section
      id="hackathon"
      className="relative px-4 py-24 sm:px-8 md:py-32 lg:px-12 border-t border-hairline max-w-7xl mx-auto w-full select-none"
    >
      <div className="w-full">
        {/* ── Section Header Row ── */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-hairline">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)]">
            <span>04 / CHRONICLE</span>
            <span className="h-1 w-1 rounded-full bg-[var(--vermilion)]" />
            <span>DISPATCH &amp; SPRINT</span>
          </div>

          <button
            type="button"
            onClick={handlePostClick}
            className="group flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--vermilion)] transition-colors cursor-pointer"
          >
            <span>READ ESSAY</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

        {/* ── Single Editorial Row with Shared layoutId ── */}
        <article
          onClick={handlePostClick}
          onMouseEnter={() => soundFx.playHover()}
          data-cursor="pointer"
          className="group relative p-6 sm:p-8 rounded-xl hover:rounded-2xl border border-transparent hover:border-hairline bg-transparent hover:bg-[var(--text)]/[0.015] cursor-pointer transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 sm:gap-8">
            {/* Title with Shared layoutId for Cinematic Transition */}
            <Motion.h3
              layoutId="hackathon-story-title"
              className="font-display text-base sm:text-lg md:text-[1.25rem] font-light text-[var(--text)] group-hover:text-[var(--vermilion)] transition-colors max-w-2xl leading-[1.25] tracking-tight"
            >
              {singleHackathonBlog.title}
            </Motion.h3>

            {/* Date & Indicator */}
            <div className="flex items-center gap-4 self-start md:self-auto shrink-0 pt-1 md:pt-0">
              <span className="font-mono text-xs text-[var(--text-muted)]">
                {singleHackathonBlog.displayDate} · {singleHackathonBlog.readTime}
              </span>
              <span className="flex h-7 w-7 items-center justify-center border border-hairline text-[var(--text-muted)] group-hover:border-[var(--vermilion)] group-hover:text-[var(--vermilion)] transition-colors">
                <FiArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>

          {/* Excerpt (compact text after heading) */}
          <p className="mt-3 text-xs sm:text-sm text-[var(--text-muted)] font-body line-clamp-2 max-w-[58ch] leading-relaxed">
            {singleHackathonBlog.excerpt}
          </p>
        </article>
      </div>
    </section>
  )
}
