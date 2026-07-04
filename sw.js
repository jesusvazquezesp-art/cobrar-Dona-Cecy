/* Service Worker simple - Doña Cecy V11.1
   No usa caché para evitar errores de versiones antiguas. */
self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    } catch (e) {}
    await clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});
