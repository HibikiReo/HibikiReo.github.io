import './theme';
import { createSpring } from './motion';

const en = document.documentElement.lang === 'en';
const toast = document.querySelector<HTMLDivElement>('.toast');
let toastTimer: number;
function announce(message: string) {
  if (!toast) return;
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('is-visible');
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3000);
}

// The home page demo is a real state transition with its implementation sketch.
document.querySelectorAll<HTMLElement>('[data-demo]').forEach((demo) => {
  const toggle = demo.querySelector<HTMLButtonElement>('.demo-switch');
  let focused = false;
  const focus = createSpring((value) => demo.style.setProperty('--focus', String(value)));
  toggle?.addEventListener('click', () => {
    focused = !focused;
    toggle.setAttribute('aria-checked', String(focused));
    demo.classList.toggle('is-focused', focused);
    focus.set(focused ? 1 : 0);
  });

  const tabs = [...demo.querySelectorAll<HTMLButtonElement>('[data-demo-view]')];
  function selectTab(selected: HTMLButtonElement) {
    tabs.forEach((tab) => {
      const active = tab === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute('aria-controls') ?? '');
      if (panel) panel.hidden = !active;
    });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (event) => {
      let next: number;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectTab(tabs[next]);
      tabs[next].focus();
    });
  });
});

document.querySelector<HTMLButtonElement>('.copy-link')?.addEventListener('click', async () => {
  try {
    const url = new URL(window.location.href);
    url.hash = '';
    await navigator.clipboard.writeText(url.href);
    announce(en ? 'Link copied.' : '链接已复制。');
  } catch {
    announce(en ? 'Could not copy the link. Please copy it from the address bar.' : '没能复制链接，请从浏览器地址栏手动复制。');
  }
});
