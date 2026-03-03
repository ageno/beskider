# Typografia podstron tekstowych (regulamin, polityka, RODO, FAQ prawne)

## Zasady

- **Namespace:** `.content` — style działają wyłącznie wewnątrz tego wrappera; nie nadpisują globalnych komponentów UI.
- **Tokeny:** Kolory, odstępy i zaokrąglenia spójne z resztą strony (8px grid, brand green `#1f7a4a`, light/dark jak w `data-theme`).
- **Skala nagłówków:** Modular scale ~1.125: H1 → H6 wyraźna hierarchia; H1 raz na stronę, H2 = główne sekcje (§).
- **Czytelność:** Akapity max-width 70ch, line-height ≥ 1.6, spójne odstępy między blokami.
- **Listy:** Wcięcia przez padding; listy zagnieżdżone zachowują hierarchię; numeracja czytelna.
- **Linki:** Kolor brandu, podkreślenie (domyślnie lub :hover); focus outline 2px, nie tylko kolor.
- **Dostępność:** Kontrast WCAG AA, wyraźny :focus-visible, wyróżniki nie tylko kolorem.
- **Responsywność:** Mniejsze fonty i spacing na mobile; długie paragrafy bez utraty czytelności.

## Elementy objęte stylami

| Element | Zasada |
|--------|--------|
| H1–H6 | Skala 1.125, margin-top/bottom z 8px grid, font-weight 600/700 |
| p | max-width 70ch, line-height 1.65, margin między akapitami |
| ul, ol | padding-left, gap między elementami; ol list-style decimal |
| a | kolor linku, text-decoration underline / underline on hover; :focus-visible outline |
| strong, b | font-weight 700 (bez zmiany koloru) |
| em, i | font-style italic |
| small | font-size 0.875em |
| blockquote | border-left + tło; kontrast WCAG |
| hr | border subtelny, margin pionowy |
| table | border-collapse, obramowanie komórek, tło nagłówków |
| code (inline) | font mono, tło + padding, border-radius |
| Anchor (id) | scroll-margin-top dla skoku; opcjonalnie styl wizualny |
| :hover / :focus / :active | linki: underline/outline; bez agresywnych animacji |

## Wdrożenie

- Layout `page.html` owija `{{ content }}` w `<div class="content">`.
- Style w `assets/css/main.css` w sekcji „Content typography (legal/text pages)”, wyłącznie selektory `.content …` i `html[data-theme="dark"] .content …`.
