import { useLocation, useNavigate } from 'react-router-dom'
import { AuroraScene } from './components/AuroraScene'
import { ExperienceCard } from './components/ExperienceCard'
import { ProjectCard } from './components/ProjectCard'
import { ProjectModal } from './components/ProjectModal'
import { projectsData } from './data/projects'
import { useLanguage } from './context/LanguageContext'
import { cn } from './lib/utils'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const { lang, setLang, t } = useLanguage()

  const currentSlug = location.pathname.slice(1)
  const currentProject = projectsData.find(p => p.slug === currentSlug)
  const currentEntry = currentSlug ? t.projects.entries[currentSlug as keyof typeof t.projects.entries] : null
  const currentLinkLabel = currentProject?.linkType === 'roblox' ? t.projects.viewRoblox : t.projects.viewProject

  return (
    <div className="min-h-screen text-slate-100 relative flex flex-col items-center">

      {/* Fixed aurora background */}
      <AuroraScene />

      {/* Language toggle */}
      <div className="fixed top-4 right-4 z-50 flex gap-1 bg-slate-950/60 backdrop-blur-md border border-slate-700/40 rounded-lg p-1">
        <button
          onClick={() => setLang('en')}
          className={cn(
            'px-3 py-1 text-sm rounded-md transition-colors',
            lang === 'en' ? 'bg-emerald-500 text-slate-950 font-medium' : 'text-slate-400 hover:text-slate-100'
          )}
        >
          EN
        </button>
        <button
          onClick={() => setLang('ja')}
          className={cn(
            'px-3 py-1 text-sm rounded-md transition-colors',
            lang === 'ja' ? 'bg-emerald-500 text-slate-950 font-medium' : 'text-slate-400 hover:text-slate-100'
          )}
        >
          JP
        </button>
      </div>

      {/* Scrollable content above the aurora */}
      <div className="relative z-10 w-full max-w-4xl px-8 md:px-12">

        {/* Hero — transparent, text floats directly over the aurora */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center">
          <p className="text-emerald-400 text-xs tracking-widest uppercase mb-4">{t.hero.greeting}</p>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight text-slate-50">
            Zachary Habib
          </h1>
          <p className="text-xl text-slate-300 mb-3">{t.hero.title}</p>
          <p className="text-slate-400 text-sm mb-1">{t.hero.tagline1}</p>
          <p className="text-slate-400 text-sm mb-12">{t.hero.tagline2}</p>
          <div className="flex gap-6 justify-center">
            <a href="mailto:zach.habib16@gmail.com" className="text-slate-500 hover:text-emerald-400 transition-colors text-sm">
              {t.contact.email}
            </a>
            <a href="https://github.com/zzhabib" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-400 transition-colors text-sm">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/zachary-habib" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-400 transition-colors text-sm">
              LinkedIn
            </a>
          </div>
        </section>

        {/* Projects */}
        <section className="py-24">
          <p className="text-emerald-400 text-xs tracking-widest uppercase mb-8 text-center">{t.sections.projects}</p>
          <div className="border-t border-slate-700/30 rounded-xl overflow-hidden backdrop-blur-md bg-slate-950/40">
            {projectsData.map((project) => {
              const entry = t.projects.entries[project.slug as keyof typeof t.projects.entries]
              if (!entry) return null
              return (
                <ProjectCard
                  key={project.slug}
                  slug={project.slug}
                  thumbnail={project.thumbnail}
                  title={entry.title}
                  playcount={entry.playcount}
                />
              )
            })}
          </div>
        </section>

        {/* Experience */}
        <section className="py-24">
          <p className="text-emerald-400 text-xs tracking-widest uppercase mb-8 text-center">{t.sections.experience}</p>
          <div className="border-t border-slate-700/30 rounded-xl overflow-hidden backdrop-blur-md bg-slate-950/40 px-6">
            {t.experience.entries.map((entry, i) => (
              <ExperienceCard
                key={i}
                company={entry.company}
                role={entry.role}
                period={entry.period}
              />
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="py-24 flex flex-col items-center text-center">
          <p className="text-emerald-400 text-xs tracking-widest uppercase mb-8">{t.sections.contact}</p>
          <p className="text-slate-400 text-sm mb-8">{t.contact.header}</p>
          <div className="flex gap-8 justify-center">
            <a href="mailto:zach.habib16@gmail.com" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm">
              {t.contact.email}
            </a>
            <a href="https://github.com/zzhabib" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm">
              {t.contact.github}
            </a>
            <a href="https://www.linkedin.com/in/zachary-habib" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-emerald-400 transition-colors text-sm">
              {t.contact.linkedin}
            </a>
          </div>
        </section>

      </div>

      {currentProject && currentEntry && (
        <ProjectModal
          project={currentProject}
          entry={currentEntry}
          linkLabel={currentLinkLabel}
          open={!!currentProject}
          onClose={() => navigate('/')}
        />
      )}
    </div>
  )
}

export default App
