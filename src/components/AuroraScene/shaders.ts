// Auroras by nimitz 2017 (twitter: @stormoid)
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License
// Adapted for Three.js ShaderMaterial: uvec3 hash replaced with float equivalent,
// mouse replaced with fixed camera, iterations reduced to 40.

export const auroraVertexShader = /* glsl */ `
void main() {
  gl_Position = vec4(position, 1.0);
}
`

export const auroraFragmentShader = /* glsl */ `
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

// ── Mountain shaders ─────────────────────────────────────────────────────────
// Height field matches the original CPU formula, now computed on GPU.
// Barycentric coordinates (per-vertex attribute) let the fragment shader draw
// wireframe edges without a second mesh or CPU-side line generation.

export const mountainVertexShader = /* glsl */ `
attribute vec3 barycentric;
varying vec3 vBarycentric;
varying vec3 vWorldPos;

void main() {
  vec3 pos = position;
  float x = pos.x;
  float y = pos.y;
  float h =
    sin(x * 0.14 + 0.5) * cos(y * 0.07 - 0.3) * 3.8 +
    sin(x * 0.26 - y * 0.11 + 1.2) * 1.6 +
    sin(x * 0.48 + y * 0.19 - 0.8) * 0.7;
  pos.z = max(0.0, h);

  vec4 worldPos = modelMatrix * vec4(pos, 1.0);
  vWorldPos    = worldPos.xyz;
  vBarycentric = barycentric;
  gl_Position  = projectionMatrix * viewMatrix * worldPos;
}
`

export const mountainFragmentShader = /* glsl */ `
precision mediump float;
varying vec3 vBarycentric;
varying vec3 vWorldPos;

float edgeFactor() {
  vec3 d  = fwidth(vBarycentric);
  vec3 a3 = smoothstep(vec3(0.0), d * 1.5, vBarycentric);
  return min(min(a3.x, a3.y), a3.z);
}

void main() {
  vec3 fdx  = dFdx(vWorldPos);
  vec3 fdy  = dFdy(vWorldPos);
  vec3 norm = normalize(cross(fdx, fdy));
  if (norm.y < 0.0) norm = -norm;

  vec3  lightDir = normalize(vec3(1.0, 2.0, -1.0));
  float diff     = max(dot(norm, lightDir), 0.0);

  vec3 fillColor = vec3(0.016, 0.043, 0.086);
  vec3 wireColor = vec3(0.055, 0.133, 0.208);

  vec3 col = mix(wireColor, fillColor * (0.15 + diff * 0.85), edgeFactor());
  gl_FragColor = vec4(col, 1.0);
}
`
