import { motion as Motion } from 'framer-motion'
import profileImage from '../../assets/MALICSI, IVAN LOUIE.jpg'
import { aboutData, skillGroups } from '../../data/portfolioData'

function About() {
  const skillChips = skillGroups.flatMap((group) => group.skills).slice(0, 8)

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
                <img src={profileImage} alt="Ivan Louie L. Malicsi" className="h-full w-full object-cover" />
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

