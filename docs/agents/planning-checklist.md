# Planowanie zmiany (checklist)

## Zmiana treści / UI (np. nowa sekcja, nowy blok tekstu)

1. Zaktualizować **spec.md** (§6 IA, ewentualnie nowy podrozdział).
2. W **_includes/home-sections.html** (strona główna) lub w odpowiednim layoutzie: dodać markup (section, section__head, rules-grid / rule-card).
3. Jeśli nowa sekcja – dodać link w `_data/navigation.yml` i ewentualnie w stopce.
4. **sw.js**: tylko jeśli dodane/usunięte pliki w `ASSETS`.
5. **spec.md**: dopisać copy w odpowiednim paragrafie.

## Nowa funkcja (np. formularz, kalendarz)

1. Spec: rozszerzyć §4 (zakres), §6 (IA jeśli nowa sekcja), nowy § lub punkt w §27.
2. Backlog: rozbić na podzadania (markup, JS, walidacja, dostępność).
3. Po wdrożeniu: CHANGELOG + ewentualnie README/AGENTS jeśli nowe skrypty lub zależności.
