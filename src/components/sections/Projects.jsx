import { motion as Motion } from 'framer-motion'
import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import { projects } from '../../data/portfolioData'

function Projects() {
  const cardKinds = ['featured', 'side', 'wide']

  return (
    <section id="projects" data-reveal className="reveal-section px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <div>
          <div className="section-tag">02 - Work</div>
          <h2 className="section-title">Selected Projects</h2>
          <p className="section-subtitle">A curated look at what I&apos;ve been building.</p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <Motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`project-card ${cardKinds[index] ?? 'third'} reveal`}
            >
              <div className="project-visual"><div className="project-bg-pattern" /></div>
              <div className="project-inner">
                <div>
                  <div className="project-num">{String(index + 1).padStart(2, '0')}</div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                </div>

                <div className="project-footer">
                  <div className="project-tags">
                    {project.stack.map((tech) => (
                      <span key={tech} className="project-tag">{tech}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <a href={project.demo} target="_blank" rel="noreferrer" className="project-link" title="Live Demo">
                      <FiArrowUpRight size={14} />
                    </a>
                    <a href={project.github} target="_blank" rel="noreferrer" className="project-link" title="GitHub Repository">
                      <FiGithub size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

