import React, { useState, useRef, useEffect } from 'react'
import { FaGithub, FaExternalLinkAlt, FaStar, FaArrowRight, FaExpand, FaTimes } from 'react-icons/fa'
import { projects } from '../data/projects'

/* ---------- Lightbox: click any screenshot to see it in full ---------- */
function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <button
        aria-label="Close preview"
        onClick={onClose}
        className="absolute top-5 right-5 sm:top-8 sm:right-8 w-10 h-10 rounded-full flex items-center justify-center border transition-colors duration-200"
        style={{ borderColor: 'rgba(255,255,255,0.25)', color: '#fff' }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = '#eab308')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)')}
      >
        <FaTimes size={16} />
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full rounded-2xl shadow-2xl"
        style={{ objectFit: 'contain', border: '1px solid rgba(255,255,255,0.1)' }}
        onClick={e => e.stopPropagation()}
      />
    </div>
  )
}

/* ---------- Reveals a card on scroll instead of all-at-once pop-in ---------- */
function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && (setInView(true), obs.unobserve(el)),
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
  return inView
}

function ProjectImage({ src, alt, onExpand, tall }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className="relative overflow-hidden cursor-zoom-in"
      style={{ aspectRatio: tall ? '16/11' : '16/9', background: 'var(--bg-primary)' }}
      onClick={onExpand}
    >
      {/* Skeleton shimmer while the image loads */}
      {!loaded && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, var(--bg-primary) 25%, var(--border) 50%, var(--bg-primary) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.4s ease-in-out infinite',
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="w-full h-full"
        style={{
          objectFit: 'cover',
          objectPosition: 'top center',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)',
        }}
      />
      {/* Expand affordance */}
      <div
        className="absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', backdropFilter: 'blur(4px)' }}
      >
        <FaExpand size={12} />
      </div>
    </div>
  )
}

