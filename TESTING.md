# Manual testing checklist

Użyj przed release’em. Docelowe wartości Lighthouse: [spec.md §24](spec.md).

---

## Nawigacja

- [ ] Linki anchor (Sprzęt, Zasady, FAQ, O nas, Kontakt) przewijają do właściwych sekcji
- [ ] Aktywna zakładka w nav podświetlona (podkreślenie)
- [ ] Mobile: hamburger otwiera/zamyka menu
- [ ] Mobile: focus trap w otwartym menu (Tab nie ucieka poza menu)
- [ ] Widoczne stany focus na linkach i przyciskach

---

## Sekcja Sprzęt

- [ ] Taby: przełączanie między Rowery / Narty / Snowboard / Inne (coming soon disabled)
- [ ] Karty produktów: ceny, status (Dostępny / Wypożyczony), rozmiar
- [ ] Klik „Zobacz specyfikację” otwiera modal produktu
- [ ] Modal: ESC zamyka, focus trap, scroll wewnątrz modalu
- [ ] Zamknięcie modalu przyraca focus do przycisku

---

## Theme toggle

- [ ] Przełącznik dark/light zmienia motyw
- [ ] Wybór zapisany w localStorage (odświeżenie strony zachowuje motyw)
- [ ] Ikona: księżyc w light, słońce w dark

---

## Cookie consent

- [ ] Baner wyświetla się (jeśli brak zgody)
- [ ] Akceptuj: baner znika, GA4 (jeśli skonfigurowane) może ładować
- [ ] Odrzuć: baner znika, brak GA4 po odrzuceniu
- [ ] Ustawienia (jeśli dostępne): wybór zapisany

---

## Obrazy

- [ ] `srcset` używany dla zdjęć (warianty 320 / 640 / 1280)
- [ ] Brak niechcianego kadrowania (object-fit / layout zgodny ze spec)
- [ ] Lazy loading dla obrazów poniżej foldu
- [ ] Galeria w modalu produktu: miniatury i duży obraz ładują się poprawnie

---

## PWA

- [ ] Strona działa offline (po pierwszym wejściu)
- [ ] Instalacja PWA dostępna (np. pasek przeglądarki lub menu)
- [ ] Po zmianie `sw.js` / `data-build`: hard refresh powoduje aktualizację SW

---

## Lighthouse (mobile)

Uruchom w DevTools (Lighthouse, tryb mobile). Docelowe wartości ze [spec.md §24](spec.md):

- [ ] Performance ≥ 95
- [ ] Accessibility = 100
- [ ] Best Practices ≥ 95
- [ ] SEO ≥ 90
- [ ] PWA: wszystkie wymagane audyty zaliczone

---

## Inne

- [ ] Brak błędów w konsoli JS
- [ ] Mobile: brak poziomego overflow, teksty się łamią
- [ ] `prefers-reduced-motion`: animacje respektowane (jeśli zaimplementowane)
