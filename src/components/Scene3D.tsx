import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { FloatingCube } from './FloatingCube'

export function Scene3D() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

        {/* 3D Objects */}
        <FloatingCube />

        {/* Controls - allows rotation but not zoom/pan */}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
