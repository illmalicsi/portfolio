import { motion as Motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import me1 from '../../assets/me1.jpeg'
import me2 from '../../assets/me2.jpeg'
import me3 from '../../assets/me3.jpeg'
import me4 from '../../assets/me4.jpeg'
import me5 from '../../assets/me5.jpeg'
import me6 from '../../assets/me6.jpeg'
import { aboutData, skillGroups } from '../../data/portfolioData'

function About() {
  const skillChips = skillGroups.flatMap((group) => group.skills).slice(0, 8)
  const carouselImages = [me1, me2, me3, me4, me5, me6]
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselImages.length)
    }, 3200)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [carouselImages.length])

  return (
    <section id="about" data-reveal className="reveal-section px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <div>
          <div className="section-tag">01 - About</div>
          <h2 className="section-title">The Developer Behind The Code</h2>
          <p className="section-subtitle">Crafting software that scales, performs, and delights.</p>
        </div>

        <div className="about-grid">
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="about-text"
          >
            <p className="text-justify">{aboutData.intro}</p>
            {aboutData.specialties.map((item) => (
              <p key={item}><strong>{item}</strong></p>
            ))}

            <div className="about-skills-grid">
              {skillChips.map((chip) => (
                <div key={chip.name} className="skill-chip">
                  <chip.icon className="skill-chip-icon" aria-hidden="true" />
                  <span>{chip.name}</span>
                </div>
              ))}
            </div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="about-visual"
          >
            <div className="about-photo-frame">
              <div className="about-photo-placeholder">
                <div
                  className="about-carousel-track"
                  style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                >
                  {carouselImages.map((imageSrc, index) => (
                    <img
                      key={imageSrc}
                      src={imageSrc}
                      alt={`Ivan Louie L. Malicsi memory ${index + 1}`}
                      className="about-carousel-image"
                    />
                  ))}
                </div>
                <div className="about-carousel-dots" aria-label="About image carousel indicators">
                  {carouselImages.map((_, index) => (
                    <button
                      key={`dot-${index}`}
                      type="button"
                      className={`about-carousel-dot ${activeSlide === index ? 'is-active' : ''}`}
                      onClick={() => setActiveSlide(index)}
                      aria-label={`Show memory ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              <div className="corner-accent tl" />
              <div className="corner-accent tr" />
              <div className="corner-accent bl" />
              <div className="corner-accent br" />
              <div className="about-float-tag">
                <div className="num">5+</div>
                <div className="lbl">Years Learning</div>
              </div>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

