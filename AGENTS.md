# Repository Guidelines

## Project Structure & Module Organization
- Projekt jest zbudowany w **Jekyll**. Strona główna: `index.html` z `layout: home`; treść w `_includes/home-sections.html`. Style w `assets/css/main.css`.
- Layouty: `_layouts/default.html`, `page.html`, `home.html`, `post.html`. Nawigacja z `_data/navigation.yml`.
- `assets/js/app.js`, `tabnav.js`, `peek-gallery.js` – logika UI (taby, accordion, modale, theme toggle, cookie consent, nav).
- `sw.js` i `manifest.json` w root – PWA (precache w `ASSETS`), instalacja przez przeglądarkę.
- `assets/images/`, `assets/icons/`, `assets/fontawesome/` – obrazy, ikony PWA, Font Awesome. Ikony: `fa-solid fa-*` / `fa-brands fa-*`.
- **Ikony:** Font Awesome (free, lokalnie w `assets/fontawesome/`). Nowe ikony: `<i class="fa-solid fa-…">` lub `fa-brands fa-…`.
- `spec.md` – źródło prawdy; przy nowej sekcji lub linku w nav aktualizować §6 i ewentualnie §7.

## Build, Test, and Development Commands
- **Lokalny serwer Jekyll:** `bundle install` → `bundle exec jekyll serve` (http://localhost:4000).
- **Build:** `bundle exec jekyll build` (output w `_site/`).
- **Agent:** Po każdej zmianie w plikach Jekylla (layouty, _includes, _data, _config.yml, strony .html/.md, _posts) uruchomić `bundle exec jekyll build` w katalogu projektu (z `eval "$(rbenv init -)"` jeśli rbenv), żeby _site/ było aktualne.
- **Start pracy nad projektem:** Zalecane uruchomienie `bundle exec jekyll serve` na początku sesji (w tle). Strona na http://localhost:4000 odświeża się przy zapisie plików. Agent może zaproponować lub uruchomić serve, gdy użytkownik zaczyna pracę nad stroną.
- PWA: hard-refresh po zmianach, sprawdzić aktualizację Service Workera (`sw.js`).

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
- **Przed push:** Gdy użytkownik prosi o push (np. „zrób push”, „wypchnij zmiany”), najpierw uruchomić `bundle exec jekyll build`, potem wykonać git add / commit / push – żeby w repozytorium trafił aktualny _site/.

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
2. W **_includes/home-sections.html** (strona główna) lub w odpowiednim layoutzie: dodać markup (section, section__head, rules-grid / rule-card).
3. Jeśli nowa sekcja – dodać link w `_data/navigation.yml` i ewentualnie w stopce.
4. **sw.js**: tylko jeśli dodane/usunięte pliki w `ASSETS`.
5. **spec.md**: dopisać copy w odpowiednim paragrafie.

**Nowa funkcja** (np. formularz, kalendarz):
1. Spec: rozszerzyć §4 (zakres), §6 (IA jeśli nowa sekcja), nowy § lub punkt w §27.
2. Backlog: rozbić na podzadania (markup, JS, walidacja, dostępność).
3. Po wdrożeniu: CHANGELOG + ewentualnie README/AGENTS jeśli nowe skrypty lub zależności.
