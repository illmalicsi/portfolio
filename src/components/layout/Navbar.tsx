import React, { useState, useEffect } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiMoon, FiSun, FiX, FiSearch } from 'react-icons/fi'
import { SHARED_SPRING, PRIMARY_EASE_CURVE } from '../../config/motion'
import { soundFx } from '../../utils/sound'
import logoImg from '../../assets/logo.jpg'

interface NavbarProps {
  activeSection: string
  theme: 'dark' | 'light'
  toggleTheme: () => void
  isSoundOn?: boolean
  toggleSound?: () => void
  onOpenCommandPalette?: () => void
}

interface IndexItem {
  number: string
  label: string
  id: string
  href: string
}

const INDEX_ITEMS: IndexItem[] = [
  { number: '01', label: 'HOME', id: 'home', href: '#home' },
  { number: '02', label: 'ABOUT', id: 'about', href: '#about' },
  { number: '03', label: 'WORK', id: 'projects', href: '#projects' },
  { number: '04', label: 'CAREER', id: 'experience', href: '#experience' },
  { number: '05', label: 'CONTACT', id: 'contact', href: '#contact' },
]

const ALL_MOBILE_ITEMS = [
  { number: '01', label: 'HOME', href: '#home' },
  { number: '02', label: 'ABOUT', href: '#about' },
  { number: '03', label: 'PROJECTS', href: '#projects' },
  { number: '04', label: 'HACKATHONS', href: '#hackathon' },
  { number: '05', label: 'EXPERIENCE', href: '#experience' },
  { number: '06', label: 'CONTRIBUTIONS', href: '#contributions' },
  { number: '07', label: 'CONTACT', href: '#contact' },
]

