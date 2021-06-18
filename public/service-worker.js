const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v2";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/index.js",
  "/idb.js",
  "/service-worker.js",
  "/checkServiceWorker.js",
  "/favicon.ico",
  "/manifest.webmanifest",
  "/styles.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

self.addEventListener("install", event => {

  // event.waitUntil(
  //   caches.open(DATA_CACHE_NAME).then((cache) => cache.add("/api/images"))
  // );

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );

  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("Removing old cache data", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.url.startsWith(self.location.origin)) {
    if (event.request.url.includes("/api/")) {
      event.respondWith(
        caches.open(DATA_CACHE_NAME)
          .then(cache => {
            return fetch(event.request)
              .then(response => {
                // console.log("in .then(response)");
                if (response.ok) {
                  cache.put(event.request.url, response.clone());
                }
                return response;
              })
              .catch(err => {
                // console.log("in catch");
                if (event.request.method === 'GET') {
                  return cache.match(event.request);
                } else {
                  return Response.error();
                }
              });
          })
          .catch(err => {
            console.log(err);
            return Response.error();
          })
      )
      return;
    }
    event.respondWith(
      caches.open(CACHE_NAME)
        .then(cache => {
          return cache.match(event.request)
            .then(cachedResponse => {
              return cachedResponse || fetch(event.request);
            });
        })
    )
  }
});