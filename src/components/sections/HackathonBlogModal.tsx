import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { FiX, FiClock, FiCalendar, FiTag, FiBookOpen, FiUser, FiCheckCircle } from 'react-icons/fi'
import { soundFx } from '../../utils/sound'
import type { HackathonBlogPost } from '../../data/hackathonBlogData'

interface HackathonBlogModalProps {
  post: HackathonBlogPost | null
  onClose: () => void
}

export default function HackathonBlogModal({ post, onClose }: HackathonBlogModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock background scroll and halt Lenis while modal is active
  useEffect(() => {
    if (post) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis
      if (lenis && typeof lenis.stop === 'function') {
        lenis.stop()
      }

      return () => {
        document.body.style.overflow = originalOverflow
        if (lenis && typeof lenis.start === 'function') {
          lenis.start()
        }
      }
    }
  }, [post])

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && post) {
        soundFx.playClick()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [post, onClose])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {post && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-hidden"
        >
          {/* Blurred Backdrop */}
          <Motion.div
            key="blog-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            onClick={() => {
              soundFx.playClick()
              onClose()
            }}
            className="fixed inset-0 bg-black/65 dark:bg-black/85 backdrop-blur-md dark:backdrop-blur-xl z-[110]"
          />

          {/* Modal Container */}
          <Motion.div
            key="blog-window"
            data-lenis-prevent
            onWheel={(e: React.WheelEvent) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{
              type: 'spring',
              damping: 28,
              stiffness: 350,
              mass: 0.7,
            }}
            className="relative my-auto max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-2xl sm:rounded-3xl border border-black/[0.1] dark:border-white/[0.14] bg-white dark:bg-[#0c0c0e] shadow-[0_30px_90px_rgba(0,0,0,0.3)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col z-[111]"
          >
            {/* Top Bar Header */}
            <div className="flex items-center justify-between border-b border-black/[0.08] dark:border-white/[0.08] px-6 py-4 bg-zinc-50 dark:bg-zinc-900/60 backdrop-blur-md flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400 font-medium tracking-wider">
                  DISPATCH // {post.category.toUpperCase()}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundFx.playClick()
                  onClose()
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.1] dark:border-white/[0.1] bg-black/[0.04] dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 transition hover:border-black/30 dark:hover:border-white/30 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                aria-label="Close article"
              >
                <FiX size={15} />
              </button>
            </div>

            {/* Scrollable Article Body */}
            <div
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              className="overflow-y-auto p-6 md:p-8 space-y-7 overscroll-contain flex-1 min-h-0"
            >
              {/* Article Header */}
              <div>
                <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs text-zinc-500 mb-3">
                  <span className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold px-2.5 py-0.5 border border-emerald-500/20">
                    {post.timeBadge}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCalendar size={12} /> {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <FiClock size={12} /> {post.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                  {post.subtitle}
                </p>

                {/* Byline */}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-xs font-bold">
                    ILM
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-white">{post.author.name}</p>
                    <p className="text-[11px] font-mono text-zinc-500">{post.author.role}</p>
                  </div>
                </div>
              </div>

              {/* Photo Showcase */}
              <div className="overflow-hidden rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-zinc-950">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full max-h-[360px] object-cover object-center"
                />
                <div className="p-3 bg-zinc-100 dark:bg-[#121216] border-t border-black/[0.06] dark:border-white/[0.06] text-center">
                  <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
                    {post.imageCaption}
                  </p>
                </div>
              </div>

              {/* Editorial Sections */}
              <div className="space-y-6 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                
                {/* 1. The Challenge */}
                <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] p-5">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold mb-2 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> 01 / The Core Challenge
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {post.content.challenge}
                  </p>
                </div>

                {/* 2. System Architecture */}
                <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] p-5">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold mb-2 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> 02 / Architectural Execution
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {post.content.architecture}
                  </p>
                </div>

                {/* 3. The Breakthrough */}
                <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] p-5">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold mb-2 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> 03 / The Sprint Breakthrough
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {post.content.breakthrough}
                  </p>
                </div>

                {/* 4. Core Takeaway */}
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold mb-2 flex items-center gap-1.5">
                    <FiCheckCircle size={13} /> 04 / Engineering Retrospective
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 font-medium">
                    {post.content.takeaway}
                  </p>
                </div>

              </div>

              {/* Tala Verde Quote Callout */}
              <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-zinc-50 dark:bg-zinc-900/60 p-5 text-center">
                <blockquote className="font-serif italic text-sm sm:text-base text-zinc-800 dark:text-zinc-200">
                  &ldquo;We did not wait for certainty. We built, shared, and looked up.&rdquo;
                </blockquote>
                <p className="font-mono text-[11px] text-zinc-500 mt-1.5">
                  Team Tala Verde · NASA Space Apps Challenge Davao
                </p>
              </div>

              {/* Tags Footer */}
              <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] text-zinc-400 flex items-center gap-1 mr-1">
                  <FiTag size={11} /> Tags:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.03] dark:bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-zinc-600 dark:text-zinc-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

            </div>
          </Motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