export default function Navbar({
  activeSection,
  theme,
  toggleTheme,
  onOpenCommandPalette,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Prevent background scrolling when mobile menu overlay is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      const lenis = (window as unknown as { __lenis?: { stop: () => void } }).__lenis
      if (lenis?.stop) lenis.stop()
    } else {
      document.body.style.overflow = ''
      const lenis = (window as unknown as { __lenis?: { start: () => void } }).__lenis
      if (lenis?.start) lenis.start()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleLinkClick = () => {
    soundFx.playClick()
    setMobileMenuOpen(false)
  }

  // Circular clip-path theme toggle using View Transitions API
  const handleToggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    soundFx.playToggle()
    const isTransitionSupported =
      typeof document.startViewTransition === 'function' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!isTransitionSupported) {
      toggleTheme()
      return
    }

    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = document.startViewTransition(() => {
      toggleTheme()
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 480,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    })
  }

  // Map activeSection (e.g. 'hackathon' maps visually to 03 WORK, 'contributions' to 04 CAREER)
  const getMappedActiveId = (id: string) => {
    if (id === 'hackathon') return 'projects'
    if (id === 'contributions') return 'experience'
    return id
  }

  const mappedActiveId = getMappedActiveId(activeSection)

  return (
    <>
      {/* ── 1. Desktop Fixed Left Rail (w-18 = 72px) ───────────────────────── */}
      <aside
        aria-label="Sidebar Navigation"
        className="hidden md:flex fixed left-0 top-0 bottom-0 w-[72px] z-50 flex-col justify-between items-center py-7 border-r border-hairline bg-[var(--bg)]/90 backdrop-blur-md select-none transition-colors duration-200"
      >
        {/* Monogram Logo */}
        <a
          href="#home"
          onClick={handleLinkClick}
          className="group flex flex-col items-center gap-1.5 transition-opacity hover:opacity-80"
          aria-label="Ivan Louie Malicsi Home"
        >
          <div className="relative h-8 w-8 overflow-hidden rounded border border-hairline transition-all group-hover:border-[var(--vermilion)]">
            <img
              src={logoImg}
              alt="Ivan Louie Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="font-mono text-[10px] tracking-widest text-[var(--text-muted)] group-hover:text-[var(--text)]">
            ILM
          </span>
        </a>

        {/* Vertical Section Index 01 to 05 */}
        <nav aria-label="Section Index" className="my-auto py-4">
          <ul className="flex flex-col items-center gap-5">
            {INDEX_ITEMS.map((item) => {
              const isActive = mappedActiveId === item.id

              return (
                <li key={item.number} className="relative flex items-center justify-center">
                  <a
                    href={item.href}
                    onClick={handleLinkClick}
                    onMouseEnter={() => soundFx.playHover()}
                    className="group relative flex flex-col items-center px-2 py-1 text-center"
                    aria-label={`${item.number} ${item.label}`}
                    title={`${item.number} ${item.label}`}
                  >
                    {/* Small vermilion dot indicator sliding between active entries */}
                    <div className="relative flex h-3 w-3 items-center justify-center mb-1">
                      {isActive && (
                        <Motion.span
                          layoutId="rail-vermilion-dot"
                          className="h-1.5 w-1.5 rounded-full bg-[var(--vermilion)]"
                          transition={SHARED_SPRING}
                        />
                      )}
                    </div>

                    {/* Number in JetBrains Mono */}
                    <span
                      className={`font-mono text-[11px] tracking-wider transition-colors duration-200 ${
                        isActive
                          ? 'text-[var(--text)] font-semibold'
                          : 'text-[var(--text-muted)] group-hover:text-[var(--text)]'
                      }`}
                    >
                      {item.number}
                    </span>

                    {/* Tiny vertical label */}
                    <span
                      className={`text-[8px] font-mono tracking-widest uppercase transition-colors duration-200 ${
                        isActive
                          ? 'text-[var(--vermilion)] font-medium'
                          : 'text-transparent group-hover:text-[var(--text-muted)]'
                      }`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Rail Footer Controls: Command Palette & Theme Toggle */}
        <div className="flex flex-col items-center gap-3">
          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={() => {
                soundFx.playClick()
                onOpenCommandPalette()
              }}
              className="flex h-7 w-7 items-center justify-center border border-hairline text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--text)] transition-colors cursor-pointer"
              title="Search (⌘K)"
              aria-label="Open command palette (⌘K)"
            >
              <FiSearch size={12} />
            </button>
          )}

          <button
            type="button"
            onClick={handleToggleTheme}
            className="flex h-7 w-7 items-center justify-center border border-hairline text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--text)] transition-colors cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode (T)`}
            aria-label="Toggle light or dark theme"
          >
            {theme === 'dark' ? <FiSun size={12} /> : <FiMoon size={12} />}
          </button>
        </div>
      </aside>

      {/* ── 2. Mobile Minimal Top Bar (h-14) ───────────────────────────────── */}
      <header className="md:hidden fixed top-0 inset-x-0 h-14 z-50 flex items-center justify-between px-5 border-b border-hairline bg-[var(--bg)]/90 backdrop-blur-md select-none">
        <a
          href="#home"
          onClick={handleLinkClick}
          className="flex items-center gap-2.5"
          aria-label="Ivan Louie Malicsi Home"
        >
          <div className="relative h-7 w-7 overflow-hidden rounded border border-hairline">
            <img
              src={logoImg}
              alt="Ivan Louie Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="font-mono text-xs font-medium tracking-tight text-[var(--text)]">
            IVAN LOUIE MALICSI
          </span>
        </a>

        <div className="flex items-center gap-2">
          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={() => {
                soundFx.playClick()
                onOpenCommandPalette()
              }}
              className="flex h-8 w-8 items-center justify-center border border-hairline text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
              aria-label="Search"
            >
              <FiSearch size={13} />
            </button>
          )}

          <button
            type="button"
            onClick={handleToggleTheme}
            className="flex h-8 w-8 items-center justify-center border border-hairline text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun size={13} /> : <FiMoon size={13} />}
          </button>

          <button
            type="button"
            onClick={() => {
              soundFx.playClick()
              setMobileMenuOpen(true)
            }}
            className="flex h-8 w-8 items-center justify-center border border-hairline text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
            aria-label="Open index menu"
          >
            <FiMenu size={14} />
          </button>
        </div>
      </header>

      {/* ── 3. Mobile Full-Screen Index Overlay ───────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: PRIMARY_EASE_CURVE }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-[var(--bg)] p-6 sm:p-8 select-none"
          >
            {/* Top Bar inside overlay */}
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--vermilion)]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--text)]">
                  TABLE OF CONTENTS
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick()
                  setMobileMenuOpen(false)
                }}
                className="flex h-9 w-9 items-center justify-center border border-hairline text-[var(--text)] hover:border-[var(--vermilion)] transition-colors cursor-pointer"
                aria-label="Close index menu"
              >
                <FiX size={16} />
              </button>
            </div>

            {/* Middle: Editorial Numbered Index */}
            <nav className="my-auto py-6">
              <ul className="flex flex-col gap-4">
                {ALL_MOBILE_ITEMS.map((item, index) => {
                  return (
                    <Motion.li
                      key={item.number}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.05 + index * 0.04,
                        ease: PRIMARY_EASE_CURVE,
                      }}
                    >
                      <a
                        href={item.href}
                        onClick={handleLinkClick}
                        className="group flex items-baseline justify-between border-b border-hairline/60 pb-3"
                      >
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-xs text-[var(--text-muted)] group-hover:text-[var(--vermilion)] transition-colors">
                            {item.number}
                          </span>
                          <span className="font-sans text-xl sm:text-2xl font-normal tracking-tight text-[var(--text)] group-hover:translate-x-1 transition-transform">
                            {item.label}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-[var(--text-muted)] group-hover:text-[var(--vermilion)] transition-colors">
                          ↗
                        </span>
                      </a>
                    </Motion.li>
                  )
                })}
              </ul>
            </nav>

            {/* Bottom Meta info */}
            <div className="border-t border-hairline pt-4 flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
              <span>IVAN LOUIE MALICSI</span>
              <span>DAVAO CITY, PH</span>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
