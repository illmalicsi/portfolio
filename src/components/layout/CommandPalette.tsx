import { useState, useEffect, useRef } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import {
  FiSearch,
  FiHome,
  FiBriefcase,
  FiUser,
  FiClock,
  FiAward,
  FiMail,
  FiMoon,
  FiSun,
  FiVolume2,
  FiVolumeX,
  FiGithub,
  FiLinkedin,
  FiCopy,
  FiCheck,
  FiX,
} from 'react-icons/fi'
import { personalInfo } from '../../data/portfolioData'
import { soundFx } from '../../utils/sound'
import { smoothScrollTo } from '../../utils/scroll'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  theme: 'dark' | 'light'
  toggleTheme: () => void
  isSoundOn: boolean
  toggleSound: () => void
}

interface CommandItem {
  id: string
  label: string
  shortcut?: string
  icon: React.ReactNode
  category: 'Navigation' | 'Actions' | 'Socials'
  action: () => void
}

export default function CommandPalette({
  isOpen,
  onClose,
  theme,
  toggleTheme,
  isSoundOn,
  toggleSound,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email)
    soundFx.playClick()
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      onClose()
    }, 1000)
  }

  const navigateTo = (hash: string) => {
    soundFx.playClick()
    onClose()
    smoothScrollTo(hash)
  }

  const items: CommandItem[] = [
    {
      id: 'nav-home',
      label: 'Go to Hero / Home',
      shortcut: '1',
      icon: <FiHome size={15} />,
      category: 'Navigation',
      action: () => navigateTo('#home'),
    },
    {
      id: 'nav-about',
      label: 'About Ivan & Skills',
      shortcut: '2',
      icon: <FiUser size={15} />,
      category: 'Navigation',
      action: () => navigateTo('#about'),
    },
    {
      id: 'nav-projects',
      label: 'Explore Projects',
      shortcut: '3',
      icon: <FiBriefcase size={15} />,
      category: 'Navigation',
      action: () => navigateTo('#projects'),
    },
    {
      id: 'nav-hackathon',
      label: 'NASA Space Apps: Tala Verde',
      shortcut: '4',
      icon: <FiAward size={15} />,
      category: 'Navigation',
      action: () => navigateTo('#hackathon'),
    },
    {
      id: 'nav-timeline',
      label: 'Experience & Timeline',
      shortcut: '5',
      icon: <FiClock size={15} />,
      category: 'Navigation',
      action: () => navigateTo('#experience'),
    },
    {
      id: 'nav-contact',
      label: 'Contact & Let\'s Talk',
      shortcut: '6',
      icon: <FiMail size={15} />,
      category: 'Navigation',
      action: () => navigateTo('#contact'),
    },
    {
      id: 'nav-contributions',
      label: 'GitHub Contributions & Activity',
      shortcut: '7',
      icon: <FiGithub size={15} />,
      category: 'Navigation',
      action: () => navigateTo('#contributions'),
    },
    {
      id: 'action-copy',
      label: copied ? 'Email Copied to Clipboard!' : `Copy Email (${personalInfo.email})`,
      shortcut: 'C',
      icon: copied ? <FiCheck size={15} className="text-emerald-400" /> : <FiCopy size={15} />,
      category: 'Actions',
      action: copyEmail,
    },
    {
      id: 'action-theme',
      label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      shortcut: 'T',
      icon: theme === 'dark' ? <FiSun size={15} /> : <FiMoon size={15} />,
      category: 'Actions',
      action: () => {
        soundFx.playToggle()
        toggleTheme()
      },
    },
    {
      id: 'action-sound',
      label: `${isSoundOn ? 'Mute' : 'Enable'} Interface Audio`,
      shortcut: 'M',
      icon: isSoundOn ? <FiVolumeX size={15} /> : <FiVolume2 size={15} />,
      category: 'Actions',
      action: () => {
        toggleSound()
      },
    },
    {
      id: 'social-github',
      label: 'Visit GitHub Profile (@illmalicsi)',
      icon: <FiGithub size={15} />,
      category: 'Socials',
      action: () => {
        soundFx.playClick()
        window.open('https://github.com/illmalicsi', '_blank', 'noreferrer')
        onClose()
      },
    },
    {
      id: 'social-linkedin',
      label: 'Connect on LinkedIn',
      icon: <FiLinkedin size={15} />,
      category: 'Socials',
      action: () => {
        soundFx.playClick()
        window.open('https://www.linkedin.com/in/ivan-louie-malicsi-7a7187315/', '_blank', 'noreferrer')
        onClose()
      },
    },
  ]

  const filteredItems = items.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredItems, selectedIndex, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 sm:pt-28">
          {/* Backdrop */}
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-black/[0.1] dark:border-white/[0.12] bg-white dark:bg-[#0c0c0e] shadow-2xl"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 border-b border-black/[0.08] dark:border-white/[0.08] px-4 py-3.5">
              <FiSearch className="text-zinc-400 dark:text-zinc-500" size={17} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                className="rounded p-1 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
                title="Close"
              >
                <FiX size={15} />
              </button>
            </div>

            {/* Command List */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-xs font-mono text-zinc-400 dark:text-zinc-500">
                  No commands matching &quot;{query}&quot;
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredItems.map((item, index) => {
                    const isSelected = index === selectedIndex
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={item.action}
                        onMouseEnter={() => {
                          setSelectedIndex(index)
                          soundFx.playHover()
                        }}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-black/[0.06] text-zinc-900 dark:bg-white/[0.08] dark:text-white'
                            : 'text-zinc-600 hover:bg-black/[0.03] hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.04] dark:hover:text-zinc-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={isSelected ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-500'}>
                            {item.icon}
                          </span>
                          <span className="font-mono">{item.label}</span>
                        </div>

                        {item.shortcut && (
                          <kbd className="rounded border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.03] dark:bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-zinc-600 dark:text-zinc-400">
                            {item.shortcut}
                          </kbd>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer Hints */}
            <div className="flex items-center justify-between border-t border-black/[0.08] dark:border-white/[0.08] px-4 py-2 text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
              <span>ESC to dismiss</span>
            </div>
          </Motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
