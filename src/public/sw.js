import { precacheAndRoute } from 'workbox-precaching';

// Inject manifest dari Vite
precacheAndRoute(self.__WB_MANIFEST);

const CACHE_NAME = 'story-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/styles.css',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/fallback.html',
];

// Fallback cache untuk halaman dasar (opsional)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

// Push Notification
self.addEventListener('push', event => {
  console.log('[SW] Push event received');

  let data = {
    title: 'Default Title',
    options: {
      body: 'Default body',
      icon: '/icon-192.png',
      badge: '/icon-192.png'
    }
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      console.error('[SW] Gagal parsing push data:', e);
      data = {
        title: 'Notifikasi',
        options: {
          body: event.data.text(),
          icon: '/icon-192.png',
          badge: '/icon-192.png'
        }
      };
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, data.options)
  );
});