function ProjectCard({ project, index, total, onExpand, cardRef }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref)

  return (
    <div
      ref={node => { ref.current = node; if (cardRef) cardRef(node) }}
      className="group rounded-3xl border overflow-hidden"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border)',
        boxShadow: hovered
          ? '0 20px 40px -12px rgba(234,179,8,0.25)'
          : '0 4px 12px rgba(0,0,0,0.04)',
        transform: `translateY(${inView ? (hovered ? -4 : 0) : 24}px)`,
        opacity: inView ? 1 : 0,
        transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {project.image && (
        <div className="relative">
          <ProjectImage
            src={project.image}
            alt={project.title}
            onExpand={() => onExpand(project.image, project.title)}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 40%)',
              opacity: hovered ? 0.25 : 0.55,
              transition: 'opacity 0.35s ease',
            }}
          />
          <span
            className="absolute top-3 right-3 font-mono text-[10px] px-2 py-0.5 rounded-full backdrop-blur-md"
            style={{ background: 'rgba(0,0,0,0.45)', color: '#fff' }}
          >
            {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      )}

      <div className="p-4 sm:p-5">
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-yellow-500 text-yellow-500 mb-2 inline-block">
          {project.tag}
        </span>

        <h3
          className="text-base sm:text-lg font-extrabold mb-2 leading-tight transition-colors duration-300"
          style={{ color: hovered ? '#eab308' : 'var(--text-heading)' }}
        >
          {project.title}
        </h3>

        <p className="text-xs leading-relaxed mb-3 line-clamp-3" style={{ color: 'var(--text-muted)' }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-1.5 py-0.5 rounded-md border"
              style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', background: 'var(--bg-primary)' }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-mono transition-all duration-300"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#eab308'; e.currentTarget.style.color = '#eab308' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            <FaGithub size={12} />
            GitHub
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all duration-300"
              style={{ background: '#eab308', color: '#000' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#facc15'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#eab308'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <FaExternalLinkAlt size={10} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function Projects() {
  const featured = projects.find(p => p.featured)
  const others = projects.filter(p => !p.featured)
  const ordered = featured ? [featured, ...others] : others
  const total = ordered.length

  const [activeIndex, setActiveIndex] = useState(0)
  const [lightbox, setLightbox] = useState(null) // { src, alt } | null
  const cardRefs = useRef([])
  const featuredRef = useRef(null)
  const featuredInView = useInView(featuredRef)

  const scrollToProject = (i) => {
    setActiveIndex(i)
    cardRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const openLightbox = (src, alt) => setLightbox({ src, alt })

  return (
    <section id="projects" className="py-20 px-6 sm:px-10 lg:px-16">
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto">

        {/* Heading + Navigation */}
        <div className="mb-12 flex items-end justify-between flex-wrap gap-6">
          <div>
            <p className="text-yellow-500 uppercase tracking-[0.3em] text-xs font-mono">
              What I've Built
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold mt-2" style={{ color: 'var(--text-heading)' }}>
              Pro<span className="text-yellow-500">jects</span>
            </h2>
            <div className="w-20 h-1 bg-yellow-500 rounded-full mt-3" />
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <span className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-2">
              {ordered.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => scrollToProject(i)}
                  aria-label={`Go to ${p.title}`}
                  className="rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
                  style={{
                    width: activeIndex === i ? '24px' : '8px',
                    height: '8px',
                    background: activeIndex === i ? '#eab308' : 'var(--border)',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => scrollToProject((activeIndex + 1) % total)}
              aria-label="Next project"
              className="flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
              style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#eab308'; e.currentTarget.style.color = '#eab308' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              <FaArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Featured Project */}
        {featured && (
          <div
            ref={el => { cardRefs.current[0] = el; featuredRef.current = el }}
            className="group mb-16 rounded-3xl border overflow-hidden"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
              opacity: featuredInView ? 1 : 0,
              transform: `translateY(${featuredInView ? 0 : 24}px)`,
              transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 24px 48px -16px rgba(234,179,8,0.25)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.04)'
            }}
            onMouseOver={() => setActiveIndex(0)}
          >
            {/* Terminal Bar */}
            <div className="flex items-center gap-1.5 px-6 py-3 border-b" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)' }}>
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <span className="w-3 h-3 rounded-full bg-green-400/80" />
              <span className="ml-3 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                featured_project.js
              </span>
              <span className="ml-auto flex items-center gap-1.5 text-xs font-mono font-bold text-yellow-500">
                <FaStar size={11} />
                Featured — Strongest Build
              </span>
            </div>

            <div className="p-8 sm:p-10">
              <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 items-start">

                {featured.image && (
                  <div
                    className="relative rounded-2xl overflow-hidden border"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <ProjectImage
                      src={featured.image}
                      alt={featured.title}
                      tall
                      onExpand={() => openLightbox(featured.image, featured.title)}
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ boxShadow: 'inset 0 0 0 1px rgba(234,179,8,0.15)' }}
                    />
                  </div>
                )}

                <div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full border border-yellow-500 text-yellow-500 mb-4 inline-block">
                    {featured.tag}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 leading-tight" style={{ color: 'var(--text-heading)' }}>
                    {featured.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                    {featured.description}
                  </p>

                  <div className="rounded-2xl border p-4 mb-6" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border)' }}>
                    <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
                      // tech stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {featured.stack.map((tech) => (
                        <span key={tech} className="text-xs font-mono px-2 py-1.5 rounded-lg border border-yellow-500 text-yellow-500">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={featured.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-mono transition-all duration-300"
                      style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#eab308'; e.currentTarget.style.color = '#eab308' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                    >
                      <FaGithub size={16} />
                      GitHub
                    </a>
                    {featured.live && (
                      <a
                        href={featured.live}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-mono transition-all duration-300"
                        style={{ background: '#eab308', color: '#000' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#facc15'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#eab308'; e.currentTarget.style.transform = 'translateY(0)' }}
                      >
                        <FaExternalLinkAlt size={13} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Other Projects */}
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {others.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i + 2}
              total={total}
              onExpand={openLightbox}
              cardRef={el => (cardRefs.current[i + 1] = el)}
            />
          ))}
        </div>

      </div>

      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
    </section>
  )
}

export default Projects