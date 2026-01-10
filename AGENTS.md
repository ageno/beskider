# Repository Guidelines

## Project Structure & Module Organization
- `index.html` is the single-page app markup and source of truth for content.
- `style.css` contains all styling and design tokens (CSS custom properties).
- `app.js` provides interaction logic (tabs, modals, gallery, theme toggle, consent).
- `sw.js` and `manifest.json` implement PWA behavior and offline caching.
- `assets/` stores static assets:
  - `assets/images/` for product imagery.
  - `assets/icons/` for PWA icons.
- `spec.md` is the product/design specification and must be kept current.

## Build, Test, and Development Commands
This is a static site with no build step.
- Local preview: `python3 -m http.server` (serve the repo root, then open `http://localhost:8000`).
- PWA sanity check: hard-refresh and verify Service Worker updates (see `sw.js`).

## Coding Style & Naming Conventions
- Indentation: 2 spaces in HTML/CSS/JS.
- Use CSS custom properties for colors, spacing, and radii; prefer 8px grid multiples.
- File naming: lowercase with hyphens (e.g., `turbo-levo-3-expert-1.webp`).
- Keep JavaScript minimal and framework-free; no inline scripts (per `spec.md`).

## Testing Guidelines
- No automated tests currently.
- Manual checks: navigation anchors, modal focus/close, gallery swap, theme toggle, offline mode.
- Verify images load from `assets/images/` and remain uncropped.

## Commit & Pull Request Guidelines
- No strict commit convention observed. Use short, imperative summaries (e.g., `Tighten hero spacing`).
- PRs should include:
  - A short description of UI/UX changes.
  - Screenshots for visual changes (desktop + mobile).
  - Notes on any `spec.md` updates.

## Configuration & Content Notes
- Update `spec.md` whenever design, assets, or requirements change.
- Bump `CACHE_VERSION` in `sw.js` when asset files change to refresh caches.
