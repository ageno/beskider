# Configuration & Content Notes

- **Tytuły stron:** Wszystkie podstrony zawsze mają `title` w formacie: **⚡️ Beskider.pl - [nazwa podstrony]**. W front matter (YAML) ustawiać pełny tytuł z prefiksem `⚡️ Beskider.pl - `. Dotyczy to stron Jekyll (index, 404, partnerzy, regulamin, blog, wpisy z _posts) oraz ewentualnych standalone HTML z własnym `<title>`.
- **SDR (sRGB) only:** Strona wymusza przestrzeń sRGB. Wszystkie zasoby graficzne i kolory w CSS muszą być sRGB. Brak HDR i szerokiej gamy (Display-P3, Rec.2020). Na `html` ustawione jest `color-gamut: srgb`. Nowe obrazy (jpg, png) konwertować do sRGB (np. `sips -m "/System/Library/ColorSync/Profiles/sRGB Profile.icc" plik` na macOS; WebP/AVIF – ImageMagick: `magick input -strip -colorspace sRGB output`).
- Nie używać zdjęć HDR w treściach ani zasobach (galeria, hero, karty itd.) – preferować naturalny wygląd.
- Gdy użytkownik poda URL zdjęcia lub innego zasobu do użycia w projekcie – pobrać go od razu (zapisać w `assets/`, ewentualnie wygenerować warianty), bez pytania „czy fetch?”.
- Uruchamiać potrzebne polecenia (np. curl, sips, serwer) od razu, bez pytania „czy uruchomić?” / „Run?”.
- Update `spec.md` whenever UI, content, or assets change.
- Bump `CACHE_VERSION` and refresh `ASSETS` in `sw.js` when adding/removing files.
- Adjust CSP if new external assets or scripts are introduced.
