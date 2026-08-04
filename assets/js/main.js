(() => {
  'use strict';

  // Replace these launch values in one place. See docs/CONTENT-CHECKLIST.md.
  window.PORTFOLIO_CONFIG = Object.freeze({
    email: 'naeem.patel.dev@gmail.com',
    linkedin: 'https://www.linkedin.com/in/patelnaeem',
    github: 'https://github.com/patelnaeem7',
    cv: 'assets/documents/naeem-patel-cv.pdf',
    canonicalUrl: 'https://naeem-patel.is-a.dev/'
  });

  window.updateBodyLock = () => {
    const shouldLock = document.body.classList.contains('is-menu-open') ||
      document.body.classList.contains('is-dialog-open');
    document.body.classList.toggle('is-locked', shouldLock);
  };

  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  const linkStatus = document.querySelector('[data-link-status]');
  const placeholderNote = document.querySelector('#placeholder-note');
  const linkMap = {
    email: window.PORTFOLIO_CONFIG.email ? `mailto:${window.PORTFOLIO_CONFIG.email}` : '',
    linkedin: window.PORTFOLIO_CONFIG.linkedin,
    github: window.PORTFOLIO_CONFIG.github,
    cv: window.PORTFOLIO_CONFIG.cv
  };

  document.querySelectorAll('[data-placeholder-link]').forEach((link) => {
    const type = link.dataset.placeholderLink;
    const destination = linkMap[type];

    if (destination) {
      link.href = destination;
      link.removeAttribute('data-placeholder-link');
      return;
    }

    if (placeholderNote) placeholderNote.hidden = false;
    link.setAttribute('aria-describedby', 'placeholder-note');
    link.addEventListener('click', (event) => {
      event.preventDefault();
      if (linkStatus) {
        const label = type === 'cv' ? 'CV file' : `${type} details`;
        linkStatus.textContent = `${label} will be available once the launch placeholder is replaced.`;
      }
    });
  });

  const progress = document.querySelector('[data-scroll-progress]');
  let scrollTicking = false;
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    if (progress) progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
    scrollTicking = false;
  };

  if (progress) {
    updateProgress();
    window.addEventListener('scroll', () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(updateProgress);
        scrollTicking = true;
      }
    }, { passive: true });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const composition = document.querySelector('[data-hero-composition]');
  const canTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (composition && canTilt) {
    composition.addEventListener('pointermove', (event) => {
      const bounds = composition.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 5;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 5;
      composition.style.transform = `perspective(80rem) rotateX(${-y}deg) rotateY(${x}deg)`;
    });
    composition.addEventListener('pointerleave', () => {
      composition.style.transform = '';
    });
  }
})();
