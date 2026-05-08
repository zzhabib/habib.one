import { cn } from '../lib/utils'

interface ProjectCardProps {
  link: string
  thumbnail: string
  title: string
  eyebrow: string
  description: string
  chips: string[]
  linkLabel: string
  featured?: boolean
  chipColors?: Record<string, 'green' | 'cyan'>
  playcount?: string
}

const chipColorMap = {
  green: 'border-emerald-400/45 text-emerald-400',
  cyan: 'border-cyan-400/45 text-cyan-400',
  default: 'border-white/8 text-white/30',
}

export function ProjectCard({
  link,
  thumbnail,
  title,
  eyebrow,
  description,
  chips,
  linkLabel,
  featured,
  chipColors = {},
  playcount,
}: ProjectCardProps) {
  const content = (
    <div className="flex flex-col">
      <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/30 mb-1.5">{eyebrow}</p>
      <div className="flex items-baseline gap-2.5 mb-2">
        <h3 className="text-lg font-medium text-white/92 leading-snug">{title}</h3>
        {playcount && (
          <span className="ml-auto font-mono text-[10px] text-emerald-400">
            {playcount}
          </span>
        )}
      </div>
      <p className="text-[14px] leading-[1.65] text-white/55 flex-1">{description}</p>
      <div className="flex gap-1.5 flex-wrap mt-3">
        {chips.map((chip) => {
          const color = chipColors[chip] ?? 'default'
          return (
            <span
              key={chip}
              className={cn('font-mono text-[10px] px-2.25 py-0.75 rounded-full border', chipColorMap[color])}
            >
              {chip}
            </span>
          )
        })}
      </div>
      <p className="font-mono text-[11px] text-emerald-400 mt-3 opacity-70 group-hover:opacity-100 transition-opacity">
        {linkLabel}
      </p>
    </div>
  )

  const imageSlot = (
    <div className="aspect-video rounded-xl border border-white/8 overflow-hidden">
      {thumbnail ? (
        <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center font-mono text-[10px] text-white/20 tracking-wider"
          style={{
            background:
              'repeating-linear-gradient(45deg,rgba(255,255,255,0.02) 0px,rgba(255,255,255,0.02) 1px,transparent 1px,transparent 12px)',
          }}
        >
          {title}
        </div>
      )}
    </div>
  )

  return (
    <div
      onClick={() => window.open(link, '_blank', 'noopener,noreferrer')}
      className={cn(
        'group bg-white/[0.035] backdrop-blur-md border border-white/8 rounded-2xl p-7 cursor-pointer',
        'hover:border-emerald-400/35 hover:shadow-[0_0_32px_oklch(0.72_0.22_155/0.12)] hover:-translate-y-0.75',
        'transition-all duration-300',
        featured ? 'grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center' : 'flex flex-col',
      )}
    >
      {content}
      {featured && imageSlot}
    </div>
  )
}
