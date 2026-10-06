import { useEffect, useRef, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import {
  FiArrowLeft,
  FiClock,
  FiCalendar,
  FiMapPin,
  FiCheckCircle,
  FiShare2,
  FiAward,
} from 'react-icons/fi'
import { soundFx } from '../../utils/sound'
import { SHARED_SPRING } from '../../config/motion'
import type { HackathonBlogPost } from '../../data/hackathonBlogData'
import logoImg from '../../assets/logo.jpg'

interface BlogPostPageProps {
  post: HackathonBlogPost
  onBack: () => void
  onSelectPost?: (id: string) => void
  theme?: 'dark' | 'light'
}

export default function BlogPostPage({
  post,
  onBack,
}: BlogPostPageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [readProgress, setReadProgress] = useState(0)
  const [copied, setCopied] = useState(false)

  // Scroll container to top on mount
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
      containerRef.current.focus({ preventScroll: true })
    }
  }, [post.id])

  // Track reading progress inside scrollable container
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleScroll = () => {
      const scrollable = el.scrollHeight - el.clientHeight
      if (scrollable > 0) {
        setReadProgress(Math.min(1, Math.max(0, el.scrollTop / scrollable)))
      }
    }

    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent background body scroll & pause Lenis while reading
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis
    if (lenis && typeof lenis.stop === 'function') {
      lenis.stop()
    }
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
      if (lenis && typeof lenis.start === 'function') {
        lenis.start()
      }
    }
  }, [])

  // Pressing Escape returns to the home page
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundFx.playClick()
        onBack()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onBack])

  const handleShare = () => {
    soundFx.playClick()
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div
      ref={containerRef}
      data-lenis-prevent="true"
      tabIndex={-1}
      className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain outline-none bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--vermilion)] selection:text-white"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* ── Thin Reading-Progress Line at Top of Reader ── */}
      <div className="fixed top-0 left-0 right-0 z-[110] h-[2px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-[var(--vermilion)] origin-left transition-all duration-75"
          style={{ transform: `scaleX(${readProgress})` }}
        />
      </div>

      {/* ── Minimalist Top Navigation ── */}
      <header className="sticky top-0 z-50 w-full border-b border-hairline bg-[var(--bg)]/90 backdrop-blur-md px-4 sm:px-8 py-3.5">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <button
            type="button"
            onClick={() => {
              soundFx.playClick()
              onBack()
            }}
            className="group flex items-center gap-2 font-mono text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
          >
            <FiArrowLeft className="transition-transform group-hover:-translate-x-1" size={13} />
            <span>← RETURN [ESC]</span>
          </button>

          <div className="flex items-center gap-2.5 font-mono text-xs text-[var(--text-muted)]">
            <div className="relative h-5 w-5 overflow-hidden rounded border border-hairline">
              <img src={logoImg} alt="Ivan Louie Logo" className="h-full w-full object-cover" />
            </div>
            <span className="font-semibold text-[var(--text)]">CHRONICLE</span>
            <span>/</span>
            <span>DISPATCH № 01</span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 border border-hairline px-3 py-1 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--text)] transition cursor-pointer"
            title="Copy article link"
          >
            <FiShare2 size={11} />
            <span>{copied ? 'COPIED' : 'SHARE'}</span>
          </button>
        </div>
      </header>

      {/* ── Article Content Container ── */}
      <main className="mx-auto max-w-3xl px-4 sm:px-8 py-12 sm:py-20 select-none">
        
        {/* Article Header Metadata */}
        <div>
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--text-muted)] mb-5">
            <span className="inline-flex items-center gap-1 text-[var(--vermilion)] font-semibold">
              <FiAward size={12} /> {post.timeBadge}
            </span>
            <span>/</span>
            <span className="flex items-center gap-1">
              <FiCalendar size={12} /> {post.date}
            </span>
            <span>/</span>
            <span className="flex items-center gap-1">
              <FiClock size={12} /> {post.readTime}
            </span>
          </div>

          {/* Cinematic Title Scaling Up via Shared layoutId */}
          <Motion.h1
            layoutId="hackathon-story-title"
            transition={SHARED_SPRING}
            className="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-light text-[var(--text)] tracking-tight leading-[1.12]"
          >
            {post.title}
          </Motion.h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed font-body">
            {post.subtitle}
          </p>

          {/* Author Folio */}
          <div className="mt-6 flex items-center justify-between gap-4 pt-4 border-t border-hairline font-mono text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-3">
              <div className="relative h-7 w-7 overflow-hidden rounded border border-hairline">
                <img src={logoImg} alt="Ivan Louie" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-semibold text-[var(--text)]">{post.author.name}</p>
                <p className="text-[10px]">{post.author.affiliation}</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1">
              <FiMapPin size={11} />
              <span>DAVAO CITY, PH</span>
            </div>
          </div>

          {/* Key Stat Counters */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-hairline py-4">
            {post.stats.map((stat) => (
              <div key={stat.label} className="text-center font-mono">
                <p className="text-lg font-light text-[var(--text)]">
                  {stat.value}
                </p>
                <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Photo Banner */}
        <div className="my-10 overflow-hidden border border-hairline bg-[var(--bg)]">
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full max-h-[460px] object-cover object-center"
          />
          <div className="p-3 border-t border-hairline text-center">
            <p className="text-[11px] font-mono text-[var(--text-muted)]">
              {post.heroCaption}
            </p>
          </div>
        </div>

        {/* Article Lead Quote with Instrument Serif italic */}
        <div className="my-8 border-l-2 border-[var(--vermilion)] pl-5 py-2">
          <p className="font-serif italic text-lg sm:text-xl text-[var(--text)] leading-relaxed">
            &ldquo;{post.excerpt}&rdquo;
          </p>
        </div>

        {/* Structured Chronological Chapters */}
        <article className="space-y-14 text-base sm:text-[1.0625rem] text-[var(--text)] leading-relaxed font-body">
          {post.chapters.map((chapter) => (
            <section key={chapter.number} className="space-y-4 pt-6 border-t border-hairline">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 font-mono text-xs text-[var(--text-muted)]">
                <span>CHAPTER {chapter.number}</span>
                <span>{chapter.timing}</span>
              </div>

              <h2 className="font-display text-xl sm:text-2xl font-normal tracking-tight text-[var(--text)]">
                {chapter.title}
              </h2>

              <div className="space-y-4 text-base sm:text-[1.0625rem] leading-[1.75] text-[var(--text-muted)] max-w-[65ch]">
                {chapter.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {chapter.image && (
                <div className="my-6 overflow-hidden border border-hairline bg-[var(--bg)]">
                  <img
                    src={chapter.image}
                    alt={chapter.title}
                    className="w-full max-h-[380px] object-cover object-center"
                  />
                  {chapter.imageCaption && (
                    <div className="p-2.5 border-t border-hairline text-center">
                      <p className="text-[11px] font-mono text-[var(--text-muted)]">
                        {chapter.imageCaption}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {chapter.keyHighlight && (
                <div className="border border-hairline p-4 text-xs font-mono text-[var(--text-muted)]">
                  <span className="text-[var(--vermilion)] mr-2">✦</span>
                  {chapter.keyHighlight}
                </div>
              )}
            </section>
          ))}

          {/* Key Engineering Takeaway Box */}
          <section className="border border-hairline p-6 sm:p-8 space-y-2 bg-[var(--text)]/[0.02]">
            <h2 className="text-base font-display font-medium text-[var(--text)] flex items-center gap-2">
              <FiCheckCircle size={15} className="text-[var(--vermilion)]" /> Core Engineering Takeaway
            </h2>
            <p className="text-sm leading-relaxed text-[var(--text-muted)] font-body">
              {post.keyTakeaway}
            </p>
          </section>

          {/* Quote Callout Banner */}
          <div className="border border-hairline p-6 text-center">
            <blockquote className="font-serif italic text-base sm:text-lg text-[var(--text)]">
              &ldquo;{post.quote.text}&rdquo;
            </blockquote>
            <p className="font-mono text-xs text-[var(--text-muted)] mt-2">
              {post.quote.attribution}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="border border-hairline px-2.5 py-1 font-mono text-[11px] text-[var(--text-muted)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>

      </main>
    </div>
  )
}
