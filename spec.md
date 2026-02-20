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
- Własna strona błędu 404 (404.html)

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

- Navigation (logo, linki, po prawej przycisk CTA jak w sekcji CTA: „Jadę! / Cisnę!…” → #contact)
- Hero
- CTA Beskider+ (karta z grafiką Memphis; nagłówek, opis, przycisk „Dołącz do Beskider+"; klikalna karta)
- Wyróżniki (feature-band)
- Górska przygoda na najwyższym poziomie (#gorska-przygoda)
  - Nagłówek sekcji + intro (kompletna przygoda, sprzęt + przewodnik)
  - Układ jak O nas: treść (Rowery elektryczne, Akcesoria) + kolaż zdjęć (te same co w O nas: gallery-mgla-beskidy, gallery-dwoch-rowerzystow-zachod, gallery-portret-rowerzysta, gallery-rower-nad-woda)
  - Rowery elektryczne (intro: moc, zasięg, serwis, przewodnik)
  - Akcesoria w cenie (kask, zestaw naprawczy, konsultacje tras, przewodnik)
- Sprzęt (#equipment)
  - Nagłówek „Sprzęt”
  - Tabs (kategorie: Rowery eMTB, Rowery Szosowe, Inne)
  - Karty produktów (grid)
- CTA
- Galeria (#gallery)
  - Slider typu „peek” (aktywny slajd na środku, sąsiednie po bokach), dane z JSON (data-peek-gallery-config)
  - Pager w formie kapsuły (kropki + animowany aktywny „dash”), opcjonalny przycisk play dla slajdów wideo
  - Swipe/drag, klawiatura (strzałki, Home, End), lazy-load mediów ±1, a11y, prefers-reduced-motion
- Dlaczego Beskider (#perks)
  - Siatka 2–3 kolumny: 12 ikon z tytułem i opisem (zalety usługi)
  - Styl wzorowany na sekcji „Udogodnienia" (ikona + tekst, delikatne tło ikon w zielonym)
- Zasady
- Trasy
  - Nagłówek sekcji + intro (pomoc w wyborze tras, linki Komoot/Strava/Google Maps)
  - Siatka 3 kolumny: karty tras (nazwa, opis, trudność, długość m, spadek %, obniżenie m)
- FAQ
- O nas
- Przewodnicy Beskider (3 karty: zdjęcie, imię i nazwisko, krótki opis)
- Klub Beskider+ (#beskider-plus) – nad kontaktem: stała opłata, korzyści członkostwa, CTA „Dołącz do Beskider+”, box z delikatną grafiką Memphis (geometria, fale, kolory projektu)
- Kontakt
  - Karty: E-mail, Social media, Lokalizacja
  - Formularz zapytania (Dane wypożyczającego, Adres rozliczeniowy, Wiadomość, Warunki)
  - Panel „Świetny wybór!” (po prawej na desktop)
- Stopka (układ inspirowany Unsplash press: logo Beskider [SVG, light/dark], tagline „Górska przygoda z lokalnym przewodnikiem”, kolumny linków Oferta / Firma / Warunki / Materiały prasowe [pobierz logo jasne, pobierz logo ciemne], przełącznik motywu Auto/Ciemny/Jasny, ikony social; na dole copyright i dane firmy)
- Modale: Produkt, Regulamin, Polityka
- Strona błędu 404 (404.html): nagłówek z logo (link do strony głównej), komunikat „Strona nie została znaleziona”, CTA „Wróć na stronę główną”; spójna z motywem jasnym/ciemnym (localStorage `beskider-theme`).

Przy każdej nowej sekcji lub nowym linku w nav należy zaktualizować niniejszą listę oraz ewentualnie §7 (Nawigacja).

---

## 7. Nawigacja

- Brand w nav: logo Beskider (SVG) – wersja jasna w light mode, wersja ciemna w dark mode.
- Po prawej stronie nav: przycisk CTA (ten sam styl co w sekcji CTA – rotujące słowa Jadę! / Cisnę! / Lecę! / Prutuję! / Miażdżę!), link do #contact.
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

### 8.6 Styl premium (Apple-like)
- Minimalistyczna estetyka, dużo światła i spójna typografia
- Brak dekoracyjnych gradientów kolorystycznych
- Subtelne cienie i cienkie obrysy zamiast ciężkich kart

### 8.7 Hero (layout)
- Full-bleed zdjęcie tła z delikatnym overlayem
- Treść i CTA ułożone w kolumnie na mobile, obok siebie na desktop

### 8.8 Responsywność
- Mobile-first: czytelne odstępy między blokami i stabilne łamanie treści
- Nawigacja i taby zachowują dostępność na małych ekranach
- Taby (Sprzęt, Trasy) na mobile: zawsze w jednej linii, przewijanie poziome, strzałki L/P gdy jest overflow (styl Apple)

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

### 8.5 Ikony
- **Zestaw:** Font Awesome (wersja free), lokalnie: `assets/fontawesome/` (css/all.min.css, webfonts/). Ikony: `<i class="fa-solid fa-…">` lub `fa-brands fa-…` (np. fa-star, fa-chevron-down, fa-envelope, fa-instagram).
- W sekcjach kart (Dlaczego Beskider, Kontakt): ikona w kwadracie z zaokrąglonymi rogami (np. 2.25rem, border-radius 0.5rem) i delikatnym tłem kolorystycznym; rozmiar ikon FA ustawiany przez font-size w CSS.
- Ikony brandów (Instagram, Facebook, YouTube): `fa-brands fa-instagram`, `fa-brands fa-facebook`, `fa-brands fa-youtube`.

---

## 9. Sprzęt – kategorie

- Tabs (segmented control) jako filtr; sticky.
- **Komponent tabnav** (`tabnav.css`, `tabnav.js`, `tabnav.html`): Apple-style platter z przewijaniem poziomym, strzałkami przy overflow i obsługą klawiatury. DOM: `.tabnav-platter` > `.tabnav-viewport` > `.tabnav-scroller` (role="tablist") > `.tabnav-tab`, plus `.tabnav-arrow` jako overlay.
- Na mobile: jedna linia, scroll poziomy, strzałki „Przewiń w lewo/prawo” gdy lista nie mieści się (ukryty scrollbar).
- Kategorie:
  - **Wszystko** (domyślna) – pokazuje obie kategorie (eMTB + Szosowe)
  - Rowery eMTB – karty e-MTB
  - Rowery Szosowe – S-Works Tarmac SL8 (SRAM RED AXS), S-Works Aethos (SRAM Red eTap AXS)
  - Inne (coming soon, disabled)
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
- Zdjęcie: przy najechaniu myszką płynne, delikatne powiększenie (scale ~1.06, transition 0.4s cubic-bezier); kontener z overflow hidden
- Zdjęcie z delikatnym wcięciem (24px) od ramki
- Zdjęcia z `srcset` (320 / 640 / 1280 / full)
- Cena: 499 zł rower + 399 zł przewodnik / dzień
- Rozmiar: tylko wartość (S2 / S3 / S4) w badge’u z ciemnym tłem i białym fontem, bez opisu „Rozmiar:”
- Status: badge/label na boxie z rowerem (na zdjęciu), półprzezroczyste tło; Dostępny (zielone tło), Wypożyczony (pomarańczowe tło), biały font
- Karta bez obramowania, białe tło
- Brak przycisku „Zobacz specyfikację” (powiększenie / modal produktu wyłączone)

### 10.3 Galeria
- Slider typu „peek” nad sekcją Trasy, dane z `data-peek-gallery-config` (JSON)
- Zdjęcia w sliderze: 4 pliki w `assets/images/` – Beskidy w mgle, portret rowerzysty w górach, dwaj rowerzyści o zachodzie słońca, rowerzysta z e-MTB na polanie (`gallery-mgla-beskidy.png`, `gallery-portret-rowerzysta.png`, `gallery-dwoch-rowerzystow-zachod.png`, `gallery-rowerzysta-emtb-polana.png`)
- Swipe / przewijanie w bok, pager z kropkami (timed-dotnav), autoplay, lazy loading ±2 slajdy
- Cache offline (pliki galerii w `sw.js` ASSETS)

### 10.4 Hero image
- Nagłówek wykorzystuje panoramiczne zdjęcie w tle (lokalne `assets/images/`)
- Wysokość sekcji hero dopasowuje się do treści (brak min-height w vh); padding wewnętrzny umiarkowany.
- Aby uniknąć białego gradientu na krawędziach przy nałożonym blurze: sekcja hero ma ciemne tło (`background-color`), a zdjęcie w stanie z blur jest powiększone (scale ~1.22) i wyśrodkowane, tak że krawędzie obrazu nie wchodzą w viewport.
- Przy scrollu stosowany jest tylko blur (bez translateY), żeby obraz nie odsłaniał ciemnego tła; overlay ma gradient u góry (#1a2320 → transparent) na wszelki wypadek.

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

- Jeden komponent; nagłówek „Jedna decyzja. Cała przygoda.”; lead: sprzęt, przewodnik, jazda, formalności/góry (4 akapity).
- Szare tło (#f0f0f0), zaokrąglone rogi (8px); bez cienia i animacji. Układ w kolumnę: tekst, pod spodem przycisk (wyrównany do lewej). W trybie ciemnym: tło #2a2a2a, tekst jasny.
- Przycisk prowadzi do sekcji Kontakt (#contact).
- Trzy wystąpienia: po sekcji Sprzęt, po sekcji Trasy (przed FAQ) oraz po sekcji Przewodnicy (przed Beskider+).

---

## 13a. Trasy

- Źródło danych: Enduro Trails (Bielsko-Biała), [endurotrails.pl/trasy/](https://endurotrails.pl/trasy/).
- Intro: pomoc w wyborze tras, linki Komoot/Strava/Google Maps, dopasowanie do poziomu.
- Filtry trudności: zakładki Wszystko / Bardzo łatwa / Łatwa / Średnia / Trudna / Bardzo trudna (sticky). Na mobile: jedna linia, scroll poziomy, strzałki jak w sekcji Sprzęt.
- Karty tras (routes-grid, 3 kolumny): nazwa, krótki opis (oryginalne opisy, nie plagiat źródła), label trudności (delikatna kolorystyka), długość (m), nachylenie (%), przewyższenie (m), rodzaj nawierzchni. Tytuły pogrubione.
- 17 tras: Daglezjowy, Bystry, Dziabar, Kamieniołom, DH+, Gaciok, Sahaira, Dębowiec, Gondola, Cygan, Stary zielony, Rock'n'Rolla, Cyganka, Twister, Stefanka, Gaiki, Magurka Wilkowicka.
- Meta kart: Długość · Nachylenie · Przewyższenie · Rodzaj (podjazdowa / naturalna / mieszana / utwardzona / nieoficjalne single).
- Karta może mieć wiele labeli trudności (np. „Trudna" + „Bardzo trudna"). `data-route-difficulty` przyjmuje wartości oddzielone spacją; filtr pokazuje kartę gdy dowolna z nich pasuje.

---

## 13b. Dlaczego Beskider (#perks)

- Sekcja zalet usługi umieszczona między Trasami a Zasadami.
- Layout inspirowany sekcją „Udogodnienia w tym budynku" (clusteroffices.com) – grid ikon z tytułem i opisem.
- Grid: 1 kolumna mobile → 2 kolumny (640 px) → 3 kolumny (1024 px).
- Każdy element: kwadratowa ikona (36 px, zielone tło, Font Awesome solid) + tytuł (semi-bold) + opis (muted).
- 12 pozycji: Sprzęt premium, Lokalny przewodnik, Dopasowanie trasy, Pełne wyposażenie, Serwis przed wyjazdem, Mapy i nawigacja, Elastyczne godziny, Bezpłatny parking, Płatność bezgotówkowa, Wsparcie na trasie, Ubezpieczenie, Siedziba w Bielsku-Białej.
- Dark mode: ciemne zielone tło ikon, jaśniejsze opisy.

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

- Układ w stylu Unsplash About: **tekst (lewa kolumna) + kolaż zdjęć (prawa kolumna)**. Na mobile: jedna kolumna, najpierw treść, potem kolaż.
- **Lewa kolumna:** nagłówek („Z gór w sercu. Z jakością na szlaku.”), skrócony tekst „O nas” (kilka akapitów), przycisk CTA „Zobacz galerię” (link do #gallery).
- **Prawa kolumna:** kolaż 4 zdjęć w **dwóch kolumnach o równej całkowitej wysokości**, wyrównanych górą i dołem. Wysokości lustrzane między kolumnami (proporcje, nie auto):
  - **Lewa kolumna:** górne zdjęcie 40% wysokości kolumny, dolne 60%.
  - **Prawa kolumna:** górne zdjęcie 60% wysokości kolumny, dolne 40%.
  - Górne i dolne krawędzie obu kolumn w jednej linii; suma wysokości w lewej = suma w prawej. Zaokrąglone rogi. Zdjęcia: lewa – gallery-mgla-beskidy (góra), gallery-dwoch-rowerzystow-zachod (dół); prawa – gallery-portret-rowerzysta (góra), gallery-rower-nad-woda (dół).
- **Kryterium testowe:** po zamianie zdjęć na jednolite bloki kolorów: lewa – mały u góry, duży na dole; prawa – duży u góry, mały na dole; brak pustych przestrzeni, równe całkowite wysokości kolumn.
- Responsywność: sekcja desktop 2 kolumny (tekst + kolaż), tablet/mobile jedna kolumna (treść, potem kolaż).

---

## 17. Kontakt

- **Trzy karty** (contact-card, układ jak rule-card / perks): nad tytułem ikona w kwadracie z tłem (contact-card__icon) – Font Awesome: E-mail (fa-envelope), Social media (fa-share-nodes), Lokalizacja (fa-location-dot). Podnagłówki (contact-card__label):
  - **E-mail**: „Adres” (link mailto: hello@beskider.pl), „Czas odpowiedzi” (8:00–20:00, max 30 min); pod adresem link do WhatsApp z ikoną (fa-brands fa-whatsapp) i tekstem „Wkrótce dodamy możliwość kontaktu przez WhatsApp (wkrótce)” (na razie bez numeru, link do whatsapp.com)
  - **Social media**: „Obserwuj nas”, linki z ikonkami (Instagram, Facebook, YouTube)
  - **Lokalizacja**: „Adres” (Bielsko-Biała, ul. Czołgistów – parking Błonia), „Dowóz i odbiór” (rowery dowożone na miejsce po potwierdzeniu rezerwacji; odbiory i zwroty po wcześniejszym kontakcie)
- **Formularz zapytania** (pod/obok kart): nagłówek „Formularz rezerwacyjny” + intro „Wypełnij szczegółowo formularz rezerwacyjny w celu potwierdzenia dostępności i możliwości realizacji przygody z Beskider”; wysyłka przez **Formspree** (action `https://formspree.io/f/mjgergpk`, method POST). Po walidacji po stronie klienta wysyłka AJAX (fetch), komunikat sukcesu/błędu w `.contact-form__status`. Ukryte pole `_subject` dla tematu e-maila.
  - Dane wypożyczającego: E-mail*, Imię i nazwisko*, Numer kontaktowy*
  - Adres rozliczeniowy: Imię i nazwisko*, Firma, NIP, Adres*, Miasto*, Kod pocztowy*, Kraj*
  - Wiadomość (textarea, opcjonalne)
  - Warunki: checkbox* (akceptacja regulaminu, link do modala Regulamin), checkbox (zgoda marketingowa – Ageno sp. z o.o.)
  - Przycisk: Wyślij zapytanie
- **Walidacja**: pola wymagane, formaty (email, tel, kod XX-XXX, NIP 10 cyfr); komunikaty pod polem (np. „Wprowadzona ilość znaków jest niepoprawna”); stan valid = zielona ikona check + zielony obrys pola (light: rgb(52 105 80), dark: rgb(74 222 128)), invalid = czerwony obrys + ikona wykrzyknik; pola w stanie błędu mają delikatny czerwony odcień tła (light: rgb(254 242 242), dark: rgb(55 38 38)). Pola już wypełnione mają delikatne szare tło (light: rgb(243 244 246), dark: rgb(48 48 48)), aby odróżnić je od pustych. Walidacja uruchamiana jest również po załadowaniu strony (np. po odświeżeniu) dla wszystkich pól, które mają zapisaną wartość w localStorage, aby od razu pokazać stan valid/error.
- **Panel „Świetny wybór!”**: nagłówek + 4 punkty z zieloną ikoną check (sprzęt premium, obsługa, zero opłat 24h, dobry wybór)

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

- Administrator: placeholder (zgodnie ze stopką)
- GA4
- Cookies
- **Formularz kontaktowy**: dane zbierane w celu odpowiedzi na zapytanie; drugi checkbox (opcjonalny) – zgoda na przetwarzanie przez Ageno sp. z o.o. w celu komunikacji marketingowej (newsletter, promocje). Okresy przetwarzania: ogólne / do cofnięcia zgody.
- Okresy: ogólne

---

## 21. Cookies & GA4

- **Google Tag Manager (GTM)** — kontener GTM wstrzyknięty w `<head>` oraz `<noscript>` iframe zaraz po `<body>`; ID kontenera w `index.html`. GA4, consent mode i inne tagi konfigurowane z poziomu GTM.
- **Cookiebot** — zarządzanie zgodami cookies (baner i ustawienia); integracja z GTM/GA4 po stronie Cookiebot.
- Brak własnego banera cookies (usunięty na rzecz Cookiebot).

---

## 22. PWA

- **Installable** — pełne kryteria instalacji (manifest z ikonami 192×192 i 512×512 PNG, `display: standalone`, `scope`, `id`). Opcjonalny baner „Zainstaluj” po zdarzeniu `beforeinstallprompt` (przycisk Zainstaluj / Pomiń w `#install-banner`).
- **Offline (100%)** — Service Worker precache: strona, skrypty, manifest, fonty, **wszystkie obrazy** (hero, galeria, karty produktów, przewodnicy, CTA, logo). Fetch handler: cache-first, brak sieci → fallback z cache; nawigacja offline → `index.html`.
- Service Worker:
  - precache przy instalacji (lista `ASSETS` w `sw.js`)
  - cache-first dla GET samej domeny
  - versioning (`CACHE_VERSION` z parametru `v` / data-build w HTML)
  - `skipWaiting` + `clients.claim`
- Manifest (`manifest.json`):
  - `id`, `scope`, `name`, `short_name`, `description`, `start_url`, `display: standalone`, `orientation`, `theme_color`, `background_color`, `categories`
  - ikony: SVG (purpose any), PNG 192×192 i 512×512 (purpose `any` i `maskable`)
- Ikony: favicon i „any” — `assets/icons/beskider-logo-fav.svg`; instalacja PWA i apple-touch — `assets/icons/icon-192.png`, `assets/icons/icon-512.png`. Logo w nav: `assets/images/beskider-logo.svg` (jasny motyw), `assets/images/beskider-logo-dark.svg` (ciemny motyw).

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

### 24.1 Indeksowanie (Google)

Aby strona była indeksowana przez Google:
- **robots.txt** – w katalogu głównym; `Allow: /`, wpis `Sitemap:` z pełnym URL do sitemap.
- **sitemap.xml** – w katalogu głównym; lista URL-i (one-page: jeden wpis na stronę główną).
- **Canonical** – w `<head>`: `<link rel="canonical" href="…">` z docelowym URL strony.
- **Open Graph** – `og:title`, `og:description`, `og:url`, `og:type`, `og:locale`, `og:image` (udostępnianie w social media i sygnał dla wyszukiwarek).

Domena produkcyjna: **https://beskider.pl**. Po wdrożeniu: dodać stronę w [Google Search Console](https://search.google.com/search-console) i przesłać sitemap (Indeksowanie → Mapy witryn): `https://beskider.pl/sitemap.xml`.

---

## 25. Bezpieczeństwo

- CSP: script-src i frame-src dla Google Tag Manager i Cookiebot (consent.cookiebot.com); connect-src i img-src dla Google Analytics, Cookiebot, Formspree; hashe dla inline GTM
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
├── robots.txt
├── sitemap.xml
├── tabnav.css
├── tabnav.js
├── tabnav.html
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
| gorska-przygoda | Nagłówek „Górska przygoda na najwyższym poziomie”, intro, Rowery elektryczne / Akcesoria, kolaż 2×2 (zdjęcia jak O nas) |
| equipment | Nagłówek „Sprzęt”, taby, karty produktów |
| cta | Nagłówek „Jedna decyzja. Cała przygoda.”, 4 akapity, przycisk |
| jak-wynajac | 3 karty: kontakt, odbiór, co zabrać |
| rules | Nagłówek, 3 karty zasad, przycisk regulamin |
| faq | Accordion z pytaniami |
| about | Tekst „O nas” + CTA + kolaż zdjęć z galerii |
| guides | Przewodnicy Beskider: 3 karty (zdjęcie, imię i nazwisko, opis) |
| contact | E-mail, social, adres; formularz zapytania; panel Świetny wybór |
| stopka | Logo Beskider (light/dark), tagline „Górska przygoda z lokalnym przewodnikiem”, kolumny Oferta/Firma/Warunki/Materiały prasowe, motyw Auto/Ciemny/Jasny, social, copyright + dane firmy |
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
