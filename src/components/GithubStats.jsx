import React, { useState, useEffect } from 'react'
import { FaGithub, FaStar, FaCodeBranch, FaUsers, FaUserFriends } from 'react-icons/fa'

const username = 'amirsohail121'

function ContributionGraph({ data, darkMode }) {
  if (!data || !data.contributions) return null

  const weeks = []
  let week = []

  data.contributions.forEach((day, i) => {
    week.push(day)
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
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
        case 1: return '#fef3c7'
        case 2: return '#fde68a'
        case 3: return '#fbbf24'
        case 4: return '#eab308'
        default: return '#e5e7eb'
      }
    }
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: '600px' }}>
        <div className="flex gap-0.5">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-0.5">
              {week.map((day, di) => (
                <div
                  key={di}
                  title={`${day.date}: ${day.count} contributions`}
                  style={{
                    width: '10px',
                    height: '10px',
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
                width: '10px',
                height: '10px',
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
  const [darkMode, setDarkMode] = useState(!document.body.classList.contains('light'))
  const [year, setYear] = useState(new Date().getFullYear())

  const years = [2025, 2026]

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkMode(!document.body.classList.contains('light'))
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setContributions(null)
    Promise.all([
      fetch(`https://api.github.com/users/${username}`).then(r => r.json()),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`).then(r => r.json()),
      fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`).then(r => r.json()),
    ]).then(([profileData, reposData, contribData]) => {
      setProfile(profileData)
      setRepos(reposData)
      setContributions(contribData)
      setLoading(false)
    })
  }, [year])

  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)
  const totalContributions = contributions?.total?.[year] || 0

  const langCount = {}
  repos.forEach(repo => {
    if (repo.language) {
      langCount[repo.language] = (langCount[repo.language] || 0) + 1
    }
  })
  const topLanguages = Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
  const totalLangCount = topLanguages.reduce((acc, [, count]) => acc + count, 0)

  if (loading) {
    return (
      <section id="githubstats" className="py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto flex items-center justify-center h-64">
          <div className="w-8 h-8 rounded-full border-2 border-yellow-500 border-t-transparent animate-spin" />
        </div>
      </section>
    )
  }

  return (
    <section id="githubstats" className="py-20 px-6 sm:px-10 lg:px-16">
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
          {[
            { icon: FaCodeBranch, label: 'Public Repos', value: profile?.public_repos },
            { icon: FaStar, label: 'Total Stars', value: totalStars },
            { icon: FaUsers, label: 'Followers', value: profile?.followers },
            { icon: FaUserFriends, label: 'Following', value: profile?.following },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="rounded-2xl border p-5 text-center transition-all duration-300 hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/10"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                <Icon size={20} className="text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold font-mono text-yellow-500 mb-1">
                  {stat.value}
                </p>
                <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-6">

          {/* Contribution Graph */}
          <div
            className="rounded-3xl border overflow-hidden transition-all duration-300 hover:border-yellow-500 hover:shadow-xl hover:shadow-yellow-500/10"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            {/* Terminal Bar */}
            <div
              className="flex items-center gap-1.5 px-6 py-3 border-b"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)' }}
            >
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <span className="w-3 h-3 rounded-full bg-green-400/80" />
              <span className="ml-3 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                contributions.js
              </span>
            </div>

            <div className="p-6">
              {/* Header row */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                    // contribution graph
                  </p>
                  <p className="text-yellow-500 font-mono font-bold text-sm mt-1">
                    {totalContributions} contributions in {year}
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
                      }}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              {/* Heatmap */}
              {contributions ? (
                <ContributionGraph data={contributions} darkMode={darkMode} />
              ) : (
                <div className="flex items-center justify-center h-24">
                  <div className="w-6 h-6 rounded-full border-2 border-yellow-500 border-t-transparent animate-spin" />
                </div>
              )}
            </div>
          </div>

          {/* Top Languages */}
          <div
            className="rounded-3xl border overflow-hidden transition-all duration-300 hover:border-yellow-500 hover:shadow-xl hover:shadow-yellow-500/10"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            {/* Terminal Bar */}
            <div
              className="flex items-center gap-1.5 px-6 py-3 border-b"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)' }}
            >
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <span className="w-3 h-3 rounded-full bg-green-400/80" />
              <span className="ml-3 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                languages.js
              </span>
            </div>

            <div className="p-6">
              <p
                className="text-xs font-mono uppercase tracking-widest mb-5"
                style={{ color: 'var(--text-muted)' }}
              >
                // most used languages
              </p>

              <div className="space-y-4">
                {topLanguages.map(([lang, count]) => {
                  const percentage = Math.round((count / totalLangCount) * 100)
                  return (
                    <div key={lang}>
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
                          className="h-2 rounded-full bg-yellow-500 transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* GitHub Profile Link */}
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-yellow-500 text-yellow-500 text-sm font-mono transition-all duration-300 hover:bg-yellow-500 hover:text-black"
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