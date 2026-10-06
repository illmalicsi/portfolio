import { motion as Motion } from 'framer-motion'
import KineticHeadline from '../ui/KineticHeadline'
import SpecSheet from '../ui/SpecSheet'
import TickerTape from '../ui/TickerTape'
import MagneticButton from '../ui/MagneticButton'
import { PRIMARY_EASE_CURVE } from '../../config/motion'
import logoImg from '../../assets/logo.jpg'

interface HeroProps {
  theme?: 'dark' | 'light'
  startAnimation?: boolean
}

export default function Hero({ startAnimation = true }: HeroProps) {
  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] flex-col justify-center px-4 pt-24 pb-16 sm:px-8 sm:pt-28 lg:px-12 max-w-7xl mx-auto w-full select-none"
    >
      {/* ── Folio / Header Meta Line Snap ── */}
      <Motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: PRIMARY_EASE_CURVE }}
        className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-3 font-mono text-[11px] tracking-wider text-[var(--text-muted)]"
      >
        <div className="flex items-center gap-2.5">
          <div className="relative h-5 w-5 overflow-hidden rounded border border-hairline">
            <img src={logoImg} alt="Ivan Louie" className="h-full w-full object-cover" />
          </div>
          <span className="font-semibold text-[var(--text)]">IVAN LOUIE MALICSI</span>
          <span>/</span>
          <span>2026</span>
        </div>
        <div className="flex items-center gap-3">
          <span>PORTFOLIO COMPENDIUM</span>
          <span className="h-1 w-1 rounded-full bg-[var(--vermilion)]" />
          <span>EDITION 4.0</span>
        </div>
      </Motion.div>

      {/* ── Left-Aligned Kinetic Headline ── */}
      <div className="relative z-10 w-full max-w-4xl text-left">
        <KineticHeadline startAnimation={startAnimation} />

        {/* Calm Body Measure (Compact text after heading) */}
        <Motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.35, ease: PRIMARY_EASE_CURVE }}
          className="mt-4 text-xs sm:text-sm text-[var(--text-muted)] max-w-[58ch] leading-relaxed font-body"
        >
          Senior Computer Science student at Ateneo de Davao. Engineering resilient full-stack systems, clean architectures, and refined interfaces with disciplined craft.
        </Motion.p>

        {/* ── Technical Specification Sheet (typed character-by-character) ── */}
        <SpecSheet startAnimation={startAnimation} />

        {/* ── Thin Looping Ticker Tape ── */}
        <TickerTape />

        {/* ── Understated Magnetic Call-To-Action Links ── */}
        <Motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.55, delay: 0.5, ease: PRIMARY_EASE_CURVE }}
          className="mt-2 flex flex-wrap items-center gap-8 sm:gap-10"
        >
          <MagneticButton href="#projects" strength={0.25} variant="ghost">
            <span className="editorial-link">
              <span>View Selected Work</span>
              <span>↗</span>
            </span>
          </MagneticButton>

          <MagneticButton href="#contact" strength={0.25} variant="ghost">
            <span className="editorial-link">
              <span>Start a Conversation</span>
              <span>↗</span>
            </span>
          </MagneticButton>
        </Motion.div>
      </div>
    </section>
  )
}
