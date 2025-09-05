const CACHE_NAME = "climbinglog-cache-v3";

const URLS_A_CACHEAR = [
  "./",                 // importante para abrir offline en la raíz del subpath
  "./index.html",
  "./js/script.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// Instalar: precache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_A_CACHEAR))
  );
  self.skipWaiting();
});

// Activar: limpiar versiones antiguas
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

// Fetch: Cache First con fallback a red y cache dinámico
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      if (cacheRes) return cacheRes;
      return fetch(event.request)
        .then((netRes) => {
          // (Opcional) guarda en caché lo que venga de red
          const clone = netRes.clone();
          caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
          return netRes;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
