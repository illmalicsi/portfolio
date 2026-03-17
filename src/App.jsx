import { useEffect, useState } from 'react'
import { motion as Motion } from 'framer-motion'
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

