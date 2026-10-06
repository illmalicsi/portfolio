/**
 * Re-export and integrate shared motion tokens
 */
import {
  PRIMARY_EASE_CURVE,
  PRIMARY_EASE_STRING,
  SECONDARY_EASE_CURVE,
  SECONDARY_EASE_STRING,
  DURATIONS,
  SHARED_SPRING,
  FLOAT_SPRING,
  prefersReducedMotion,
  isTouchDevice,
} from './motion'

export {
  PRIMARY_EASE_CURVE,
  PRIMARY_EASE_STRING,
  SECONDARY_EASE_CURVE,
  SECONDARY_EASE_STRING,
  DURATIONS,
  SHARED_SPRING,
  FLOAT_SPRING,
  prefersReducedMotion,
  isTouchDevice,
}

export const ANIMATION = {
  ease: {
    smooth: PRIMARY_EASE_CURVE,
    scrub: SECONDARY_EASE_CURVE,
    primaryCss: PRIMARY_EASE_STRING,
    secondaryCss: SECONDARY_EASE_STRING,
  },
  duration: {
    fast: DURATIONS.fast,
    base: DURATIONS.base,
    slow: DURATIONS.slow,
  },
  spring: SHARED_SPRING,
  tilt: {
    max: 5,
    perspective: 1000,
  },
} as const
