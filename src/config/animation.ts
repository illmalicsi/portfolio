/**
 * Shared animation configuration & easing curves
 * Inspired by Vercel & Linear design language
 */

export const ANIMATION = {
  // Cubic bezier easing curves
  ease: {
    // Standard Vercel smooth curve
    smooth: [0.16, 1, 0.3, 1] as const,
    // Snappy micro-interactions
    snappy: [0.25, 1, 0.5, 1] as const,
    // Gentle spring-like deceleration
    outExpo: [0.19, 1, 0.22, 1] as const,
  },

  // Duration in seconds
  duration: {
    fast: 0.18,
    base: 0.28,
    medium: 0.45,
    slow: 0.75,
  },

  // Stagger delays
  stagger: {
    cards: 0.08,
    tags: 0.04,
    timeline: 0.12,
  },

  // Card 3D tilt max degrees
  tilt: {
    max: 6, // 5-8 degrees max
    perspective: 1000,
  },
} as const

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
