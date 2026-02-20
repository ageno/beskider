# Raport testów strony Beskider (desktop i mobile)

Data: 2026-02-20  
Zakres: testy od strony użytkownika – linki, nawigacja, formularze, responsywność, zgodność ze specyfikacją.

---

## 1. Metodologia

- Przegląd kodu źródłowego (Jekyll, `_includes`, `_data`, `assets/js`).
- Weryfikacja zbudowanej witryny w `_site/` (struktura stron, href w HTML).
- Sprawdzenie istnienia zasobów (obrazy, ikony) oraz konfiguracji (nawigacja, galeria, formularz).
- Odniesienie do `spec.md` oraz `TESTING.md`.

**Uwaga:** Build Jekyll (`bundle exec jekyll build`) w bieżącym środowisku zwrócił błąd (brak Bundlera 2.7.1). Analiza oparta na istniejącym `_site/` oraz plikach źródłowych. Przed releasem warto uruchomić build i testy manualne według `TESTING.md`.

---

## 2. Struktura stron i linki

### 2.1 Strony

| Strona | Źródło | Status |
|--------|--------|--------|
| Strona główna | `index.html` (layout: home) | OK – generuje `index.html` |
| Regulamin | `regulamin.md` (permalink: /regulamin/) | OK – `_site/regulamin/index.html` |
| Polityka prywatności | `polityka.md` (permalink: /polityka/) | OK – `_site/polityka/index.html` |
| Blog | Jekyll (posts) | OK – `_site/blog/index.html` |
| 404 | `404.html` (permalink: /404.html) | OK – `_site/404.html` |

### 2.2 Kotwice na stronie głównej (anchor)

Wszystkie linki nawigacji i stopki prowadzą do istniejących sekcji:

- `#top` → `<header id="top">`
- `#main` → `<main id="main">` (skip-link)
- `#gorska-przygoda`, `#beskider-plus`, `#equipment`, `#gallery`, `#perks`, `#rules`, `#routes`, `#faq`, `#about`, `#guides`, `#contact` → odpowiednie `<section id="…">` w `_includes/home-sections.html`

Linki w stopce (Oferta, Firma) używają `{{ site.baseurl }}/{{ item.url }}`. Dla `baseurl: ""` daje to np. `/#gorska-przygoda` – poprawne. Na podstronach (regulamin, polityka, blog) takie linki poprawnie wracają na stronę główną i przewijają do sekcji.

### 2.3 Linki zewnętrzne (bez zmian)

- Formularz: `action="https://formspree.io/f/mjgergpk"` (POST) – OK.
- Social: Instagram, Facebook, YouTube, WhatsApp (whatsapp.com) – OK.
- Figma (logo) – OK.
- Regulamin/Polityka w stopce: `/regulamin/`, `/polityka/` – strony istnieją w buildzie.

### 2.4 Pobieranie plików (stopka – Materiały prasowe)

- `assets/images/beskider-logo.svg` (download)
- `assets/images/beskider-logo-dark.svg` (download)

Pliki istnieją w `assets/images/`. W buildzie ścieżki są względem roota (`/assets/...`).

---

## 3. Nawigacja (desktop i mobile)

- **Nav główne:** Sprzęt, Trasy, Zasady, O nas, Przewodnicy, Kontakt – wszystkie jako `/#equipment`, `/#routes` itd.  
- **CTA w nav:** „Jadę! / Cisnę!…” → `/#contact`.  
- **Logo:** link do `/#top`.  
- **Mobile:** hamburger (`data-nav-toggle`), backdrop (`data-nav-backdrop`), menu (`data-nav-menu`), focus trap w `app.js` – logika jest zaimplementowana.  
- **Podkreślenie aktywnej zakładki:** `data-nav-underline`, `updateNavUnderline` – wymaga testu w przeglądarce (scroll + viewport).

Rekomendacja: na urządzeniu mobilnym sprawdzić ręcznie: otwarcie/zamknięcie menu, czy Tab nie wychodzi poza menu, czy podświetlenie sekcji w nav działa po przewinięciu.

---

## 4. Sekcja Sprzęt (taby)

- **Taby:** Wszystko, Rowery eMTB, Rowery Szosowe (bez zakładki „Inne”).
- W `app.js` przy „Wszystko” (`tab-bikes-all`) ustawiane jest `showAll` – wyświetlane są oba panele (eMTB + Szosowe). Logika poprawna.
- **Rozbieżność ze spec:** W `spec.md` §9 jest „Inne (coming soon, disabled)”. W kodzie brak zakładki „Inne”. Do rozstrzygnięcia: dodać zakładkę wyłączoną czy zaktualizować spec.

---

## 5. Trasy (filtry)

- Filtry trudności: `data-route-filter`, karty: `data-route-difficulty`.  
- W `app.js`: `initRouteFilters()` – dopasowanie wartości filtra do `data-route-difficulty` (wsparcie wielu wartości w jednej karcie).  
- Wymaga testu w przeglądarce: wybór filtra i widoczność odpowiednich kart.

---

## 6. Galeria (peek)

