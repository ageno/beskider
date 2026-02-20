/**
 * Skrypt do zbierania danych o układzie nawigacji (do debugowania).
 * Wymaga: serwer na http://localhost:8000 (np. python3 -m http.server 8000)
 * Uruchomienie: npx playwright install chromium && node scripts/debug-nav-layout.js
 * Wynik zapisany w: .cursor/nav-layout-debug.json
 */
const path = require("path");
const fs = require("fs");

async function main() {
  let playwright;
  try {
    playwright = require("playwright");
  } catch {
    console.error("Zainstaluj Playwright: npx playwright install chromium");
    process.exit(1);
  }

  const outDir = path.join(__dirname, "..", ".cursor");
  const outFile = path.join(outDir, "nav-layout-debug.json");

  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 800 });

  await page.goto("http://localhost:8000", { waitUntil: "networkidle" });
  await page.waitForSelector(".nav__menu", { timeout: 5000 }).catch(() => null);

  const data = await page.evaluate(() => {
    const nav = document.querySelector(".nav");
    const navMenu = document.querySelector(".nav__menu");
    if (!nav || !navMenu) return { error: "nav or nav__menu not found" };
    const links = Array.from(navMenu.querySelectorAll("a"));
    const menuStyle = window.getComputedStyle(navMenu);
    const firstLinkStyle = links[0] ? window.getComputedStyle(links[0]) : null;
    const linkWidths = links.map((a) => ({ text: (a.textContent || "").trim(), width: a.offsetWidth }));
    return {
      navWidth: nav.offsetWidth,
      menuWidth: navMenu.offsetWidth,
      menuFlex: menuStyle.flex,
      menuGap: menuStyle.gap,
      menuJustify: menuStyle.justifyContent,
      linkCount: links.length,
      linkWidths,
      firstLinkFlex: firstLinkStyle ? firstLinkStyle.flex : null,
      firstLinkJustify: firstLinkStyle ? firstLinkStyle.justifyContent : null,
      viewportWidth: window.innerWidth,
      timestamp: Date.now()
    };
  });

  await browser.close();

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(data, null, 2), "utf8");
  console.log("Zapisano:", outFile);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
