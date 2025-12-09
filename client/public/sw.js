const CACHE_NAME = 'michael-landing-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json', // If exists
    '/favicon-m.png',
    '/hero-mobile-lcp.webp', // Critical LCP
    '/logo-surgical.webp',
    // standard fonts handled by browser cache usually, but good to add if local
    // We won't list every single image to avoid huge initial download, 
    // but we will cache them dynamically as they are requested.
];

// Install: Cache critical assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch: Stale-while-revalidate or Cache First for static assets
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Cache First for images, fonts, styles, scripts (365 days logic)
    if (url.pathname.match(/\.(webp|png|jpg|jpeg|svg|css|js|woff2?)$/)) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached response immediately
                    return cachedResponse;
                }
                // Fetch and cache
                return fetch(event.request).then((response) => {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                    return response;
                });
            })
        );
    } else {
        // Network First for HTML/others (to get updates)
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request))
        );
    }
});
