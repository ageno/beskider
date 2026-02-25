# Cookiebot – jak naprawić raport (beskider.pl)

Raport Cookiebot z 2026-02-20 wskazuje **2 cookies**, z czego **1 jest Unclassified** i wymaga ręcznej klasyfikacji w panelu Cookiebot.

## 1. Cookie `beskider-theme` (Unclassified)

- **Co to jest:** Klucz w `localStorage` (Cookiebot traktuje go jak ciasteczko). Przechowuje wybór motywu: `auto` | `light` | `dark`.
- **Dlaczego „Unclassified”:** Nie jest zadeklarowany w Cookiebot, więc skan go nie rozpoznaje.
- **Co zrobić w panelu Cookiebot:**
  1. Zaloguj się do [Cookiebot Manager](https://manage.cookiebot.com/).
  2. Wybierz domenę **beskider.pl**.
  3. Przejdź do sekcji **Declarations** (Deklaracje) / **Cookie declarations**.
  4. Dodaj nową deklarację ciasteczka:
     - **Cookie name:** `beskider-theme`
     - **Provider:** beskider.pl (lub „First party”)
     - **Type:** HTML / Local storage (w zależności od opcji w panelu)
     - **Category:** **Necessary** albo **Preferences** (preferencje wyglądu strony)
     - **Purpose (opis):** np. *„Przechowuje wybór motywu strony (jasny/ciemny/automatyczny) w bieżącej domenie, aby zapamiętać preferencję użytkownika przy kolejnych wizytach. Dane nie są przekazywane poza stronę.”*
     - **Duration:** Persistent / Bez określonego czasu
  5. Zapisz i uruchom ponowny skan (jeśli dostępny).

Po poprawnej deklaracji `beskider-theme` nie będzie już w kategorii „Unclassified”, a raport będzie zgodny z opisem w Polityce prywatności.

## 2. Cookie `CookieConsent` (Necessary)

- To ciasteczko samego Cookiebot – zapisuje stan zgody użytkownika.
- Komunikat „Data is sent to: Unknown (not adequate)” może wynikać z tego, że w deklaracji nie wskazano „Data is sent to: First party only”. W panelu Cookiebot sprawdź deklarację dla `CookieConsent` i upewnij się, że jest oznaczona jako first-party / brak przekazu do third parties.

## 3. Polityka prywatności

W **Polityce prywatności** warto jawnie wymienić:
- cookie zgody (Cookiebot),
- przechowywanie preferencji motywu (`beskider-theme`) w localStorage,

żeby opisy były zbieżne z raportem Cookiebot i deklaracjami.
