# SPEC.md
## Beskider – wypożyczalnia sprzętu sportowego
Wersja: 1.0 (rozszerzona)
Data: 2026-01-10

---

## 1. Wprowadzenie

Dokument SPEC.md definiuje kompletne wymagania funkcjonalne, niefunkcjonalne, UX, techniczne oraz prawne dla projektu **Beskider – wypożyczalnia sprzętu sportowego**.  
Dokument jest źródłem prawdy dla projektowania, developmentu, testów i dalszego rozwoju.

Projekt realizowany jest jako **statyczna aplikacja PWA**, bez backendu, z myślą o przyszłej rozbudowie.

---

## 2. Cele biznesowe

- Budowa wizerunku premium (Apple-like)
- Maksymalna prostota obsługi
- Jasna prezentacja oferty i zasad
- Gotowość pod przyszłe kategorie sprzętu
- Wysoka wydajność i dostępność
- Brak kosztów utrzymania backendu (na start)

---

## 3. Grupa docelowa

- Klienci indywidualni 18+
- Klienci świadomi technicznie
- Użytkownicy mobile-first
- Turyści i lokalni użytkownicy sprzętu sportowego
- Osoby oczekujące jakości premium

---

## 4. Zakres projektu

### 4.1 W zakresie
- One-page website
- PWA (offline, installable)
- Prezentacja oferty rowerów MTB
- Ceny prezentowane na kartach produktów
- Zasady wypożyczeń
- FAQ
- Regulamin i polityka prywatności
- GA4 + consent mode
- Dark / Light mode
- WCAG 2.2 AA

### 4.2 Poza zakresem (MVP)
- Rezerwacje online
- Płatności
- Panel administracyjny
- Logika dostępności czasowej
- CMS

---

## 5. Architektura aplikacji

- Typ: Static Web App + PWA
- Hosting: GitHub Pages
- Backend: brak
- Dane: statyczne (HTML)
- Logika: Vanilla JS
- Stylowanie: Tailwind CSS (CDN) + komponenty utility-first

---

## 6. Struktura informacji (IA)

Sekcje:
- Navigation
- Hero
- Sprzęt (kategorie + produkty)
- CTA
- Zasady
- FAQ
- O nas
- Kontakt
- Stopka
- Modale: Produkt, Regulamin, Polityka

---

## 7. Nawigacja

- Sticky
- Glassmorphism:
  - backdrop-filter: blur()
  - półprzezroczyste tło
- Anchor links (smooth scroll)
- Mobile:
  - hamburger
  - focus trap
- Dark/Light toggle:
  - localStorage
  - inline SVG (ikona bez tekstu)
- WCAG:
  - aria-labels
  - tabindex
  - widoczne focus states
- Header: niski, przylega do górnej krawędzi, subtelna linia podkreślenia
- Podświetlenie aktywnej zakładki: cienka linia pod linkiem (Apple-like)
- Styl local-nav jak Apple: jasne tło, cienka linia separatora, aktywne podkreślenie

---

## 8. Design system (high-level)

### 8.1 Kolory
- Light:
  - background: #ffffff
  - text: #0f1115
- Dark:
  - background: #151618
  - text: #f4f5f7
- Dark surfaces:
  - surfaces: gray-900 / gray-950
  - borders: gray-800
  - primary CTA: white background, dark text
- Akcenty:
  - neutralne grafitowe (CTA / aktywne stany)
  - pomarańczowy (wypożyczony)
  - zielony tylko dla statusu „Dostępny”

### 8.5 Styl premium (Apple-like)
- Minimalistyczna estetyka, dużo światła i spójna typografia
- Brak dekoracyjnych gradientów kolorystycznych
- Subtelne cienie i cienkie obrysy zamiast ciężkich kart

### 8.6 Hero (layout)
- Full-bleed zdjęcie tła z delikatnym overlayem
- Treść i CTA ułożone w kolumnie na mobile, obok siebie na desktop

### 8.7 Responsywność
- Mobile-first: czytelne odstępy między blokami i stabilne łamanie treści
- Nawigacja i taby zachowują dostępność na małych ekranach

### 8.2 Typografia
- Sans-serif (system font stack)
- Hierarchia:
  - H1–H6
  - body
  - caption
- Duże światło między sekcjami
- Skala typograficzna:
  - xs 12px, sm 14px, md 16px, lg 18px

### 8.3 Animacje
- CSS only
- easing: cubic-bezier (Apple-like)
- fade / slide / scale
- prefers-reduced-motion respected

### 8.4 Siatka i spacing
- Cały layout oparty o siatkę 8px
- Wszystkie odstępy (padding, margin, gap) i promienie zaokrągleń to wielokrotności 8px
- Spójne promienie: preferowany 8 px, większe tylko gdy wymagane

---

## 9. Sprzęt – kategorie

- Tabs (segmented control)
- Kategorie:
  - Rowery (active)
  - Narty (coming soon)
  - Snowboard (coming soon)
  - Inne (coming soon)
