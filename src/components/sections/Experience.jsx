import { motion as Motion } from 'framer-motion'
import SectionHeading from '../layout/SectionHeading'
import { experience } from '../../data/portfolioData'

function Experience() {
  return (
    <section id="experience" className="px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow="Education & Journey"
          title="Current academic and development path"
          description="A snapshot of my BS Computer Science progress and practical experience from projects."
        />

        <div className="space-y-5">
          {experience.map((item, index) => (
            <Motion.article
              key={`${item.role}-${item.company}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="glass-panel rounded-2xl p-6"
            >
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div>
                  <h3 className="text-xl font-semibold text-white">{item.role}</h3>
                  <p className="text-slate-300">{item.company}</p>
                </div>
                <span className="inline-flex rounded-full border border-cyan-300/35 bg-cyan-300/8 px-3 py-1 text-xs font-medium tracking-[0.18em] text-cyan-200 uppercase">
                  {item.period}
                </span>
              </div>
              <p className="mt-4 text-slate-300">{item.detail}</p>
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
