/* Firebase Messaging Service Worker - Punto de Ventas Doña Cecy V9 */
importScripts('https://www.gstatic.com/firebasejs/12.15.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.15.0/firebase-messaging-compat.js');

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
  self.registration.showNotification(n.title || '🔔 Punto de Ventas', {
    body: n.body || '',
    icon: data.icon || './icon-192.png',
    badge: data.badge || './icon-192.png',
    data: { url: data.url || './' },
    requireInteraction: data.requireInteraction === 'true',
    vibrate: [120, 70, 120]
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification?.data?.url || './';
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    for (const client of list) {
      if ('focus' in client) return client.focus();
    }
    if (clients.openWindow) return clients.openWindow(url);
  }));
});
