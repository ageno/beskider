const swUrl = new URL(self.location.href);
const cacheSuffix = swUrl.searchParams.get("v") || "dev";
const CACHE_VERSION = `beskider-${cacheSuffix}-20260218`;
/* Critical assets only; rest cached on-demand by fetch handler */
const ASSETS = [
  "./",
  "./index.html",
  "./robots.txt",
  "./sitemap.xml",
  "./app.js",
  "./tabnav.js",
  "./peek-gallery.js",
  "./manifest.json",
  "./assets/icons/icon.svg",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/fontawesome/css/all.min.css",
  "./assets/fontawesome/webfonts/fa-brands-400.woff2",
  "./assets/fontawesome/webfonts/fa-solid-900.woff2",
  "./assets/images/hero-mountains-320.jpg",
  "./assets/images/hero-mountains-640.jpg",
  "./assets/images/hero-mountains-1280.jpg",
  "./assets/images/hero-mountains.jpg"
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
