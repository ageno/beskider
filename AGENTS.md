# Repository Guidelines

Główny dokument dla agentów i współpracowników. Składa się z **Orkiestracji Workflow** (standard działania) oraz **wytycznych projektu** (struktura, build, styl, testy, commity, konfiguracja, planowanie) – te ostatnie są w osobnych plikach w `docs/agents/`.

---

# Orkiestracja Workflow

Dokument określa standard działania przy realizacji zadań technicznych, projektowych i architektonicznych. Celem jest minimalizacja błędów, redukcja chaosu kontekstowego oraz utrzymanie wysokiego poziomu inżynierskiego.

---

## 1. Domyślny Tryb Planowania

### Zasady

- Wchodź w tryb planowania przy KAŻDYM nietrywialnym zadaniu:
  - więcej niż 3 kroki
  - decyzje architektoniczne
  - zmiany wpływające na wiele modułów
  - ryzyko regresji

- Jeżeli coś zaczyna iść w złym kierunku:
  - natychmiast przerwij
  - przeanalizuj przyczynę
  - przeplanuj rozwiązanie
  - nie „dopchaj” rozwiązania na siłę

- Używaj trybu planowania również do:
  - kroków weryfikacyjnych
  - projektowania testów
  - walidacji założeń

- Twórz szczegółowe specyfikacje przed implementacją:
  - zakres zmian
  - zależności
  - wpływ na istniejące moduły
  - przypadki brzegowe
  - ryzyka

### Cel

Redukcja niejednoznaczności, eliminacja improwizacji, kontrola złożoności.

---

## 2. Strategia Subagentów

### Zasady

- Wykorzystuj subagentów szeroko, aby:
  - utrzymać główne okno kontekstu czyste
  - izolować analizy
  - pracować równolegle

- Deleguj do subagentów:
  - research
  - eksplorację kodu
  - analizę logów
  - testowanie hipotez
  - porównania wariantów

- Przy złożonych problemach:
  - zwiększ równoległość
  - podziel problem na mniejsze jednostki
  - przydziel jeden cel na jednego subagenta

- Jedno zadanie = jeden subagent.
  - brak mieszania odpowiedzialności
  - brak przełączania kontekstu

### Cel

Skalowanie analizy bez utraty przejrzystości i jakości decyzji.

---

## 3. Pętla Samodoskonalenia

### Zasady

- Po KAŻDEJ korekcie od użytkownika:
  - zaktualizuj plik `tasks/lessons.md`
  - zapisz wzorzec błędu
  - zapisz zasadę zapobiegawczą

- Twórz reguły prewencyjne:
  - co było błędem
  - jaka była przyczyna
  - jak uniknąć tego w przyszłości

- Iteruj bez litości:
  - analizuj powtarzalność błędów
  - poprawiaj reguły
  - redukuj wskaźnik błędów

- Na starcie sesji:
  - przeglądaj `tasks/lessons.md`
  - filtruj lekcje istotne dla projektu

### Cel

Systemowe ograniczanie powtarzalnych błędów i stałe podnoszenie jakości.

---

## 4. Weryfikacja Przed Zamknięciem

### Zasady

- Nigdy nie oznaczaj zadania jako ukończone bez dowodu działania.

- Weryfikuj:
  - testy jednostkowe
  - testy integracyjne
  - logi
  - zachowanie runtime
  - przypadki brzegowe

- Jeżeli dotyczy:
  - wykonaj diff względem main
  - oceń zakres zmian
  - sprawdź niezamierzone efekty uboczne

- Zadaj sobie pytanie:
  - Czy senior inżynier zaakceptowałby to rozwiązanie?

- Udowodnij poprawność:
  - demonstracja działania
  - potwierdzenie testami
  - brak regresji

### Cel

Zero „fałszywych zakończeń” i zero niezweryfikowanych zmian.

---

## 5. Wymaganie Elegancji (Zbalansowane)

### Zasady

- Przy każdej nietrywialnej zmianie:
  - zatrzymaj się
  - zapytaj: czy istnieje rozwiązanie prostsze, czystsze, bardziej systemowe?

