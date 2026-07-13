import { contactLinks } from '../../data/portfolioData'

function Footer() {
  return (
    <footer className="px-4 pb-12 pt-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl border-t border-[var(--border)] pt-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          
          {/* Left: Copyright */}
          <div className="text-center md:text-left">
            <p className="font-['Outfit'] text-[13px] font-medium text-[var(--text)]">
              &copy; {new Date().getFullYear()} Ivan Louie L. Malicsi. All rights reserved.
            </p>
            <p className="mt-1 font-['Outfit'] text-[12px] text-[var(--text-muted)]">
              Designed and built with React, Tailwind CSS, &amp; Framer Motion.
            </p>
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center gap-4">
            {contactLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-2)] text-[var(--text-dim)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--gold)] hover:text-[var(--gold)]"
                  title={link.label}
                  aria-label={link.label}
                >
                  <Icon size={16} />
                </a>
              )
            })}
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer


