import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/layout/Navbar'
import CommandPalette from './components/layout/CommandPalette'
import ScrollProgress from './components/ui/ScrollProgress'
import GridGuides from './components/ui/GridGuides'
import FilmGrain from './components/ui/FilmGrain'
import CustomCursor from './components/ui/CustomCursor'
import Preloader from './components/ui/Preloader'

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

import { prefersReducedMotion, isTouchDevice } from './config/motion'
import { soundFx } from './utils/sound'
import { smoothScrollTo } from './utils/scroll'

gsap.registerPlugin(ScrollTrigger)

const sectionIds = ['home', 'about', 'projects', 'hackathon', 'experience', 'contact', 'contributions']
const themeKey = 'portfolio-theme'

function getInitialTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'light'
  const params = new URLSearchParams(window.location.search)
  const queryTheme = params.get('theme')
  if (queryTheme === 'dark' || queryTheme === 'light') return queryTheme
  const storedTheme = window.localStorage.getItem(themeKey)
  if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme
  return 'light' // Swiss Dossier light-first default
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [isSoundOn, setIsSoundOn] = useState(() => soundFx.isEnabled())
  const [isPreloaderFinished, setIsPreloaderFinished] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('skip_preloader') === '1') return true
      return window.sessionStorage.getItem('ilm_portfolio_preloader_seen') === 'true'
    }
    return false
  })

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
    if (prefersReducedMotion() || isTouchDevice()) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    })

    ;(window as unknown as { __lenis?: unknown }).__lenis = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
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
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--vermilion)] selection:text-white transition-colors duration-200">
      
      {/* ── 1. One-time Session Preloader with SVG Stroke Animation & Curtain Wipe ── */}
      <Preloader
        onComplete={() => setIsPreloaderFinished(true)}
        theme={theme}
      />

      {/* ── 2. Custom Cursor for Fine-Pointer Devices (Spring Lag + Ring + View Pill + Text Shrink) ── */}
      <CustomCursor theme={theme} />

      {/* ── 3. Subtle Analog Film-Grain Overlay (~3% Opacity, Pointer Events None) ── */}
      <FilmGrain />

      {/* ── 4. Scroll Progress Bar at the top (Vermilion) ── */}
      <ScrollProgress theme={theme} />

      {/* ── 5. Visible 12-Column Grid Guides with Staggered scaleY Animation ── */}
      <GridGuides theme={theme} />

      {/* ── 6. Fixed Left Rail on Desktop / Top Bar on Mobile ── */}
      <Navbar
        activeSection={activeSection}
        theme={theme}
        toggleTheme={toggleTheme}
        isSoundOn={isSoundOn}
        toggleSound={toggleSound}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* ── 7. Main Editorial Page Flow (Offset md:pl-[72px] for Fixed Left Rail) ── */}
      <div className="md:pl-[72px] min-h-screen flex flex-col justify-between">
        <main className="relative z-10 flex-1">
          <Hero
            theme={theme}
            startAnimation={isPreloaderFinished}
          />
          <About />
          <SelectedWork />
          <HackathonJourney onOpenPost={handleOpenBlogPost} />
          <Timeline />
          <Contact />
          <GithubContributions theme={theme} />
        </main>

        {/* ── 8. Minimal Hairline Footer ── */}
        <Footer />
      </div>

      {/* ── 9. Ambient Companion Cat (Polite, well-behaved bottom-screen character) ── */}
      <BottomScreenCat theme={theme} />

      {/* ── 10. Full Page Editorial Blog Overlay ── */}
      {activeBlogPost && (
        <BlogPostPage
          post={activeBlogPost}
          onBack={handleBackFromBlog}
          onSelectPost={handleOpenBlogPost}
          theme={theme}
        />
      )}

      {/* ── 11. Global Command Palette ── */}
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
