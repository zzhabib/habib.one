import { useNavigate } from 'react-router-dom'

interface ProjectCardProps {
  slug: string
  thumbnail: string
  title: string
  playcount: string
  alignment: 'left' | 'right'
}

export function ProjectCard({ slug, thumbnail, title, playcount, alignment }: ProjectCardProps) {
  const navigate = useNavigate()
  const isLeft = alignment === 'left'

  const handleClick = () => {
    navigate(`/${slug}`)
  }

  return (
    <div className={`flex flex-col md:flex-row ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
      <div
        onClick={handleClick}
        className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg overflow-hidden mx-4 md:w-1/2 cursor-pointer transition-all hover:scale-[1.02] ${isLeft ? 'hover:border-blue-500/50' : 'hover:border-purple-500/50'}`}
      >
        <div className="relative aspect-video bg-slate-700">
          <img
            src={thumbnail}
            alt={`${title} - ${playcount}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-900/50 to-slate-900">
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
              <p className={`text-lg ${isLeft ? 'text-blue-400' : 'text-purple-400'}`}>{playcount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
