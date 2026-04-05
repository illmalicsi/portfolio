import { motion as Motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { experience } from '../../data/portfolioData'

function Experience() {
  const itemRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(-1)

  useEffect(() => {
    const updateActive = () => {
      if (!itemRefs.current.length) return

      const marker = window.innerHeight * 0.42
      let nextIndex = -1

      itemRefs.current.forEach((node, index) => {
        if (!node) return
        if (node.getBoundingClientRect().top <= marker) {
          nextIndex = index
        }
      })

      setActiveIndex(nextIndex)
    }

    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive)

    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [])

  return (
    <section id="experience" data-reveal className="reveal-section px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <div>
          <div className="section-tag">04 - Experience</div>
          <h2 className="section-title">Where I&apos;ve Made Impact</h2>
          <p className="section-subtitle">A timeline of the roles and organizations that shaped me.</p>
        </div>

        <div className="timeline" style={{ maxWidth: '760px' }}>
          {experience.map((item, index) => (
            <Motion.article
              key={`${item.role}-${item.company}`}
              ref={(node) => {
                itemRefs.current[index] = node
              }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className={`timeline-item ${index <= activeIndex ? 'is-active' : ''}`}
            >
              <div className="timeline-period">{item.period}</div>
              <div className="timeline-role">{item.role}</div>
              <div className="timeline-company">{item.company}</div>
              {item.detail && <p className="timeline-desc">{item.detail}</p>}
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
