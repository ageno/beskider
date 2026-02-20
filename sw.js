const swUrl = new URL(self.location.href);
const cacheSuffix = swUrl.searchParams.get("v") || "dev";
const CACHE_VERSION = `beskider-${cacheSuffix}-20260220`;
/* Precache: core + all images/CSS/JS for full offline; fetch handler caches on-demand too */
const ASSETS = [
  "./",
  "./index.html",
  "./robots.txt",
  "./sitemap.xml",
  "./app.js",
  "./tabnav.js",
  "./peek-gallery.js",
  "./manifest.json",
  "./assets/icons/beskider-logo-fav.svg",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/images/beskider-logo.svg",
  "./assets/images/beskider-logo-dark.svg",
  "./assets/fontawesome/css/all.min.css",
  "./assets/fontawesome/webfonts/fa-brands-400.woff2",
  "./assets/fontawesome/webfonts/fa-solid-900.woff2",
  "./assets/images/hero-mountains-320.jpg",
  "./assets/images/hero-mountains-640.jpg",
  "./assets/images/hero-mountains-1280.jpg",
  "./assets/images/hero-mountains.jpg",
  "./assets/images/about-us-320.jpg",
  "./assets/images/about-us-640.jpg",
  "./assets/images/about-us-1280.jpg",
  "./assets/images/about-us.jpg",
  "./assets/images/beskider-plus-cta-480.jpg",
  "./assets/images/beskider-plus-cta-640.jpg",
  "./assets/images/beskider-plus-cta-1024.jpg",
  "./assets/images/beskider-plus-cta-480.webp",
  "./assets/images/beskider-plus-cta-640.webp",
  "./assets/images/beskider-plus-cta-1024.webp",
  "./assets/images/gallery-mgla-beskidy.png",
  "./assets/images/gallery-dwoch-rowerzystow-zachod.png",
  "./assets/images/gallery-portret-rowerzysta.png",
  "./assets/images/gallery-rower-nad-woda.png",
  "./assets/images/gallery-rowerzysta-emtb-polana.png",
  "./assets/images/guide-pawel-nowak.png",
  "./assets/images/guide-klaudia-mec.png",
  "./assets/images/guide-anna-zielinska.png",
  "./assets/images/turbo-levo-3-expert-1.png",
  "./assets/images/turbo-levo-3-expert-1-320.png",
  "./assets/images/turbo-levo-3-expert-1-640.png",
  "./assets/images/turbo-levo-3-expert-1-1280.png",
  "./assets/images/turbo-levo-3-expert-2.jpg",
  "./assets/images/turbo-levo-3-expert-2-320.jpg",
  "./assets/images/turbo-levo-3-expert-2-640.jpg",
  "./assets/images/turbo-levo-3-expert-3.jpg",
  "./assets/images/turbo-levo-3-expert-3-320.jpg",
  "./assets/images/turbo-levo-3-expert-3-640.jpg",
  "./assets/images/turbo-levo-3-comp-1.png",
  "./assets/images/turbo-levo-3-comp-1-320.png",
  "./assets/images/turbo-levo-3-comp-1-640.png",
  "./assets/images/turbo-levo-3-comp-1-1280.png",
  "./assets/images/turbo-levo-3-comp-2.jpg",
  "./assets/images/turbo-levo-3-comp-2-320.jpg",
  "./assets/images/turbo-levo-3-comp-2-640.jpg",
  "./assets/images/turbo-levo-3-comp-3.jpg",
  "./assets/images/turbo-levo-3-comp-3-320.jpg",
  "./assets/images/turbo-levo-3-comp-3-640.jpg",
  "./assets/images/s-works-levo-1.png",
  "./assets/images/s-works-levo-1-320.png",
  "./assets/images/s-works-levo-1-640.png",
  "./assets/images/s-works-levo-1-1280.png",
  "./assets/images/s-works-levo-2.jpg",
  "./assets/images/s-works-levo-2-320.jpg",
  "./assets/images/s-works-levo-2-640.jpg",
  "./assets/images/s-works-levo-3.jpg",
  "./assets/images/s-works-levo-3-320.jpg",
  "./assets/images/s-works-levo-3-640.jpg",
  "./assets/images/turbo-levo-comp-1.png",
  "./assets/images/turbo-levo-comp-1-320.png",
  "./assets/images/turbo-levo-comp-1-640.png",
  "./assets/images/turbo-levo-comp-1-1280.png",
  "./assets/images/turbo-levo-comp-2.jpg",
  "./assets/images/turbo-levo-comp-2-320.jpg",
  "./assets/images/turbo-levo-comp-2-640.jpg",
  "./assets/images/turbo-levo-comp-3.jpg",
  "./assets/images/turbo-levo-comp-3-320.jpg",
  "./assets/images/turbo-levo-comp-3-640.jpg",
  "./assets/images/tarmac-sl8-1.png",
  "./assets/images/tarmac-sl8-1-320.png",
  "./assets/images/tarmac-sl8-1-640.png",
  "./assets/images/tarmac-sl8-1-1280.png",
  "./assets/images/aethos-1.png",
  "./assets/images/aethos-1-320.png",
  "./assets/images/aethos-1-640.png",
  "./assets/images/aethos-1-1280.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key !== CACHE_VERSION) {
              return caches.delete(key);
            }
            return null;
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_VERSION).then((cache) => {
              cache.put("./index.html", responseClone);
            });
          }
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request)
        .then((response) => {
          if (!response || !response.ok || response.type === "opaque") {
            return response;
          }
          const responseClone = response.clone();
          caches.open(CACHE_VERSION).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => cached || Response.error());
    })
  );
});
