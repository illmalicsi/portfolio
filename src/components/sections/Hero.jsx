import { motion as Motion } from 'framer-motion'
import { heroData } from '../../data/portfolioData'

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-6 md:px-8 md:pb-20 md:pt-44">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <Motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="mb-5 inline-flex rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200/90 sm:px-4 sm:text-xs sm:tracking-[0.22em]">
            Available For Select Projects
          </p>
          <h1 className="text-balance text-4xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl">
            Building premium
            <span className="block bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-300 bg-clip-text text-transparent">
              digital experiences.
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            <span className="font-semibold text-slate-100">{heroData.name}</span>
            <span className="hidden sm:inline"> &bull; </span>
            <span className="block sm:inline">{heroData.title}</span>
            <br />
            {heroData.tagline}
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Motion.a
              href="#projects"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-6 py-3 text-center text-sm font-semibold text-slate-950 shadow-[0_12px_35px_-18px_rgba(56,189,248,0.9)]"
            >
              View Projects
            </Motion.a>
            <Motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-xl border border-white/20 bg-white/8 px-6 py-3 text-center text-sm font-semibold text-slate-100 backdrop-blur-md"
            >
              Contact Me
            </Motion.a>
          </div>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="glass-panel relative mx-auto w-full max-w-[92vw] sm:max-w-md rounded-3xl p-6 sm:p-8"
        >
          <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-blue-500/20 blur-3xl" />
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Current Focus</p>
          <h3 className="mt-3 text-[clamp(1.05rem,2.2vw,1.35rem)] font-bold leading-snug text-white whitespace-nowrap">
            Computer Science learning journey
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            Building strong foundations in software engineering through academic training and hands-on development projects.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Year Level</p>
              <p className="mt-2 text-2xl font-bold text-white">3rd Year</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Projects</p>
              <p className="mt-2 text-lg font-bold text-white sm:text-2xl">Academic + Personal</p>
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  )
}

export default Hero

