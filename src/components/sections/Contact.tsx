import { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import {
  FiArrowUpRight,
  FiCheck,
  FiCopy,
  FiSend,
} from 'react-icons/fi'
import { contactLinks, personalInfo } from '../../data/portfolioData'
import MagneticButton from '../ui/MagneticButton'
import { soundFx } from '../../utils/sound'

const marqueeItems = [
  'FULL-STACK DEVELOPMENT',
  'GOOGLE GEMINI AI INTEGRATION',
  'REACT & TYPESCRIPT',
  'NODE.JS & POSTGRESQL',
  'ATENEO DE DAVAO UNIVERSITY',
  'NASA SPACE APPS CHALLENGE FINALIST',
  'AVAILABLE FOR OPPORTUNITIES',
]

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [noteSent, setNoteSent] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email)
    soundFx.playSuccess()
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  const handleSendNote = (e: React.FormEvent) => {
    e.preventDefault()
    if (!noteText.trim()) return

    soundFx.playSuccess()
    setNoteSent(true)
    setTimeout(() => {
      setNoteText('')
      setNoteSent(false)
    }, 3500)
  }

  return (
    <section id="contact" className="relative px-4 py-24 sm:px-6 md:py-36 lg:px-8 overflow-hidden">
      
      {/* Subtle Marquee Scrolling Text Strip */}
      <div className="relative w-full overflow-hidden border-y border-black/[0.06] dark:border-white/[0.06] py-3.5 mb-24 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="flex w-max animate-marquee space-x-8 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <span key={idx} className="flex items-center gap-6">
              <span>{item}</span>
              <span className="text-zinc-300 dark:text-zinc-700">/</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl">
        
        {/* Main Card */}
        <div className="rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-white/90 dark:bg-[#0c0c0e] p-8 sm:p-14 md:p-18 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.7)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Large Confident Headline (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                05 / Initiate Contact
              </p>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.05]">
                Let&apos;s build something <br />
                <span className="text-zinc-500 dark:text-zinc-400">exceptional together.</span>
              </h2>

              <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-md">
                Open for full-stack engineering roles, internships, and collaborative software projects. Reach out directly or send a message.
              </p>

              {/* 1-Click Copy Email & Direct Gmail */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={copyEmail}
                  data-cursor="pointer"
                  className="btn-secondary flex items-center justify-center gap-2 py-2.5 px-4 font-mono text-xs"
                >
                  {copied ? (
                    <>
                      <FiCheck className="text-emerald-500 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <FiCopy />
                      <span>{personalInfo.email}</span>
                    </>
                  )}
                </button>

                <MagneticButton
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}&su=Portfolio%20Inquiry`}
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                >
                  <span>Launch Gmail</span>
                  <FiArrowUpRight size={13} className="ml-0.5" />
                </MagneticButton>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-3 pt-2">
                {contactLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => soundFx.playClick()}
                      data-cursor="pointer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] text-zinc-600 dark:text-zinc-400 transition-colors hover:border-black/25 dark:hover:border-white/30 hover:text-zinc-900 dark:hover:text-white"
                      title={link.label}
                      aria-label={link.label}
                    >
                      <Icon size={14} />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Right: Quick Note Form (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-zinc-50/80 dark:bg-zinc-950 p-6 backdrop-blur-md">
              <p className="font-mono text-xs text-zinc-700 dark:text-zinc-400 uppercase tracking-wider mb-1 font-semibold">
                Direct Terminal Note
              </p>
              <p className="text-xs text-zinc-500 mb-4">
                Leave a quick message directly in browser:
              </p>

              <form onSubmit={handleSendNote} className="space-y-3">
                <textarea
                  rows={3}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Hey Ivan, let's talk about..."
                  className="w-full rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-black p-3 text-xs text-zinc-900 dark:text-white outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:border-black/30 dark:focus:border-white/30 transition-colors resize-none"
                />

                <button
                  type="submit"
                  disabled={!noteText.trim() || noteSent}
                  data-cursor="pointer"
                  className="btn-primary w-full py-2.5 text-xs flex items-center justify-center gap-2 disabled:opacity-40"
                >
                  {noteSent ? (
                    <>
                      <FiCheck /> Sent! Thank you!
                    </>
                  ) : (
                    <>
                      <FiSend /> Transmit Note
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
