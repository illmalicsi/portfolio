import { motion as Motion } from 'framer-motion'
import { PRIMARY_EASE_CURVE } from '../../config/motion'

interface GridGuidesProps {
  theme?: 'dark' | 'light'
}

/**
 * GridGuides component
 * Renders 12 vertical hairline column guides spanning the viewport height.
 * Draws downward on initial load with a staggered scaleY animation.
 * Sits in the background with pointer-events-none, aligned with main content.
 */
export default function GridGuides({ theme = 'light' }: GridGuidesProps) {
  const isLight = theme === 'light'
  const guideColor = isLight ? 'rgba(17, 17, 16, 0.045)' : 'rgba(244, 241, 234, 0.045)'

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12 md:pl-[72px] select-none"
    >
      <div className="grid h-full w-full grid-cols-12 gap-4 sm:gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="relative h-full w-full">
            {/* Left hairline guide of each column */}
            <Motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{
                duration: 1.1,
                delay: 0.1 + index * 0.04,
                ease: PRIMARY_EASE_CURVE,
              }}
              className="absolute left-0 top-0 bottom-0 w-[1px] origin-top will-change-transform"
              style={{ backgroundColor: guideColor }}
            />
            {/* Right hairline guide on final column */}
            {index === 11 && (
              <Motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  duration: 1.1,
                  delay: 0.1 + 12 * 0.04,
                  ease: PRIMARY_EASE_CURVE,
                }}
                className="absolute right-0 top-0 bottom-0 w-[1px] origin-top will-change-transform"
                style={{ backgroundColor: guideColor }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
