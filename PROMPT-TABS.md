# Prompt: Komponent tabów (sticky, glass, dostępność)

Skopiuj poniższy blok i wklej w innym projekcie / czacie jako instrukcję do zaimplementowania tych samych tabów.

---

## Tekst do wklejenia

```
Zaimplementuj komponent tabów zgodnie z poniższą specyfikacją.

### 1. Struktura HTML

**Opakowanie (opcjonalne sticky):**
- `.tabs-sticky-wrap` — kontener bez tła, cieni i obramowań. Zawiera tylko: position: sticky, top (np. 4.5rem), z-index: 10, margin-bottom: 1rem, padding-bottom: 0.5rem.

**Lista tabów:**
- `.tabs` — flex container z przyciskami. Ma tło z delikatną przezroczystością i blur (glass): background ok. 45% opacity (light: biały, dark: ciemna szarość), backdrop-filter: blur(12px) saturate(1.1). Border-radius: 0.5rem, padding: 0.5rem. Bez obramowania. Na desktop width: auto, flex-wrap: nowrap; na mobile width: 100%, flex-wrap: wrap, gap: 1rem (także row-gap przy zawijaniu).

**Przyciski tabów:**
- `.tabs__tab` — buttony: border: none, border-radius: 0.5rem (8px), padding: 1rem (poziomo i pionowo). Font ok. 0.875rem. Odstęp między tabami: margin-left: 1rem na każdym oprócz pierwszego (.tabs__tab:not(:first-child)).
- Stan nieaktywny: szary tekst (gray-400 / gray-500).
- Stan hover: subtelne jaśniejsze tło (np. gray-100 light / gray-800 dark), ciemniejszy tekst.
- Stan aktywny (.is-active): ciemne tło, biały tekst (light theme); dark theme: białe tło, ciemny tekst. Delikatny box-shadow opcjonalnie.
- Stan disabled: cursor: not-allowed, wyszarzony tekst, bez tła przy hover.

**Panele (gdy taby przełączają treść):**
- `.tab-panel` — display: none; .tab-panel.is-active — display: block.

**Dwa warianty użycia:**

**A) Taby przełączające panele (ARIA tabs):**
- Kontener: role="tablist", aria-label="Opis listy".
- Każdy przycisk: role="tab", aria-selected="true|false", aria-controls="id-panelu", id unikalny (np. tab-xyz-button), data-tab-target="id-panelu".
- Panel: role="tabpanel", id zgodny z data-tab-target, aria-labelledby="id-przycisku".
- Aktywny tab: klasa is-active. Jedna panel is-active (albo kilka, jeśli jeden tab ma controls wiele paneli).
- Przyciski disabled: aria-disabled="true", atrybut disabled.

**B) Taby jako filtr (np. trudność):**
- Przyciski: data-route-filter="all|easy|hard|..." (wartości zgodne z data-route-difficulty na kartach). Klik ustawia .is-active na klikniętym przycisku i filtruje elementy .route-card[data-route-difficulty] (np. dodając klasę .route-card--hidden gdy nie pasuje).

### 2. Siatka i spójność
- Wszystkie odstępy i promienie: wielokrotności 8px (0.5rem, 1rem itd.).

### 3. Dark mode
- Na [data-theme="dark"] lub html[data-theme="dark"]: .tabs — tło ciemne ~45% opacity, ten sam blur. .tabs__tab — kolory tekstu i tła odwrócone (nieaktywny szary, hover ciemne tło / jasny tekst, active białe tło / ciemny tekst, disabled wyszarzony).

### 4. JavaScript (vanilla)
- Dla wariantu A: przy kliku w [data-tab-target] przełączyć .is-active na przycisku, zaktualizować aria-selected i tabindex (0 dla aktywnego, -1 dla reszty); pokazać panel o id = data-tab-target (wszystkie .tab-panel poza tym id ukryte). Jeśli jeden tab ma controls wiele paneli (np. "Wszystko"), pokazać wszystkie pasujące panele.
- Dla wariantu B: przy kliku w [data-route-filter] ustawić .is-active na przycisku i pokazywać/ukrywać karty według data-route-difficulty (dodawać/usuwać klasę ukrywającą).

### 5. Przykład HTML (wariant A — panele)
<div class="tabs-sticky-wrap">
  <div class="tabs" role="tablist" aria-label="Kategorie">
    <button class="tabs__tab is-active" role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1-btn" data-tab-target="panel-1">Wszystko</button>
    <button class="tabs__tab" role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2-btn" data-tab-target="panel-2">Kategoria A</button>
    <button class="tabs__tab" role="tab" aria-disabled="true" disabled>Coming soon</button>
  </div>
</div>
<div class="tab-panel is-active" role="tabpanel" id="panel-1" aria-labelledby="tab-1-btn">...</div>
<div class="tab-panel" role="tabpanel" id="panel-2" aria-labelledby="tab-2-btn">...</div>

### 6. Przykład HTML (wariant B — filtr)
<div class="tabs-sticky-wrap">
  <div class="tabs tabs--routes" role="tablist" aria-label="Filtr">
    <button type="button" class="tabs__tab is-active" data-route-filter="all">Wszystko</button>
    <button type="button" class="tabs__tab" data-route-filter="easy">Łatwa</button>
    <button type="button" class="tabs__tab" data-route-filter="hard">Trudna</button>
  </div>
</div>
<div class="routes-grid">
  <article class="route-card" data-route-difficulty="easy">...</article>
  ...
</div>
```

---

*Wygenerowano na podstawie implementacji w projekcie Beskider (index.html, app.js).*
