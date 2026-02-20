# Pobieranie zdjęć rowerów szosowych (Tarmac SL8, Aethos)

**Źródła obrazów:** Główne zdjęcia hero rowerów są pobrane z CDN (Specialized) jako PNG i zapisane lokalnie (np. `tarmac-sl8-1.png`, `aethos-1.png`) z wariantami 320/640/1280.

Poniżej: instrukcja ręczna na wypadek potrzeby ponownego pobrania lub innego źródła.

## Krok 1: Pobierz główne zdjęcie z przeglądarki

### Tarmac SL8
1. Otwórz: https://www.specialized.com/pl/pl/s-works-tarmac-sl8--sram-red-axs/p/4221539?color=5432697-4221539
2. Kliknij prawym na **główne zdjęcie roweru** (duża galeria) → „Zapisz obraz jako…”
3. Zapisz w projekcie jako:  
   `assets/images/tarmac-sl8-1.jpg`

### Aethos
Źródło (CDN Specialized) – **użyj HERO** (LIST to placeholder „IMAGE coming soon”):
- **HERO (prawdziwe zdjęcie, ciemne tło):**  
  `https://assets.specialized.com/i/specialized/97221-02_AETHOS-SW-ETAP-FLKSIL-CMLNREDGLD-BRSHCP_D2-HERO.jpg`

Pobierz: `curl -sL "URL" -o assets/images/aethos-1.jpg`, potem wygeneruj 320/640/1280 (Krok 2).

## Krok 2: Wygeneruj warianty 320 / 640 / 1280

Z poziomu katalogu **repozytorium** (nie `scripts/`):

**macOS (sips):**
```bash
cd assets/images
for base in tarmac-sl8-1 aethos-1; do
  for w in 320 640 1280; do
    sips -Z $w "${base}.jpg" --out "${base}-${w}.jpg"
  done
done
```

**ImageMagick:**
```bash
cd assets/images
for base in tarmac-sl8-1 aethos-1; do
  for w in 320 640 1280; do
    convert "${base}.jpg" -resize ${w}x "${base}-${w}.jpg"
  done
done
```

**Online:** użyj np. squoosh.app – wgraj `tarmac-sl8-1.jpg`, ustaw szerokość 320 i zapisz jako `tarmac-sl8-1-320.jpg` (potem 640, 1280; to samo dla Aethos).

## Krok 3: Zaktualizuj cache PWA

Zmień `data-build` w `<html>` w `index.html` (np. na aktualną datę) i zrób hard refresh w przeglądarce.

---

Po wykonaniu tych kroków w kategorii „Rowery Szosowe” będą widoczne poprawne zdjęcia Tarmac SL8 i Aethos.
