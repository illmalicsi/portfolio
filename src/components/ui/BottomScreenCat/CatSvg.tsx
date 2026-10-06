import React from 'react'
import { CatState } from './catConfig'
import styles from './CatSvg.module.css'

export interface CatSvgProps {
  headRef?: React.RefObject<SVGGElement | null>
  state: CatState
  isReducedMotion?: boolean
  isPerkedUp?: boolean
  isHovered?: boolean
  showGround?: boolean
  className?: string
}

/**
 * CatSvg: Clean Swiss Dossier Ink Illustration
 * 
 * Rendered using purely the portfolio's design tokens via CSS variables:
 * - Body fill: var(--bg) (Paper: #F4F1EA light / #121110 dark)
 * - Stroke & Details: var(--text) (Ink: #111110 light / #F4F1EA dark)
 * - Single Accent: var(--vermilion) (#E8421F collar & tiny bell)
 * - Hairline: var(--hairline) (Ground datum rule)
 * 
 * Automatically inverts seamlessly in dark mode.
 * Each part (head, ears, tail, body, paws) is an independent SVG group
 * with its own transform origin for coordinated animation.
 */
export default function CatSvg({
  headRef,
  state,
  isReducedMotion = false,
  isPerkedUp = false,
  isHovered = false,
  showGround = false,
  className = '',
}: CatSvgProps) {
  const isWalking = state === 'walking' && !isReducedMotion
  const isLoafing = state === 'loafing'
  const isSleeping = state === 'sleeping' && !isReducedMotion
  const isSitting = state === 'sitting' || state === 'grooming'
  const isGrooming = state === 'grooming' && !isReducedMotion
  const isJumping = state === 'jumping'

  // Dynamic animation classes
  const motionClass = isReducedMotion ? styles.reducedMotion : ''
  const perkedClass = isPerkedUp ? styles.perkedUp : ''

  // Tail animation
  const tailClass = isWalking
    ? styles.tailWalking
    : isSleeping
    ? styles.tailSleeping
    : isReducedMotion
    ? ''
    : styles.tailFlick

  // Body animation
  const bodyClass = isLoafing
    ? !isReducedMotion ? styles.bodyLoafing : ''
    : isSleeping
    ? !isReducedMotion ? styles.bodySleeping : ''
    : isWalking
    ? styles.bodyWalking
    : ''

  // Ear twitch animation
  const earTwitchClass = !isReducedMotion && !isSleeping ? styles.earTwitch : ''

  // Eyes blink animation
  const eyeBlinkClass = !isReducedMotion && !isSleeping && !isJumping
    ? isLoafing
      ? styles.catEyesBlinkingLoaf
      : isWalking
      ? styles.catEyesBlinkingWalk
      : styles.catEyesBlinking
    : ''

  // ── Optional Ground Line & Shadow (When rendered standalone) ──
  const groundElements = showGround ? (
    <g id="ground-and-shadow" className={styles.groundGroup}>
      <line x1="6" y1="44" x2="58" y2="44" className={styles.groundLine} />
      <ellipse
        cx="32"
        cy="44"
        rx="16"
        ry="1.2"
        className={`${styles.groundShadow} ${isJumping ? styles.groundShadowJumping : ''}`}
      />
    </g>
  ) : null

  // ── Sleeping Pose (Curled donut loaf, peaceful slumber) ──
  if (isSleeping) {
    return (
      <svg
        width="64"
        height="48"
        viewBox="0 0 64 48"
        className={`${styles.svgCat} ${motionClass} ${className}`}
        aria-hidden="true"
      >
        {groundElements}

        {/* Curled Sleeping Body */}
        <g id="cat-body" className={`${styles.bodyGroup} ${bodyClass}`}>
          <path
            d="M 13 42 C 8 42, 8 26, 18 20 C 26 15, 42 15, 49 21 C 56 28, 55 42, 48 42 C 39 43, 21 43, 13 42 Z"
            className={styles.paperFilledStroke}
          />
          {/* Tail tucked gently over flank */}
          <path
            d="M 14 38 C 18 34, 27 35, 32 38"
            className={styles.inkStroke}
            fill="none"
          />
        </g>

        {/* Head in resting sleeping posture */}
        <g
          ref={headRef}
          id="cat-head"
          className={`${styles.headGroup} ${styles.headGroupSleeping}`}
        >
          {/* Head contour */}
          <path
            d="M 23 22 C 21 16, 26 12, 33 12 C 40 12, 44 16, 43 22 C 42 27, 38 29, 32 29 C 26 29, 24 27, 23 22 Z"
            className={styles.paperFilledStroke}
          />
          {/* Folded ears - clean paper fill, ink stroke */}
          <g id="cat-ear-left" className={styles.earLeft}>
            <path d="M 25 14 L 28 7 L 32 12 Z" className={styles.paperFilledStroke} />
          </g>
          <g id="cat-ear-right" className={styles.earRight}>
            <path d="M 36 12 L 40 8 L 42 15 Z" className={styles.paperFilledStroke} />
          </g>

          {/* Vermilion Accent Collar & Bell */}
          <g id="cat-collar">
            <path d="M 31 25 Q 36 28 41 25" className={styles.vermilionCollar} />
            <circle cx="36" cy="27.5" r="1.5" className={styles.vermilionBell} />
          </g>

          {/* Peaceful closed curved ink eyes */}
          <g id="cat-eyes">
            <path
              d="M 27 22 Q 29.5 24 32 22"
              className={styles.inkStroke}
              fill="none"
            />
            <path
              d="M 34 22 Q 36.5 24 39 22"
              className={styles.inkStroke}
              fill="none"
            />
          </g>

          {/* Minimalist nose and mouth */}
          <path
            d="M 32.8 24.5 Q 33.3 25.2 33.8 24.5"
            className={styles.inkStroke}
            fill="none"
          />
        </g>
      </svg>
    )
  }

  // ── Loafing Pose (Settled paws tucked underneath, rhythmic breathing) ──
  if (isLoafing) {
    const isHappy = isHovered
    return (
      <svg
        width="64"
        height="48"
        viewBox="0 0 64 48"
        className={`${styles.svgCat} ${motionClass} ${perkedClass} ${className}`}
        aria-hidden="true"
      >
        {groundElements}

        {/* Loaf Torso with subtle breathing scale */}
        <g id="cat-body" className={`${styles.bodyGroup} ${bodyClass}`}>
          <path
            d="M 14 42 C 9 42, 8 28, 17 20 C 24 14, 40 14, 47 20 C 55 28, 54 42, 47 42 C 39 43, 22 43, 14 42 Z"
            className={styles.paperFilledStroke}
          />
          {/* Subtle front tuck crease */}
          <path
            d="M 27 42 Q 31 43.5 35 42"
            className={styles.inkStroke}
            fill="none"
          />
        </g>

        {/* Head */}
        <g
          ref={headRef}
          id="cat-head"
          className={`${styles.headGroup} ${styles.headGroupLoafing}`}
        >
          {/* Head contour */}
          <path
            d="M 23 19 C 22 13, 27 9, 34 9 C 41 9, 46 13, 45 19 C 44 25, 40 27, 34 27 C 28 27, 24 25, 23 19 Z"
            className={styles.paperFilledStroke}
          />
          {/* Slightly pointed ears - clean paper fill */}
          <g id="cat-ear-left" className={styles.earLeft}>
            <path d="M 26 11 L 29 4 L 33 9 Z" className={styles.paperFilledStroke} />
          </g>
          <g id="cat-ear-right" className={`${styles.earRight} ${earTwitchClass}`}>
            <path d="M 36 9 L 40 4 L 43 11 Z" className={styles.paperFilledStroke} />
          </g>

          {/* Vermilion Accent Collar & Bell */}
          <g id="cat-collar">
            <path d="M 28 23 Q 34 26 40 23" className={styles.vermilionCollar} />
            <circle cx="34" cy="25.8" r="1.5" className={styles.vermilionBell} />
          </g>

          {/* Eyes: Happy curved strokes when petted/hovered, or awake ink dots with slow blink */}
          {isHappy ? (
            <g id="cat-eyes">
              <path
                d="M 28.5 18 Q 30.5 16 32.5 18"
                className={styles.inkStroke}
                fill="none"
              />
              <path
                d="M 35.5 18 Q 37.5 16 39.5 18"
                className={styles.inkStroke}
                fill="none"
              />
            </g>
          ) : (
            <g id="cat-eyes" className={eyeBlinkClass}>
              <circle cx="30.5" cy="18" r="1.3" fill="var(--text)" />
              <circle cx="37.5" cy="18" r="1.3" fill="var(--text)" />
            </g>
          )}

          {/* Minimalist nose and mouth */}
          <circle cx="34" cy="20.8" r="0.75" fill="var(--text)" />
          <path
            d="M 32.8 21.8 Q 34 22.6 35.2 21.8"
            className={styles.inkStroke}
            fill="none"
          />
        </g>
      </svg>
    )
  }

  // ── Sitting & Grooming Poses ──
  if (isSitting) {
    const isHappy = isHovered || isGrooming
    return (
      <svg
        width="64"
        height="48"
        viewBox="0 0 64 48"
        className={`${styles.svgCat} ${motionClass} ${perkedClass} ${className}`}
        aria-hidden="true"
      >
        {groundElements}

        {/* Tail curled forward with occasional flick */}
        <g id="cat-tail" className={`${styles.tailGroup} ${tailClass}`}>
          <path
            d="M 17 35 C 11 37, 8 43.5, 23 43.5 C 27 43.5, 29 41.5, 27 40 C 23 38, 17 38, 17 35 Z"
            className={styles.paperFilledStroke}
          />
        </g>

        {/* Sitting Body */}
        <g id="cat-body" className={styles.bodyGroup}>
          <path
            d="M 18 42 C 12 42, 11 27, 20 19 C 26 13, 38 13, 44 19 C 51 26, 50 42, 44 42 C 38 43, 24 43, 18 42 Z"
            className={styles.paperFilledStroke}
          />
        </g>

        {/* Head */}
        <g ref={headRef} id="cat-head" className={styles.headGroup}>
          {/* Head contour */}
          <path
            d="M 31 19 C 30 12, 35 9, 42 9 C 49 9, 53 13, 52 20 C 51 25, 46 27, 40 27 C 34 27, 31 24, 31 19 Z"
            className={styles.paperFilledStroke}
          />
          {/* Pointed ears - clean paper fill */}
          <g id="cat-ear-left" className={styles.earLeft}>
            <path d="M 34 11 L 37 4 L 41 9 Z" className={styles.paperFilledStroke} />
          </g>
          <g id="cat-ear-right" className={`${styles.earRight} ${earTwitchClass}`}>
            <path d="M 44 9 L 48 5 L 51 12 Z" className={styles.paperFilledStroke} />
          </g>

          {/* Vermilion Accent Collar & Bell */}
          <g id="cat-collar">
            <path d="M 34 23 Q 39 27 45 23" className={styles.vermilionCollar} />
            <circle cx="39.5" cy="26.8" r="1.5" className={styles.vermilionBell} />
          </g>

          {/* Eyes: Happy curved strokes or awake ink dots with slow blink */}
          {isHappy ? (
            <g id="cat-eyes">
              <path
                d="M 37.5 17.5 Q 39 16 40.5 17.5"
                className={styles.inkStroke}
                fill="none"
              />
              <path
                d="M 44.5 17.5 Q 46 16 47.5 17.5"
                className={styles.inkStroke}
                fill="none"
              />
            </g>
          ) : (
            <g id="cat-eyes" className={eyeBlinkClass}>
              <circle cx="39" cy="17.5" r="1.3" fill="var(--text)" />
              <circle cx="46" cy="17.5" r="1.3" fill="var(--text)" />
            </g>
          )}

          {/* Minimalist nose and mouth */}
          <circle cx="43" cy="20.5" r="0.75" fill="var(--text)" />
          <path
            d="M 41.8 21.6 Q 43 22.4 44.2 21.6"
            className={styles.inkStroke}
            fill="none"
          />
        </g>

        {/* Small Paws */}
        <g id="cat-paws" className={styles.pawsGroup}>
          <ellipse
            cx="32"
            cy="42"
            rx="3.5"
            ry="2"
            className={styles.paperFilledStroke}
          />
          {isGrooming ? (
            /* Animated Grooming Paw licking face */
            <g id="cat-groom-paw" className={styles.groomPaw}>
              <path
                d="M 35 39 C 36 34, 38 28, 36 24 C 34 22, 31 23, 31 26 C 31 30, 33 36, 35 39 Z"
                className={styles.paperFilledStroke}
              />
              <ellipse
                cx="34"
                cy="24"
                rx="2.5"
                ry="1.8"
                className={styles.paperFilledStroke}
              />
            </g>
          ) : (
            <ellipse
              cx="39"
              cy="42"
              rx="3.5"
              ry="2"
              className={styles.paperFilledStroke}
            />
          )}
        </g>
      </svg>
    )
  }

  // ── Jumping Pose (Click jump, in-air happy squint) ──
  if (isJumping) {
    return (
      <svg
        width="64"
        height="48"
        viewBox="0 0 64 48"
        className={`${styles.svgCat} ${motionClass} ${className}`}
        aria-hidden="true"
      >
        {groundElements}

        {/* Tail extended gracefully */}
        <g id="cat-tail" className={styles.tailGroup}>
          <path
            d="M 13 33 C 7 32, 5 24, 9 19 C 11 16, 15 18, 14 22 C 13 26, 16 30, 18 33 Z"
            className={styles.paperFilledStroke}
          />
        </g>

        {/* Body in flight */}
        <g id="cat-body" className={styles.bodyGroup}>
          <path
            d="M 18 29 C 13 29, 12 38, 19 39 C 27 40, 43 39, 48 33 C 51 28, 49 22, 43 20 C 36 18, 23 20, 18 29 Z"
            className={styles.paperFilledStroke}
          />
        </g>

        {/* Head */}
        <g ref={headRef} id="cat-head" className={styles.headGroup}>
          <path
            d="M 35 18 C 34 11, 40 8, 47 8 C 54 8, 57 12, 56 19 C 55 25, 50 27, 44 27 C 39 27, 35 23, 35 18 Z"
            className={styles.paperFilledStroke}
          />
          <g id="cat-ear-left" className={styles.earLeft}>
            <path d="M 38 10 L 41 3 L 45 8 Z" className={styles.paperFilledStroke} />
          </g>
          <g id="cat-ear-right" className={styles.earRight}>
            <path d="M 48 8 L 52 4 L 54 12 Z" className={styles.paperFilledStroke} />
          </g>

          {/* Vermilion Accent Collar & Bell */}
          <g id="cat-collar">
            <path d="M 38 23 Q 41 27 45 23" className={styles.vermilionCollar} />
            <circle cx="41.5" cy="26.8" r="1.5" className={styles.vermilionBell} />
          </g>

          {/* Happy squint curved strokes during jump */}
          <g id="cat-eyes">
            <path
              d="M 42.5 17 Q 44.5 15 46.5 17"
              className={styles.inkStroke}
              fill="none"
            />
            <path
              d="M 49.5 17 Q 51.5 15 53.5 17"
              className={styles.inkStroke}
              fill="none"
            />
          </g>

          {/* Nose and mouth */}
          <circle cx="47.5" cy="20.5" r="0.75" fill="var(--text)" />
          <path
            d="M 46.3 21.6 Q 47.5 22.4 48.7 21.6"
            className={styles.inkStroke}
            fill="none"
          />
        </g>

        {/* Paws playfully tucked in mid-air */}
        <g id="cat-paws" className={styles.pawsGroup}>
          <ellipse
            cx="22"
            cy="37"
            rx="3.5"
            ry="2.2"
            className={styles.paperFilledStroke}
          />
          <ellipse
            cx="40"
            cy="38"
            rx="3.5"
            ry="2.2"
            className={styles.paperFilledStroke}
          />
        </g>
      </svg>
    )
  }

  // ── Walking & Idle Poses (Articulated locomotion & standing) ──
  return (
    <svg
      width="64"
      height="48"
      viewBox="0 0 64 48"
      className={`${styles.svgCat} ${motionClass} ${perkedClass} ${className}`}
      aria-hidden="true"
    >
      {groundElements}

      {/* Background Legs */}
      <g id="cat-legs-back">
        <g className={isWalking ? styles.legWalkingRearB : ''}>
          <path
            d="M 17 35 C 16 38, 16 42, 18 43 C 20 43.5, 21 42, 21 38 C 21 35, 19 34, 17 35 Z"
            className={styles.paperFilledStroke}
          />
        </g>
        <g className={isWalking ? styles.legWalkingFrontB : ''}>
          <path
            d="M 36 35 C 35 38, 35 42, 37 43 C 39 43.5, 40 42, 40 38 C 40 35, 38 34, 36 35 Z"
            className={styles.paperFilledStroke}
          />
        </g>
      </g>

      {/* Tail with swishing or flick */}
      <g id="cat-tail" className={`${styles.tailGroup} ${tailClass}`}>
        <path
          d="M 13 31 C 7 28, 4 21, 7 16 C 9 13, 13 15, 12 19 C 11 23, 14 27, 16 31 Z"
          className={styles.paperFilledStroke}
        />
      </g>

      {/* Torso */}
      <g id="cat-body" className={`${styles.bodyGroup} ${bodyClass}`}>
        <path
          d="M 18 28 C 13 28, 12 38, 19 39 C 27 40, 43 39, 48 33 C 51 28, 49 22, 43 20 C 36 18, 23 20, 18 28 Z"
          className={styles.paperFilledStroke}
        />
      </g>

      {/* Head */}
      <g
        ref={headRef}
        id="cat-head"
        className={`${styles.headGroup} ${styles.headGroupWalking}`}
      >
        {/* Head contour */}
        <path
          d="M 35 18 C 34 11, 40 8, 47 8 C 54 8, 57 12, 56 19 C 55 25, 50 27, 44 27 C 39 27, 35 23, 35 18 Z"
          className={styles.paperFilledStroke}
        />
        {/* Pointed ears - clean paper fill */}
        <g id="cat-ear-left" className={styles.earLeft}>
          <path d="M 38 10 L 41 3 L 45 8 Z" className={styles.paperFilledStroke} />
        </g>
        <g id="cat-ear-right" className={`${styles.earRight} ${earTwitchClass}`}>
          <path d="M 48 8 L 52 4 L 54 12 Z" className={styles.paperFilledStroke} />
        </g>

        {/* Vermilion Accent Collar & Bell */}
        <g id="cat-collar">
          <path d="M 38 23 Q 41 27 45 23" className={styles.vermilionCollar} />
          <circle cx="41.5" cy="26.8" r="1.5" className={styles.vermilionBell} />
        </g>

        {/* Eyes: Awake ink dots with slow blink */}
        <g id="cat-eyes" className={eyeBlinkClass}>
          <circle cx="44.5" cy="17.5" r="1.3" fill="var(--text)" />
          <circle cx="51.5" cy="17.5" r="1.3" fill="var(--text)" />
        </g>

        {/* Minimalist nose and mouth */}
        <circle cx="47.5" cy="20.5" r="0.75" fill="var(--text)" />
        <path
          d="M 46.3 21.6 Q 47.5 22.4 48.7 21.6"
          className={styles.inkStroke}
          fill="none"
        />
      </g>

      {/* Foreground Legs */}
      <g id="cat-legs-front">
        <g className={isWalking ? styles.legWalkingRearA : ''}>
          <path
            d="M 19 35 C 18 38, 18 42, 20 43 C 22 43.5, 23 42, 23 38 C 23 35, 21 34, 19 35 Z"
            className={styles.paperFilledStroke}
          />
        </g>
        <g className={isWalking ? styles.legWalkingFrontA : ''}>
          <path
            d="M 38 35 C 37 38, 37 42, 39 43 C 41 43.5, 42 42, 42 38 C 42 35, 40 34, 38 35 Z"
            className={styles.paperFilledStroke}
          />
        </g>
      </g>
    </svg>
  )
}
