// Registrar el Service Worker con ruta relativa
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker/service-worker.js")
        .then(() => console.log("✅ Service Worker registrado"))
        .catch(err => console.error("❌ Error al registrar SW", err));
}