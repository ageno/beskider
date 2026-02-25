# Testing Guidelines

- No automated tests currently.
- Manual checks: navigation anchors (Sprzęt, Trasy, Zasady, FAQ, O nas, Kontakt), taby sprzętu (Wszystko/eMTB/Szosowe), taby trudności tras, accordion, modal focus/close, theme toggle, cookie consent flow, contact form (validation, checkbox regulaminu, Wyślij zapytanie), image loading (no cropping).
- Verify mobile layout for overflow and wrapping.
- Pełna checklista: [TESTING.md](../../TESTING.md).
- **Debug układu nawigacji (agent):** Aby agent mógł sam zebrać dane o layoutcie nav (szerokości, gap, flex), uruchomić w katalogu projektu: `npm install`, potem `python3 -m http.server 8000` (w tle), potem `npm run debug:nav`. Wynik w `.cursor/nav-layout-debug.json` – agent może go odczytać i zweryfikować hipotezy.
