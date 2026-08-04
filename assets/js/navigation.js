(() => {
  'use strict';

  const header = document.querySelector('[data-site-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-menu a[href^="#"]');
  const sections = [...document.querySelectorAll('main section[id]')];
  let lastFocused = null;
  let headerTicking = false;

  const updateHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
    headerTicking = false;
  };

  if (header) {
    updateHeader();
    window.addEventListener('scroll', () => {
      if (!headerTicking) {
        window.requestAnimationFrame(updateHeader);
        headerTicking = true;
      }
    }, { passive: true });
  }

  const closeMenu = ({ restoreFocus = false } = {}) => {
    if (!menuButton || !mobileMenu || mobileMenu.hidden) return;
    mobileMenu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    header?.classList.remove('is-menu-open');
    document.body.classList.remove('is-menu-open');
    window.updateBodyLock?.();
    if (restoreFocus) (lastFocused || menuButton).focus();
  };

  const openMenu = () => {
    if (!menuButton || !mobileMenu) return;
    lastFocused = document.activeElement;
    mobileMenu.hidden = false;
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Close menu');
    header?.classList.add('is-menu-open');
    document.body.classList.add('is-menu-open');
    window.updateBodyLock?.();
    mobileMenu.querySelector('a')?.focus();
  };

  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeMenu({ restoreFocus: true });
    else openMenu();
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileMenu && !mobileMenu.hidden) {
      event.preventDefault();
      closeMenu({ restoreFocus: true });
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });

  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute('href') === `#${visible.target.id}`;
        if (isCurrent) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-22% 0px -62% 0px', threshold: [0, 0.1, 0.35] });
    sections.forEach((section) => sectionObserver.observe(section));
  }
})();

