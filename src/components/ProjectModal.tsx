import { useEffect } from 'react'
import type { ProjectData } from '../data/projects'

interface ProjectModalProps {
  project: ProjectData
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4 transition-opacity duration-200"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-white transition-colors p-2 absolute top-4 right-4 self-end"
        aria-label="Close modal"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="relative bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-lg w-full max-w-2xl z-50 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Thumbnail */}
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-slate-700 relative">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-900/50 to-slate-900">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-semibold text-white mb-2">{project.title}</h3>
                <div className="flex justify-between items-end gap-4 mb-2">
                  <p className={`text-lg text-blue-400`}>{project.playcount}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-700/50 border border-slate-600 rounded-full text-sm text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
              </div>
            </div>
          </div>

          <div className="pt-4">
            <a
              href={project.robloxLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700/50 border border-slate-600 text-slate-200 font-medium rounded-lg hover:bg-slate-600/50 hover:border-slate-500 transition-all"
            >
              View on Roblox
            </a>
          </div>

          {/* Description */}
          <div>
            <p className="text-slate-300 leading-relaxed">{project.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
