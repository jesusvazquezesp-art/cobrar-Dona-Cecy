/* Firebase Messaging Service Worker - Punto de Ventas Doña Cecy V10 */
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCdKLeXKOTStj0nXy2CgcTA_K1GC7k8gBE",
  authDomain: "punto-de-ventas-85e14.firebaseapp.com",
  projectId: "punto-de-ventas-85e14",
  storageBucket: "punto-de-ventas-85e14.firebasestorage.app",
  messagingSenderId: "147922761717",
  appId: "1:147922761717:web:71ee644f27009bef8c12bc",
  measurementId: "G-HVK5L1S0WS"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const n = payload.notification || {};
  const data = payload.data || {};
  const title = n.title || data.titulo || '🔔 Punto de Ventas';
  const options = {
    body: n.body || data.detalle || '',
    icon: './icon-192.png',
    badge: './icon-192.png',
    vibrate: [250, 120, 250],
    data: { url: data.url || './', ...data },
    requireInteraction: String(data.tipo||'').includes('pedido') || String(data.tipo||'').includes('venta')
  };
  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data && event.notification.data.url ? event.notification.data.url : './';
  event.waitUntil(clients.matchAll({ type:'window', includeUncontrolled:true }).then((clientList) => {
    for (const client of clientList) {
      if ('focus' in client) return client.focus();
    }
    if (clients.openWindow) return clients.openWindow(url);
  }));
});
