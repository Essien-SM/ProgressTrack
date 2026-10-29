/* ProgressTrack service worker — works on GitHub Pages subpaths */
const CACHE_VERSION = 'pt-v6';
const SHELL_CACHE = `shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;

// Resolve assets relative to the SW location (important for /repo-name/ on GitHub Pages)
const BASE = new URL('./', self.location).href;

function asset(path) {
  return new URL(path, BASE).href;
}

const SHELL_ASSETS = [
  asset('./'),
  asset('./index.html'),
  asset('./manifest.webmanifest'),
  asset('./icons/icon-192.png'),
  asset('./icons/icon-512.png'),
  asset('./icons/apple-touch-icon.png'),
  asset('./icons/favicon-32.png')
];

const CDN_HOSTS = [
  'cdn.jsdelivr.net',
  'fonts.googleapis.com',
  'fonts.gstatic.com'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((cache) =>
        Promise.all(
          SHELL_ASSETS.map((url) =>
            cache.add(url).catch(() => undefined)
          )
        )
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== SHELL_CACHE && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

function isCdnRequest(url) {
  return CDN_HOSTS.some((host) => url.hostname === host || url.hostname.endsWith('.' + host));
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Navigations: network first, fall back to cached app shell
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(SHELL_CACHE).then((cache) => {
            cache.put(asset('./index.html'), copy).catch(() => {});
          });
          return response;
        })
        .catch(() =>
          caches.match(asset('./index.html')).then((r) => r || caches.match(request))
        )
    );
    return;
  }

  // Same-origin: cache first
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const copy = response.clone();
            caches.open(SHELL_CACHE).then((cache) => cache.put(request, copy)).catch(() => {});
          }
          return response;
        }).catch(() => cached);
      })
    );
    return;
  }

  // CDN: stale-while-revalidate
  if (isCdnRequest(url)) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          const network = fetch(request)
            .then((response) => {
              if (response && response.status === 200) {
                cache.put(request, response.clone()).catch(() => {});
              }
              return response;
            })
            .catch(() => cached);
          return cached || network;
        })
      )
    );
  }
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
