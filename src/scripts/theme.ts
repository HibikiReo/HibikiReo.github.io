type Theme = 'dark' | 'light';

const STORAGE_KEY = 'etudes-theme';
const THEME_COLORS: Record<Theme, string> = { light: '#f3f3f3', dark: '#202020' };
const root = document.documentElement;

function currentTheme(): Theme {
  return root.dataset.theme === 'dark' ? 'dark' : 'light';
}

function targetLabel(theme: Theme) {
  if (root.lang === 'en') return theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';
  return theme === 'light' ? '切换到深色主题' : '切换到浅色主题';
}

function updateMeta(theme: Theme) {
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
}

function syncToggle(button: HTMLButtonElement, theme: Theme) {
  const label = targetLabel(theme);
  button.setAttribute('aria-label', label);
  button.setAttribute('title', label);
}

const button = document.querySelector<HTMLButtonElement>('.theme-toggle');
if (button) {
  syncToggle(button, currentTheme());

  button.addEventListener('click', () => {
    const theme = currentTheme() === 'light' ? 'dark' : 'light';
    root.dataset.theme = theme;
    updateMeta(theme);
    syncToggle(button, theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Keep the chosen theme for this page when storage is unavailable.
    }
  });
}
