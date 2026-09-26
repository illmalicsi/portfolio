import { useEffect, useRef } from 'react'
import { motion as Motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiArrowUpRight } from 'react-icons/fi'
import profileImage from '../../assets/MALICSI, IVAN LOUIE.jpg'
import MagneticButton from '../ui/MagneticButton'
import AeroShards from '../ui/AeroShards'
import { prefersReducedMotion } from '../../config/animation'

gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  theme?: 'dark' | 'light'
}

export default function Hero({ theme = 'dark' }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgGlowRef = useRef<HTMLDivElement>(null)

  // Subtle background parallax via GSAP
  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      if (bgGlowRef.current) {
        gsap.to(bgGlowRef.current, {
          y: 90,
          opacity: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative flex min-h-[92vh] flex-col items-center justify-center px-4 pt-28 pb-16 sm:px-6 sm:pt-36 lg:px-8 overflow-hidden"
    >
      {/* Background WebGPU AeroShards Simulation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AeroShards
          backgroundColor={theme === 'light' ? '#f4f4f7' : '#08080c'}
          shardColor={theme === 'light' ? '#6366f1' : '#896ABD'}
          accentColor={theme === 'light' ? '#8b5cf6' : '#A855F7'}
          placement="full"
          flow="stream"
          material="pearl"
          detail="balanced"
          effect="none"
          scale={1}
          spread={1}
          depth={1}
          speed={1}
          spin={1}
          interaction="repel"
          density={1.4}
          shardSize={1.05}
          stretch={1}
          turbulence={1}
          glow={theme === 'light' ? 0.35 : 0.8}
          edgeSoftness={2}
          bloom={theme === 'light' ? 0.2 : 0.45}
          grain={theme === 'light' ? 0.02 : 0.04}
          chromaticAberration={0.006}
          transitionDuration={1}
          interactionRadius={1.5}
          interactionStrength={0.5}
          rippleIntensity={1}
          holdToGather
          paused={false}
        />
        {/* Vignette & soft bottom gradient fade to seamlessly blend into subsequent sections */}
        <div
          className={`pointer-events-none absolute inset-0 ${
            theme === 'light'
              ? 'bg-radial-[ellipse_80%_60%_at_50%_40%] from-transparent via-[#fafafa]/40 to-[#fafafa]/95'
              : 'bg-radial-[ellipse_80%_60%_at_50%_40%] from-transparent via-black/40 to-black/90'
          }`}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--bg)] to-transparent" />
      </div>

      {/* Subtle Background Glow Mesh */}
      <div
        ref={bgGlowRef}
        className={`pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[550px] w-full max-w-5xl rounded-full blur-[90px] z-[1] ${
          theme === 'light'
            ? 'bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.08)_0%,rgba(250,250,250,0)_75%)]'
            : 'bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(140,140,220,0.12)_0%,rgba(0,0,0,0)_75%)]'
        }`}
        aria-hidden="true"
      />

      {/* Foreground Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl flex flex-col items-center text-center">
        
        {/* Simple Status & Profile Pill */}
        <Motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-black/[0.08] bg-white/80 dark:border-white/[0.1] dark:bg-black/60 px-3.5 py-1.5 backdrop-blur-xl shadow-lg"
        >
          <img
            src={profileImage}
            alt="Ivan Louie Malicsi"
            className="h-5 w-5 rounded-full object-cover border border-zinc-300 dark:border-white/20"
          />
          <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300">
            Ivan Louie Malicsi
          </span>
          <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            Available for work
          </span>
        </Motion.div>

        {/* Large Confident Minimal Headline */}
        <Motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-6xl lg:text-7xl leading-[1.08] max-w-3xl drop-shadow-sm"
        >
          Building modern software with precision &amp; craft.
        </Motion.h1>

        {/* Short, Simple One-Line Pitch */}
        <Motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-xl leading-relaxed drop-shadow-sm"
        >
          Full-stack developer &amp; 4th year CS student at Ateneo de Davao. Crafting fast web apps, intelligent interfaces, and clean architectures.
        </Motion.p>

        {/* Minimal CTAs */}
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="#projects" variant="primary">
            Explore Work <FiArrowUpRight size={14} className="ml-1" />
          </MagneticButton>

          <MagneticButton href="#contact" variant="secondary">
            Get in Touch
          </MagneticButton>
        </Motion.div>

      </div>
    </section>
  )
}
