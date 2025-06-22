// src/public/sw.js

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

// ⬇️ Inject manifest akan menggantikan baris ini dengan daftar file saat build
self.__WB_MANIFEST;

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

self.addEventListener('push', event => {
  console.log('[SW] Push event received');

  let data = {
    title: 'Notifikasi',
    options: {
      body: 'Ada pemberitahuan baru!',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
    },
  };

  if (event.data) {
    try {
      const json = event.data.json();
      data = {
        title: json.title,
        options: {
          ...json.options,
          icon: json.options.icon || '/icon-192.png',
          badge: json.options.badge || '/icon-192.png',
        }
      };
    } catch (err) {
      // Push berupa string biasa
      data.options.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, data.options)
  );
});
