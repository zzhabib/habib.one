import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Auroras by nimitz 2017 (twitter: @stormoid)
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License
// Adapted for Three.js ShaderMaterial: uvec3 hash replaced with float equivalent,
// mouse replaced with fixed camera, iterations reduced to 40.

const vertexShader = /* glsl */ `
void main() {
  gl_Position = vec4(position, 1.0);
}
`

const fragmentShader = /* glsl */ `
precision mediump float;

uniform float uTime;
uniform vec2  uResolution;
uniform float uScrollOffset;

mat2 mm2(in float a) { float c = cos(a), s = sin(a); return mat2(c,s,-s,c); }
mat2 m2 = mat2(0.95534, 0.29552, -0.29552, 0.95534);

float tri(in float x) { return clamp(abs(fract(x) - 0.5), 0.01, 0.49); }
vec2 tri2(in vec2 p)  { return vec2(tri(p.x) + tri(p.y), tri(p.y + tri(p.x))); }

float triNoise2d(in vec2 p, float spd) {
  float z = 1.8, z2 = 2.5, rz = 0.;
  p *= mm2(p.x * 0.06);
  vec2 bp = p;
  for (float i = 0.; i < 5.; i++) {
    vec2 dg = tri2(bp * 1.85) * 0.75;
    dg *= mm2(uTime * spd);
    p  -= dg / z2;
    bp *= 1.3;
    z2 *= 0.45;
    z  *= 0.42;
    p  *= 1.21 + (rz - 1.0) * 0.02;
    rz += tri(p.x + tri(p.y)) * z;
    p  *= -m2;
  }
  return clamp(1.0 / pow(rz * 29., 1.3), 0., 0.55);
}

float hash21(in vec2 n) { return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }

vec4 aurora(vec3 ro, vec3 rd) {
  vec4 col    = vec4(0.);
  vec4 avgCol = vec4(0.);
  for (float i = 0.; i < 40.; i++) {
    float of  = 0.006 * hash21(gl_FragCoord.xy) * smoothstep(0., 15., i);
    float pt  = ((0.8 + pow(i, 1.4) * 0.002) - ro.y) / (rd.y * 2.0 + 0.4);
    pt -= of;
    vec3  bpos = ro + pt * rd;
    float rzt  = triNoise2d(bpos.zx, 0.12);
    vec4  col2 = vec4(0, 0, 0, rzt);
    col2.rgb   = (sin(1.0 - vec3(2.15, -0.5, 1.2) + i * 0.043) * 0.5 + 0.5) * rzt;
    avgCol     = mix(avgCol, col2, 0.5);
    col       += avgCol * exp2(-i * 0.065 - 2.5) * smoothstep(0., 5., i);
  }
  col *= clamp(rd.y * 15.0 + 0.4, 0., 1.);
  return col * 1.8;
}

vec3 hash33(vec3 p) {
  p  = fract(p * vec3(0.1031, 0.1030, 0.0973));
  p += dot(p, p.yxz + 33.33);
  return fract((p.xxy + p.yxx) * p.zyx);
}

vec3 stars(in vec3 p) {
  vec3  c   = vec3(0.);
  float res = uResolution.x;
  for (float i = 0.; i < 4.; i++) {
    vec3  q  = fract(p * (0.15 * res)) - 0.5;
    vec3  id = floor(p * (0.15 * res));
    vec2  rn = hash33(id).xy;
    float c2 = 1.0 - smoothstep(0., 0.6, length(q));
    c2 *= step(rn.x, 0.0005 + i * i * 0.001);
    c  += c2 * (mix(vec3(1.0, 0.49, 0.1), vec3(0.75, 0.9, 1.0), rn.y) * 0.1 + 0.9);
    p  *= 1.3;
  }
  return c * c * 0.8;
}

vec3 bg(in vec3 rd) {
  float sd = dot(normalize(vec3(-0.5, -0.6, 0.9)), rd) * 0.5 + 0.5;
  sd = pow(sd, 5.);
  return mix(vec3(0.05, 0.1, 0.2), vec3(0.1, 0.05, 0.2), sd) * 0.63;
}

void main() {
  vec2 q = gl_FragCoord.xy / uResolution.xy;
  vec2 p = q - 0.5;
  p.x *= uResolution.x / uResolution.y;
  p.y += uScrollOffset;

  vec3 ro = vec3(0.0, 0.0, -6.7);
  vec3 rd = normalize(vec3(p, 1.3));

  float fade = smoothstep(0., 0.01, abs(rd.y)) * 0.1 + 0.9;
  vec3  col  = bg(rd) * fade;

  vec4 aur = smoothstep(0., 1.5, aurora(ro, rd)) * fade;
  col += stars(rd);
  col  = col * (1.0 - aur.a) + aur.rgb;

  gl_FragColor = vec4(col, 1.0);
}
`

