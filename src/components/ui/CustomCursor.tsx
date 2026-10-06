import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion, isTouchDevice } from '../../config/motion'

interface CustomCursorProps {
  theme?: 'dark' | 'light'
}

type CursorMode = 'default' | 'pointer' | 'text' | 'hidden'

export default function CustomCursor({ theme = 'dark' }: CustomCursorProps) {
  const [isEnabled, setIsEnabled] = useState(false)
  const [mode, setMode] = useState<CursorMode>('default')
  const [isVisible, setIsVisible] = useState(false)

  const cursorRef = useRef<HTMLDivElement>(null)
  const targetPos = useRef({ x: -100, y: -100 })
  const currentPos = useRef({ x: -100, y: -100 })
  const animFrameId = useRef<number | null>(null)

  useEffect(() => {
    // Check fine pointer capability, touch, and reduced motion
    if (
      typeof window === 'undefined' ||
      prefersReducedMotion() ||
      isTouchDevice() ||
      !window.matchMedia('(pointer: fine)').matches
    ) {
      setIsEnabled(false)
      return
    }

    setIsEnabled(true)
    document.body.classList.add('has-custom-cursor')

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      // Form inputs: retain native cursor for accessibility
      if (
        target.closest('input, textarea, select, [contenteditable="true"]') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA'
      ) {
        setMode('hidden')
        return
      }

      // Clickable elements & project rows -> sleek interactive ring
      if (
        target.closest('a, button, [role="button"], [data-cursor="pointer"], [data-cursor="project"]') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setMode('pointer')
        return
      }

      // Selectable editorial text -> shrink dot
      if (target.closest('p, h1, h2, h3, h4, h5, span, blockquote, li')) {
        setMode('text')
        return
      }

      setMode('default')
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Smooth physics lerp loop
    const updateCursor = () => {
      // Lerp with calm spring lag
      const factor = 0.2
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * factor
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * factor

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`
      }

      animFrameId.current = requestAnimationFrame(updateCursor)
    }

    animFrameId.current = requestAnimationFrame(updateCursor)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
    }
  }, [isVisible])

  if (!isEnabled) return null

  const isLight = theme === 'light'

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 z-[9990] -translate-x-1/2 -translate-y-1/2 will-change-transform transition-opacity duration-300 ${
        !isVisible || mode === 'hidden' ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        transform: `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`,
      }}
    >
      {/* ── Mode 1: Default Small Dot ── */}
      {mode === 'default' && (
        <div
          className={`h-2 w-2 rounded-full transition-all duration-200 ${
            isLight ? 'bg-zinc-900 shadow-sm' : 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]'
          }`}
        />
      )}

      {/* ── Mode 2: Interactive Pointer Ring ── */}
      {mode === 'pointer' && (
        <div
          className={`h-10 w-10 -m-4 rounded-full border transition-all duration-250 flex items-center justify-center ${
            isLight
              ? 'border-zinc-900/60 bg-zinc-900/[0.05]'
              : 'border-white/60 bg-white/[0.08] shadow-[0_0_16px_rgba(255,255,255,0.2)]'
          }`}
        >
          <div
            className={`h-1.5 w-1.5 rounded-full ${
              isLight ? 'bg-zinc-900' : 'bg-white'
            }`}
          />
        </div>
      )}



      {/* ── Mode 4: Text Shrink Dot ── */}
      {mode === 'text' && (
        <div
          className={`h-1 w-1 rounded-full opacity-60 transition-all duration-200 ${
            isLight ? 'bg-zinc-900' : 'bg-white'
          }`}
        />
      )}
    </div>
  )
}
