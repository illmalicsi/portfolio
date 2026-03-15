import { useEffect, useState } from 'react'
import { motion as Motion, useMotionValue, useSpring } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import ParticleNetwork from './components/layout/ParticleNetwork'
import SplashCursor from './components/layout/SplashCursor'
import ScrollProgressTopButton from './components/layout/ScrollProgressTopButton'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import Experience from './components/sections/Experience'
import Footer from './components/sections/Footer'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Playground from './components/sections/Playground'

const sectionIds = ['home', 'about', 'skills', 'playground', 'projects', 'experience', 'contact']
const themeKey = 'portfolio-theme'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  const storedTheme = window.localStorage.getItem(themeKey)
  if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [theme, setTheme] = useState(getInitialTheme)
  const [cursorEnabled, setCursorEnabled] = useState(false)

  // Global cursor glow
  const cursorX = useMotionValue(-500)
  const cursorY = useMotionValue(-500)
  const springX = useSpring(cursorX, { stiffness: 80, damping: 20 })
  const springY = useSpring(cursorY, { stiffness: 80, damping: 20 })
  const ringX = useSpring(cursorX, { stiffness: 220, damping: 30 })
  const ringY = useSpring(cursorY, { stiffness: 220, damping: 30 })
  const dotX = useSpring(cursorX, { stiffness: 600, damping: 42 })
  const dotY = useSpring(cursorY, { stiffness: 600, damping: 42 })

  useEffect(() => {
    const canUseHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const shouldEnableCursor = canUseHover && !prefersReducedMotion
    setCursorEnabled(shouldEnableCursor)
    document.body.classList.toggle('custom-cursor-enabled', shouldEnableCursor)

    return () => {
      document.body.classList.remove('custom-cursor-enabled')
    }
  }, [])

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [cursorX, cursorY])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.15, 0.4, 0.75],
      },
    )

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const revealed = new Set()
    const revealTargets = document.querySelectorAll('[data-reveal]')

    if (!revealTargets.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !revealed.has(entry.target)) {
            entry.target.classList.add('reveal-visible')
            revealed.add(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -12% 0px',
      },
    )

    revealTargets.forEach((node) => observer.observe(node))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const isLightTheme = theme === 'light'
    document.documentElement.classList.toggle('theme-light', isLightTheme)
    document.documentElement.style.colorScheme = isLightTheme ? 'light' : 'dark'
    window.localStorage.setItem(themeKey, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="relative overflow-x-hidden bg-[var(--bg)] text-[var(--text)]">
      <div className="page-bg-pattern pointer-events-none fixed inset-0 z-0" aria-hidden="true" />

      {/* Global cursor glow */}
      <Motion.div
        className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: springX,
          top: springY,
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(201,168,76,0.11) 0%, rgba(62,207,178,0.06) 42%, transparent 72%)',
        }}
      />

      {cursorEnabled && (
        <>
          <Motion.div
            aria-hidden="true"
            className="custom-cursor-ring pointer-events-none fixed z-[110] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ left: ringX, top: ringY }}
          />
          <Motion.div
            aria-hidden="true"
            className="custom-cursor-dot pointer-events-none fixed z-[111] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ left: dotX, top: dotY }}
          />
        </>
      )}

      <SplashCursor />
      <ParticleNetwork theme={theme} />

      <div className="relative z-10">
        <Navbar activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} />

        <Motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Hero />
          <About />
          <Skills />
          <Playground />
          <Projects />
          <Experience />
          <Contact />
        </Motion.main>

        <ScrollProgressTopButton />

        <Footer />
      </div>
    </div>
  )
}

export default App

