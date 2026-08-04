(() => {
  'use strict';

  const dialog = document.querySelector('[data-case-dialog]');
  const showcase = document.querySelector('[data-project-showcase]');
  const openButton = document.querySelector('[data-open-case-study]');
  const closeButton = dialog?.querySelector('[data-close-dialog]');
  let opener = null;

  if (!dialog || !showcase || !openButton) return;

  const setText = (selector, value) => {
    const element = dialog.querySelector(selector);
    if (element) element.textContent = value;
  };

  const replaceList = (selector, values) => {
    const list = dialog.querySelector(selector);
    if (!list) return;
    list.replaceChildren(...values.map((value) => {
      const item = document.createElement('li');
      item.textContent = value;
      return item;
    }));
  };

  const populateDialog = (project) => {
    setText('[data-dialog-number]', project.number);
    setText('[data-dialog-category]', project.category);
    setText('[data-dialog-title]', project.title);
    setText('[data-dialog-overview]', project.summary);
    setText('[data-dialog-problem]', project.problem);
    setText('[data-dialog-role]', project.role);
    setText('[data-dialog-implementation]', project.implementation);
    setText('[data-dialog-outcome]', project.outcome);
    replaceList('[data-dialog-decisions]', project.decisions);
    replaceList('[data-dialog-tech]', project.technologies);

    const image = dialog.querySelector('[data-dialog-image]');
    if (image) {
      image.src = project.image;
      image.alt = `${project.imageAlt}; visual placeholder only`;
    }

    const gallery = dialog.querySelector('[data-dialog-gallery]');
    if (gallery) {
      gallery.replaceChildren();
      ['Primary interface placeholder', 'Detail crop placeholder'].forEach((captionText) => {
        const figure = document.createElement('figure');
        const galleryImage = document.createElement('img');
        const caption = document.createElement('figcaption');
        galleryImage.src = project.image;
        galleryImage.alt = '';
        galleryImage.width = 1200;
        galleryImage.height = 800;
        galleryImage.loading = 'lazy';
        caption.textContent = `${captionText} — replace before launch`;
        figure.append(galleryImage, caption);
        gallery.append(figure);
      });
    }

    const links = dialog.querySelector('[data-dialog-links]');
    if (links) {
      links.replaceChildren();
      [
        { label: 'View repository', placeholder: 'GitHub link — add URL', url: project.repositoryUrl },
        { label: 'View live project', placeholder: 'Live project — add URL', url: project.liveUrl }
      ].forEach((item) => {
        if (item.url) {
          const link = document.createElement('a');
          link.className = 'case-link';
          link.href = item.url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.textContent = item.label;
          links.append(link);
          return;
        }
        const placeholder = document.createElement('span');
        placeholder.className = 'case-link is-placeholder';
        placeholder.setAttribute('aria-disabled', 'true');
        placeholder.textContent = item.placeholder;
        links.append(placeholder);
      });
    }
  };

  const openDialog = () => {
    const active = showcase.getActiveProject?.();
    if (!active) return;
    opener = document.activeElement;
    populateDialog(active.project);
    document.body.classList.add('is-dialog-open');
    window.updateBodyLock?.();
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    closeButton?.focus();
  };

  const closeDialog = () => {
    if (dialog.open && typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
    document.body.classList.remove('is-dialog-open');
    window.updateBodyLock?.();
    if (opener instanceof HTMLElement) opener.focus();
  };

  openButton.addEventListener('click', openDialog);
  closeButton?.addEventListener('click', closeDialog);
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeDialog();
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog();
  });
})();
