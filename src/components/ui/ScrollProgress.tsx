import { useEffect, useState } from 'react'
import { motion as Motion } from 'framer-motion'

interface ScrollProgressProps {
  theme?: 'dark' | 'light'
}

export default function ScrollProgress({ theme }: ScrollProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll <= 0) {
        setScrollProgress(0)
        return
      }
      const currentScroll = window.scrollY
      setScrollProgress(Math.min(1, Math.max(0, currentScroll / totalScroll)))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent pointer-events-none">
      <Motion.div
        className={`h-full transition-colors duration-200 ${
          theme === 'light'
            ? 'bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900 shadow-[0_0_8px_rgba(0,0,0,0.25)]'
            : 'bg-gradient-to-r from-white via-zinc-200 to-white shadow-[0_0_8px_rgba(255,255,255,0.6)]'
        }`}
        style={{
          scaleX: scrollProgress,
          transformOrigin: '0%',
        }}
      />
    </div>
  )
}
