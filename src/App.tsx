import { useEffect, useState } from 'react'
import { Mail } from 'lucide-react'

const GithubIcon = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const LinkedinIcon = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
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
            'font-mono text-[12px] px-[9px] py-[3px] rounded-[4px] transition-all duration-150 tracking-[0.05em]',
            lang === 'en' ? 'bg-emerald-400/[0.18] text-emerald-400' : 'text-white/45 hover:text-white/75',
          )}
        >
          EN
        </button>
        <button
          onClick={() => setLang('ja')}
          className={cn(
            'font-mono text-[12px] px-[9px] py-[3px] rounded-[4px] transition-all duration-150 tracking-[0.05em]',
            lang === 'ja' ? 'bg-emerald-400/[0.18] text-emerald-400' : 'text-white/45 hover:text-white/75',
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
        'reveal font-mono text-[12px] tracking-[0.18em] uppercase text-emerald-400 mb-3 flex items-center gap-3',
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
    <div className="px-5 py-4 bg-white/3 border border-white/8 rounded-xl">
      <span className="font-mono text-3xl font-bold text-emerald-400 leading-none block mb-1">{value}</span>
      <span className="text-sm text-white/75 leading-snug">{label}</span>
    </div>
  )
}

function Divider() {
  return <div className="relative z-10 h-px bg-white/14" />
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
          className="font-mono text-[15px] tracking-[0.2em] uppercase text-emerald-400 mb-5"
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
          className="flex flex-wrap justify-center items-center gap-y-1 text-xl font-normal text-white/78 mt-4"
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
          className="flex gap-2 mt-9"
          style={{ animation: 'fadeUp 900ms cubic-bezier(0.16,1,0.3,1) 750ms both' }}
        >
          <a
            href="mailto:zach.habib16@gmail.com"
            aria-label="Email"
            className="inline-flex items-center p-3 rounded-xl backdrop-blur-md bg-white/4.5 border border-emerald-400/35 text-emerald-400 hover:bg-white/8 hover:border-emerald-400/65 hover:shadow-[0_0_20px_oklch(0.72_0.22_155/0.28)] transition-all duration-200"
          >
            <Mail size={17} />
          </a>
          <a
            href="https://github.com/zzhabib"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex items-center p-3 rounded-xl backdrop-blur-md bg-white/4.5 border border-emerald-400/35 text-emerald-400 hover:bg-white/8 hover:border-emerald-400/65 hover:shadow-[0_0_20px_oklch(0.72_0.22_155/0.28)] transition-all duration-200"
          >
            <GithubIcon size={17} />
          </a>
          <a
            href="https://www.linkedin.com/in/zachary-habib"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center p-3 rounded-xl backdrop-blur-md bg-white/4.5 border border-emerald-400/35 text-emerald-400 hover:bg-white/8 hover:border-emerald-400/65 hover:shadow-[0_0_20px_oklch(0.72_0.22_155/0.28)] transition-all duration-200"
          >
            <LinkedinIcon size={17} />
          </a>
        </div>
        <div
          className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ animation: 'fadeUp 900ms cubic-bezier(0.16,1,0.3,1) 1000ms both' }}
        >
          <div className="w-px h-10 bg-linear-to-b from-transparent to-emerald-400 pulse-line" />
          <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-white/45">Scroll</span>
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
          <div className="reveal bg-white/4.5 backdrop-blur-md border border-white/14 rounded-2xl p-7 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="text-base leading-[1.75] text-white/78">
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
          <div className="reveal bg-white/4.5 backdrop-blur-md border border-white/14 rounded-2xl p-7 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.skills.groups.map((group) => (
              <div key={group.label}>
                <p className="font-mono text-[12px] tracking-[0.14em] uppercase text-white/55 mb-3">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.chips.map((chip) => {
                    const isGreen = chip === 'JLPT N2' || chip === '日本語 N2'
                    return (
                      <span
                        key={chip}
                        className={cn(
                          'font-mono text-[13px] px-3 py-1.5 rounded-full border transition-all duration-200 cursor-default',
                          isGreen
                            ? 'border-emerald-400/60 text-emerald-400'
                            : 'border-white/18 text-white/75 hover:border-emerald-400/50 hover:text-emerald-400 hover:shadow-[0_0_12px_oklch(0.72_0.22_155/0.15)]',
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
            <p className="reveal text-[15px] leading-[1.7] text-white/78 mb-10">{t.contact.body}</p>
            <div className="reveal flex justify-center gap-4 flex-wrap">
              <a
                href="mailto:zach.habib16@gmail.com"
                className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.08em] uppercase px-5 py-3 rounded-xl backdrop-blur-md bg-emerald-400/12 border border-emerald-400/35 text-emerald-400 hover:bg-emerald-400/22 hover:border-emerald-400/65 hover:shadow-[0_0_20px_oklch(0.72_0.22_155/0.28)] transition-all duration-200"
              >
                <Mail size={15} />
                {t.contact.email}
              </a>
              <a
                href="https://www.linkedin.com/in/zachary-habib"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.08em] uppercase px-5 py-3 rounded-xl backdrop-blur-md bg-emerald-400/12 border border-emerald-400/35 text-emerald-400 hover:bg-emerald-400/22 hover:border-emerald-400/65 hover:shadow-[0_0_20px_oklch(0.72_0.22_155/0.28)] transition-all duration-200"
              >
                <LinkedinIcon size={15} />
                {t.contact.linkedin}
              </a>
              <a
                href="https://github.com/zzhabib"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.08em] uppercase px-5 py-3 rounded-xl backdrop-blur-md bg-emerald-400/12 border border-emerald-400/35 text-emerald-400 hover:bg-emerald-400/22 hover:border-emerald-400/65 hover:shadow-[0_0_20px_oklch(0.72_0.22_155/0.28)] transition-all duration-200"
              >
                <GithubIcon size={15} />
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
