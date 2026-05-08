import { cn } from '../lib/utils'

interface RoleBlock {
  role: string
  period?: string
  description: string
  chips: string[]
}

interface ExperienceCardProps {
  company: string
  dateLabel: string
  period: string
  roles: RoleBlock[]
}

export function ExperienceCard({ company, dateLabel, period, roles }: ExperienceCardProps) {
  const isMultiRole = roles.length > 1

  return (
    <div
      className="reveal grid gap-8 p-7 border border-white/8 rounded-2xl bg-white/[0.035] backdrop-blur-lg transition-all duration-300 hover:border-white/16 hover:shadow-[0_0_28px_rgba(0,0,0,0.18)]"
      style={{ gridTemplateColumns: '160px 1fr' }}
    >
      <div className="font-mono text-[11px] text-white/30 leading-relaxed pt-1">
        <span className="block font-mono text-[10px] tracking-widest uppercase text-emerald-400 mb-1">
          {dateLabel}
        </span>
        {period}
      </div>
      <div>
        <div className="text-[18px] font-semibold text-white/92 mb-0.5">{company}</div>
        {isMultiRole ? (
          <div className="flex flex-col">
            {roles.map((r, i) => (
              <div key={i} className={cn('flex flex-col', i > 0 && 'mt-5 pt-5 border-t border-white/8')}>
                <div className="text-[13px] text-white/55 mb-2">{r.role}</div>
                {r.period && (
                  <div className="font-mono text-[10px] text-white/30 tracking-[0.06em] mb-2">{r.period}</div>
                )}
                <p className="text-[13px] leading-[1.7] text-white/55">{r.description}</p>
                <div className="flex gap-1.5 flex-wrap mt-3.5">
                  {r.chips.map((chip) => (
                    <span
                      key={chip}
                      className="font-mono text-[10px] px-2.25 py-0.75 rounded-full border border-white/8 text-white/30"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="text-[13px] text-white/55 mb-3">{roles[0].role}</div>
            <p className="text-[13px] leading-[1.7] text-white/55">{roles[0].description}</p>
            <div className="flex gap-1.5 flex-wrap mt-3.5">
              {roles[0].chips.map((chip) => (
                <span
                  key={chip}
                  className="font-mono text-[10px] px-2.25 py-0.75 rounded-full border border-white/8 text-white/30"
                >
                  {chip}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
