import React from 'react'
import { useCatStateMachine } from './useCatStateMachine'
import CatSvg from './CatSvg'
import styles from './BottomScreenCat.module.css'

export interface BottomScreenCatProps {
  theme?: 'dark' | 'light'
}

/**
 * BottomScreenCat: Ambient Companion Cat for Swiss Dossier Portfolio
 * 
 * Features:
 * - Clean ink illustration using site design tokens (--bg, --text, --vermilion, --hairline).
 * - Automatic dark mode inversion via CSS variables.
 * - Architectural 1px hairline ground line and faint narrow shadow.
 * - Editorial label ("meow" in lowercase JetBrains Mono at 0.75rem with vermilion dot).
 * - Coordinated micro-animations: 5.5s slow blink, ear twitch, tail flick, loaf breathing, takeoff & landing squash.
 * - Complete reduced motion support and zero-jitter RAF physics.
 */
export default function BottomScreenCat({ theme = 'light' }: BottomScreenCatProps) {
  const {
    containerRef,
    wrapperRef,
    bodyRef,
    headRef,
    currentState,
    isPerkedUp,
    isMeowing,
    isSleeping,
    isReducedMotion,
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
  } = useCatStateMachine()

  const isJumping = currentState === 'jumping'

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      data-theme={theme}
      className={`${styles.container} ${isReducedMotion ? styles.reducedMotionContainer : ''}`}
    >
      {/* ── Transformed Wrapper (translate3d X, pointer-events-auto) ── */}
      <div
        ref={wrapperRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={styles.catWrapper}
        title="Resting companion (Hover to pet, click to play)"
      >
        {/* ── Ground Datum Line & Narrow Shadow (Anchored to floor) ── */}
        <svg
          className={styles.groundSvg}
          width="64"
          height="48"
          viewBox="0 0 64 48"
          aria-hidden="true"
        >
          {/* 1px Ink Hairline Ground Datum Line */}
          <line
            x1="6"
            y1="44"
            x2="58"
            y2="44"
            className={styles.groundLine}
          />
          {/* Faint narrow shadow that shrinks and fades in air during jump */}
          <ellipse
            cx="32"
            cy="44"
            rx="16"
            ry="1.2"
            className={`${styles.groundShadow} ${isJumping ? styles.groundShadowJumping : ''}`}
          />
        </svg>

        {/* ── Editorial Label ("meow" with vermilion dot) on Click ── */}
        {isMeowing && (
          <div
            className={styles.editorialLabel}
            role="status"
            aria-live="polite"
          >
            <span className={styles.editorialDot} />
            <span className={styles.editorialText}>meow</span>
          </div>
        )}

        {/* ── Floating 'Z's when Sleeping (JetBrains Mono) ── */}
        {isSleeping && !isReducedMotion && (
          <div className={styles.sleepZContainer}>
            <span className={styles.sleepZ1}>z</span>
            <span className={styles.sleepZ2}>z</span>
            <span className={styles.sleepZ3}>z</span>
          </div>
        )}

        {/* ── Body Elevator & Flipper (translates Y during jump, flips X on turn) ── */}
        <div
          ref={bodyRef}
          className={`${styles.catBodyFlip} ${isPerkedUp ? styles.perkedUp : ''}`}
        >
          <CatSvg
            headRef={headRef}
            state={currentState}
            isReducedMotion={isReducedMotion}
            isPerkedUp={isPerkedUp}
            isHovered={isHovered}
          />
        </div>
      </div>
    </div>
  )
}
