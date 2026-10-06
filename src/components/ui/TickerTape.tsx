import { prefersReducedMotion } from '../../config/motion'

interface TickerTapeProps {
  phrases?: string[]
}

const DEFAULT_PHRASES = [
  'ENGINEERING SCALABLE FULL-STACK APPLICATIONS WITH TYPESCRIPT & REACT',
  'EXPLORING REAL-TIME AGENTIC WORKFLOWS & DISTRIBUTED SYSTEMS',
  'CRAFTING INTERFACES WITH SWISS EDITORIAL PRECISION',
  'OPEN FOR SELECT SOFTWARE ROLES & COLLABORATIONS',
]

export default function TickerTape({ phrases = DEFAULT_PHRASES }: TickerTapeProps) {
  const isReduced = prefersReducedMotion()

  return (
    <div
      aria-label="Current Focus Ticker"
      className="w-full overflow-hidden border-y border-hairline py-2.5 my-8 select-none bg-[var(--text)]/[0.015]"
    >
      <div
        className={`flex w-max items-center whitespace-nowrap ${
          isReduced ? '' : 'animate-swiss-marquee'
        }`}
      >
        {/* Render duplicate sets for seamless infinite loop */}
        {[...phrases, ...phrases, ...phrases, ...phrases].map((phrase, idx) => (
          <div key={idx} className="flex items-center gap-3 px-4 font-mono text-[10px] tracking-wider text-[var(--text-muted)]">
            <span>{phrase}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--vermilion)] shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}
