import React, { useState, useEffect, useRef } from 'react'
import { FaGraduationCap, FaCode, FaUsers, FaMapMarkerAlt } from 'react-icons/fa'

const infoCards = [
  { icon: FaGraduationCap, label: 'Education', value: 'B.Tech CSE, 7th Sem' },
  { icon: FaMapMarkerAlt, label: 'University', value: 'CSVTU, Bhilai, Chhattisgarh' },
  { icon: FaCode, label: 'Focus', value: 'MERN Stack' },
  { icon: FaUsers, label: 'Status', value: 'Open to Work' },
]

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start || target === 0) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target])

  return count
}

function StatCard({ number, label, suffix, start }) {
  const count = useCountUp(number, 2000, start)
  return (
    <div
      className="rounded-lg p-5 text-center border"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
    >
      <p
        className="text-3xl font-bold font-mono mb-1"
        style={{ color: 'var(--accent)' }}
      >
        {count}{suffix}
      </p>
      <p
        className="text-xs font-mono"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </p>
    </div>
  )
}

function About() {
  const [githubStats, setGithubStats] = useState({ repos: 0 })
  const [startCount, setStartCount] = useState(false)
  const statsRef = useRef(null)

  const stats = [
    { number: githubStats.repos, label: 'GitHub Repos', suffix: '+' },
    { number: 3, label: 'Projects Built', suffix: '+' },
    { number: 15, label: 'Months Coding', suffix: '+' },
  ]

  useEffect(() => {
    fetch('https://api.github.com/users/amirsohail121')
      .then(res => res.json())
      .then(data => setGithubStats({ repos: data.public_repos }))
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStartCount(true) },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Section Heading */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-sm opacity-60" style={{ color: 'var(--accent)' }}>01</span>
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-heading)' }}>about</h2>
          <span className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>

        {/* Stats Row */}
        <div ref={statsRef} className="grid grid-cols-3 gap-4 mb-12">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              number={stat.number}
              label={stat.label}
              suffix={stat.suffix}
              start={startCount}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

          {/* Bio */}
          <div className="sm:col-span-2 space-y-4">
            <div
              className="rounded-lg border overflow-hidden"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
              {/* Terminal bar */}
              <div
                className="flex items-center gap-1.5 px-4 py-2.5 border-b"
                style={{ borderColor: 'var(--border)' }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                <span className="ml-2 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                  bio.txt
                </span>
              </div>

              {/* Bio content */}
              <div className="p-5 space-y-3">
                <div className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--accent)' }}>{'>'}</span> I'm a 7th semester B.Tech CSE student at S.S.I.P.M.T., Raipur, affiliated with CSVTU. Alongside coursework, I build practical software that solves real problems.
                </div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--accent)' }}>{'>'}</span> My focus is the MERN stack — designing MongoDB schemas, writing Express APIs, and building React frontends. I like working hands-on and shipping things that actually work.
                </div>
               {/* <div className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--accent)' }}>{'>'}</span> I collaborate with classmates on academic projects — from browser automation tools to blockchain systems and real-time chat apps.
                </div>
                * */}
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="space-y-3">
            {infoCards.map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.label}
                  className="rounded-lg border px-4 py-3 flex items-center gap-4 hover:border-[var(--accent)] transition-all duration-300"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
                >
                  <Icon size={18} style={{ color: 'var(--accent)' }} className="shrink-0" />
                  <div>
                    <p className="font-mono text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>
                      {card.label}
                    </p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-heading)' }}>
                      {card.value}
                    </p>
                  </div>
                </div>
              )
            })}

            {/* Resume Button */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="w-full mt-2 py-2.5 rounded-lg border font-mono text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_15px_var(--glow)]"
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
            >
              Download Resume ↓
            </a>
          </div>

        </div>
      </div>
    </section >
  )
}

export default About