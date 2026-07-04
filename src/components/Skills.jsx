import React, { useEffect, useRef, useState } from 'react'
import { FaCode, FaServer, FaDatabase, FaTools, FaMobile, FaBrain } from 'react-icons/fa'

const skills = [
  {
    category: 'Frontend',
    icon: FaCode,
    color: '#eab308',
    items: [
      { label: 'React', level: 80 },
      { label: 'JavaScript', level: 85 },
      { label: 'HTML / CSS', level: 90 },
      { label: 'Tailwind CSS', level: 75 },
    ],
  },
  {
    category: 'Backend',
    icon: FaServer,
    color: '#eab308',
    items: [
      { label: 'Node.js', level: 70 },
      { label: 'Express.js', level: 70 },
      { label: 'REST APIs', level: 75 },
    ],
  },
  {
    category: 'Database',
    icon: FaDatabase,
    color: '#eab308',
    items: [
      { label: 'MongoDB', level: 75 },
      { label: 'Mongoose', level: 70 },
    ],
  },
  {
    category: 'Tools',
    icon: FaTools,
    color: '#eab308',
    items: [
      { label: 'Git & GitHub', level: 80 },
      { label: 'VS Code', level: 90 },
      { label: 'Chrome DevTools', level: 75 },
    ],
  },
]

function SkillBar({ label, level, animate }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
          {label}
        </span>
        <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>
          {level}%
        </span>
      </div>
      <div
        className="w-full h-1 rounded-full overflow-hidden"
        style={{ background: 'var(--border)' }}
      >
        <div
          className="h-1 rounded-full"
          style={{
            width: animate ? `${level}%` : '0%',
            background: 'linear-gradient(90deg, var(--accent), var(--accent-hover))',
            boxShadow: '0 0 6px var(--glow)',
            transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>
    </div>
  )
}

function Skills() {
  const [animate, setAnimate] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="min-h-screen pt-24 pb-16 px-6" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">

        {/* Section Heading */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-sm opacity-60" style={{ color: 'var(--accent)' }}>02</span>
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-heading)' }}>skills</h2>
          <span className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>

        <p className="text-sm font-mono mb-12" style={{ color: 'var(--text-muted)' }}>
          // technologies I work with
        </p>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skills.map((skill) => {
            const Icon = skill.icon
            return (
              <div
                key={skill.category}
                className="rounded-lg border p-6 hover:border-[var(--accent)] transition-all duration-300"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center"
                    style={{ background: 'var(--accent)', opacity: 0.15 }}
                  />
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center absolute"
                    style={{ color: 'var(--accent)' }}
                  >
                    <Icon size={16} />
                  </div>
                  <h3
                    className="font-mono text-sm font-medium"
                    style={{ color: 'var(--text-heading)' }}
                  >
                    {skill.category}
                  </h3>
                </div>

                {/* Skill Bars */}
                {skill.items.map((item) => (
                  <SkillBar
                    key={item.label}
                    label={item.label}
                    level={item.level}
                    animate={animate}
                  />
                ))}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Skills