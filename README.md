# Beskider

Statyczna strona dla premium wypozyczalni MTB. Offline-ready PWA, dark/light, galeria i modale.

## Struktura projektu
- `index.html` - pelny markup + skompilowane style inline.
- `app.js` - logika UI (tabs, FAQ/accordion, modale, theme toggle, cookie consent, nawigacja).
- `sw.js` - Service Worker i cache offline.
- `manifest.json` - manifest PWA.
- `assets/` - obrazy i ikony.

## Uruchomienie lokalne
```bash
python3 -m http.server
```
Otworz `http://localhost:8000`.

## Cache i wersjonowanie
- Wersja cache pochodzi z `data-build` w `<html>`.
- Format: `YYYY-MM-DD-HHMM` (np. `2026-01-11-1016`).
- Przy kazdym commicie ustaw nowa wartosc `data-build`, zeby wymusic nowa wersje SW.
- Po dodaniu/usunieciu assetow zaktualizuj `ASSETS` w `sw.js`.
- Po zmianach zrob hard refresh, aby podmienic cache SW.

## Obrazy i srcset
- Trzymaj warianty `*-320.jpg`, `*-640.jpg`, `*-1280.jpg`.
- Uzywaj `srcset` + `sizes` w `index.html` dla kazdego obrazu.
- Nazwy plikow: lowercase, myslniki.

## Rowery szosowe – zdjecia
Kategoria „Rowery Szosowe” wymaga zdjec w `assets/images/`:
- **Tarmac SL8:** `tarmac-sl8-1.jpg` oraz `tarmac-sl8-1-320.jpg`, `tarmac-sl8-1-640.jpg`, `tarmac-sl8-1-1280.jpg`
- **Aethos:** `aethos-1.jpg` oraz `aethos-1-320.jpg`, `aethos-1-640.jpg`, `aethos-1-1280.jpg`

**Wazne:** Obecne pliki to placeholdery (zdjecie e-MTB) – zobaczysz zly rower. Zeby miec poprawne zdjecia Tarmac SL8 i Aethos, postepuj wedlug instrukcji w **[scripts/fetch-road-bike-images.md](scripts/fetch-road-bike-images.md)** (zapis zdjec z przegladarki + wygenerowanie 320/640/1280).

## Ikony
- Zrodlo: `assets/icons/icon.svg`.
- PNG 192/512 uzywane w `manifest.json`.

## Checklist po zmianach
- Nawigacja i aktywne podkreslenie.
- Tabs i FAQ/accordion.
- Modale i focus trap.
- Dark/light toggle.
- Cookie consent flow.
- Obrazy bez niechcianego cropu, poprawny `srcset`.
- Mobile: brak overflow i poprawne lamanie tekstu.
