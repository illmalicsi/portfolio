import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/layout/Navbar'
import CommandPalette from './components/layout/CommandPalette'
import ScrollProgress from './components/ui/ScrollProgress'

import Hero from './components/sections/Hero'
import SelectedWork from './components/sections/SelectedWork'
import About from './components/sections/About'
import HackathonJourney from './components/sections/HackathonJourney'
import Timeline from './components/sections/Timeline'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'

import { prefersReducedMotion } from './config/animation'
import { soundFx } from './utils/sound'

gsap.registerPlugin(ScrollTrigger)

const sectionIds = ['home', 'about', 'projects', 'hackathon', 'experience', 'contact']
const themeKey = 'portfolio-theme'

function getInitialTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark'
  const storedTheme = window.localStorage.getItem(themeKey)
  if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [isSoundOn, setIsSoundOn] = useState(() => soundFx.isEnabled())

  // ── Lenis Smooth Scroll Synced with GSAP ScrollTrigger ──
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tickerCallback)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  // ── Intersection Observer for Active Nav Section ──
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
        rootMargin: '-30% 0px -40% 0px',
        threshold: [0.15, 0.4, 0.75],
      }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // ── Theme Sync ──
  useEffect(() => {
    const isLightTheme = theme === 'light'
    document.documentElement.classList.toggle('theme-light', isLightTheme)
    document.documentElement.classList.toggle('dark', !isLightTheme)
    document.documentElement.style.colorScheme = isLightTheme ? 'light' : 'dark'
    window.localStorage.setItem(themeKey, theme)
  }, [theme])

  // ── Global Keyboard Shortcuts ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        soundFx.playClick()
        setIsCommandPaletteOpen((prev) => !prev)
      }

      const activeTag = document.activeElement?.tagName?.toLowerCase()
      if (['input', 'textarea', 'select'].includes(activeTag || '')) return

      if (e.key === 't' || e.key === 'T') {
        soundFx.playToggle()
        toggleTheme()
      } else if (e.key === 'm' || e.key === 'M') {
        toggleSound()
      } else if (e.key === '1') {
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
      } else if (e.key === '2') {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
      } else if (e.key === '3') {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
      } else if (e.key === '4') {
        document.getElementById('hackathon')?.scrollIntoView({ behavior: 'smooth' })
      } else if (e.key === '5') {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
      } else if (e.key === '6') {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [theme])

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'dark' ? 'light' : 'dark'))
  }

  const toggleSound = () => {
    const nextState = soundFx.toggle()
    setIsSoundOn(nextState)
    return nextState
  }

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
      
      {/* Scroll Progress Bar at the top */}
      <ScrollProgress theme={theme} />

      {/* Floating Minimalist Navbar */}
      <Navbar
        activeSection={activeSection}
        theme={theme}
        toggleTheme={toggleTheme}
        isSoundOn={isSoundOn}
        toggleSound={toggleSound}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Page Flow: About Me before Projects, then Hackathon Spotlight */}
      <main className="relative z-10">
        <Hero theme={theme} />
        <About />
        <SelectedWork />
        <HackathonJourney />
        <Timeline />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        theme={theme}
        toggleTheme={toggleTheme}
        isSoundOn={isSoundOn}
        toggleSound={toggleSound}
      />
    </div>
  )
}
