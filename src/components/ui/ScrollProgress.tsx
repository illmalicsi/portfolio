import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollProgressProps {
  theme?: 'dark' | 'light'
}

export default function ScrollProgress({ theme }: ScrollProgressProps) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = barRef.current
    if (!el) return

    const trigger = ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        gsap.set(el, { scaleX: self.progress })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent pointer-events-none">
      <div
        ref={barRef}
        className={`h-full origin-left transition-colors duration-200 ${
          theme === 'light'
            ? 'bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900 shadow-[0_0_8px_rgba(0,0,0,0.25)]'
            : 'bg-gradient-to-r from-white via-zinc-200 to-white shadow-[0_0_8px_rgba(255,255,255,0.6)]'
        }`}
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
