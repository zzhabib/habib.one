import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Auroras by nimitz 2017 (twitter: @stormoid)
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License
// Adapted for Three.js ShaderMaterial: uvec3 hash replaced with float equivalent,
// mouse replaced with fixed camera, iterations reduced to 40, mountains added as overlay.

const vertexShader = /* glsl */ `
void main() {
  gl_Position = vec4(position, 1.0);
}
`

const fragmentShader = /* glsl */ `
precision mediump float;

uniform float uTime;
uniform float uScroll;
uniform vec2  uResolution;

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
    float rzt  = triNoise2d(bpos.zx, 0.06);
    vec4  col2 = vec4(0, 0, 0, rzt);
    col2.rgb   = (sin(1.0 - vec3(2.15, -0.5, 1.2) + i * 0.043) * 0.5 + 0.5) * rzt;
    avgCol     = mix(avgCol, col2, 0.5);
    col       += avgCol * exp2(-i * 0.065 - 2.5) * smoothstep(0., 5., i);
  }
  col *= clamp(rd.y * 15.0 + 0.4, 0., 1.);
  return col * 1.8;
}

// Float-based hash33 (replaces uvec3 nmzHash33 for WebGL1 compatibility)
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

// ── Mountains ─────────────────────────────────────────────────────────────
float gpeak(float x, float cx, float w) {
  float d = (x - cx) / w; return exp(-d * d * 2.5);
}

float mountainLayer(float x, float seed, float base) {
  float h = base;
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    float cx = fract(sin(seed * 17.3 + fi * 31.7) * 43758.5);
    float w  = 0.07 + fract(sin(seed * 23.1 + fi * 41.3) * 43758.5) * 0.10;
    float pk = 0.08 + fract(sin(seed * 37.9 + fi * 53.1) * 43758.5) * 0.12;
    h += gpeak(x, cx, w) * pk;
  }
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    float cx = fract(sin((seed + 10.0) * 17.3 + fi * 31.7) * 43758.5);
    float w  = 0.04 + fract(sin((seed + 11.0) * 23.1 + fi * 41.3) * 43758.5) * 0.06;
    h += gpeak(x, cx, w) * 0.045;
  }
  h += abs(sin(x * 28.0 + seed * 3.7)) * 0.008;
  h += abs(sin(x * 55.0 + seed * 7.1)) * 0.004;
  return h;
}

void main() {
  vec2 q = gl_FragCoord.xy / uResolution.xy;
  vec2 p = q - 0.5;
  p.x *= uResolution.x / uResolution.y;

  vec3 ro = vec3(0.0, 0.0, -6.7);
  vec3 rd = normalize(vec3(p, 1.3));

  float fade = smoothstep(0., 0.01, abs(rd.y)) * 0.1 + 0.9;
  vec3  col  = bg(rd) * fade;

  vec4 aur = smoothstep(0., 1.5, aurora(ro, rd)) * fade;
  col += stars(rd);
  col  = col * (1.0 - aur.a) + aur.rgb;

  // ── Mountain silhouettes (screen-space overlay) ────────────────────────────
  float sX = q.x;
  float mY = q.y - uScroll * 0.28;

  float m1 = mountainLayer(sX, 1.23, 0.38);
  float m2 = mountainLayer(sX, 4.67, 0.29);
  float m3 = mountainLayer(sX, 8.91, 0.19);

  // Haze colour matching the sky near the horizon
  vec3 haze    = vec3(0.055, 0.095, 0.200);
  vec3 snowIce = vec3(0.42, 0.62, 0.80);

  // m1 — most distant: rock and snow both heavily blended toward sky haze
  if (mY < m1) {
    vec3 rock  = mix(vec3(0.040, 0.068, 0.145), haze, 0.60);
    vec3 snow  = mix(snowIce, haze, 0.48);
    col = mix(rock, snow, smoothstep(m1 - 0.016, m1, mY) * 0.60);
  }
  // m2 — mid distance: slight haze
  if (mY < m2) {
    vec3 rock = mix(vec3(0.024, 0.040, 0.090), haze, 0.28);
    vec3 snow = mix(snowIce * 0.90, haze, 0.18);
    col = mix(rock, snow, smoothstep(m2 - 0.012, m2, mY) * 0.75);
  }
  // m3 — foreground: dark, sharp, no haze
  if (mY < m3) {
    vec3 rock = vec3(0.012, 0.022, 0.052);
    col = mix(rock, snowIce * 0.72, smoothstep(m3 - 0.009, m3, mY) * 0.60);
  }
  if (mY < 0.09) { float t = mY / 0.09; col = mix(vec3(0.040, 0.065, 0.120), col, t * t); }

  gl_FragColor = vec4(col, 1.0);
}
`

export function AuroraScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const scene    = new THREE.Scene()
    const camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'low-power' })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(window.innerWidth, window.innerHeight)
    el.appendChild(renderer.domElement)

    const uniforms = {
      uTime:       { value: 0.0 },
      uScroll:     { value: 0.0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    }

    const geo = new THREE.PlaneGeometry(2, 2)
    const mat = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms })
    scene.add(new THREE.Mesh(geo, mat))

    const startTime = performance.now()
    let raf: number
    let targetScroll = 0
    let smoothScroll = 0

    function animate() {
      raf = requestAnimationFrame(animate)
      smoothScroll += (targetScroll - smoothScroll) * 0.06
      uniforms.uTime.value   = (performance.now() - startTime) / 1000
      uniforms.uScroll.value = smoothScroll
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
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      mat.dispose()
      geo.dispose()
      el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />
}
