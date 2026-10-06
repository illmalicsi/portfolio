import { useState, useRef, useEffect } from 'react'
import { motion as Motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi'
import { soundFx } from '../../utils/sound'
import { PRIMARY_EASE_CURVE } from '../../config/motion'

export interface MemoryItem {
  img: string
  caption: string
}

interface CampusCarouselProps {
  memories: MemoryItem[]
  onSelectPhoto: (index: number) => void
}

export default function CampusCarousel({
  memories,
  onSelectPhoto,
}: CampusCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardStep, setCardStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const firstCardRef = useRef<HTMLDivElement>(null)

  // Measure card dimensions dynamically on mount and resize
  useEffect(() => {
    const measure = () => {
      if (firstCardRef.current) {
        const cardWidth = firstCardRef.current.offsetWidth
        const gap = 12 // gap-3 = 12px
        setCardStep(cardWidth + gap)
      }
    }

    measure()
    const resizeObserver = new ResizeObserver(measure)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    window.addEventListener('resize', measure)
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [memories.length])

  const maxIndex = memories.length - 1

  const handleNext = () => {
    soundFx.playClick()
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const handlePrev = () => {
    soundFx.playClick()
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const handleGoTo = (index: number) => {
    soundFx.playClick()
    setCurrentIndex(index)
  }

  const translateX = currentIndex * cardStep

  return (
    <div
      ref={containerRef}
      className="pt-6 border-t border-hairline space-y-3 select-none"
      aria-label="Campus Life Image Carousel"
    >
      {/* ── Carousel Header Controls ── */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
          <span>CAMPUS LIFE &amp; STUDENT COLLABORATIONS</span>
          <span className="h-1 w-1 rounded-full bg-[var(--vermilion)]" />
        </div>

        <div className="flex items-center gap-2.5">
          {/* Index Counter */}
          <span className="font-mono text-[11px] text-[var(--text-muted)] tabular-nums">
            {String(currentIndex + 1).padStart(2, '0')} / {String(memories.length).padStart(2, '0')}
          </span>

          {/* Previous / Next Arrow Buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              className="flex h-6 w-6 items-center justify-center border border-hairline text-[var(--text-muted)] hover:border-[var(--vermilion)] hover:text-[var(--vermilion)] transition-colors cursor-pointer"
              aria-label="Previous image"
              title="Previous image"
            >
              <FiChevronLeft size={13} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="flex h-6 w-6 items-center justify-center border border-hairline text-[var(--text-muted)] hover:border-[var(--vermilion)] hover:text-[var(--vermilion)] transition-colors cursor-pointer"
              aria-label="Next image"
              title="Next image"
            >
              <FiChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Carousel Viewport Track (Zero OS Scrollbar) ── */}
      <div className="relative w-full overflow-hidden">
        <Motion.div
          drag="x"
          dragConstraints={{ left: -maxIndex * cardStep, right: 0 }}
          onDragEnd={(_, { offset, velocity }) => {
            const swipeThreshold = 35
            const velocityThreshold = 350
            if (offset.x < -swipeThreshold || velocity.x < -velocityThreshold) {
              handleNext()
            } else if (offset.x > swipeThreshold || velocity.x > velocityThreshold) {
              handlePrev()
            }
          }}
          animate={{ x: -translateX }}
          transition={{
            duration: 0.42,
            ease: PRIMARY_EASE_CURVE,
          }}
          className="flex gap-3 cursor-grab active:cursor-grabbing will-change-transform"
        >
          {memories.map((photo, idx) => {
            const isActive = idx === currentIndex

            return (
              <div
                key={idx}
                ref={idx === 0 ? firstCardRef : undefined}
                onClick={() => onSelectPhoto(idx)}
                className={`group relative flex-shrink-0 w-[78%] sm:w-[calc(50%-6px)] aspect-[16/10] overflow-hidden rounded-xl hover:rounded-2xl border bg-[var(--bg)] transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'border-[var(--text)] shadow-sm'
                    : 'border-hairline hover:border-[var(--vermilion)] opacity-90 hover:opacity-100'
                }`}
              >
                <img
                  src={photo.img}
                  alt={photo.caption}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                  draggable={false}
                />

                {/* Bottom Caption Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-85 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2.5 text-white">
                  <p className="font-mono text-[9px] line-clamp-1 pr-2">
                    {photo.caption}
                  </p>
                  <span className="flex h-4.5 w-4.5 items-center justify-center border border-white/30 text-white/80 group-hover:border-white group-hover:text-white shrink-0 transition-colors">
                    <FiMaximize2 size={9} />
                  </span>
                </div>
              </div>
            )
          })}
        </Motion.div>
      </div>

      {/* ── Carousel Progress Bar & Indicator Navigation ── */}
      <div className="flex items-center justify-between pt-1 font-mono text-[9px] text-[var(--text-muted)]">
        {/* Pill Indicators */}
        <div className="flex items-center gap-1.5">
          {memories.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleGoTo(idx)}
              className={`h-1 transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentIndex
                  ? 'w-5 bg-[var(--vermilion)]'
                  : 'w-1.5 bg-[var(--hairline)] hover:bg-[var(--text-muted)]'
              }`}
              aria-label={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>

        <span>CLICK TO EXPAND LIGHTBOX</span>
      </div>
    </div>
  )
}
