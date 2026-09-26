import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import {
  FiAward,
  FiClock,
  FiUsers,
  FiCompass,
  FiChevronDown,
  FiMaximize2,
  FiX,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi'
import { hackathonPhases } from '../../data/portfolioData'
import { soundFx } from '../../utils/sound'
import nasaImg from '../../assets/nasa.jpeg'
import nasa1Img from '../../assets/nasa1.jpeg'
import nasa2Img from '../../assets/nasa2.jpeg'

const photos = [
  {
    src: nasa2Img,
    caption: 'Team Tala Verde · Official Presentation & Finalist Stage',
    badge: 'NASA Space Apps Davao',
  },
  {
    src: nasaImg,
    caption: 'Midnight Engineering Sprint · Telemetry & Data Integration',
    badge: 'Build Phase · 02:30 AM',
  },
  {
    src: nasa1Img,
    caption: 'Mentor Guidance, Architecture Validation & Pitch Polish',
    badge: 'Day 2 · Final Review',
  },
]

export default function HackathonJourney() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activePhotoIdx, setActivePhotoIdx] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxPhotoIdx, setLightboxPhotoIdx] = useState(0)

  const openLightbox = (idx: number) => {
    soundFx.playClick()
    setLightboxPhotoIdx(idx)
    setIsLightboxOpen(true)
  }

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return
      if (e.key === 'Escape') {
        setIsLightboxOpen(false)
      } else if (e.key === 'ArrowRight') {
        soundFx.playClick()
        setLightboxPhotoIdx((prev) => (prev + 1) % photos.length)
      } else if (e.key === 'ArrowLeft') {
        soundFx.playClick()
        setLightboxPhotoIdx((prev) => (prev - 1 + photos.length) % photos.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen])

  return (
    <section id="hackathon" className="relative px-4 py-24 sm:px-6 md:py-36 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">
            <FiAward size={13} className="text-emerald-500" />
            <span>04 / Competitive Sprints</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
            NASA Space Apps: Tala Verde.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            48 hours of intense pressure, satellite telemetry integration, and rapid full-stack engineering alongside six university peers at the world&apos;s largest global hackathon.
          </p>
        </div>

        {/* Highlight Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-10">
          <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white/80 dark:bg-[#0c0c0e]/80 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-mono text-xs mb-1">
              <FiClock size={13} className="text-amber-500" />
              <span>Duration</span>
            </div>
            <p className="text-2xl font-black text-zinc-900 dark:text-white">48 Hours</p>
            <p className="text-[11px] font-mono text-zinc-500 mt-0.5">Non-stop sprint</p>
          </div>

          <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white/80 dark:bg-[#0c0c0e]/80 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-mono text-xs mb-1">
              <FiUsers size={13} className="text-blue-500" />
              <span>Squad</span>
            </div>
            <p className="text-2xl font-black text-zinc-900 dark:text-white">6 Peers</p>
            <p className="text-[11px] font-mono text-zinc-500 mt-0.5">Team Tala Verde</p>
          </div>

          <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white/80 dark:bg-[#0c0c0e]/80 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-mono text-xs mb-1">
              <FiAward size={13} className="text-emerald-500" />
              <span>Recognition</span>
            </div>
            <p className="text-2xl font-black text-zinc-900 dark:text-white">Finalist</p>
            <p className="text-[11px] font-mono text-zinc-500 mt-0.5">Davao Local Chapter</p>
          </div>

          <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white/80 dark:bg-[#0c0c0e]/80 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-mono text-xs mb-1">
              <FiCompass size={13} className="text-purple-500" />
              <span>Domain</span>
            </div>
            <p className="text-2xl font-black text-zinc-900 dark:text-white">NASA Telemetry</p>
            <p className="text-[11px] font-mono text-zinc-500 mt-0.5">Open satellite data</p>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4 mb-10">
          
          {/* Main Hero Photo (7 cols) */}
          <div
            onClick={() => openLightbox(0)}
            className="md:col-span-7 group relative h-64 sm:h-80 md:h-96 overflow-hidden rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-zinc-900 cursor-pointer shadow-sm backdrop-blur-xl"
          >
            <img
              src={photos[0].src}
              alt={photos[0].caption}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
            
            <div className="absolute top-3 left-3">
              <span className="rounded-full bg-black/60 px-2.5 sm:px-3 py-1 font-mono text-[10px] sm:text-[11px] font-medium text-white backdrop-blur-md border border-white/10">
                {photos[0].badge}
              </span>
            </div>

            <div className="absolute top-3 right-3 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              <span className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 font-mono text-[10px] sm:text-[11px] font-semibold text-black shadow-md">
                <FiMaximize2 size={11} />
                <span>View Full</span>
              </span>
            </div>

            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 pointer-events-none">
              <p className="text-xs sm:text-sm font-semibold text-white drop-shadow-md leading-snug">
                {photos[0].caption}
              </p>
            </div>
          </div>

          {/* Secondary Photo Stack (5 cols) */}
          <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-3.5 sm:gap-4">
            {photos.slice(1).map((photo, idx) => {
              const photoIdx = idx + 1
              return (
                <div
                  key={photo.badge}
                  onClick={() => openLightbox(photoIdx)}
                  className="group relative h-36 sm:h-44 md:h-[184px] overflow-hidden rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-zinc-900 cursor-pointer shadow-sm backdrop-blur-xl"
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5">
                    <span className="rounded-full bg-black/60 px-2 py-0.5 font-mono text-[9px] sm:text-[10px] font-medium text-white backdrop-blur-md border border-white/10">
                      {photo.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 pointer-events-none">
                    <p className="text-[11px] sm:text-xs font-semibold text-white truncate drop-shadow-md">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>

        {/* 48-Hour Chronological Flight Log */}
        <div className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/90 dark:bg-[#0c0c0e] p-5 sm:p-8 backdrop-blur-xl shadow-sm dark:shadow-none">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-500 mb-1">
                <FiCompass size={13} className="text-emerald-500" />
                <span>Mission Telemetry &amp; Timeline</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                48-Hour Sprint Flight Log
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                The chronological trajectory from challenge briefing to final judging defense.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                soundFx.playClick()
                setIsExpanded((prev) => !prev)
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="inline-flex items-center gap-2 self-start sm:self-center rounded-full border border-black/[0.1] dark:border-white/[0.1] bg-black/[0.03] dark:bg-white/[0.04] px-4 py-2 font-mono text-xs font-medium text-zinc-800 dark:text-zinc-200 transition hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black cursor-pointer shadow-sm"
            >
              <span>{isExpanded ? 'Collapse Flight Log' : `Explore All 7 Phases`}</span>
              <FiChevronDown
                size={14}
                className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              />
            </button>
          </div>

          {/* Phase Cards */}
          <div className="mt-6 space-y-4">
            {(isExpanded ? hackathonPhases : hackathonPhases.slice(0, 3)).map((phase) => (
              <div
                key={phase.phase}
                className="group relative rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.015] dark:bg-white/[0.015] p-4 sm:p-5 transition hover:border-black/15 dark:hover:border-white/15"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {phase.timing}
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white">
                      {phase.title}
                    </h4>
                  </div>
                  <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider self-start sm:self-auto">
                    {phase.stat}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                  {phase.description}
                </p>

                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-black/[0.04] dark:border-white/[0.04]">
                  {phase.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-black/[0.03] dark:bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-zinc-600 dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Toggle Button at the bottom if collapsed */}
          {!isExpanded && (
            <div className="mt-4 pt-4 text-center">
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick()
                  setIsExpanded(true)
                }}
                className="font-mono text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition cursor-pointer"
              >
                + 4 more sprint phases (Deep Space, Re-entry, Landing &amp; Pitch, Constellation)
              </button>
            </div>
          )}

          {/* Tala Verde Quote */}
          <div className="mt-8 rounded-xl border border-zinc-900/10 dark:border-white/10 bg-zinc-900/[0.02] dark:bg-white/[0.02] p-5 sm:p-6 text-center">
            <blockquote className="font-serif italic text-base sm:text-lg text-zinc-800 dark:text-zinc-200">
              &ldquo;We did not wait for certainty. We built, shared, and looked up.&rdquo;
            </blockquote>
            <p className="font-mono text-xs text-zinc-500 mt-2">
              Team Tala Verde · NASA Space Apps Challenge Davao
            </p>
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
                  {lightboxPhotoIdx + 1} / {photos.length} — {photos[lightboxPhotoIdx].badge}
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
                  src={photos[lightboxPhotoIdx].src}
                  alt={photos[lightboxPhotoIdx].caption}
                  className="max-h-[75vh] w-auto max-w-full object-contain select-none"
                />

                {/* Left/Right buttons */}
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick()
                    setLightboxPhotoIdx((prev) => (prev - 1 + photos.length) % photos.length)
                  }}
                  aria-label="Previous image"
                  className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md transition hover:bg-white hover:text-black cursor-pointer shadow-xl"
                >
                  <FiChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick()
                    setLightboxPhotoIdx((prev) => (prev + 1) % photos.length)
                  }}
                  aria-label="Next image"
                  className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md transition hover:bg-white hover:text-black cursor-pointer shadow-xl"
                >
                  <FiChevronRight size={18} />
                </button>
              </div>

              {/* Caption */}
              <p className="mt-3.5 text-center text-sm font-medium text-zinc-200 drop-shadow">
                {photos[lightboxPhotoIdx].caption}
              </p>
            </div>
          </div>,
          document.body
        )
      }
    </section>
  )
}
