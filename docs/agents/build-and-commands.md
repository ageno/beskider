# Build, Test, and Development Commands

- **Lokalny serwer Jekyll:** `bundle install` → `bundle exec jekyll serve` (http://localhost:4000).
- **Build:** `bundle exec jekyll build` (output w `_site/`).
- **Agent:** Po każdej zmianie w plikach Jekylla (layouty, _includes, _data, _config.yml, strony .html/.md, _posts) uruchomić `bundle exec jekyll build` w katalogu projektu (z `eval "$(rbenv init -)"` jeśli rbenv), żeby _site/ było aktualne.
- **Start pracy nad projektem:** Zalecane uruchomienie `bundle exec jekyll serve` na początku sesji (w tle). Strona na http://localhost:4000 odświeża się przy zapisie plików. Agent może zaproponować lub uruchomić serve, gdy użytkownik zaczyna pracę nad stroną.
- PWA: hard-refresh po zmianach, sprawdzić aktualizację Service Workera (`sw.js`).
