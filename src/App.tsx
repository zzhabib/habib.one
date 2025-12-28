import { Scene3D } from './components/Scene3D'

function App() {
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
      </div>
    </div>
  )
}

export default App
