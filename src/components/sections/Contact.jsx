import { motion as Motion } from 'framer-motion'
import SectionHeading from '../layout/SectionHeading'
import { contactLinks } from '../../data/portfolioData'

function Contact() {
  return (
    <section id="contact" className="px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let&apos;s build something exceptional"
          description="Open to senior engineering roles, product collaborations, and impactful freelance opportunities."
        />

        <div className="grid gap-7 lg:grid-cols-[1fr_0.9fr]">
          <Motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className="glass-panel rounded-3xl p-5 sm:p-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-300">
                <span>Name</span>
                <input
                  type="text"
                  placeholder="Please enter your name"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3.5 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-cyan-300/60"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-300">
                <span>Email</span>
                <input
                  type="email"
                  placeholder="Please enter a valid email address"
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3.5 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-cyan-300/60"
                />
              </label>
            </div>

            <label className="mt-4 block space-y-2 text-sm text-slate-300">
              <span>Message</span>
              <textarea
                rows="5"
                placeholder="Tell me about your project..."
                className="w-full resize-none rounded-xl border border-white/10 bg-slate-900/70 px-3.5 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-cyan-300/60"
              />
            </label>

            <Motion.button
              type="submit"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-5 py-3 text-sm font-semibold text-slate-950"
            >
              Send Message
            </Motion.button>
          </Motion.form>

          <Motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="glass-panel rounded-3xl p-5 sm:p-7"
          >
            <h3 className="text-xl font-semibold text-white">Connect</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Reach out through your preferred platform. I usually respond within 24 hours.
            </p>

            <div className="mt-6 space-y-3">
              {contactLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/50 hover:text-white"
                  >
                    <span className="text-cyan-200 transition group-hover:scale-110">
                      <Icon size={16} />
                    </span>
                    {link.label}
                  </a>
                )
              })}
            </div>
          </Motion.aside>
        </div>
      </div>
    </section>
  )
}

export default Contact

