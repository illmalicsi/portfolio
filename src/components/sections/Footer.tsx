import { FiArrowUp } from 'react-icons/fi'
import { contactLinks, personalInfo } from '../../data/portfolioData'
import { soundFx } from '../../utils/sound'
import { smoothScrollTo } from '../../utils/scroll'
import logoImg from '../../assets/logo.jpg'

export default function Footer() {
  const scrollToTop = () => {
    soundFx.playClick()
    smoothScrollTo('#home')
  }

  return (
    <footer className="border-t border-hairline px-4 py-8 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full select-none">
      <div className="w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-3">
            <div className="relative h-5 w-5 overflow-hidden rounded border border-hairline">
              <img src={logoImg} alt="Ivan Louie" className="h-full w-full object-cover" />
            </div>
            <span>&copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 px-2.5 py-1 border border-hairline hover:border-[var(--vermilion)] hover:text-[var(--vermilion)] transition-all cursor-pointer"
              title="Return to top"
            >
              <span>TOP</span>
              <FiArrowUp size={11} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
