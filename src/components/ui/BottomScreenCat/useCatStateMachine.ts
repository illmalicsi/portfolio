/**
 * useCatStateMachine.ts
 * 
 * Delta-time requestAnimationFrame state machine driver.
 * Stores movement, direction, and states in refs to eliminate re-renders during motion.
 * Applies translate3d transforms rounded to whole pixels for zero-jitter 60/120/144Hz performance.
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import {
  CatState,
  CAT_PERSONALITY,
  selectNextCatState,
} from './catConfig'
import { soundFx } from '../../../utils/sound'
import { prefersReducedMotion } from '../../../config/motion'
import styles from './BottomScreenCat.module.css'

interface UseCatStateMachineOptions {
  onMeow?: () => void
}

export function useCatStateMachine({ onMeow }: UseCatStateMachineOptions = {}) {
  // Container & DOM element refs
  const containerRef = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const bodyRef = useRef<HTMLDivElement | null>(null)
  const headRef = useRef<SVGGElement | null>(null)

  // React state for UI triggers (only re-renders on discrete events like meow or state switch)
  const [currentState, setCurrentState] = useState<CatState>('sitting')
  const [isPerkedUp, setIsPerkedUp] = useState(false)
  const [isMeowing, setIsMeowing] = useState(false)
  const [isSleeping, setIsSleeping] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Core mutable state kept strictly in refs (no re-renders on RAF ticks!)
  const catRef = useRef({
    x: 80,
    y: 0,
    facing: 1 as 1 | -1, // 1: facing right, -1: facing left
    visualFacing: 1 as 1 | -1,
    isTurning: false,
    turnTimer: 0,
    state: 'sitting' as CatState,
    stateTimer: 0,
    stateDuration: 4.5,
    // Walk physics
    walkStart: 80,
    walkTarget: 80,
    walkDistance: 0,
    walkElapsed: 0,
    walkTotalTime: 0,
    // Jump physics & squash
    jumpVy: 0,
    jumpElapsed: 0,
    isLanding: false,
    landingTimer: 0,
    landingTotalTime: 0.18,
    // Rest & Sleep tracking
    accumulatedRestTime: 0,
    sleepDuration: 20,
    // Cursor awareness
    isHovered: false,
    headTurnAngle: 0,
    perkUpTimer: 0,
    isPerkedUp: false,
    // Flags
    isTabHidden: false,
    isReducedMotion: false,
  })

  // Cursor tracking refs
  const mouseRef = useRef({
    x: -9999,
    y: -9999,
    lastX: -9999,
    lastY: -9999,
    lastTime: performance.now(),
    speed: 0,
  })

  // RAF loop refs
  const reqIdRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(performance.now())

  // Helper: Get screen boundary
  const getScreenBounds = useCallback(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200
    const minX = CAT_PERSONALITY.screenEdgePadding
    const maxX = Math.max(minX, width - CAT_PERSONALITY.catWidth - CAT_PERSONALITY.screenEdgePadding)
    return { minX, maxX }
  }, [])

  // Helper: Random float in range
  const randomInRange = (min: number, max: number) => min + Math.random() * (max - min)

  // Helper: Transition to a new state
  const transitionToState = useCallback((nextState: CatState) => {
    const cat = catRef.current
    cat.state = nextState
    cat.stateTimer = 0

    // Compute duration for the new state
    switch (nextState) {
      case 'idle':
        cat.stateDuration = randomInRange(...CAT_PERSONALITY.idleDurationRange)
        break
      case 'sitting':
        cat.stateDuration = randomInRange(...CAT_PERSONALITY.sitDurationRange)
        break
      case 'grooming':
        cat.stateDuration = randomInRange(...CAT_PERSONALITY.groomDurationRange)
        break
      case 'loafing':
        cat.stateDuration = randomInRange(...CAT_PERSONALITY.loafDurationRange)
        break
      case 'sleeping':
        cat.sleepDuration = randomInRange(...CAT_PERSONALITY.sleepDurationRange)
        cat.stateDuration = cat.sleepDuration
        setIsSleeping(true)
        break
      case 'walking':
        startWalk()
        break
      case 'jumping':
        cat.jumpVy = CAT_PERSONALITY.jumpInitialVelocityY
        break
    }

    if (nextState !== 'sleeping') {
      setIsSleeping(false)
    }

    setCurrentState(nextState)
  }, [])

  // Helper: Start a random walk segment with boundary checking and turn pause
  const startWalk = useCallback(() => {
    const cat = catRef.current
    const { minX, maxX } = getScreenBounds()

    // Pick random walk distance
    const distance = randomInRange(
      CAT_PERSONALITY.minWalkDistance,
      CAT_PERSONALITY.maxWalkDistance
    )

    // Check if moving forward hits edge
    let nextFacing: 1 | -1 = cat.facing
    const forwardTarget = cat.x + nextFacing * distance

    if (forwardTarget > maxX) {
      nextFacing = -1
    } else if (forwardTarget < minX) {
      nextFacing = 1
    } else {
      // Small chance to turn around spontaneously
      if (Math.random() < 0.25) {
        nextFacing = nextFacing === 1 ? -1 : 1
      }
    }

    // Determine actual target clamped to screen bounds
    const targetX = Math.min(maxX, Math.max(minX, cat.x + nextFacing * distance))
    const actualDistance = Math.abs(targetX - cat.x)

    cat.walkStart = cat.x
    cat.walkTarget = targetX
    cat.walkDistance = actualDistance
    cat.walkElapsed = 0

    // Cruise speed duration
    cat.walkTotalTime = actualDistance / CAT_PERSONALITY.walkSpeedPxPerSec
    // Make sure walk duration is at least twice the ease duration
    if (cat.walkTotalTime < CAT_PERSONALITY.walkEaseDurationSec * 2) {
      cat.walkTotalTime = CAT_PERSONALITY.walkEaseDurationSec * 2
    }

    // Direction flip with short turn pause
    if (nextFacing !== cat.facing) {
      cat.facing = nextFacing
      cat.isTurning = true
      cat.turnTimer = CAT_PERSONALITY.turnPauseDurationSec
    } else {
      cat.isTurning = false
      cat.turnTimer = 0
    }

    // Cat walking resets accumulated rest timer
    cat.accumulatedRestTime = 0
  }, [getScreenBounds])

  // ── Hover Handlers ──
  const handleMouseEnter = useCallback(() => {
    const cat = catRef.current
    cat.isHovered = true
    setIsHovered(true)

    // Settle immediately into loaf pose when hovered
    if (cat.state !== 'jumping') {
      cat.state = 'loafing'
      cat.stateTimer = 0
      cat.stateDuration = 9999 // remain loafing while hovered
      setCurrentState('loafing')
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    const cat = catRef.current
    cat.isHovered = false
    setIsHovered(false)

    // Resume peaceful sitting or idle after leaving hover
    if (cat.state === 'loafing') {
      cat.stateDuration = randomInRange(2.0, 4.0)
    }
  }, [])

  // ── Click Handler (Jump + Meow + Takeoff Squash) ──
  const handleClick = useCallback(() => {
    const cat = catRef.current
    soundFx.playClick()

    // Trigger jump state with takeoff squash tracking
    cat.state = 'jumping'
    cat.jumpVy = CAT_PERSONALITY.jumpInitialVelocityY
    cat.jumpElapsed = 0
    cat.isLanding = false
    setCurrentState('jumping')

    // Trigger meow editorial label
    setIsMeowing(true)
    if (onMeow) onMeow()

    window.setTimeout(() => {
      setIsMeowing(false)
    }, CAT_PERSONALITY.meowBubbleDurationMs)
  }, [onMeow])

  // ── Reduced Motion Detection ──
  useEffect(() => {
    const checkMotion = () => {
      const reduced = prefersReducedMotion()
      setIsReducedMotion(reduced)
      catRef.current.isReducedMotion = reduced
      if (reduced) {
        catRef.current.state = 'sitting'
        setCurrentState('sitting')
      }
    }

    checkMotion()
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    mediaQuery.addEventListener('change', checkMotion)
    return () => mediaQuery.removeEventListener('change', checkMotion)
  }, [])

  // ── Window Resize Handler (Keep cat strictly within bounds) ──
  useEffect(() => {
    const handleResize = () => {
      const { minX, maxX } = getScreenBounds()
      const cat = catRef.current
      if (cat.x > maxX) cat.x = maxX
      if (cat.x < minX) cat.x = minX
    }

    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [getScreenBounds])

  // ── Mouse Activity & Velocity Tracking ──
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now()
      const dt = Math.max((now - mouseRef.current.lastTime) / 1000, 0.016)

      const dx = e.clientX - mouseRef.current.lastX
      const dy = e.clientY - mouseRef.current.lastY
      const dist = Math.hypot(dx, dy)
      const speed = dist / dt

      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        lastX: e.clientX,
        lastY: e.clientY,
        lastTime: now,
        speed,
      }

      const cat = catRef.current
      const catCenterX = cat.x + CAT_PERSONALITY.catWidth / 2
      const catCenterY = window.innerHeight - CAT_PERSONALITY.catHeight / 2
      const distToCat = Math.hypot(e.clientX - catCenterX, e.clientY - catCenterY)

      // Fast mouse movement nearby -> Perk up!
      if (
        distToCat <= CAT_PERSONALITY.cursorAwarenessDistancePx + 50 &&
        speed >= CAT_PERSONALITY.fastMouseSpeedThresholdPxPerSec
      ) {
        cat.isPerkedUp = true
        cat.perkUpTimer = CAT_PERSONALITY.perkUpDurationSec
        setIsPerkedUp(true)

        // If sleeping, fast nearby movement wakes it up
        if (cat.state === 'sleeping') {
          cat.accumulatedRestTime = 0
          transitionToState('sitting')
        }
      }

      // Cursor proximity waking from sleep
      if (distToCat <= CAT_PERSONALITY.cursorAwarenessDistancePx && cat.state === 'sleeping') {
        cat.accumulatedRestTime = 0
        transitionToState('sitting')
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [transitionToState])

  // ── Page Visibility API (Pause loop & animations when tab is hidden) ──
  useEffect(() => {
    const handleVisibilityChange = () => {
      const cat = catRef.current
      if (document.hidden) {
        cat.isTabHidden = true
        if (reqIdRef.current) {
          cancelAnimationFrame(reqIdRef.current)
          reqIdRef.current = null
        }
        if (containerRef.current) {
          containerRef.current.classList.add(styles.paused)
        }
      } else {
        cat.isTabHidden = false
        lastTimeRef.current = performance.now()
        if (containerRef.current) {
          containerRef.current.classList.remove(styles.paused)
        }
        if (!cat.isReducedMotion) {
          reqIdRef.current = requestAnimationFrame(animationLoop)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // ── Main requestAnimationFrame Loop (Delta-Time Scaled) ──
  const animationLoop = useCallback((currentTime: number) => {
    const cat = catRef.current
    const dt = Math.min((currentTime - lastTimeRef.current) / 1000, 0.1) // clamp to 100ms
    lastTimeRef.current = currentTime

    if (cat.isTabHidden || cat.isReducedMotion) {
      return
    }

    const { minX, maxX } = getScreenBounds()

    // ── 1. Perk-Up Timer ──
    if (cat.isPerkedUp) {
      cat.perkUpTimer -= dt
      if (cat.perkUpTimer <= 0) {
        cat.isPerkedUp = false
        setIsPerkedUp(false)
      }
    }

    // ── 2. Cursor Proximity & Head Orientation ──
    const catCenterX = cat.x + CAT_PERSONALITY.catWidth / 2
    const catCenterY = window.innerHeight - CAT_PERSONALITY.catHeight / 2
    const mouseDx = mouseRef.current.x - catCenterX
    const mouseDy = mouseRef.current.y - catCenterY
    const distToCursor = Math.hypot(mouseDx, mouseDy)

    if (distToCursor <= CAT_PERSONALITY.cursorAwarenessDistancePx && cat.state !== 'walking') {
      // Head turns toward cursor
      // Scale by facing direction: if mouse is in front vs behind
      const relativeDx = cat.visualFacing === 1 ? mouseDx : -mouseDx
      const targetAngle = Math.max(-12, Math.min(12, (relativeDx / 200) * 12))
      cat.headTurnAngle += (targetAngle - cat.headTurnAngle) * Math.min(dt * 8, 1)
    } else {
      // Settle head back to 0
      cat.headTurnAngle += (0 - cat.headTurnAngle) * Math.min(dt * 6, 1)
    }

    if (headRef.current) {
      headRef.current.style.transform = `rotate(${cat.headTurnAngle.toFixed(1)}deg)`
    }

    // ── 3. State Machine Logic ──
    if (cat.state === 'walking') {
      if (cat.isTurning) {
        // Paused for turn
        cat.turnTimer -= dt
        if (cat.turnTimer <= CAT_PERSONALITY.turnPauseDurationSec / 2) {
          // Flip visual facing halfway through the turn pause
          cat.visualFacing = cat.facing
        }
        if (cat.turnTimer <= 0) {
          cat.isTurning = false
          cat.visualFacing = cat.facing
        }
      } else {
        // Active stroll
        cat.walkElapsed += dt
        const easeDur = CAT_PERSONALITY.walkEaseDurationSec
        const totalDur = cat.walkTotalTime

        // Compute speed with smooth easing in and out over ~400ms
        let speedFactor = 1.0
        if (cat.walkElapsed < easeDur) {
          // Ease in: quadratic acceleration
          const t = cat.walkElapsed / easeDur
          speedFactor = t * (2 - t)
        } else if (cat.walkElapsed > totalDur - easeDur) {
          // Ease out: quadratic deceleration
          const t = Math.max(0, (totalDur - cat.walkElapsed) / easeDur)
          speedFactor = t * (2 - t)
        }

        const moveStep = CAT_PERSONALITY.walkSpeedPxPerSec * speedFactor * dt * cat.facing
        cat.x += moveStep

        // Boundary safety
        if (cat.x >= maxX) {
          cat.x = maxX
          cat.walkElapsed = totalDur
        } else if (cat.x <= minX) {
          cat.x = minX
          cat.walkElapsed = totalDur
        }

        // Walk finished -> Stop and choose next state
        if (cat.walkElapsed >= totalDur) {
          cat.x = Math.min(maxX, Math.max(minX, cat.x))
          transitionToState(selectNextCatState('walking', cat.accumulatedRestTime))
        }
      }
    } else if (cat.state === 'jumping') {
      // Jump physics arc with takeoff squash tracking
      cat.jumpElapsed += dt
      cat.y += cat.jumpVy * dt
      cat.jumpVy += CAT_PERSONALITY.gravityPxPerSecSq * dt

      // Ground impact with landing squash trigger
      if (cat.y >= 0) {
        cat.y = 0
        cat.jumpVy = 0
        cat.isLanding = true
        cat.landingTimer = cat.landingTotalTime
        // Return to loafing if still hovered, otherwise sit
        transitionToState(cat.isHovered ? 'loafing' : 'sitting')
      }
    } else {
      // Landing timer countdown
      if (cat.isLanding) {
        cat.landingTimer -= dt
        if (cat.landingTimer <= 0) {
          cat.isLanding = false
        }
      }

      // Resting states: idle, sitting, grooming, loafing, sleeping
      cat.stateTimer += dt
      cat.accumulatedRestTime += dt

      // Check for state expiration
      if (!cat.isHovered && cat.stateTimer >= cat.stateDuration) {
        const next = selectNextCatState(cat.state, cat.accumulatedRestTime)
        transitionToState(next)
      }
    }

    // ── 4. Apply Transforms to DOM (No React re-render, rounded to whole pixels) ──
    if (wrapperRef.current) {
      const rx = Math.round(cat.x)
      wrapperRef.current.style.transform = `translate3d(${rx}px, 0px, 0)`
    }

    if (bodyRef.current) {
      const ry = Math.round(cat.y)
      let sx = cat.visualFacing
      let sy = 1

      // Squash and stretch details respecting reduced motion
      if (!cat.isReducedMotion) {
        if (cat.state === 'jumping') {
          if (cat.jumpElapsed < 0.07) {
            // Takeoff squash
            sx *= 1.14
            sy = 0.86
          } else {
            // In-flight stretch
            sx *= 0.92
            sy = 1.08
          }
        } else if (cat.isLanding) {
          // Landing impact squash & recovery
          const t = Math.max(0, cat.landingTimer / cat.landingTotalTime) // 1 down to 0
          const easeOut = t * (2 - t)
          sx *= (1 + 0.16 * easeOut)
          sy = (1 - 0.16 * easeOut)
        }
      }

      bodyRef.current.style.transform = `translate3d(0, ${ry}px, 0) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`
    }

    // Request next frame
    reqIdRef.current = requestAnimationFrame(animationLoop)
  }, [getScreenBounds, transitionToState])

  // ── Start / Stop Animation Loop ──
  useEffect(() => {
    if (isReducedMotion) return

    lastTimeRef.current = performance.now()
    reqIdRef.current = requestAnimationFrame(animationLoop)

    return () => {
      if (reqIdRef.current) {
        cancelAnimationFrame(reqIdRef.current)
        reqIdRef.current = null
      }
    }
  }, [animationLoop, isReducedMotion])

  return {
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
  }
}
