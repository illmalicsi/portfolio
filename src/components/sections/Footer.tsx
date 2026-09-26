import { FiArrowUp } from 'react-icons/fi'
import { contactLinks, personalInfo } from '../../data/portfolioData'
import { soundFx } from '../../utils/sound'
import logoImg from '../../assets/logo.jpg'

export default function Footer() {
  const scrollToTop = () => {
    soundFx.playClick()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-black/[0.08] dark:border-white/[0.08] px-4 py-12 sm:px-6 lg:px-8 bg-zinc-100/50 dark:bg-black/40 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <div className="relative h-6 w-6 overflow-hidden rounded-md border border-black/10 dark:border-white/20 bg-zinc-100 dark:bg-black">
              <img
                src={logoImg}
                alt="Ivan Louie Logo"
                className="h-full w-full object-cover"
              />
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
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-black/[0.08] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-all cursor-pointer"
              title="Back to top"
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
