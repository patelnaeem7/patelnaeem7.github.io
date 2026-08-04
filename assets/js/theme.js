(() => {
  'use strict';

  const root = document.documentElement;
  const controls = [...document.querySelectorAll('[data-theme-toggle]')];
  const storageKey = 'naeem-portfolio-theme';
  const themes = new Set(['light', 'dark']);
  const systemPreference = typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;
  let storedTheme = null;

  const readStoredTheme = () => {
    try {
      const value = window.localStorage.getItem(storageKey);
      return themes.has(value) ? value : null;
    } catch {
      return null;
    }
  };

  const writeStoredTheme = (theme) => {
    if (theme === storedTheme) return;
    try {
      window.localStorage.setItem(storageKey, theme);
      storedTheme = theme;
    } catch {
      // The current page still changes theme when storage is blocked.
    }
  };

  const updateThemeColour = (theme) => {
    const colour = theme === 'dark' ? '#10110f' : '#f4f3ee';
    const metas = [...document.querySelectorAll('meta[name="theme-color"]')];
    if (metas.length) {
      metas.forEach((meta) => {
        meta.content = colour;
      });
      return;
    }

    const meta = document.createElement('meta');
    meta.name = 'theme-color';
    meta.content = colour;
    document.head?.append(meta);
  };

  const syncControls = (theme) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    controls.forEach((control) => {
      control.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
      const label = control.querySelector('[data-theme-label]');
      if (label) label.textContent = `${theme[0].toUpperCase()}${theme.slice(1)} mode`;
    });
  };

  const applyTheme = (theme, { persist = false } = {}) => {
    if (!themes.has(theme)) return;
    root.dataset.theme = theme;
    updateThemeColour(theme);
    syncControls(theme);
    if (persist) writeStoredTheme(theme);
  };

  storedTheme = readStoredTheme();
  let hasManualPreference = Boolean(storedTheme);
  const initialTheme = themes.has(root.dataset.theme)
    ? root.dataset.theme
    : (systemPreference?.matches ? 'dark' : 'light');
  applyTheme(initialTheme);

  controls.forEach((control) => {
    control.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      hasManualPreference = true;
      applyTheme(nextTheme, { persist: true });
    });
  });

  const followSystemPreference = (event) => {
    if (!hasManualPreference) applyTheme(event.matches ? 'dark' : 'light');
  };

  if (systemPreference) {
    if (typeof systemPreference.addEventListener === 'function') {
      systemPreference.addEventListener('change', followSystemPreference);
    } else if (typeof systemPreference.addListener === 'function') {
      systemPreference.addListener(followSystemPreference);
    }
  }

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => root.classList.add('theme-ready'));
  });
})();
