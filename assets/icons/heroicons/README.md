# Heroicons (Tailwind Labs)

Ikony SVG z [heroicons.com](https://heroicons.com), MIT.

## Ścieżki

- **24/outline/** – 324 ikon (obrys, 24×24)
- **24/solid/** – 324 ikon (wypełnienie, 24×24)

Nazwy plików: `kebab-case.svg` (np. `arrow-right.svg`, `check-circle.svg`).

## Użycie w projekcie

**Obrazek (szybkie):**
```html
<img src="./assets/icons/heroicons/24/outline/arrow-right.svg" alt="" aria-hidden="true" width="24" height="24">
```

**Inline SVG (kolor z CSS):**  
Skopiuj zawartość SVG do HTML. Aby ikona dziedziczyła kolor, w `<path>` zamień `stroke="#0F172A"` / `fill="#0F172A"` na `stroke="currentColor"` / `fill="currentColor"` i nadaj klasę (np. `class="icon"`). W CSS: `.icon { width: 1.5rem; height: 1.5rem; }`.

**Rozmiar:** viewBox 0 0 24 24 – skaluj przez `width`/`height` lub klasę (np. `w-6 h-6`).

Gdy ustalisz, gdzie ikony mają się pojawić, dopisz je w `index.html` (inline lub img) i ewentualnie do `ASSETS` w `sw.js` jeśli mają być offline.
