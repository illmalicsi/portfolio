import { useState } from 'react'
import { soundFx } from '../../utils/sound'
import { PRIMARY_EASE_CURVE } from '../../config/motion'

interface SlotRollEmailProps {
  email: string
}

export default function SlotRollEmail({ email }: SlotRollEmailProps) {
  const [copied, setCopied] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const chars = email.split('')

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    soundFx.playSuccess()
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  return (
    <div className="relative inline-block select-none my-2">
      <button
        type="button"
        onClick={handleCopy}
        onMouseEnter={() => {
          setIsHovered(true)
          soundFx.playHover()
        }}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative block text-left cursor-pointer focus:outline-none"
        title="Click to copy email address"
        aria-label={`Copy email address ${email}`}
      >
        {/* Email Character Slot Reel */}
        <div className="font-display font-light text-[clamp(1rem,2.8vw,1.65rem)] tracking-tight text-[var(--text)] leading-none flex flex-wrap">
          {chars.map((char, idx) => (
            <span
              key={idx}
              className="relative inline-block overflow-hidden h-[1.12em] align-baseline pointer-events-none"
            >
              <span
                className="block transition-transform duration-300 will-change-transform"
                style={{
                  transform: isHovered ? 'translateY(-50%)' : 'translateY(0%)',
                  transitionDelay: `${idx * 16}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Resting Character */}
                <span className="block leading-[1.12em]">
                  {char}
                </span>
                {/* Rolled In Character with Vermilion Highlight */}
                <span className="block leading-[1.12em] text-[var(--vermilion)] font-normal">
                  {char}
                </span>
              </span>
            </span>
          ))}
        </div>

        {/* Copy Feedback Label */}
        <div className="mt-2 flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
          {copied ? (
            <span className="text-[var(--vermilion)] font-medium tracking-wider uppercase flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--vermilion)]" />
              COPIED TO CLIPBOARD
            </span>
          ) : (
            <span className="tracking-wider uppercase text-[10px] group-hover:text-[var(--text)] transition-colors">
              [ CLICK TO COPY ADDRESS ]
            </span>
          )}
        </div>
      </button>
    </div>
  )
}
