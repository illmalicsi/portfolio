export function smoothScrollTo(target: string | HTMLElement, offset: number = -60) {
  if (typeof window === 'undefined') return

  const lenis = (window as unknown as { __lenis?: { scrollTo: (target: unknown, options?: unknown) => void } }).__lenis
  if (lenis && typeof lenis.scrollTo === 'function') {
    lenis.scrollTo(target, {
      offset,
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    return
  }

  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({
      top: Math.max(0, y),
      behavior: 'smooth',
    })
  }
}
