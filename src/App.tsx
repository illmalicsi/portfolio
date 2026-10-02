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
import GithubContributions from './components/sections/GithubContributions'
import Footer from './components/sections/Footer'
import BottomScreenCat from './components/ui/BottomScreenCat'
import BlogPostPage from './components/pages/BlogPostPage'
import { hackathonBlogPosts } from './data/hackathonBlogData'

import { prefersReducedMotion, isTouchDevice } from './config/animation'
import { soundFx } from './utils/sound'
import { smoothScrollTo } from './utils/scroll'

gsap.registerPlugin(ScrollTrigger)

const sectionIds = ['home', 'about', 'projects', 'hackathon', 'experience', 'contact', 'contributions']
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
  const [activeBlogSlug, setActiveBlogSlug] = useState<string | null>(() => {
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#blog/')) {
      return window.location.hash.replace('#blog/', '')
    }
    return null
  })

  // Synchronize browser history / URL hash with blog article view
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash.startsWith('#blog/')) {
        const slug = window.location.hash.replace('#blog/', '')
        setActiveBlogSlug(slug)
      } else {
        setActiveBlogSlug(null)
      }
    }

    window.addEventListener('hashchange', handleHash)
    window.addEventListener('popstate', handleHash)
    return () => {
      window.removeEventListener('hashchange', handleHash)
      window.removeEventListener('popstate', handleHash)
    }
  }, [])

  const handleOpenBlogPost = (slug: string) => {
    soundFx.playClick()
    window.location.hash = `#blog/${slug}`
    setActiveBlogSlug(slug)
  }

  const handleBackFromBlog = () => {
    soundFx.playClick()
    setActiveBlogSlug(null)
    window.location.hash = '#home'
    window.scrollTo({ top: 0, behavior: 'instant' })
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number | string, opts?: unknown) => void } }).__lenis
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }
    ScrollTrigger.refresh()
  }

  // ── Lenis Smooth Scroll Synced with GSAP ScrollTrigger (Desktop only) ──
  useEffect(() => {
    // Avoid running smooth scroll on touch/mobile devices or when reduced motion is preferred
    if (prefersReducedMotion() || isTouchDevice()) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    })

    // Expose lenis instance globally for smoothScrollTo
    ;(window as unknown as { __lenis?: unknown }).__lenis = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    // Keep lag smoothing active to prevent frame-drop stuttering
    gsap.ticker.lagSmoothing(500, 33)

    return () => {
      delete (window as unknown as { __lenis?: unknown }).__lenis
      lenis.destroy()
      gsap.ticker.remove(tickerCallback)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  // Pause Lenis when blog reader overlay is open so native scrolling takes over
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis
    if (!lenis) return

    if (activeBlogSlug) {
      lenis.stop()
    } else {
      lenis.start()
    }
  }, [activeBlogSlug])

  // ── Smooth Anchor Click Delegation ──
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (href && href.startsWith('#') && href.length > 1 && !href.startsWith('#blog/')) {
        const targetEl = document.querySelector(href)
        if (targetEl) {
          e.preventDefault()
          smoothScrollTo(href)
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  // ── Refresh ScrollTrigger after DOM & assets settle ──
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 350)

    const handleLoad = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener('load', handleLoad)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('load', handleLoad)
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
        smoothScrollTo('#home')
      } else if (e.key === '2') {
        smoothScrollTo('#about')
      } else if (e.key === '3') {
        smoothScrollTo('#projects')
      } else if (e.key === '4') {
        smoothScrollTo('#hackathon')
      } else if (e.key === '5') {
        smoothScrollTo('#experience')
      } else if (e.key === '6') {
        smoothScrollTo('#contact')
      } else if (e.key === '7') {
        smoothScrollTo('#contributions')
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

  const activeBlogPost = activeBlogSlug
    ? hackathonBlogPosts.find((p) => p.id === activeBlogSlug) || hackathonBlogPosts[0]
    : null

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
        <HackathonJourney onOpenPost={handleOpenBlogPost} />
        <Timeline />
        <Contact />
        <GithubContributions theme={theme} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent Bottom Screen Cat */}
      <BottomScreenCat theme={theme} />

      {/* Full Page Blog Overlay */}
      {activeBlogPost && (
        <BlogPostPage
          post={activeBlogPost}
          onBack={handleBackFromBlog}
          onSelectPost={handleOpenBlogPost}
          theme={theme}
        />
      )}

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
