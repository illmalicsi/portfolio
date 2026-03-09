import { useEffect, useRef } from 'react'

const MAX_PARTICLES = 90
const MIN_PARTICLES = 24
const LINK_DISTANCE = 128
const MAX_STARS = 160
const MIN_STARS = 50
const NEBULA_COUNT = 3
const SHOOTING_STAR_MIN_INTERVAL = 2800
const SHOOTING_STAR_MAX_INTERVAL = 6200

function getParticleCount(width, height, prefersReducedMotion) {
  const area = width * height
  const densityTarget = Math.floor(area / (prefersReducedMotion ? 60000 : 26000))
  return Math.max(MIN_PARTICLES, Math.min(MAX_PARTICLES, densityTarget))
}

function getStarCount(width, height, prefersReducedMotion) {
  const area = width * height
  const densityTarget = Math.floor(area / (prefersReducedMotion ? 24000 : 14000))
  return Math.max(MIN_STARS, Math.min(MAX_STARS, densityTarget))
}

function ParticleNetwork({ theme }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const context = canvas.getContext('2d')
    if (!context) return undefined

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const lineColor =
      theme === 'light' ? '15, 118, 110' : '103, 232, 249'
    const pointColor =
      theme === 'light' ? '14, 116, 144' : '56, 189, 248'

    let width = 0
    let height = 0
    let animationFrameId = 0
    let particles = []
    let stars = []
    let nebulas = []
    let shootingStars = []
    let nextShootingStarAt = 0
    let time = 0
    let isRunning = false

    const mouseTarget = { x: 0, y: 0 }
    const mouseCurrent = { x: 0, y: 0 }

    const getParallaxOffset = (depth) => ({
      x: mouseCurrent.x * depth,
      y: mouseCurrent.y * depth,
    })

    const scheduleNextShootingStar = (prefersReducedMotion) => {
      const min = prefersReducedMotion
        ? SHOOTING_STAR_MIN_INTERVAL * 1.5
        : SHOOTING_STAR_MIN_INTERVAL
      const max = prefersReducedMotion
        ? SHOOTING_STAR_MAX_INTERVAL * 1.5
        : SHOOTING_STAR_MAX_INTERVAL
      nextShootingStarAt = performance.now() + Math.random() * (max - min) + min
    }

    const spawnShootingStar = (prefersReducedMotion) => {
      const fromTop = Math.random() > 0.5
      const startX = Math.random() * width * 0.7 + width * 0.15
      const startY = fromTop ? Math.random() * height * 0.22 : Math.random() * height * 0.12 + height * 0.2
      const speed = prefersReducedMotion ? 3.2 : 5.2

      shootingStars.push({
        x: startX,
        y: startY,
        vx: -(Math.random() * 1.4 + speed),
        vy: Math.random() * 1.6 + speed * 0.42,
        length: Math.random() * 95 + 70,
        width: Math.random() * 1.2 + 1.1,
        life: 0,
        maxLife: prefersReducedMotion ? 44 : 30,
        opacity: prefersReducedMotion ? 0.38 : 0.62,
        depth: Math.random() * 0.35 + 0.15,
      })
    }

    const drawNebulas = () => {
      for (let index = 0; index < nebulas.length; index += 1) {
        const nebula = nebulas[index]
        nebula.phase += nebula.phaseVelocity
        nebula.x += Math.cos(nebula.phase) * nebula.driftStrength
        nebula.y += Math.sin(nebula.phase * 0.9) * nebula.driftStrength

        const offset = getParallaxOffset(nebula.depth)
        const drawX = nebula.x + offset.x
        const drawY = nebula.y + offset.y

        const gradient = context.createRadialGradient(
          drawX,
          drawY,
          0,
          drawX,
          drawY,
          nebula.radius,
        )

        gradient.addColorStop(0, `rgba(${nebula.innerColor}, ${nebula.opacity})`)
        gradient.addColorStop(0.6, `rgba(${nebula.outerColor}, ${nebula.opacity * 0.35})`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        context.fillStyle = gradient
        context.beginPath()
        context.arc(drawX, drawY, nebula.radius, 0, Math.PI * 2)
        context.fill()
      }
    }

    const drawStars = () => {
      for (let index = 0; index < stars.length; index += 1) {
        const star = stars[index]
        const twinkle = 0.45 + Math.sin(time * star.twinkleSpeed + star.phase) * 0.55
        const alpha = star.baseOpacity * twinkle
        const offset = getParallaxOffset(star.depth)
        const drawX = star.x + offset.x
        const drawY = star.y + offset.y

        context.beginPath()
        context.arc(drawX, drawY, star.size, 0, Math.PI * 2)
        context.fillStyle = `rgba(${star.color}, ${alpha})`
        context.fill()

        if (star.size > 1.25) {
          context.strokeStyle = `rgba(${star.color}, ${alpha * 0.55})`
          context.lineWidth = 0.7
          context.beginPath()
          context.moveTo(drawX - star.cross, drawY)
          context.lineTo(drawX + star.cross, drawY)
          context.moveTo(drawX, drawY - star.cross)
          context.lineTo(drawX, drawY + star.cross)
          context.stroke()
        }
      }
    }

    const drawShootingStars = () => {
      for (let index = shootingStars.length - 1; index >= 0; index -= 1) {
        const shootingStar = shootingStars[index]
        shootingStar.life += 1
        shootingStar.x += shootingStar.vx
        shootingStar.y += shootingStar.vy

        const fade = 1 - shootingStar.life / shootingStar.maxLife
        if (fade <= 0) {
          shootingStars.splice(index, 1)
          continue
        }

        const offset = getParallaxOffset(shootingStar.depth)
        const headX = shootingStar.x + offset.x
        const headY = shootingStar.y + offset.y
        const tailX = headX - shootingStar.vx * (shootingStar.length / 18)
        const tailY = headY - shootingStar.vy * (shootingStar.length / 18)

        const gradient = context.createLinearGradient(headX, headY, tailX, tailY)
        gradient.addColorStop(0, `rgba(${pointColor}, ${shootingStar.opacity * fade})`)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

        context.strokeStyle = gradient
        context.lineWidth = shootingStar.width
        context.beginPath()
        context.moveTo(headX, headY)
        context.lineTo(tailX, tailY)
        context.stroke()

        context.beginPath()
        context.fillStyle = `rgba(${pointColor}, ${Math.min(0.95, shootingStar.opacity * fade + 0.2)})`
        context.arc(headX, headY, shootingStar.width * 0.95, 0, Math.PI * 2)
        context.fill()
      }
    }

    const render = () => {
      if (!isRunning) return

      context.clearRect(0, 0, width, height)
      time += 1

      mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.04
      mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.04

      if (performance.now() >= nextShootingStarAt && width > 0 && height > 0) {
        spawnShootingStar(mediaQuery.matches)
        scheduleNextShootingStar(mediaQuery.matches)
      }

      drawNebulas()
      drawStars()
      drawShootingStars()

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index]

        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x <= 0 || particle.x >= width) particle.vx *= -1
        if (particle.y <= 0 || particle.y >= height) particle.vy *= -1

        const offset = getParallaxOffset(particle.depth)
        const drawX = particle.x + offset.x
        const drawY = particle.y + offset.y

        context.beginPath()
        context.arc(drawX, drawY, particle.size, 0, Math.PI * 2)
        context.fillStyle = `rgba(${pointColor}, ${particle.opacity})`
        context.fill()

        for (let compareIndex = index + 1; compareIndex < particles.length; compareIndex += 1) {
          const compareParticle = particles[compareIndex]
          const dx = particle.x - compareParticle.x
          const dy = particle.y - compareParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < LINK_DISTANCE) {
            const alpha = (1 - distance / LINK_DISTANCE) * 0.45
            context.strokeStyle = `rgba(${lineColor}, ${alpha})`
            context.lineWidth = 1
            const compareOffset = getParallaxOffset(compareParticle.depth)
            context.beginPath()
            context.moveTo(drawX, drawY)
            context.lineTo(compareParticle.x + compareOffset.x, compareParticle.y + compareOffset.y)
            context.stroke()
          }
        }
      }

      animationFrameId = window.requestAnimationFrame(render)
    }

    const startAnimation = () => {
      if (isRunning) return
      isRunning = true
      animationFrameId = window.requestAnimationFrame(render)
    }

    const stopAnimation = () => {
      isRunning = false
      window.cancelAnimationFrame(animationFrameId)
    }

    const initializeParticles = () => {
      const prefersReducedMotion = mediaQuery.matches
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight

      canvas.width = width * pixelRatio
      canvas.height = height * pixelRatio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      const particleCount = getParticleCount(width, height, prefersReducedMotion)
      const starCount = getStarCount(width, height, prefersReducedMotion)

      const starPalette =
        theme === 'light'
          ? ['14, 116, 144', '8, 145, 178', '59, 130, 246']
          : ['186, 230, 253', '125, 211, 252', '224, 242, 254']

      const nebulaPalette =
        theme === 'light'
          ? [
              { inner: '14, 165, 233', outer: '45, 212, 191' },
              { inner: '37, 99, 235', outer: '56, 189, 248' },
              { inner: '13, 148, 136', outer: '14, 116, 144' },
            ]
          : [
              { inner: '14, 165, 233', outer: '59, 130, 246' },
              { inner: '56, 189, 248', outer: '8, 145, 178' },
              { inner: '37, 99, 235', outer: '34, 211, 238' },
            ]

      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        size: Math.random() * 1.8 + 0.6,
        opacity: Math.random() * 0.3 + 0.22,
        depth: Math.random() * 0.6 + 0.35,
      }))

      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.35,
        baseOpacity: Math.random() * 0.45 + 0.25,
        twinkleSpeed: Math.random() * 0.085 + 0.015,
        phase: Math.random() * Math.PI * 2,
        cross: Math.random() * 2.4 + 1.2,
        color: starPalette[Math.floor(Math.random() * starPalette.length)],
        depth: Math.random() * 0.95 + 0.2,
      }))

      nebulas = Array.from({ length: NEBULA_COUNT }, (_, index) => {
        const palette = nebulaPalette[index % nebulaPalette.length]
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.min(width, height) * (Math.random() * 0.2 + 0.16),
          opacity: prefersReducedMotion ? 0.08 : 0.14,
          driftStrength: prefersReducedMotion ? 0.03 : 0.09,
          phase: Math.random() * Math.PI * 2,
          phaseVelocity: Math.random() * 0.004 + 0.0016,
          innerColor: palette.inner,
          outerColor: palette.outer,
          depth: Math.random() * 0.45 + 0.2,
        }
      })

      shootingStars = []
      scheduleNextShootingStar(prefersReducedMotion)

      stopAnimation()

      if (prefersReducedMotion) {
        particles = particles.map((particle) => ({
          ...particle,
          vx: particle.vx * 0.35,
          vy: particle.vy * 0.35,
          opacity: Math.max(0.2, particle.opacity - 0.08),
        }))

        stars = stars.map((star) => ({
          ...star,
          twinkleSpeed: star.twinkleSpeed * 0.6,
          baseOpacity: Math.max(0.18, star.baseOpacity - 0.08),
        }))
      }

      startAnimation()
    }

    const handlePointerMove = (event) => {
      const normalizedX = event.clientX / Math.max(width, 1) - 0.5
      const normalizedY = event.clientY / Math.max(height, 1) - 0.5
      mouseTarget.x = normalizedX * 38
      mouseTarget.y = normalizedY * 26
    }

    const handlePointerLeave = () => {
      mouseTarget.x = 0
      mouseTarget.y = 0
    }

    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        stopAnimation()
      } else {
        startAnimation()
      }
    }

    initializeParticles()
    window.addEventListener('resize', initializeParticles)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerleave', handlePointerLeave)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      stopAnimation()
      window.removeEventListener('resize', initializeParticles)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="particle-network pointer-events-none fixed inset-0 z-[1]" aria-hidden="true" />
}

export default ParticleNetwork
