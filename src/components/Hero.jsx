import React, { useState, useEffect } from 'react'
import heroImg from '../assets/heroImg.jpg'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

function Hero() {

  const codeText = `const developer = {
  name: 'Amir Sohail',
  stack: 'MERN',
  focus: 'Frontend',
  status: 'building',
};`

  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i += 1
      setDisplayedText(codeText.slice(0, i))
      if (i >= codeText.length) clearInterval(interval)
    }, 28)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="min-h-screen pt-16 flex items-center px-6">
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">

        {/* Left Side */}
        <div>

          {/* Profile Photo */}
          <div className="mb-6 w-32 h-32 rounded-full border-2 border-[var(--accent)] shadow-[0_0_20px_var(--glow)] overflow-hidden">
            <img
              src={heroImg}
              alt="Amir"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="font-mono text-[var(--accent)] text-sm mb-3">hi, i'm</p>
          <h1 className="text-5xl font-semibold text-[var(--text-heading)] mb-4">Amir Sohail</h1>
          <p className="text-[var(--text-muted)] text-lg mb-8 max-w-md">
            Full stack developer building with the MERN stack. B.Tech CSE
            student turning practical problems into working software.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="px-5 py-2.5 rounded-md bg-[var(--accent)] text-black font-medium text-sm hover:bg-[var(--accent-hover)] transition-colors"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-md border border-[var(--border)] text-[var(--text-body)] font-medium text-sm hover:border-[var(--accent)] transition-colors"
            >
              Get in Touch
            </a>
          </div>


          {/* Social Links */}
          <div className="flex items-center gap-3 mt-8">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-md border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] hover:shadow-[0_0_10px_var(--glow)] transition-all duration-300"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-md border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] hover:shadow-[0_0_10px_var(--glow)] transition-all duration-300"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="mailto:youremail@gmail.com"
              className="w-10 h-10 rounded-md border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] hover:shadow-[0_0_10px_var(--glow)] transition-all duration-300"
            >
              <FaEnvelope size={18} />
            </a>
          </div>

        </div >

        {/* Right Side - Code Block */}
        < div className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden" >

          {/* Terminal Top Bar */}
          < div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[var(--border)]" >
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
            <span className="ml-2 font-mono text-xs text-[var(--text-muted)]">about-me.js</span>
          </div >

          {/* Code Content */}
          < pre className="p-4 font-mono text-sm text-[var(--accent)] leading-relaxed" >
            {displayedText}
            < span className="inline-block w-2 h-4 bg-[var(--accent)] ml-0.5 align-middle animate-pulse" />
          </pre >

        </div >

      </div >
    </section >
  )
}

export default Hero