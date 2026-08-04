(() => {
  'use strict';

  const projects = [
    {
      number: '01',
      title: 'Fusion Care Digital Experience',
      category: 'Web Design, UI/UX, PHP and SEO',
      summary: 'A wider website-modernisation programme for an established care-software company.',
      role: 'UI/UX direction, responsive front-end, content architecture, interaction design and technical SEO.',
      technologySummary: 'HTML, CSS, JavaScript, PHP, CMS, technical SEO',
      outcome: 'A more consistent and modern product experience with clearer navigation and stronger conversion journeys.',
      image: 'assets/images/projects/fusion-care-placeholder.svg',
      imageAlt: 'Conceptual placeholder showing a care-software product website interface',
      problem: 'Modernise an established commercial software website while protecting existing functionality, search visibility and important content.',
      decisions: [
        'Create a reusable responsive header and footer system.',
        'Clarify product value and calls to action across key journeys.',
        'Structure content for scanning, accessibility and search intent.',
        'Keep components flexible enough for established PHP templates.'
      ],
      implementation: 'Responsive semantic front-end components were designed to fit the existing website environment, with attention to CareCalc and billing pages, contact journeys, content hierarchy, keyboard access and technical SEO foundations.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'CMS', 'Technical SEO'],
      repositoryUrl: '',
      liveUrl: ''
    },
    {
      number: '02',
      title: 'Bilal Jamia Masjid Digital Platform',
      category: 'Android, Kotlin, PHP, MySQL and REST API',
      summary: 'An end-to-end mosque platform connecting a native Android application to a PHP/MySQL administration system.',
      role: 'Product planning, interface design, Android development, API design, data validation, administration workflow and deployment architecture.',
      technologySummary: 'Kotlin, Jetpack Compose, Material 3, PHP, MySQL, REST API',
      outcome: 'A maintainable platform connecting a public Android application with a controlled management interface.',
      image: 'assets/images/projects/bilal-masjid-placeholder.svg',
      imageAlt: 'Conceptual placeholder showing a mosque prayer application and administration interface',
      problem: 'Provide reliable prayer information to a mosque community while allowing authorised staff to update schedules without modifying the application.',
      decisions: [
        'Prioritise the current and upcoming prayer at a glance.',
        'Use familiar Material 3 patterns with clear touch targets.',
        'Separate public presentation from controlled administration.',
        'Plan for validation, local caching and notification infrastructure.'
      ],
      implementation: 'A native Kotlin application uses Jetpack Compose and Material 3 to present daily prayer and Jumu’ah schedules, countdowns, Gregorian and Hijri dates, and notices. A REST API connects the app to a secure PHP/MySQL administration workflow with validation and local caching considerations.',
      technologies: ['Kotlin', 'Jetpack Compose', 'Material 3', 'PHP', 'MySQL', 'REST API'],
      repositoryUrl: '',
      liveUrl: ''
    },
    {
      number: '03',
      title: 'Custom CMS and Business Integrations',
      category: 'PHP, MySQL, CMS and API integrations',
      summary: 'Operational systems that make content, administration and connected business workflows easier to manage.',
      role: 'System planning, interface design, PHP/MySQL development, authentication, validation and third-party integration.',
      technologySummary: 'PHP, MySQL, TinyMCE, OAuth, Microsoft Graph, server-side validation',
      outcome: 'Maintainable administration workflows that support day-to-day operational work beyond the public-facing interface.',
      image: 'assets/images/projects/cms-placeholder.svg',
      imageAlt: 'Conceptual placeholder showing a custom CMS administration dashboard',
      problem: 'Give teams a dependable way to manage content and business workflows without relying on brittle manual processes or public-site code changes.',
      decisions: [
        'Design administration screens around frequent operational tasks.',
        'Use server-side validation and authenticated workflows by default.',
        'Keep content tools familiar through focused editor integration.',
        'Build integrations around explicit states and recoverable errors.'
      ],
      implementation: 'Custom PHP/MySQL systems include blog administration, TinyMCE editing, pagination, image uploads, authentication, form and email workflows, and integration patterns for Microsoft Graph or OAuth services. Interfaces are built for clarity, validation and maintainable extension.',
      technologies: ['PHP', 'MySQL', 'TinyMCE', 'OAuth', 'Microsoft Graph', 'REST APIs'],
      repositoryUrl: '',
      liveUrl: ''
    },
    {
      number: '04',
      title: 'Search and Conversion Optimisation',
      category: 'Technical SEO, content architecture and analytics',
      summary: 'A structured approach to making useful pages easier to discover, understand and act on.',
      role: 'Technical review, search-intent mapping, metadata, internal linking, page architecture and conversion-focused UX.',
      technologySummary: 'Search Console, Bing Webmaster Tools, SEMrush, HTML, Core Web Vitals',
      outcome: 'Clearer, search-conscious page structures with stronger technical foundations and more purposeful conversion journeys.',
      image: 'assets/images/projects/seo-placeholder.svg',
      imageAlt: 'Conceptual placeholder showing technical SEO and content performance interfaces',
      problem: 'Align page structure, content and technical delivery so that search engines and people can both understand the purpose of an experience.',
      decisions: [
        'Map page hierarchy to user intent before refining individual metadata.',
        'Treat internal linking as part of navigation and product comprehension.',
        'Connect responsive performance and Core Web Vitals awareness to UX.',
        'Use conversion actions that match the visitor’s stage and context.'
      ],
      implementation: 'The approach brings together Google Search Console, Bing Webmaster Tools and SEMrush insights with metadata optimisation, internal linking, content architecture, responsive performance and conversion-focused page structures—without separating search work from the user experience.',
      technologies: ['Technical SEO', 'Search Console', 'Bing Webmaster Tools', 'SEMrush', 'Core Web Vitals', 'Content UX'],
      repositoryUrl: '',
      liveUrl: ''
    }
  ];

  window.PORTFOLIO_PROJECTS = Object.freeze(projects.map((project) => Object.freeze(project)));

  const showcase = document.querySelector('[data-project-showcase]');
  if (!showcase) return;

  const tabs = [...showcase.querySelectorAll('[data-project-index]')];
  const panel = showcase.querySelector('[data-project-panel]');
  const reducedMotion = typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fields = {
    image: showcase.querySelector('[data-project-image]'),
    number: showcase.querySelector('[data-project-number]'),
    count: showcase.querySelector('[data-project-count]'),
    category: showcase.querySelector('[data-project-category]'),
    title: showcase.querySelector('[data-project-title]'),
    summary: showcase.querySelector('[data-project-summary]'),
    role: showcase.querySelector('[data-project-role]'),
    tech: showcase.querySelector('[data-project-tech]'),
    outcome: showcase.querySelector('[data-project-outcome]')
  };
  let activeIndex = 0;

  const setText = (element, value) => {
    if (element) element.textContent = value;
  };

  const selectProject = (index, { focusTab = false, scrollTab = false } = {}) => {
    const safeIndex = (index + projects.length) % projects.length;
    const project = projects[safeIndex];
    activeIndex = safeIndex;

    tabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === safeIndex;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });

    if (panel) {
      panel.setAttribute('aria-labelledby', tabs[safeIndex].id);
      panel.classList.remove('is-changing');
      window.requestAnimationFrame(() => panel.classList.add('is-changing'));
    }

    if (fields.image) {
      fields.image.src = project.image;
      fields.image.alt = project.imageAlt;
    }
    setText(fields.number, `Project ${project.number}`);
    setText(fields.count, `${project.number} / ${String(projects.length).padStart(2, '0')}`);
    setText(fields.category, project.category);
    setText(fields.title, project.title);
    setText(fields.summary, project.summary);
    setText(fields.role, project.role);
    setText(fields.tech, project.technologySummary);
    setText(fields.outcome, project.outcome);

    if (focusTab) tabs[safeIndex].focus();
    if (scrollTab) {
      tabs[safeIndex].scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
    showcase.dispatchEvent(new CustomEvent('portfolio:projectchange', { detail: { index: safeIndex } }));
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectProject(index, { scrollTab: true }));
    tab.addEventListener('keydown', (event) => {
      const commands = {
        ArrowRight: (index + 1) % tabs.length,
        ArrowDown: (index + 1) % tabs.length,
        ArrowLeft: (index - 1 + tabs.length) % tabs.length,
        ArrowUp: (index - 1 + tabs.length) % tabs.length,
        Home: 0,
        End: tabs.length - 1
      };
      if (!(event.key in commands)) return;
      event.preventDefault();
      selectProject(commands[event.key], { focusTab: true, scrollTab: true });
    });
  });

  showcase.querySelector('[data-project-previous]')?.addEventListener('click', () => {
    selectProject(activeIndex - 1, { scrollTab: true });
  });
  showcase.querySelector('[data-project-next]')?.addEventListener('click', () => {
    selectProject(activeIndex + 1, { scrollTab: true });
  });

  showcase.getActiveProject = () => ({ project: projects[activeIndex], index: activeIndex });
})();
