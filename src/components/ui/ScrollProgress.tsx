import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollProgressProps {
  theme?: 'dark' | 'light'
}

export default function ScrollProgress({}: ScrollProgressProps) {
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
    <div className="fixed top-0 left-0 right-0 z-50 h-[1.5px] bg-transparent pointer-events-none">
      <div
        ref={barRef}
        className="h-full origin-left bg-[var(--vermilion)] will-change-transform"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
