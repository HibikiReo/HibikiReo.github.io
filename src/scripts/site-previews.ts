const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const ease = 'cubic-bezier(.16, 1, .3, 1)';
const en = document.documentElement.lang === 'en';
const clamp = (value: number) => Math.max(0, Math.min(1, value));

function arrive(element: Element, frames: Keyframe[], duration = 500, delay = 0) {
  element.getAnimations().forEach((animation) => animation.cancel());
  if (!reducedMotion.matches) element.animate(frames, { duration, delay, easing: ease, fill: 'backwards' });
}

// Scroll position drives two CSS variables:
//   --progress  0→1 while a pinned [data-scroll-scene] is held in the viewport
//   --view      0→1 while a [data-view-progress] element crosses the viewport
// With reduced motion both stay at 1, which is each scene's finished state.
const scenes = [...document.querySelectorAll<HTMLElement>('[data-scroll-scene]')].map((element) => ({
  element,
  steps: [...element.querySelectorAll<HTMLElement>('[data-step]')],
  buttons: [...element.querySelectorAll<HTMLButtonElement>('[data-story-step]')],
}));
const passers = [...document.querySelectorAll<HTMLElement>('[data-view-progress]')];
let frame = 0;
function paintScroll() {
  frame = 0;
  const viewport = window.innerHeight;
  const still = reducedMotion.matches;
  const sceneBounds = scenes.map(({ element }) => element.getBoundingClientRect());
  const passerBounds = passers.map((element) => element.getBoundingClientRect());
  scenes.forEach(({ element, steps, buttons }, index) => {
    const bounds = sceneBounds[index];
    const progress = still ? 1 : clamp(-bounds.top / Math.max(1, bounds.height - viewport));
    element.style.setProperty('--progress', progress.toFixed(4));
    const active = Math.round(progress * (steps.length - 1));
    steps.forEach((step, stepIndex) => {
      const on = still || stepIndex === active;
      step.classList.toggle('is-active', on);
      if (step.hasAttribute('data-step-inert')) step.inert = !on;
    });
    buttons.forEach((button, buttonIndex) => button.setAttribute('aria-pressed', String(!still && buttonIndex === active)));
  });
  passers.forEach((element, index) => {
    const bounds = passerBounds[index];
    const view = still ? 1 : clamp((viewport - bounds.top) / (viewport + bounds.height));
    element.style.setProperty('--view', view.toFixed(4));
  });
}
function requestPaint() { if (!frame) frame = requestAnimationFrame(paintScroll); }
window.addEventListener('scroll', requestPaint, { passive: true });
window.addEventListener('resize', requestPaint);
reducedMotion.addEventListener('change', requestPaint);
paintScroll();

function countUp(element: HTMLElement) {
  if (reducedMotion.matches) return;
  const source = element.dataset.count ?? '0';
  const target = Number(source);
  const decimals = (source.split('.')[1] ?? '').length;
  const start = performance.now();
  const tick = (now: number) => {
    const time = clamp((now - start) / 1400);
    element.textContent = (target * (1 - (1 - time) ** 4)).toFixed(decimals);
    if (time < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// Entrances play once, when the element first comes into view.
const entrances = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const element = entry.target as HTMLElement;
    element.classList.add('is-in');
    if (element.dataset.count) countUp(element);
    entrances.unobserve(element);
  });
}, { rootMargin: '0px 0px -10% 0px' });
document.querySelectorAll('[data-reveal], [data-count]').forEach((element) => entrances.observe(element));

// Looping decoration only runs while it is on screen.
const loops = new IntersectionObserver((entries) => {
  entries.forEach((entry) => entry.target.classList.toggle('is-playing', entry.isIntersecting));
});
document.querySelectorAll('[data-loop]').forEach((element) => loops.observe(element));

