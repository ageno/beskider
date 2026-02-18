# Heroicons (lokální zestaw)

Pełny zestaw **Heroicons** v2.2.0 (Tailwind Labs) do użytku lokalnego w projekcie.  
Źródło: [heroicons.com](https://heroicons.com) | [GitHub](https://github.com/tailwindlabs/heroicons)  
Licencja: MIT (plik `LICENSE` w tym katalogu).

## Struktura

- **24/outline** – ikony 24×24, styl outline (stroke), ~324 ikon
- **24/solid** – ikony 24×24, styl solid (fill), ~324 ikon
- **20/solid** – ikony 20×20, styl solid
- **16/solid** – ikony 16×16, styl solid

Nazwy plików: `nazwa-ikony.svg` (np. `envelope.svg`, `map-pin.svg`, `arrow-top-right-on-square.svg`).

## Użycie w projekcie

### 1. Obrazek (img)

```html
<img src="./assets/icons/heroicons/24/outline/envelope.svg" alt="" width="24" height="24" class="icon" aria-hidden="true">
```

W CSS: `.icon { color: currentColor; }` – oryginalnie ikony mają `stroke="#0F172A"`; żeby dziedziczyły kolor, wklej zawartość SVG inline i zamień na `stroke="currentColor"` (patrz niżej).

### 2. Inline SVG (zalecane – kolor przez `currentColor`)

Skopiuj zawartość pliku SVG do HTML. Zamień `stroke="#0F172A"` na `stroke="currentColor"` (outline) lub `fill="#0F172A"` na `fill="currentColor"` (solid). Usuń lub zostaw atrybuty `width`/`height` – rozmiar ustaw w CSS.

```html
<span class="contact-card__icon" aria-hidden="true">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21.75 6.75V17.25C21.75 18.4926 ..."/>
  </svg>
</span>
```

### 3. Które ikony są dostępne

Pełna lista: [heroicons.com](https://heroicons.com) → wybierz Outline lub Solid, 24px. Nazwa na stronie (np. „Envelope”) = plik `envelope.svg`.

## Aktualizacja zestawu

Pobierz nową wersję z [Releases](https://github.com/tailwindlabs/heroicons/releases), rozpakuj i skopiuj katalogi `src/24/outline`, `src/24/solid`, `src/20/solid`, `src/16/solid` do `assets/icons/heroicons/` (zachowaj strukturę).
