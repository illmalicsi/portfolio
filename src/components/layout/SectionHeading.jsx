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
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-3">{title}</h2>
      <p className="section-description mt-4">{description}</p>
    </Motion.div>
  )
}

export default SectionHeading

