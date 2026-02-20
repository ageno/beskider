# Repository Guidelines

## Project Structure & Module Organization
- `index.html` contains the full page markup plus Tailwind component styles defined in the inline `<style type="text/tailwindcss">` block.
- `app.js` handles UI behavior (tabs, accordion, modals, theme toggle, cookie consent, nav).
- `sw.js` and `manifest.json` provide PWA: full offline (precache of page + all images in `ASSETS`), installable (manifest with 192/512 PNG icons; optional install banner via `beforeinstallprompt` in `app.js`).
- `assets/` stores static assets:
  - `assets/images/` for product and hero imagery.
  - `assets/icons/` for PWA icons; `assets/fontawesome/` for Font Awesome (lokally: `css/all.min.css`, `webfonts/`). Ikony: `fa-solid fa-*` / `fa-brands fa-*` (np. `<i class="fa-solid fa-star" aria-hidden="true"></i>`).
- **Ikony (definition of done):** W projekcie stosujemy **Font Awesome** (wersja free, zestaw lokalny w `assets/fontawesome/`). Nowe ikony dodawać jako `<i class="fa-solid fa-…">` lub `fa-brands fa-…` z tego zestawu. Spójność wizualna; brak ad-hoc SVG.
- `spec.md` is the product/design source of truth and must be updated with every change.
- Every new section or new nav link requires updating **spec.md §6 (Struktura informacji)** and, if needed, §7 (Nawigacja).

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
- Manual checks: navigation anchors (Sprzęt, Trasy, Zasady, FAQ, O nas, Kontakt), taby sprzętu (Wszystko/eMTB/Szosowe), taby trudności tras, accordion, modal focus/close, theme toggle, cookie consent flow, contact form (validation, checkbox regulaminu, Wyślij zapytanie), image loading (no cropping).
- Verify mobile layout for overflow and wrapping.
- Pełna checklista: [TESTING.md](TESTING.md).
- **Debug układu nawigacji (agent):** Aby agent mógł sam zebrać dane o layoutcie nav (szerokości, gap, flex), uruchomić w katalogu projektu: `npm install`, potem `python3 -m http.server 8000` (w tle), potem `npm run debug:nav`. Wynik w `.cursor/nav-layout-debug.json` – agent może go odczytać i zweryfikować hipotezy.

## Commit & Pull Request Guidelines
- Use short, imperative commit messages (e.g., `Refine equipment cards`).
- PRs should include a brief description plus desktop/mobile screenshots for visual changes.

## Configuration & Content Notes
- Nie używać zdjęć HDR w treściach ani zasobach (galeria, hero, karty itd.) – preferować naturalny wygląd.
- Gdy użytkownik poda URL zdjęcia lub innego zasobu do użycia w projekcie – pobrać go od razu (zapisać w `assets/`, ewentualnie wygenerować warianty), bez pytania „czy fetch?”.
- Uruchamiać potrzebne polecenia (np. curl, sips, serwer) od razu, bez pytania „czy uruchomić?” / „Run?”.
- Update `spec.md` whenever UI, content, or assets change.
- Bump `CACHE_VERSION` and refresh `ASSETS` in `sw.js` when adding/removing files.
- Adjust CSP if new external assets or scripts are introduced.

## Planowanie zmiany (checklist)

**Zmiana treści / UI** (np. nowa sekcja, nowy blok tekstu):
1. Zaktualizować **spec.md** (§6 IA, ewentualnie nowy podrozdział).
2. W **index.html**: dodać markup (istniejące komponenty: `section`, `section__head`, `rules-grid` / `rule-card`).
3. Jeśli nowa sekcja – dodać link w nav.
4. **sw.js**: tylko jeśli dodane/usunięte pliki w `ASSETS`; ewentualnie bump `data-build`.
5. **spec.md**: dopisać copy w odpowiednim paragrafie (lub w content inventory).

**Nowa funkcja** (np. formularz, kalendarz):
1. Spec: rozszerzyć §4 (zakres), §6 (IA jeśli nowa sekcja), nowy § lub punkt w §27.
2. Backlog: rozbić na podzadania (markup, JS, walidacja, dostępność).
3. Po wdrożeniu: CHANGELOG + ewentualnie README/AGENTS jeśli nowe skrypty lub zależności.
