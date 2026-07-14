import React, { useState, useEffect } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp, FaHeart, FaReact } from 'react-icons/fa'
import { SiTailwindcss, SiVite } from 'react-icons/si'

function Footer() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <footer
        className="py-6 px-6 sm:px-10 border-t"
        style={{ borderColor: 'rgba(0,0,0,0.06)', background: 'var(--bg-card)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-4 text-center">

            {/* Thanks message */}
            <p
              className="text-sm font-medium"
              style={{ color: 'var(--text-muted)' }}
            >
              Thanks for visiting.
            </p>

            {/* Built with */}
            <div
              className="flex items-center gap-2 flex-wrap justify-center text-xs font-mono"
              style={{ color: 'var(--text-muted)' }}
            >
              <span>Built using</span>
              <FaReact size={14} className="text-yellow-500" />
              <span className="text-yellow-500">React</span>
              <span>•</span>
              <SiTailwindcss size={14} className="text-yellow-500" />
              <span className="text-yellow-500">Tailwind CSS</span>
              <span>•</span>
              <SiVite size={14} className="text-yellow-500" />
              <span className="text-yellow-500">Vite</span>
              <FaHeart size={12} className="text-red-400 ml-1" />
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/amirsohail121"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg border flex items-center justify-center"
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--text-muted)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#eab308'
                  e.currentTarget.style.color = '#000'
                  e.currentTarget.style.borderColor = '#eab308'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(234,179,8,0.25)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'var(--text-muted)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <FaGithub size={16} />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg border flex items-center justify-center"
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--text-muted)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#eab308'
                  e.currentTarget.style.color = '#000'
                  e.currentTarget.style.borderColor = '#eab308'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(234,179,8,0.25)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'var(--text-muted)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <FaLinkedin size={16} />
              </a>
              <a
                href="mailto:youremail@gmail.com"
                className="w-9 h-9 rounded-lg border flex items-center justify-center"
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--text-muted)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#eab308'
                  e.currentTarget.style.color = '#000'
                  e.currentTarget.style.borderColor = '#eab308'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(234,179,8,0.25)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'var(--text-muted)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <FaEnvelope size={16} />
              </a>
            </div>

            {/* Divider */}
            <div
              className="w-full h-px"
              style={{ background: 'var(--border)', opacity: 0.5 }}
            />

            {/* Copyright */}
            <p
              className="text-xs font-mono"
              style={{ color: 'var(--text-muted)' }}
            >
              © {new Date().getFullYear()} Amir Sohail. All rights reserved.
            </p>

          </div >
        </div >
      </footer >

      {/* Fixed Back to Top Button */}
      {
        showTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-10 h-10 rounded-full border-2 flex items-center justify-center z-50"
            style={{
              borderColor: '#eab308',
              color: '#eab308',
              background: 'var(--bg-card)',
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 12px rgba(234,179,8,0.2)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#eab308'
              e.currentTarget.style.color = '#000'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(234,179,8,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--bg-card)'
              e.currentTarget.style.color = '#eab308'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(234,179,8,0.2)'
            }}
            aria-label="Back to top"
            title="Back to top"
          >
            <FaArrowUp size={14} />
          </button>
        )
      }
    </>
  )
}

export default Footer