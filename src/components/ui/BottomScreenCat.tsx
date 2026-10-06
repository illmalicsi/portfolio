import React, { useEffect, useRef, useState, useCallback } from 'react'
import { soundFx } from '../../utils/sound'
import { prefersReducedMotion } from '../../config/motion'

interface BottomScreenCatProps {
  theme?: 'dark' | 'light'
}

const IDLE_TIME_MS = 30000 // 30 seconds of inactivity

export default function BottomScreenCat({ theme = 'light' }: BottomScreenCatProps) {
  const [isIdle, setIsIdle] = useState(false)
  const [tag, setTag] = useState<{ text: string; x: number } | null>(null)
  const isHoveredRef = useRef(false)
  const [isSitting, setIsSitting] = useState(false)
  const idleTimerRef = useRef<number | null>(null)
  const reqRef = useRef<number | null>(null)

  // Cat position & animation state
  const catRef = useRef({
    x: 80,
    jumpY: 0,
    jumpVelocity: 0,
    frame: 0,
  })

  const [, setFrameTick] = useState(0)

  // ── 30-Second Inactivity Detector ──
  useEffect(() => {
    if (prefersReducedMotion()) return

    const resetIdleTimer = () => {
      // User is active: hide cat and reset countdown
      setIsIdle(false)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)

      idleTimerRef.current = window.setTimeout(() => {
        setIsIdle(true)
      }, IDLE_TIME_MS)
    }

    // Initialize timer
    resetIdleTimer()

    // Activity listeners
    window.addEventListener('mousemove', resetIdleTimer, { passive: true })
    window.addEventListener('keydown', resetIdleTimer, { passive: true })
    window.addEventListener('scroll', resetIdleTimer, { passive: true })
    window.addEventListener('touchstart', resetIdleTimer, { passive: true })

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      window.removeEventListener('mousemove', resetIdleTimer)
      window.removeEventListener('keydown', resetIdleTimer)
      window.removeEventListener('scroll', resetIdleTimer)
      window.removeEventListener('touchstart', resetIdleTimer)
    }
  }, [])

  // ── Click interaction: cute jump & subtle text tag ──
  const handleCatClick = useCallback(() => {
    soundFx.playClick()
    catRef.current.jumpVelocity = -4.5

    setTag({ text: 'meow', x: catRef.current.x })
    setTimeout(() => {
      setTag(null)
    }, 1100)
  }, [])

  // ── Walking Loop (Active only when idle) ──
  useEffect(() => {
    if (prefersReducedMotion() || !isIdle) return

    let frameCount = 0

    const updateLoop = () => {
      frameCount++
      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
      const cat = catRef.current

      if (isHoveredRef.current) {
        if (frameCount % 24 === 0) {
          cat.frame = (cat.frame + 1) % 4
        }
      } else {
        if (frameCount % 8 === 0) {
          cat.frame = (cat.frame + 1) % 4
        }

        if (cat.jumpY < 0 || cat.jumpVelocity !== 0) {
          cat.jumpY += cat.jumpVelocity
          cat.jumpVelocity += 0.35
          if (cat.jumpY >= 0) {
            cat.jumpY = 0
            cat.jumpVelocity = 0
          }
        }

        cat.x += 0.45

        if (cat.x > screenWidth + 70) {
          cat.x = -70
        }
      }

      setFrameTick((c) => (c + 1) % 1000)
      reqRef.current = requestAnimationFrame(updateLoop)
    }

    reqRef.current = requestAnimationFrame(updateLoop)

    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current)
    }
  }, [isIdle])

  if (!isIdle) return null

  const isDarkMode = theme === 'dark'
  const currentCat = catRef.current

  return (
    <div
      aria-hidden="true"
      className="fixed bottom-0 inset-x-0 z-40 h-12 pointer-events-none overflow-hidden select-none transition-opacity duration-500 opacity-100"
    >
      {/* ── Floating Minimalist Tag When Clicked ── */}
      {tag && (
        <div
          className="absolute -top-0.5 pointer-events-none border border-hairline bg-[var(--bg)] px-2 py-0.5 font-mono text-[9px] font-semibold text-[var(--text)] shadow-sm"
          style={{
            left: `${Math.max(12, tag.x + 14)}px`,
          }}
        >
          {tag.text}
        </div>
      )}

      {/* ── Idle Easter Egg Cat ── */}
      <div
        onClick={handleCatClick}
        onMouseEnter={() => {
          isHoveredRef.current = true
          setIsSitting(true)
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false
          setIsSitting(false)
        }}
        className="absolute bottom-0 cursor-pointer pointer-events-auto transition-transform active:scale-95 p-1 -m-1"
        style={{
          left: `${currentCat.x}px`,
          transform: `translateY(${currentCat.jumpY}px)`,
        }}
        title="Resting companion (leaves when active)"
      >
        <IllustratedChibiCat
          frame={currentCat.frame}
          isDark={isDarkMode}
          isSitting={isSitting}
        />
      </div>
    </div>
  )
}

