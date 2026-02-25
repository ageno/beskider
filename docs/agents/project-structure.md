# Project Structure & Module Organization

- Projekt jest zbudowany w **Jekyll**. Strona główna: `index.html` z `layout: home`; treść w `_includes/home-sections.html`. Style w `assets/css/main.css`.
- Layouty: `_layouts/default.html`, `page.html`, `home.html`, `post.html`. Nawigacja z `_data/navigation.yml`.
- `assets/js/app.js`, `tabnav.js`, `peek-gallery.js` – logika UI (taby, accordion, modale, theme toggle, cookie consent, nav).
- `sw.js` i `manifest.json` w root – PWA (precache w `ASSETS`), instalacja przez przeglądarkę.
- `assets/images/`, `assets/icons/`, `assets/fontawesome/` – obrazy, ikony PWA, Font Awesome. Ikony: `fa-solid fa-*` / `fa-brands fa-*`.
- **Ikony:** Font Awesome (free, lokalnie w `assets/fontawesome/`). Nowe ikony: `<i class="fa-solid fa-…">` lub `fa-brands fa-…`.
- `spec.md` – źródło prawdy; przy nowej sekcji lub linku w nav aktualizować §6 i ewentualnie §7.
