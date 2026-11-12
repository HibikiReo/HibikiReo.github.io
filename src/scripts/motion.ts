export const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

// The exact critically damped solution preserves position and velocity when retargeted.
// Idle springs schedule no frames; reduced motion applies the destination immediately.
export function createSpring(render: (value: number) => void, response = .32) {
  const frequency = 2 * Math.PI / response;
  let value = 0;
  let target = 0;
  let velocity = 0;
  let frame = 0;
  let previousTime = 0;

  function jump(next: number) {
    window.cancelAnimationFrame(frame);
    frame = 0;
    value = target = next;
    velocity = 0;
    render(value);
  }

  function tick(time: number) {
    frame = 0;
    if (motionPreference.matches) {
      jump(target);
      return;
    }
    const delta = Math.min((time - previousTime) / 1000, .064);
    previousTime = time;
    const offset = value - target;
    const impulse = velocity + frequency * offset;
    const decay = Math.exp(-frequency * delta);
    value = target + (offset + impulse * delta) * decay;
    velocity = (velocity - frequency * impulse * delta) * decay;

    if (Math.abs(value - target) < .001 && Math.abs(velocity) < .01) {
      jump(target);
      return;
    }
    render(value);
    frame = window.requestAnimationFrame(tick);
  }

  return {
    jump,
    set(next: number) {
      target = next;
      if (motionPreference.matches) jump(next);
      else if (!frame) {
        previousTime = performance.now();
        frame = window.requestAnimationFrame(tick);
      }
    },
  };
}

// One moving underline maintains continuity between navigation items.
const nav = document.querySelector<HTMLElement>('.main-nav');
const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('.nav-link')];
if (nav) {
  const position = createSpring((value) => nav.style.setProperty('--nav-x', `${value}px`));

  function positionIndicator(immediate = false) {
    const active = navLinks.find((link) => link.classList.contains('is-active'));
    if (!active || !active.offsetWidth) {
      nav!.classList.remove('is-tracking');
      return;
    }
    const settle = immediate || !nav!.classList.contains('is-tracking');
    position[settle ? 'jump' : 'set'](active.offsetLeft);
    nav!.style.setProperty('--nav-width', `${active.offsetWidth}px`);
    nav!.classList.add('is-tracking');
  }

  function selectLink(selected: HTMLAnchorElement) {
    navLinks.forEach((link) => {
      const active = link === selected;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    positionIndicator();
  }

  navLinks.forEach((link) => link.addEventListener('click', () => selectLink(link)));
  const sectionObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const link = navLinks.find((item) => item.hash === `#${entry.target.id}`);
      if (link) selectLink(link);
    }
  }, { rootMargin: '-15% 0px -55% 0px' });
  document.querySelectorAll<HTMLElement>('main > section[id]').forEach((section) => sectionObserver.observe(section));
  new ResizeObserver(() => positionIndicator(true)).observe(nav);
  document.fonts.ready.then(() => positionIndicator(true));
  positionIndicator(true);
}

const header = document.querySelector('.site-header');
let scrollFrame = 0;
function updateScroll() {
  scrollFrame = 0;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  document.documentElement.style.setProperty('--page-progress', String(total > 0 ? window.scrollY / total : 0));
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
}
const requestScroll = () => {
  if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScroll);
};
window.addEventListener('scroll', requestScroll, { passive: true });
window.addEventListener('resize', requestScroll);
updateScroll();
