import * as THREE from 'three'
import { mountainVertexShader, mountainFragmentShader } from './shaders'

// Non-indexed geometry is required so each triangle vertex gets unique
// barycentric coordinates — shared vertices in indexed geometry would alias
// and break the per-triangle edge detection in the fragment shader.
export function buildMountainMesh(): THREE.Mesh {
  const geo = new THREE.PlaneGeometry(60, 100, 30, 48).toNonIndexed()

  const count = geo.attributes.position.count
  const bary  = new Float32Array(count * 3)
  for (let i = 0; i < count; i += 3) {
    bary.set([1, 0, 0], i * 3)
    bary.set([0, 1, 0], (i + 1) * 3)
    bary.set([0, 0, 1], (i + 2) * 3)
  }
  geo.setAttribute('barycentric', new THREE.BufferAttribute(bary, 3))

  const mat  = new THREE.ShaderMaterial({
    vertexShader:   mountainVertexShader,
    fragmentShader: mountainFragmentShader,
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.rotation.x = -Math.PI / 2
  mesh.position.set(0, 0, -32)
  return mesh
}
