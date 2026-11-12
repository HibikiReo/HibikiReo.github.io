// One local scene is sampled again through a refracting, deformable glass surface.
// Text and controls stay in the DOM; no page capture, textures or external assets.
const vertexSource = `#version 300 es
in vec2 aPosition;
void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
`;

const fragmentSource = `#version 300 es
precision highp float;
uniform vec2 uSize;
uniform float uDpr;
uniform float uDark;
uniform float uGlass;
uniform vec4 uBar;
uniform vec4 uTouch;
uniform float uStretch;
uniform float uSelection;
out vec4 outColor;

vec3 scene(vec2 p) {
  vec2 uv = p / uSize;
  vec3 ground = mix(vec3(.91), vec3(.12), uDark);
  ground += (1.0 - uv.y) * mix(.025, .015, uDark);
  float wave = uSize.y * (.81 + .105 * sin(uv.x * 5.7 - .8));
  float band = (p.y - wave) / (uSize.y * .092);
  float copperMask = 1.0 - smoothstep(.97, 1.0, abs(band));
  vec3 copper = mix(vec3(.87, .61, .43), vec3(.47, .24, .17), uDark);
  copper *= .86 + .2 * sqrt(max(0.0, 1.0 - band * band));
  float grain = .5 + .5 * sin((p.x * .31 + p.y * .44));
  copper += grain * .018;
  vec3 color = mix(ground, copper, copperMask);
  float silverWave = uSize.y * (.94 + .13 * sin(uv.x * 5.0 + .7));
  float silver = (p.y - silverWave) / (uSize.y * .065);
  vec3 silverColor = mix(vec3(.76), vec3(.24), uDark);
  silverColor += pow(max(0.0, 1.0 - silver * silver), 3.0) * .15;
  color = mix(color, silverColor, 1.0 - smoothstep(.97, 1.0, abs(silver)));
  float berryWave = uSize.y * (.95 + .12 * sin(uv.x * 5.6 + 2.0));
  float berry = (p.y - berryWave) / (uSize.y * .06);
  vec3 berryColor = mix(vec3(.78, .56, .58), vec3(.32, .16, .20), uDark);
  berryColor *= .85 + .2 * sqrt(max(0.0, 1.0 - berry * berry));
  color = mix(color, berryColor, 1.0 - smoothstep(.97, 1.0, abs(berry)));
  return color;
}

float capsule(vec2 p, vec2 center, vec2 halfSize) {
  vec2 q = p - center;
  q.x -= clamp(q.x, -halfSize.x + halfSize.y, halfSize.x - halfSize.y);
  return length(q) - halfSize.y;
}

// A smooth SDF union makes the pressed lens flow into the bar, without seams.
float surface(vec2 p) {
  float bar = capsule(p, uBar.xy, uBar.zw);
  float lift = clamp(uTouch.z, 0.0, 1.3);
  if (lift < .001) return bar;
  float elongation = 1.0 + abs(uStretch) * .10;
  vec2 q = (p - uTouch.xy) / vec2(elongation, 1.0 / elongation);
  float bead = (length(q) - uBar.w * (1.0 + .10 * lift)) / elongation;
  float k = uBar.w * .18 * lift;
  float h = max(k - abs(bar - bead), 0.0) / k;
  return min(bar, bead) - h * h * k * .25;
}

float refraction(float slope, float eta) {
  float sine = slope / sqrt(1.0 + slope * slope);
  return tan(asin(sine) - asin(sine / eta));
}

void main() {
  vec2 p = vec2(gl_FragCoord.x, uSize.y * uDpr - gl_FragCoord.y) / uDpr;
  vec3 behind = scene(p);
  if (uGlass < .5) { outColor = vec4(behind, 1.0); return; }
  float d = surface(p);
  float shadow = exp(-pow(max(surface(p - vec2(0.0, 7.0)), 0.0) / 9.0, 2.0));
  vec3 outside = behind * (1.0 - shadow * .12);
  // Half-pixel dark outer edge, with a much brighter directional inner rim.
  outside *= 1.0 - exp(-pow((d - .45) / .55, 2.0)) * .2;
  if (d > 1.1) { outColor = vec4(outside, 1.0); return; }
  vec2 normal = normalize(vec2(surface(p + vec2(.4, 0.0)) - surface(p - vec2(.4, 0.0)),
    surface(p + vec2(0.0, .4)) - surface(p - vec2(0.0, .4))) + vec2(.00001));
  float depth = min(14.0, uBar.w * .5);
  float t = clamp(-d / depth, .001, 1.0);
  float slope = pow(1.0 - t, 3.0) * pow(max(1.0 - pow(1.0 - t, 4.0), .0001), -.75);
  float strength = .65 + .05 * max(uTouch.z, 0.0);
  float offset = depth * strength * refraction(slope, 1.5);
  vec2 sampleAt = p - normal * offset;
  // Dispersion stays in the bevel; the flat centre has no colour separation.
  vec3 glass = vec3(scene(p - normal * offset * 1.025).r,
    scene(sampleAt).g, scene(p - normal * offset * .975).b);
  vec3 frost = (scene(sampleAt + vec2(.65, 0.0)) + scene(sampleAt - vec2(.65, 0.0))
    + scene(sampleAt + vec2(0.0, .65)) + scene(sampleAt - vec2(0.0, .65))) * .25;
  glass = mix(glass, frost, .18);
  // Compress the backdrop's range, preserving its hue instead of painting grey.
  glass = mix(glass * .84 + .14, glass * .72 + .012, uDark);
  float selection = capsule(p, vec2(uSelection, uBar.y), vec2((uBar.z - 6.0) / 3.0 - 4.0, uBar.w - 6.0));
  float fill = (1.0 - smoothstep(-.6, .6, selection)) * (1.0 - clamp(uTouch.z, 0.0, 1.0) * .9);
  glass = mix(glass, mix(vec3(1.0), vec3(.78), uDark), fill * mix(.24, .12, uDark));
  float facing = dot(normal, normalize(vec2(-.4, -1.0)));
  float light = .18 + .68 * pow(max(facing, 0.0), 2.0) + .3 * pow(max(-facing, 0.0), 2.0);
  float rim = exp(-max(-d, 0.0) / .72);
  glass += (1.0 - glass) * rim * light;
  float innerRim = exp(-pow((d + 2.1) / 1.15, 2.0));
  glass += (1.0 - glass) * innerRim * light * .16;
  float glow = exp(-dot(p - uTouch.xy, p - uTouch.xy) / (uBar.w * uBar.w * 3.2));
  glass += (1.0 - glass) * glow * max(uTouch.z, 0.0) * .15;
  float coverage = 1.0 - smoothstep(-.6 / uDpr, .6 / uDpr, d);
  outColor = vec4(mix(outside, glass, coverage), 1.0);
}
`;

