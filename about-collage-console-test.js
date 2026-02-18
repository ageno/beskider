/**
 * Wklej CAŁY ten blok do konsoli (F12 → Console), potem manewruj wysokościami:
 *
 *   collage.style.setProperty('--about-f1', '0.35');   // zdjęcie 1 (lewa góra)
 *   collage.style.setProperty('--about-f2', '0.65');   // zdjęcie 2 (prawa góra)
 *   collage.style.setProperty('--about-f3', '0.65');   // zdjęcie 3 (lewa dół)
 *   collage.style.setProperty('--about-f4', '0.35');   // zdjęcie 4 (prawa dół)
 *
 * Wartości 0–1. W lewej: f1+f3=1, w prawej: f2+f4=1.
 * Wszystkie naraz: collage.set(0.35, 0.65, 0.65, 0.35);
 */
(function () {
  var id = 'about-collage-console-override';
  if (document.getElementById(id)) { console.log('Już wstrzyknięte. Użyj: collage.set(f1, f2, f3, f4)'); return; }
  var style = document.createElement('style');
  style.id = id;
  style.textContent = [
    '.about__collage { --about-f1: 0.4; --about-f2: 0.6; --about-f3: 0.6; --about-f4: 0.4; }',
    '.about__collage__col:first-child .about__collage-item:nth-child(1) { flex: var(--about-f1) !important; }',
    '.about__collage__col:first-child .about__collage-item:nth-child(2) { flex: var(--about-f3) !important; }',
    '.about__collage__col:last-child .about__collage-item:nth-child(1) { flex: var(--about-f2) !important; }',
    '.about__collage__col:last-child .about__collage-item:nth-child(2) { flex: var(--about-f4) !important; }',
  ].join('\n');
  document.head.appendChild(style);
  var el = document.querySelector('.about__collage');
  if (!el) return;
  el.set = function (f1, f2, f3, f4) {
    if (f1 != null) this.style.setProperty('--about-f1', String(f1));
    if (f2 != null) this.style.setProperty('--about-f2', String(f2));
    if (f3 != null) this.style.setProperty('--about-f3', String(f3));
    if (f4 != null) this.style.setProperty('--about-f4', String(f4));
  };
  window.collage = el;
  console.log('Kolaż: ustaw collage.set(f1, f2, f3, f4) lub collage.style.setProperty("--about-f1", "0.35") itd.');
})();
