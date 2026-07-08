import React from 'react'
import { FaGraduationCap, FaTrophy, FaMapMarkerAlt } from 'react-icons/fa'

const coursework = [
  'DSA', 'DBMS', 'Operating Systems',
  'Computer Networks', 'OOP', 'Software Engineering'
]

function Education() {
  return (
    <section id="education" className="py-20 px-6 sm:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-10">
          <p className="text-yellow-500 uppercase tracking-[0.3em] text-xs font-mono">
            Academic Background
          </p>
          <h2
            className="text-4xl sm:text-5xl font-extrabold mt-2"
            style={{ color: 'var(--text-heading)' }}
          >
            Edu<span className="text-yellow-500">cation</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-500 rounded-full mt-3" />
        </div>

        {/* Main Card */}
        <div
          className="rounded-3xl border overflow-hidden transition-all duration-300 hover:border-yellow-500 hover:shadow-xl hover:shadow-yellow-500/10"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >

          {/* Terminal Bar */}
          <div
            className="flex items-center gap-1.5 px-6 py-3 border-b"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <span className="w-3 h-3 rounded-full bg-red-400/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <span className="w-3 h-3 rounded-full bg-green-400/80" />
            <span className="ml-3 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
              education.js
            </span>
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">
            <div className="grid lg:grid-cols-[2fr_1fr] gap-10 items-start">

              {/* Left */}
              <div className="space-y-6">

                {/* Degree Header */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center shrink-0">
                    <FaGraduationCap size={26} className="text-yellow-500" />
                  </div>
                  <div>
                    <h3
                      className="text-xl sm:text-2xl font-bold"
                      style={{ color: 'var(--text-heading)' }}
                    >
                      B.Tech Computer Science Engineering
                    </h3>
                    <p className="text-sm mt-1 font-medium" style={{ color: 'var(--text-muted)' }}>
                      S.S.I.P.M.T., Raipur
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      Affiliated to CSVTU
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px" style={{ background: 'var(--border)' }} />

                {/* Duration + CGPA */}
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className="rounded-2xl border p-4 text-center"
                    style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'var(--border)' }}
                  >
                    <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                      Duration
                    </p>
                    <p className="text-yellow-500 font-bold text-lg font-mono">2023 – 2027</p>
                  </div>
                  <div
                    className="rounded-2xl border p-4 text-center"
                    style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'var(--border)' }}
                  >
                    <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                      CGPA
                    </p>
                    <p className="text-yellow-500 font-bold text-lg font-mono">6.79 / 10</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px" style={{ background: 'var(--border)' }} />

                {/* Relevant Coursework */}
                <div>
                  <h4
                    className="text-sm font-semibold mb-3 uppercase tracking-widest font-mono"
                    style={{ color: 'var(--text-heading)' }}
                  >
                    📚 Relevant Coursework
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {coursework.map((course) => (
                      <span
                        key={course}
                        className="text-xs font-mono px-3 py-2 rounded-lg border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right */}
              <div className="space-y-4">

                {/* Academic Achievement */}
                <div
                  className="p-5 rounded-2xl border transition-all duration-300 hover:border-yellow-500"
                  style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'var(--border)' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0">
                      <FaTrophy size={14} className="text-yellow-500" />
                    </div>
                    <h4 className="text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>
                      Academic Achievement
                    </h4>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    Ranked among top students in 4th & 5th Semester
                  </p>
                </div>

                {/* Current Status */}
                <div
                  className="p-5 rounded-2xl border border-yellow-500/30"
                  style={{ background: 'rgba(234,179,8,0.05)' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FaMapMarkerAlt size={14} className="text-yellow-500" />
                    <h4 className="text-sm font-semibold text-yellow-500">
                      Current Status
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse shrink-0" />
                    <p className="text-sm font-mono text-yellow-500">
                      Final Year — 7th Semester
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Education