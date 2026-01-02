import { useLocation, useNavigate } from 'react-router-dom'
import { Scene3D } from './components/Scene3D'
import { ExperienceCard } from './components/ExperienceCard'
import { ProjectCard } from './components/ProjectCard'
import { ProjectModal } from './components/ProjectModal'
import { projectsData } from './data/projects'

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  // Extract slug from pathname and find matching project
  const currentSlug = location.pathname.slice(1) // Remove leading "/"
  const currentProject = projectsData.find(p => p.slug === currentSlug)

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* 3D Background */}
      <Scene3D />

      {/* Content Layer */}
      <div className="relative z-10">
        <section className="min-h-screen flex flex-col items-center justify-center px-4">
          <div>
            <p className="text-lg text-slate-300 self-start">Hi, I'm</p>
            <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Zachary Habib
            </h1>
            <p className="text-xl md:text-2xl text-slate-300">Software Engineer</p>
          </div>
        </section>

        {/* Experiences Section */}
        <section className="flex flex-col items-center justify-center px-4 py-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Experience
          </h2>

          <div className="max-w-4xl w-full">
            <ExperienceCard
              company="CME Group"
              role="Platform Engineer II"
              period="Sep 2024 - Present"
              alignment="left"
            />

            <ExperienceCard
              company="CME Group"
              role="Software Engineer Intern"
              period="May 2024 - Aug 2024"
              alignment="right"
            />

            <ExperienceCard
              company="Garmin"
              role="Software Engineer Intern"
              period="Jan 2023 - Aug 2023"
              alignment="left"
            />

            <ExperienceCard
              company="Arizona State University"
              role="XR Developer"
              period="May 2021 - April 2022"
              alignment="right"
            />
          </div>
        </section>

        {/* Projects Section */}
        <section className="flex flex-col items-center justify-center px-4 py-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Projects
          </h2>

          <div className="max-w-4xl w-full space-y-12">
            {projectsData.map((project) => (
              <ProjectCard
                key={project.slug}
                slug={project.slug}
                thumbnail={project.thumbnail}
                title={project.title}
                playcount={project.playcount}
                alignment={project.alignment}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Conditional Project Modal */}
      {currentProject && (
        <ProjectModal
          project={currentProject}
          onClose={() => navigate('/')}
        />
      )}
    </div>
  )
}

export default App
