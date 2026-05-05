import { useNavigate } from 'react-router-dom'

interface ProjectCardProps {
  slug: string
  thumbnail: string
  title: string
  playcount: string
}

export function ProjectCard({ slug, thumbnail, title, playcount }: ProjectCardProps) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/${slug}`)}
      className="flex cursor-pointer group border-b border-slate-700/30 last:border-b-0 hover:bg-slate-800/30 transition-colors duration-200"
    >
      <div className="w-2/5 shrink-0 bg-slate-900/60 overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-slate-600 text-5xl font-bold select-none">{title[0]}</span>
          </div>
        )}
      </div>

      <div className="flex-1 px-8 py-7 flex flex-col justify-center gap-1.5">
        <h3 className="text-base font-medium text-slate-100">{title}</h3>
        <p className="text-emerald-400 text-sm">{playcount}</p>
      </div>
    </div>
  )
}
