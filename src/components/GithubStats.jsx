import React, { useState, useEffect, useRef } from 'react'
import {
  FaGithub,
  FaStar,
  FaCodeBranch,
  FaUsers,
  FaUserFriends,
  FaExternalLinkAlt,
  FaCalendarAlt
} from 'react-icons/fa'

const username = 'amirsohail121'

// Custom hook for counting animation
function useCountUp(target, duration = 1500, start = false) {
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

// Stat Card Component
function StatCard({ icon: Icon, label, value, start }) {
  const count = useCountUp(value || 0, 1500, start)

  return (
    <div
      className="rounded-2xl border p-5 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
    >
      <Icon size={22} className="text-yellow-500 mx-auto mb-2" />
      <p className="text-2xl font-bold font-mono text-yellow-500 mb-1">
        {value !== undefined ? count.toLocaleString() : '—'}
      </p>
      <p className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
        {label}
      </p>
    </div>
  )
}

// Language Bar Component
function LanguageBar({ lang, percentage, visible, index }) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setAnimated(true), index * 150 + 300)
      return () => clearTimeout(timer)
    } else {
      setAnimated(false)
    }
  }, [visible, index])

  return (
    <div className="group">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-mono" style={{ color: 'var(--text-heading)' }}>
          {lang}
        </span>
        <span className="text-sm font-mono font-semibold text-yellow-500">
          {percentage}%
        </span>
      </div>
      <div
        className="w-full h-2.5 rounded-full overflow-hidden"
        style={{ background: 'var(--border)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: animated ? `${percentage}%` : '0%',
            background: `linear-gradient(90deg, #eab30888, #eab308)`,
            boxShadow: animated ? '0 0 12px rgba(234,179,8,0.4)' : 'none',
          }}
        />
      </div>
    </div>
  )
}

// Skeleton Components
function SkeletonCard() {
  return (
    <div
      className="rounded-2xl border p-5 text-center animate-pulse"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
    >
      <div className="w-6 h-6 rounded-full mx-auto mb-2" style={{ background: 'var(--border)' }} />
      <div className="w-16 h-7 rounded mx-auto mb-1" style={{ background: 'var(--border)' }} />
      <div className="w-24 h-3 rounded mx-auto" style={{ background: 'var(--border)' }} />
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
      <div className="w-full h-2.5 rounded-full" style={{ background: 'var(--border)' }} />
    </div>
  )
}

// Terminal Bar Component
function TerminalBar({ filename }) {
  return (
    <div
      className="flex items-center gap-2 px-6 py-3 border-b"
      style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)' }}
    >
      <div className="flex gap-1.5">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
      </div>
      <span className="ml-2 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
        {filename}
      </span>
    </div>
  )
}

