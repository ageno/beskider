# SPEC.md
## Beskider – wypożyczalnia sprzętu sportowego
Wersja: 1.1 (rozszerzona)
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
- Stylowanie: skompilowany CSS inline w `index.html` (bez CDN)

---

## 6. Struktura informacji (IA)

Lista sekcji w kolejności na stronie (źródło prawdy przy code review i planowaniu treści):

- Navigation
- Hero
- Wyróżniki (feature-band)
- Sprzęt
  - Nagłówek sekcji + intro
  - Rowery elektryczne (intro: E-MTB, E-ROAD BIKE)
  - Akcesoria w cenie (kask, zestaw naprawczy, konsultacje tras)
  - Tabs (kategorie: Rowery eMTB, Rowery Szosowe, Narty, Snowboard, Inne)
  - Karty produktów (grid)
- CTA
- Trasy
  - Nagłówek sekcji + intro (pomoc w wyborze tras, linki Komoot/Strava/Google Maps)
  - Siatka 3 kolumny: karty tras (nazwa, opis, trudność, długość m, spadek %, obniżenie m)
- Zasady
- FAQ
- O nas
- Przewodnicy Beskider (3 karty: zdjęcie, imię i nazwisko, krótki opis)
- Kontakt
- Stopka (przełącznik trybu: Automatyczny / Ciemny / Jasny; firma, linki, social, copyright)
- Modale: Produkt, Regulamin, Polityka

Przy każdej nowej sekcji lub nowym linku w nav należy zaktualizować niniejszą listę oraz ewentualnie §7 (Nawigacja).

---

## 7. Nawigacja

- Sticky
- Glassmorphism:
  - backdrop-filter: blur()
  - półprzezroczyste tło
- Header transparentny, półprzezroczystość tylko na pasku nawigacji (glass)
- Anchor links (smooth scroll)
- Mobile:
  - hamburger
  - focus trap
- Tryb motywu (auto / ciemny / jasny):
  - wybór w stopce (segment: Automatyczny, Ciemny, Jasny)
  - szybki przełącznik w nav (light ↔ dark)
  - localStorage (`beskider-theme`: `auto` | `light` | `dark`)
  - przy „auto”: `prefers-color-scheme`, nasłuch na zmianę
  - inline SVG w nav (księżyc w light, słońce w dark)
- WCAG:
  - aria-labels
  - tabindex
  - widoczne focus states
- Header: niski, przylega do górnej krawędzi, subtelna linia podkreślenia
- Header zawsze nad hero (wyższy z-index) dla klikalności linków
- Podświetlenie aktywnej zakładki: cienka linia pod linkiem (Apple-like)
- Podkreślenie aktywnej zakładki: jeden animowany pasek przesuwający się po osi X, wyrównany do dolnej krawędzi headera
- Podkreślenie aktywnej zakładki: pozycjonowane względem kontenera `.nav` (kotwica od lewej) dla precyzji
- Styl local-nav jak Apple: jasne tło, cienka linia separatora, aktywne podkreślenie
- Pozycjonowanie linków: wysokość linków w menu dopasowana do przycisku motywu, wyśrodkowanie w osi Y
- Branding: znak błyskawicy po lewej stronie nazwy Beskider

---

## 8. Design system (high-level)

### 8.1 Kolory
- Light:
  - background: #ffffff
  - text: #0f1115
- Dark (neutralna szarość, jak Cursor/Specialized, bez granatu/niebieskiego):
  - background: #171717 (rgb 23 23 23)
  - text: #f4f5f7
- Dark surfaces:
  - surfaces: neutralne szarości (23 23 23 / 38 38 38 / 64 64 64)
  - borders: rgb(38 38 38)
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

- Tabs (segmented control) jako filtr; sticky.
- Kategorie:
  - **Wszystko** (domyślna) – pokazuje obie kategorie (eMTB + Szosowe)
  - Rowery eMTB – karty e-MTB
  - Rowery Szosowe – S-Works Tarmac SL8 (SRAM RED AXS), S-Works Aethos (SRAM Red eTap AXS)
  - Narty, Snowboard, Inne (coming soon, disabled)
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
- **eMTB:** Turbo Levo 3 Expert T-Type, Turbo Levo 3 Comp Carbon, S-Works Turbo Levo G3, Turbo Levo Comp Carbon
- **Szosowe:** S-Works Tarmac SL8 – SRAM RED AXS, S-Works Aethos – SRAM Red eTap AXS

### 10.2 Karta produktu
- Zdjęcie
- Zdjęcie z delikatnym wcięciem (24px) od ramki
- Zdjęcia z `srcset` (320 / 640 / 1280 / full)
- Cena: 499 zł rower + 399 zł przewodnik / dzień
- Rozmiar: tylko wartość (S2 / S3 / S4) w badge’u z ciemnym tłem i białym fontem, bez opisu „Rozmiar:”
- Status: badge/label na boxie z rowerem (na zdjęciu), półprzezroczyste tło; Dostępny (zielone tło), Wypożyczony (pomarańczowe tło), biały font
- Karta bez obramowania, białe tło
- Brak przycisku „Zobacz specyfikację” (powiększenie / modal produktu wyłączone)

### 10.3 Galeria
- Lokalna (assets/)
- Miniatury + hero image
- Swipe mobile
- Lazy loading
- Cache offline
- `srcset` dla miniatur i obrazów głównych w modalu
- Zdjęcia produktowe: oficjalne materiały Specialized (HERO z CDN), zapisane lokalnie jako PNG z przezroczystością; źródła i linki do oryginałów w `assets/images/sources/*.md`

