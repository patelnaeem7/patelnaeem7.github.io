# Content and launch checklist

Complete every item below before publishing the portfolio as a production site.

## Identity and contact

- [x] Add the real email address to `PORTFOLIO_CONFIG.email` in `assets/js/main.js`.
- [x] Add the full LinkedIn URL to `PORTFOLIO_CONFIG.linkedin`.
- [x] Add the full GitHub URL to `PORTFOLIO_CONFIG.github`.
- [x] Confirm “Bolton, United Kingdom” is the preferred public location.
- [x] Confirm the current availability statement.

## CV

- [ ] Add the final, proofread file as `assets/documents/naeem-patel-cv.pdf`.
- [x] Set `PORTFOLIO_CONFIG.cv` to `assets/documents/naeem-patel-cv.pdf`.
- [ ] Confirm the CV period “October 2024 – Present” matches the final document.
- [ ] Test every Download CV action after deployment.

## Portrait and imagery

- [x] Replace `assets/images/placeholders/portrait-placeholder.webp` with a genuine, optimised professional portrait.
- [x] Update the portrait `src`, `width`, `height` and alt text in `index.html` if the filename or dimensions change.
- [ ] Replace all four conceptual files in `assets/images/projects/` with genuine, authorised project screenshots.
- [ ] Keep the current filenames or update each project's `image` value in `assets/js/projects.js`.
- [ ] Update every project's `imageAlt` description to match the genuine screenshot.
- [ ] Remove the “Replace with genuine project screenshot” and gallery placeholder labels once genuine assets are present.
- [ ] Replace `assets/images/placeholders/social-preview.svg` with a final 1200 × 630 social card.

## Project verification and links

- [ ] Verify every Fusion Care statement and confirm what may be shown publicly.
- [ ] Verify every Bilal Jamia Masjid feature and confirm deployment status.
- [ ] Verify the CMS and business-integration examples.
- [ ] Verify the technical SEO tool list and outcome wording.
- [ ] Add appropriate repository URLs to each `repositoryUrl` field in `assets/js/projects.js`; leave private repositories blank.
- [ ] Add appropriate live URLs to each `liveUrl` field; leave non-public projects blank.
- [ ] Replace placeholder gallery crops with deliberate project-specific images if multiple screenshots are available.

## Domain and SEO metadata

The intended domain, `https://naeem-patel.is-a.dev/`, redirected to the is-a.dev availability page during the 4 August 2026 audit. Keep the documented `example.com` values until the domain serves this portfolio, then replace every occurrence together.

- [ ] Replace every `https://example.com/` occurrence in `index.html`.
- [ ] Replace the `ProfilePage.url` and `Person.url` placeholders in the JSON-LD block in `index.html`.
- [x] Confirm the `sameAs` LinkedIn and GitHub URLs in the JSON-LD block.
- [ ] Replace the canonical URL in `robots.txt`.
- [ ] Replace the `<loc>` domain in `sitemap.xml` and update `<lastmod>` on launch.
- [ ] Update `PORTFOLIO_CONFIG.canonicalUrl` in `assets/js/main.js` for consistency.
- [ ] Update Open Graph and Twitter/X image URLs to the final social image.
- [ ] Confirm the production host serves the correct MIME type for `site.webmanifest`.
- [ ] Test the structured data with a recognised schema validator.
- [ ] Submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Final quality checks

- [ ] Test first-visit system theme detection in both light and dark modes.
- [ ] Test both manual theme choices across refresh and a new browser session.
- [ ] Test with site storage blocked and confirm theme controls remain usable without errors.
- [ ] Test the CSS system-theme fallback with JavaScript disabled.
- [ ] Confirm the browser theme colour and 404 page follow the active theme.
- [ ] Confirm there is no flash of the wrong theme on a cold load.
- [ ] Review all copy for accuracy, confidentiality and UK English.
- [ ] Test keyboard navigation, mobile menu focus, project tab arrows and dialog focus restoration.
- [ ] Test at 1440, 1024, 768, 390 and 320 CSS pixels.
- [ ] Test 200% and 400% zoom and large text settings.
- [ ] Test with reduced motion enabled.
- [ ] Test without JavaScript.
- [ ] Run an accessibility check and a manual screen-reader pass.
- [ ] Run HTML, CSS, link and JSON-LD validation on the deployed URL.
- [ ] Run Lighthouse performance, accessibility, best-practices and SEO audits on production.
- [ ] Test social sharing previews after the final domain is live.
- [ ] Confirm the host serves `404.html` for unknown routes.

## Optional future contact endpoint

There is no form because this static site has no message-processing backend. If one is introduced:

- [ ] Choose and document the real endpoint.
- [ ] Add server-side validation, rate limiting and spam protection.
- [ ] Add explicit accessible success and error feedback.
- [ ] Add a privacy notice stating what is collected and why.
- [ ] Do not claim a message was sent until the server confirms it.
