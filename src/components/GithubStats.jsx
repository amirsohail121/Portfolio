import React, { useState, useEffect, useRef } from 'react'
import { FaGithub, FaStar, FaCodeBranch, FaUsers, FaUserFriends } from 'react-icons/fa'

const username = 'amirsohail121'

function useCountUp(target, duration = 1000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start || target === 0) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target])
  return count
}

function StatCard({ icon: Icon, label, value, start }) {
  const count = useCountUp(value || 0, 1000, start)
  return (
    <div
      className="rounded-2xl border p-5 text-center transition-all duration-300 hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-1"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
    >
      <Icon size={20} className="text-yellow-500 mx-auto mb-2" />
      <p className="text-2xl font-bold font-mono text-yellow-500 mb-1">
        {value !== undefined ? count : '—'}
      </p>
      <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
        {label}
      </p>
    </div>
  )
}

function LanguageBar({ lang, percentage, visible, index }) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setAnimated(true), index * 150)
      return () => clearTimeout(timer)
    } else {
      setAnimated(false)
    }
  }, [visible, index])

  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-mono" style={{ color: 'var(--text-heading)' }}>
          {lang}
        </span>
        <span className="text-sm font-mono text-yellow-500">
          {percentage}%
        </span>
      </div>
      <div
        className="w-full h-2 rounded-full overflow-hidden"
        style={{ background: 'var(--border)' }}
      >
        <div
          className="h-2 rounded-full"
          style={{
            width: animated ? `${percentage}%` : '0%',
            background: '#eab308',
            boxShadow: animated ? '0 0 6px rgba(234,179,8,0.4)' : 'none',
            transition: 'width 1s cubic-bezier(0.4,0,0.2,1), box-shadow 1s ease',
          }}
        />
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div
      className="rounded-2xl border p-5 text-center animate-pulse"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
    >
      <div className="w-5 h-5 rounded-full bg-yellow-500/20 mx-auto mb-2" />
      <div className="w-12 h-6 rounded bg-yellow-500/20 mx-auto mb-1" />
      <div className="w-20 h-3 rounded bg-yellow-500/10 mx-auto" />
    </div>
  )
}

function SkeletonBar() {
  return (
    <div className="animate-pulse">
      <div className="flex justify-between mb-1.5">
        <div className="w-20 h-3 rounded" style={{ background: 'var(--border)' }} />
        <div className="w-8 h-3 rounded" style={{ background: 'var(--border)' }} />
      </div>
      <div className="w-full h-2 rounded-full" style={{ background: 'var(--border)' }} />
    </div>
  )
}

function TerminalBar({ filename }) {
  return (
    <div
      className="flex items-center gap-1.5 px-6 py-3 border-b"
      style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)' }}
    >
      <span className="w-3 h-3 rounded-full bg-red-400/80" />
      <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
      <span className="w-3 h-3 rounded-full bg-green-400/80" />
      <span className="ml-3 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
        {filename}
      </span>
    </div>
  )
}