- Coming soon:
  - disabled
  - aria-disabled
  - brak akcji
- Stany:
  - inactive: jaśniejsze szarości
  - hover: subtelne podświetlenie tła
  - active: ciemne tło, biały tekst

---

## 10. Produkty – rowery

### 10.1 Modele
- Turbo Levo 3 Expert T-Type
- Turbo Levo 3 Comp Carbon
- S-Works Turbo Levo G3
- Turbo Levo Comp Carbon

### 10.2 Karta produktu
- Nazwa
- Zdjęcie
- Zdjęcie pełna szerokość karty, bez dodatkowych marginesów
- Cena:
  - 300 zł netto / dzień
  - 369 zł brutto
- Rozmiar: jeden (S2 / S3 / S4)
- Status:
  - Dostępny (zielony)
  - Wypożyczony (pomarańczowy)
- Karta bez obramowania, białe tło

### 10.3 Galeria
- Lokalna (assets/)
- Miniatury + hero image
- Swipe mobile
- Lazy loading
- Cache offline
- Zdjęcia produktowe: oficjalne materiały Specialized, zapisane lokalnie bez parametrów (JPG, bez tła)

### 10.4 Hero image
- Nagłówek wykorzystuje panoramiczne zdjęcie w tle (lokalne `assets/images/`)

---

## 11. Modal produktu

- Fullscreen
- Glass background
- ESC closes
- Focus trap
- Scroll inside modal

Zawartość:
- Galeria
- Pełna specyfikacja techniczna (HTML)
- Sekcja zastawu
- Informacja o numerach seryjnych

---

## 12. Pricing

- Brak osobnej sekcji cennika
- Ceny prezentowane bezpośrednio na kartach produktów (netto/brutto)

---

## 13. CTA

- Jeden komponent
- Scroll do Sprzęt
- Spójny copy
- Widoczny wielokrotnie

---

## 14. Zasady (summary)

- Doba liczona od godziny odbioru
- Zwrot do 10:00
- Zastaw 8000 zł
- Szczegóły w regulaminie

---

## 15. FAQ

- Accordion
- CSS transitions
- Keyboard accessible
- Pytania:
  - organizacyjne
  - techniczne

---

## 16. O nas

- Pełny tekst (20–30 zdań)
- Bez skracania
- SEO-friendly

---

## 17. Kontakt

- E-mail
- Social:
  - Instagram
  - Facebook
  - YouTube
- Lokalizacja (tekst):
  - Bielsko-Biała
  - ul. Czołgistów – parking Błonia

---

## 18. Stopka

- Nazwa firmy (placeholder)
- NIP (placeholder)
- Adres (placeholder)
- Copyright

---

## 19. Regulamin (modal)

Zakres:
- Sprzęt sportowy (rowery + przyszłe)
- Wiek min. 18 lat
- 2 dokumenty
- Odpowiedzialność:
  - do realnych strat
- Opóźnienie:
  - kolejna pełna doba
- Kask obowiązkowy
- Zakaz modyfikacji
- Zakaz podnajmu
- Jazda na własne ryzyko
- Prawo polskie
- Sąd: Bielsko-Biała
- Zmiany regulaminu

---

## 20. Polityka prywatności

- Administrator: placeholder
- GA4
- Cookies
- Rozszerzenie pod formularz
- Okresy: ogólne

---

## 21. Cookies & GA4

- Baner Apple-style
- Akceptuj / Odrzuć / Ustawienia
- Brak GA4 po odrzuceniu

---

## 22. PWA

- Installable
- Offline (100%)
- Service Worker:
  - cache-first assets
  - versioning
  - update flow
- Manifest:
  - icons
  - theme colors
  - description

---

## 23. Accessibility

- WCAG 2.2 AA
- Keyboard
- Focus
- ARIA
- Kontrast
- prefers-reduced-motion

---

## 24. Performance / SEO

Lighthouse (mobile):
- Performance ≥ 95
- Accessibility = 100
- Best Practices ≥ 95
- SEO ≥ 90
- PWA OK

---

## 25. Bezpieczeństwo

- CSP
- HSTS
- No inline scripts (docelowo)
- Minimal JS

---

## 26. Struktura plików

/
├── index.html
├── app.js
├── sw.js
├── manifest.json
└── assets/
    ├── images/
    └── icons/

Style Tailwind (komponenty + @apply) znajduje się w `index.html`.

---

## 27. Future roadmap

- Formularz rezerwacji
- Kalendarz dostępności
- Płatności
- Panel admina
- CMS / JSON
- Kolejne kategorie

---

## 28. Kryteria akceptacji

- Lighthouse spełniony
- WCAG 2.2 AA
- Offline działa
- Dark/Light działa
- Brak błędów JS
- Brak zależności ciężkich

---
Praca iteracyjna, wymagania, potwierdzenie, testy, commit, push itd.
---
