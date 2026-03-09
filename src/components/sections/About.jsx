import { motion as Motion } from 'framer-motion'
import SectionHeading from '../layout/SectionHeading'
import { aboutData } from '../../data/portfolioData'
import profileImage from '../../assets/MALICSI, IVAN LOUIE.jpg'

function About() {
  return (
    <section id="about" className="px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title="Engineering with clarity, speed, and purpose"
          description="I build software that not only works reliably but also feels intuitive and polished at every touchpoint."
        />

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
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

          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass-panel rounded-3xl p-6 sm:p-8"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Profile</p>
            <div className="mt-5 flex justify-center">
              <div className="relative h-52 w-52 rounded-full border border-white/10 bg-gradient-to-br from-slate-700 to-slate-900 p-2">
                <img
                  src={profileImage}
                  alt="Ivan Louie L. Malicsi"
                  className="h-full w-full rounded-full border border-cyan-300/35 object-cover object-center"
                />
              </div>
            </div>
            <p className="mt-6 text-center text-sm leading-relaxed text-slate-300">
              Passionate about crafting products that combine robust engineering with refined visual design.
            </p>
          </Motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

