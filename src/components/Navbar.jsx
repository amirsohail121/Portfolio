import React, { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('home')
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id)
        }
      })
    }, {
      rootMargin: '-40% 0px -50% 0px',
      threshold: 0
    })

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle('light')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <span className="font-mono text-[var(--accent)] text-sm tracking-wide cursor-pointer">
          amir<span className="text-[var(--text-muted)]">.dev</span>
        </span>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`px-3 py-1.5 font-mono text-xs rounded-md transition-colors ${activeLink === link.href.slice(1)
                ? 'text-[var(--accent)] bg-[var(--accent)]/10'
                : 'text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-white/5'
                }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Side — Toggle + Hamburger */}
        <div className="flex items-center gap-3">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors border border-[var(--border)] px-3 py-1.5 rounded-md"
          >
            {darkMode ? 'light' : 'dark'}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            {menuOpen ? 'X' : 'Menu'}
          </button>

        </div>

      </div>

      {/* Mobile Dropdown */}
      {
        menuOpen && (
          <div className="sm:hidden border-t border-[var(--border)] px-6 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-2 font-mono text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
              >
                {link.label}
              </a>
            ))
            }
          </div >
        )
      }
    </header >
  )
}

export default Navbar