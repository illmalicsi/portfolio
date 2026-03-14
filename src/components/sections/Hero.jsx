import { useEffect, useMemo, useRef, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { contactLinks, experience, heroData, projects } from '../../data/portfolioData'

function Hero() {
  const sectionRef = useRef(null)
  const typedPhrases = useMemo(
    () => (heroData.typedPhrases?.length ? heroData.typedPhrases : ['digital experiences.']),
    []
  )

  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [yearCount, setYearCount] = useState(0)
  const [projectCount, setProjectCount] = useState(0)
  const [orgCount, setOrgCount] = useState(0)

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotionQuery.matches) {
      setCharIndex(typedPhrases[0].length)
      return undefined
    }

    const currentPhrase = typedPhrases[phraseIndex]
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
      setPhraseIndex((value) => (value + 1) % typedPhrases.length)
    }, delay)

    return () => window.clearTimeout(timeoutId)
  }, [charIndex, isDeleting, phraseIndex, typedPhrases])

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return undefined

    let animationFrame = 0
    let started = false
    const targetYears = 3
    const targetProjects = Math.max(projects.length, 1)
    const targetOrganizations = Math.max(experience.length, 1)

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
        setOrgCount(Math.round(targetOrganizations * eased))

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

  const typedText = typedPhrases[phraseIndex].slice(0, charIndex)
  const nameParts = heroData.name.trim().split(' ')
  const lastName = nameParts[nameParts.length - 1] ?? ''
  const firstNames = nameParts.slice(0, -1).join(' ')
  const highlights = [
    'Frontend development with React and Tailwind CSS',
    'Backend fundamentals with Node.js and Express',
    'Continuous learning through academic and personal projects',
  ]
  const latestMilestone = experience[0]
  const socialLinks = contactLinks.filter((link) => ['GitHub', 'LinkedIn'].includes(link.label))

  return (
    <section id="home" ref={sectionRef} data-reveal className="reveal-section hero2-wrap relative overflow-hidden px-5 pb-16 pt-28 sm:px-6 md:px-8 md:pb-20 md:pt-40">
      <div className="hero-grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-glow-2 pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero2-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="hero2-grid">
          <Motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }} className="hero-content">
            <div className="hero-tag">Available for select projects</div>

            <h1 className="hero2-title">
              I Design And Build
              <span className="hero2-title-accent">{typedText}<span className="typing-cursor" aria-hidden="true">|</span></span>
            </h1>

            <p className="hero2-intro">
              <span className="hero2-name">{firstNames} <span className="accent">{lastName}</span></span>
              <span className="hero2-role">{heroData.title}</span>
            </p>

            <p className="hero-desc">{heroData.tagline}</p>

            <div className="hero-actions">
              <a href="#projects" className="btn-primary">View My Work</a>
              <a href="#contact" className="btn-secondary">
                <FiMail size={14} />
                Get In Touch
              </a>
            </div>

            <div className="hero2-socials">
              {socialLinks.map((link) => {
                const Icon = link.label === 'GitHub' ? FiGithub : FiLinkedin
                return (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="hero2-social-link">
                    <Icon size={14} />
                    {link.label}
                    <FiArrowUpRight size={12} />
                  </a>
                )
              })}
            </div>
          </Motion.div>

          <Motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut', delay: 0.1 }}
            className="hero2-spotlight glass-panel"
          >
            <p className="hero2-spotlight-label">What I Bring</p>
            <h3 className="hero2-spotlight-title">Reliable engineering with a product-first mindset</h3>

            <ul className="hero2-highlights">
              {highlights.map((item) => (
                <li key={item} className="hero2-highlight-item">{item}</li>
              ))}
            </ul>

            {latestMilestone && (
              <p className="hero2-meta">
                Latest milestone: <span>{latestMilestone.role}</span>
              </p>
            )}

            <a href="#projects" className="hero2-mini-cta">
              Explore Projects
              <FiArrowUpRight size={14} />
            </a>
          </Motion.aside>
        </div>

        <Motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: 'easeOut' }}
          className="hero-stats hero2-stats-strip"
        >
          <div>
            <div className="hero-stat-num"><span>{yearCount}</span>+</div>
            <div className="hero-stat-label">Years Learning</div>
          </div>
          <div>
            <div className="hero-stat-num"><span>{projectCount}</span>+</div>
            <div className="hero-stat-label">Projects Shipped</div>
          </div>
          <div>
            <div className="hero-stat-num"><span>{orgCount}</span>+</div>
            <div className="hero-stat-label">Milestones</div>
          </div>
        </Motion.div>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}

export default Hero
