interface ExperienceCardProps {
  company: string
  role: string
  period: string
  alignment: 'left' | 'right'
}

export function ExperienceCard({ company, role, period, alignment }: ExperienceCardProps) {
  const isLeft = alignment === 'left'
  const accentColor = isLeft ? 'blue' : 'purple'

  return (
    <div className={`flex flex-col md:flex-row ${isLeft ? 'md:justify-start' : 'md:justify-end'} border-slate-50`}>
      <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 mx-4 md:w-1/2 hover:border-${accentColor}-500/50 transition-colors`}>
        <h3 className="text-2xl font-semibold text-white mb-2">{company}</h3>
        <p className={`text-lg text-${accentColor}-400 mb-2`}>{role}</p>
        <p className="text-slate-400">{period}</p>
      </div>
    </div>
  )
}
