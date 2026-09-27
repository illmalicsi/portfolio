import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
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
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const xTo = useRef<gsap.QuickToFunc | null>(null)
  const yTo = useRef<gsap.QuickToFunc | null>(null)

  useEffect(() => {
    if (isTouchDevice() || prefersReducedMotion() || !innerRef.current) return

    xTo.current = gsap.quickTo(innerRef.current, 'x', {
      duration: 0.35,
      ease: 'power3.out',
    })
    yTo.current = gsap.quickTo(innerRef.current, 'y', {
      duration: 0.35,
      ease: 'power3.out',
    })

    return () => {
      xTo.current = null
      yTo.current = null
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice() || prefersReducedMotion()) return
    const el = containerRef.current
    if (!el || !xTo.current || !yTo.current) return

    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = (e.clientX - centerX) * strength
    const distanceY = (e.clientY - centerY) * strength

    xTo.current(distanceX)
    yTo.current(distanceY)
  }

  const handleMouseLeave = () => {
    if (innerRef.current) {
      gsap.to(innerRef.current, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1.1, 0.4)',
        overwrite: 'auto',
      })
    }
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
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <div ref={innerRef} className="inline-block will-change-transform">
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
      </div>
    </div>
  )
}
