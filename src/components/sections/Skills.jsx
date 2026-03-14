import { motion as Motion } from 'framer-motion'
import { skillGroups } from '../../data/portfolioData'

const defaultPercents = {
  Frontend: [95, 90, 88, 84],
  Backend: [92, 85, 82, 78],
  Tools: [88, 84, 80, 76],
}

function Skills() {
  const allTools = Array.from(new Set(skillGroups.flatMap((group) => group.skills.map((skill) => skill.name))))

  return (
    <section id="skills" data-reveal className="reveal-section px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <div>
          <div className="section-tag">03 - Skills</div>
          <h2 className="section-title">Tech Stack and Expertise</h2>
          <p className="section-subtitle">Tools I reach for daily and concepts I live by.</p>
        </div>

        <div className="skills-layout">
          <div>
            {skillGroups.map((group) => (
              <Motion.div
                key={group.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45 }}
                className="skill-category"
              >
                <div className="skill-cat-label">{group.title}</div>

                {group.skills.map((skill, index) => {
                  const value = defaultPercents[group.title]?.[index] ?? Math.max(70, 90 - index * 4)
                  return (
                    <div key={skill.name} className="skill-bar-item">
                      <div className="skill-bar-header">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-pct">{value}%</span>
                      </div>
                      <div className="skill-track">
                        <div className="skill-fill" style={{ transform: `scaleX(${value / 100})` }} />
                      </div>
                    </div>
                  )
                })}
              </Motion.div>
            ))}
          </div>

          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <div className="skill-cat-label" style={{ marginBottom: '1.2rem' }}>All Tools and Technologies</div>
            <div className="tools-cloud">
              {allTools.map((tool) => (
                <span key={tool} className="tool-badge">{tool}</span>
              ))}
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  )
}

export default Skills
