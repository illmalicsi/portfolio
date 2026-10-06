import { useState, useEffect } from 'react'
import { personalInfo } from '../../data/portfolioData'
import { prefersReducedMotion } from '../../config/motion'

interface SpecSheetProps {
  startAnimation?: boolean
}

interface SpecItem {
  label: string
  value: string
  hasStatusDot?: boolean
}

const SPEC_ITEMS: SpecItem[] = [
  { label: 'NAME', value: personalInfo.name },
  { label: 'ROLE', value: 'Full-Stack Developer & CS Senior' },
  { label: 'BASE', value: 'Davao City, PH (UTC+8)' },
  { label: 'STATUS', value: 'Available for Opportunities', hasStatusDot: true },
]

export default function SpecSheet({ startAnimation = true }: SpecSheetProps) {
  // If reduced motion, show full text immediately
  const [typedChars, setTypedChars] = useState<number>(() =>
    prefersReducedMotion() ? 999 : 0
  )

  // Total string length across all items
  const fullText = SPEC_ITEMS.map((item) => `${item.label}: ${item.value}`).join(' | ')

  useEffect(() => {
    if (prefersReducedMotion()) {
      setTypedChars(fullText.length)
      return
    }

    if (!startAnimation) return

    // Begin typing 600ms after the headline begins
    let current = 0
    const delayTimer = setTimeout(() => {
      const interval = setInterval(() => {
        current += 2
        setTypedChars(current)
        if (current >= fullText.length) {
          clearInterval(interval)
        }
      }, 16)

      return () => clearInterval(interval)
    }, 650)

    return () => clearTimeout(delayTimer)
  }, [startAnimation, fullText.length])

  // Compute how much of each item to display based on typedChars
  let charBudget = typedChars

  return (
    <div
      aria-label="Technical Specification Sheet"
      className="w-full border-t border-hairline pt-4 mt-6 select-none"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-mono text-[11px] sm:text-xs">
        {SPEC_ITEMS.map((item, idx) => {
          const itemFullString = `${item.label}: ${item.value}`
          const charsForThisItem = Math.max(0, Math.min(charBudget, itemFullString.length))
          charBudget = Math.max(0, charBudget - itemFullString.length - 3)

          const renderedValueChars = Math.max(
            0,
            charsForThisItem - (item.label.length + 2)
          )
          const displayedValue = item.value.slice(0, renderedValueChars)

          return (
            <div
              key={idx}
              className="flex flex-col gap-0.5 border-l border-hairline pl-3 py-0.5"
            >
              <span className="text-[10px] tracking-wider text-[var(--text-muted)] uppercase">
                {item.label}
              </span>
              <div className="flex items-center gap-1.5 min-h-[1.25rem]">
                {item.hasStatusDot && displayedValue.length > 0 && (
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--vermilion)] opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--vermilion)]" />
                  </span>
                )}
                <span className="text-[var(--text)] font-medium truncate">
                  {displayedValue}
                  {charsForThisItem < itemFullString.length && charsForThisItem > 0 && (
                    <span className="inline-block w-1 h-3 ml-0.5 bg-[var(--vermilion)] animate-pulse align-middle" />
                  )}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
