const CACHE_NAME = "contador-cache-v2";
const URLS_A_CACHEAR = [
  "/",
  "/index.html",
  "/script.js",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Instalar: precache de archivos clave
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_A_CACHEAR))
  );
  self.skipWaiting();
});

// Activar: limpiar cachés antiguos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

// Estrategia: Cache First con fallback a red
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(event.request).then((netRes) => {
          // (Opcional) Cache dinámico: guarda lo que no estaba precacheado
          const clone = netRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return netRes;
        }).catch(() => {
          // (Opcional) Devolver una página offline personalizada si quieres
          return caches.match("/index.html");
        })
      );
    })
  );
});
