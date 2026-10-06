import { useEffect, useRef, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { PRIMARY_EASE_CURVE, prefersReducedMotion, isTouchDevice } from '../../config/motion'

interface KineticHeadlineProps {
  startAnimation?: boolean
  theme?: 'dark' | 'light'
}

interface CharRefData {
  element: HTMLSpanElement
  currentWeight: number
  targetWeight: number
}

interface WordConfig {
  text: string
  isSerif?: boolean
}

const WORDS: WordConfig[] = [
  { text: 'Building' },
  { text: 'modern' },
  { text: 'software' },
  { text: 'with' },
  { text: 'precision', isSerif: true },
  { text: 'and' },
  { text: 'craft.', isSerif: true },
]

const RESTING_WEIGHT = 300
const MAX_WEIGHT = 650
const INTERACTION_RADIUS = 130

export default function KineticHeadline({ startAnimation = true }: KineticHeadlineProps) {
  const containerRef = useRef<HTMLHeadingElement>(null)
  const charRefs = useRef<CharRefData[]>([])
  const mousePos = useRef<{ x: number; y: number } | null>(null)
  const animFrameId = useRef<number | null>(null)
  const [canAnimateWeight, setCanAnimateWeight] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (prefersReducedMotion() || isTouchDevice()) {
      setCanAnimateWeight(false)
      return
    }
    setCanAnimateWeight(true)
  }, [])

  // Variable font weight RAF loop
  useEffect(() => {
    if (!canAnimateWeight) return

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      mousePos.current = null
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    const updateWeights = () => {
      const curMouse = mousePos.current

      charRefs.current.forEach((item) => {
        if (!item?.element) return

        if (!curMouse) {
          item.targetWeight = RESTING_WEIGHT
        } else {
          const rect = item.element.getBoundingClientRect()
          const charCenterX = rect.left + rect.width / 2
          const charCenterY = rect.top + rect.height / 2
          const dist = Math.hypot(curMouse.x - charCenterX, curMouse.y - charCenterY)

          if (dist < INTERACTION_RADIUS) {
            const factor = 1 - dist / INTERACTION_RADIUS
            item.targetWeight = RESTING_WEIGHT + factor * (MAX_WEIGHT - RESTING_WEIGHT)
          } else {
            item.targetWeight = RESTING_WEIGHT
          }
        }

        // Smooth physics lerp
        item.currentWeight += (item.targetWeight - item.currentWeight) * 0.16
        const roundedWeight = Math.round(item.currentWeight)
        item.element.style.fontWeight = `${roundedWeight}`
      })

      animFrameId.current = requestAnimationFrame(updateWeights)
    }

    animFrameId.current = requestAnimationFrame(updateWeights)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
    }
  }, [canAnimateWeight])

  const registerChar = (el: HTMLSpanElement | null, idx: number) => {
    if (!el) return
    charRefs.current[idx] = {
      element: el,
      currentWeight: RESTING_WEIGHT,
      targetWeight: RESTING_WEIGHT,
    }
  }

  let globalCharIndex = 0

  return (
    <h1
      ref={containerRef}
      className="text-left font-display font-light text-[clamp(1.4rem,2.7vw,2.2rem)] leading-[1.16] tracking-[-0.02em] text-[var(--text)] select-none max-w-2xl"
      style={{ textWrap: 'balance' }}
    >
      {WORDS.map((wordItem, wordIdx) => {
        const letters = wordItem.text.split('')
        const isSerif = wordItem.isSerif

        return (
          <span key={wordIdx} className="inline">
            {/* Word Wrapper: strictly nowrap so line breaks NEVER happen inside words */}
            <span className="inline-block overflow-hidden align-baseline py-1">
              <Motion.span
                className="inline-block will-change-transform"
                style={{ whiteSpace: 'nowrap' }}
                initial={{ y: '105%' }}
                animate={startAnimation ? { y: '0%' } : { y: '105%' }}
                transition={{
                  duration: 0.75,
                  delay: 0.08 + wordIdx * 0.045,
                  ease: PRIMARY_EASE_CURVE,
                }}
              >
                {letters.map((char, charIdx) => {
                  const currentIdx = globalCharIndex++
                  return (
                    <span
                      key={charIdx}
                      ref={(el) => registerChar(el, currentIdx)}
                      className={`inline-block transition-[font-weight] duration-75 ${
                        isSerif
                          ? 'font-serif italic font-normal text-[1.1em] text-[var(--text)]'
                          : ''
                      }`}
                      style={{
                        fontWeight: isSerif
                          ? undefined
                          : canAnimateWeight
                          ? RESTING_WEIGHT
                          : 300,
                      }}
                    >
                      {char}
                    </span>
                  )
                })}
              </Motion.span>
            </span>
            {/* Breakable space between word wrappers so wrapping only happens between words */}
            {wordIdx < WORDS.length - 1 && ' '}
          </span>
        )
      })}
    </h1>
  )
}