### 10.4 Hero image
- Nagłówek wykorzystuje panoramiczne zdjęcie w tle (lokalne `assets/images/`)

---

## 11. Modal produktu

Modal nie jest obecnie dostępny z listy sprzętu (przycisk „Zobacz specyfikację” usunięty). Markup modali pozostaje w HTML na ewentualne ponowne włączenie.

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
- Ceny prezentowane bezpośrednio na kartach produktów (499 zł rower + 399 zł przewodnik / dzień)

---

## 13. CTA

- Jeden komponent
- Scroll do Sprzęt
- Spójny copy
- Widoczny wielokrotnie

---

## 13a. Trasy

- Źródło danych: Enduro Trails (Bielsko-Biała), [endurotrails.pl/trasy/](https://endurotrails.pl/trasy/).
- Intro: pomoc w wyborze tras, linki Komoot/Strava/Google Maps, dopasowanie do poziomu.
- Filtry trudności: zakładki Wszystko / Bardzo łatwa / Łatwa / Średnia / Trudna / Bardzo trudna (sticky).
- Karty tras (routes-grid, 3 kolumny): nazwa, krótki opis, label trudności (delikatna kolorystyka), długość (m), średni spadek (%), obniżenie (m). Tytuły pogrubione.
- 15 tras: Daglezjowy, Bystry, Dziabar, Kamieniołom, DH+, Gaciok, Sahaira, Dębowiec, Gondola, Cygan, Stary zielony, Rock'n'Rolla, Cyganka, Twister, Stefanka.

---

## 14. Zasady (summary)

Karty w siatce (rules-grid):
- Doba wypożyczenia (od godziny odbioru do 10:00 następnego dnia; opóźnienie powyżej 15 min = koszt kolejnej doby)
- Bezpieczeństwo (kask obowiązkowy w każdym przypadku, jazda na własne ryzyko wynajmującego)
- Modyfikacje (sprzęt bez modyfikacji/rozkręcania poza wysokością siodła, części ewidencjonowane i sprawdzane)
- Regulamin (sprzęt wypożyczany po spełnieniu warunków regulaminu i zastrzeżeń)
- Kaucja/depozyt (kaucja zwrotna, blokada depozytu na karcie kredytowej, już od 5000 zł, wysokość zależy od modelu roweru)
- Udział własny (z opcją wykupienia ubezpieczenia redukującego do kwoty kaucji)
- Weryfikacja (do wypożyczenia dwa dokumenty tożsamości: dowód, prawo jazdy, mObywatel lub paszport)
- Odmowa wynajmu (prawo do odmowy wynajmu z uzasadnionych przyczyn, w trosce o bezpieczeństwo sprzętu)
- Przycisk „Pełny regulamin” otwiera modal. Tytuły kart pogrubione (font-weight 600).

---

## 15. FAQ

- Accordion
- CSS transitions
- Keyboard accessible
- Pytania: organizacyjne, techniczne, m.in. dokumenty, odbiór, enduro, zwrot, dlaczego przy spóźnieniu doliczana jest kolejna doba, kask/ochraniacze, „Dlaczego jesteście drożsi niż konkurencja?”

---

## 16. O nas

- Pełny tekst (20–30 zdań)
- Bez skracania
- SEO-friendly
- Zdjęcie: `assets/images/about-us.jpg` + warianty `*-320/640/1280`
- Układ na desktop: 55/45 (obraz + tekst) dla wizualnej równowagi
- Zdjęcie „O nas”: pełny bleed do lewej krawędzi na desktop, bez zaokrąglenia po lewej
- Zdjęcie „O nas”: bez kadrowania (object-contain), bez ramki i bez cienia
- Bleed realizowany tylko do lewej krawędzi (szerokość kolumny + bleed do krawędzi viewportu)
- Zdjęcie „O nas”: animacja rotacji podczas scrolla w zakresie 7° do -2°

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
- `CACHE_VERSION` wyprowadzony z parametru `v` (data-build w HTML), aktualizowany przy każdym commicie
- Manifest:
  - icons
  - theme colors
  - description
- Ikony PWA: PNG; favicon: SVG (B w okręgu)

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
    │   ├── *-320.jpg
    │   ├── *-640.jpg
    │   └── *-1280.jpg
    └── icons/

Style są skompilowane i w pełni inline w `index.html`.
README.md opisuje uruchomienie, cache/versioning oraz zasady obrazów i ikon.

### 26.1 Treść (content inventory)

Szybka mapa treści w `index.html` (do planowania zmian copy):

| Lokalizacja (id / sekcja) | Opis |
|---------------------------|------|
| hero | H1 (rower + przewodnik), lead, przycisk CTA |
| feature-band | Wyróżniki (3 kolumny) |
| equipment | Nagłówek, intro, Rowery elektryczne / Akcesoria, taby, karty produktów |
| cta | Nagłówek, lead, przycisk |
| jak-wynajac | 3 karty: kontakt, odbiór, co zabrać |
| rules | Nagłówek, 3 karty zasad, przycisk regulamin |
| faq | Accordion z pytaniami |
| about | Obraz + tekst „O nas” |
| guides | Przewodnicy Beskider: 3 karty (zdjęcie, imię i nazwisko, opis) |
| contact | E-mail, social, adres |
| stopka | Przełącznik trybu (Auto/Ciemny/Jasny), firma, linki, social, copyright |
| Modale | Produkt (galeria, spec), Regulamin, Polityka |

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
