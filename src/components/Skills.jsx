import React, { useEffect, useRef, useState } from 'react'
import { skills, programming, strengths } from '../data/skills'

function TerminalBar({ filename }) {
  return (
    <div
      className="flex items-center gap-1.5 px-6 py-3 border-b"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
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

function SkillChip({ skill }) {
  const Icon = skill.icon
  const [hovered, setHovered] = useState(false)

  return (
    <div
      tabIndex={0}
      role="listitem"
      className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-mono select-none"
      style={{
        borderColor: hovered ? '#eab308' : 'var(--border)',
        background: 'var(--bg-primary)',
        color: hovered ? '#eab308' : 'var(--text-muted)',
        minHeight: '36px',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 4px 14px rgba(234,179,8,0.2)' : 'none',
        transition: 'all 0.25s ease',
        outline: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {Icon && (
        <Icon
          size={14}
          className="text-yellow-500 shrink-0"
          style={{
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.25s ease',
          }}
        />
      )}
      {skill.name}
    </div>
  )
}

function LearningChip({ item }) {
  const Icon = item.icon
  const [hovered, setHovered] = useState(false)

  return (
    <div
      tabIndex={0}
      role="listitem"
      className="flex items-center gap-2 px-3 py-2 rounded-xl border border-yellow-500 text-xs font-mono select-none"
      style={{
        minHeight: '36px',
        cursor: 'pointer',
        color: hovered ? '#000' : '#eab308',
        background: hovered ? '#eab308' : 'transparent',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 4px 14px rgba(234,179,8,0.3)' : 'none',
        transition: 'all 0.25s ease',
        outline: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {Icon && (
        <Icon
          size={13}
          style={{
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.25s ease',
          }}
        />
      )}
      {item.name}
    </div>
  )
}

function CategoryBlock({ category, items, index, visible }) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${index * 130}ms, transform 0.5s ease ${index * 130}ms`,
      }}
    >
      <p
        className="text-xs font-mono uppercase mb-3 font-bold"
        style={{
          color: 'var(--accent, #eab308)',
          letterSpacing: '0.18em',
        }}
      >
        // {category}
      </p>
      <div className="flex flex-wrap gap-2" role="list">
        {items.map((skill) => (
          <SkillChip key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  )
}

function HoverCard({ children, filename }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="rounded-3xl border overflow-hidden"
      style={{
        background: 'var(--bg-card)',
        borderColor: hovered ? '#eab308' : 'var(--border)',
        boxShadow: hovered ? '0 8px 24px rgba(234,179,8,0.12)' : 'none',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <TerminalBar filename={filename} />
      {children}
    </div>
  )
}

function Skills() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="py-20 px-6 sm:px-10 lg:px-16" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-10">
          <p className="text-yellow-500 uppercase tracking-[0.3em] text-xs font-mono">
            What I Work With
          </p>
          <h2
            className="text-4xl sm:text-5xl font-extrabold mt-2"
            style={{ color: 'var(--text-heading)' }}
          >
            Tech <span className="text-yellow-500">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-500 rounded-full mt-3" />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">

          {/* Left — Technical Skills */}
          <div
            className="rounded-3xl border overflow-hidden transition-all duration-300 hover:border-yellow-500 hover:shadow-xl hover:shadow-yellow-500/10"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <TerminalBar filename="skills.js" />
            <div className="p-8 space-y-8">
              {Object.entries(skills).map(([category, items], index) => (
                <CategoryBlock
                  key={category}
                  category={category}
                  items={items}
                  index={index}
                  visible={visible}
                />
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">

            {/* Current Focus */}
            <HoverCard filename="programming.js">
              <div className="p-6">
                <h4
                  className="text-sm font-semibold mb-4 uppercase tracking-widest font-mono"
                  style={{ color: 'var(--text-heading)' }}
                >
                  Programming
                </h4>
                <div className="flex flex-wrap gap-2" role="list">
                  {programming.map((item) => (
                    <LearningChip key={item.name} item={item} />
                  ))}
                </div>
              </div>
            </HoverCard>

            {/* Core Strengths */}
            <HoverCard filename="core_strengths.js">
              <div className="p-6">
                <h4
                  className="text-sm font-semibold mb-4 uppercase tracking-widest font-mono"
                  style={{ color: 'var(--text-heading)' }}
                >
                  💪 Core Strengths
                </h4>
                <ul className="space-y-3" role="list">
                  {strengths.map((strength, i) => (
                    <li
                      key={strength}
                      className="flex items-start gap-3 text-sm"
                      style={{
                        color: 'var(--text-muted)',
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(10px)',
                        transition: `opacity 0.4s ease ${i * 90}ms, transform 0.4s ease ${i * 90}ms`,
                      }}
                    >
                      <span
                        className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: 'rgba(234,179,8,0.1)' }}
                      >
                        <span className="text-yellow-500 text-xs font-bold">✓</span>
                      </span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
            </HoverCard>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills