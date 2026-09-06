import React, { useLayoutEffect, useRef } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export type DitherMode = "posterize" | "dots" | "ascii" | "blocks";

export type DitherFieldProps = {
  mode: DitherMode;
  palette: string[];
  bands?: number;
  scale?: number;
  speed?: number;
  seed?: number;
  warp?: number;
  grain?: number;
  cell?: number;
  wipe?: number;
  wipeFrom?: "left" | "right";
  reveal?: number;
  revealOrigin?: { x: number; y: number };
  width?: number;
  height?: number;
  opacity?: number;
  style?: React.CSSProperties;
};

const MODE_INDEX: Record<DitherMode, number> = { posterize: 0, dots: 1, ascii: 2, blocks: 3 };

const GLYPHS = [
  0b000000000000000000000000000000,
  0b000010001000100010001000000000,
  0b110011101000100010111001100000,
  0b011101010001110001011111000100,
  0b010101111101010010101111101010,
  0b011101000110111101011011001110,
];

const VERT = `#version 300 es
in vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
precision highp int;
out vec4 o;
uniform vec2 uRes;
uniform float uTime;
uniform float uSeed;
uniform float uScale;
uniform float uWarp;
uniform float uGrain;
uniform float uCell;
uniform float uWipe;
uniform float uWipeDir;
uniform float uReveal;
uniform vec2 uOrigin;
uniform int uMode;
uniform int uBands;
uniform int uCount;
uniform vec3 uPal[8];
uniform uint uGlyph[6];

float hash1(vec3 p){ p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3)); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float hash2(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7)) + uSeed) * 43758.5453); }
float vnoise(vec3 p){
  vec3 i = floor(p); vec3 f = fract(p); f = f * f * (3.0 - 2.0 * f);
  float a = hash1(i), b = hash1(i + vec3(1,0,0)), c = hash1(i + vec3(0,1,0)), d = hash1(i + vec3(1,1,0));
  float e = hash1(i + vec3(0,0,1)), g = hash1(i + vec3(1,0,1)), h = hash1(i + vec3(0,1,1)), k = hash1(i + vec3(1,1,1));
  return mix(mix(mix(a,b,f.x), mix(c,d,f.x), f.y), mix(mix(e,g,f.x), mix(h,k,f.x), f.y), f.z);
}
float fbm(vec3 p){ float v = 0.0, a = 0.5; for(int i = 0; i < 5; i++){ v += a * vnoise(p); p = p * 2.03 + 11.7; a *= 0.5; } return v; }
float field(vec2 uv){
  vec3 q = vec3(uv * uScale + uSeed * 3.1, uTime);
  vec2 w = vec2(fbm(q + vec3(1.7, 9.2, 0.0)), fbm(q + vec3(8.3, 2.8, 0.0)));
  float n = fbm(q + uWarp * vec3(w, 0.0));
  return clamp((n - 0.30) / 0.30, 0.0, 1.0);
}
vec3 pal(float t){
  float x = t * float(uCount - 1);
  int i = int(floor(x)); i = clamp(i, 0, uCount - 2);
  return mix(uPal[i], uPal[i + 1], clamp(x - float(i), 0.0, 1.0));
}
vec3 palStep(int band){ int i = clamp(band, 0, uCount - 1); return uPal[i]; }
void main(){
  vec2 px = gl_FragCoord.xy; px.y = uRes.y - px.y;
  vec2 uv = px / uRes.y;
  if (uMode == 0) {
    float n = field(uv);
    n += (hash2(px) - 0.5) * uGrain;
    int band = int(floor(clamp(n, 0.0, 0.999) * float(uBands)));
    vec3 c = palStep(band * (uCount - 1) / max(uBands - 1, 1));
    float d = length((uv - uOrigin) * vec2(1.0, 1.3));
    float keep = uReveal * 2.4 - d + (n - 0.5) * 0.7;
    if (keep < 0.0) { o = vec4(0.0); return; }
    o = vec4(c, 1.0);
    return;
  }
  if (uMode == 3) {
    float wipe = uWipe * 1.4;
    float x = uWipeDir > 0.5 ? 1.0 - px.x / uRes.x : px.x / uRes.x;
    float shade = 0.0; bool hit = false;
    float m = field(uv * 0.45);
    vec2 cc = floor(px / (uCell * 3.0));
    float hc = hash2(cc + 37.0);
    float edge = wipe * 1.4 - x + m * 1.6 - 1.15;
    if (edge > 0.0 && hc < 0.55 + 0.35 * clamp(edge, 0.0, 1.0)) {
      hit = true;
      vec2 cf = floor(px / uCell);
      float sub = hash2(cf + 91.0);
      shade = sub < 0.3 ? 0.0 : (sub < 0.65 ? 0.5 : 1.0);
      if (hash2(cf + 5.0) > 0.86) hit = false;
    }
    vec2 fc = floor(px / (uCell * 0.5));
    float speck = hash2(fc + 77.0);
    if (speck > 0.995 && speck < 0.995 + uWipe * 0.004 && x < wipe * 1.2) { o = vec4(uPal[0], 1.0); return; }
    if (!hit) { o = vec4(0.0); return; }
    o = vec4(pal(0.3 + shade * 0.7), 1.0);
    return;
  }
  vec2 cell = floor(px / uCell);
  vec2 center = (cell + 0.5) * uCell;
  float v = field(center / uRes.y);
  if (uMode == 1) {
    float r = v * uCell * 0.55;
    float d = length(px - center);
    float a = 1.0 - smoothstep(r - 0.8, r + 0.8, d);
    int band = int(floor(clamp(v, 0.0, 0.999) * float(uCount)));
    o = vec4(palStep(band) * a, a);
    return;
  }
  int gi = int(floor(clamp(0.12 + pow(v, 0.4) * 0.88, 0.0, 0.999) * 6.0));
  vec2 f = fract(px / uCell);
  ivec2 g = ivec2(floor(f * vec2(5.0, 6.0)));
  uint bit = (uGlyph[gi] >> uint(29 - (g.y * 5 + g.x))) & 1u;
  if (bit == 0u) { o = vec4(0.0); return; }
  int band = int(floor(clamp(0.2 + v * 0.8, 0.0, 0.999) * float(uCount)));
  o = vec4(palStep(band), 1.0);
}`;