// Contribution Graph Component - Fixed hover and tooltip
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
        case 0: return '#2a2a2a'
        case 1: return '#78350f'
        case 2: return '#b45309'
        case 3: return '#d97706'
        case 4: return '#eab308'
        default: return '#2a2a2a'
      }
    } else {
      switch (level) {
        case 0: return '#e5e7eb'
        case 1: return '#fde68a'
        case 2: return '#fcd34d'
        case 3: return '#f59e0b'
        case 4: return '#d97706'
        default: return '#e5e7eb'
      }
    }
  }

  const getBorderColor = (level) => {
    if (level === 0) {
      return darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'
    }
    return 'none'
  }

  const [hoveredDay, setHoveredDay] = useState(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  const handleMouseEnter = (day, e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setHoveredDay(day)
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    })
  }

  const handleMouseLeave = () => {
    setHoveredDay(null)
  }

  return (
    <div style={{ position: 'relative', overflow: 'visible' }}>
      <div style={{ minWidth: '500px', position: 'relative', overflow: 'visible' }}>
        <div style={{ display: 'flex', gap: '2px', overflow: 'visible' }}>
          {weeks.map((week, wi) => (
            <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'visible' }}>
              {week.map((day, di) => (
                <div
                  key={di}
                  style={{
                    position: 'relative',
                    width: '12px',
                    height: '12px',
                    borderRadius: '3px',
                    background: getColor(day.level),
                    border: `1px solid ${getBorderColor(day.level)}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    overflow: 'visible',
                    transform: hoveredDay === day ? 'scale(1.3)' : 'scale(1)',
                    boxShadow: hoveredDay === day ? '0 0 12px rgba(234,179,8,0.4)' : 'none',
                    zIndex: hoveredDay === day ? 10 : 1,
                  }}
                  onMouseEnter={(e) => handleMouseEnter(day, e)}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Tooltip - positioned absolutely relative to viewport */}
        {hoveredDay && (
          <div
            style={{
              position: 'fixed',
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              transform: 'translateX(-50%) translateY(-100%)',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              background: darkMode ? '#1a1a1a' : '#ffffff',
              color: darkMode ? '#ffffff' : '#1a1a1a',
              border: `1px solid ${darkMode ? '#333' : '#e5e5e5'}`,
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              zIndex: 99999,
              minWidth: '120px',
              pointerEvents: 'none',
              transition: 'opacity 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <span style={{ fontWeight: 600, fontSize: '11px' }}>{hoveredDay.date}</span>
              <span style={{ color: '#eab308', fontWeight: 700, fontSize: '13px' }}>
                {hoveredDay.count} {hoveredDay.count === 1 ? 'contribution' : 'contributions'}
              </span>
            </div>
            {/* Tooltip arrow */}
            <div
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: '50%',
                transform: 'translateX(-50%) rotate(45deg)',
                width: '10px',
                height: '10px',
                background: darkMode ? '#1a1a1a' : '#ffffff',
                borderRight: `1px solid ${darkMode ? '#333' : '#e5e5e5'}`,
                borderBottom: `1px solid ${darkMode ? '#333' : '#e5e5e5'}`,
              }}
            />
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>Less</span>
            {[0, 1, 2, 3, 4].map(level => (
              <div
                key={level}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '3px',
                  background: getColor(level),
                  border: `1px solid ${getBorderColor(level)}`,
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.3)'
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(234,179,8,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />
            ))}
            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>More</span>
          </div>

          <div style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
            {data.contributions.filter(d => d.count > 0).length} active days
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Component
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
  const years = [2026, 2025, 2024]

  // Dark mode observer
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkMode(!document.body.classList.contains('light'))
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Fetch GitHub data
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

  // Fetch contributions
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
    .slice(0, 6)
  const totalLangCount = topLanguages.reduce((acc, [, count]) => acc + count, 0)

  if (error) {
    return (
      <section id="githubstats" className="py-20 px-6 sm:px-10 lg:px-16" ref={sectionRef}>
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-3xl border p-12 text-center"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <FaGithub size={48} className="text-yellow-500 mx-auto mb-4" />
            <p className="font-mono text-lg mb-2" style={{ color: 'var(--text-heading)' }}>
              Oops! Unable to load GitHub data
            </p>
            <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
              Check your connection or try again later
            </p>
            <button
              onClick={() => { setError(false); setLoading(true); window.location.reload() }}
              className="mt-6 px-6 py-2.5 rounded-xl border border-yellow-500 text-yellow-500 text-sm font-mono hover:bg-yellow-500 hover:text-black transition-all duration-300"
            >
              Retry ↻
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="githubstats" className="py-20 px-6 sm:px-10 lg:px-16" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <p className="text-yellow-500 uppercase tracking-[0.3em] text-xs font-mono font-semibold">
              Open Source Activity
            </p>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-extrabold mt-2"
            style={{ color: 'var(--text-heading)' }}
          >
            GitHub <span className="text-yellow-500">Stats</span>
          </h2>
          <div className="flex items-center gap-4 mt-3">
            <div className="w-20 h-1 bg-yellow-500 rounded-full" />
            <p className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
              {profile?.name || username} • {profile?.bio?.slice(0, 60) || 'Developer'}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {loading ? (
            Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            [
                { icon: FaCodeBranch, label: 'Repositories', value: profile?.public_repos },
                { icon: FaStar, label: 'Stars Earned', value: totalStars },
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

          {/* Contribution Graph Card */}
          <div
            className="rounded-3xl border overflow-visible transition-all duration-300 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/5"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', overflow: 'visible' }}
          >
            <TerminalBar filename="contributions.js" />
            <div className="p-6" style={{ overflow: 'visible' }}>
              {/* Header */}
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest opacity-60" style={{ color: 'var(--text-muted)' }}>
                    // contribution graph
                  </p>
                  <p className="text-yellow-500 font-mono font-bold text-lg flex items-center gap-2">
                    <FaCalendarAlt className="text-sm" />
                    {totalContributions.toLocaleString()} contributions
                  </p>
                </div>

                {/* Year Selector */}
                <div className="flex gap-1.5 bg-opacity-10 p-1 rounded-xl" style={{ background: 'var(--border)' }}>
                  {years.map((y) => (
                    <button
                      key={y}
                      onClick={() => setYear(y)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 ${year === y
                        ? 'bg-yellow-500 text-black font-bold shadow-lg shadow-yellow-500/30'
                        : 'hover:bg-yellow-500/10'
                        }`}
                      style={{
                        color: year === y ? '#000' : 'var(--text-muted)',
                      }}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              {/* Graph */}
              {contribLoading ? (
                <div className="flex flex-col items-center justify-center h-32 gap-3">
                  <div className="w-8 h-8 rounded-full border-3 border-yellow-500 border-t-transparent animate-spin" />
                  <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                    Loading contributions...
                  </p>
                </div>
              ) : (
                <ContributionGraph data={contributions} darkMode={darkMode} />
              )}
            </div>
          </div>

          {/* Top Languages Card */}
          <div
            className="rounded-3xl border overflow-hidden transition-all duration-300 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/5"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <TerminalBar filename="languages.js" />
            <div className="p-6">
              <p
                className="text-xs font-mono uppercase tracking-widest opacity-60 mb-5"
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
                className="mt-6 w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-yellow-500 text-yellow-500 font-mono text-sm transition-all duration-300 hover:bg-yellow-500 hover:text-black hover:scale-[1.02] hover:shadow-lg hover:shadow-yellow-500/30 group"
              >
                <FaGithub size={18} className="group-hover:rotate-6 transition-transform" />
                View GitHub Profile
                <FaExternalLinkAlt size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

        </div>

        {/* Footer note */}
        <div className="mt-8 text-center">
          <p className="text-xs font-mono opacity-40" style={{ color: 'var(--text-muted)' }}>
            Data fetched from GitHub API • Updated in real-time
          </p>
        </div>
      </div>
    </section>
  )
}

export default GithubStats