const CACHE_NAME = 'arthquest-v1';
const ASSETS_TO_CACHE = [
  '.',
  './',
  'ArthQuest_v2.html',
  'css/style.css',
  'js/app.js',
  'manifest.json',
  'icons/icon.svg',
  'https://cdn.jsdelivr.net/npm/chart.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(networkRes => {
        // Only cache successful responses
        if (networkRes && networkRes.status === 200 && networkRes.type !== 'opaque') {
          const copy = networkRes.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        }
        return networkRes;
      }).catch(() => caches.match('ArthQuest_v2.html'));
    })
  );
});
