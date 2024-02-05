const CACHE_NAME = 'hydrogen-nyx-store-cache-v1';

const urlsToCache = [];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache', cache);
        return cache.addAll(urlsToCache);
      })
      .catch(function () {
        console.log('install error');
      }),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      for (var i = 0, len = cacheNames.length; i < len; i++) {
        if (cacheNames[i] !== CACHE_NAME) {
          caches.delete(cacheNames[i]);
        }
      }
    }),
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }

        return fetch(event.request);
      })
      .catch(function () {
        console.log('fetch error');
      }),
  );
});
