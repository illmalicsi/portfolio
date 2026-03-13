import { motion as Motion } from 'framer-motion'
import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import SectionHeading from '../layout/SectionHeading'
import { projects } from '../../data/portfolioData'

function Projects() {
  return (
    <section id="projects" className="px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work built for impact"
          description="A showcase of product-focused engineering across commerce, analytics, and collaboration platforms."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <Motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-[0_18px_45px_-30px_rgba(0,0,0,0.9)]"
            >
              <div className="pointer-events-none absolute -right-14 -top-14 h-28 w-28 rounded-full bg-cyan-300/15 blur-2xl transition group-hover:bg-cyan-300/25" />
              <h3 className="text-xl font-semibold text-white">{project.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">{project.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                  <span key={tech} className="rounded-full border border-white/10 bg-slate-800/70 px-3 py-1 text-xs text-slate-200">
                    {tech}
                  </span>
                  ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/40 bg-cyan-300/10 px-3.5 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/20"
                >
                  Live Demo
                  <FiArrowUpRight size={14} />
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-3.5 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
                >
                  GitHub
                  <FiGithub size={14} />
                </a>
              </div>
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

