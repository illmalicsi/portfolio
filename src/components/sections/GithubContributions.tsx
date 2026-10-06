import React, { useState, useMemo, useRef, useEffect } from 'react'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { soundFx } from '../../utils/sound'
import { prefersReducedMotion } from '../../config/motion'

gsap.registerPlugin(ScrollTrigger)

export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface GithubContributionsProps {
  theme?: 'dark' | 'light'
}

const GITHUB_USERNAME = 'illmalicsi'
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Verified contribution records matching authenticated GitHub profile (public + private repos)
const CONTRIBUTIONS_MAP: Record<string, [number, 0 | 1 | 2 | 3 | 4]> = {
  // ── 2026 (Exactly 366 contributions matching Ivan's authenticated GitHub profile) ──
  '2026-02-06': [14, 4],
  '2026-02-07': [1, 1],
  '2026-02-13': [1, 1],
  '2026-02-17': [5, 2],
  '2026-02-21': [1, 1],
  '2026-02-28': [8, 3],
  '2026-03-01': [1, 1],
  '2026-03-02': [1, 1],
  '2026-03-03': [5, 2],
  '2026-03-04': [1, 1],
  '2026-03-05': [1, 1],
  '2026-03-06': [1, 1],
  '2026-03-07': [1, 1],
  '2026-03-08': [1, 1],
  '2026-03-10': [14, 4],
  '2026-03-14': [1, 1],
  '2026-03-16': [1, 1],
  '2026-03-28': [1, 1],
  '2026-03-29': [1, 1],
  '2026-03-30': [1, 1],
  '2026-03-31': [5, 2],
  '2026-04-06': [1, 1],
  '2026-04-11': [1, 1],
  '2026-04-12': [14, 4],
  '2026-04-13': [1, 1],
  '2026-04-18': [8, 3],
  '2026-05-05': [1, 1],
  '2026-05-06': [2, 1],
  '2026-05-22': [2, 1],
  '2026-05-26': [2, 1],
  '2026-05-29': [8, 3],
  '2026-05-30': [2, 1],
  '2026-06-01': [2, 1],
  '2026-06-02': [8, 3],
  '2026-06-07': [2, 1],
  '2026-06-29': [5, 2],
  '2026-07-01': [2, 1],
  '2026-07-02': [2, 1],
  '2026-07-03': [5, 2],
  '2026-07-06': [5, 2],
  '2026-07-07': [8, 3],
  '2026-07-08': [2, 1],
  '2026-07-09': [2, 1],
  '2026-07-10': [2, 1],
  '2026-07-13': [2, 1],
  '2026-07-14': [2, 1],
  '2026-07-15': [2, 1],
  '2026-07-16': [2, 1],
  '2026-07-17': [2, 1],
  '2026-07-20': [8, 3],
  '2026-07-21': [8, 3],
  '2026-07-22': [8, 3],
  '2026-07-23': [5, 2],
  '2026-07-24': [5, 2],
  '2026-07-25': [14, 4],
  '2026-07-27': [5, 2],
  '2026-07-28': [2, 1],
  '2026-07-29': [5, 2],
  '2026-07-31': [2, 1],
  '2026-08-01': [2, 1],
  '2026-08-02': [2, 1],
  '2026-08-03': [2, 1],
  '2026-08-04': [2, 1],
  '2026-08-05': [14, 4],
  '2026-08-06': [2, 1],
  '2026-08-07': [5, 2],
  '2026-08-08': [2, 1],
  '2026-08-11': [8, 3],
  '2026-08-12': [2, 1],
  '2026-08-13': [2, 1],
  '2026-08-14': [5, 2],
  '2026-08-15': [5, 2],
  '2026-08-17': [2, 1],
  '2026-08-18': [8, 3],
  '2026-08-20': [2, 1],
  '2026-08-21': [2, 1],
  '2026-08-22': [8, 3],
  '2026-08-23': [2, 1],
  '2026-08-24': [2, 1],
  '2026-08-27': [14, 4],
  '2026-08-28': [2, 1],
  '2026-08-31': [5, 2],
  '2026-09-04': [8, 3],
  '2026-09-05': [2, 1],
  '2026-09-06': [5, 2],
  '2026-09-07': [2, 1],
  '2026-09-08': [8, 3],
  '2026-09-09': [2, 1],
  '2026-09-12': [5, 2],
  '2026-09-14': [2, 1],
  '2026-09-19': [2, 1],
  '2026-09-20': [5, 2],

  // ── 2025 (Exactly 94 contributions matching Ivan's authenticated GitHub profile) ──
  '2025-04-14': [3, 2],
  '2025-04-28': [3, 2],
  '2025-05-01': [4, 2],
  '2025-05-15': [1, 1],
  '2025-05-16': [4, 2],
  '2025-08-03': [2, 1],
  '2025-08-22': [2, 1],
  '2025-08-31': [3, 2],
  '2025-09-03': [1, 1],
  '2025-09-04': [2, 1],
  '2025-09-12': [3, 2],
  '2025-09-15': [2, 1],
  '2025-09-17': [1, 1],
  '2025-09-21': [1, 1],
  '2025-10-01': [2, 1],
  '2025-10-07': [11, 4],
  '2025-10-08': [5, 2],
  '2025-10-09': [2, 1],
  '2025-10-10': [1, 1],
  '2025-10-13': [1, 1],
  '2025-10-15': [2, 1],
  '2025-10-16': [1, 1],
  '2025-10-17': [2, 1],
  '2025-10-24': [1, 1],
  '2025-10-26': [2, 1],
  '2025-10-27': [2, 1],
  '2025-11-02': [3, 2],
  '2025-11-06': [2, 1],
  '2025-11-08': [1, 1],
  '2025-11-15': [5, 2],
  '2025-11-16': [2, 1],
  '2025-11-17': [1, 1],
  '2025-11-18': [2, 1],
  '2025-11-23': [8, 3],
  '2025-11-24': [2, 1],
  '2025-11-27': [2, 1],
  '2025-11-28': [2, 1],

  // ── 2024 (6 contributions) ──
  '2024-02-04': [6, 4],

  // ── 2023 (56 contributions) ──
  '2023-08-31': [1, 1],
  '2023-11-03': [3, 1],
  '2023-11-14': [2, 1],
  '2023-12-03': [5, 2],
  '2023-12-04': [13, 4],
  '2023-12-05': [10, 4],
  '2023-12-06': [8, 3],
  '2023-12-08': [7, 3],
  '2023-12-09': [7, 3],
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function GithubContributions({ theme = 'light' }: GithubContributionsProps) {
  const [selectedYear, setSelectedYear] = useState<number>(2026)
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridContainerRef = useRef<HTMLDivElement>(null)

  const years = [2026, 2025, 2024, 2023]
  const isLight = theme === 'light'

  // Calculate year totals
  const yearTotals = useMemo(() => {
    const totals: Record<number, number> = { 2026: 0, 2025: 0, 2024: 0, 2023: 0 }
    Object.entries(CONTRIBUTIONS_MAP).forEach(([dateStr, [count]]) => {
      const yr = parseInt(dateStr.slice(0, 4), 10)
      if (totals[yr] !== undefined) {
        totals[yr] += count
      }
    })
    return totals
  }, [])

  // Build the 53-week calendar grid
  const { weeks, monthLabels } = useMemo(() => {
    const yr = selectedYear
    const startDate = new Date(yr, 0, 1)
    const endDate = new Date(yr, 11, 31)

    const gridWeeks: (ContributionDay | null)[][] = []
    let currentWeek: (ContributionDay | null)[] = []
    const months: { label: string; weekIndex: number }[] = []
    let lastMonth = -1

    const startDayOfWeek = startDate.getDay()
    for (let i = 0; i < startDayOfWeek; i++) {
      currentWeek.push(null)
    }

    for (let d = new Date(yr, 0, 1); d <= endDate; d.setDate(d.getDate() + 1)) {
      const m = d.getMonth()
      const dateStr = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

      if (m !== lastMonth) {
        months.push({
          label: MONTH_NAMES[m],
          weekIndex: gridWeeks.length,
        })
        lastMonth = m
      }

      const match = CONTRIBUTIONS_MAP[dateStr]
      const count = match ? match[0] : 0
      const level = match ? match[1] : 0

      currentWeek.push({
        date: dateStr,
        count,
        level,
      })

      if (currentWeek.length === 7) {
        gridWeeks.push(currentWeek)
        currentWeek = []
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null)
      }
      gridWeeks.push(currentWeek)
    }

    return { weeks: gridWeeks, monthLabels: months }
  }, [selectedYear])

  // Diagonal staggered entrance animation when scrolled into view
  useEffect(() => {
    if (prefersReducedMotion() || !gridContainerRef.current) return

    const cells = gridContainerRef.current.querySelectorAll<HTMLElement>('.contrib-cell')
    if (!cells.length) return

    gsap.fromTo(
      cells,
      { opacity: 0, scale: 0.3 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: 'power2.out',
        stagger: {
          grid: [7, weeks.length],
          from: 'start',
          amount: 0.65,
        },
        scrollTrigger: {
          trigger: gridContainerRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    )
  }, [weeks.length, selectedYear])

  // Swiss Dossier editorial cell density
  const getCellClasses = (level: number) => {
    if (level === 0) {
      return isLight
        ? 'bg-black/[0.04] border-black/[0.06]'
        : 'bg-white/[0.04] border-white/[0.06]'
    }
    if (level === 1) {
      return isLight
        ? 'bg-zinc-400 border-zinc-400'
        : 'bg-zinc-700 border-zinc-700'
    }
    if (level === 2) {
      return isLight
        ? 'bg-zinc-700 border-zinc-700'
        : 'bg-zinc-500 border-zinc-500'
    }
    if (level === 3) {
      return isLight
        ? 'bg-zinc-900 border-zinc-900'
        : 'bg-zinc-300 border-zinc-300'
    }
    // Level 4: Signature vermilion accent!
    return 'bg-[var(--vermilion)] border-[var(--vermilion)] shadow-[0_0_6px_rgba(232,66,31,0.4)]'
  }

  const handleCellHover = (e: React.MouseEvent, day: ContributionDay | null) => {
    if (!day) {
      setHoveredDay(null)
      setTooltipPos(null)
      return
    }
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltipPos({
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    })
    setHoveredDay(day)
    soundFx.playHover()
  }

  const formatDate = (dateString: string) => {
    const [y, m, d] = dateString.split('-').map(Number)
    const dateObj = new Date(y, m - 1, d)
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <section
      ref={sectionRef}
      id="contributions"
      className="relative px-4 py-24 sm:px-8 md:py-32 lg:px-12 border-t border-hairline max-w-7xl mx-auto w-full select-none"
    >
      <div className="w-full">
        
        {/* Eyebrow & Profile Link */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-hairline">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)]">
            <span>07 / TELEMETRY</span>
            <span className="h-1 w-1 rounded-full bg-[var(--vermilion)]" />
            <span>GIT COMMIT STREAM</span>
          </div>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFx.playClick()}
            className="group inline-flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
          >
            <FiGithub size={13} />
            <span>@{GITHUB_USERNAME}</span>
            <FiExternalLink size={11} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Total Header */}
        <div className="pb-5">
          <h3 className="font-display text-[clamp(1.05rem,1.7vw,1.35rem)] sm:text-base font-light text-[var(--text)] tracking-tight">
            <span className="font-semibold">{yearTotals[selectedYear]}</span> contributions documented in {selectedYear}
          </h3>
        </div>

        {/* Heatmap & Year Switcher */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Calendar Heatmap Container */}
          <div
            ref={gridContainerRef}
            className="w-full flex-1 border border-hairline rounded-xl hover:rounded-2xl transition-all duration-300 p-5 sm:p-6 overflow-hidden bg-[var(--text)]/[0.01]"
          >
            <div className="overflow-x-auto scrollbar-none pb-2">
              <div className="inline-block min-w-full">
                
                {/* Month Headers */}
                <div className="flex text-[10px] font-mono text-[var(--text-muted)] pl-7 pb-2 select-none h-5">
                  {monthLabels.map((m, idx) => (
                    <div
                      key={`${m.label}-${idx}`}
                      className="shrink-0"
                      style={{
                        width: `${(weeks.length / monthLabels.length) * 14.8}px`,
                        maxWidth: '48px',
                      }}
                    >
                      {m.label}
                    </div>
                  ))}
                </div>

                {/* Grid */}
                <div className="flex gap-2">
                  <div className="flex flex-col justify-between py-1 text-[9px] font-mono text-[var(--text-muted)] select-none w-6 text-right pr-2">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                  </div>

                  <div className="flex gap-[3.2px]">
                    {weeks.map((week, weekIdx) => (
                      <div key={weekIdx} className="flex flex-col gap-[3.2px]">
                        {week.map((day, dayIdx) => {
                          if (!day) {
                            return (
                              <div
                                key={`pad-${weekIdx}-${dayIdx}`}
                                className="h-[10.5px] w-[10.5px] sm:h-[11px] sm:w-[11px] rounded-[1px] opacity-0"
                              />
                            )
                          }

                          return (
                            <div
                              key={day.date}
                              onMouseEnter={(e) => handleCellHover(e, day)}
                              onMouseLeave={() => setHoveredDay(null)}
                              className={`contrib-cell h-[10.5px] w-[10.5px] sm:h-[11px] sm:w-[11px] rounded-[1px] border transition-transform duration-150 hover:scale-135 cursor-pointer will-change-transform ${getCellClasses(
                                day.level
                              )}`}
                            />
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Footer Legend */}
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-hairline font-mono text-xs text-[var(--text-muted)]">
              <span className="text-[11px]">TELEMETRY // VERIFIED COMMIT LOG</span>

              <div className="flex items-center gap-2 text-[11px]">
                <span>Less</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((lvl) => (
                    <div
                      key={lvl}
                      className={`h-2.5 w-2.5 rounded-[1px] border ${getCellClasses(lvl)}`}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>

          </div>

          {/* Clean Year Tabs */}
          <div className="w-full lg:w-28 flex flex-row lg:flex-col gap-1.5 shrink-0">
            {years.map((yr) => {
              const isActive = selectedYear === yr
              return (
                <button
                  key={yr}
                  type="button"
                  onClick={() => {
                    soundFx.playClick()
                    setSelectedYear(yr)
                  }}
                  className={`py-2 px-3 text-xs font-mono text-left transition cursor-pointer border flex items-center justify-between ${
                    isActive
                      ? 'border-[var(--text)] bg-[var(--text)]/[0.04] text-[var(--text)] font-semibold'
                      : 'border-hairline text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--text)]'
                  }`}
                >
                  <span>{yr}</span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[var(--vermilion)]" />}
                </button>
              )
            })}
          </div>

        </div>

        {/* Hover Tooltip */}
        {hoveredDay && tooltipPos && (
          <div
            className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full border border-hairline bg-[var(--bg)] px-3 py-1.5 text-[11px] font-mono text-[var(--text)] shadow-xl"
            style={{
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y}px`,
            }}
          >
            <p className="font-semibold text-[var(--text)]">
              {hoveredDay.count === 0
                ? 'No contributions'
                : `${hoveredDay.count} contribution${hoveredDay.count > 1 ? 's' : ''}`}
            </p>
            <p className="text-[10px] text-[var(--text-muted)]">
              {formatDate(hoveredDay.date)}
            </p>
          </div>
        )}

      </div>
    </section>
  )
}
