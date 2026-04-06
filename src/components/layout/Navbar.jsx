import { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'
import { navLinks } from '../../data/portfolioData'
import logoMe from '../../assets/logo_me.png'

function Navbar({ activeSection, theme, toggleTheme }) {
  const [hovered, setHovered] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 mx-auto w-full px-3 pt-4 md:px-8 md:pt-5">
      <nav className="mx-auto w-full max-w-6xl rounded-2xl border border-[var(--border)] bg-[color:var(--nav-surface)] px-4 py-3 backdrop-blur-xl shadow-[var(--nav-shadow)] md:px-5">
        <div className="flex items-center justify-between">
        <a href="#home" className="inline-flex items-center" aria-label="Go to Home">
          <img
            src={logoMe}
            alt="Ivan logo"
            className="h-10 w-auto object-contain sm:h-12"
          />
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '')
            const isHovered = hovered === link.label

            return (
              <li key={link.href} onMouseEnter={() => setHovered(link.label)} onMouseLeave={() => setHovered(null)}>
                <a
                  href={link.href}
                  className="relative py-2 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.14em] text-[var(--text-dim)] transition-colors duration-200 hover:text-[var(--text)]"
                >
                  {link.label}
                  {(isActive || isHovered) && (
                    <Motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-px rounded-full bg-[var(--gold)]"
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
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-3)] text-[var(--text-dim)] transition hover:border-[var(--border-gold)] hover:text-[var(--gold)] sm:h-10 sm:w-10"
          >
            {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-3)] text-[var(--text-dim)] transition hover:border-[var(--border-gold)] hover:text-[var(--gold)] md:hidden"
          >
            {menuOpen ? <FiX size={16} /> : <FiMenu size={16} />}
          </button>

          <a
            href="#contact"
            className="hidden rounded-lg border border-[var(--border-gold)] bg-transparent px-4 py-2 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.12em] text-[var(--gold)] transition hover:bg-[var(--gold)] hover:text-[var(--bg)] md:inline-flex"
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
              className="mt-3 border-t border-[var(--border)] pt-3 md:hidden"
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
                          ? 'bg-[rgba(201,168,76,0.13)] text-[var(--gold)]'
                          : 'text-[var(--text-dim)] hover:bg-[var(--bg-3)] hover:text-[var(--text)]'
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
                  className="mt-2 block rounded-lg border border-[var(--border-gold)] px-3 py-2 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.12em] text-[var(--gold)]"
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

