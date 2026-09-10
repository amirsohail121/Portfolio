import { Link, useParams } from 'react-router-dom'
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import { projects } from '../data/projects'

function ProjectDetails() {
  const { projectId } = useParams()
  const project = projects.find((item) => String(item.id) === projectId)

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center">
          <p className="text-yellow-500 font-mono text-sm mb-3">404 / PROJECT NOT FOUND</p>
          <h1 className="text-3xl font-extrabold mb-6" style={{ color: 'var(--text-heading)' }}>
            This project does not exist.
          </h1>
          <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono" style={{ background: '#eab308', color: '#000' }}>
            <FaArrowLeft size={12} />
            Back to portfolio
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen px-6 py-10 sm:px-10 lg:px-16" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        <Link to="/#projects" className="inline-flex items-center gap-2 text-sm font-mono mb-12" style={{ color: 'var(--text-muted)' }}>
          <FaArrowLeft size={12} />
          Back to projects
        </Link>

        <p className="text-yellow-500 uppercase tracking-[0.3em] text-xs font-mono mb-3">Project details</p>
        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-5" style={{ color: 'var(--text-heading)' }}>
          {project.title}
        </h1>
        <p className="text-sm sm:text-base leading-relaxed max-w-3xl mb-8" style={{ color: 'var(--text-muted)' }}>
          {project.description}
        </p>

        {project.image && (
          <img src={project.image} alt={project.title} className="w-full rounded-2xl border mb-8" style={{ borderColor: 'var(--border)' }} />
        )}

        <div className="flex flex-wrap gap-2 mb-8">
          {project.stack.map((tech) => (
            <span key={tech} className="text-xs font-mono px-2 py-1 rounded-md border" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-mono" style={{ borderColor: 'var(--border)', color: 'var(--text-body)' }}>
            <FaGithub size={14} />
            View source
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-mono" style={{ background: '#eab308', color: '#000' }}>
              <FaExternalLinkAlt size={12} />
              Live demo
            </a>
          )}
        </div>
      </div>
    </main>
  )
}

export default ProjectDetails
