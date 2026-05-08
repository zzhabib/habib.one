import * as THREE from 'three'
import { auroraVertexShader, auroraFragmentShader } from './shaders'
import { buildMountainMesh } from './mountain'

export class AuroraSceneGL {
  private renderer: THREE.WebGLRenderer
  private scene:    THREE.Scene
  private camera:   THREE.PerspectiveCamera
  private uniforms: {
    uTime:         { value: number }
    uResolution:   { value: THREE.Vector2 }
    uScrollOffset: { value: number }
  }
  private quadGeo:  THREE.BufferGeometry
  private quadMat:  THREE.ShaderMaterial
  private mountain: THREE.Mesh
  private raf = 0
  private startTime    = performance.now()
  private targetScroll = 0
  private smoothScroll = 0

  constructor(el: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'low-power' })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    el.appendChild(this.renderer.domElement)

    this.scene  = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      35, window.innerWidth / window.innerHeight, 0.1, 400
    )
    this.camera.position.set(0, 4, 10)
    this.camera.lookAt(0, 7.5, -20)

    // ── Aurora: fullscreen background quad ───────────────────────────────────
    // The vertex shader outputs clip-space coords directly (no MVP), so the quad
    // always covers the full screen regardless of the perspective camera.
    // depthWrite/depthTest off + renderOrder -1 ensures it draws behind everything.
    this.uniforms = {
      uTime:         { value: 0.0 },
      uResolution:   { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uScrollOffset: { value: 0.0 },
    }
    this.quadGeo = new THREE.PlaneGeometry(2, 2)
    this.quadMat = new THREE.ShaderMaterial({
      vertexShader:   auroraVertexShader,
      fragmentShader: auroraFragmentShader,
      uniforms:       this.uniforms,
      depthWrite: false,
      depthTest:  false,
    })
    const auroraQuad = new THREE.Mesh(this.quadGeo, this.quadMat)
    auroraQuad.renderOrder   = -1
    auroraQuad.frustumCulled = false  // vertex shader ignores camera; bounding sphere check would incorrectly cull it
    this.scene.add(auroraQuad)

    // ── Mountains ────────────────────────────────────────────────────────────
    this.mountain = buildMountainMesh()
    this.scene.add(this.mountain)

    window.addEventListener('scroll', this.onScroll, { passive: true })
    window.addEventListener('resize', this.onResize)
    this.raf = requestAnimationFrame(this.animate)
  }

  dispose() {
    cancelAnimationFrame(this.raf)
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.onResize)
    this.renderer.dispose()
    this.quadMat.dispose()
    this.quadGeo.dispose()
    ;(this.mountain.material as THREE.ShaderMaterial).dispose()
    this.mountain.geometry.dispose()
    this.renderer.domElement.remove()
  }

  private animate = () => {
    this.raf = requestAnimationFrame(this.animate)
    this.smoothScroll += (this.targetScroll - this.smoothScroll) * 0.1
    this.uniforms.uTime.value = (performance.now() - this.startTime) / 1000

    // Projection shear — shift the frustum center up without rotating the camera.
    // Equivalent to the Roblox shiftCFrame trick: pose stays fixed, projection moves.
    this.camera.updateProjectionMatrix()
    this.camera.projectionMatrix.elements[9] = -this.smoothScroll * 0.6
    this.uniforms.uScrollOffset.value = -this.smoothScroll * 0.35

    this.renderer.render(this.scene, this.camera)
  }

  private onScroll = () => {
    const max = document.body.scrollHeight - window.innerHeight
    this.targetScroll = max > 0 ? window.scrollY / max : 0
  }

  private onResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }
}
