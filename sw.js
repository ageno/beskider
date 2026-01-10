const CACHE_VERSION = "beskider-v9";
const ASSETS = [
  "./",
  "./index.html",
  "./app.js",
  "./manifest.json",
  "./assets/icons/icon-192.svg",
  "./assets/icons/icon-512.svg",
  "./assets/images/turbo-levo-3-expert-1.jpg",
  "./assets/images/turbo-levo-3-expert-2.jpg",
  "./assets/images/turbo-levo-3-expert-3.jpg",
  "./assets/images/turbo-levo-3-comp-1.jpg",
  "./assets/images/turbo-levo-3-comp-2.jpg",
  "./assets/images/turbo-levo-3-comp-3.jpg",
  "./assets/images/s-works-levo-1.jpg",
  "./assets/images/s-works-levo-2.jpg",
  "./assets/images/s-works-levo-3.jpg",
  "./assets/images/turbo-levo-comp-1.jpg",
  "./assets/images/turbo-levo-comp-2.jpg",
  "./assets/images/turbo-levo-comp-3.jpg",
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

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_VERSION).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
