# Repository Guidelines

## Project Structure & Module Organization
- `index.html` contains the full page markup plus Tailwind component styles defined in the inline `<style type="text/tailwindcss">` block.
- `app.js` handles UI behavior (tabs, accordion, modals, theme toggle, cookie consent, nav).
- `sw.js` and `manifest.json` provide PWA/offline support.
- `assets/` stores static assets:
  - `assets/images/` for product and hero imagery.
  - `assets/icons/` for PWA icons.
- `spec.md` is the product/design source of truth and must be updated with every change.

## Build, Test, and Development Commands
This is a static site with no build step.
- Local preview: `python3 -m http.server` (serve repo root, open `http://localhost:8000`).
- PWA sanity: hard-refresh after changes and confirm Service Worker updates (`sw.js`).

## Coding Style & Naming Conventions
- Indentation: 2 spaces in HTML/CSS/JS.
- Styling: prefer Tailwind utilities and component classes defined in `index.html` via `@layer`.
- Spacing/radius: keep to 8px grid multiples; avoid ad-hoc values.
- File naming: lowercase with hyphens (e.g., `turbo-levo-3-comp-1.jpg`).
- Keep JS minimal and framework-free; use `data-` attributes for hooks.

## Testing Guidelines
- No automated tests currently.
- Manual checks: navigation anchors, tabs, accordion behavior, modal focus/close, theme toggle,
  cookie consent flow, and image loading (no cropping).
- Verify mobile layout for overflow and wrapping.

## Commit & Pull Request Guidelines
- Use short, imperative commit messages (e.g., `Refine equipment cards`).
- PRs should include a brief description plus desktop/mobile screenshots for visual changes.

## Configuration & Content Notes
- Update `spec.md` whenever UI, content, or assets change.
- Bump `CACHE_VERSION` and refresh `ASSETS` in `sw.js` when adding/removing files.
- Adjust CSP if new external assets or scripts are introduced.
