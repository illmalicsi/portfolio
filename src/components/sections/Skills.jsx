import { motion as Motion } from 'framer-motion'
import SectionHeading from '../layout/SectionHeading'
import { skillGroups } from '../../data/portfolioData'

function Skills() {
  return (
    <section id="skills" className="px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow="Skills"
          title="Technology stack across product layers"
          description="A balanced toolkit for building high-quality interfaces, scalable services, and efficient workflows."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, groupIndex) => {
            const GroupIcon = group.icon
            return (
              <Motion.article
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: groupIndex * 0.08 }}
                className="glass-panel rounded-3xl p-6"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-lg border border-cyan-200/20 bg-cyan-300/10 p-2 text-cyan-200">
                    <GroupIcon size={18} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {group.skills.map((skill) => {
                    const SkillIcon = skill.icon
                    return (
                      <div
                        key={skill.name}
                        className="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-3 text-sm text-slate-200 transition hover:border-cyan-300/45 hover:text-white"
                      >
                        <div className="mb-2 text-cyan-200">
                          <SkillIcon size={16} />
                        </div>
                        <span>{skill.name}</span>
                      </div>
                    )
                  })}
                </div>
              </Motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills

