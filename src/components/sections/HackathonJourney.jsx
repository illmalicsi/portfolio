import { motion as Motion } from 'framer-motion'
import { FiAperture, FiCheckCircle, FiCompass, FiFlag, FiShield, FiSun, FiZap } from 'react-icons/fi'
import { useEffect, useMemo, useRef, useState } from 'react'
import nasa from '../../assets/nasa.jpeg'
import nasa1 from '../../assets/nasa1.jpeg'
import nasa2 from '../../assets/nasa2.jpeg'

function HackathonJourney() {
  const phases = useMemo(() => [
    {
      timing: 'Phase 01 · Before',
      title: 'Ignition — Team Assembly',
      description:
        'Six minds came together with a shared hunger to solve something real. The team registered for the NASA Space Apps Challenge Davao edition, aligned on a challenge category, and divided roles based on strengths — developers, designers, researchers, and storytellers.',
      tags: [
        { label: 'Challenge selected', tone: 'done' },
        { label: 'Roles assigned', tone: 'done' },
        { label: 'Prep research', tone: 'neutral' },
        { label: 'NASA datasets explored', tone: 'neutral' },
      ],
      icon: FiSun,
    },
    {
      timing: 'Phase 02 · Day 1 Morning',
      title: 'Liftoff — Opening and Orientation',
      description:
        'Arriving at the venue with lanyards on and energy high. The opening ceremony set the tone — the NASA Space Apps banner loomed large as organizers walked through the challenge briefs and judging criteria. The room buzzed with dozens of teams, all locked in on their opening moves.',
      tags: [
        { label: 'Opening ceremony', tone: 'neutral' },
        { label: 'Challenge briefing', tone: 'neutral' },
        { label: 'Mentor introductions', tone: 'neutral' },
        { label: '48 hours begins', tone: 'done' },
      ],
      icon: FiCompass,
    },
    {
      timing: 'Phase 03 · Day 1 Afternoon',
      title: 'Orbit — Ideation and Problem Framing',
      description:
        'The team gathered tightly, laptops open, ideas flying. Using NASA\'s open datasets as fuel, they brainstormed rapidly — sketching out solutions on whiteboards and screens. Multiple directions were considered and ruthlessly narrowed down to the one concept that felt both technically feasible and genuinely impactful.',
      tags: [
        { label: 'Problem defined', tone: 'done' },
        { label: 'Solution scoped', tone: 'done' },
        { label: 'NASA data mapped', tone: 'neutral' },
        { label: 'Wireframes sketched', tone: 'neutral' },
      ],
      icon: FiZap,
    },
    {
      timing: 'Phase 04 · Day 1 Night',
      title: 'Deep Space — The All-Nighter Build',
      description:
        'This is where the real work happened. Screens glowing, fingers typing, stickers on laptops staring back. Developers built the core functionality while the design and content leads shaped the story around it. Mentors passed by, gave feedback, and the team iterated fast. Energy drinks were optional, momentum was not.',
      tags: [
        { label: 'Core build in progress', tone: 'done' },
        { label: 'Mentor feedback loop', tone: 'neutral' },
        { label: 'UI/UX refined', tone: 'neutral' },
        { label: 'Testing begins', tone: 'neutral' },
      ],
      icon: FiShield,
    },
    {
      timing: 'Phase 05 · Day 2 Morning',
      title: 'Re-entry — Final Polish and Submission',
      description:
        'With hours remaining, the team shifted from building to polishing. The prototype was tightened, the slide deck sharpened, and the project narrative was crafted to connect with judges on both a technical and human level. Submission was filed with time to breathe — barely.',
      tags: [
        { label: 'Prototype locked', tone: 'done' },
        { label: 'Submission filed', tone: 'done' },
        { label: 'Pitch deck finalized', tone: 'neutral' },
        { label: 'Demo recorded', tone: 'neutral' },
      ],
      icon: FiFlag,
    },
    {
      timing: 'Phase 06 · Day 2 Afternoon',
      title: 'Landing — The Pitch',
      description:
        'Standing before the judges, Team Tala Verde presented not just a product — but a vision. The pitch wove together data, design, and impact into a coherent story about how space science can serve people on the ground. Every question from the panel was met with clarity and conviction.',
      tags: [
        { label: 'Pitch delivered', tone: 'done' },
        { label: 'Q&A handled', tone: 'neutral' },
        { label: 'Demo showcased', tone: 'neutral' },
        { label: 'Judges engaged', tone: 'neutral' },
      ],
      icon: FiCheckCircle,
    },
    {
      timing: 'Phase 07 · After',
      title: 'Constellation — What Remains',
      description:
        'Win or not, the team walked away with something no scoreboard can fully capture: a shared experience, new technical skills, and proof that six people from Davao can tackle a challenge built for the cosmos. Tala Verde — "green star" — shone bright at Space Apps Davao.',
      tags: [
        { label: 'Team bonded', tone: 'done' },
        { label: 'Skills leveled up', tone: 'done' },
        { label: 'Connections made', tone: 'neutral' },
        { label: 'Legacy built', tone: 'neutral' },
      ],
      icon: FiAperture,
    },
  ], [])

  const phaseRefs = useRef([])
  const [activePhaseIndex, setActivePhaseIndex] = useState(0)

  useEffect(() => {
    const updateActivePhase = () => {
      if (!phaseRefs.current.length) return

      const marker = window.innerHeight * 0.42
      let nextIndex = 0

      phaseRefs.current.forEach((phaseNode, index) => {
        if (!phaseNode) return
        if (phaseNode.getBoundingClientRect().top <= marker) {
          nextIndex = index
        }
      })

      setActivePhaseIndex(nextIndex)
    }

    updateActivePhase()
    window.addEventListener('scroll', updateActivePhase, { passive: true })
    window.addEventListener('resize', updateActivePhase)

    return () => {
      window.removeEventListener('scroll', updateActivePhase)
      window.removeEventListener('resize', updateActivePhase)
    }
  }, [phases.length])

  const timelineProgress = phases.length > 1
    ? `${(activePhaseIndex / (phases.length - 1)) * 100}%`
    : '100%'

  return (
    <section id="hackathon" data-reveal className="reveal-section hackdoc-section px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-5xl">
        <Motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="hackdoc-hero"
        >
          <div className="section-tag justify-center">02 - Hackathon Experience</div>
          <p className="hackdoc-eyebrow">NASA Space Apps Challenge · Davao</p>
          <h2 className="hackdoc-title">
            <span>Tala Verde</span>
            <br />
            Journey Across 48 Hours
          </h2>
          <p className="hackdoc-subtitle">A quiet record of how six students built, adapted, and delivered under pressure.</p>
          <div className="hackdoc-orbit" aria-hidden="true">
            <span className="hackdoc-orbit-dot" />
          </div>
          <p className="hackdoc-badge">Team Tala Verde · 6 Members</p>
        </Motion.header>

        <Motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.06 }}
          className="hackdoc-media"
          aria-label="Hackathon photo journal"
        >
          <figure className="hackdoc-photo-main">
            <img src={nasa2} alt="Team Tala Verde group photo at NASA Space Apps Challenge" />
            <figcaption>Team Tala Verde</figcaption>
          </figure>

          <div className="hackdoc-media-lower">
            <figure className="hackdoc-photo-build">
              <img src={nasa} alt="Team Tala Verde during build phase" />
              <figcaption>Build Phase</figcaption>
            </figure>

            <figure className="hackdoc-photo-build" aria-label="NASA Space Apps collaboration snapshot">
              <img src={nasa1} alt="Team Tala Verde collaboration snapshot" />
              <figcaption>Collaboration</figcaption>
            </figure>
          </div>
        </Motion.section>

        <section className="hackdoc-summary" aria-label="Journey summary stats">
          <article>
            <p className="num">6</p>
            <p className="label">Team Members</p>
          </article>
          <article>
            <p className="num">48</p>
            <p className="label">Hour Duration</p>
          </article>
          <article>
            <p className="num">∞</p>
            <p className="label">Possible Directions</p>
          </article>
        </section>

        <div className="hackdoc-journey-divider" aria-hidden="true">
          <span>THE JOURNEY</span>
        </div>

        <section
          className="hackdoc-timeline"
          aria-label="Hackathon journey timeline"
          style={{ '--timeline-progress': timelineProgress }}
        >
          {phases.map((phase, index) => (
            <Motion.article
              key={phase.title}
              ref={(node) => {
                phaseRefs.current[index] = node
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="hackdoc-phase"
            >
              <div
                className={`hackdoc-node ${index <= activePhaseIndex ? 'is-active' : ''} ${index === activePhaseIndex ? 'is-current' : ''}`}
                aria-hidden="true"
              >
                <phase.icon className="hackdoc-node-icon" />
              </div>
              <div className="hackdoc-phase-content">
                <p className="timing">{phase.timing}</p>
                <h3>{phase.title}</h3>
                <p className="desc">{phase.description}</p>
                <div className="tags" aria-label={`${phase.title} tags`}>
                  {phase.tags.map((tag) => (
                    <span key={tag.label} className={tag.tone === 'done' ? 'is-done' : ''}>{tag.label}</span>
                  ))}
                </div>
              </div>
            </Motion.article>
          ))}
        </section>

        <div className="hackdoc-journey-divider hackdoc-journey-divider-end" aria-hidden="true">
          <span>END OF JOURNEY</span>
        </div>

        <Motion.footer
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="hackdoc-quote"
        >
          <blockquote>
            We did not wait for certainty. We built, shared, and <span>looked up</span>.
          </blockquote>
          <p>Team Tala Verde · NASA Space Apps Challenge Davao 2025</p>
        </Motion.footer>
      </div>
    </section>
  )
}

export default HackathonJourney
