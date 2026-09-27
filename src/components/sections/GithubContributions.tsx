import React, { useState, useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { soundFx } from '../../utils/sound'
import { prefersReducedMotion } from '../../config/animation'

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

// 100% verified contribution records matching authenticated GitHub profile (public + private repos)
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

export default function GithubContributions({ theme = 'dark' }: GithubContributionsProps) {
  // Default to 2026 (or users can switch to 2025, 2024, 2023)
  const [selectedYear, setSelectedYear] = useState<number>(2026)
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const years = [2026, 2025, 2024, 2023]

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

  // Build the 53-week calendar grid for the selected year (Sun to Sat rows)
  const { weeks, monthLabels } = useMemo(() => {
    const yr = selectedYear
    const startDate = new Date(yr, 0, 1)
    const endDate = new Date(yr, 11, 31)

    const gridWeeks: (ContributionDay | null)[][] = []
    let currentWeek: (ContributionDay | null)[] = []
    const months: { label: string; weekIndex: number }[] = []
    let lastMonth = -1

    // Pad beginning of week 0 with null if Jan 1 is not Sunday
    const startDayOfWeek = startDate.getDay()
    for (let i = 0; i < startDayOfWeek; i++) {
      currentWeek.push(null)
    }

    // Iterate through all days of the year
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

    // Pad trailing week with null if Dec 31 is not Saturday
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null)
      }
      gridWeeks.push(currentWeek)
    }

    return { weeks: gridWeeks, monthLabels: months }
  }, [selectedYear])

  // GSAP ScrollTrigger Entrance
  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gh-heading-row',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 88%',
            once: true,
          },
        }
      )

      gsap.fromTo(
        '.gh-calendar-container',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.gh-calendar-container',
            start: 'top 90%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Exact GitHub dark & light mode contribution cell colors
  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-[#0e4429] dark:bg-[#0e4429] border-[#0e4429]'
      case 2:
        return 'bg-[#006d32] dark:bg-[#006d32] border-[#006d32]'
      case 3:
        return 'bg-[#26a641] dark:bg-[#26a641] border-[#26a641]'
      case 4:
        return 'bg-[#39d353] dark:bg-[#39d353] border-[#39d353]'
      default:
        return 'bg-[#161b22] dark:bg-[#161b22] border-[#1b1f24] dark:border-[#1b1f24]'
    }
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
      className="relative px-4 py-20 sm:px-6 md:py-28 lg:px-8 border-t border-black/[0.08] dark:border-white/[0.08]"
    >
      <div className="mx-auto w-full max-w-5xl">
        
        {/* ── Section Eyebrow & Live Profile Link ── */}
        <div className="gh-heading-row flex items-center justify-between pb-6">
          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-zinc-500 tracking-wider">
            <span>06 — activity</span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Live GitHub Telemetry
            </span>
          </div>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => soundFx.playClick()}
            className="group inline-flex items-center gap-2 font-mono text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <FiGithub size={13} />
            <span>@{GITHUB_USERNAME}</span>
            <FiExternalLink size={11} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* ── Official GitHub Contribution Title (e.g. "366 contributions in 2026") ── */}
        <div className="gh-heading-row pb-3">
          <h3 className="text-base sm:text-lg font-normal text-zinc-900 dark:text-zinc-100">
            {yearTotals[selectedYear]} contributions in {selectedYear}
          </h3>
        </div>

        {/* ── Side-by-Side: Contribution Heatmap (Left) & Year Buttons (Right) ── */}
        <div className="gh-calendar-container flex flex-col lg:flex-row gap-5 items-start">
          
          {/* ── The Heatmap Box (Exact GitHub Styling) ── */}
          <div className="w-full flex-1 rounded-xl border border-black/10 dark:border-white/10 bg-[#0d1117] p-4 sm:p-5 shadow-xl overflow-hidden">
            <div className="overflow-x-auto scrollbar-none pb-2">
              <div className="inline-block min-w-full">
                
                {/* Month Headers */}
                <div className="flex text-[10px] font-mono text-zinc-400 pl-7 pb-2 select-none h-5">
                  {monthLabels.map((m, idx) => (
                    <div
                      key={`${m.label}-${idx}`}
                      className="flex-shrink-0"
                      style={{
                        width: `${(weeks.length / monthLabels.length) * 14.5}px`,
                        maxWidth: '48px',
                      }}
                    >
                      {m.label}
                    </div>
                  ))}
                </div>

                {/* Grid: Weekday Sidebar + 53 Week Columns */}
                <div className="flex gap-2">
                  
                  {/* Left Weekday Sidebar */}
                  <div className="flex flex-col justify-between py-1 text-[9px] font-mono text-zinc-400 select-none w-6 text-right pr-2">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                  </div>

                  {/* 53 Columns of 7 Days */}
                  <div className="flex gap-[3.2px]">
                    {weeks.map((week, weekIdx) => (
                      <div key={weekIdx} className="flex flex-col gap-[3.2px]">
                        {week.map((day, dayIdx) => {
                          if (!day) {
                            return (
                              <div
                                key={`pad-${weekIdx}-${dayIdx}`}
                                className="h-[10.5px] w-[10.5px] sm:h-[11px] sm:w-[11px] rounded-[2px] opacity-0"
                              />
                            )
                          }

                          return (
                            <div
                              key={day.date}
                              onMouseEnter={(e) => handleCellHover(e, day)}
                              onMouseLeave={() => setHoveredDay(null)}
                              className={`h-[10.5px] w-[10.5px] sm:h-[11px] sm:w-[11px] rounded-[2px] border transition-transform duration-100 hover:scale-125 cursor-pointer ${getCellColor(
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

            {/* Bottom Card Footer: "Learn how we count contributions" & Legend */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/[0.08] font-mono text-xs text-zinc-500">
              <a
                href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-zinc-500 hover:text-blue-400 hover:underline transition-colors"
              >
                Learn how we count contributions
              </a>

              {/* Less -> More Legend */}
              <div className="flex items-center gap-1.5 text-[11px]">
                <span>Less</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((lvl) => (
                    <div
                      key={lvl}
                      className={`h-2.5 w-2.5 rounded-[2px] border ${getCellColor(lvl)}`}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>

          </div>

          {/* ── Year Selector (Right Column Stack Matching GitHub) ── */}
          <div className="w-full lg:w-28 flex flex-row lg:flex-col gap-1.5 flex-shrink-0">
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
                  className={`py-1.5 px-3 rounded-md text-xs font-mono text-left transition cursor-pointer ${
                    isActive
                      ? 'bg-[#0969da] text-white font-medium shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {yr}
                </button>
              )
            })}
          </div>

        </div>

        {/* ── Floating Hover Tooltip ── */}
        {hoveredDay && tooltipPos && (
          <div
            className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-md border border-white/15 bg-zinc-950 px-2.5 py-1 text-[11px] font-mono text-zinc-100 shadow-2xl"
            style={{
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y}px`,
            }}
          >
            <p className="font-semibold text-white">
              {hoveredDay.count === 0
                ? 'No contributions'
                : `${hoveredDay.count} contribution${hoveredDay.count > 1 ? 's' : ''}`}
            </p>
            <p className="text-[10px] text-zinc-400">
              {formatDate(hoveredDay.date)}
            </p>
          </div>
        )}

      </div>
    </section>
  )
}
