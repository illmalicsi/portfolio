/**
 * BottomScreenCat Configuration & Personality Tuning
 * 
 * Defines sprite sheet layout, state machine durations, weighted randomness,
 * physics, and cursor awareness thresholds for the ambient cat companion.
 */

export type CatState =
  | 'walking'
  | 'idle'
  | 'sitting'
  | 'grooming'
  | 'loafing'
  | 'sleeping'
  | 'jumping'

export interface SpritePoseConfig {
  name: CatState
  frameCount: number
  fps: number
  width: number
  height: number
  sheetX: number // horizontal offset in px
  loop: boolean
}

/**
 * Single horizontal sprite sheet layout config.
 * Each pose has a frame count, playback fps, frame dimensions, and horizontal sheet offset.
 */
export const CAT_SPRITES: Record<CatState, SpritePoseConfig> = {
  walking: {
    name: 'walking',
    frameCount: 4,
    fps: 8,
    width: 64,
    height: 48,
    sheetX: 0,
    loop: true,
  },
  sitting: {
    name: 'sitting',
    frameCount: 4,
    fps: 3,
    width: 64,
    height: 48,
    sheetX: 256,
    loop: true,
  },
  idle: {
    name: 'idle',
    frameCount: 4,
    fps: 2,
    width: 64,
    height: 48,
    sheetX: 512,
    loop: true,
  },
  grooming: {
    name: 'grooming',
    frameCount: 4,
    fps: 4,
    width: 64,
    height: 48,
    sheetX: 768,
    loop: true,
  },
  loafing: {
    name: 'loafing',
    frameCount: 4,
    fps: 2,
    width: 64,
    height: 48,
    sheetX: 1024,
    loop: true,
  },
  sleeping: {
    name: 'sleeping',
    frameCount: 4,
    fps: 1.5,
    width: 64,
    height: 48,
    sheetX: 1280,
    loop: true,
  },
  jumping: {
    name: 'jumping',
    frameCount: 4,
    fps: 8,
    width: 64,
    height: 48,
    sheetX: 1536,
    loop: false,
  },
}

export const SPRITE_SHEET_URL = '/cat-spritesheet.svg'
export const TOTAL_SPRITE_FRAMES = 28
export const SPRITE_SHEET_TOTAL_WIDTH = 1792
export const SPRITE_SHEET_HEIGHT = 48

/**
 * Rendering Mode:
 * - 'svg': Articulated inline SVG with grouped parts (legs, tail, head, body) animated with CSS transforms.
 * - 'sprite': CSS background-position animation using steps() and the horizontal sprite sheet.
 * Switch easily here to test or use either rendering system.
 */
export const CAT_RENDER_MODE: 'svg' | 'sprite' = 'svg'

/**
 * Image rendering style:
 * Use 'auto' for smooth vector art, or 'pixelated' for crisp retro pixel art.
 */
export const CAT_IMAGE_RENDERING: 'auto' | 'pixelated' = 'auto'

// ── Tweakable Personality & Movement Parameters ──

export const CAT_PERSONALITY = {
  // --- Movement & Speed ---
  /** Strolling speed across screen in pixels per second (delta-time scaled) */
  walkSpeedPxPerSec: 75,
  /** Minimum distance to walk in one stroll segment (px) */
  minWalkDistance: 160,
  /** Maximum distance to walk in one stroll segment (px) */
  maxWalkDistance: 380,
  /** Easing acceleration & deceleration duration into/out of walking (seconds) */
  walkEaseDurationSec: 0.4,
  /** Short hesitation/pause before flipping facing direction when turning around */
  turnPauseDurationSec: 0.25,

  // --- Resting & Sleep Timers ---
  /** Duration of a casual idle pause (min/max in seconds) */
  idleDurationRange: [2.5, 4.5] as const,
  /** Duration of sitting peacefully (min/max in seconds) */
  sitDurationRange: [4.0, 7.5] as const,
  /** Duration of grooming paw/face (min/max in seconds) */
  groomDurationRange: [3.0, 5.0] as const,
  /** Duration of resting in loaf pose (min/max in seconds) */
  loafDurationRange: [4.5, 8.0] as const,
  /** Consecutive resting seconds before the cat gets sleepy and curls up */
  restTimeToSleepThresholdSec: 16.0,
  /** Sleep duration before naturally waking up (min/max in seconds) */
  sleepDurationRange: [14.0, 26.0] as const,

  // --- Cursor Interaction & Perception ---
  /** Distance in pixels where cat becomes aware of the cursor */
  cursorAwarenessDistancePx: 200,
  /** Fast mouse speed in px/s that causes the cat to perk up its ears & look alert */
  fastMouseSpeedThresholdPxPerSec: 650,
  /** Duration of the alert "perked up" posture (seconds) */
  perkUpDurationSec: 1.4,

  // --- Click & Jump Physics ---
  /** Initial upward vertical impulse when clicked (negative = upward) */
  jumpInitialVelocityY: -280,
  /** Gravity pulling cat back down to floor in px/s² */
  gravityPxPerSecSq: 850,
  /** Duration the "meow" speech bubble stays visible (milliseconds) */
  meowBubbleDurationMs: 1500,

  // --- Visuals & Dimensions ---
  catWidth: 64,
  catHeight: 48,
  screenEdgePadding: 24,
}

/**
 * Weighted state transition selector.
 * Returns the next state, ensuring the cat spends ~85-90% of its time sitting or resting.
 */
export function selectNextCatState(
  currentState: CatState,
  accumulatedRestTime: number
): CatState {
  // If cat has been resting for a long stretch, high chance to fall asleep
  if (accumulatedRestTime >= CAT_PERSONALITY.restTimeToSleepThresholdSec) {
    const sleepRoll = Math.random()
    if (sleepRoll < 0.65) return 'sleeping'
    if (sleepRoll < 0.85) return 'loafing'
    return 'sitting'
  }

  // Weighted transitions from other states
  const roll = Math.random() * 100

  switch (currentState) {
    case 'walking':
      // After walking: settle into sitting (45%), idle (25%), grooming (18%), or loafing (12%)
      if (roll < 45) return 'sitting'
      if (roll < 70) return 'idle'
      if (roll < 88) return 'grooming'
      return 'loafing'

    case 'idle':
      // From idle: sit down (45%), groom (25%), loaf (15%), or walk (15%)
      if (roll < 45) return 'sitting'
      if (roll < 70) return 'grooming'
      if (roll < 85) return 'loafing'
      return 'walking'

    case 'grooming':
      // After grooming: sit (50%), loaf (25%), idle (15%), or walk (10%)
      if (roll < 50) return 'sitting'
      if (roll < 75) return 'loafing'
      if (roll < 90) return 'idle'
      return 'walking'

    case 'sleeping':
      // After waking up: sit up (60%) or stretch/idle (40%)
      return roll < 60 ? 'sitting' : 'idle'

    case 'sitting':
    case 'loafing':
    default:
      // Most of the time, remain sitting or transition between resting postures
      if (roll < 40) return 'sitting'
      if (roll < 65) return 'loafing'
      if (roll < 80) return 'grooming'
      if (roll < 90) return 'idle'
      return 'walking'
  }
}