// Oriel: finish applies to every drawing of the lamp; light controls drive one studio.
const oriel = document.querySelector<HTMLElement>('[data-oriel]');
if (oriel) {
  const finishButtons = [...oriel.querySelectorAll<HTMLButtonElement>('[data-finish-option]')];
  finishButtons.forEach((button) => button.addEventListener('click', () => {
    finishButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    oriel.dataset.finish = button.dataset.finishOption;
    oriel.querySelector('[data-finish-caption]')!.textContent = button.dataset.finishName ?? '';
    arrive(oriel.querySelector('[data-finish-lamp]')!, [{ opacity: .4, transform: 'scale(.94)' }, { opacity: 1, transform: 'scale(1)' }], 700);
  }));

  const studio = oriel.querySelector<HTMLElement>('[data-light-studio]')!;
  const kelvin = studio.querySelector<HTMLInputElement>('[data-kelvin]')!;
  const level = studio.querySelector<HTMLInputElement>('[data-level]')!;
  const presets = [...studio.querySelectorAll<HTMLButtonElement>('[data-preset]')];
  const stops: [number, number[]][] = [[2700, [255, 180, 107]], [4000, [255, 209, 163]], [5200, [255, 240, 224]], [6500, [220, 232, 255]]];
  function paintLight() {
    const value = Number(kelvin.value);
    const upper = Math.max(1, stops.findIndex(([stop]) => stop >= value));
    const [fromKelvin, from] = stops[upper - 1];
    const [toKelvin, to] = stops[upper];
    const mix = (value - fromKelvin) / (toKelvin - fromKelvin);
    studio.style.setProperty('--glow', `rgb(${from.map((channel, index) => Math.round(channel + (to[index] - channel) * mix)).join(' ')})`);
    studio.style.setProperty('--level', String(Number(level.value) / 100));
    studio.querySelector('[data-kelvin-output]')!.textContent = `${value} K`;
    studio.querySelector('[data-level-output]')!.textContent = `${level.value}%`;
    presets.forEach((preset) => preset.setAttribute('aria-pressed', String(preset.dataset.kelvinValue === kelvin.value && preset.dataset.levelValue === level.value)));
  }
  kelvin.addEventListener('input', paintLight);
  level.addEventListener('input', paintLight);
  presets.forEach((preset) => preset.addEventListener('click', () => {
    kelvin.value = preset.dataset.kelvinValue!;
    level.value = preset.dataset.levelValue!;
    paintLight();
  }));
  paintLight();
}

// Still: the drawn object and its notes change together.
const objectButtons = document.querySelectorAll<HTMLButtonElement>('[data-object]');
objectButtons.forEach((button) => button.addEventListener('click', () => {
  objectButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelectorAll<HTMLElement>('[data-object-figure]').forEach((figure) => figure.classList.toggle('is-active', figure.dataset.objectFigure === button.dataset.object));
  document.querySelectorAll<HTMLElement>('[data-object-note]').forEach((note) => {
    note.hidden = note.dataset.objectNote !== button.dataset.object;
    if (!note.hidden) arrive(note, [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], 500);
  });
}));

// Stride: scene buttons scroll the pinned story to the matching panel.
document.querySelectorAll<HTMLButtonElement>('[data-story-step]').forEach((button) => button.addEventListener('click', () => {
  const scene = button.closest<HTMLElement>('[data-scroll-scene]');
  if (!scene) return;
  const step = Number(button.dataset.storyStep);
  if (reducedMotion.matches) {
    scene.querySelectorAll<HTMLElement>('[data-step]')[step]?.scrollIntoView({ block: 'start' });
    return;
  }
  const count = scene.querySelectorAll('[data-story-step]').length;
  const top = window.scrollY + scene.getBoundingClientRect().top;
  window.scrollTo({ top: top + (scene.offsetHeight - innerHeight) * step / (count - 1), behavior: 'smooth' });
}));

