# Zadania (todo)

Plan bieżącej sesji / zadania. Zgodnie z AGENTS.md: plan najpierw, checklista z mierzalnymi punktami, weryfikowalne punkty.

---

## Bieżący plan

- [ ] …

---

## Przegląd (po zakończeniu)

- **Zadanie: Usunięcie HDR, wymuszenie SDR (sRGB)**  
  - **Obrazy:** Przekonwertowano **67** plików (jpg, png) w `assets/images/`, `assets/icons/`, `assets/refs/` do profilu sRGB przez `sips -m "sRGB Profile.icc"`. **3 pliki WebP** (beskider-plus-cta-*.webp) nie są obsługiwane przez sips do zapisu; do ich konwersji służy skrypt `scripts/convert-webp-avif-srgb.sh` (wymaga ImageMagick).  
  - **CSS:** W projekcie nie było użyć `color(display-p3 …)`, `lab()`, `lch()`, `oklab()`, `oklch()` – nic do zamiany. Dodano globalne wymuszenie sRGB: w `assets/css/main.css` na początku pliku blok `html { color-gamut: srgb; }`.  
  - **Wideo:** W repozytorium brak plików wideo – brak działań.  
  - **Dokumentacja:** Zaktualizowano `docs/agents/config-and-content.md` (SDR/sRGB only, instrukcje konwersji).  
  - **Przetestowane:** Brak Display-P3 w CSS; `color-gamut: srgb` w main.css; obrazy w assets z profilem sRGB (po sips).  
  - **Ograniczenia:** WebP/AVIF wymagają ImageMagick do konwersji sRGB na tym etapie.
