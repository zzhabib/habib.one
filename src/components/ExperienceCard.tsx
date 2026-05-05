interface ExperienceCardProps {
  company: string
  role: string
  period: string
}

export function ExperienceCard({ company, role, period }: ExperienceCardProps) {
  return (
    <div className="flex items-center justify-between py-5 border-b border-slate-700/30 last:border-b-0">
      <div>
        <p className="text-slate-200 font-medium text-sm">{company}</p>
        <p className="text-slate-500 text-sm mt-0.5">{role}</p>
      </div>
      <p className="text-slate-600 text-sm shrink-0 ml-8">{period}</p>
    </div>
  )
}
