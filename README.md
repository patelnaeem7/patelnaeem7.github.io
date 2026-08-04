# Naeem Patel — Portfolio

A production-oriented, single-page portfolio for Naeem Patel, a Web Designer & Developer based in Bolton, United Kingdom. The site presents design, front-end engineering, PHP/MySQL systems, native Android work and technical SEO as one connected practice.

The project is intentionally dependency-free: there is no package manager, framework, build step or server-side requirement.

## Technology stack

- Semantic HTML5
- Modern CSS with custom properties, Grid, Flexbox and responsive container sizing
- Vanilla JavaScript and native browser APIs
- `IntersectionObserver` for progressive entrance and active-section enhancement
- Native `<dialog>` for accessible case studies
- Local SVG interface and portrait placeholders
- JSON-LD, Open Graph, sitemap, robots and web-manifest metadata

## File structure

```text
/
├── index.html
├── 404.html
├── README.md
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── favicon.svg
├── assets/
│   ├── css/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   ├── components.css
│   │   ├── sections.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── main.js
│   │   ├── navigation.js
│   │   ├── projects.js
│   │   └── dialogs.js
│   ├── images/
│   │   ├── placeholders/
│   │   └── projects/
│   └── documents/
└── docs/
    └── CONTENT-CHECKLIST.md
```

## Run locally

The simplest preview is to open `index.html` directly in a modern browser. All site assets use relative paths and the core site works under the `file://` protocol.

For a hosting-like local preview, run the included dependency-free server from the repository root:

```powershell
node scripts/preview.mjs
```

Then visit `http://localhost:8000/`. Stop the server with `Ctrl+C`.

Python's built-in server is an equivalent alternative if Python is installed: `python -m http.server 8000`.

No installation or build command is required.

## Customise content

### Contact details and CV

Open `assets/js/main.js` and update `PORTFOLIO_CONFIG`:

```js
window.PORTFOLIO_CONFIG = Object.freeze({
  email: 'you@example.com',
  linkedin: 'https://www.linkedin.com/in/your-profile',
  github: 'https://github.com/your-profile',
  cv: 'assets/documents/naeem-patel-cv.pdf',
  canonicalUrl: 'https://your-domain.example/'
});
```

Copy the final PDF to `assets/documents/naeem-patel-cv.pdf`. Until values are added, placeholder contact and CV actions are intercepted and explained to the visitor rather than opening a broken destination.

The canonical URL is also present in HTML and SEO files; use the checklist below to update every launch occurrence.

### Text content

Most page copy lives in `index.html`. Edit the semantic section that matches the content: `#work`, `#expertise`, `#experience`, `#about` or `#contact`. Keep the single `<h1>` and the existing heading order.

### Projects

Project content lives in the `projects` array in `assets/js/projects.js`. Each object controls the showcase and case-study dialog:

- `title`, `category` and `summary`
- `role`, `problem`, `decisions`, `implementation` and `outcome`
- `technologySummary` and `technologies`
- `image` and `imageAlt`
- `repositoryUrl` and `liveUrl`

The four tab labels are intentionally present in `index.html` so they remain navigable and understandable without JavaScript. If a project title or category changes, update its corresponding tab label there too. To add a fifth project, add one object and one tab button using the same `data-project-index`, ID and ARIA pattern.

### Placeholder assets

Replace project files in `assets/images/projects/` with genuine screenshots. You may keep the filenames to avoid code changes, or change each project object's `image` path. Prefer responsive AVIF or WebP exports for photographic or screenshot-heavy assets, preserve a 3:2 source ratio where possible, and keep accurate alt text.

Replace `assets/images/placeholders/portrait-placeholder.svg` with an optimised professional portrait and update the `src`, dimensions and alt text in `index.html`.

Replace `assets/images/placeholders/social-preview.svg` with a final 1200 × 630 social image, then update the Open Graph and Twitter/X image URLs in `index.html`.

## Design system

Colours, typography, spacing, page width, radii and motion timing are centralised in `assets/css/tokens.css`. Component-level behaviour lives in `components.css`, larger page compositions live in `sections.css`, and breakpoint changes live in `responsive.css`.

The signal-green colour is used selectively. If the palette changes, verify text/background pairs against WCAG AA before launch.

## Deployment

### GitHub Pages

1. Push the repository to GitHub.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the production branch (normally `main`) and the `/ (root)` folder.
5. Save, then update all `example.com` placeholders to the generated Pages URL or custom domain.

Because the site has no build step, GitHub Pages can publish the repository root directly.

### Cloudflare Pages

1. In Cloudflare, create a Pages project and connect the Git repository.
2. Choose **None** or a static HTML preset for the framework.
3. Leave the build command empty.
4. Set the output directory to `/` (the repository root).
5. Deploy, then replace metadata placeholders with the final Pages or custom-domain URL.

If the interface requires an output value, use `.` for the output directory.

### Netlify

1. Import the repository as a new site.
2. Leave the build command empty.
3. Set the publish directory to `.`.
4. Deploy, then update all canonical, Open Graph, sitemap and robots URLs.

You can also drag the repository folder into Netlify Drop for a temporary preview, but a connected Git deployment is easier to maintain.

### Connect a custom domain

1. Add the domain in the selected host's domain settings.
2. Apply the DNS records supplied by that host.
3. Wait for DNS and TLS/SSL status to become active.
4. Choose one canonical hostname (`www` or apex) and redirect the other.
5. Replace every `https://example.com/` occurrence with the canonical production URL.
6. Submit the production sitemap to Google Search Console and Bing Webmaster Tools.

## Pre-launch checklist

- Complete every item in `docs/CONTENT-CHECKLIST.md`.
- Replace all contact, CV, portrait, screenshot and project-link placeholders.
- Replace the canonical domain in HTML, JSON-LD, `robots.txt` and `sitemap.xml`.
- Create a final social preview image and test its crop on common platforms.
- Verify every statement, role, date and project description with Naeem.
- Confirm the CV filename and download response on the production host.
- Add a privacy notice if analytics, a contact endpoint or tracking is introduced.
- Run HTML, CSS, accessibility and performance audits against the production URL.
- Test the `404.html` handling configured by the selected host.

## Testing checklist

- Check layouts at 1440, 1024, 768, 390 and 320 CSS pixels.
- Navigate the entire page with Tab, Shift+Tab, Enter, Space and arrow keys.
- Open and close the mobile menu using its button, a navigation choice and Escape.
- Use arrow keys, Home and End on the project tabs.
- Open every case study, close it with the button, Escape and backdrop, and verify focus returns.
- Enable reduced motion and confirm content remains visible and immediately usable.
- Disable JavaScript and confirm core navigation, first-project content and the other-project summary remain available.
- Check zoom at 200% and 400% without horizontal page overflow.
- Confirm colour contrast and visible focus indication.
- Confirm images have appropriate alt text and decorative content is ignored.
- Validate the final HTML, JSON-LD, sitemap and manifest.
- Run Lighthouse or an equivalent production audit after deployment.

## Static contact form note

The current contact area deliberately uses an email action instead of a form because the project has no backend. If a form is added later, connect it to a real endpoint, include server-side validation and spam controls, present accessible success/error states, and update the privacy information. Do not show a success message unless the endpoint confirms delivery.
