import { motion as Motion } from 'framer-motion'
import SectionHeading from '../layout/SectionHeading'
import { aboutData } from '../../data/portfolioData'

function About() {
  return (
    <section id="about" className="px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title="Engineering with clarity, speed, and purpose"
          description="I build software that not only works reliably but also feels intuitive and polished at every touchpoint."
        />

        <div className="grid gap-8">
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="glass-panel rounded-3xl p-6 sm:p-8"
          >
            <p className="text-base leading-relaxed text-slate-300 md:text-lg">{aboutData.intro}</p>
            <ul className="mt-7 space-y-4 text-slate-200">
              {aboutData.specialties.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

