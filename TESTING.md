# Manual testing checklist

Użyj przed release’em. Docelowe wartości Lighthouse: [spec.md §24](spec.md).

---

## Nawigacja

- [ ] Linki anchor (Sprzęt, Trasy, Zasady, FAQ, O nas, Kontakt) przewijają do właściwych sekcji
- [ ] Aktywna zakładka w nav podświetlona (podkreślenie)
- [ ] Mobile: hamburger otwiera/zamyka menu
- [ ] Mobile: focus trap w otwartym menu (Tab nie ucieka poza menu)
- [ ] Widoczne stany focus na linkach i przyciskach

---

## Sekcja Sprzęt

- [ ] Taby: Wszystko / Rowery eMTB / Rowery Szosowe (filtr; coming soon disabled)
- [ ] Przy „Wszystko” widoczne obie kategorie (eMTB + Szosowe)
- [ ] Karty produktów: ceny, status (Dostępny), rozmiar, etykieta typu (eMTB / Road)
- [ ] Sticky tablist przy przewijaniu sekcji

## Sekcja Trasy

- [ ] Filtry trudności: Wszystko / Bardzo łatwa / Łatwa / Średnia / Trudna / Bardzo trudna
- [ ] Po wyborze filtra widoczne tylko karty o danej trudności
- [ ] Karty tras: nazwa, opis, label trudności, długość, spadek %, obniżenie (m)
- [ ] Sticky tablist przy przewijaniu sekcji Trasy

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

## Sekcja Kontakt (formularz)

- [ ] Formularz: bloki Dane wypożyczającego, Adres rozliczeniowy, Wiadomość, Warunki; przycisk „Wyślij zapytanie”
- [ ] Walidacja: pole puste/wyjście z pola (blur) – komunikat błędu pod polem, czerwony obrys i ikona wykrzyknik; poprawne – zielona ikona check
- [ ] Komunikat „Wprowadzona ilość znaków jest niepoprawna” przy niepoprawnej długości (np. Imię/Nazwisko)
- [ ] Checkbox regulaminu wymagany; przycisk „Ogólne Warunki regulaminu serwisu” otwiera modal Regulamin
- [ ] Submit przy błędach: focus na pierwszym polu z błędem; przy poprawnej walidacji: otwarcie mailto z danymi
- [ ] Panel „Świetny wybór!” po prawej (desktop) / pod formularzem (mobile): nagłówek + 4 punkty z zieloną ikoną check

---

## Zasady i FAQ

- [ ] Sekcja Zasady: wszystkie karty widoczne (Doba, Bezpieczeństwo, Modyfikacje, Regulamin, Kaucja/depozyt, Udział własny, Weryfikacja, Odmowa wynajmu), tytuły pogrubione
- [ ] FAQ: accordion otwiera/zamyka odpowiedzi; pytanie „Dlaczego jesteście drożsi niż konkurencja?” z odpowiedzią

## Inne

- [ ] Brak błędów w konsoli JS
- [ ] Mobile: brak poziomego overflow, teksty się łamią
- [ ] `prefers-reduced-motion`: animacje respektowane (jeśli zaimplementowane)
