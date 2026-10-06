import { useState, useEffect } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { PRIMARY_EASE_CURVE, prefersReducedMotion } from '../../config/motion'

interface PreloaderProps {
  onComplete: () => void
  theme?: 'dark' | 'light'
}

const STORAGE_KEY = 'ilm_portfolio_preloader_seen'

export default function Preloader({ onComplete, theme = 'light' }: PreloaderProps) {
  const [shouldRun, setShouldRun] = useState(false)
  const [count, setCount] = useState(0)
  const [isLifting, setIsLifting] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // If preloader was already seen in this session or user prefers reduced motion, skip
    const hasSeen = window.sessionStorage.getItem(STORAGE_KEY)
    if (hasSeen === 'true' || prefersReducedMotion()) {
      onComplete()
      setIsDone(true)
      return
    }

    setShouldRun(true)

    // Halt Lenis scrolling during preloader
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis
    if (lenis && typeof lenis.stop === 'function') {
      lenis.stop()
    }

    // Smooth counter from 0 to 100 over ~850ms
    const startTime = performance.now()
    const totalDuration = 850

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(1, elapsed / totalDuration)
      const easedProgress = Math.pow(progress, 0.85)
      setCount(Math.floor(easedProgress * 100))

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      } else {
        setCount(100)
        setTimeout(() => {
          setIsLifting(true)
        }, 80)
      }
    }

    const frameId = requestAnimationFrame(updateCounter)

    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [onComplete])

  const handleAnimationComplete = () => {
    window.sessionStorage.setItem(STORAGE_KEY, 'true')
    setIsDone(true)
    onComplete()

    // Resume Lenis
    const lenis = (window as unknown as { __lenis?: { start: () => void } }).__lenis
    if (lenis && typeof lenis.start === 'function') {
      lenis.start()
    }
  }

  if (isDone || !shouldRun) return null

  const isLight = theme === 'light'
  const bgColor = isLight ? '#F4F1EA' : '#121110'
  const strokeColor = isLight ? '#111110' : '#F4F1EA'
  const countColor = isLight ? '#666560' : '#8A8780'
  const accentColor = '#E8421F'

  return (
    <AnimatePresence>
      <Motion.div
        key="preloader-overlay"
        initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        animate={
          isLifting
            ? { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }
            : { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
        }
        transition={{
          duration: 0.45,
          ease: PRIMARY_EASE_CURVE,
        }}
        onAnimationComplete={() => {
          if (isLifting) {
            handleAnimationComplete()
          }
        }}
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center select-none pointer-events-auto"
        style={{ backgroundColor: bgColor }}
      >
        <div className="flex flex-col items-center justify-center">
          {/* ── Monogram SVG Stroke Animation ("ILM") ── */}
          <div className="relative h-20 w-44 sm:h-24 sm:w-52">
            <svg
              viewBox="0 0 180 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full overflow-visible"
            >
              {/* Letter I */}
              <Motion.path
                d="M 28 16 L 28 74"
                stroke={strokeColor}
                strokeWidth="3.2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.65, ease: PRIMARY_EASE_CURVE }}
              />

              {/* Letter L */}
              <Motion.path
                d="M 58 16 L 58 74 L 88 74"
                stroke={strokeColor}
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.75, delay: 0.1, ease: PRIMARY_EASE_CURVE }}
              />

              {/* Letter M */}
              <Motion.path
                d="M 112 74 L 112 16 L 136 50 L 160 16 L 160 74"
                stroke={strokeColor}
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.85, delay: 0.15, ease: PRIMARY_EASE_CURVE }}
              />
            </svg>
          </div>

          {/* ── 00 to 100 Counter in JetBrains Mono ── */}
          <div className="mt-6 flex items-center gap-2">
            <span
              className="font-mono text-xs sm:text-sm font-medium tracking-widest tabular-nums"
              style={{ color: countColor }}
            >
              {String(count).padStart(3, '0')}%
            </span>
            <div
              className="h-1.5 w-1.5 rounded-full animate-ping"
              style={{ backgroundColor: accentColor }}
            />
          </div>
        </div>
      </Motion.div>
    </AnimatePresence>
  )
}
