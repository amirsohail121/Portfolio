import React, { useState, useEffect } from 'react'
import { FaHome, FaUser, FaGraduationCap, FaFileAlt, FaCode, FaFolderOpen, FaGithub, FaEnvelope } from 'react-icons/fa'

const navLinks = [
  { id: 'home', icon: FaHome, label: 'Home' },
  { id: 'about', icon: FaUser, label: 'About' },
  { id: 'education', icon: FaGraduationCap, label: 'Education' },
  { id: 'timeline', icon: FaFileAlt, label: 'Resume' },
  { id: 'skills', icon: FaCode, label: 'Skills' },
  { id: 'projects', icon: FaFolderOpen, label: 'Projects' },
  { id: 'githubstats', icon: FaGithub, label: 'GitHub' },
  { id: 'contact', icon: FaEnvelope, label: 'Contact' },
]

function Navbar() {
  const [activeLink, setActiveLink] = useState('home')
  const [tooltip, setTooltip] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveLink(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle('dark')
  }

  return (
    <aside
      className="hidden sm:flex fixed left-0 top-0 h-full w-20 flex-col items-center py-6 z-50 border-r"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
    >

      {/* Logo */}
      <div
        className="font-bold text-xs font-bold tracking-widest cursor-pointer mb-8"
        style={{ color: 'var(--accent)', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        onClick={() => scrollTo('home')}
      >
        amir.dev
      </div>

      {/* Divider */}
      <div className="w-8 h-px mb-8" style={{ background: 'var(--border)' }} />

      {/* Nav Icons */}
      <nav className="flex flex-col items-center gap-2 flex-1">
        {navLinks.map((link) => {
          const Icon = link.icon
          const isActive = activeLink === link.id
          return (
            <div key={link.id} className="relative flex items-center">
              <button
                onClick={() => scrollTo(link.id)}
                onMouseEnter={() => setTooltip(link.id)}
                onMouseLeave={() => setTooltip(null)}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: isActive ? 'var(--accent)' : 'transparent',
                  color: isActive ? '#000000' : 'var(--text-muted)',
                  boxShadow: isActive ? '0 0 12px var(--glow)' : 'none',
                }}
              >
                <Icon size={17} />
              </button>

              {/* Tooltip */}
              {tooltip === link.id && (
                <div
                  className="absolute left-14 px-3 py-1.5 rounded-md text-xs font-mono font-medium whitespace-nowrap z-50 shadow-lg"
                  style={{ background: 'var(--accent)', color: '#000000' }}
                >
                  {link.label}
                  {/* Arrow */}
                  <div
                    className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-0 h-0"
                    style={{
                      borderTop: '5px solid transparent',
                      borderBottom: '5px solid transparent',
                      borderRight: '6px solid var(--accent)',
                    }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Divider */}
      <div className="w-8 h-px mt-4   mb-4" style={{ background: 'var(--border)' }} />

      
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 border"
        style={{
          background: darkMode ? 'var(--accent)' : 'transparent',
          borderColor: 'var(--accent)',
          color: darkMode ? '#000' : 'var(--accent)',
        }}
      >
        {darkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zM2 13h2a1 1 0 0 0 0-2H2a1 1 0 0 0 0 2zm18 0h2a1 1 0 0 0 0-2h-2a1 1 0 0 0 0 2zM11 2v2a1 1 0 0 0 2 0V2a1 1 0 0 0-2 0zm0 18v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-2 0zM5.99 4.58a1 1 0 0 0-1.41 1.41l1.06 1.06a1 1 0 0 0 1.41-1.41L5.99 4.58zm12.37 12.37a1 1 0 0 0-1.41 1.41l1.06 1.06a1 1 0 0 0 1.41-1.41l-1.06-1.06zm1.06-10.96a1 1 0 0 0-1.41-1.41l-1.06 1.06a1 1 0 0 0 1.41 1.41l1.06-1.06zM7.05 18.36a1 1 0 0 0-1.41-1.41l-1.06 1.06a1 1 0 0 0 1.41 1.41l1.06-1.06z" />
          </svg>
        )}
      </button>

    </aside>
  )
}

export default Navbar