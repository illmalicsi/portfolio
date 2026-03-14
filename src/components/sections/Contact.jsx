import { motion as Motion } from 'framer-motion'
import { contactLinks } from '../../data/portfolioData'

function Contact() {
  return (
    <section id="contact" data-reveal className="reveal-section px-4 py-16 text-center md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <div>
          <div className="section-tag justify-center">05 - Contact</div>
          <h2 className="contact-big">Let&apos;s Build <span>Something</span> Together</h2>
          <p className="contact-sub">
            Have a project in mind? Looking for a collaborator? I&apos;m always happy to connect.
          </p>

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className="contact-links"
          >
            {contactLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link"
                >
                  <Icon size={14} />
                  {link.label}
                </a>
              )
            })}
          </Motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact

