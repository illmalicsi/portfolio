import { useEffect, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { FiArrowUp } from 'react-icons/fi'

function ScrollProgressTopButton() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      const nextProgress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0

      setProgress(Math.min(100, Math.max(0, nextProgress)))
      setIsVisible(scrollTop > 320)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const size = 58
  const stroke = 4
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const strokeOffset = circumference - (progress / 100) * circumference

  return (
    <AnimatePresence>
      {isVisible && (
        <Motion.button
          type="button"
          aria-label="Scroll back to top"
          initial={{ opacity: 0, y: 18, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="scroll-top-btn group fixed bottom-5 right-4 z-50 inline-flex h-[58px] w-[58px] items-center justify-center rounded-full sm:bottom-7 sm:right-6"
        >
          <svg
            className="pointer-events-none absolute inset-0 -rotate-90"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            aria-hidden="true"
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={stroke}
              className="scroll-top-ring-track"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              className="scroll-top-ring-progress transition-[stroke-dashoffset] duration-150"
            />
          </svg>
          <FiArrowUp size={18} className="relative" />
        </Motion.button>
      )}
    </AnimatePresence>
  )
}

export default ScrollProgressTopButton
