# Beskider

Statyczna strona dla premium wypożyczalni MTB. Offline-ready PWA, dark/light, galeria i modale.

## Struktura projektu
- `index.html` – pełny markup + skompilowane style inline.
- `app.js` – logika UI (taby sprzętu i tras, FAQ/accordion, modale, theme toggle, cookie consent, nawigacja).
- `sw.js` – Service Worker i cache offline.
- `manifest.json` – manifest PWA.
- `assets/` – obrazy i ikony.
- `spec.md` – specyfikacja (IA, design system, wymagania).

## Uruchomienie lokalne
```bash
python3 -m http.server
```
Otwórz `http://localhost:8000`.

## Cache i wersjonowanie
- Wersja cache pochodzi z `data-build` w `<html>`.
- Format: `YYYY-MM-DD-HHMM` (np. `2026-01-11-1016`).
- Przy każdym commicie ustaw nową wartość `data-build`, żeby wymusić nową wersję SW.
- Po dodaniu/usunięciu assetów zaktualizuj `ASSETS` w `sw.js`.
- Po zmianach zrób hard refresh, aby podmienić cache SW.

## Obrazy i srcset
- Trzymaj warianty `*-320.jpg`, `*-640.jpg`, `*-1280.jpg`.
- Używaj `srcset` + `sizes` w `index.html` dla każdego obrazu.
- Nazwy plików: lowercase, myślniki.

## Sekcje
- **Sprzęt:** filtr Wszystko / Rowery eMTB / Rowery Szosowe (sticky taby), karty z etykietą typu (eMTB/Road) i statusem (Dostępny).
- **Trasy:** 15 tras z Enduro Trails (Bielsko-Biała), filtry po trudności (Wszystko, Bardzo łatwa–Bardzo trudna).
- **Zasady:** Doba, Zastaw 8000 zł, Bezpieczeństwo, Regulamin, Kaucja/depozyt 5000 zł, Udział własny, Weryfikacja.
- **Nawigacja:** Sprzęt, Trasy, Zasady, FAQ, O nas, Kontakt.

## Rowery szosowe – zdjęcia
- **Tarmac SL8:** `tarmac-sl8-1.jpg` + warianty 320/640/1280 w `assets/images/`.
- **Aethos:** `aethos-hero-white-bg.jpg` (jedno zdjęcie z białym tłem). Opcjonalnie warianty wg [scripts/fetch-road-bike-images.md](scripts/fetch-road-bike-images.md).

## Ikony
- **PWA:** `assets/icons/icon.svg`, PNG 192/512 w `manifest.json`.
- **Heroicons:** `assets/icons/heroicons/24/outline/` i `24/solid/` (324 SVG w każdej wersji). Instrukcja: [assets/icons/heroicons/README.md](assets/icons/heroicons/README.md).

## Checklist po zmianach
- Nawigacja (Sprzęt, Trasy, Zasady, FAQ, O nas, Kontakt) i aktywne podkreślenie.
- Taby sprzętu (Wszystko / eMTB / Szosowe) i taby trudności tras.
- FAQ/accordion.
- Modale i focus trap.
- Dark/light toggle.
- Cookie consent flow.
- Obrazy bez niechcianego cropu, poprawny `srcset`.
- Mobile: brak overflow i poprawne łamanie tekstu.
