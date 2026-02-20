# Beskider

Statyczna strona dla premium wypożyczalni MTB. Jekyll + PWA (offline-ready), dark/light, galeria i modale. Gotowe na GitHub Pages.

## Uruchomienie (Jekyll)

**Wymagania:** Ruby **3.2 lub 3.3** (Bundler). Nie używaj Ruby 4.0 – gem `eventmachine` (zależność Jekyll) nie buduje się na Ruby 4. Zalecane: Ruby 3.3.x.

```bash
# Opcjonalnie: instalacja gemów do katalogu projektu (bez sudo)
bundle config set path 'vendor/bundle'

bundle install
bundle exec jekyll serve
```

Otwórz `http://localhost:4000`. Build: `bundle exec jekyll build` (wynik w `_site/`).

### Błąd przy `bundle install` (eventmachine, http_parser.rb)

Użyj **Ruby 3.2 lub 3.3** (nie 2.6, nie 4.0). W projekcie jest plik `.ruby-version` (3.3.6) – przy rbenv/asdf wybierze on wersję automatycznie.

**rbenv (zalecane na macOS):**

```bash
# 1. Zainstaluj rbenv i ruby-build (jeśli jeszcze nie masz)
brew install rbenv ruby-build

# 2. Dodaj rbenv do powłoki (dodaj do ~/.zshrc na stałe)
eval "$(rbenv init -)"

# 3. Zainstaluj Ruby z .ruby-version (w katalogu projektu)
cd /Users/maksymiliansleziak/Sites/beskider
rbenv install  # instaluje wersję z .ruby-version (3.3.6)

# 4. Instalacja gemów i build
bundle install
bundle exec jekyll serve
```

W nowym terminalu przed `bundle`/`jekyll` uruchom `eval "$(rbenv init -)"` (lub dodaj to do `~/.zshrc`).

**Homebrew – Ruby 3.3 (bez rbenv):**

```bash
# 1. Zainstaluj Ruby 3.3 (nie domyślny „brew install ruby”, który daje 4.0)
brew install ruby@3.3

# 2. Użyj Ruby 3.3 w tej sesji (dodaj do ~/.zshrc na stałe):
export PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH"

# 3. Sprawdź (powinno być 3.3.x)
ruby -v

# 4. W katalogu projektu – czysta instalacja
cd /Users/maksymiliansleziak/Sites/beskider
rm -rf vendor/bundle
bundle config set path 'vendor/bundle'
bundle install
bundle exec jekyll serve
```

Na Intel Mac: ścieżka bywa `/usr/local/opt/ruby@3.3/bin`. Sprawdź: `brew --prefix ruby@3.3`.

## Struktura projektu (Jekyll)

- `_config.yml` – konfiguracja (title, url, baseurl, pluginy).
- `_layouts/` – default, page, home, post.
- `_includes/` – head, header, footer, navigation, scripts, home-sections.
- `_data/` – navigation.yml, gallery.yml.
- `_posts/` – wpisy bloga (format `YYYY-MM-DD-tytul.md`).
- `index.html` – strona główna (layout: home).
- `404.html`, `regulamin.md`, `polityka.md`, `blog/index.md` – podstrony.
- `assets/css/main.css` – style (Tailwind + komponenty).
- `assets/js/` – app.js, tabnav.js, peek-gallery.js.
- `assets/images/`, `assets/icons/`, `assets/fontawesome/` – zasoby.
- `sw.js`, `manifest.json` – PWA (w root; kopiowane do _site).

## Jak dodać stronę

Nowy plik w rootzie, np. `o-nas.md`, z front matter:

```yaml
---
layout: page
title: O nas
description: ...
permalink: /o-nas/
---
```

Treść w Markdown lub HTML. Link w `_data/navigation.yml` (main lub footer).

## Jak dodać wpis blogowy

Nowy plik w `_posts/`, np. `2026-02-21-tytul-wpisu.md`:

```yaml
---
layout: post
title: Tytuł wpisu
description: ...
date: 2026-02-21 10:00:00 +0100
---
```

## Uruchomienie lokalne (bez Jekyll, tylko podgląd _site)

Po `bundle exec jekyll build` można serwować katalog `_site`:

```bash
python3 -m http.server --directory _site
```

Otwórz `http://localhost:8000`. Nie używaj `file://` – CORS i Service Worker.

## Cache i wersjonowanie (PWA)
- Wersja cache: `CACHE_VERSION` w `sw.js` (suffix + data).
- Po dodaniu/usunięciu assetów zaktualizuj tablicę `ASSETS` w `sw.js`.
- Po zmianach zrób hard refresh, aby podmienić cache SW.

## Obrazy i srcset
- Trzymaj warianty `*-320.jpg`, `*-640.jpg`, `*-1280.jpg`.
- Używaj `srcset` + `sizes` w `index.html` dla każdego obrazu.
- Nazwy plików: lowercase, myślniki.

## Sekcje
- **Sprzęt:** filtr Wszystko / Rowery eMTB / Rowery Szosowe (sticky taby), karty z etykietą typu (eMTB/Road) i statusem (Dostępny).
- **Trasy:** 15 tras z Enduro Trails (Bielsko-Biała), filtry po trudności (Wszystko, Bardzo łatwa–Bardzo trudna).
- **Zasady:** Doba, Bezpieczeństwo, Modyfikacje, Regulamin, Kaucja/depozyt 5000 zł, Udział własny, Weryfikacja, Odmowa wynajmu.
- **Nawigacja:** Sprzęt, Trasy, Zasady, FAQ, O nas, Kontakt.

## Rowery szosowe – zdjęcia
- **Tarmac SL8:** `tarmac-sl8-1.jpg` + warianty 320/640/1280 w `assets/images/`.
- **Aethos:** `aethos-hero-white-bg.jpg` (jedno zdjęcie z białym tłem). Opcjonalnie warianty wg [scripts/fetch-road-bike-images.md](scripts/fetch-road-bike-images.md).

## Ikony
- **PWA:** `assets/icons/beskider-logo-fav.svg` (favicon i ikona „any” w manifeście), PNG 192/512 (`icon-192.png`, `icon-512.png`) w `manifest.json` i apple-touch-icon.
- **Font Awesome:** lokalnie w `assets/fontawesome/` (css/all.min.css, webfonts); ikony `fa-solid fa-*` / `fa-brands fa-*`.

## Checklist po zmianach
- Nawigacja (Sprzęt, Trasy, Zasady, FAQ, O nas, Kontakt) i aktywne podkreślenie.
- Taby sprzętu (Wszystko / eMTB / Szosowe) i taby trudności tras.
- FAQ/accordion.
- Modale i focus trap.
- Dark/light toggle.
- Cookie consent flow.
- Obrazy bez niechcianego cropu, poprawny `srcset`.
- Mobile: brak overflow i poprawne łamanie tekstu.