function IllustratedChibiCat({
  frame,
  isDark,
  isSitting = false,
}: {
  frame: number
  isDark: boolean
  isSitting?: boolean
}) {
  const coat = isDark ? '#e2e8f0' : '#ffffff'
  const outline = isDark ? '#1e293b' : '#334155'
  const stripe = isDark ? '#94a3b8' : '#cbd5e1'
  const earPink = '#f472b6'
  const blush = '#f472b6'
  const eye = isDark ? '#0f172a' : '#1e293b'
  const shadow = isDark ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.12)'

  if (isSitting) {
    const breathOffset = frame % 2 === 0 ? 0 : 0.8

    return (
      <svg
        width="50"
        height="36"
        viewBox="0 0 62 44"
        className="overflow-visible"
        style={{
          transform: `translateY(${breathOffset}px)`,
          transition: 'transform 0.25s ease-out',
        }}
      >
        <ellipse cx="31" cy="41.5" rx="22" ry="2.5" fill={shadow} />
        <path
          d="M 17 38 C 11 38, 10 24, 18 16 C 24 10, 38 10, 44 16 C 52 24, 51 38, 45 38 C 39 39, 23 39, 17 38 Z"
          fill={coat}
          stroke={outline}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M 15 22 C 18 23, 21 23, 23 21" stroke={stripe} strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M 13 27 C 17 28, 20 28, 23 26" stroke={stripe} strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M 22 13 C 20 7, 23 4, 27 9 Z" fill={coat} stroke={outline} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M 23 11 C 22 8, 24 6, 26 9 Z" fill={earPink} />
        <path d="M 35 9 C 39 4, 42 7, 40 13 Z" fill={coat} stroke={outline} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M 36 9 C 38 6, 40 8, 39 11 Z" fill={earPink} />
        <circle cx="26" cy="18" r="2.4" fill={eye} />
        <circle cx="25.2" cy="17.2" r="0.8" fill="#ffffff" />
        <circle cx="36" cy="18" r="2.4" fill={eye} />
        <circle cx="35.2" cy="17.2" r="0.8" fill="#ffffff" />
        <ellipse cx="22" cy="21" rx="2.5" ry="1.5" fill={blush} opacity="0.65" />
        <ellipse cx="40" cy="21" rx="2.5" ry="1.5" fill={blush} opacity="0.65" />
        <ellipse cx="31" cy="20" rx="1.2" ry="0.9" fill={earPink} />
        <path
          d="M 29.2 21.2 C 29.8 22.5, 31 22.5, 31 21.2 C 31 22.5, 32.2 22.5, 32.8 21.2"
          stroke={outline}
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="28" cy="37" rx="3.5" ry="3" fill={coat} stroke={outline} strokeWidth="1.6" />
        <ellipse cx="34" cy="37" rx="3.5" ry="3" fill={coat} stroke={outline} strokeWidth="1.6" />
      </svg>
    )
  }

  const f = frame % 4
  const frontLegAngleA = f === 0 ? 14 : f === 1 ? -4 : f === 2 ? -14 : 4
  const frontLegAngleB = f === 0 ? -14 : f === 1 ? 4 : f === 2 ? 14 : -4
  const rearLegAngleA = f === 0 ? -12 : f === 1 ? 6 : f === 2 ? 12 : -6
  const rearLegAngleB = f === 0 ? 12 : f === 1 ? -6 : f === 2 ? -12 : 6
  const bodyBobY = f === 1 || f === 3 ? -1 : 0
  const tailSwishAngle = f % 2 === 0 ? 6 : -6

  return (
    <svg
      width="50"
      height="36"
      viewBox="0 0 62 44"
      className="overflow-visible"
      style={{
        transform: `translateY(${bodyBobY}px)`,
        transition: 'transform 0.12s ease-out',
      }}
    >
      <ellipse cx="31" cy="41" rx="21" ry="2.2" fill={shadow} />
      <g style={{ transformOrigin: '19px 33px', transform: `rotate(${rearLegAngleB}deg)` }}>
        <path d="M 17 32 C 16 35, 16 39, 18 40 C 20 40.5, 21 39, 21 35 C 21 32, 19 31, 17 32 Z" fill={stripe} stroke={outline} strokeWidth="1.6" />
      </g>
      <g style={{ transformOrigin: '38px 33px', transform: `rotate(${frontLegAngleB}deg)` }}>
        <path d="M 36 32 C 35 35, 35 39, 37 40 C 39 40.5, 40 39, 40 35 C 40 32, 38 31, 36 32 Z" fill={stripe} stroke={outline} strokeWidth="1.6" />
      </g>
      <g style={{ transformOrigin: '12px 28px', transform: `rotate(${tailSwishAngle}deg)` }}>
        <path d="M 12 28 C 6 26, 3 20, 6 15 C 8 12, 12 14, 11 18 C 10 22, 13 25, 15 28 Z" fill={coat} stroke={outline} strokeWidth="1.8" strokeLinejoin="round" />
      </g>
      <path
        d="M 17 25 C 12 25, 11 35, 18 36 C 26 37, 43 36, 48 30 C 51 25, 49 19, 43 17 C 36 15, 22 17, 17 25 Z"
        fill={coat}
        stroke={outline}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="44" cy="18" r="9.5" fill={coat} stroke={outline} strokeWidth="1.8" />
      <path d="M 37 13 C 35 7, 39 5, 42 10 Z" fill={coat} stroke={outline} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M 38 11 C 37 8, 39 7, 41 10 Z" fill={earPink} />
      <path d="M 46 9 C 49 5, 53 7, 51 13 Z" fill={coat} stroke={outline} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M 47 9 C 49 7, 51 8, 50 11 Z" fill={earPink} />
      <circle cx="41.5" cy="18" r="2.2" fill={eye} />
      <circle cx="40.8" cy="17.3" r="0.75" fill="#ffffff" />
      <circle cx="48.5" cy="18" r="2.2" fill={eye} />
      <circle cx="47.8" cy="17.3" r="0.75" fill="#ffffff" />
      <ellipse cx="38" cy="21" rx="2.2" ry="1.4" fill={blush} opacity="0.65" />
      <ellipse cx="51.5" cy="21" rx="2.2" ry="1.4" fill={blush} opacity="0.65" />
      <ellipse cx="45" cy="20" rx="1.1" ry="0.8" fill={earPink} />
      <path d="M 43.6 21 C 44.1 22, 45 22, 45 21 C 45 22, 45.9 22, 46.4 21" stroke={outline} strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <g style={{ transformOrigin: '21px 33px', transform: `rotate(${rearLegAngleA}deg)` }}>
        <path d="M 19 32 C 18 35, 18 39, 20 40 C 22 40.5, 23 39, 23 35 C 23 32, 21 31, 19 32 Z" fill={coat} stroke={outline} strokeWidth="1.6" />
      </g>
      <g style={{ transformOrigin: '40px 33px', transform: `rotate(${frontLegAngleA}deg)` }}>
        <path d="M 38 32 C 37 35, 37 39, 39 40 C 41 40.5, 42 39, 42 35 C 42 32, 40 31, 38 32 Z" fill={coat} stroke={outline} strokeWidth="1.6" />
      </g>
    </svg>
  )
}
