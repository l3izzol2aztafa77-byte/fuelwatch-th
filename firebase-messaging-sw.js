importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC8bVNHPokNZQRE0HJs1bZDoRyp3uwylf4",
  authDomain: "fuelwatch-th.firebaseapp.com",
  projectId: "fuelwatch-th",
  storageBucket: "fuelwatch-th.firebasestorage.app",
  messagingSenderId: "306045751415",
  appId: "1:306045751415:web:00640d774d3c609a593672"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification || {};
  if (!title) return;
  self.registration.showNotification(title, {
    body: body || '',
    icon: '/icon-192.png',
    badge: '/icon-72.png',
    tag: 'fuelwatch-alert',
    renotify: true,
    data: { url: '/' }
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data?.url || '/'));
});
