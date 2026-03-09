import { motion as Motion } from 'framer-motion'

function SectionHeading({ eyebrow, title, description }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mb-12 max-w-2xl"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300/85">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">{title}</h2>
      <p className="mt-4 text-base text-slate-300 md:text-lg">{description}</p>
    </Motion.div>
  )
}

export default SectionHeading