- Jeżeli rozwiązanie wydaje się „hackiem”:
  - przeprojektuj je
  - wdrażaj rozwiązanie docelowe, nie tymczasowe

- Nie nadinżynieruj:
  - przy prostych poprawkach stosuj prostą logikę
  - nie komplikuj oczywistego

- Przed prezentacją:
  - zakwestionuj własne założenia
  - przeanalizuj alternatywy
  - usuń zbędny kod

### Cel

Balans między minimalizmem a jakością architektoniczną.

---

## 6. Autonomiczne Usuwanie Błędów

### Zasady

- Otrzymując zgłoszenie błędu:
  - nie proś o prowadzenie za rękę
  - przejdź bezpośrednio do analizy

- Analizuj:
  - logi
  - stack trace
  - błędy testów
  - zmiany w ostatnich commitach

- Identyfikuj przyczynę źródłową (root cause).

- Napraw:
  - przyczynę, nie objaw
  - bez wprowadzania regresji

- Jeżeli testy CI nie przechodzą:
  - samodzielnie przeanalizuj
  - popraw bez dodatkowych instrukcji

### Cel

Pełna odpowiedzialność za jakość i stabilność.

---

## Zarządzanie Zadaniami

### 1. Plan Najpierw

- Zapisz plan w `tasks/todo.md`
- Twórz checklistę z mierzalnymi punktami
- Każdy punkt musi być weryfikowalny

### 2. Weryfikacja Planu

- Sprawdź plan przed rozpoczęciem implementacji
- Upewnij się, że:
  - zakres jest jasny
  - zależności są znane
  - ryzyka są określone

### 3. Śledzenie Postępu

- Oznaczaj zadania jako wykonane na bieżąco
- Aktualizuj status w czasie rzeczywistym

### 4. Wyjaśnianie Zmian

- Po każdym istotnym kroku:
  - przedstaw zwięzłe podsumowanie
  - wyjaśnij decyzje architektoniczne

### 5. Dokumentowanie Wyników

- Dodaj sekcję przeglądu do `tasks/todo.md`
- Opisz:
  - co zostało zrobione
  - jak zostało przetestowane
  - jakie są znane ograniczenia

### 6. Rejestrowanie Lekcji

- Po każdej korekcie:
  - aktualizuj `tasks/lessons.md`
  - zapisuj wzorce i zasady zapobiegawcze

---

## Zasady Fundamentalne

### Prostota Przede Wszystkim

- Każda zmiana ma być maksymalnie prosta.
- Minimalny wpływ na istniejący kod.
- Brak niepotrzebnej abstrakcji.

### Brak Lenistwa

- Szukaj przyczyn źródłowych.
- Nie stosuj tymczasowych obejść.
- Standard pracy: poziom senior.

### Minimalny Wpływ

- Zmieniaj tylko to, co konieczne.
- Nie dotykaj obszarów niezwiązanych z zadaniem.
- Unikaj wprowadzania nowych błędów.

---

## Cel Dokumentu

Utrzymanie wysokiego poziomu inżynierskiego poprzez:

- kontrolowaną złożoność
- systemowe podejście
- eliminację przypadkowości
- dowodzenie poprawności
- ciągłe doskonalenie

---

# Wytyczne projektu (szczegóły w plikach)

| Temat | Plik |
|-------|------|
| Struktura projektu, Jekyll, layouty, PWA, ikony, spec.md | [docs/agents/project-structure.md](docs/agents/project-structure.md) |
| Build, serwer, PWA | [docs/agents/build-and-commands.md](docs/agents/build-and-commands.md) |
| Styl kodu, Tailwind, nazewnictwo | [docs/agents/coding-style.md](docs/agents/coding-style.md) |
| Testy manualne, debug nawigacji | [docs/agents/testing.md](docs/agents/testing.md) |
| Commity, PR, push | [docs/agents/commit-and-pr.md](docs/agents/commit-and-pr.md) |
| Konfiguracja, treść, HDR, spec, sw.js, CSP | [docs/agents/config-and-content.md](docs/agents/config-and-content.md) |
| Planowanie zmiany (checklist treści/UI i nowych funkcji) | [docs/agents/planning-checklist.md](docs/agents/planning-checklist.md) |