function ContributionGraph({ data, darkMode }) {
  if (!data || !data.contributions) return null

  const weeks = []
  let week = []
  data.contributions.forEach((day) => {
    week.push(day)
    if (week.length === 7) { weeks.push(week); week = [] }
  })
  if (week.length) weeks.push(week)

  const getColor = (level) => {
    if (darkMode) {
      switch (level) {
        case 0: return 'rgba(255,255,255,0.06)'
        case 1: return '#78350f'
        case 2: return '#b45309'
        case 3: return '#d97706'
        case 4: return '#eab308'
        default: return 'rgba(255,255,255,0.06)'
      }
    } else {
      switch (level) {
        case 0: return '#f3f4f6'
        case 1: return '#fef3c7'
        case 2: return '#fcd34d'
        case 3: return '#f59e0b'
        case 4: return '#d97706'
        default: return '#f3f4f6'
      }
    }
  }

  return (
    <div className="overflow-x-auto pb-2">
      <div style={{ minWidth: '500px' }}>
        <div className="flex gap-0.5">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-0.5">
              {week.map((day, di) => (
                <div
                  key={di}
                  title={`${day.date}: ${day.count} contributions`}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '2px',
                    background: getColor(day.level),
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1 mt-3">
          <span className="text-xs font-mono mr-1" style={{ color: 'var(--text-muted)' }}>Less</span>
          {[0, 1, 2, 3, 4].map(level => (
            <div
              key={level}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '2px',
                background: getColor(level),
              }}
            />
          ))}
          <span className="text-xs font-mono ml-1" style={{ color: 'var(--text-muted)' }}>More</span>
        </div>
      </div>
    </div>
  )
}

function GithubStats() {
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState([])
  const [contributions, setContributions] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [visible, setVisible] = useState(false)
  const [darkMode, setDarkMode] = useState(!document.body.classList.contains('light'))
  const [year, setYear] = useState(new Date().getFullYear())
  const [contribLoading, setContribLoading] = useState(false)
  const sectionRef = useRef(null)
  const years = [2026]

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkMode(!document.body.classList.contains('light'))
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        } else {
          setVisible(false)
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${username}`).then(r => r.json()),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`).then(r => r.json()),
    ]).then(([profileData, reposData]) => {
      setProfile(profileData)
      setRepos(reposData)
      setLoading(false)
    }).catch(() => {
      setError(true)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    setContribLoading(true)
    setContributions(null)
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`)
      .then(r => r.json())
      .then(data => {
        setContributions(data)
        setContribLoading(false)
      })
      .catch(() => setContribLoading(false))
  }, [year])

  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)
  const totalContributions = contributions?.total?.[year] || 0

  const langCount = {}
  repos.forEach(repo => {
    if (repo.language) langCount[repo.language] = (langCount[repo.language] || 0) + 1
  })
  const topLanguages = Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
  const totalLangCount = topLanguages.reduce((acc, [, count]) => acc + count, 0)

  if (error) {
    return (
      <section id="githubstats" className="py-20 px-6 sm:px-10 lg:px-16" ref={sectionRef}>
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-3xl border p-12 text-center"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <FaGithub size={40} className="text-yellow-500 mx-auto mb-4" />
            <p className="font-mono text-sm mb-2" style={{ color: 'var(--text-heading)' }}>
              Unable to load GitHub data
            </p>
            <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
              Check your connection or try again later
            </p>
            <button
              onClick={() => { setError(false); setLoading(true) }}
              className="mt-4 px-4 py-2 rounded-lg border border-yellow-500 text-yellow-500 text-xs font-mono hover:bg-yellow-500 hover:text-black transition-all duration-300"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="githubstats" className="py-20 px-6 sm:px-10 lg:px-16" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-10">
          <p className="text-yellow-500 uppercase tracking-[0.3em] text-xs font-mono">
            Open Source Activity
          </p>
          <h2
            className="text-4xl sm:text-5xl font-extrabold mt-2"
            style={{ color: 'var(--text-heading)' }}
          >
            GitHub <span className="text-yellow-500">Stats</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-500 rounded-full mt-3" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {loading ? (
            Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            [
              { icon: FaCodeBranch, label: 'Public Repos', value: profile?.public_repos },
              { icon: FaStar, label: 'Total Stars', value: totalStars },
              { icon: FaUsers, label: 'Followers', value: profile?.followers },
              { icon: FaUserFriends, label: 'Following', value: profile?.following },
              ].map((stat) => (
                <StatCard
                key={stat.label}
                  icon={stat.icon}
                  label={stat.label}
                  value={stat.value}
                  start={visible}
                />
              ))
          )}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-6">

          {/* Contribution Graph */}
          <div
            className="rounded-3xl border overflow-hidden transition-all duration-300 hover:border-yellow-500 hover:shadow-xl hover:shadow-yellow-500/10"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <TerminalBar filename="contributions.js" />
            <div className="p-6">

              {/* Header */}
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                    // contribution graph
                  </p>
                  <p className="text-yellow-500 font-mono font-bold text-sm mt-1">
                    {totalContributions} contributions this year
                  </p>
                </div>

                {/* Year Selector */}
                <div className="flex gap-2">
                  {years.map((y) => (
                    <button
                      key={y}
                      onClick={() => setYear(y)}
                      className="px-3 py-1 rounded-lg text-xs font-mono border transition-all duration-300"
                      style={{
                        background: year === y ? '#eab308' : 'transparent',
                        color: year === y ? '#000' : '#eab308',
                        borderColor: '#eab308',
                        cursor: 'pointer',
                      }}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              {/* Graph */}
              {contribLoading ? (
                <div className="flex items-center justify-center h-24">
                  <div className="w-6 h-6 rounded-full border-2 border-yellow-500 border-t-transparent animate-spin" />
                </div>
              ) : (
                <ContributionGraph data={contributions} darkMode={darkMode} />
              )}
            </div>
          </div>

          {/* Top Languages */}
          <div
            className="rounded-3xl border overflow-hidden transition-all duration-300 hover:border-yellow-500 hover:shadow-xl hover:shadow-yellow-500/10"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <TerminalBar filename="languages.js" />
            <div className="p-6">
              <p
                className="text-xs font-mono uppercase tracking-widest mb-5"
                style={{ color: 'var(--text-muted)' }}
              >
                // most used languages
              </p>

              <div className="space-y-4">
                {loading ? (
                  Array(5).fill(0).map((_, i) => <SkeletonBar key={i} />)
                ) : (
                  topLanguages.map(([lang, count], index) => {
                    const percentage = Math.round((count / totalLangCount) * 100)
                    return (
                      <LanguageBar
                        key={lang}
                        lang={lang}
                        percentage={percentage}
                        visible={visible}
                        index={index}
                      />
                    )
                  })
                )}
              </div>

              {/* GitHub Profile Button */}
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-yellow-500 text-yellow-500 text-sm font-mono"
                style={{
                  transition: 'all 0.27s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#eab308'
                  e.currentTarget.style.color = '#000'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(234,179,8,0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#eab308'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <FaGithub size={16} />
                View GitHub Profile
              </a>
            </div>
          </div>

        </div>
      </div>
    </section >
  )
}

export default GithubStats