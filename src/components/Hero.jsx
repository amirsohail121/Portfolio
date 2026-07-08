import React, { useState, useEffect } from 'react'
import heroImg from '../assets/heroImg.jpg'
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from 'react-icons/fa'

function Hero() {

  const codeText = `const developer = {
  role: "Full Stack Developer",
  stack: ["React","Node.js","Express","MongoDB"],
  available: true
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
    <section id="home" className="w-full min-h-screen flex flex-col sm:flex-row overflow-hidden">

      {/* Left Side */}
      <div
        className="flex flex-col justify-center px-6 sm:px-12 py-6 sm:py-0 w-full sm:w-1/2 order-2 sm:order-1 min-h-[50vh] sm:min-h-screen"
        style={{ background: 'var(--bg-primary)' }}
      >
        {/* Greeting */}
        <p className="font-mono text-xs mb-3 tracking-widest uppercase text-yellow-500">
          Full Stack MERN Developer
        </p>

        {/* Name */}
        <h1
          className="text-3xl sm:text-5xl font-extrabold mb-3 leading-tight"
          style={{ color: 'var(--text-heading)' }}
        >
          Hi, I'm <span className="text-yellow-500">Amir Sohail</span>
        </h1>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {['Full Stack Dev', 'MERN Stack', 'Open to Work'].map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2 py-1 rounded-full border border-yellow-500 text-yellow-500"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <p
          className="text-sm mb-5  leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          Final-year Computer Science student and Full Stack MERN Developer passionate about building scalable, responsive, and user-friendly web applications using React, Node.js, Express, and MongoDB.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 mb-5">
          <a
            href="#projects"
            className="px-5 py-2.5 rounded-lg font-medium text-sm bg-yellow-500 text-black transition-all duration-300 hover:bg-yellow-400"
          >
            🚀 View Projects
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-lg font-medium text-sm border border-yellow-500 text-yellow-500 bg-transparent transition-all duration-300 flex items-center gap-2 hover:bg-yellow-500 hover:text-black"
          >
            <FaDownload size={13} /> Download Resume
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3 mb-6">
          <a
            href="https://github.com/amirsohail121"
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-lg border border-gray-600 text-gray-500 flex items-center justify-center transition-all duration-300 hover:bg-yellow-500 hover:text-black hover:border-yellow-500"
          >
            <FaGithub size={16} />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-lg border border-gray-600 text-gray-500 flex items-center justify-center transition-all duration-300 hover:bg-yellow-500 hover:text-black hover:border-yellow-500"
          >
            <FaLinkedin size={16} />
          </a >
          <a
            href="mailto:youremail@gmail.com"
            className="w-9 h-9 rounded-lg border border-gray-600 text-gray-500 flex items-center justify-center transition-all duration-300 hover:bg-yellow-500 hover:text-black hover:border-yellow-500"
          >
            <FaEnvelope size={16} />
          </a >
        </div >

        {/* Code Block - hidden on mobile */}
        < div
          className="hidden sm:block rounded-lg border overflow-hidden"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }
          }
        >
          <div
            className="flex items-center gap-1.5 px-4 py-2 border-b"
            style={{ borderColor: 'var(--border)' }}
          >
            <span className="w-2 h-2 rounded-full bg-red-400/70" />
            <span className="w-2 h-2 rounded-full bg-yellow-400/70" />
            <span className="w-2 h-2 rounded-full bg-green-400/70" />
            <span
              className="ml-2 font-mono text-xs"
              style={{ color: 'var(--text-muted)' }}
            >
              about-me.js
            </span>
          </div>
          <pre
            className="p-3 font-mono text-xs leading-relaxed overflow-hidden"
            style={{ color: 'var(--accent)', height: '140px' }}
          >
            {displayedText}
            <span
              className="inline-block w-1.5 h-3.5 ml-0.5 align-middle animate-pulse"
              style={{ background: 'var(--accent)' }}
            />
          </pre>
        </div >

      </div >

      {/* Right Side - Photo */}
      < div className="relative w-full sm:w-1/2 h-80 sm:min-h-screen order-1 sm:order-2 flex-shrink-0" >
        <img
          src={heroImg}
          alt="Amir Sohail"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Left gradient — desktop only */}
        <div
          className="absolute inset-0 hidden sm:block"
          style={{
            background: 'linear-gradient(to right, var(--bg-primary) 0%, transparent 25%)',
          }}
        />

        {/* Bottom gradient — mobile only */}
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            background: 'linear-gradient(to top, var(--bg-primary) 10%, transparent 60%)',
          }}
        />

        {/* Badge — desktop only */}
        {/* <div className="hidden sm:block absolute bottom-8 left-6 px-3 py-1.5 rounded-lg font-mono text-xs font-bold bg-yellow-500 text-black z-10">
          Available for Work ✓
        </div> */}

      </div >

    </section >
  )
}

export default Hero