import { motion as Motion } from 'framer-motion'
import SectionHeading from '../layout/SectionHeading'
import { skillGroups } from '../../data/portfolioData'

function Skills() {
  const allSkills = skillGroups.flatMap((group) =>
    group.skills.map((skill) => ({ ...skill, group: group.title }))
  )
  const carouselSkills = [...allSkills, ...allSkills, ...allSkills]

  const groupColors = {
    Frontend: 'from-blue-500/30 to-cyan-500/30 border-blue-400/40 text-blue-300',
    Backend: 'from-violet-500/30 to-purple-500/30 border-violet-400/40 text-violet-300',
    Tools: 'from-emerald-500/30 to-teal-500/30 border-emerald-400/40 text-emerald-300',
  }
  const glowColors = {
    Frontend: 'from-blue-400/50 to-cyan-500/50',
    Backend: 'from-violet-400/50 to-purple-500/50',
    Tools: 'from-emerald-400/50 to-teal-500/50',
  }

  return (
    <section
      id="skills"
      className="px-4 py-24 md:px-8 md:py-32 overflow-hidden relative"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-cyan-600/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-purple-600/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="mx-auto w-full max-w-6xl relative z-10">
        <SectionHeading
          eyebrow="Skills"
          title="Technology stack across product layers"
          description="A balanced toolkit for building high-quality interfaces, scalable services, and efficient workflows."
        />

        <div className="mt-14">
          {/* Container */}
          <div className="relative rounded-2xl border border-white/8 bg-white/3 backdrop-blur-2xl overflow-hidden">
            {/* Subtle top shine */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent" />

            <div className="py-10 px-6">
              {/* Icons row — scrolls left */}
              <div className="relative mb-10">
                <div className="overflow-hidden py-3 -my-3">
                <Motion.div
                  className="flex gap-5"
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ duration: 30, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
                >
                  {carouselSkills.map((skill, i) => {
                    const SkillIcon = skill.icon
                    const colorClass = groupColors[skill.group] ?? groupColors.Frontend
                    const glowClass = glowColors[skill.group] ?? glowColors.Frontend
                    return (
                      <Motion.div
                        key={`icon-${skill.name}-${i}`}
                        className="flex-shrink-0"
                        whileHover={{ y: -6, scale: 1.15 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <div className="relative group">
                          <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${glowClass} blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300`} />
                          <div className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${colorClass} border flex items-center justify-center transition-all duration-300`}>
                            <SkillIcon size={20} />
                          </div>
                        </div>
                      </Motion.div>
                    )
                  })}
                </Motion.div>
                </div>
                <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10" />
                <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

              {/* Names row — scrolls right */}
              <div className="relative">
                <div className="overflow-hidden py-2 -my-2">
                <Motion.div
                  className="flex gap-10"
                  animate={{ x: ['-50%', '0%'] }}
                  transition={{ duration: 30, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
                >
                  {carouselSkills.map((skill, i) => {
                    const colorClass = groupColors[skill.group] ?? groupColors.Frontend
                    const textColor = colorClass.split(' ').find(c => c.startsWith('text-')) ?? 'text-cyan-300'
                    return (
                      <Motion.div
                        key={`name-${skill.name}-${i}`}
                        className="flex-shrink-0 whitespace-nowrap flex items-center gap-2"
                        whileHover={{ scale: 1.08 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        {/* Dot separator */}
                        <span className={`w-1 h-1 rounded-full ${textColor} opacity-50`} />
                        <div className="cursor-default text-left">
                          <p className="text-sm font-semibold text-white/90 tracking-wide leading-none">{skill.name}</p>
                          <p className={`text-xs mt-1 ${textColor} opacity-70`}>{skill.group}</p>
                        </div>
                      </Motion.div>
                    )
                  })}
                </Motion.div>
                </div>
                <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10" />
                <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills

