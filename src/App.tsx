import { useEffect, useState } from 'react'
import { Mail } from 'lucide-react'

const GithubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)
import { AuroraScene } from './components/AuroraScene'
import { ExperienceCard } from './components/ExperienceCard'
import { ProjectCard } from './components/ProjectCard'
import { projectsData, projectChipColors, displayProjectSlugs } from './data/projects'
import { useLanguage } from './context/LanguageContext'
import { cn } from './lib/utils'

function useScrollReveal() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .forEach((entry, i) => {
            const el = entry.target as HTMLElement
            el.style.transitionDelay = `${i * 60}ms`
            el.classList.add('visible')
            observer.unobserve(entry.target)
          })
      },
      { threshold: 0.12 },
    )
    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function Nav() {
  const { lang, setLang } = useLanguage()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-[18px]',
        'transition-all duration-300',
        scrolled && 'bg-slate-950/85 backdrop-blur-xl border-b border-white/[0.06]',
      )}
    >
      <a href="#" className="font-mono text-[13px] text-white/92 tracking-[0.02em]">
        habib<span className="text-emerald-400">.one</span>
      </a>
      <div className="flex gap-[2px] bg-white/5 border border-white/8 rounded-[6px] p-[2px]">
        <button
          onClick={() => setLang('en')}
          className={cn(
            'font-mono text-[11px] px-[9px] py-[3px] rounded-[4px] transition-all duration-150 tracking-[0.05em]',
            lang === 'en' ? 'bg-emerald-400/[0.18] text-emerald-400' : 'text-white/30 hover:text-white/60',
          )}
        >
          EN
        </button>
        <button
          onClick={() => setLang('ja')}
          className={cn(
            'font-mono text-[11px] px-[9px] py-[3px] rounded-[4px] transition-all duration-150 tracking-[0.05em]',
            lang === 'ja' ? 'bg-emerald-400/[0.18] text-emerald-400' : 'text-white/30 hover:text-white/60',
          )}
        >
          JP
        </button>
      </div>
    </nav>
  )
}

function SectionEyebrow({ label, centered = false }: { label: string; centered?: boolean }) {
  return (
    <p
      className={cn(
        'reveal font-mono text-[11px] tracking-[0.18em] uppercase text-emerald-400 mb-3 flex items-center gap-3',
        centered && 'justify-center',
      )}
    >
      {label}
      <span className="block h-px w-10 bg-emerald-400/40" />
    </p>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-3 px-5 py-4 bg-white/[0.03] border border-white/8 rounded-xl">
      <span className="font-mono text-3xl font-bold text-emerald-400 leading-none">{value}</span>
      <span className="text-sm text-white/55 leading-snug">{label}</span>
    </div>
  )
}

function Divider() {
  return <div className="relative z-10 h-px bg-white/8" />
}

function App() {
  useScrollReveal()

  const { t } = useLanguage()

  return (
    <div className="min-h-screen text-white/92 overflow-x-hidden">
      <AuroraScene />
      <Nav />

      {/* ── Hero ── */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
        <p
          className="font-mono text-[12px] tracking-[0.2em] uppercase text-emerald-400 mb-5"
          style={{ animation: 'fadeUp 800ms cubic-bezier(0.16,1,0.3,1) 200ms both' }}
        >
          {t.hero.greeting}
        </p>
        <h1
          className="text-5xl md:text-6xl font-bold tracking-[-0.03em] text-white/92 leading-none"
          style={{ animation: 'fadeUp 900ms cubic-bezier(0.16,1,0.3,1) 350ms both' }}
        >
          Zachary Habib
        </h1>
        <p
          className="flex flex-wrap justify-center items-center gap-y-1 text-xl font-light text-white/55 mt-4"
          style={{ animation: 'fadeUp 900ms cubic-bezier(0.16,1,0.3,1) 500ms both' }}
        >
          {t.hero.title.split('・').map((part, i, arr) => (
            <span key={i} className="whitespace-nowrap">
              {part.trim()}
              {i < arr.length - 1 && <span className="opacity-40 mx-2">・</span>}
            </span>
          ))}
        </p>
        <div
          className="flex gap-6 mt-9"
          style={{ animation: 'fadeUp 900ms cubic-bezier(0.16,1,0.3,1) 750ms both' }}
        >
          <a
            href="mailto:zach.habib16@gmail.com"
            className="font-mono text-[12px] tracking-[0.08em] uppercase text-white/30 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <Mail size={13} />
            Email
          </a>
          <a
            href="https://github.com/zzhabib"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[12px] tracking-[0.08em] uppercase text-white/30 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <GithubIcon />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/zachary-habib"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[12px] tracking-[0.08em] uppercase text-white/30 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <LinkedinIcon />
            LinkedIn
          </a>
        </div>
        <div
          className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ animation: 'fadeUp 900ms cubic-bezier(0.16,1,0.3,1) 1000ms both' }}
        >
          <div className="w-px h-10 bg-linear-to-b from-transparent to-emerald-400 pulse-line" />
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/20">Scroll</span>
        </div>
      </section>

      {/* ── Main content ── */}
      <div className="relative z-10">

        {/* About */}
        <section id="about" className="max-w-4xl mx-auto px-5 md:px-12 py-16 md:py-24">
          <SectionEyebrow label={t.sections.about} />
          <h2 className="reveal text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.02em] text-white/92 mb-12 leading-[1.1]">
            {t.about.title}
          </h2>
          <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
            <div className="text-base leading-[1.75] text-white/55">
              <p>{t.about.p1}</p>
            </div>
            <div className="flex flex-col gap-4">
              <StatCard value="N2" label={t.about.statN2} />
              <StatCard value="40M+" label={t.about.stat40m} />
              <StatCard value="MCS" label={t.about.statMCS} />
            </div>
          </div>
        </section>

        <Divider />

        {/* Projects */}
        <section id="projects" className="max-w-4xl mx-auto px-5 md:px-12 py-16 md:py-24">
          <SectionEyebrow label={t.sections.projects} />
          <h2 className="reveal text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.02em] text-white/92 mb-12 leading-[1.1]">
            {t.projects.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {displayProjectSlugs.map((slug) => {
              const project = projectsData.find((p) => p.slug === slug)
              const entry = t.projects.entries[slug as keyof typeof t.projects.entries]
              if (!project || !entry) return null
              const linkLabel =
                project.linkType === 'roblox' ? t.projects.viewRoblox : t.projects.viewProject
              return (
                <div key={slug} className={cn('reveal', project.featured && 'md:col-span-2')}>
                  <ProjectCard
                    link={project.link}
                    thumbnail={project.thumbnail}
                    title={entry.title}
                    eyebrow={entry.eyebrow}
                    description={entry.description}
                    chips={entry.chips}
                    linkLabel={linkLabel}
                    featured={project.featured}
                    chipColors={projectChipColors[slug]}
                    playcount={project.linkType === 'roblox' ? entry.playcount : undefined}
                  />
                </div>
              )
            })}
          </div>
        </section>

        <Divider />

        {/* Experience */}
        <section id="experience" className="max-w-4xl mx-auto px-5 md:px-12 py-16 md:py-24">
          <SectionEyebrow label={t.sections.experience} />
          <h2 className="reveal text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.02em] text-white/92 mb-12 leading-[1.1]">
            {t.experience.title}
          </h2>
          <div className="flex flex-col gap-4">
            {t.experience.entries.map((entry, i) => (
              <ExperienceCard
                key={i}
                company={entry.company}
                dateLabel={entry.dateLabel}
                period={entry.period}
                roles={entry.roles}
              />
            ))}
          </div>
        </section>

        <Divider />

        {/* Skills */}
        <section id="skills" className="max-w-4xl mx-auto px-5 md:px-12 py-16 md:py-24">
          <SectionEyebrow label={t.sections.skills} />
          <h2 className="reveal text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.02em] text-white/92 mb-12 leading-[1.1]">
            {t.skills.title}
          </h2>
          <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.skills.groups.map((group) => (
              <div key={group.label}>
                <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/30 mb-3">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.chips.map((chip) => {
                    const isGreen = chip === 'JLPT N2' || chip === '日本語 N2'
                    return (
                      <span
                        key={chip}
                        className={cn(
                          'font-mono text-[11px] px-3 py-1.5 rounded-full border transition-all duration-200 cursor-default',
                          isGreen
                            ? 'border-emerald-400/40 text-emerald-400'
                            : 'border-white/8 text-white/55 hover:border-emerald-400/50 hover:text-emerald-400 hover:shadow-[0_0_12px_oklch(0.72_0.22_155/0.15)]',
                        )}
                      >
                        {chip}
                      </span>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Contact */}
        <section id="contact" className="max-w-4xl mx-auto px-5 md:px-12 py-16 md:py-24">
          <div className="max-w-lg mx-auto text-center">
            <SectionEyebrow label={t.sections.contact} centered />
            <h2 className="reveal text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.02em] text-white/92 mb-6 leading-[1.1]">
              {t.contact.title}
            </h2>
            <p className="reveal text-[15px] leading-[1.7] text-white/55 mb-10">{t.contact.body}</p>
            <div className="reveal flex justify-center gap-4 flex-wrap">
              <a
                href="mailto:zach.habib16@gmail.com"
                className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.08em] uppercase px-5 py-3 rounded-lg bg-emerald-400 text-slate-950 font-medium hover:shadow-[0_0_28px_oklch(0.72_0.22_155/0.45)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <Mail size={13} />
                {t.contact.email}
              </a>
              <a
                href="https://www.linkedin.com/in/zachary-habib"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.08em] uppercase px-5 py-3 rounded-lg border border-white/8 text-white/55 hover:border-white/16 hover:text-white/92 hover:-translate-y-0.5 transition-all duration-300"
              >
                <LinkedinIcon />
                {t.contact.linkedin}
              </a>
              <a
                href="https://github.com/zzhabib"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.08em] uppercase px-5 py-3 rounded-lg border border-white/8 text-white/55 hover:border-white/16 hover:text-white/92 hover:-translate-y-0.5 transition-all duration-300"
              >
                <GithubIcon />
                {t.contact.github}
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* ── Footer ── */}
      <footer className="relative z-10 text-center py-8 px-12 border-t border-white/[0.06] font-mono text-[11px] text-white/20 tracking-[0.08em]">
        © 2026 Zachary Z. Habib · Aurora shader by <a href="https://www.shadertoy.com/view/XtGGRt" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/40 transition-colors">nimitz</a>
      </footer>

    </div>
  )
}

export default App