const kit = document.querySelector<HTMLElement>('[data-kit]');
if (kit) {
  const boxes = [...kit.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')];
  const paintKit = () => {
    const done = boxes.filter((box) => box.checked).length;
    kit.style.setProperty('--done', String(done / boxes.length));
    kit.classList.toggle('is-ready', done === boxes.length);
    kit.querySelector('[data-kit-count]')!.textContent = String(done);
    kit.querySelector('[data-kit-status]')!.textContent = done === boxes.length ? (en ? 'All set. Head out.' : '都好了，出门。') : (en ? `${boxes.length - done} to go.` : `还差 ${boxes.length - done} 件。`);
  };
  boxes.forEach((box) => box.addEventListener('change', paintKit));
  paintKit();
}

const relay = document.querySelector<HTMLElement>('[data-relay]');
if (relay) {
  const viewButtons = [...relay.querySelectorAll<HTMLButtonElement>('[data-relay-view]')];
  viewButtons.forEach((button) => button.addEventListener('click', () => {
    viewButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    relay.querySelectorAll<HTMLElement>('[data-relay-panel]').forEach((panel) => {
      panel.hidden = panel.dataset.relayPanel !== button.dataset.relayView;
      if (panel.hidden) return;
      panel.querySelectorAll('[data-task-open]').forEach((task, index) => arrive(task, [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], 450, index * 35));
    });
  }));

  const detail = relay.querySelector<HTMLElement>('[data-task-detail]')!;
  const complete = relay.querySelector<HTMLButtonElement>('[data-task-complete]')!;
  const completed = new Set<string>(['REL-38']);
  const total = relay.querySelectorAll('[data-relay-panel="list"] [data-task-open]').length;
  let selected = 'REL-42';
  function showTask(button: HTMLButtonElement) {
    selected = button.dataset.taskOpen!;
    relay!.querySelectorAll<HTMLElement>('[data-task-open]').forEach((row) => row.setAttribute('aria-pressed', String(row.dataset.taskOpen === selected)));
    detail.querySelector('[data-task-title]')!.textContent = button.dataset.title!;
    detail.querySelector('[data-task-code]')!.textContent = selected;
    detail.querySelector('[data-task-description]')!.textContent = button.dataset.description!;
    detail.querySelector('[data-task-person]')!.textContent = button.dataset.person!;
    complete.disabled = completed.has(selected);
    complete.textContent = completed.has(selected) ? (en ? 'Done' : '已完成') : (en ? 'Mark as done' : '标记为完成');
    detail.hidden = false;
    relay!.classList.add('detail-open');
    arrive(detail, [{ opacity: 0, transform: 'translateX(24px)' }, { opacity: 1, transform: 'translateX(0)' }], 450);
    [...detail.children].forEach((child, index) => arrive(child, [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], 450, 60 + index * 40));
    detail.focus({ preventScroll: true });
    if (window.matchMedia('(max-width: 600px)').matches) detail.scrollIntoView({ block: 'start', behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  }
  relay.querySelectorAll<HTMLButtonElement>('[data-task-open]').forEach((button) => button.addEventListener('click', () => showTask(button)));
  relay.querySelector<HTMLButtonElement>('[data-task-close]')!.addEventListener('click', () => {
    detail.hidden = true;
    relay.classList.remove('detail-open');
    relay.querySelector<HTMLButtonElement>('[data-relay-panel]:not([hidden]) [data-task-open][aria-pressed="true"]')?.focus();
  });
  complete.addEventListener('click', () => {
    if (completed.has(selected)) return;
    completed.add(selected);
    const cards = [...relay.querySelectorAll<HTMLElement>('[data-task-open]')].filter((card) => card.dataset.taskOpen === selected);
    for (const card of cards) {
      const oldBounds = card.getBoundingClientRect();
      card.dataset.state = 'done';
      card.querySelector('[data-task-state]')!.textContent = en ? 'Done' : '已完成';
      const board = card.closest('[data-relay-panel="board"]');
      if (board) board.querySelector('[data-done-column]')!.append(card);
      const bounds = card.getBoundingClientRect();
      arrive(card, [{ transform: `translate(${oldBounds.x - bounds.x}px, ${oldBounds.y - bounds.y}px)`, opacity: .5 }, { transform: 'translate(0, 0)', opacity: 1 }], 650);
      arrive(card.querySelector('.task-status')!, [{ transform: 'scale(.4)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }], 600);
    }
    complete.disabled = true;
    complete.textContent = en ? 'Done' : '已完成';
    relay.style.setProperty('--done', String(completed.size / total));
    relay.querySelector('[data-completed-count]')!.textContent = String(completed.size);
    relay.querySelector('[data-pending-count]')!.textContent = String(total - completed.size);
    relay.querySelector('[data-relay-announcement]')!.textContent = en ? `${selected} is done and has moved to the Done column.` : `${selected} 已完成，已移入完成列。`;
  });
}

document.querySelectorAll('details').forEach((details) => details.addEventListener('toggle', () => {
  const body = details.querySelector('.disclosure-body');
  if (details.open && body) arrive(body, [{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'translateY(0)' }], 450);
}));
