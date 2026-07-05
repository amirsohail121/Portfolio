import React, { useState, useEffect } from 'react'
import { FaHome, FaUser, FaCode, FaFolderOpen, FaEnvelope } from 'react-icons/fa'

const navLinks = [
  { id: 'home', icon: FaHome, label: 'Home' },
  { id: 'about', icon: FaUser, label: 'About' },
  { id: 'skills', icon: FaCode, label: 'Skills' },
  { id: 'projects', icon: FaFolderOpen, label: 'Projects' },
  { id: 'contact', icon: FaEnvelope, label: 'Contact' },
]

function BottomNav() {
  const [activeLink, setActiveLink] = useState('home')

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

  return (
    <nav
      className="sm:hidden fixed bottom-0 left-0 right-0 z-50 border-t"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center justify-around px-2 py-3">
        {navLinks.map((link) => {
          const Icon = link.icon
          const isActive = activeLink === link.id
          return (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="flex flex-col items-center gap-1 transition-all duration-300"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: isActive ? 'var(--accent)' : 'transparent',
                  color: isActive ? '#000000' : 'var(--text-muted)',
                  boxShadow: isActive ? '0 0 12px var(--glow)' : 'none',
                }}
              >
                <Icon size={17} />
              </div>
              <span
                className="text-xs font-mono"
                style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}
              >
                {link.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav