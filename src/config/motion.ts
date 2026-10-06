/**
 * Swiss Dossier Motion System & Tokens
 * Choreographed timing and easing curves across the entire site.
 */

// Primary easing curve: cubic-bezier(0.16, 1, 0.3, 1)
export const PRIMARY_EASE_CURVE = [0.16, 1, 0.3, 1] as const
export const PRIMARY_EASE_STRING = 'cubic-bezier(0.16, 1, 0.3, 1)'

// Secondary ease-in-out curve for scrubbed and continuous animations
export const SECONDARY_EASE_CURVE = [0.65, 0, 0.35, 1] as const
export const SECONDARY_EASE_STRING = 'cubic-bezier(0.65, 0, 0.35, 1)'

// Three standard durations (in seconds)
export const DURATIONS = {
  fast: 0.2, // 200ms: micro-interactions, dots, link underlines, hover reveals
  base: 0.45, // 450ms: row expands, view reveals, clip-path wipes
  slow: 0.8, // 800ms: hero masked titles, grid line draw-downs, page wipes
} as const

// Shared calm spring configuration for Framer Motion
export const SHARED_SPRING = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 28,
  mass: 0.8,
}

// Float / cursor follow spring configuration
export const FLOAT_SPRING = {
  type: 'spring' as const,
  stiffness: 180,
  damping: 24,
  mass: 0.6,
}

/**
 * Check if the user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Check if current device is a touch/mobile device
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
}
