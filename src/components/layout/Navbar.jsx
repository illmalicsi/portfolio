import { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'
import { navLinks } from '../../data/portfolioData'

function Navbar({ activeSection, theme, toggleTheme }) {
  const [hovered, setHovered] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 mx-auto w-full px-3 pt-4 md:px-8 md:pt-5">
      <nav className="mx-auto w-full max-w-6xl rounded-2xl border border-white/10 bg-slate-900/65 px-4 py-3 backdrop-blur-xl shadow-[0_10px_50px_-20px_rgba(14,165,233,0.5)] md:px-5">
        <div className="flex items-center justify-between">
        <a href="#home" className="text-xs font-semibold tracking-[0.16em] text-slate-100 sm:text-sm sm:tracking-[0.2em]">
          ILM.DEV
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '')
            const isHovered = hovered === link.label

            return (
              <li key={link.href} onMouseEnter={() => setHovered(link.label)} onMouseLeave={() => setHovered(null)}>
                <a
                  href={link.href}
                  className="relative py-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                  {(isActive || isHovered) && (
                    <Motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-cyan-300"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/8 text-slate-200 transition hover:border-cyan-300/50 hover:text-cyan-100 sm:h-10 sm:w-10"
          >
            {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/8 text-slate-200 transition hover:border-cyan-300/50 hover:text-cyan-100 md:hidden"
          >
            {menuOpen ? <FiX size={16} /> : <FiMenu size={16} />}
          </button>

          <a
            href="#contact"
            className="hidden rounded-lg border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/70 hover:bg-cyan-300/20 md:inline-flex"
          >
            Let&apos;s Talk
          </a>
        </div>
        </div>

        {menuOpen && (
          <Motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mt-3 border-t border-white/10 pt-3 md:hidden"
          >
            <ul className="space-y-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '')
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block rounded-lg px-3 py-2 text-sm transition ${
                        isActive
                          ? 'bg-cyan-300/10 text-cyan-100'
                          : 'text-slate-200 hover:bg-white/8 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
              <li>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 block rounded-lg border border-cyan-300/40 bg-cyan-300/10 px-3 py-2 text-sm font-semibold text-cyan-100"
                >
                  Let&apos;s Talk
                </a>
              </li>
            </ul>
          </Motion.div>
        )}
      </nav>
    </header>
  )
}

export default Navbar