- Konfiguracja: `_data/gallery.yml` (5 pozycji), sekcja z `data-peek-gallery` i `data-peek-gallery-config`.  
- Obrazy z galerii: `gallery-mgla-beskidy.png`, `gallery-portret-rowerzysta.png`, `gallery-dwoch-rowerzystow-zachod.png`, `gallery-rowerzysta-emtb-polana.png`, `gallery-rower-nad-woda.png` – wszystkie obecne w `assets/images/`.  
- Skrypt `peek-gallery.js` – lazy-load, swipe, klawiatura, a11y.  
- Do sprawdzenia w przeglądarce: przełączanie slajdów, pager, ewentualny autoplay (obecnie `autoplay: false` w YAML).

---

## 7. Formularz kontaktowy

- **Action:** Formspree (POST).  
- **Walidacja:** pola wymagane, formaty (email, tel, kod pocztowy, NIP), komunikaty pod polami, stany valid/invalid (ikony, obrys) – logika w `app.js`.  
- **Regulamin:** przycisk „Ogólne Warunki regulaminu serwisu” z `data-open-modal="regulamin"` – otwiera modal Regulamin.  
- **Checkbox marketingowy:** brak linku do modala „Polityka prywatności” (modal `id="privacy"` istnieje). Dla zgodności z RODO warto dodać link/ przycisk otwierający politykę w formularzu (np. przy zgoda marketingowa).  
- **TESTING.md:** punkt „Submit przy poprawnej walidacji: otwarcie mailto z danymi” – nieaktualny; formularz wysyła przez Formspree (fetch), nie mailto. Warto zaktualizować checklistę.

---

## 8. Modale

- **Regulamin** (`id="regulamin"`): otwierany z sekcji Zasady („tutaj”, „Pełny regulamin”) oraz z formularza (checkbox regulaminu).  
- **Polityka** (`id="privacy"`): otwierany tylko z linku w stopce („Polityka prywatności”); w formularzu brak triggera.  
- **Produkt** (np. `product-expert`, `product-comp-carbon`): markup jest, ale przyciski „Zobacz specyfikację” są wyłączone (spec §11).  
- W `app.js`: `[data-open-modal]`, focus trap, zamykanie ESC – zaimplementowane.

---

## 9. Motyw (dark/light)

- Przełącznik w nav i w stopce (tabnav: Auto / Ciemny / Jasny).  
- `localStorage` (`beskider-theme`), `prefers-color-scheme` przy „auto”.  
- Wymaga testu: zmiana motywu, odświeżenie strony, zachowanie wyboru.

---

## 10. Zasoby (obrazy, ikony)

- Hero, CTA Beskider+, karty produktów (eMTB + szosowe), galeria, przewodnicy, modale produktów – wszystkie referencje z `_includes/home-sections.html` wskazują na pliki w `assets/images/`.  
- Lista `ls` potwierdza obecność wymaganych plików (w tym warianty 320/640/1280).  
- Ikony: Font Awesome w `assets/fontawesome/`, logo w `assets/images/`, favicon/ikony PWA w `assets/icons/`.

---

## 11. Strona 404

- Link „Wróć na stronę główną” → `{{ site.baseurl }}/` – poprawny.  
- Layout `page`, spójny z resztą witryny.

---

## 12. Podsumowanie problemów i rekomendacji

### Krytyczne / do naprawy

- **Brak:** Nie stwierdzono niedziałających linków ani brakujących stron w buildzie. Wszystkie kotwice i podstrony (regulamin, polityka, blog, 404) są poprawne w kodzie i w wygenerowanym `_site/`.

### Drobne / ulepszenia

1. **Zakładka „Inne” (Sprzęt):** W spec jest „Inne (coming soon, disabled)”, w UI brak tej zakładki – albo dodać zakładkę wyłączoną, albo zaktualizować spec.
2. **Link do Polityki w formularzu:** Przy checkboxie zgody marketingowej warto dodać link/ przycisk otwierający modal Polityka prywatności (`data-open-modal="privacy"`).
3. **TESTING.md:** Zaktualizować punkt o submicie formularza: „wysyłka przez Formspree (fetch), komunikat sukcesu/błędu” zamiast „otwarcie mailto z danymi”.

### Testy manualne (desktop + mobile)

Przed releasem warto wykonać pełną checklistę z `TESTING.md`, w tym:

- Nawigacja: anchor, aktywna zakładka, hamburger, focus trap na mobile.  
- Taby: Sprzęt (Wszystko / eMTB / Szosowe), Trasy (filtry trudności).  
- Accordion FAQ, modale (Regulamin, Polityka), formularz (walidacja, submit, komunikaty).  
- Theme toggle, Cookiebot (jeśli wdrożony), obrazy (srcset, lazy load), galeria peek.  
- PWA: offline, instalacja.  
- Lighthouse (mobile): Performance, Accessibility, Best Practices, SEO.

### Build

- W środowisku testowym naprawić/zainstalować Bundler i uruchomić `bundle exec jekyll build`, a następnie przetestować stronę z `_site/` (np. `bundle exec jekyll serve` lub serwer statyczny).

---

Raport przygotowany na podstawie analizy kodu i wygenerowanej witryny. Testy w przeglądarce (desktop/mobile) oraz Lighthouse pozostają do wykonania ręcznie według `TESTING.md`.
