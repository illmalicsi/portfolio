import React, { useRef, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { isTouchDevice, prefersReducedMotion } from '../../config/animation'
import { soundFx } from '../../utils/sound'

interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  strength?: number
  variant?: 'primary' | 'secondary' | 'ghost'
  target?: string
  rel?: string
}

export default function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  strength = 0.32,
  variant = 'primary',
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice() || prefersReducedMotion()) return
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = (e.clientX - centerX) * strength
    const distanceY = (e.clientY - centerY) * strength

    setPosition({ x: distanceX, y: distanceY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const handleClick = (e: React.MouseEvent) => {
    soundFx.playClick()
    if (onClick) onClick()
  }

  const baseClasses =
    variant === 'primary'
      ? 'btn-primary'
      : variant === 'secondary'
      ? 'btn-secondary'
      : 'inline-flex items-center justify-center font-medium text-zinc-400 hover:text-white transition-colors'

  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2">
      {children}
    </span>
  )

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', damping: 18, stiffness: 220, mass: 0.1 }}
      >
        {href ? (
          <a
            href={href}
            onClick={handleClick}
            target={target}
            rel={rel}
            className={`${baseClasses} ${className}`}
          >
            {content}
          </a>
        ) : (
          <button
            type="button"
            onClick={handleClick}
            className={`${baseClasses} ${className}`}
          >
            {content}
          </button>
        )}
      </Motion.div>
    </div>
  )
}
