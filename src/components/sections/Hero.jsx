import { useEffect, useMemo, useRef, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { FiFileText, FiGithub, FiLinkedin, FiMail, FiUser } from 'react-icons/fi'
import profileImage from '../../assets/MALICSI, IVAN LOUIE.jpg'
import { contactLinks, heroData } from '../../data/portfolioData'

function Hero() {
  const sectionRef = useRef(null)
  const typingPhrases = useMemo(
    () => (heroData.typedPhrases?.length ? heroData.typedPhrases : ['pixel-precise interfaces.']),
    [],
  )
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(() => {
    if (typeof window !== 'undefined') {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reducedMotion) return typingPhrases[0].length
    }
    return 0
  })
  const [isDeleting, setIsDeleting] = useState(false)
  const [yearCount, setYearCount] = useState(0)
  const [projectCount, setProjectCount] = useState(0)

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotionQuery.matches) {
      return undefined
    }

    const currentPhrase = typingPhrases[phraseIndex]
    const hasFinishedTyping = charIndex === currentPhrase.length
    const hasFinishedDeleting = charIndex === 0

    let delay = isDeleting ? 46 : 90

    if (!isDeleting && hasFinishedTyping) delay = 1350
    if (isDeleting && hasFinishedDeleting) delay = 220

    const timeoutId = window.setTimeout(() => {
      if (!isDeleting && !hasFinishedTyping) {
        setCharIndex((value) => value + 1)
        return
      }

      if (!isDeleting && hasFinishedTyping) {
        setIsDeleting(true)
        return
      }

      if (isDeleting && !hasFinishedDeleting) {
        setCharIndex((value) => value - 1)
        return
      }

      setIsDeleting(false)
      setPhraseIndex((value) => (value + 1) % typingPhrases.length)
    }, delay)

    return () => window.clearTimeout(timeoutId)
  }, [charIndex, isDeleting, phraseIndex, typingPhrases])

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return undefined

    let animationFrame = 0
    let started = false
    const targetYears = 5
    const targetProjects = 20

    const animateCounters = () => {
      if (started) return
      started = true
      const start = performance.now()
      const duration = 1600

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setYearCount(Math.round(targetYears * eased))
        setProjectCount(Math.round(targetProjects * eased))

        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(tick)
        }
      }

      animationFrame = window.requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          animateCounters()
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  const typingText = typingPhrases[phraseIndex].slice(0, charIndex)
  const socialLinks = contactLinks.filter((link) => ['GitHub', 'LinkedIn', 'Email'].includes(link.label))

  return (
    <section id="home" ref={sectionRef} data-reveal className="reveal-section relative overflow-hidden px-5 pb-20 pt-32 sm:px-6 md:px-8 md:pb-28 md:pt-44">
      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-[10%] -left-[10%] w-[45vw] h-[45vw] rounded-full bg-[rgba(99,102,241,0.06)] blur-[120px] animate-pulse" />
        <div className="absolute top-[30%] right-[5%] w-[35vw] h-[35vw] rounded-full bg-[rgba(6,182,212,0.05)] blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
      </div>

      <div className="hero-grid-lines pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-2 items-center">
          
          {/* Left Column: Bio & Text */}
          <Motion.div 
            initial={{ opacity: 0, y: 26 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, ease: 'easeOut' }} 
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Status Badge */}
            <div className="mb-6 self-start inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-2)] px-3 py-1.5 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.14em] text-[var(--gold)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--teal)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--teal)]"></span>
              </span>
              Available for opportunities
            </div>

            <p className="font-['JetBrains_Mono'] text-[13px] uppercase tracking-[0.2em] text-[var(--gold)] font-semibold mb-2">
              Ivan Louie L. Malicsi
            </p>

            <h1 className="font-['Outfit'] text-[40px] sm:text-[48px] md:text-[56px] font-extrabold tracking-tight leading-[1.1] text-[var(--text)]">
              Crafting Clean Code <br />
              <span className="bg-gradient-to-r from-[var(--gold)] to-[var(--teal)] bg-clip-text text-transparent">
                &amp; Interactive Apps
              </span>
            </h1>

            <p className="mt-4 font-['JetBrains_Mono'] text-[13px] sm:text-[15px] text-[var(--text-dim)] flex items-center flex-wrap gap-y-1">
              I specialize in <span className="bg-gradient-to-r from-[var(--gold)] to-[var(--teal)] bg-clip-text text-transparent font-bold ml-1.5">{typingText}</span>
              <span className="typing-cursor ml-0.5" aria-hidden="true">|</span>
            </p>

            <p className="mt-5 text-[15px] sm:text-[16px] text-[var(--text-dim)] leading-relaxed max-w-xl">
              {heroData.tagline}
            </p>

            {/* Quick stats grid */}
            <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-2)] p-4 text-center transition hover:border-[var(--border-gold)]">
                <p className="font-['Outfit'] text-[24px] font-bold text-[var(--gold)] leading-none">{yearCount}+</p>
                <p className="mt-1 font-['Outfit'] text-[11px] text-[var(--text-muted)] font-medium">Years Learning</p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-2)] p-4 text-center transition hover:border-[var(--border-gold)]">
                <p className="font-['Outfit'] text-[24px] font-bold text-[var(--gold)] leading-none">{projectCount}+</p>
                <p className="mt-1 font-['Outfit'] text-[11px] text-[var(--text-muted)] font-medium">Projects Made</p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-2)] p-4 text-center transition hover:border-[var(--border-gold)]">
                <p className="font-['Outfit'] text-[24px] font-bold text-[var(--gold)] leading-none">5+</p>
                <p className="mt-1 font-['Outfit'] text-[11px] text-[var(--text-muted)] font-medium">Milestones</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <a href="#projects" className="btn-primary group">
                Explore Projects
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 ml-1.5">&rarr;</span>
              </a>
              <a href="#contact" className="btn-secondary">
                Let&apos;s Connect
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-2">
              <span className="font-['JetBrains_Mono'] text-[10px] text-[var(--text-muted)] uppercase tracking-wider mr-2">Connect:</span>
              {socialLinks.map((link) => {
                let Icon = FiUser
                if (link.label === 'GitHub') Icon = FiGithub
                if (link.label === 'LinkedIn') Icon = FiLinkedin
                if (link.label === 'Email') Icon = FiMail

                return (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-2)] text-[var(--text-dim)] transition hover:border-[var(--gold)] hover:text-[var(--gold)]" aria-label={link.label}>
                    <Icon size={14} />
                  </a>
                )
              })}
            </div>
          </Motion.div>

          {/* Right Column: Code Editor Mockup + Image */}
          <Motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="relative w-full max-w-sm mx-auto lg:ml-0 rounded-2xl border border-[var(--border)] bg-[var(--bg-2)] shadow-2xl overflow-hidden group">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-3)]">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/80 inline-block" />
                </div>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[var(--text-muted)] tracking-wider">profile.json</span>
                <span className="h-2.5 w-2.5" />
              </div>
              
              {/* Card Body */}
              <div className="p-5 flex flex-col gap-5">
                {/* Photo Frame */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--bg-3)]">
                  <img 
                    src={profileImage} 
                    alt="Ivan Louie L. Malicsi" 
                    className="w-full h-full object-cover object-[center_18%] filter grayscale-[0.25] transition-all duration-300 group-hover:filter-none group-hover:scale-[1.02]" 
                  />
                  {/* Location Badge overlay */}
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg bg-[rgba(15,23,42,0.85)] border border-[var(--border)] px-2.5 py-1 font-['JetBrains_Mono'] text-[9px] text-[#ffffff] backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--teal)] animate-pulse" />
                    Davao, PH
                  </div>
                </div>
                
                {/* Code Data Block */}
                <div className="rounded-lg bg-[var(--bg-3)] p-4 border border-[var(--border)] font-['JetBrains_Mono'] text-[11px] leading-relaxed text-[var(--text-dim)]">
                  <p className="text-[var(--gold)] font-medium">{"{"}</p>
                  <p className="pl-4"><span className="text-[var(--teal)]">"name"</span>: <span className="text-amber-500">"Ivan Malicsi"</span>,</p>
                  <p className="pl-4"><span className="text-[var(--teal)]">"role"</span>: <span className="text-amber-500">"CS Student"</span>,</p>
                  <p className="pl-4"><span className="text-[var(--teal)]">"focus"</span>: <span className="text-amber-500">"Full Stack Developer"</span>,</p>
                  <p className="pl-4"><span className="text-[var(--teal)]">"status"</span>: <span className="text-emerald-500">"Available"</span></p>
                  <p className="text-[var(--gold)] font-medium">{"}"}</p>
                </div>
              </div>
            </div>
          </Motion.aside>

        </div>
      </div>
    </section>
  )
}

export default Hero
