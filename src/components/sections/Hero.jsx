import { useEffect, useMemo, useRef, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { FiFileText, FiGithub, FiLinkedin, FiMail, FiUser } from 'react-icons/fi'
import profileImage from '../../assets/MALICSI, IVAN LOUIE.jpg'
import { contactLinks, experience, heroData } from '../../data/portfolioData'

function Hero() {
  const sectionRef = useRef(null)
  const typingPhrases = useMemo(
    () => (heroData.typedPhrases?.length ? heroData.typedPhrases : ['pixel-precise interfaces.']),
    [],
  )
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [yearCount, setYearCount] = useState(0)
  const [projectCount, setProjectCount] = useState(0)

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotionQuery.matches) {
      setCharIndex(typingPhrases[0].length)
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
    <section id="home" ref={sectionRef} data-reveal className="reveal-section hero-retro-wrap relative overflow-hidden px-5 pb-16 pt-28 sm:px-6 md:px-8 md:pb-20 md:pt-40">
      <div className="hero-grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="hero-retro-grid">
          <Motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }} className="hero-retro-content">
            <h1 className="hero-retro-title">
              <span>{heroData.name}</span>
            </h1>

            <p className="hero-retro-role">
              {typingText}
              <span className="typing-cursor" aria-hidden="true">|</span>
            </p>

            <p className="hero-retro-desc">{heroData.tagline}</p>

            <div className="hero-retro-stats">
              <div className="hero-retro-stat-box">
                <div className="hero-retro-stat-value"><span>{yearCount}</span>+</div>
                <div className="hero-retro-stat-label">Years Learning</div>
              </div>
              <div className="hero-retro-stat-box">
                <div className="hero-retro-stat-value"><span>{projectCount}</span>+</div>
                <div className="hero-retro-stat-label">Projects Made</div>
              </div>
              <div className="hero-retro-stat-box">
                <div className="hero-retro-stat-value"><span>5</span>+</div>
                <div className="hero-retro-stat-label">Milestones</div>
              </div>
            </div>

            <div className="hero-retro-links">
              {socialLinks.map((link) => {
                let Icon = FiUser
                if (link.label === 'GitHub') Icon = FiGithub
                if (link.label === 'LinkedIn') Icon = FiLinkedin
                if (link.label === 'Email') Icon = FiMail

                return (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="hero-retro-link" aria-label={link.label}>
                    <Icon size={18} />
                  </a>
                )
              })}

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="hero-retro-link"
                aria-label="Resume"
              >
                <FiFileText size={18} />
              </a>
            </div>
          </Motion.div>

          <Motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut', delay: 0.1 }}
            className="hero-retro-photo-panel"
          >
            <div className="hero-retro-photo-frame">
              <img src={profileImage} alt="Ivan Louie L. Malicsi" className="hero-retro-photo" />
            </div>
          </Motion.aside>
        </div>

        <Motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: 'easeOut' }}
          className="hero-retro-actions"
        >
          <a href="#projects" className="btn-primary">View Projects</a>
          <a href="#contact" className="btn-secondary">
            <FiMail size={14} />
            Let&apos;s Talk
          </a>
        </Motion.div>
      </div>
    </section>
  )
}

export default Hero