// ── Mountain terrain ────────────────────────────────────────────────────────
// Adapted from the user's original MountainPlane project.
// PlaneGeometry is rotated flat (−90° X), then each vertex's local Z is displaced
// upward to create terrain height. Local Y maps to world −Z (depth into scene).
function buildMountainMesh(): THREE.Group {
  // Low segment count → visible triangular facets (the low-poly look)
  const geo = new THREE.PlaneGeometry(60, 100, 30, 48)
  const pos = geo.attributes.position as THREE.BufferAttribute

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)   // −30 … +30  (world left/right)
    const y = pos.getY(i)   // −50 … +50  (maps to world depth after X rotation)

    // Multi-frequency height field — creates irregular peaks across the full width.
    // Math.max(0, h) floors valleys to flat ground so only peaks remain.
    const h =
      Math.sin(x * 0.14 + 0.5) * Math.cos(y * 0.07 - 0.3) * 3.8 +
      Math.sin(x * 0.26 - y * 0.11 + 1.2) * 1.6 +
      Math.sin(x * 0.48 + y * 0.19 - 0.8) * 0.7

    pos.setZ(i, Math.max(0, h))
  }
  pos.needsUpdate = true
  geo.computeVertexNormals()

  // Solid flat-shaded fill — dark navy silhouette
  const solidMat = new THREE.MeshPhongMaterial({
    color: 0x040b16,
    flatShading: true,
    shininess: 0,
    // Push solid faces back slightly so wireframe lines draw on top cleanly
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  })

  // Wireframe overlay — slightly lighter, shows the triangular low-poly structure
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x0e2235,
    wireframe: true,
  })

  const solid = new THREE.Mesh(geo, solidMat)
  const wire  = new THREE.Mesh(geo, wireMat)

  const group = new THREE.Group()
  group.add(solid)
  group.add(wire)
  group.rotation.x = -Math.PI / 2   // lay flat
  group.position.set(0, 0, -32)     // near edge ≈ z 18, far edge ≈ z −82

  return group
}

export function AuroraScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(window.innerWidth, window.innerHeight)
    el.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      35, window.innerWidth / window.innerHeight, 0.1, 400
    )
    camera.position.set(0, 4, 10)
    camera.lookAt(0, 7.5, -20)

    // ── Aurora: fullscreen background quad ───────────────────────────────────
    // The vertex shader outputs clip-space coords directly (no MVP), so the quad
    // always covers the full screen regardless of the perspective camera.
    // depthWrite/depthTest off + renderOrder -1 ensures it draws behind everything.
    const uniforms = {
      uTime:         { value: 0.0 },
      uResolution:   { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uScrollOffset: { value: 0.0 },
    }
    const quadGeo = new THREE.PlaneGeometry(2, 2)
    const quadMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest:  false,
    })
    const auroraQuad = new THREE.Mesh(quadGeo, quadMat)
    auroraQuad.renderOrder = -1
    auroraQuad.frustumCulled = false  // vertex shader ignores camera; bounding sphere check would incorrectly cull it
    scene.add(auroraQuad)

    // ── Mountains ────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x06131e, 5.0))
    const dirLight = new THREE.DirectionalLight(0x3fffe0, 0.7)
    dirLight.position.set(1, 2, -1)
    scene.add(dirLight)
    scene.add(buildMountainMesh())

    // ── Render loop ──────────────────────────────────────────────────────────
    const startTime = performance.now()
    let raf: number
    let targetScroll = 0
    let smoothScroll = 0

    function animate() {
      raf = requestAnimationFrame(animate)
      smoothScroll += (targetScroll - smoothScroll) * 0.1
      uniforms.uTime.value = (performance.now() - startTime) / 1000

      // Projection shear — shift the frustum center up without rotating the camera.
      // Equivalent to the Roblox shiftCFrame trick: pose stays fixed, projection moves.
      camera.updateProjectionMatrix()
      camera.projectionMatrix.elements[9] = -smoothScroll * 0.6
      uniforms.uScrollOffset.value = -smoothScroll * 0.35

      renderer.render(scene, camera)
    }
    animate()

    function onScroll() {
      const max = document.body.scrollHeight - window.innerHeight
      targetScroll = max > 0 ? window.scrollY / max : 0
    }

    function onResize() {
      renderer.setSize(window.innerWidth, window.innerHeight)
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      quadMat.dispose()
      quadGeo.dispose()
      el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />
}
