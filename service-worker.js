const CACHE_NAME = "contador-cache-v1";
const URLS_A_CACHEAR = [
  "./",              // la raíz
  "./index.html",
  "./script.js"
];

// Instalar Service Worker y guardar archivos en caché
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_A_CACHEAR);
    })
  );
});

// Activar y limpiar versiones antiguas del caché
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});

// Interceptar peticiones y responder desde caché si no hay internet
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
