import { useState, useEffect } from 'react'
import {
  FiArrowUpRight,
  FiCheck,
  FiClock,
  FiSend,
} from 'react-icons/fi'
import { contactLinks, personalInfo } from '../../data/portfolioData'
import SlotRollEmail from '../ui/SlotRollEmail'
import { soundFx } from '../../utils/sound'

const marqueeItems = [
  'FULL-STACK ARCHITECTURES',
  'DISTRIBUTED SYSTEMS & REAL-TIME WEB',
  'TYPESCRIPT • REACT • NODE • PYTHON',
  'ATENEO DE DAVAO UNIVERSITY',
  'APPLIED MACHINE LEARNING & MULTIMODAL AGENTS',
  'AVAILABLE FOR FULL-STACK ROLES',
]

export default function Contact() {
  const [davaoTime, setDavaoTime] = useState('')
  const [noteText, setNoteText] = useState('')
  const [noteSent, setNoteSent] = useState(false)

  // Live Davao Clock updating every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
      setDavaoTime(formatter.format(now))
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

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
    <section
      id="contact"
      className="relative px-4 py-20 sm:px-8 md:py-28 lg:px-12 border-t border-hairline max-w-7xl mx-auto w-full select-none"
    >
      {/* ── 1. Slow Low-Contrast Marquee ── */}
      <div className="w-full overflow-hidden border-y border-hairline py-2 mb-12 bg-[var(--text)]/[0.015]">
        <div className="flex w-max animate-swiss-marquee space-x-8 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <span key={idx} className="flex items-center gap-6">
              <span>{item}</span>
              <span className="h-1 w-1 rounded-full bg-[var(--vermilion)] shrink-0" />
            </span>
          ))}
        </div>
      </div>

      <div className="w-full">
        {/* Section Header */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-3.5 font-mono text-[11px] text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span>06 / TRANSMISSION</span>
            <span className="h-1 w-1 rounded-full bg-[var(--vermilion)]" />
            <span>COMMUNICATIONS DESK</span>
          </div>

          {/* Live Davao Clock */}
          <div className="flex items-center gap-2">
            <FiClock size={11} className="text-[var(--vermilion)]" />
            <span className="text-[var(--text)] font-semibold">DAVAO [UTC+8]:</span>
            <span className="tabular-nums">{davaoTime || '12:00:00 PM'}</span>
          </div>
        </div>

        {/* ── Main Editorial Contact Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Headline, Slot Roll Email, Links (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-display text-[clamp(1.35rem,2.4vw,1.85rem)] font-light text-[var(--text)] tracking-tight leading-[1.15]">
              Let&apos;s build something <br />
              <span className="font-serif italic font-normal text-[var(--text)]">exceptional together.</span>
            </h2>

            <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-muted)] font-body max-w-[58ch]">
              Open for full-stack engineering roles, internships, and collaborative software projects. Transmit a note or initiate direct dialogue.
            </p>

            {/* Oversized Slot-Reel Email Component */}
            <SlotRollEmail email={personalInfo.email} />

            {/* Direct Channels */}
            <div className="pt-2 flex flex-wrap items-center gap-5 font-mono text-[11px] text-[var(--text-muted)]">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}&su=Portfolio%20Inquiry`}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClick()}
                className="editorial-link"
              >
                <span>Launch Gmail</span>
                <span>↗</span>
              </a>

              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="editorial-link"
                >
                  <span>{link.label}</span>
                  <span>↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Direct Note Terminal (5 cols) */}
          <div className="lg:col-span-5 border border-hairline rounded-xl hover:rounded-2xl transition-all duration-300 p-5 sm:p-6 space-y-3.5 bg-[var(--text)]/[0.015]">
            <div className="flex items-center justify-between border-b border-hairline pb-2 font-mono text-[11px] text-[var(--text-muted)]">
              <span>DIRECT DISPATCH NOTE</span>
              <span className="text-[9px] text-[var(--vermilion)]">INPUT // 01</span>
            </div>

            <form onSubmit={handleSendNote} className="space-y-3">
              <textarea
                rows={4}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Leave an architectural note, opportunity, or message..."
                className="w-full border border-hairline bg-transparent p-2.5 text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--vermilion)] transition-colors resize-none font-mono"
              />

              <button
                type="submit"
                disabled={!noteText.trim() || noteSent}
                className="w-full border border-hairline py-2 px-3 font-mono text-[11px] uppercase tracking-wider text-[var(--text)] hover:border-[var(--vermilion)] hover:text-[var(--vermilion)] transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-40"
              >
                {noteSent ? (
                  <>
                    <FiCheck className="text-[var(--vermilion)]" /> TRANSMISSION SENT
                  </>
                ) : (
                  <>
                    <FiSend size={11} /> TRANSMIT NOTE
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  )
}
