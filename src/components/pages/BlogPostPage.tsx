import React, { useEffect, useRef } from 'react'
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
  theme = 'dark',
}: BlogPostPageProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll container to top on mount and set keyboard focus
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
      containerRef.current.focus({ preventScroll: true })
    }
  }, [post.id])

  // Prevent background body scroll while reading article and pause Lenis on main window
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis
    if (lenis) {
      lenis.stop()
    }
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
      if (lenis) {
        lenis.start()
      }
    }
  }, [])

  const handleShare = () => {
    soundFx.playClick()
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      alert('Blog link copied to clipboard!')
    }
  }

  return (
    <div
      ref={containerRef}
      data-lenis-prevent="true"
      tabIndex={-1}
      className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain outline-none bg-[var(--bg)] text-[var(--text)] selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-black"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      
      {/* ── Minimalist Top Navigation ── */}
      <header className="sticky top-0 z-50 w-full border-b border-black/[0.08] dark:border-white/[0.08] bg-white/85 dark:bg-black/85 backdrop-blur-xl px-4 sm:px-8 py-3.5">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <button
            type="button"
            onClick={() => {
              soundFx.playClick()
              onBack()
            }}
            className="group flex items-center gap-2 font-mono text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <FiArrowLeft className="transition-transform group-hover:-translate-x-1" size={14} />
            <span>Back to portfolio</span>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="relative h-6 w-6 overflow-hidden rounded border border-black/10 dark:border-white/20">
              <img src={logoImg} alt="Ivan Louie" className="h-full w-full object-cover" />
            </div>
            <span className="font-mono text-xs text-zinc-500 hidden sm:inline">malicsi.dev / hackathon-story</span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 px-3 py-1 font-mono text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition cursor-pointer"
            title="Copy article link"
          >
            <FiShare2 size={12} />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </header>

      {/* ── Article Content Container ── */}
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-20">
        
        {/* Article Header Metadata */}
        <Motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-zinc-500 mb-4">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-0.5 border border-emerald-500/20 font-semibold">
              <FiAward size={12} /> {post.timeBadge}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <FiCalendar size={12} /> {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <FiClock size={12} /> {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
            {post.title}
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            {post.subtitle}
          </p>

          {/* Author Card */}
          <div className="mt-6 flex items-center justify-between gap-4 pt-6 border-t border-black/[0.08] dark:border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono text-xs font-bold">
                ILM
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">{post.author.name}</p>
                <p className="text-[11px] sm:text-xs font-mono text-zinc-500">{post.author.affiliation}</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1 font-mono text-xs text-zinc-500">
              <FiMapPin size={12} />
              <span>Davao City</span>
            </div>
          </div>

          {/* Key Stat Counters */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {post.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.02] p-3 text-center"
              >
                <p className="text-base sm:text-lg font-bold font-mono text-zinc-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Motion.div>

        {/* Hero Photo Banner */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="my-10 overflow-hidden rounded-2xl sm:rounded-3xl border border-black/[0.08] dark:border-white/[0.1] bg-zinc-950 shadow-xl"
        >
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full max-h-[480px] object-cover object-center"
          />
          <div className="p-3.5 bg-zinc-50 dark:bg-[#0c0c0e] border-t border-black/[0.06] dark:border-white/[0.06] text-center">
            <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
              {post.heroCaption}
            </p>
          </div>
        </Motion.div>

        {/* ── Article Lead Quote ── */}
        <div className="my-8 border-l-2 border-emerald-500 pl-5 py-2">
          <p className="font-serif italic text-lg sm:text-xl text-zinc-800 dark:text-zinc-200 leading-relaxed">
            &ldquo;{post.excerpt}&rdquo;
          </p>
        </div>

        {/* ── Structured Chronological Chapters ── */}
        <article className="space-y-16 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {post.chapters.map((chapter) => (
            <section key={chapter.number} className="space-y-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
              {/* Timing Badge & Chapter Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider">
                  CHAPTER {chapter.number}
                </span>
                <span className="font-mono text-xs text-zinc-500">
                  {chapter.timing}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                {chapter.title}
              </h2>

              {/* Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                {chapter.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Chapter Illustration / Photo */}
              {chapter.image && (
                <div className="my-6 overflow-hidden rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-zinc-950">
                  <img
                    src={chapter.image}
                    alt={chapter.title}
                    className="w-full max-h-[380px] object-cover object-center"
                  />
                  {chapter.imageCaption && (
                    <div className="p-2.5 bg-zinc-50 dark:bg-[#0c0c0e] border-t border-black/[0.06] dark:border-white/[0.06] text-center">
                      <p className="text-xs font-mono text-zinc-500">
                        {chapter.imageCaption}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Key Chapter Highlight */}
              {chapter.keyHighlight && (
                <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] p-4 text-xs sm:text-sm font-mono text-zinc-700 dark:text-zinc-300">
                  <span className="text-emerald-500 mr-2">✦</span>
                  {chapter.keyHighlight}
                </div>
              )}
            </section>
          ))}

          {/* Key Engineering Takeaway Box */}
          <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6 sm:p-8 space-y-3">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <FiCheckCircle size={18} /> Core Engineering Takeaway
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-800 dark:text-zinc-200 font-medium">
              {post.keyTakeaway}
            </p>
          </section>

          {/* Quote Callout Banner */}
          <div className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-zinc-50 dark:bg-white/[0.02] p-6 text-center">
            <blockquote className="font-serif italic text-base sm:text-lg text-zinc-800 dark:text-zinc-200">
              &ldquo;{post.quote.text}&rdquo;
            </blockquote>
            <p className="font-mono text-xs text-zinc-500 mt-2">
              {post.quote.attribution}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-zinc-600 dark:text-zinc-400"
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
