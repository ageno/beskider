# Configuration & Content Notes

- Nie używać zdjęć HDR w treściach ani zasobach (galeria, hero, karty itd.) – preferować naturalny wygląd.
- Gdy użytkownik poda URL zdjęcia lub innego zasobu do użycia w projekcie – pobrać go od razu (zapisać w `assets/`, ewentualnie wygenerować warianty), bez pytania „czy fetch?”.
- Uruchamiać potrzebne polecenia (np. curl, sips, serwer) od razu, bez pytania „czy uruchomić?” / „Run?”.
- Update `spec.md` whenever UI, content, or assets change.
- Bump `CACHE_VERSION` and refresh `ASSETS` in `sw.js` when adding/removing files.
- Adjust CSP if new external assets or scripts are introduced.
