import { useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiMoon, FiSun, FiX, FiVolume2, FiVolumeX, FiSearch } from 'react-icons/fi'
import { navLinks } from '../../data/portfolioData'
import { soundFx } from '../../utils/sound'
import logoImg from '../../assets/logo.jpg'

interface NavbarProps {
  activeSection: string
  theme: 'dark' | 'light'
  toggleTheme: () => void
  isSoundOn: boolean
  toggleSound: () => void
  onOpenCommandPalette: () => void
}

export default function Navbar({
  activeSection,
  theme,
  toggleTheme,
  isSoundOn,
  toggleSound,
  onOpenCommandPalette,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLinkClick = () => {
    soundFx.playClick()
    setMenuOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 mx-auto w-full px-4 pt-4 sm:px-6 sm:pt-5 pointer-events-none">
      <nav className="mx-auto w-full max-w-4xl rounded-full border border-black/[0.08] bg-white/80 dark:border-white/[0.08] dark:bg-black/60 px-3 py-2 backdrop-blur-xl shadow-lg dark:shadow-2xl transition-all pointer-events-auto sm:px-4">
        <div className="flex items-center justify-between">
          
          {/* Logo Monogram */}
          <a
            href="#home"
            onClick={handleLinkClick}
            className="group flex items-center gap-2.5 pl-2 text-sm font-semibold tracking-tight text-zinc-900 dark:text-white transition-opacity hover:opacity-80"
            aria-label="Ivan Louie Malicsi Home"
          >
            <div className="relative h-8 w-8 overflow-hidden rounded-lg border border-black/10 dark:border-white/20 bg-zinc-100 dark:bg-black transition-transform group-hover:scale-105 shadow-sm">
              <img
                src={logoImg}
                alt="Ivan Louie Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="hidden font-mono text-xs font-medium text-zinc-600 dark:text-zinc-300 sm:inline-block">
              malicsi.dev
            </span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const targetId = link.href.replace('#', '')
              const isActive = activeSection === targetId

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    onMouseEnter={() => soundFx.playHover()}
                    className={`relative px-3.5 py-1.5 font-mono text-xs transition-colors rounded-full ${
                      isActive
                        ? 'text-zinc-900 dark:text-white font-semibold'
                        : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <Motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-black/[0.06] border border-black/[0.06] dark:bg-white/[0.09] dark:border-white/[0.08]"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Action Utilities (Cmd+K, Sound, Theme, Talk) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Command Palette Trigger */}
            <button
              type="button"
              onClick={() => {
                soundFx.playClick()
                onOpenCommandPalette()
              }}
              className="flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-black/[0.03] text-zinc-600 hover:border-black/20 hover:text-zinc-900 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-400 dark:hover:border-white/20 dark:hover:text-white px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer"
              title="Search and shortcuts (⌘K)"
            >
              <FiSearch size={12} />
              <span className="hidden sm:inline text-[10px] text-zinc-400 dark:text-zinc-500">⌘K</span>
            </button>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={() => {
                toggleSound()
              }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.08] bg-black/[0.03] text-zinc-600 hover:border-black/20 hover:text-zinc-900 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-400 dark:hover:border-white/20 dark:hover:text-white transition-colors cursor-pointer"
              title={isSoundOn ? 'Mute sound (M)' : 'Enable sound (M)'}
              aria-label="Toggle sound"
            >
              {isSoundOn ? <FiVolume2 size={13} /> : <FiVolumeX size={13} />}
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={() => {
                soundFx.playToggle()
                toggleTheme()
              }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.08] bg-black/[0.03] text-zinc-600 hover:border-black/20 hover:text-zinc-900 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-400 dark:hover:border-white/20 dark:hover:text-white transition-colors cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode (T)`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FiSun size={13} /> : <FiMoon size={13} />}
            </button>

            {/* Talk Pill (CTA) */}
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="hidden sm:inline-flex items-center rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 px-3.5 py-1 text-xs font-medium transition-colors cursor-pointer shadow-sm"
            >
              Let&apos;s Talk
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => {
                soundFx.playClick()
                setMenuOpen((prev) => !prev)
              }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.08] bg-black/[0.03] text-zinc-600 hover:text-zinc-900 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-400 dark:hover:text-white md:hidden cursor-pointer"
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            >
              {menuOpen ? <FiX size={15} /> : <FiMenu size={15} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <Motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="overflow-hidden md:hidden border-t border-black/[0.08] dark:border-white/[0.08] mt-3 pt-3 pb-1"
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const targetId = link.href.replace('#', '')
                  const isActive = activeSection === targetId

                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={handleLinkClick}
                        className={`block rounded-lg px-3 py-2 text-xs font-mono transition-colors ${
                          isActive
                            ? 'bg-black/[0.06] text-zinc-900 font-semibold dark:bg-white/10 dark:text-white'
                            : 'text-zinc-600 hover:bg-black/[0.04] hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.04] dark:hover:text-zinc-200'
                        }`}
                      >
                        {link.label}
                      </a>
                    </li>
                  )
                })}
                <li className="pt-2">
                  <a
                    href="#contact"
                    onClick={handleLinkClick}
                    className="block text-center rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 px-3 py-2 text-xs font-medium transition-colors"
                  >
                    Let&apos;s Talk
                  </a>
                </li>
              </ul>
            </Motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