// Exact analytic spring; every retarget preserves its current velocity.
function spring(response: number, bounce = 0) {
  return { value: 0, target: 0, velocity: 0, frequency: 2 * Math.PI / response, damping: 1 - bounce };
}
type Spring = ReturnType<typeof spring>;
function advance(state: Spring, dt: number) {
  const x = state.value - state.target;
  const v = state.velocity;
  const w = state.frequency;
  const decay = Math.exp(-state.damping * w * dt);
  if (state.damping === 1) {
    const b = v + w * x;
    state.value = state.target + (x + b * dt) * decay;
    state.velocity = (v - w * b * dt) * decay;
  } else {
    const a = state.damping * w;
    const wd = w * Math.sqrt(1 - state.damping ** 2);
    const s = Math.sin(wd * dt);
    const c = Math.cos(wd * dt);
    const b = (v + a * x) / wd;
    state.value = state.target + decay * (x * c + b * s);
    state.velocity = decay * (v * c - (x * wd + a * b) * s);
  }
  if (Math.abs(state.value - state.target) < .001 && Math.abs(state.velocity) < .01) {
    state.value = state.target;
    state.velocity = 0;
    return false;
  }
  return true;
}
function jump(state: Spring, value: number) {
  state.value = state.target = value;
  state.velocity = 0;
}

