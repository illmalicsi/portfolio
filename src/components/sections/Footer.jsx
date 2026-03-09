function Footer() {
  return (
    <footer className="px-4 pb-10 pt-4 md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row">
        <p>&copy; {new Date().getFullYear()} Ivan Louie L. Malicsi. All rights reserved.</p>
        <p>Designed and built with React, Tailwind, and Framer Motion.</p>
      </div>
    </footer>
  )
}

export default Footer