const hex = (h: string): [number, number, number] => {
  const n = parseInt(h.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

type GlState = {
  gl: WebGL2RenderingContext;
  program: WebGLProgram;
  loc: Record<string, WebGLUniformLocation | null>;
};

const compile = (gl: WebGL2RenderingContext, type: number, src: string) => {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader");
  return s;
};

const setup = (canvas: HTMLCanvasElement): GlState => {
  const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: true, preserveDrawingBuffer: true, antialias: false })!;
  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? "link");
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const p = gl.getAttribLocation(program, "p");
  gl.enableVertexAttribArray(p);
  gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 0, 0);
  gl.useProgram(program);
  const names = ["uRes", "uTime", "uSeed", "uScale", "uWarp", "uGrain", "uCell", "uWipe", "uWipeDir", "uReveal", "uOrigin", "uMode", "uBands", "uCount", "uPal", "uGlyph"];
  const loc: GlState["loc"] = {};
  for (const n of names) loc[n] = gl.getUniformLocation(program, n);
  gl.uniform1uiv(loc.uGlyph, new Uint32Array(GLYPHS));
  return { gl, program, loc };
};

export const DitherField: React.FC<DitherFieldProps> = ({
  mode,
  palette,
  bands = 5,
  scale = 1.6,
  speed = 0.12,
  seed = 1,
  warp = 1.2,
  grain = 0.06,
  cell = 14,
  wipe = 1,
  wipeFrom = "left",
  reveal = 2,
  revealOrigin = { x: 0.3, y: 0.3 },
  width = 1920,
  height = 1080,
  opacity = 1,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ref = useRef<HTMLCanvasElement>(null);
  const state = useRef<GlState | null>(null);

  useLayoutEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (!state.current) state.current = setup(canvas);
    const { gl, loc } = state.current;
    gl.viewport(0, 0, width, height);
    gl.uniform2f(loc.uRes, width, height);
    gl.uniform1f(loc.uTime, (frame / fps) * speed);
    gl.uniform1f(loc.uSeed, seed);
    gl.uniform1f(loc.uScale, scale);
    gl.uniform1f(loc.uWarp, warp);
    gl.uniform1f(loc.uGrain, grain);
    gl.uniform1f(loc.uCell, cell);
    gl.uniform1f(loc.uWipe, wipe);
    gl.uniform1f(loc.uWipeDir, wipeFrom === "right" ? 1 : 0);
    gl.uniform1f(loc.uReveal, reveal);
    gl.uniform2f(loc.uOrigin, revealOrigin.x, revealOrigin.y);
    gl.uniform1i(loc.uMode, MODE_INDEX[mode]);
    gl.uniform1i(loc.uBands, bands);
    const stops = palette.slice(0, 8);
    gl.uniform1i(loc.uCount, stops.length);
    const flat = new Float32Array(24);
    stops.forEach((c, i) => flat.set(hex(c), i * 3));
    gl.uniform3fv(loc.uPal, flat);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }, [frame, fps, mode, palette, bands, scale, speed, seed, warp, grain, cell, wipe, wipeFrom, reveal, revealOrigin, width, height]);

  return (
    <canvas
      ref={ref}
      width={width}
      height={height}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity, display: "block", ...style }}
    />
  );
};
