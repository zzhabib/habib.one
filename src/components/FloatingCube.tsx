import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

export function FloatingCube() {
  const meshRef = useRef<Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    // Slow rotation animation
    meshRef.current.rotation.x += delta * 0.2
    meshRef.current.rotation.y += delta * 0.3

    // Gentle vertical floating motion
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
  })

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color={hovered ? '#8b5cf6' : '#3b82f6'}
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
  )
}
