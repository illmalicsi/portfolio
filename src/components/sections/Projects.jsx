import { motion as Motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { projects } from '../../data/portfolioData'

function Projects() {
  return (
    <section id="projects" data-reveal className="reveal-section px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        
        {/* Header */}
        <div className="mb-12">
          <div className="section-tag">05 - Projects</div>
          <h2 className="section-title">Selected Projects</h2>
          <p className="section-subtitle">A curated look at what I&apos;ve been building.</p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            if (index === 0) {
              // Featured horizontal card (takes full 3 columns on desktop)
              return (
                <Motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0 }}
                  className="lg:col-span-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-2)] overflow-hidden transition-all duration-300 hover:border-[var(--border-gold)] hover:shadow-2xl flex flex-col lg:flex-row group"
                >
                  {/* Left Half: Image */}
                  <div className="relative lg:w-1/2 aspect-[16/10] lg:aspect-auto overflow-hidden bg-[var(--bg-3)] border-b lg:border-b-0 lg:border-r border-[var(--border)]">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/70 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Right Half: Details */}
                  <div className="p-6 sm:p-8 lg:w-1/2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.15em] text-[var(--gold)] font-semibold px-2 py-0.5 rounded bg-[var(--bg-3)] border border-[var(--border)]">
                          Featured Project
                        </span>
                      </div>
                      <h3 className="font-['Outfit'] text-[24px] sm:text-[28px] font-extrabold text-[var(--text)] tracking-tight leading-tight group-hover:text-[var(--gold)] transition-colors duration-200">
                        {project.title}
                      </h3>
                      <p className="mt-4 text-[14px] sm:text-[15px] text-[var(--text-dim)] leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech stack tags */}
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span key={tech} className="font-['Outfit'] text-[12px] text-[var(--text-dim)] bg-[var(--bg-3)] border border-[var(--border)] px-2.5 py-1 rounded-md font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer / CTA */}
                    <div className="mt-8 flex items-center justify-between border-t border-[var(--border)] pt-4">
                      <span className="font-['JetBrains_Mono'] text-[11px] text-[var(--text-muted)] uppercase tracking-wider">01 · Web Application</span>
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn-secondary flex items-center gap-1.5 px-4 py-2 text-[13px]"
                      >
                        Live Preview <FiArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>
                </Motion.article>
              )
            } else {
              // Regular grid cards
              const label = index === 1 || index === 2 ? 'AI Integration' : 'Sign Language ML'
              const techType = index === 3 ? 'Machine Learning' : 'React App'
              
              return (
                <Motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--bg-2)] overflow-hidden transition-all duration-300 hover:border-[var(--border-gold)] hover:shadow-2xl flex flex-col h-full group"
                >
                  {/* Top: Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-3)] border-b border-[var(--border)]">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/50 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Bottom: Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-[0.12em] text-[var(--text-muted)] font-semibold px-2 py-0.5 rounded bg-[var(--bg-3)] border border-[var(--border)]">
                          {label}
                        </span>
                      </div>
                      <h3 className="font-['Outfit'] text-[20px] font-extrabold text-[var(--text)] tracking-tight leading-snug group-hover:text-[var(--gold)] transition-colors duration-200">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-[14px] text-[var(--text-dim)] leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech stack tags */}
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.stack.map((tech) => (
                          <span key={tech} className="font-['Outfit'] text-[11px] text-[var(--text-dim)] bg-[var(--bg-3)] border border-[var(--border)] px-2 py-0.5 rounded-md font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer / CTA */}
                    <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4">
                      <span className="font-['JetBrains_Mono'] text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
                        {String(index + 1).padStart(2, '0')} · {techType}
                      </span>
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn-secondary flex items-center gap-1.5 px-3 py-1.5 text-[12px]"
                      >
                        Live Preview <FiArrowUpRight size={12} />
                      </a>
                    </div>
                  </div>
                </Motion.article>
              )
            }
          })}
        </div>

      </div>
    </section>
  )
}

export default Projects