function renderer(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl2', { alpha: false, antialias: false, powerPreference: 'low-power' });
  if (!gl) return null;
  function compile(type: number, source: string) {
    const shader = gl!.createShader(type)!;
    gl!.shaderSource(shader, source);
    gl!.compileShader(shader);
    if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) throw new Error(gl!.getShaderInfoLog(shader) ?? 'Liquid Glass shader compilation failed');
    return shader;
  }
  const program = gl.createProgram()!;
  const vertex = compile(gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? 'Liquid Glass program linking failed');
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const attribute = gl.getAttribLocation(program, 'aPosition');
  gl.enableVertexAttribArray(attribute);
  gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);
  const names = ['uSize', 'uDpr', 'uDark', 'uGlass', 'uBar', 'uTouch', 'uStretch', 'uSelection'] as const;
  const uniforms = Object.fromEntries(names.map((name) => [name, gl.getUniformLocation(program, name)])) as Record<typeof names[number], WebGLUniformLocation | null>;
  return { gl, uniforms };
}

export function initializeLiquidGlass(preview: HTMLElement) {
  const canvas = preview.querySelector<HTMLCanvasElement>('canvas')!;
  const menu = preview.querySelector<HTMLFieldSetElement>('.liquid-menu')!;
  const inputs = [...menu.querySelectorAll<HTMLInputElement>('input')];
  const showcase = preview.closest<HTMLElement>('.theme-showcase')!;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const reduceTransparency = matchMedia('(prefers-reduced-transparency: reduce)');
  const contrast = matchMedia('(prefers-contrast: more)');
  let gpu: ReturnType<typeof renderer> = null;
  try { gpu = renderer(canvas); }
  catch (error) { console.error('Liquid Glass: optical rendering could not start.', error); }
  if (!gpu) canvas.hidden = true;

  const selection = spring(.3);
  const touchX = spring(.15);
  const touchY = spring(.2);
  const lift = spring(.28, .08);
  const stretch = spring(.3, .08);
  const states = [selection, touchX, touchY, lift, stretch];
  let bar = { x: 0, y: 0, halfWidth: 0, halfHeight: 0 };
  let width = 0;
  let height = 0;
  let dpr = 1;
  let frame = 0;
  let previousTime = 0;
  let pointer: { id: number; startX: number; startY: number; x: number; time: number; dragging: boolean } | null = null;
  let suppressClick = false;
  let initialized = false;

  function selectedIndex() { return inputs.findIndex((input) => input.checked); }
  function center(index: number) {
    const label = inputs[index].closest('label')!;
    return bar.x - bar.halfWidth + label.offsetLeft + label.offsetWidth / 2;
  }
  function draw() {
    if (!gpu || !width || !height) return;
    const { gl, uniforms: u } = gpu;
    const solid = reduceTransparency.matches || contrast.matches;
    const optics = solid ? 'solid' : 'webgl';
    if (preview.dataset.optics !== optics) preview.dataset.optics = optics;
    const dark = showcase.querySelector<HTMLInputElement>('.theme-mode input[value="dark"]')!.checked;
    gl.uniform2f(u.uSize, width, height);
    gl.uniform1f(u.uDpr, dpr);
    gl.uniform1f(u.uDark, dark ? 1 : 0);
    gl.uniform1f(u.uGlass, solid ? 0 : 1);
    gl.uniform4f(u.uBar, bar.x, bar.y, bar.halfWidth, bar.halfHeight);
    gl.uniform4f(u.uTouch, touchX.value, touchY.value, reduceMotion.matches ? 0 : lift.value, 0);
    gl.uniform1f(u.uStretch, reduceMotion.matches ? 0 : stretch.value);
    gl.uniform1f(u.uSelection, selection.value);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  function tick(time: number) {
    frame = 0;
    const dt = Math.min((time - previousTime) / 1000, .05);
    previousTime = time;
    let moving = false;
    for (const state of states) {
      if (reduceMotion.matches) jump(state, state.target);
      else if (advance(state, dt)) moving = true;
    }
    draw();
    if (moving) frame = requestAnimationFrame(tick);
  }
  function wake() {
    if (!frame) { previousTime = performance.now(); frame = requestAnimationFrame(tick); }
  }
  function layout() {
    const bounds = preview.getBoundingClientRect();
    const menuBounds = menu.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    dpr = Math.min(devicePixelRatio, 2);
    bar = { x: menuBounds.left - bounds.left + menuBounds.width / 2, y: menuBounds.top - bounds.top + menuBounds.height / 2, halfWidth: menuBounds.width / 2, halfHeight: menuBounds.height / 2 };
    if (gpu) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      gpu.gl.viewport(0, 0, canvas.width, canvas.height);
    }
    jump(selection, center(selectedIndex()));
    jump(touchX, selection.value);
    jump(touchY, bar.y);
    initialized = true;
    wake();
  }
  inputs.forEach((input, index) => input.addEventListener('change', () => {
    if (!input.checked || !initialized) return;
    selection.target = center(index);
    if (!pointer) touchX.target = selection.target;
    wake();
  }));
  function follow(event: PointerEvent) {
    const bounds = preview.getBoundingClientRect();
    touchX.target = Math.max(bar.x - bar.halfWidth + bar.halfHeight, Math.min(bar.x + bar.halfWidth - bar.halfHeight, event.clientX - bounds.left));
    touchY.target = bar.y + Math.max(-6, Math.min(6, event.clientY - bounds.top - bar.y)) * .2;
  }
  menu.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    suppressClick = false;
    pointer = { id: event.pointerId, startX: event.clientX, startY: event.clientY, x: event.clientX, time: event.timeStamp, dragging: false };
    follow(event);
    jump(touchX, touchX.target);
    lift.damping = 1;
    lift.target = 1;
    menu.setPointerCapture(event.pointerId);
    wake();
  });
  menu.addEventListener('pointermove', (event) => {
    if (!pointer || pointer.id !== event.pointerId) return;
    const dx = event.clientX - pointer.startX;
    if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(event.clientY - pointer.startY)) pointer.dragging = true;
    if (pointer.dragging) {
      follow(event);
      // Position follows the finger directly; velocity drives area-preserving stretch.
      jump(touchX, touchX.target);
      stretch.target = Math.max(-1, Math.min(1, (event.clientX - pointer.x) / Math.max((event.timeStamp - pointer.time) / 1000, .008) / 1400));
      pointer.x = event.clientX;
      pointer.time = event.timeStamp;
      wake();
    }
  });
  function release(event: PointerEvent, canceled = false) {
    if (!pointer || pointer.id !== event.pointerId) return;
    const dragged = pointer.dragging;
    pointer = null;
    if (!canceled) {
      const x = event.clientX - preview.getBoundingClientRect().left;
      const index = inputs.reduce((nearest, _input, candidate) => Math.abs(center(candidate) - x) < Math.abs(center(nearest) - x) ? candidate : nearest, 0);
      inputs[index].checked = true;
      inputs[index].focus({ preventScroll: true });
      selection.target = center(index);
      suppressClick = dragged;
    }
    touchX.target = selection.target;
    touchY.target = bar.y;
    lift.damping = .92;
    lift.target = 0;
    stretch.target = 0;
    wake();
  }
  menu.addEventListener('pointerup', (event) => release(event));
  menu.addEventListener('pointercancel', (event) => release(event, true));
  menu.addEventListener('lostpointercapture', (event) => release(event, true));
  menu.addEventListener('click', (event) => {
    if (suppressClick) { event.preventDefault(); suppressClick = false; }
  });
  showcase.querySelector('.theme-mode')!.addEventListener('change', wake);
  for (const preference of [reduceMotion, reduceTransparency, contrast]) preference.addEventListener('change', wake);
  new ResizeObserver(layout).observe(preview);
  canvas.addEventListener('webglcontextlost', () => {
    gpu = null;
    canvas.hidden = true;
    delete preview.dataset.optics;
  });
  layout();
}
